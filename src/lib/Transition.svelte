<script>
  import { fade } from "svelte/transition";
  export let key = "";
</script>

{#key key}
  <div in:fade={{ duration: 250, delay: 250 }} out:fade={{ duration: 250 }}>
    <slot />
  </div>
{/key}
