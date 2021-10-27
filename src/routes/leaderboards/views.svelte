<script lang="ts">
    import { onMount } from 'svelte';
    let mostViewed: Array<object> = [{username: "griffpatch"}];
    let problem: boolean = false;
    let loading: boolean = true;
    onMount(() => {
        fetch("https://scratchdb.lefty.one/v3/user/rank/global/views").then((res) => {
            if(!res.ok) {
                problem = true;
            } else {
                return res.json();
            }
        }).then((data) => {
            mostViewed = data;
            loading = false;
        })
    })
</script>
<h1>Most Viewed Leaderboard</h1>
{#if problem == true}
  <div class="alert alert-danger" role="alert">
    Oh no! We can't get this leaderboard. Try again later.
  </div>
{/if}
{#if loading == false}
{#each mostViewed as user, position}
    <a href="/users/{user["username"]}"><div class="user rounded">#{position + 1}: {user["username"]} <div style="float: right !important; display: inline;">{user["statistics"].views} views received</div></div></a>
{/each}
{:else}
    Loading...
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
