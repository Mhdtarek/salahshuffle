import {writable} from "svelte/store"
import { getPrayerTime, getPrayerTimes } from "./getPrayerTimes";

import surahs from "../surahs.json"



export let knownSurahs = writable(JSON.parse(localStorage.getItem("knownSurahs")) || [])
export let salahSurahs = writable([]);

let knownSurahsArr 
let salahSurahsArr

knownSurahs.subscribe(value => {
    knownSurahsArr = value;
});
salahSurahs.subscribe(value => {
    salahSurahsArr = value;
});

export function getRandomSurahs() {
   const maxSurahs = 2;
   const availableSurahs = knownSurahsArr.slice();
 
   console.log(availableSurahs)
   const randomSurahs = [];
 
   for (let i = 0; i < maxSurahs; i++) {
     if (availableSurahs.length > 0) {
       const randomIndex = Math.floor(Math.random() * availableSurahs.length);
       const randomSurah = availableSurahs[randomIndex];
       availableSurahs.splice(randomIndex, 1);
       randomSurahs.push(randomSurah);
     } else {
       const randomSurah = surahs[Math.floor(Math.random() * surahs.length)];
       randomSurahs.push(randomSurah);
     }
   }
   return randomSurahs;
 }
 
 

  export function addSurah(surahName, surahId, surahVerseAmount) {
    const index = knownSurahsArr.findIndex(
      (surah) => surah.surahId === surahId
    );
    if (index === -1) {
      knownSurahs.set([
        ...knownSurahsArr,
        {
          label: surahName,
          value: surahId,
          surahVerseAmount: surahVerseAmount,
        },
      ]);
    }
    localStorage.setItem("knownSurahs", JSON.stringify(knownSurahsArr));
  }

  export function clearSurahs() {
    knownSurahs.set([]);
    localStorage.removeItem("knownSurahs");
  }

  export function selectSalah() {
      salahSurahs.set([]);
      ["fajr", "dhuhr", "asr", "maghrib", "isha"].forEach((salah) => {
         salahSurahs.update(surahs => [
            ...surahs,
            {
              salah,
              surahs: getRandomSurahs(),
              prayerTime: getPrayerTime(salah),
            }
          ]);
      });
     console.log(salahSurahsArr)
  }

  export function refreshSalahs() {
    selectSalah();
  }