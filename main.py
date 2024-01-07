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



SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

with open('quran.json') as f:
    quran_data = json.load(f)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/documentation', methods=['GET', 'POST'])
def documentation():
    return render_template('documentation.html', endpoints=app.url_map)


# Get all surahs
@app.route('/api/chapter/all')
@limiter.limit('1000 per hour')
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
@app.route('/api/chapter/<int:chapter_number>')
@limiter.limit('1000 per hour')
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
@limiter.limit('1000 per hour')
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


@app.route('/api/surahs/meccan')
@limiter.limit('1000 per hour')
def get_makki_surahs():
    makki_surahs = []
    for surah in quran_data.values():
        if surah['place'] == 'Meccan':
            makki_surahs.append(surah)
            surah['ayas'] = [aya[::-1] for aya in surah['ayas']]
    return jsonify(makki_surahs)


@app.route('/api/surahs/medinan')
@limiter.limit('1000 per hour')
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
