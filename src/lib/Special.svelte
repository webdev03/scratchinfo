<script lang="ts">
  export let info;
  let msg = "This is a Scratchinfo Special. It gives a little badge to people who do cool things!";
  let contributors: Array<string> = ["kccuber"];
  let suggestors: Array<string> = [
    "Chiroyce",
    "PoIygon",
    "hamster46",
    "kccuber",
    "han614698",
    "slgsan-encrypted"
  ];
</script>

{#if info.username === "god286"}
  <div class="tag owner" title={msg}>Owner of Scratchinfo</div>
{/if}
{#if info.username === "JoshAtticus"}
  <div class="tag epic" title={msg}>Scratchinfo Announcement Helper</div>
{/if}
{#if info.username === "Jeffalo"}
  <div class="tag ocular" title={msg}>Ocular</div>
{/if}
{#if info.username === "SansStudios"}
  <div class="tag heartpink" title={msg + " Requested by SansStudios"}>&lt;3</div>
{/if}
{#if info.scratchTeam === true}
  <div class="tag scratchteam" title={msg}>Scratch Team Member</div>
{/if}
{#if suggestors.includes(info.username)}
  <div class="tag suggestor" title={msg}>Scratchinfo Suggestor</div>
{/if}
{#if contributors.includes(info.username)}
  <div class="tag contributor" title={msg}>Scratchinfo Contributor</div>
{/if}

<style>
  .tag {
    width: 250px;
    height: 40px;
    text-align: center;
    border-radius: 5px;
    color: black;
    padding: 10px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scratchteam {
    background-color: orange;
  }
  .suggestor {
    background-color: aquamarine;
  }
  .contributor {
    background-color: teal;
  }
  .owner {
    background-color: red;
  }
  .ocular {
    background-color: green;
  }
  .epic {
    background-color: #ff7f7f;
    font-size: small;
  }
  .heartpink {
    background-color: #f06595;
  }
</style>
