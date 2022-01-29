<script context="module" lang="ts">
  export async function load({ params, fetch, session, context }) {
    return {
      props: {
        id: params.id
      }
    };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import GoalViewer from '$lib/GoalViewer.svelte';
  import ReleaseViewer from '$lib/ReleaseViewer.svelte';
  import Success from '$lib/components/Success.svelte';
  import Failure from '$lib/components/Failure.svelte';
  export let id;
  let collabData: any;
  let setProblem,
    problem,
    success,
    signedIn = false;
  let loading = true;
  let permissions = { manager: false };
  let isEditing = false;
  let goals,
    releases = [];
  let report,
    startEditor,
    saveChanges = async () => {};
  onMount(async () => {
    // define report
    signedIn = !!window.localStorage.getItem('authToken');
    report = async () => {
      if (!confirm("Are you sure you want to report?")) return;
      const reportFetch = await fetch(`/collabs/api/report`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'studio',
          name: id,
          token: window.localStorage.getItem('authToken')
        })
      });
      if (!reportFetch.ok) {
        console.error(reportFetch.statusText)
        alert('An error has occurred.');
        return;
      } else {
        alert('Thank you for reporting. Your report has been processed. Please contact god286 on Scratch saying that you have reported on Scratchinfo.');
      }
    };

    const collabFetch = await fetch(`/collabs/api/${id.toString()}`);
    if (collabFetch.ok) {
      collabData = await collabFetch.json();
      try {
        goals = JSON.parse(collabData.collab.goals);
      } catch {
        goals = collabData.collab.goals;
      }
      try {
        releases = JSON.parse(collabData.collab.releases);
      } catch {
        releases = collabData.collab.releases;
      }

      loading = false;
      problem = false;
    } else {
      problem = true;
      loading = false;
    }
    startEditor = async () => {
      if (isEditing) {
        const confirmation = confirm(
          'Have you saved your changes? Do you want to leave the editor?'
        );
        if (!confirmation) return;
      }
      isEditing = !isEditing;
    };
    if (signedIn) {
      const permCheck = await fetch('/collabs/api/permission', {
        method: 'POST', // yes I know it is post, but I don't know what other method
        body: JSON.stringify({
          token: window.localStorage.getItem('authToken'),
          studio: id
        })
      });
      permissions = await permCheck.json();
    }
    saveChanges = async () => {
      setProblem = false;
      const setData = await fetch('/collabs/api/set', {
        method: 'PUT',
        body: JSON.stringify({
          goals: goals,
          releases: releases,
          token: window.localStorage.getItem('authToken'),
          studio: id
        })
      });
      if (!setData.ok) {
        setProblem = true;
      } else {
        setProblem = false;
        success = true;
      }
    };
  });
</script>

{#if success}
  <Success />
{:else if setProblem && !loading}
  <Failure />
{/if}
{#if isEditing}
  <b>Editing mode on.</b>
  <button class="btn-primary" on:click={saveChanges}
    ><i class="bi bi-save-fill" /> Save changes</button
  >{/if}
<h1 class="text-3xl font-bold mb-2">Collab</h1>
{#if signedIn && permissions.manager}
  <button on:click={startEditor()} class="btn-primary"
    ><i class="bi bi-pencil-square" /> Edit</button
  >{/if}
<hr class="mt-1 mb-1" />
{#if loading}
  <p>Loading...</p>
{:else if problem}
  <p>An error has occurred.</p>
  <p>If you want to create a collab, go <a href="/collabs/create">here</a>.</p>
  <p>An error may have occurred on the server, or you typed the studio ID wrong.</p>
{:else}
  <h3 class="text-2xl font-bold">{collabData.studioData.title}</h3>
  <p>Scratchinfo Collab created by {collabData.creator}</p>
  {#if signedIn}
    <button
      type="button"
      class="btn-primary bg-red-400" on:click={report}><i class="bi bi-flag-fill" /> Report</button
    >
  {:else}
    <p>Sorry, signed out users cannot report.</p>
  {/if}
  <br />
  <img
    class="rounded"
    src={`//cdn2.scratch.mit.edu/get_image/gallery/${collabData.studioData.id}_212x125.png`}
    width="212"
    height="125"
    alt="Thumbnail for studio"
  />
  <br /> <br />
  <a
    class="btn-primary"
    href={`//scratch.mit.edu/studios/${collabData.studioData.id}`}
    role="button">Go to studio</a
  >
  <hr class="mt-1 mb-1" />
  <h3>Goals</h3>
  <GoalViewer bind:goals bind:isEditing />
  <hr class="mt-1 mb-1" />
  <h3>Releases</h3>
  <ReleaseViewer bind:releases bind:isEditing />
{/if}


