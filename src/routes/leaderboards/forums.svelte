<script lang="ts">
  import { onMount } from "svelte";
  import forumlist from "$lib/forumlist";
  let postList: Array<object> = [{ username: "griffpatch" }];
  let problem: boolean = false;
  let loading: boolean = true;
  let total: boolean = true;
  let forum: string = "Advanced Topics";
  let modified, totalmodify: Function = function () {};
  onMount(() => {
    modified = function () {
      loading = true;
      let fetchedForum = forum;
      problem = false;
      fetch(`/leaderboards/api/forum-${fetchedForum}/`)
      .then((res) => {
        if (!res.ok) {
          problem = true;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        postList[fetchedForum] = data;
        loading = false;
        console.log(postList);
      });
    };
    totalmodify = function() {
        console.log("check modified")
        if(total == false && typeof postList[forum] == "undefined") {
            modified();
        }
    }
    fetch("https://scratchdb.lefty.one/v3/forum/category/rank/total/")
      .then((res) => {
        if (!res.ok) {
          problem = true;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        postList["total"] = data;
        loading = false;
        console.log(postList);
      });
  });
</script>

<h1>Most Forum Posts Leaderboard</h1>
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    bind:checked={total}
    id="flexCheckDefault"
    on:change={() => totalmodify()}
  />
  <label class="form-check-label" for="flexCheckDefault"> Total forums? </label>
</div>

<!-- Select forum -->
{#if total == false}
  <select name="forum" bind:value={forum} on:change={() => modified()}>
    {#each forumlist as forum}
      <option value={forum}>{forum}</option>
    {/each}
  </select>
  <br> <br>
{/if}

<!-- Loading -->
{#if loading == true}
<p>Loading...</p>
{/if}

<!-- Error messages -->
{#if problem == true}
  <div class="alert alert-danger" role="alert">
    Oh no! We can't get this leaderboard. Try again later.
  </div>
{/if}

<!-- Total display -->
{#if loading == false && total}
  {#each postList["total"] as user, position}
    <a href="/users/{user['username']}"
      ><div class="user rounded">#{position + 1}: {user["username"]}</div></a
    >
  {/each}
{/if}

<!-- Specific forum display -->
{#if loading == false && !total && typeof postList[forum] != "undefined"}
  {#each postList[forum] as user, position}
    <a href="/users/{user['username']}"
      ><div class="user rounded">#{position + 1}: {user["username"]}</div></a
    >
  {/each}
{/if}
<style>
  .user {
    width: 100%;
    background-color: lightblue;
    min-height: 20px;
    margin-bottom: 20px;
    padding: 10px;
    color: black;
  }
  a {
    text-decoration: none;
  }
</style>
