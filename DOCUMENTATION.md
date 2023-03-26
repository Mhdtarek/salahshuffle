# **Salah Shuffler Documentation**

Salah Shuffler is an app that allows users to shuffle through Quran Surahs and generate random surahs for each of the five daily prayers. This documentation provides an overview of the app's functions, variables, HTML. This took way too much time so yeah

## **Functions**

### **getPrayerTimes()**

This function retrieves the prayer times for the current day and user's location using the `Coordinates` and `PrayerTimes` classes from the `adhan` library. It then stores the prayer times in the `globalPrayerTimes` variable and logs them to the console.

### **getPrayerTime(prayerName)**

This function takes a `prayerName` as an argument and returns the formatted time for that prayer from the `globalPrayerTimes` object.

### **addSurah(surahName, surahId, surahVerseAmount)**

This function adds or removes a Surah to/from the `knownSurahs` array, which is stored in local storage. It takes the `surahName`, `surahId`, and `surahVerseAmount` as arguments.

### **clearSurahs()**

This function clears the `knownSurahs` array from local storage.

### **selectSalah(salah)**

This function sets the `selectedSalah` variable to the specified `salah`. If `All` is selected, it generates random surahs for all five daily prayers and adds them to the `salahSurahs` array. Otherwise, it generates random surahs for the selected prayer and adds them to the `salahSurahs` array.

### **selectAllSalahs()**

This function sets the `selectedSalah` variable to `All` and generates random surahs for all five daily prayers.

### **saveSalahs()**

This function generates a canvas from the `salahTimesContainer` element and downloads it as a PNG image.

### **getRandomSurahs()**

This function generates an array of two random Surahs from the `knownSurahs` array, or if there are not enough Surahs, it generates random Surahs from the `surahs` array.

## **Variables**

### **surahs**

This variable imports the `surahs.json` file, which contains information about all the Surahs in the Quran.

### **knownSurahs**

This variable is an array that stores the Surahs the user has added using the `addSurah()` function. It is stored in local storage.

### **selectedSalah**

This variable stores the currently selected Salah.

### **salahSurahs**

This variable stores the Surahs selected for the currently selected Salah.

### **stage**

This variable stores the current stage of the app. It is used to determine what content to display to the user.

### **savingImage**

This variable is a boolean that tracks whether an image is currently being saved.

### **globalPrayerTimes**

This variable stores the prayer times retrieved using the `getPrayerTimes()` function.

### **salahTimesContainer**

This variable stores a reference to the `salahTimesContainer` element in the HTML.

## HTML

### **H1**

### a header element displaying the app's name

### **P**

### a paragraph element explaining what the app does

### **Div.stage-1**

### a div element containing a list of buttons representing Quran surahs that the user can select/deselect

### **Button**

### a button element representing a Quran surah. When clicked, the surah is either added or removed from the user's list of known surahs

### **H3**

### a header element displaying the user's list of known surahs

### **Div.stage-2**

### a div element containing a list of buttons representing the five daily prayers that the user can select from, Such as All, Fajr, Dhuhr, Asr And Isha

### **div.salah-times **

### a div element displaying the prayer times and randomly selected surahs for the selected prayer time

### **Button.save-image**

### a button element that allows the user to save a screenshot of the prayer times display as a PNG image
