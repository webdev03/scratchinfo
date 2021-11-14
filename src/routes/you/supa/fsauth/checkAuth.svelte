<script>
  import { onMount } from "svelte";
  let status = "Loading scripts...";
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    status = "Fetching authentication results..."
    const authFetchStatus = await fetch("/you/supa/fsauth/auth?privateCode=" + urlParams.get("privateCode"));
    if (authFetchStatus.ok) {
      status = "Authentication valid."
      const afsjson = await authFetchStatus.json();
      window.localStorage.setItem("authToken", afsjson.token)
      window.location.href = "/"
    } else {
      status = "Authentication not valid. Redirecting to login menu..."
      window.location.href = "/login"
    }
  })
</script>
<h1>Checking authentication status...</h1>
<p>You should be redirected to the homepage automatically once you have authenticated with FluffyScratch.</p>
<p>Status: {status}</p>