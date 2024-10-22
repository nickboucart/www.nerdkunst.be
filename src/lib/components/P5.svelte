<script lang="ts">
    export let code;

</script>

<svelte:head>
    <!-- <script src="//toolness.github.io/p5.js-widget/p5-widget.js"></script> -->
     <script src="/p5widget/p5-widget.js"></script>
</svelte:head>

<div>	
    {@html '<script type="text/p5">' + code + '</script>'}
</div>
