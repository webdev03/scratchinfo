<script lang="ts">
	import { onMount } from "svelte";
	let loggedOut = false;
	let loading = true;
	let studioID = 0;
	onMount(async () => {
		loggedOut = !!!window.localStorage.getItem("authToken");
		if (loggedOut) {
			window.location.href = "/";
		}
		// CUD = current user data
		const CUDFetch = await fetch("/you/supa/fsauth/getUserFromToken", {
			method: "POST",
			body: JSON.stringify({
				token: window.localStorage.getItem("authToken").toString(),
			}),
		});
		if (!CUDFetch.ok) {
			window.localStorage.clear();
			window.location.href = "/login";
		}
		const cfJSON = await CUDFetch.json();
		const userDataFetch = await fetch(`/you/supa/you_api/${cfJSON.username}`);
		loading = false;
		if (userDataFetch.ok) {
			const userData = await userDataFetch.json();

			studioID = userData.data[0].studio;
		} else {
		}
	});
</script>

<h1>Scratchinfo Dashboard</h1>
<hr />
<h2>Your You Page</h2>
{#if loading}
	<p>Loading...</p>
	<div class="spinner-border text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
{:else}
	<label for="studio_id">Studio ID:</label>
	<input type="number" class="form-control" bind:value={studioID} step="0." />
{/if}

<style>
  /* Thanks StackOverflow for these styles */
	input[type="number"] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
  /* The other styles on this page is Bootstrap 5 */
</style>
