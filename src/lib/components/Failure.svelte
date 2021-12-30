<script>
  export let title = "Oh no!";
  export let description = "It looks like an error has occurred.";
</script>

<div class="flex justify-center pt-2">
  <div class="bg-red-500 text-white w-96 rounded p-2">
    <h1 class="font-bold">{title}</h1>
    <span>{@html description}</span>
  </div>
</div>
