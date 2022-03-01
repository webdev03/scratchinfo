<script>
  import { onMount } from 'svelte';
  import Success from '$lib/components/Success.svelte';
  import Failure from '$lib/components/Failure.svelte';
  let studioID = 0;
  let signedIn,
    problem,
    success = false;
  let saveChanges = async () => {};
  onMount(async () => {
    signedIn = !!window.localStorage.getItem('authToken');
    saveChanges = async () => {
      success = false;
      problem = false;
      const saveFetch = await fetch('/collabs/api/create', {
        method: 'POST',
        body: JSON.stringify({
          token: window.localStorage.getItem('authToken'),
          studio: studioID
        })
      });
      if (saveFetch.ok) {
        success = true;
        problem = false;
      } else {
        success = false;
        problem = true;
      }
    };
  });
</script>

{#if problem}
  <Failure
    description="An error has occurred. This studio might exist already, or you need to sign in again. You also
need to manage the studio."
  />
{/if}
{#if success}
  <Success description="Now go to <a href={`/collabs/${studioID}`}>your new studio page!" />
{/if}
{#if signedIn}
  <p>
    <b
      >Please follow the <a href="https://scratch.mit.edu/community_guidelines"
        >Scratch Community Guidelines</a
      > when using Scratchinfo.</b
    >
  </p>
  <a href="/rules" class="underline hover:font-semibold transition-all"
    >Rules for using Scratchinfo</a
  >
  <label for="studio_id">Studio ID:</label>
  <input type="number" class="form-control text-black rounded-sm p-0.5" bind:value={studioID} />
  <br />
  <button type="button" on:click={saveChanges} class="btn-primary">Create collab</button>
{:else}
  <p>Please <a href="/login">sign in</a> to create a collab.</p>
{/if}
