<script lang="ts">
  import { onMount } from 'svelte';
  export let goals: Array<any> = [];
  export let isEditing: boolean = false;
  let createNewGoal,
    removeGoal: Function = () => {};
  onMount(() => {
    createNewGoal = () => {
      if (goals.length > 9) {
        alert('You have hit the goal limit.');
        return;
      } else {
        goals.push({ title: 'My goal', progress: 50 });
        goals = goals; // this line makes no sense but it works
      }
    };
    removeGoal = (i) => {
      if (!confirm('Are you sure you want to delete this goal?')) return;
      goals.splice(i, 1);
      goals = goals; // this line makes no sense but it works
    };
  });
</script>

{#if isEditing}
  {#each goals as goal, i}
    <div class="card">
      <div class="card-body">
        #{i + 1} <input type="text" class="form-control" bind:value={goal.title} /> <br />
        <input type="number" min="0" max="100" bind:value={goal.progress} />%/100%
        <div class="progress">
          <div class="progress-bar" role="progressbar" style={`width: ${goal.progress}%;`}>
            {goal.progress}%
          </div>
        </div>
        <button class="btn btn-link" on:click={removeGoal(i)}
          ><i class="bi bi-x-circle-fill" /></button
        >
      </div>
    </div>
  {:else}
    <p>No goals.</p>
  {/each}
  <button class="btn btn-link" on:click={createNewGoal()}><i class="bi bi-plus-circle" /></button>
{:else}
  {#each goals as goal, i}
    <div class="card">
      <div class="card-body">
        #{i + 1}: {goal.title}
        <div class="progress">
          <div class="progress-bar" role="progressbar" style={`width: ${goal.progress}%;`}>
            {goal.progress}%
          </div>
        </div>
      </div>
    </div>
  {:else}
    <p>No goals.</p>
  {/each}
{/if}

<style>
  .card {
    color: black;
    margin-bottom: 5px;
  }
</style>
