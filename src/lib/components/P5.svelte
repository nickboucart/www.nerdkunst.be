<script lang="ts">
    import { CodeBlock } from 'svhighlight';
    import 'highlight.js/styles/monokai-sublime.css';
    export let code;

    let getSketchForUrl = () => {
        return encodeURIComponent(code);
    }

    
</script>


<div class="md:-mx-44  grid grid-cols-1 md:grid-cols-2 gap-10 justify-center content-center not-prose">	
    <CodeBlock {code} language="javascript" dimensions="w-full" />

    <iframe class="w-full aspect-square mt-2" title="p5 sketch" src={'/p5/index.html?sketch=' + getSketchForUrl()} />
</div>