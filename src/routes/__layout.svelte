<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });
</script>

<script>
  import '$lib/tailwind.css';
  import Transition from '$lib/Transition.svelte';
  import Navbar from '$lib/nav/Navbar.svelte';
  export let key;
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"
  />
  <title>Scratchinfo | Scratch statistics!</title>
</svelte:head>
<div class="bg-gray-900 pb-2 min-h-[100vh] min-w-[100vw] text-white">
  <div class="pt-3">
    <!-- 
    <nav class="flex md:top-0 md:z-50 rounded-md align-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Scratchinfo</a>
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
            <li class="nav-item">
              <a class="nav-link active" href="/collabs">Collabs</a>
            </li>
          </ul>
        </div>
      </div>
    </nav> -->
    <Navbar />
    <div class="pt-3 p-2">
      <Transition {key}>
        <slot />
      </Transition>
    </div>
  </div>
</div>
