<script lang="ts">
    import { CodeBlock } from 'svhighlight';
    import 'highlight.js/styles/monokai-sublime.css';
    export let code;

    let getSketchForUrl = () => {
        return encodeURIComponent(code);
    }

    
</script>


<div class="md:-mx-32 grid grid-cols-1 md:grid-cols-2 justify-center content-evenly not-prose">	
    <CodeBlock {code} language="javascript" dimensions="w-[600px]" />

    <iframe class="aspect-square w-[600px] mt-2" title="p5 sketch" src={'/p5/index.html?sketch=' + getSketchForUrl()} />
</div>