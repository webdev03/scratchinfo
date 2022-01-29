<script>
  export let percentage = 0;
</script>
<div class="w-full bg-gray-200 h-1 rounded-sm mt-2 mb-2">
  <div class={`bg-blue-600 h-1 transition-all`} style={`width: ${percentage}%;`}></div>
</div>
