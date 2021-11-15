<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css">
  <title>ScratchInfo | Scratch statistics!</title>
</svelte:head>

<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path,
    },
  });
</script>

<script>
  import Transition from "$lib/Transition.svelte";
  export let key;
</script>

<div class="page">
  <div class="container pt-3">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ScratchInfo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/dashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/leaderboards">Leaderboards</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="pt-3">
      <Transition {key}>
        <slot />
      </Transition>
    </div>
  </div>
</div>


<style>
  .page {
    background-color: #030d1b;
    min-height: 100vh;
    color: white;
    min-width: 100vw;
    padding-bottom: 20px;
  }
</style>
