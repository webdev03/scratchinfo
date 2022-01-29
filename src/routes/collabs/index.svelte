<script lang="ts">
  let collab = '';
  function lengthValid(string) {
    if (string.length > 0 && !isNaN(string)) {
      window.location.href = '/collabs/' + string;
    }
  }
  function onKeyPress(e: KeyboardEvent) {
    if (e.charCode === 13) lengthValid(collab);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Scratchinfo Collabs</h1>
<p>Search for a studio collab:</p>
<div class="flex">
  <input
    placeholder="Search a collab"
    type="text"
    id="collab"
    class="h-12 rounded-l pl-2 text-gray-900"
    on:keypress={onKeyPress}
    bind:value={collab}
  />
  <button
    class="btn-primary m-0 rounded-l-none h-12"
    on:click|preventDefault={() => lengthValid(collab)}>search</button
  >
</div>
<br />
<a class="btn-primary" href="/collabs/create">Create a Collab</a>
<br />
<a href="/privacy" class="hover:underline hover:font-semibold transition-all">Privacy Policy</a>
<br />
<a href="/rules" class="hover:underline hover:font-semibold transition-all"
  >Rules for using Scratchinfo</a
>
