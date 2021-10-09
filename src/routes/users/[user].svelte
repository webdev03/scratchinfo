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
  export let username;
  let info: any = { ocular: {}, scratchdb: {}};
  let pfp: any;
  let problem: boolean = false;
  let corsprefix = "https://api.allorigins.win/raw?url=";
  onMount(() => {
    function fetchDataGroup() {
      fetch(`${corsprefix}https://api.scratch.mit.edu/users/${username}`)
        .then((res) => {
          if (!res.ok) {
            problem = true;
            throw new Error("Problem has arisen.");
          }
          return res.json();
        })
        .then((data) => {
          if (data == undefined) {
            problem = true;
          }
          info.username = data.username;
          info.scratchTeam = data.scratchteam;
          info.joinDate = data.history.joined;
          pfp = data.profile.images["90x90"];
        })
        .catch((error) => {
          problem = true;
          throw error;
        });
      fetch(`https://my-ocular.jeffalo.net/api/user/${username}`)
        .then((res) => {
          if (!res.ok) {
            problem = true;
            throw new Error("Problem has arisen.");
          }
          return res.json();
        })
        .then((data) => {
          if (data == undefined) {
            problem = true;
          }
          info.ocular.status = data.status;
          info.ocular.colour = data.color;
          if (data.status == undefined || data.color == undefined) {
            info.ocular.status = "No ocular status found.";
          }
        })
        .catch((error) => {
          problem = true;
          throw error;
        });
        fetch(`https://scratchdb.lefty.one/v3/user/info/${username}`)
        .then((res) => {
          if (!res.ok) {
            problem = true;
            throw new Error("Problem has arisen.");
          }
          return res.json();
        })
        .then((data) => {
          if (data == undefined) {
            problem = true;
          }
          info.scratchdb.followers = data.statistics.followers;
          info.scratchdb.following = data.statistics.following;
          info.scratchdb.views = data.statistics.views;
          info.scratchdb.loves = data.statistics.loves;
          info.scratchdb.favorites = data.statistics.favorites;
        })
        .catch((error) => {
          problem = true;
          throw error;
        });
    }
    fetchDataGroup();
  });
</script>

{#if problem == true}
  <div class="alert alert-danger" role="alert">
    Oh no! It looks like this user may not exist, your internet isn't working,
    or an API is down!
  </div>
{/if}

<div class="">
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
  <p>
    <a class="external-visit" href={`https://scratch.mit.edu/users/${info.username}`}
      >Visit on Scratch</a
    >
    <a class="external-visit" href={`https://scratchstats.com/${info.username}`}
      >Visit on ScratchStats</a
    >
    <a class="external-visit" href={`https://ocular.jeffalo.net/user/${info.username}`}
      >Visit on Ocular</a
    >
    <a class="external-visit" href={`https://postpercent.rirurin.com/users/${info.username}`}
      >Visit on PostPercent</a
    >
  </p>

  <hr />

  <p>Followers: {info.scratchdb.followers}</p>
  <p>Following: {info.scratchdb.following}</p>
  <br>
  <p>Total Loves: {info.scratchdb.loves}</p>
  <p>Total Favourites: {info.scratchdb.favorites}</p>
  <p>Total View Count: {info.scratchdb.views}</p>
</div>

<style>
  .external-visit {
    height: 40px;
    text-align: center;
    border-radius: 5px;
    color: black;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: deepskyblue;
    display: inline;
    text-decoration: none;
  }
</style>
