<script lang="ts">
  import { onMount } from 'svelte';
  import Failure from '$lib/components/Failure.svelte';
  let loggedOut = false;
  let loading = true;
  let problem = false;
  let isBusy,
    workingOnProject = false;
  let studioID,
    percentDoneWithProject: number = 0;
  let saveChanges = async function () {};
  onMount(async () => {
    loading = true;
    problem = false;
    isBusy = false;
    loggedOut = !!!window.localStorage.getItem('authToken');
    if (loggedOut) {
      window.location.href = '/login';
    }
    saveChanges = async function () {
      const scf = await fetch('/you/supa/you_api/func/set', {
        method: 'POST',
        body: JSON.stringify({
          token: window.localStorage.getItem('authToken').toString(),
          studio: Number(studioID || '0'),
          busy: !!isBusy,
          isWorkingOnProject: workingOnProject,
          percentProjectDone: percentDoneWithProject
        })
      });
      if (scf.ok) {
        problem = false;
        // continue on with scripts
      } else {
        // an error has occured so handle it appropriately
        problem = true;
      }
    };
    // CUD = current user data
    const CUDFetch = await fetch('/you/supa/scratchlight/getUserToken', {
      method: 'POST',
      body: JSON.stringify({
        token: window.localStorage.getItem('authToken').toString()
      })
    });
    if (!CUDFetch.ok) {
      window.localStorage.clear();
      window.location.href = '/login';
    }
    const cfJSON = await CUDFetch.json();
    const userDataFetch = await fetch(`/you/supa/you_api/${cfJSON.username}`);
    loading = false;
    if (userDataFetch.ok) {
      const userData = await userDataFetch.json();

      studioID = userData.data[0].studio;
      isBusy = userData.data[0].busy;
      workingOnProject = userData.data[0].workingOnProject;
      percentDoneWithProject = userData.data[0].percentageDoneWithProject;
    } else {
      console.log('Oh no! An error has occured.');
    }
  });
</script>

<h1 class="text-3xl font-bold mb-2">Scratchinfo Dashboard</h1>
<p>Dashboard name inspired by ocular by @Jeffalo</p>
<a href="/privacy" class="underline">Privacy Policy</a> <br />
<a href="/rules" class="underline">Rules for using Scratchinfo</a> <br /> <br />
<a class="btn-primary mt-0 mb-1" href="/logout" role="button">Log out</a>
<hr />
<h2 class="text-xl font-bold mb-2">Your You Page</h2>
{#if problem}
  <Failure title="Oh no!" description="No!! An error occurred!" />
{/if}
{#if loading}
  <p>Loading...</p>
{:else}
  <label for="studio_id">Busy?</label>
  <input type="checkbox" bind:checked={isBusy} />
  <br />
  <label for="studio_id">Studio ID:</label>
  <input type="number" class="text-black rounded-sm p-0.5" bind:value={studioID} />
  <br />
  <label for="studio_id">Working on a project?</label>
  <input type="checkbox" bind:checked={workingOnProject} />
  <br />
  {#if workingOnProject}
    <label for="studio_id">Percentage done with project:</label>
    <input type="number" class="text-black rounded-sm p-0.5" bind:value={percentDoneWithProject} />
  {/if}
  <br />
  <button type="button" on:click={saveChanges} class="btn-primary">Save changes</button>
{/if}

<style>
  /* Thanks StackOverflow for these styles */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /* The other styles on this page is TailwindCSS */
</style>
