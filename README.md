# **Salah Shuffler**

This is a Svelte website that allows you to shuffle through Quran Surahs and generate random surahs for each of the five daily prayers.

## **Dependencies**

The following dependencies are required:

- surahs.json file (comes in src)
- html2canvas package
- adhan package

## **Usage**

1. Clone or download the repository.
2. Install the dependencies using npm install.
3. Run the project using npm run dev.
4. Visit the application in your web browser at localhost:5173.

## **Features**

- Add/remove Surahs to/from a list of known Surahs.
- Generate random Surahs for each of the five daily prayers.
- Option to select all five prayers at once.
- Download a PNG image of the generated Salah times.

## **Code**

The main JavaScript file for the application is src/App.svelte. The file imports the surahs.json, html2canvas, and adhan packages to generate prayer times.
The addSurah, clearSurahs, and getRandomSurahs functions handle adding/removing known Surahs, clearing the list of known Surahs, and generating random Surahs for each prayer, respectively.
The getPrayerTimes and getPrayerTime functions use the adhan package to calculate prayer times and format them for display.
The saveSalahs function generates a PNG image of the generated Salah times and allows the user to download it.
Read more at [ The Docs](https://github.com/Mhdtarek/salahshuffle/blob/master/DOCUMENTATION.md)

## **Credits**

This project was created by mhdtarek using[ Svelte](https://svelte.dev/),[ html2canvas](https://html2canvas.hertzen.com/), and[ adhan](https://github.com/batoulapps/adhan-js).
