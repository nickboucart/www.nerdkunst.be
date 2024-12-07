<script lang="ts">
    import { url } from '$lib/config'
    import { CirclePlay, CirclePause} from 'lucide-svelte';
    import { CodeBlock } from 'svhighlight';
    import 'highlight.js/styles/monokai-sublime.css';
    export let code;
    export let htmlPage: string = "index.html";
    let name = Math.random().toString(36).substring(2,7);

    let getUrlForReadyIframe = () => {
        return new URL('/p5/ready/index.html', url).toString();
    }


    let getEntireUrlForIframe = (sketch: string, html: string) => {
        let urlForSketch = new URL('/p5/' + html, url)
        urlForSketch.searchParams.set('sketch', sketch)
        return urlForSketch.toString()
    }

    
</script>


<div class="md:-mx-32 grid grid-cols-1 md:grid-cols-2 justify-center content-evenly not-prose">	
    <CodeBlock {code} language="javascript" dimensions="w-[600px]" />
    <div class="aspect-square w-[600px] mt-2">
        <div class="flex flex-row gap-2">
            <a class="btn" href="{getEntireUrlForIframe(code, htmlPage)}" target={name}><CirclePlay /></a>
            <a class="btn" href="{getUrlForReadyIframe()}" target={name}><CirclePause /></a>
        </div>
    <iframe loading="lazy" class="aspect-square w-[600px] mt-2" {name} title="p5 sketch" src={getUrlForReadyIframe()} />
</div>
</div>