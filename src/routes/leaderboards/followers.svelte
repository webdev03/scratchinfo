<script lang="ts">
  import { onMount } from "svelte";
  let mostFollowed: Array<object> = [{ username: "griffpatch" }];
  let problem: boolean = false;
  let loading: boolean = true;
  onMount(() => {
    fetch("/leaderboards/api/followers")
      .then((res) => {
        if (!res.ok) {
          problem = true;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        mostFollowed = data;
        loading = false;
      });
  });
</script>

<h1 class="text-3xl font-bold mb-2">Most Followers Leaderboard</h1>
{#if problem == true}
  <div class="alert alert-danger" role="alert">
    Oh no! We can't get this leaderboard. Try again later.
  </div>
{/if}
{#if loading == false}
  {#each mostFollowed as user, position}
    <a href="/users/{user['username']}"
      ><div class="bg-sky-300 min-h-[20px] mb-2 p-2 w-full rounded text-gray-900">
        #{position + 1}: {user["username"]}
        <div class="float-right inline">
          {user["statistics"].followers} followers
        </div>
      </div></a
    >
  {/each}
{:else}
  Loading...
{/if}

<style>
  a {
    text-decoration: none;
  }
</style>
