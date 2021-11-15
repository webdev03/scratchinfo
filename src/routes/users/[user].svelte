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
	import Special from "$lib/Special.svelte";
	import OcularStatus from "$lib/OcularStatus.svelte";
	import forumlist from "$lib/forumlist";
	export let username;
	let info: any = { ocular: {}, scratchdb: {} };
	let pfp: any;
	let readForumView, readForumChart: Function;
	let problem = false;
	let loading = true;
	let forumViewReady: boolean = false;
	let forumViewPosts, forumViewRank, forumViewTopic;
	let forumPostSelect = "Advanced Topics";
	onMount(() => {
		readForumView = (forum) => {
			forumViewReady = false;
			forumViewPosts = info.scratchdb.rawDataForum[forum].count;
			forumViewRank = info.scratchdb.rawDataForum[forum].rank;
			forumViewTopic = forumPostSelect;
			forumViewReady = true;
		};
		function forumChart() {}
		function fetchDataGroup() {
			fetch(`/api/${username}`)
				.then((res) => {
					if (!res.ok) {
						console.warn("Problem has arisen.");
					}
					return res.json();
				})
				.then((data) => {
					loading = false;
					if (data.iserror === false) {
						info.user_agent = data["user_agent"];
						info.ocular.status = data["ocular"].status;
						info.ocular.colour = data["ocular"].color;

						info.username = data.username;
						info.scratchTeam = data.scratchteam;
						info.joinDate = data.history.joined;
						pfp = data.images["90x90"];

						info.scratchdb.followers = data["scratchdb"].statistics.followers;
						info.scratchdb.following = data["scratchdb"].statistics.following;
						info.scratchdb.views = data["scratchdb"].statistics.views;
						info.scratchdb.loves = data["scratchdb"].statistics.loves;
						info.scratchdb.favorites = data["scratchdb"].statistics.favorites;

						info.scratchdb.forumTotalRank =
							data.counts.total.rank ||
							"ScratchDB has no data for this user. Please try later.";
						info.scratchdb.forumTotalCount =
							data.counts.total.count ||
							"ScratchDB has no data for this user. Please try later.";
						info.scratchdb.rawDataForum =
							data.counts ||
							"ScratchDB has no data for this user. Please try later.";
						var ctx = document.getElementById("myChart");
						readForumChart = () => {
							let object = { colours: [] };
							for (let index = 0; index < forumlist.length; index++) {
								try {
									object[index] =
										info.scratchdb.rawDataForum[forumlist[index]].count;
								} catch {
									object[index] = 0;
								}
								object.colours[index] =
									"#" + Math.floor(Math.random() * 16777215).toString(16);
							}
							return object;
						};
						// @ts-ignore
						var myChart = new Chart(ctx, {
							type: "pie",
							data: {
								labels: forumlist,
								datasets: [
									{
										label: "Forum Posts",
										data: readForumChart(),
										borderColor: readForumChart().colours,
										borderWidth: 1,
									},
								],
							},
							options: {
								responsive: false,
							},
						});
					} else {
						loading = false;
						problem = true;
						console.error(data);
						info.errormessage = data["error_msg"];
					}
				});
		}
		fetchDataGroup();
	});
</script>

{#if loading}
	<p>Loading...</p>
	<div class="spinner-border text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
	<br />
{:else if problem}
	<div class="alert alert-danger" role="alert">
		Oh no! It looks like this user may not exist, your internet isn't working,
		or an API is down!
	</div>
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
	<br /><br />
	<p>DEBUG: {info.errormessage}</p>
{:else}
	<img
		width="90px"
		height="90px"
		src={pfp}
		alt={`${info.username} Profile Picture`}
	/>
	<br />
	{info.username}{#if info.scratchTeam}*{/if} | <OcularStatus {info} />
	<Special {info} />
	<br />
	<p>Joined on {new Date(info.joinDate).toLocaleString()}</p>
	<p>Latest User Agent: {info.user_agent}</p>
	<a class="btn btn-you btn-primary" role="button" href={`/you/${info.username}`}
		>Visit on Scratchinfo You</a
	>

	<a
		class="btn btn-primary"
		role="button"
		href={`https://scratch.mit.edu/users/${info.username}`}>Visit on Scratch</a
	>
	<a
		class="btn btn-primary"
		role="button"
		href={`https://scratchstats.com/${info.username}`}>Visit on ScratchStats</a
	>
	<a
		class="btn btn-primary"
		role="button"
		href={`https://ocular.jeffalo.net/user/${info.username}`}>Visit on ocular</a
	>
	<a
		class="btn btn-primary"
		role="button"
		href={`https://postpercent.rirurin.com/users/${info.username}`}
		>Visit on PostPercent</a
	>
	<a
		class="btn btn-primary"
		role="button"
		href={`https://magnifier.potatophant.net/users/${info.username}`}
		>Visit on Magnifier</a
	>
	<a
		class="btn btn-primary"
		role="button"
		href={`https://scratory.vercel.app/user/${info.username}`}
		>Visit on Scratory</a
	>

	<hr />

	<p>Followers: {info.scratchdb.followers}</p>
	<p>Following: {info.scratchdb.following}</p>
	<br />
	<p>Total Loves: {info.scratchdb.loves}</p>
	<p>Total Favourites: {info.scratchdb.favorites}</p>
	<p>Total View Count: {info.scratchdb.views}</p>
	<hr />
	<p>Total Forum Posts: {info.scratchdb.forumTotalCount}</p>
	<p>Total Forum Rank: {info.scratchdb.forumTotalRank}</p>
	<br />
	<label for="forum-post"
		>Choose the forum you would like to see more information about.</label
	>
	<select bind:value={forumPostSelect} name="forum-post" id="forum-post">
		{#each forumlist as forum}
			<option value={forum}>{forum}</option>
		{/each}
	</select>
	<button
		type="button"
		on:click={readForumView(forumPostSelect)}
		class="btn btn-primary">Read</button
	>
	{#if forumViewReady === true}
		<p>{forumViewTopic} Posts: {forumViewPosts}</p>
		<p>{forumViewTopic} Rank: {forumViewRank}</p>
	{/if}
{/if}
<canvas id="myChart" width="600" height="600" />

<style>
	.btn-primary {
		margin-bottom: 0.5em;
	}
</style>
