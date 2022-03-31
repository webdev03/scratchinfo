<script lang="ts">
  // Hi there! Read the README.md of this repository to learn more about
  // the ScratchLight Authentication service.
  import { onMount } from "svelte";
  import Failure from "$lib/components/Failure.svelte";
  import { decode } from "$lib/bta";
  let code = "Loading...";
  let beWarned = false;
  let problem,
    authIncorrect = false;
  let loading = true;
  let copyFunction: Function = function () {};
  let redirectLink = "/";
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redir = decode(urlParams.get("redirect"));
    console.log(urlParams);
    if (!(redir.startsWith("localhost:") || redir.startsWith("scratchinfo.vercel.app/"))) {
      beWarned = true;
    }
    if (!(urlParams.has("username") || urlParams.has("redirect"))) {
      authIncorrect = true;
      throw new Error("The webmaster hasn't set up ScratchLight correctly.");
    }
    const createAuthReq = await fetch("/scratchlight/createAuthSession", {
      method: "POST",
      body: JSON.stringify({
        username: urlParams.get("username")
      })
    });
    loading = false;
    if (createAuthReq.ok) {
      problem = false;
      const authJSON = await createAuthReq.json();
      code = authJSON.code;
      redirectLink = "https://" + redir.toString() + "?privateCode=" + authJSON.private.toString();
      if (!(redir.startsWith("localhost:") || redir.startsWith("scratchinfo.vercel.app/"))) {
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
  <Failure
    title="OOPS OH NO I MADE A MISTAKE!"
    centred={false}
    description="The website administrator hasn't set up ScratchLight correctly, so ScratchLight will obviously work, you totally did nothing wrong. If
  you're not the website owner, please don't read the README of the scratchinfo repository on GutHib (some people call it github for some reason :eyeroll: why?)."
  />
{/if}
{#if problem}
  <Failure title="Oh no!" description="An error has occurred." centred={false} />
{/if}
{#if beWarned}
  <Failure
    centred={false}
    title="I'm warning you...!"
    description="Clicking on the I'm done button may be unsafe and lead to impersonation and cause kaj to hack your account oh no oh noooooo! Proceed with caution!"
  />
{/if}
<h3>
  Please please comment this code on the ScratchLight Authentication project, then press on the "I'm Done"
  button, if you don't, my army of evil kumquats will come and force you to!
</h3>
<p><b>Only include the code. No spaces or any characters other than the code will work.</b></p>
<div id="code" class="w-full items-center p-2 bg-gray-50 text-gray-900 rounded mt-2 mb-2">
  {code}
</div>
<button class="btn-primary" on:click={copyFunction()}>Copy code</button>
<br /> <br />
<a class="btn-primary" target="_blank" href="https://scratch.mit.edu/projects/603838920/"
  >Go to Project</a
>
<a class="btn-primary" href={redirectLink}>I'm Done</a>
