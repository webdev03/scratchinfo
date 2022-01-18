<script>
  export let title = "Success!";
  export let description = "Your request has been fulfilled successfully..";
</script>

<div class="flex justify-center pt-2">
  <div class="bg-green-500 text-white w-96 rounded p-2">
    <h3 class="font-bold text-2xl">{title}</h3>
    <span>{@html description}</span>
  </div>
</div>
