<script>
  import '$lib/tailwind.css';
  import Navbar from '$lib/components/nav/Navbar.svelte';
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"
  />
  <title>Scratchinfo | Scratch statistics!</title>
</svelte:head>
<div class="dark:bg-gray-900 bg-gray-100 pb-2 min-h-[100vh] min-w-[100vw] dark:text-white text-gray-900">
  <div class="pt-2">
    <Navbar />
    <div class="pt-3 p-4">
      <slot />
    </div>
  </div>
</div>
