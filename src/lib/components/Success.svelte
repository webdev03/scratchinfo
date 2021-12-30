<script>
  export let title = "Success!";
  export let description = "Your request has been fulfilled successfully..";
</script>

<div class="flex justify-center pt-2">
  <div class="bg-green-500 text-white w-96 rounded p-2">
    <h1 class="font-bold">{title}</h1>
    <span>{@html description}</span>
  </div>
</div>
