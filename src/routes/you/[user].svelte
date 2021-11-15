<script context="module" lang="ts">
	export async function load({ page, fetch, session, context }) {
		return {
			props: {
				username: page.params.user,
			},
		};
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";
	export let username;
	let responseResult: any = {};
	let getResults: Function = function () {};
  let loading, ok = true;
	onMount(async () => {
      loading = true;
			let youfetch = await fetch(`/you/supa/you_api/${username}`);
			if (youfetch.ok) {
				// the user exists so we can continue with displaying results
				responseResult = await youfetch.json();
        loading = false;
			} else {
				// either the server has a code error, function timeout, or the user doesn't exist
				responseResult.resultOk = false;
        loading = false;
        ok = false;
				throw new Error("User not found");
			}
	});
</script>

<h1>{username} | You Page</h1>
<hr>
{#if loading == true}
	<p>Loading...</p>
	<div class="spinner-border text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
{:else if ok == true && loading == false}
	<h2>Featured Studio</h2>
  <div class="card" style="width: 18rem; color: black;">
    <img src={responseResult.studio.image} class="card-img-top" alt="Studio thumbnail">
    <div class="card-body">
      <h5 class="card-title">{responseResult.studio.title}</h5>
      <p class="card-text">{responseResult.studio.description}</p>
      <a href={responseResult.studio_url} class="btn btn-primary">Go to studio</a>
    </div>
  </div>
{:else}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="64"
		height="64"
		fill="currentColor"
		class="bi bi-emoji-frown"
		viewBox="0 0 16 16"
	>
		<path
			d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
		/>
		<path
			d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
		/>
	</svg>
	<p>An error has occurred. This user may not exist.</p>
{/if}


<style>
  .card-title, .card-text {
    max-height: 100px;
    overflow: scroll;
  }
</style>