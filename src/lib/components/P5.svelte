<script lang="ts">
import {onMount} from'svelte';
 import highlightjs from 'highlight.js';
 import javascript from 'highlight.js/lib/languages/javascript';
 import 'highlight.js/styles/sunburst.min.css';
 import CodeInput from '@srsholmes/svelte-code-input/CodeInput.svelte';

 onMount(async () => {
    highlightjs.registerLanguage('javascript', javascript);
 })

    export let code;

    let getSketchForUrl = () => {
        return encodeURIComponent(code);
    }

    
</script>


<!-- <div class="-mx-32">	
    {@html '<script type="text/p5" data-height="450" data-width="700" data-preview-width="500">' + code + '</script>'}
</div> -->
<div class="-mx-32 grid grid-cols-2 gap-10 justify-center">	
<CodeInput 
  autoHeight={true}
  resize="both"
  placeholder="Input your code here..."
  highlightjs={highlightjs}
  value={code}
  language={'javascript'}
/>
<iframe class="w-full aspect-square" title="p5 sketch" src={'/p5/index.html?sketch=' + getSketchForUrl()} />
</div>