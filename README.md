# Quran API

A Flask-based API that provides information about the Quran, including its chapters, verses, and more.

## How to use

### Endpoints

The API has the following endpoints:

- `/api/chapter/all`: Returns a list of all chapters in the Quran, along with their basic information such as number, name, length, place of revelation, and order.
- `/api/chapter/<int:chapterNumber>`: Returns the information about a specific chapter in the Quran, identified by its number.
- `/api/verse/<int:verseNumber>`: Returns the verse content along with the chapter number and verse number within the chapter.
- `/api/chapter/meccan`: Returns a list of all Meccan chapters in the Quran.
- `/api/chapter/meccan`: Returns a list of all Medinan chapters in the Quran.

## Data

The data for this API is stored in the `quran.json` file. This file contains information about each surah in the Quran, including its number, name, number of ayas, length, place, and order, as well as the content of each ayah.

The data is loaded into memory when the API is started using the `json` package.

## Hosting

This API is hosted with Vercel and can be accessed at https://quran-api-azure.vercel.app/.

## Online Testing

You may test the API online with Swagger on our website.
