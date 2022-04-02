<script>
  let user = "";
  function lengthValid(string) {
    if (string.length > 0) {
      window.location.href = "/users/" + string;
    }
  }
  function onKeyPress(e) {
    if (e.charCode === 13) lengthValid(user);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Welcome to Scratchinfo!</h1>
<p>
  This is a small project. You can use the search bar down below to search for a Scratch user, and
  it will return some information.
</p>
<input
  placeholder="Search a User"
  type="text"
  class="p-2 text-black rounded pl-3"
  id="user"
  on:keypress={onKeyPress}
  bind:value={user}
/>
<button class="btn-primary" on:click|preventDefault={() => lengthValid(user)}>search</button>
<!-- <style>
  input {
    border: 2px black;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-left: 10px;
    width: 30em;
  }
</style> -->
