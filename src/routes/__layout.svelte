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
<div class="bg-gray-900 pb-2 min-h-[100vh] min-w-[100vw] text-white">
  <div class="pt-2">
    <Navbar />
    <div class="pt-3 p-4">
      <slot />
    </div>
  </div>
</div>
