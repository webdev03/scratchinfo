<script lang="ts">
  // Hi there! Read the README.md of this repository to learn more about
  // the ScratchLight Authentication service.
  import { onMount } from 'svelte';
  import multi from '$lib/bta';
  let code = 'Loading...';
  let beWarned = false;
  let problem,
    authIncorrect = false;
  let loading = true;
  let copyFunction: Function = function () {};
  let redirectLink = '/';
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redir = multi(true, urlParams.get('redirect'));
    console.log(urlParams);
    if (!(redir.startsWith('localhost:') || redir.startsWith('scratchinfo.vercel.app/'))) {
      beWarned = true;
    }
    if (!(urlParams.has('username') || urlParams.has('redirect'))) {
      authIncorrect = true;
      throw new Error("The webmaster hasn't set up ScratchLight correctly.");
    }
    const createAuthReq = await fetch('/scratchlight/createAuthSession', {
      method: 'POST',
      body: JSON.stringify({
        username: urlParams.get('username')
      })
    });
    loading = false;
    if (createAuthReq.ok) {
      problem = false;
      const authJSON = await createAuthReq.json();
      code = authJSON.code;
      redirectLink = 'https://' + redir.toString() + '?privateCode=' + authJSON.private.toString();
      if (!(redir.startsWith('localhost:') || redir.startsWith('scratchinfo.vercel.app/'))) {
        return;
      }
    } else {
      problem = true;
    }
    copyFunction = function () {
      navigator.clipboard.writeText(code);
    };
  });
</script>

{#if authIncorrect}
  <div class="alert alert-danger" role="alert">
    The website administrator hasn't set up ScratchLight correctly, so ScratchLight won't work. If
    you're the website owner, please read the README of the scratchinfo repository on GitHub.
  </div>
{/if}
{#if problem}
  <div class="alert alert-danger" role="alert">An error has occurred.</div>
{/if}
{#if beWarned}
  <div class="alert alert-danger" role="alert">
    Clicking on the I'm done button may be unsafe and lead to impersonation! Proceed with caution!
  </div>
{/if}
<h3>
  Please comment this code on the ScratchLight Authentication project, then press on the "I'm Done"
  button.
</h3>
<p><b>Only include the code. No spaces or any characters other than the code will work.</b></p>
<div id="code" class="card">
  <div class="card-body">{code}</div>
</div>
<button class="btn btn-primary" on:click={copyFunction()}>Copy code</button>
<br /> <br />
<a class="btn btn-primary" target="_blank" href="https://scratch.mit.edu/projects/603838920/"
  >Go to Project</a
>
<a class="btn btn-primary" href={redirectLink}>I'm Done</a>

<style>
  .card {
    color: black;
  }
  .card {
    width: 100%;
    align-items: center;
  }
</style>
