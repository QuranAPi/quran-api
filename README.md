# Quran API

This is a Flask-based API that provides information about the Quran. It is built using Python and provides information about surahs, ayahs, and their contents.

## How to use

### Endpoints

The API has the following endpoints:

- `/quran/surahs`: Returns a list of all surahs in the Quran, along with their basic information such as number, name, number of ayas, length, place, and order.
- `/quran/surah/<int:surah_number>`: Returns the information about a specific surah in the Quran, identified by its number.
- `/quran/ayah_number/<int:ayah_number>`: Returns the ayah content along with the surah number and ayah number within the surah.
- `/quran/makki`: Returns a list of all Meccan surahs in the Quran.
- `/quran/madani`: Returns a list of all Medinan surahs in the Quran.

### Running the API

To run the API, first clone the repository to your local machine. Then, navigate to the repository directory and install the required packages using the following command:

```console
pip install -r requirements.txt
```

Next, start the Flask server using the following command:

```console
python3 app.py
```
or 
```console
python app.py
```
You can now access the API at `http://localhost:5000/`.

## Data

The data for this API is stored in the `quran.json` file. This file contains information about each surah in the Quran, including its number, name, number of ayas, length, place, and order, as well as the content of each ayah.

The data is loaded into memory when the API is started using the `json` package.


## Hosting

This API is hosted on Render.com and can be accessed at https://quran-api-6xzs.onrender.com/.
