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
  let readForumView, readForumChart: Function;
  let forumlist = [
    "New Scratchers",
    "Announcements",
    "Requests",
    "Show and Tell",
    "Collaboration",
    "Help with Scripts",
    "Project Ideas",
    "Bugs and Glitches",
    "Other Languages",
    "Questions about Scratch",
    "Things I'm Making and Creating",
    "Advanced Topics",
    "Things I'm Reading and Playing",
    "Suggestions",
    "Open Source Projects",
    "Connecting to the Physical World",
    "Developing Scratch Extensions",
    "Africa",
    "Bahasa Indonesia",
    "Català",
    "Deutsch",
    "Ελληνικά",
    "Español",
    "فارسی",
    "Français",
    "עברית",
    "한국어",
    "Italiano",
    "Nederlands",
    "日本語",
    "Norsk",
    "Polski",
    "Português",
    "Pусский",
    "Türkçe",
    "中文",
    "Translating Scratch"
  ];
  let problem,
    scratchdbProblem,
    noStats: boolean = false;
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
          // Here it looks like there is a big problem.
          if (data.statistics == undefined) {
            noStats = true;
            console.warn("No statistics in ScratchDB.");
          } else {
            try {
              info.scratchdb.followers = data.statistics.followers;
              info.scratchdb.following = data.statistics.following;
              info.scratchdb.views = data.statistics.views;
              info.scratchdb.loves = data.statistics.loves;
              info.scratchdb.favorites = data.statistics.favorites;
            } catch (err) {
              scratchdbProblem = true;
              throw err;
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
              let object = {};
              for (let index = 0; index < forumlist.length; index++) {
                try {
                  object[index] =
                    info.scratchdb.rawDataForum[forumlist[index]].count;
                } catch {
                  object[index] = 0;
                }
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
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(245, 19, 92, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: false
              }
            });
          } catch (err) {
            throw err;
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
            );
          }
        })
        .then((res) => {
          if (!res.ok) {
            info.scratchdb.userAgent = "User Agent not found.";
            console.warn("Problem has arisen with ScratchDB.");
          }
          return res.json();
        })
        .then((data) => {
          if (info.scratchdb.userAgent === "User agent not found.") {
            console.log("no.");
          } else {
            info.scratchdb.userAgent = data.metadata["user_agent"];
          }
        })
        .catch((error) => {});
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
{#if noStats == true}
  <div class="alert alert-danger" role="alert">
    The ScratchDB API doesn't return statistics for {info.username} for some reason.
  </div>
{/if}

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
    href={`https://ocular.jeffalo.net/user/${info.username}`}>Visit on Ocular</a
  >
  <a
    class="btn btn-primary"
    role="button"
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
<canvas id="myChart" width="600" height="600"/>
<br>
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

<style>
  .btn-primary {
    margin-bottom: 0.5em;
  }
</style>
