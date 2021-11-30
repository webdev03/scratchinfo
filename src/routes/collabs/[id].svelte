<script context="module" lang="ts">
  export async function load({ page, fetch, session, context }) {
    return {
      props: {
        id: page.params.id
      }
    };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  export let id;
  let collabData: any;
  let problem = false;
  let loading = true;
  onMount(async () => {
    const collabFetch = await fetch(`/collabs/api/${id.toString()}`);
    if (collabFetch.ok) {
      collabData = await collabFetch.json();
      loading = false;
      problem = false;
    } else {
      problem = true;
      loading = false;
    }
  });
</script>

<h1>Collab</h1>
<hr />
{#if loading}
  <p>Loading...</p>
{:else if problem}
  <p>sad life</p>
{:else}
  <h3>{collabData.studioData.title}</h3>
  <p>Scratchinfo Collab created by {collabData.creator}</p>
  <img
    class="rounded"
    src={`//cdn2.scratch.mit.edu/get_image/gallery/${collabData.studioData.id}_212x125.png`}
    width="212"
    height="125"
    alt="Thumbnail for studio"
  />
  <br /> <br />
  <a
    class="btn btn-primary"
    href={`//scratch.mit.edu/studios/${collabData.studioData.id}`}
    role="button">Go to studio</a
  >
{/if}
