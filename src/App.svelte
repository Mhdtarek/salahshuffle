<script>
  import surahs from "./surahs.json";
  import html2canvas from "html2canvas";
  import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

  let knownSurahs = JSON.parse(localStorage.getItem("knownSurahs")) || [];
  let selectedSalah = "";
  let salahSurahs = [];
  let stage = 1;
  let salahTimesContainer;
  let savingImage = false;
  let globalPrayerTimes;

  function getPrayerTimes() {
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

          globalPrayerTimes = prayerTimes;
          console.log(prayerTimes);
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

  function getPrayerTime(prayerName) {
    const prayerTime = globalPrayerTimes[prayerName.toLowerCase()];
    const formattedTime = `${prayerTime.getHours()}:${prayerTime.getMinutes()}`;
    return `${formattedTime}`;
  }

  function addSurah(surahName, surahId, surahVerseAmount) {
    const index = knownSurahs.findIndex((surah) => surah.surahId === surahId);
    if (index === -1) {
      knownSurahs = [
        ...knownSurahs,
        {
          name: surahName,
          surahId: surahId,
          surahVerseAmount: surahVerseAmount,
        },
      ];
    } else {
      knownSurahs.splice(index, 1);
    }
    localStorage.setItem("knownSurahs", JSON.stringify(knownSurahs));
  }

  function clearSurahs() {
    knownSurahs = [];
    localStorage.removeItem("knownSurahs");
  }

  function selectSalah(salah) {
    selectedSalah = salah;
    if (selectedSalah === "All") {
      salahSurahs = [];
      ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach((salah) => {
        salahSurahs.push({
          salah,
          surahs: getRandomSurahs(),
          prayerTime: getPrayerTime(salah),
        });
      });
    } else {
      salahSurahs = getRandomSurahs();
    }
  }

  function selectAllSalahs() {
    selectedSalah = "All";
    selectSalah(selectedSalah);
  }

  async function saveSalahs() {
    // create a canvas from the Salah times container with padding
    const canvas = await html2canvas(salahTimesContainer, {
      backgroundColor: "black",
      x: -200,
      y: -50, // add 50 pixels of padding at the top
      height: salahTimesContainer.offsetHeight + 100, // add 100 pixels of padding (50 top + 50 bottom)
      width: 500,
    });

    // convert the canvas to a data URL
    const dataUrl = canvas.toDataURL("image/png");

    // create a link element to download the image
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "salah-times.png";

    // trigger a click event on the link to download the image
    link.click();
  }

  function getRandomSurahs() {
    const maxSurahs = 2;
    const availableSurahs = knownSurahs.filter(
      (knownSurah) => knownSurah.surahVerseAmount > maxSurahs
    );
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

  getPrayerTimes();
</script>

<main>
  <h1>Salah shuffler</h1>
  {#if stage == 1}
    <p>
      allows you to shuffle through Quran Surahs and generate random surahs for
      each of the five daily prayers.
    </p>
    <div class="stage-1">
      {#each surahs as surah}
        <button
          class:selected={knownSurahs.some(
            (known) => known.surahId === surah.surah
          )}
          on:click={() => addSurah(surah.name, surah.surah, surah.verses)}
        >
          {surah.name}
        </button>
      {/each}
      <h3>Known Surahs</h3>

      {#each knownSurahs as knownSurah}
        <p>{knownSurah.name}</p>
      {/each}

      <div>
        <button on:click={() => (stage = 2)}> Next </button>
        <button on:click={clearSurahs}>Clear</button>
      </div>
    </div>
  {/if}
  {#if stage == 2}
    <div class="stage-2">
      <button on:click={selectAllSalahs}>All</button>
      {#each ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as salah}
        <button on:click={() => selectSalah(salah)}>{salah}</button>
      {/each}
      {#if selectedSalah === "Fajr" || selectedSalah === "Dhuhr" || selectedSalah === "Asr" || selectedSalah === "Maghrib" || selectedSalah === "Isha"}
        <div bind:this={salahTimesContainer}>
          <h3>{selectedSalah}</h3>
          {#each salahSurahs as salahSurah}
            <p>{salahSurah.name}</p>
          {/each}
        </div>
      {/if}

      {#if selectedSalah == "All"}
        <div bind:this={salahTimesContainer}>
          {#each salahSurahs as salahSurah}
            <h3>{salahSurah.salah} {salahSurah.prayerTime}</h3>
            {#each salahSurah.surahs as surah}
              <p>{surah.name}</p>
            {/each}
          {/each}
        </div>
        <button on:click={saveSalahs}>Save as Image</button>
      {/if}
      <div class="stage-1">
        <button on:click={() => (stage = 1)}> Back </button>
      </div>
    </div>
  {/if}
</main>

<style>
  /* Basic styles */
  main {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    height: 98vh;
    padding: 10px;
  }

  button {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #333;
    color: #f2f2f2;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  button:hover {
    background-color: #555;
  }

  .selected {
    background-color: #555;
  }

  h1,
  h3 {
    font-weight: normal;
  }

  p {
    margin: 0;
  }

  h1,
  h3 {
    font-weight: bold;
  }

  button {
    cursor: pointer;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    background-color: #2ecc71;
    color: #fff;
  }

  button:hover {
    background-color: #27ae60;
  }

  p {
    margin: 5px;
  }

  /* Stage 1 styles */
  .stage-1 button {
    background-color: #3498db;
  }

  .stage-1 button:hover {
    background-color: #2980b9;
  }

  .stage-1 .selected {
    background-color: #e74c3c;
  }

  .stage-1 .selected:hover {
    background-color: #c0392b;
  }

  .stage-1 h3 {
    margin-top: 20px;
  }

  /* Stage 2 styles */
  .stage-2 button {
    background-color: #9b59b6;
  }

  .stage-2 button:hover {
    background-color: #8e44ad;
  }

  .stage-2 h3 {
    margin-top: 20px;
  }
</style>
