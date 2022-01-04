<script>
  import { onMount } from 'svelte';
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
  <div class="alert alert-danger" role="alert">
    An error has occurred. This studio might exist already, or you need to sign in again. You also
    need to manage the studio.
  </div>
{/if}
{#if success}
  <div class="alert alert-success" role="alert">
    Success! Now go to <a href={`/collabs/${studioID}`}>your new studio page!</a>
  </div>
{/if}
{#if signedIn}
  <p>
    <b
      >Please follow the <a href="https://scratch.mit.edu/community_guidelines"
        >Scratch Community Guidelines</a
      > when using Scratchinfo.</b
    >
  </p>
  <a href="/rules">Rules for using Scratchinfo</a> <br />
  <label for="studio_id">Studio ID:</label>
  <input type="number" class="form-control" bind:value={studioID} />
  <br />
  <button type="button" on:click={saveChanges} class="btn btn-primary">Create collab</button>
{:else}
  <p>Please <a href="/login">sign in</a> to create a collab.</p>
{/if}
