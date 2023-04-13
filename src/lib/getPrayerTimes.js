import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

let globalPrayerTimes

export function getPrayerTimes() {
    const params = CalculationMethod.UmmAlQura();
    const date = new Date();

    if ("geolocation" in navigator) {
      // geolocation is available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const coordinates = new Coordinates(latitude, longitude);
          const prayerTimes = new PrayerTimes(coordinates, date, params);

          globalPrayerTimes = prayerTimes

          console.log(prayerTimes);
          return prayerTimes
        },
        (error) => {
          // handle errors
          console.error(error);
        }
      );
    } else {
      // geolocation is not available
      console.log("Geolocation is not available");
    }
  }

  export function getPrayerTime(prayerName) {
    if (!globalPrayerTimes) getPrayerTimes(); else {   
        const prayerTime = globalPrayerTimes[prayerName.toLowerCase()];
        const formattedTime = `${prayerTime.getHours()}:${prayerTime.getMinutes()}`;
        return `${formattedTime}`;
    }
  }