<script>
  import { locale, locales } from "svelte-i18n";
  import { onMount } from "svelte";

  let currentLocale;
  let selectLocale;
  locale.subscribe((value) => {
    currentLocale = value;
  });

  function setLocale(newLocale) {
    localStorage.setItem("locale", newLocale);

    locale.set(newLocale);
  }

  onMount(() => {
    const savedLocale = localStorage.getItem("locale");

    if (savedLocale) {
      locale.set(savedLocale);
    }
  });
</script>

<button value="ar" on:click={() => setLocale("ar")}>العربية</button>
<button value="en" on:click={() => setLocale("en")}>English </button>

<style>
  button {
    cursor: pointer;
    padding: 0.7vh 1.5vh;
    margin: 5px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    color: #2989d0;
    font-style: bold;
    font-size: 1.6vh;
  }
</style>
