<script lang="ts">
    export let info;
    let msg = "This is a ScratchInfo Special. It gives a little badge to people who do cool things!";
    let helpers: Array<string> = [
        "Chiroyce",
    ];
</script>
{#if info.username === "god286"}
    <div class="tag owner" title={msg}>Owner of ScratchInfo</div>
{/if}
{#if info.username === "JoshAtticus"}
    <div class="tag epic" title={msg}> Scratch Announcement Helper</div>
{/if}
{#if info.username === "Jeffalo"}
    <div class="tag ocular" title={msg}>Ocular</div>
{/if}
{#if info.scratchTeam === true}
    <div class="tag scratchteam" title={msg}>Scratch Team Member</div>
{/if}
{#if helpers.includes(info.username)}
    <div class="tag helper" title={msg}>Helper</div>
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
    .helper {
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
    }
</style>