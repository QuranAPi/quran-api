from flask import Flask, jsonify, render_template, request, make_response, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
import json
import jwt
from datetime import datetime, timedelta
from functools import wraps
from jwt import ExpiredSignatureError, DecodeError
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
import creds
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)
limiter = Limiter(get_remote_address, app=app)
bcrypt = Bcrypt(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = SQLAlchemy(app)
app.config['SECRET_KEY'] = 'HIIIIII'

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

class RegisterForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        if existing_user_username:
            raise ValidationError(
                'That username already exists. Please choose a different one.')
    
class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw={"placeholder":"Username"})
    password = PasswordField(validators=[InputRequired(), Length(
        min=4, max=20)], render_kw={"placeholder":"Password"})
    
    submit = SubmitField("Login")

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = None
        
        # Check if the Authorization header is present
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            token = auth_header.split(' ')[1] if len(auth_header.split(' ')) > 1 else None

        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 401
        except DecodeError:
            return jsonify({'Message': 'Invalid token!'}), 401

        return func(*args, **kwargs)
    return decorated


with open('quran.json') as f:
    quran_data = json.load(f)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/api/public')
def public():
    return {"1":["2","3"]}

@app.route('/auth')
@token_required
def auth():
    return 'JWT VERIFIED.'

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('dashboard'))
    return render_template('login.html', form=form)

@app.route('/logout', methods=['GET','POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))
    
@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():

    user_id = current_user.get_id()
    user = load_user(user_id)
    username = user.username
    
    token = jwt.encode({
        'user': username,
        'expiration': str(datetime.utcnow() + timedelta(hours=24))
    },
    app.config['SECRET_KEY'])
    
    return render_template('dashboard.html', token=token, username=username)

@app.route('/documentation', methods=['GET', 'POST'])
def documentation():
    return render_template('documentation.html', endpoints=app.url_map)

@app.route('/register', methods=['GET','POST'])
def register():

    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data)
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template("register.html", form=form)

# Get all surahs
@app.route('/api/surahs/all')
@limiter.limit('10 per day')
def get_surahs():
    surahs = []
    for surah in quran_data.values():
        surah_info = {
            'number': surah['number'],
            'name': surah['name'],
            # to make it right to left, do this for all arabic text
            'ayas': [aya[::-1] for aya in surah['ayas']],
            'length': surah['length'],
            'place': surah['place'],
            'order': surah['order']
        }
        surahs.append(surah_info)
    return jsonify({'surahs': surahs})

# Get a surah by its number
@app.route('/api/surahs/<int:surah_number>')
@limiter.limit('10 per day')
def get_surah(surah_number):
    if str(surah_number) not in quran_data:
        return jsonify({'error': 'Surah not found'}), 404
    surah = quran_data[str(surah_number)]
    surah_info = {
        'number': surah['number'],
        'name': surah['name'],
        'ayas': [aya[::-1] for aya in surah['ayas']],
        'length': surah['length'],
        'place': surah['place'],
        'order': surah['order']
    }
    return jsonify(surah_info)


@app.route('/api/surahs/verse/<int:ayah_number>')
@limiter.limit('10 per day')
def get_ayah_number(ayah_number):
    total_ayahs = 0
    for k, v in quran_data.items():
        num_ayas = len(v['ayas'])
        if total_ayahs + num_ayas >= ayah_number:
            surah_number = int(k)
            ayah_number_within_surah = ayah_number - total_ayahs
            ayah_content = v['ayas'][ayah_number_within_surah - 1]
            return jsonify({"surah_number": surah_number, "ayah_number_within_surah": ayah_number_within_surah, "ayah_content": ayah_content[::-1]})
        total_ayahs += num_ayas
    return jsonify({"error": "Invalid ayah number"})


@app.route('/api/surahs/makki')
@limiter.limit('10 per day')
def get_makki_surahs():
    makki_surahs = []
    for surah in quran_data.values():
        if surah['place'] == 'Meccan':
            makki_surahs.append(surah)
            surah['ayas'] = [aya[::-1] for aya in surah['ayas']]
    return jsonify(makki_surahs)


@app.route('/api/surahs/madani')
@limiter.limit('10 per day')
def get_madani_surahs():
    madani_surahs = []
    for surah in quran_data.values():
        if surah['place'] == 'Medinan':
            madani_surahs.append(surah)
            surah['ayas'] = [aya[::-1] for aya in surah['ayas']]
    return jsonify(madani_surahs)

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Test application"
    },
    # oauth_config={  # OAuth config. See https://github.com/swagger-api/swagger-ui#oauth2-configuration .
    #    'clientId': "your-client-id",
    #    'clientSecret': "your-client-secret-if-required",
    #    'realm': "your-realms",
    #    'appName': "your-app-name",
    #    'scopeSeparator': " ",
    #    'additionalQueryStringParams': {'test': "hello"}
    # }
)

app.register_blueprint(swaggerui_blueprint)


if __name__ == '__main__':
    app.run(debug=True)
