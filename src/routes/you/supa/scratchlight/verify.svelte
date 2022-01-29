<script>
  import { onMount } from 'svelte';

  let status = 'Loading...';
  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const privateCode = params.get('privateCode');
    status = 'Verifying...';
    const verifier = await fetch(`/you/supa/scratchlight/auth`, {
      method: 'POST',
      body: JSON.stringify({
        privateCode: privateCode
      })
    });
    if (!verifier.ok) {
      status = 'This authentication session is INVALID. Going to login page...';
      window.localStorage.clear();
      console.log(verifier);
      window.location.href = '/login';
    } else {
      status = 'Success!';
      const tokenJSON = await verifier.json();
      window.localStorage.setItem('authToken', tokenJSON.token);
      window.location.href = '/dashboard';
    }
  });
</script>

<h1 class="text-3xl font-bold mb-2">Verifying with ScratchLight</h1>
{status}
