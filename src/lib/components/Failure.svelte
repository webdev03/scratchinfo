<script>
  export let title = 'Oh no!';
  export let description = 'It looks like an error has occurred.';
  export let centred = true;
</script>

<div class="flex {centred ? 'justify-center' : ''} pt-2">
  <div class="bg-red-500 text-white w-96 rounded p-2">
    <h3 class="font-bold text-2xl">{title}</h3>
    <span>{@html description}</span>
  </div>
</div>
