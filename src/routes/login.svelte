<script lang="ts">
	import { onMount } from "svelte";
	import b2a from "$lib/bta";
	let submitFunction: Function = function () {};
  let isLoggedIn = false;
	onMount(() => {
    isLoggedIn = !!window.localStorage.getItem("authToken")
    if (isLoggedIn) {
      window.location.href = "/"
    }
		submitFunction = function () {
			console.log("Sending user to FluffyScratch for authentication...");
			const urlEncode = b2a(`${window.location.host}/you/supa/fsauth/checkAuth`);
			window.location.href = `https://fluffyscratch.hampton.pw/auth/getKeys/v2?redirect=${urlEncode}`;
		};
	});
</script>

<h1>Log in with FluffyScratch Auth</h1>
<hr>
<button type="button"  on:click={submitFunction()} class="btn btn-primary">Log in with FluffyScratch</button>
<br> <br>
<p style="font-size: 0.75em">Your username will automatically be retrieved when you authenticate with FluffyScratch.</p>
