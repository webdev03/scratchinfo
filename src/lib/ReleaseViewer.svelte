<script lang="ts">
  import { onMount } from 'svelte';
  export let releases: Array<any> = [];
  export let isEditing: boolean = false;
  let createNewRelease,
    removeRelease: Function = () => {};
  onMount(() => {
    createNewRelease = () => {
      if (releases.length > 100) {
        alert(
          'You have hit the release limit. Please contact god286 on Scratch for more information.'
        );
        return;
      } else {
        releases.unshift({ title: 'A new release!', description: 'Release description', id: 0 });
        releases = releases; // this line makes no sense but it works
      }
    };
    removeRelease = (i) => {
      if (!confirm('Are you really, really, really sure you want to delete this release?')) return;
      releases.splice(i, 1);
      releases = releases; // this line makes no sense but it works
    };
  });
</script>

{#if isEditing}
  {#each releases as release, i}
    <div class="card">
      <div class="card-body">
        <input type="text" class="form-control" bind:value={release.title} /> <br />
        <textarea type="text" class="form-control" bind:value={release.description} /> <br />
        <div>https://scratch.mit.edu/projects/<input type="number" bind:value={release.id} /></div>
        <button class="btn btn-link" on:click={removeRelease(i)}
          ><i class="bi bi-x-circle-fill" /></button
        >
      </div>
    </div>
  {:else}
    <p>No releases.</p>
  {/each}
  <button class="btn btn-link" on:click={createNewRelease()}><i class="bi bi-plus-circle" /></button
  >
{:else}
  {#each releases as release}
    <div class="card">
      <div class="card-body">
        {release.title}
        <hr />
        <p>{release.description}</p>
        Release available at
        <a href={`https://scratch.mit.edu/projects/${release.id}`}
          >{`https://scratch.mit.edu/projects/${release.id}`}</a
        >
      </div>
    </div>
  {:else}
    <p>No releases.</p>
  {/each}
{/if}

<style>
  .card {
    color: black;
    margin-bottom: 5px;
  }
</style>
