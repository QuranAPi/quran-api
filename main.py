from flask import Flask, jsonify, render_template
import json
app = Flask(__name__)

# Load the JSON data
with open('quran.json') as f:
    quran_data = json.load(f)

# Define the API endpoints


@app.route('/')
def documentation():
    return render_template('documentation.html', endpoints=app.url_map)


@app.route('/quran/surahs')
def get_surahs():
    surahs = []
    for surah in quran_data.values():
        surah_info = {
            'number': surah['number'],
            'name': surah['name'],
            'ayas': surah['ayas'],
            'length': surah['length'],
            'place': surah['place'],
            'order': surah['order']
        }
        surahs.append(surah_info)
    return jsonify({'surahs': surahs})


@app.route('/quran/surah/<int:surah_number>')
def get_surah(surah_number):
    if str(surah_number) not in quran_data:
        return jsonify({'error': 'Surah not found'}), 404
    surah = quran_data[str(surah_number)]
    surah_info = {
        'number': surah['number'],
        'name': surah['name'],
        'ayas': surah['ayas'],
        'length': surah['length'],
        'place': surah['place'],
        'order': surah['order']
    }
    return jsonify(surah_info)


@app.route('/quran/ayah_number/<int:ayah_number>')
def get_ayah_number(ayah_number):
    total_ayahs = 0
    for k, v in quran_data.items():
        num_ayas = len(v['ayas'])
        if total_ayahs + num_ayas >= ayah_number:
            surah_number = int(k)
            ayah_number_within_surah = ayah_number - total_ayahs
            ayah_content = v['ayas'][ayah_number_within_surah - 1]
            return jsonify({"surah_number": surah_number, "ayah_number_within_surah": ayah_number_within_surah, "ayah_content": ayah_content})
        total_ayahs += num_ayas
    return jsonify({"error": "Invalid ayah number"})


@app.route('/quran/makki')
def get_makki_surahs():
    makki_surahs = []
    for surah in quran_data.values():
        if surah['place'] == 'Meccan':
            makki_surahs.append(surah)
    return jsonify(makki_surahs)


@app.route('/quran/madani')
def get_madani_surahs():
    madani_surahs = []
    for surah in quran_data.values():
        if surah['place'] == 'Medinan':
            madani_surahs.append(surah)
    return jsonify(madani_surahs)


if __name__ == '__main__':
    app.run(debug=True)
