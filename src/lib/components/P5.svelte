<script lang="ts">
    import { url } from '$lib/config'
    import { CodeBlock } from 'svhighlight';
    import 'highlight.js/styles/monokai-sublime.css';
    export let code;
    export let extraLibraries: string[] = [];


    let getEntireUrlForIframe = (sketch: string, extras: string[]) => {
        let urlForSketch = new URL('/p5/index.html', url)
        if (extras.length > 0) {
            urlForSketch.searchParams.set('extralibs', extras.join(';') )
        }
        urlForSketch.searchParams.set('sketch', sketch)
        return urlForSketch.toString()
    }

    
</script>


<div class="md:-mx-32 grid grid-cols-1 md:grid-cols-2 justify-center content-evenly not-prose">	
    <CodeBlock {code} language="javascript" dimensions="w-[600px]" />

    <iframe class="aspect-square w-[600px] mt-2" title="p5 sketch" src={getEntireUrlForIframe(code, extraLibraries)} />
</div>