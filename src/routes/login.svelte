<script lang="ts">
	import { onMount } from "svelte";
	import multi from "$lib/bta";
	let submitFunction: Function = function () {};
	let isLoggedIn = false;
  let username = "";
	onMount(() => {
		isLoggedIn = !!window.localStorage.getItem("authToken");
		if (isLoggedIn) {
			window.location.href = "/";
		}
		submitFunction = function () {
      if (username.length < 3 || username.length > 20) {
        return;
      }
			console.log("Sending user to ScratchLight for authentication...");
			const urlEncode = multi(
				false,
				`${window.location.host}/you/supa/scratchlight/verify`
			);
			window.location.href = `/scratchlight/authpage?redirect=${urlEncode}&username=${username}`;
		};
	});
</script>

<h1>Log in with ScratchLight Auth</h1>
<hr />
<label for="usernameInput">Enter in your username here:</label>
<br>
<input id="usernameInput" name="usernameInput" type="text" bind:value={username}>
<br>
<br>
<button type="button" on:click={submitFunction()} class="btn btn-primary"
	>Log in with ScratchLight</button
>
<br /> <br />
<a href="/privacy">Privacy Policy</a>
