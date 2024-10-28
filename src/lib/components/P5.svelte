<script lang="ts">
    import {getP5Document} from "./p5-bootstrap"
    export let code;

    let getSketchForUrl = () => {
        return encodeURIComponent(code);
    }

    
</script>
<!-- 
<svelte:head>
    <script src="//toolness.github.io/p5.js-widget/p5-widget.js"></script>  -->
     <!-- <script src="/p5widget/p5-widget.js"></script> -->
<!-- </svelte:head> -->

<!-- <div class="-mx-32">	
    {@html '<script type="text/p5" data-height="450" data-width="700" data-preview-width="500">' + code + '</script>'}
</div> -->
<div class="-mx-32">	
<iframe class="w-1/2 aspect-square" title="p5 sketch" src={'/p5/index.html?sketch=' + getSketchForUrl()} />
</div>