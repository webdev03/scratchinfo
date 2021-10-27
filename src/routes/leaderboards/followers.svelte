<script lang="ts">
    import { onMount } from 'svelte';
    let mostFollowed: Array<object> = [{username: "griffpatch"}];
    let problem: boolean = false;
    let loading: boolean = true;
    onMount(() => {
        fetch("https://scratchdb.lefty.one/v3/user/rank/global/followers").then((res) => {
            if(!res.ok) {
                problem = true;
            } else {
                return res.json();
            }
        }).then((data) => {
            mostFollowed = data;
            loading = false;
        })
    })
</script>
<h1>Most Followers Leaderboard</h1>
{#if problem == true}
  <div class="alert alert-danger" role="alert">
    Oh no! We can't get this leaderboard. Try again later.
  </div>
{/if}
{#if loading == false}
{#each mostFollowed as user, position}
    <a href="/users/{user["username"]}"><div class="user rounded">#{position + 1}: {user["username"]} <div style="float: right !important; display: inline;">{user["statistics"].followers} followers</div></div></a>
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
