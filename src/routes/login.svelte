<script lang="ts">
  import { onMount } from 'svelte';
  import multi from '$lib/bta';
  let submitFunction: Function = function () {};
  let isLoggedIn = false;
  let username = '';
  onMount(() => {
    isLoggedIn = !!window.localStorage.getItem('authToken');
    if (isLoggedIn) {
      window.location.href = '/';
    }
    submitFunction = function () {
      if (username.length < 3 || username.length > 20) {
        return;
      }
      console.log('Sending user to ScratchLight for authentication...');
      const urlEncode = multi(false, `${window.location.host}/you/supa/scratchlight/verify`);
      window.location.href = `/scratchlight/authpage?redirect=${urlEncode}&username=${username}`;
    };
  });
</script>

<h1 class="text-3xl font-bold mb-2">Log in with ScratchLight Auth</h1>
<p>
  <b
    >Please follow the <a href="https://scratch.mit.edu/community_guidelines"
      >Scratch Community Guidelines</a
    > when using Scratchinfo.</b
  >
</p>
<a href="/rules" class="hover:underline hover:font-semibold transition-all"
  >Rules for using Scratchinfo</a
>
<p>
  You need to have Scratcher status in order to use Scratchinfo features that require
  authentication.
</p>
<hr />
<p><b>Note that you must have Scratcher status in order to use Scratchinfo.</b></p>
<label for="usernameInput">Enter in your username here:</label>
<br />
<input
  id="usernameInput"
  class="text-gray-900 rounded p-1 w-48"
  name="usernameInput"
  type="text"
  bind:value={username}
/>
<br />
<button type="button" on:click={submitFunction()} class="btn-primary"
  >Log in with ScratchLight</button
>
<br /> <br />
<a href="/privacy" class="hover:underline hover:font-semibold transition-all">Privacy Policy</a>
