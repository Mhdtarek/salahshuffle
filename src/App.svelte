<script>
  import surahs from "./surahs.json";
  import { saveImage } from "./lib/imageGenerator.js";
  import { getPrayerTimes } from "./lib/getPrayerTimes.js";
  import Testing from "./testing.svelte";
  import {
    knownSurahs,
    salahSurahs,
    addSurah,
    clearSurahs,
    refreshSalahs,
  } from "./lib/surah.js";
  import { get } from "svelte/store";

  let knownSurahsArr = [];
  let salahSurahsArr = [];

  knownSurahs.subscribe((value) => {
    knownSurahsArr = value;
  });
  salahSurahs.subscribe((value) => {
    salahSurahsArr = value;
  });

  let stage = 1;
  let salahTimesContainer;
  let savingImage = false;
  let globalPrayerTimes = getPrayerTimes();

  function nextStage() {
    refreshSalahs();
    getPrayerTimes();

    stage = 2;
  }
</script>

<main>
  <h1>Salah shuffler</h1>
  {#if stage == 1}
    <p>
      allows you to shuffle through Quran Surahs and generate random surahs for
      each of the five daily prayers.
    </p>
    <Testing />
    <div class="stage-1">
      <button on:click={nextStage}> Next </button>
    </div>
  {/if}
  {#if stage == 2}
    <div class="stage-2">
      <button on:click={refreshSalahs}>Refresh</button>

      <div bind:this={salahTimesContainer}>
        {#each salahSurahsArr as salahSurah}
          <h3>
            {salahSurah.salah}
            {salahSurah.prayerTime}
          </h3>
          {#each salahSurah.surahs as surah}
            <p>{surah.label}</p>
          {/each}
        {/each}
      </div>
      <button on:click={() => saveImage(salahTimesContainer)}
        >Save as Image</button
      >
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
    background-color: linear-gradient(
      117.98deg,
      #2989d0 0%,
      #426eed 47.86%,
      #896cf1 108.11%
    );
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
