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
  let info: any = { ocular: {}, scratchdb: {} };
  let pfp: any;
  let readForumView: Function;
  let problem, scratchdbProblem: boolean = false;
  let forumViewReady: boolean = false;
  let forumViewPosts, forumViewRank, forumViewTopic;
  let forumPostSelect = "Advanced Topics";
  let corsprefix = "https://api.allorigins.win/raw?url=";
  onMount(() => {
    readForumView = (forum) => {
      forumViewReady = false;
      forumViewPosts = info.scratchdb.rawDataForum[forum].count;
      forumViewRank = info.scratchdb.rawDataForum[forum].rank;
      forumViewTopic = forumPostSelect;
      forumViewReady = true;
    };
    function fetchDataGroup() {
      fetch(`${corsprefix}https://api.scratch.mit.edu/users/${username}`)
        .then((res) => {
          if (!res.ok) {
            problem = true;
            console.warn("Problem has arisen.");
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
            console.warn("Problem has arisen with Ocular.");
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
            scratchdbProblem = true;
            console.warn("Problem has arisen with ScratchDB.");
          }
          return res.json();
        })
        .then((data) => {
          if (data == undefined) {
          } else { try {
            info.scratchdb.followers = data.statistics.followers;
            info.scratchdb.following = data.statistics.following;
            info.scratchdb.views = data.statistics.views;
            info.scratchdb.loves = data.statistics.loves;
            info.scratchdb.favorites = data.statistics.favorites;
          } catch {
            scratchdbProblem = true;
          }
          }
        })
        .catch((error) => {
          scratchdbProblem = true;
          throw error;
        });
      fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${username}`)
        .then((res) => {
          if (!res.ok) {
            scratchdbProblem = true;
            console.warn("Problem has arisen with ScratchDB.");
          }
          return res.json();
        })
        .then((data) => {
          if (data == undefined) {
            scratchdbProblem = true;
          }
          try {
          info.scratchdb.forumTotalRank = data.counts.total.rank || "ScratchDB has no data for this user. Please try later.";
          info.scratchdb.forumTotalCount = data.counts.total.count || "ScratchDB has no data for this user. Please try later.";
          info.scratchdb.rawDataForum = data.counts || "ScratchDB has no data for this user. Please try later.";
          } catch {
            scratchdbProblem = true;
          }
        })
        .catch((error) => {
          problem = true;
          throw error;
        });
      fetch(
        `${corsprefix}https://api.scratch.mit.edu/users/${username}/projects/?limit=1`
      )
        .then((res) => {
          if (!res.ok) {
            console.warn("Problem has arisen.");
          }
          return res.json();
        })
        .then((data: Array<any>) => {
          if (data[0] == undefined) {
            console.log("no projects");
          } else {
            return fetch(
              `https://scratchdb.lefty.one/v3/project/info/${data[0].id}`
            )
          }
        }).then((res) => {
          if (!res.ok) {
            scratchdbProblem = true;
            console.warn("Problem has arisen with ScratchDB.");
          }
          return res.json();
        }).then((data) => {
          info.scratchdb.userAgent = data.metadata["user_agent"]
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
{#if scratchdbProblem == true}
  <div class="alert alert-danger" role="alert">
    The ScratchDB API is down or doesn't have {info.username} in its records.
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
  <p>Latest User Agent: {info.scratchdb.userAgent}</p>
  <p>
    <a
      class="external-visit"
      href={`https://scratch.mit.edu/users/${info.username}`}
      >Visit on Scratch</a
    >
    <a class="external-visit" href={`https://scratchstats.com/${info.username}`}
      >Visit on ScratchStats</a
    >
    <a
      class="external-visit"
      href={`https://ocular.jeffalo.net/user/${info.username}`}
      >Visit on Ocular</a
    >
    <a
      class="external-visit"
      href={`https://postpercent.rirurin.com/users/${info.username}`}
      >Visit on PostPercent</a
    >
  </p>

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
  <label for="forum-post"
    >Choose the forum you would like to see more information about.</label
  >
  <select bind:value={forumPostSelect} name="forum-post" id="forum-post">
    <option value="New Scratchers">New Scratchers</option>
    <option value="Announcements">Announcements</option>
    <option value="Requests">Requests</option>
    <option value="Show and Tell">Show and Tell</option>
    <option value="Collaboration">Collaboration</option>
    <option value="Help with Scripts">Help with Scripts</option>
    <option value="Project Ideas">Project Ideas</option>
    <option value="Bugs and Glitches">Bugs and Glitches</option>
    <option value="Other Languages">Other Languages</option>
    <option value="Questions about Scratch">Questions about Scratch</option>
    <option value="Things I'm Making and Creating"
      >Things I'm Making and Creating</option
    >
    <option value="Advanced Topics">Advanced Topics</option>
    <option value="Things I'm Reading and Playing"
      >Things I'm Reading and Playing</option
    >
    <option value="Suggestions">Suggestions</option>
    <option value="Open Source Projects">Open Source Projects</option>
    <option value="Connecting to the Physical World"
      >Connecting to the Physical World</option
    >
    <option value="Developing Scratch Extensions"
      >Developing Scratch Extensions</option
    >
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
