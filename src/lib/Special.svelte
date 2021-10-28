<script lang="ts">
    export let info;
    let msg = "This is a ScratchInfo Special. It gives a little badge to people who do cool things!";
    let suggestors: Array<string> = [
        "Chiroyce",
        "PoIygon",
        "hamster46",
        "han614698"
    ];
</script>
{#if info.username === "god286"}
    <div class="tag owner" title={msg}>Owner of ScratchInfo</div>
{/if}
{#if info.username === "JoshAtticus"}
    <div class="tag epic" title={msg}>ScratchInfo Announcement Helper</div>
{/if}
{#if info.username === "Jeffalo"}
    <div class="tag ocular" title={msg}>Ocular</div>
{/if}
{#if info.scratchTeam === true}
    <div class="tag scratchteam" title={msg}>Scratch Team Member</div>
{/if}
{#if suggestors.includes(info.username)}
    <div class="tag suggestor" title={msg}>ScratchInfo Idea Suggestor</div>
{/if}
<style>
    .tag {
        width: 250px;
        height: 40px;
        text-align: center;
        border-radius: 5px;
        color: black;
        padding: 10px;
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
    .owner {
        background-color: red;
    }
    .ocular {
        background-color: green;
    }
    .epic {
        background-color: #FF7F7F;
        font-size: small;
    }
</style>
