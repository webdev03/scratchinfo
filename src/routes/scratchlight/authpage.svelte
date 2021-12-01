<script lang="ts">
	// Hi there! Read the README.md of this repository to learn more about
	// the ScratchLight Authentication service.
	import { onMount } from "svelte";
	import multi from "$lib/bta";
	let code = "Loading...";
	let problem,
		authIncorrect = false;
	let loading = true;
	let copyFunction: Function = function () {};
	let redirectLink, rawLink = "/";
	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
		if (!(urlParams.has("username") || urlParams.has("redirect"))) {
			authIncorrect = true;
      throw new Error("The webmaster hasn't set up ScratchLight correctly.")
		}
		const createAuthReq = await fetch("/scratchlight/createAuthSession", {
			method: "POST",
			body: JSON.stringify({
				username: urlParams.get("username"),
			}),
		});
		loading = false;
		if (createAuthReq.ok) {
			problem = false;
			const authJSON = await createAuthReq.json();
			code = authJSON.code;
      rawLink = "https://" + multi(true, urlParams.get("redirect")).toString();
			redirectLink = "https://" + multi(true, urlParams.get("redirect")).toString() + "?privateCode=" + authJSON.private.toString();
		} else {
			problem = true;
		}
		copyFunction = function () {
			navigator.clipboard.writeText(code);
		};
	});
</script>

{#if authIncorrect}
	<div class="alert alert-danger" role="alert">
		The website administrator hasn't set up ScratchLight correctly, so ScratchLight won't work. If you're the website owner, please read the README of the scratchinfo repository on GitHub.
	</div>
{/if}
{#if problem}
	<div class="alert alert-danger" role="alert">
		An error has occurred.
	</div>
{/if}
<h3>
	Please comment this code on the ScratchLight Authentication project, then
	press on the "I'm Done" button.
</h3>
<p><b>Only include the code. No spaces or any characters other than the code will work.</b></p>
<div id="code" class="card">
	<div class="card-body">{code}</div>
</div>
<button class="btn btn-primary" on:click={copyFunction()}>Copy code</button>
<br /> <br />
<a class="btn btn-primary" target="_blank" href="https://scratch.mit.edu/projects/603838920/"
	>Go to Project</a
> <br>
<p><b>You will be taken to {rawLink} once you press the button below.</b></p>
<a class="btn btn-primary" href={redirectLink}>I'm Done</a>

<style>
	.card {
		color: black;
	}
	.card {
		width: 100%;
		align-items: center;
	}
</style>
