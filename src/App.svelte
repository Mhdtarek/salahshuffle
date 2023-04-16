<script>
  import surahs from "./surahs.json";
  import { saveImage } from "./lib/imageGenerator.js";
  import { getPrayerTimes } from "./lib/getPrayerTimes.js";
  import Testing from "./testing.svelte";
  import languagePicker from "./languagePicker.svelte";
  import {
    knownSurahs,
    salahSurahs,
    addSurah,
    clearSurahs,
    refreshSalahs,
  } from "./lib/surah.js";
  import { _ } from "svelte-i18n";
  import LanguagePicker from "./languagePicker.svelte";

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

<main dir={$_("direction")}>
  {#if stage == 1}
    <div class="stage-1">
      <div class="top">
        <h1>{$_("main.name")}</h1>
        <p>
          {$_("main.description")}
        </p>
        <LanguagePicker />
      </div>
      <div class="central">
        <Testing />
      </div>
      <div class="bottom">
        <button on:click={nextStage}>{$_("main.shuffle")}</button>
      </div>
    </div>
  {/if}
  {#if stage == 2}
    <div class="stage-2">
      <div class="top">
        <button class="back-button" on:click={() => (stage = 1)}
          >{$_("main.goBack")}</button
        >
        <div class="right-buttons">
          <button class="refresh-button" on:click={refreshSalahs}
            >{$_("main.refresh")}</button
          >
          <button
            class="save-button"
            on:click={() => saveImage(salahTimesContainer)}
            >{$_("main.saveImage")}</button
          >
        </div>
      </div>
      <div bind:this={salahTimesContainer} class="central">
        {#each salahSurahsArr as salahSurah}
          <div class="salahSurahCard">
            <h3>
              {$_(`prayers.${salahSurah.salah}`)}
            </h3>
            {#each salahSurah.surahs as surah}
              <p>{$_(`surahs.${surah.label}`)}</p>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</main>

<style>
  /* Basic styles */
  main {
    height: 100vh;
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

  .stage-1 .top {
    margin-top: 8vh;
    margin-bottom: 8vh;
    text-align: center;
  }
  .stage-1 .top h1,
  .stage-1 .top p {
    margin-top: 0;
  }
  .stage-1 .top h1 {
    font-size: 5vh;
    font-style: bold;
  }
  .stage-1 .central {
    margin: 0 20vw;
  }
  .stage-1 .bottom button {
    cursor: pointer;
    padding: 1.4vh 3vh;
    margin: 5px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    color: #2989d0;
    font-style: bold;
    font-size: 2vh;
  }
  .stage-1 .bottom {
    display: grid;
    place-items: center;
    margin-top: 10vh;
  }

  .stage-2 .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stage-2 button {
    cursor: pointer;
    padding: 1vh 2vh;
    margin: 5px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    color: #2989d0;
    font-style: bold;
    font-size: 14px;
  }

  .stage-2 .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back-button {
    margin-right: auto;
  }

  .right-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .refresh-button,
  .save-button {
    margin-right: 1em;
  }

  .stage-2 .salahSurahCard {
    text-align: center;
    background-color: #ffffff;
    color: #2989d0;
    border-radius: 10px;
    padding: 5px 0;
    margin: 10px 0;
  }
  .stage-2 .salahSurahCard h3 {
    color: #896cf1;
    font-style: bold;
    font-size: 20px;
  }
  .stage-2 .central {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
  }

  @media only screen and (max-width: 768px) {
    .stage-1 .central {
      margin: 0;
    }
  }
</style>
