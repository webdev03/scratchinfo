<script>
  const toggleBar = () => {
    document.getElementById('link-items-mobile').classList.toggle('hidden');
  };
</script>

<nav class="m-2 flex bg-sky-200 rounded-md align-bottom flex-1 flex-wrap">
  <div
    class="text-gray-800 mx-auto relative justify-between flex items-center w-full rounded min-h-50 px-4 py-2"
  >
    <!-- Header -->
    <h1 class="text-2xl font-semibold"><a href="/">Scratchinfo</a></h1>
    <!-- Link item desktop -->
    <ul id="link-items-desktop" class="flex-wrap hidden md:flex ml-2 flex-col sm:flex-row">
      <li>
        <a
          class="float-right flex justify-center hover:font-semibold hover:underline sm:m-2 m-0"
          href="/dashboard">Dashboard</a
        >
      </li>
      <li>
        <a
          class="float-right flex justify-center hover:font-semibold hover:underline sm:m-2 m-0"
          href="/about">About</a
        >
      </li>
      <li>
        <a
          class="float-right flex justify-center hover:font-semibold hover:underline sm:m-2 m-0"
          href="/leaderboards">Leaderboards</a
        >
      </li>
      <li>
        <a
          class="float-right flex justify-center hover:font-semibold hover:underline sm:m-2 m-0"
          href="/collabs">Collabs</a
        >
      </li>
    </ul>
    <button
      on:click={toggleBar}
      class="visible md:hidden p-2 w-8 rounded flex text-center justify-center items-center bg-sky-300 text-lg"
    >
      <!-- https://css-tricks.com/snippets/svg/svg-hamburger-menu/ -->
      <svg viewBox="0 0 100 70" width="40" height="15">
        <rect width="100" rx="8" height="5" />
        <rect y="30" width="100" rx="8" height="5" />
        <rect y="60" width="100" rx="8" height="5" />
      </svg>
    </button>
  </div>
  <!-- Link item mobile -->
  <ul
    id="link-items-mobile"
    class="p-0.5 pb-2 text-gray-900 flex-wrap ml-2 flex-col sm:flex-row hidden md:!hidden items-center w-full"
  >
    <li>
      <a
        class="flex hover:font-semibold p-1 transition-all hover:underline sm:m-2 m-0"
        href="/dashboard">Dashboard</a
      >
    </li>
    <li>
      <a
        class="flex hover:font-semibold p-1 transition-all hover:underline sm:m-2 m-0"
        href="/about">About</a
      >
    </li>
    <li>
      <a
        class="flex hover:font-semibold p-1 transition-all hover:underline sm:m-2 m-0"
        href="/leaderboards">Leaderboards</a
      >
    </li>
    <li>
      <a
        class="flex hover:font-semibold p-1 transition-all hover:underline sm:m-2 m-0"
        href="/collabs">Collabs</a
      >
    </li>
  </ul>
</nav>
