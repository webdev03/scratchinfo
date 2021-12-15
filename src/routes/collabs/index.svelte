<script>
  let collab = '';
  function lengthValid(string) {
    if (string.length > 0 && !isNaN(string)) {
      window.location.href = '/collabs/' + string;
    }
  }
  function onKeyPress(e) {
    if (e.charCode === 13) lengthValid(collab);
  }
</script>

<h1>Scratchinfo Collabs</h1>
<p>These are currently in BETA and are subject to change.</p>
<p>Search for a studio collab:</p>
<div class="input-group">
  <input
    placeholder="Search a collab"
    type="text"
    id="collab"
    class=""
    on:keypress={onKeyPress}
    bind:value={collab}
  />
  <button class="btn btn-primary" on:click|preventDefault={() => lengthValid(collab)}>search</button
  >
</div>
<a href="/privacy">Privacy Policy</a>
<a href="/collabs/create">Create a Collab</a>
<style>
  input {
    border: 2px black;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-left: 10px;
    width: 30em;
  }
</style>
