<script lang="ts">
  import { onMount } from 'svelte';
  let submitFunction: Function = function () {};
  onMount(() => {
    submitFunction = function () {
      window.localStorage.clear();
      window.location.href = '/';
    };
  });
</script>

<h1>Log out</h1>
<hr />
<p>Are you sure that you want to log out?</p>
<button type="button" on:click={submitFunction()} class="btn btn-primary">Log out</button>
