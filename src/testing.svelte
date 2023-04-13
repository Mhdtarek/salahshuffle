<script>
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import surahs from "./surahs.json";
  import { knownSurahs } from "./lib/surah";
  let value = [];
  let checked = [];
  let isChecked = {};
  let knownSurahsArr = [];

  knownSurahs.subscribe((value) => {
    knownSurahsArr = value;
  });

  $: computeValue(checked);
  $: computeIsChecked(checked);

  function computeIsChecked() {
    isChecked = {};
    checked.forEach((c) => (isChecked[c] = true));
  }

  function computeValue() {
    value = checked.map((c) => surahs.find((i) => i.value === c));
    knownSurahs.set(value);
    console.log({ knownSurahsArr });
  }

  function handleChange(e) {
    if (e.type === "clear" && Array.isArray(e.detail)) checked = [];
    else
      checked.includes(e.detail.value)
        ? (checked = checked.filter((i) => i != e.detail.value))
        : (checked = [...checked, e.detail.value]);

    localStorage.setItem("knownSurahs", JSON.stringify(checked));
  }

  onMount(() => {
    const savedChecked = localStorage.getItem("knownSurahs");
    if (savedChecked) {
      checked = JSON.parse(savedChecked);
    }
  });
</script>

<div class="select">
  <Select
    items={surahs}
    {value}
    multiple={true}
    filterSelectedItems={false}
    closeListOnChange={false}
    placeholder="Select all known Surahs"
    on:select={handleChange}
    on:clear={handleChange}
  >
    <div class="item" slot="item" let:item>
      <label for={item.value}>
        <input
          type="checkbox"
          id={item.value}
          bind:checked={isChecked[item.value]}
        />
        {item.label} ({item.verses} verses)
      </label>
    </div>
  </Select>
</div>

<style>
  .item {
    pointer-events: none;
  }

  .select {
    color: black;
  }
  .multi-item {
    display: none;
  }
</style>
