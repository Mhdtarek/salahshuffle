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

<select id="language-picker" bind:value={selectLocale}>
  <option value="ar" on:click={() => setLocale("ar")}>العربية</option>
  <option value="en" on:click={() => setLocale("en")}>English </option>
</select>
