<script>
  export let title = 'You really sure?';
  export let description = 'This could be a destructive action!';
  export let okHook = () => {};
  export let cancelHook = () => {
    document.getElementById(`overlay-modal-${id}`).remove()
    document.getElementById(`modal-${id}`).remove()
  };

  let id = Math.random().toString();
</script>

<div id="overlay-modal-{id}" class="absolute top-0 bottom-4 -m-4 min-w-full opacity-30 bg-gray-500" />

<div
  id="modal-{id}"
  class="flex relative !opacity-100 mr-auto ml-auto flex-1 left-0 min-h-[12rem] min-w-[30rem] right-0 justify-center pt-2"
>
  <div class="bg-gray-100 text-gray-900 w-96 flex flex-col rounded shadow p-2">
    <h3 class="font-bold text-2xl">{title}</h3>
    <hr class="mt-2 mb-2" />
    <p class="grow">{@html description}</p>
    <br />
    <div class="">
      <button class="bg-red-500 p-2 rounded" on:click={okHook}>Yes, I'm sure</button>
      <button class="bg-gray-500 p-2 rounded" on:click={cancelHook}>Cancel</button>
    </div>
  </div>
</div>
