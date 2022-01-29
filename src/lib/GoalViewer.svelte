<script lang="ts">
  import { onMount } from 'svelte';
  import Progress from '$lib/components/Progress.svelte';
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
    <div class="p-2 bg-gray-50 text-gray-900 m-2 rounded">
      <div class="card-body">
        #{i + 1} <input type="text" class="form-control" bind:value={goal.title} /> <br />
        <input type="number" min="0" max="100" bind:value={goal.progress} />%/100%
        <Progress percentage={goal.progress} />
        <button class="btn-link" on:click={removeGoal(i)}
          ><i class="bi bi-x-circle-fill" /></button
        >
      </div>
    </div>
  {:else}
    <p>No goals.</p>
  {/each}
  <button class="btn-link" on:click={createNewGoal()}><i class="bi bi-plus-circle" /></button>
{:else}
  {#each goals as goal, i}
    <div class="p-2 bg-gray-50 text-gray-900 m-2 rounded">
      <div class="card-body">
        #{i + 1}: {goal.title}
        <Progress percentage={goal.progress} />
      </div>
    </div>
  {:else}
    <p>No goals.</p>
  {/each}
{/if}

