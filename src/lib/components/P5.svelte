<script lang="ts">
    import { url } from '$lib/config'
    import { CodeBlock } from 'svhighlight';
    import 'highlight.js/styles/monokai-sublime.css';
    export let code;
    export let htmlPage: string = "index.html";


    let getEntireUrlForIframe = (sketch: string, html: string) => {
        let urlForSketch = new URL('/p5/' + html, url)
        urlForSketch.searchParams.set('sketch', sketch)
        return urlForSketch.toString()
    }

    
</script>


<div class="md:-mx-32 grid grid-cols-1 md:grid-cols-2 justify-center content-evenly not-prose">	
    <CodeBlock {code} language="javascript" dimensions="w-[600px]" />
    <div class="aspect-square w-[600px] mt-2">
    <iframe loading="lazy" class="aspect-square w-[600px] mt-2"  title="p5 sketch" src={getEntireUrlForIframe(code, htmlPage)} />
</div>
</div>