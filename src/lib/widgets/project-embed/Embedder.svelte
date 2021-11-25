<script>
  export let parameters;
</script>

<h1>My Best Project!</h1>
<hr>
<div class="card">
  <div class="card-body">
    {JSON.stringify(parameters)}
  </div>
</div>

<style>
  .card {
    color: black;
  }
</style>
