<script>
  let user = "";
  function lengthValid(string) {
    if (string.length > 0) {
      window.location.href = "/users/" + string;
    }
  }
  function onKeyPress(e) {
    if (e.charCode === 13) lengthValid(user);
  };
</script>
  <h1>Welcome to ScratchInfo!</h1>
<p>
  This is a small project. You can use the search bar down below to search for a
  Scratch user, and it will return some information.
</p>
<p>
  This website runs on <a href="https://svelte.dev">Svelte</a> and
  <a href="https://kit.svelte.dev">SvelteKit</a> which are both epic projects.
</p>
<div class="input-group centred">
  <input
    placeholder="Search a User"
    type="text"
    id="user"
    class=""
    on:keypress={onKeyPress}
    bind:value={user}
  />
  <button class="btn btn-primary" on:click|preventDefault={() => lengthValid(user)}>search</button>
</div>

<style>
  input {
    border: 500px black;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-left: 10px;
    width: 30em;
    text-align: start;
  }
  .centred {
    justify-content: center;
    padding-bottom: 10px;
  }
</style>