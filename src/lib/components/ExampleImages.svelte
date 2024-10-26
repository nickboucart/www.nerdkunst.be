<script lang="ts">
	import type { ExampleImage } from '$lib/types';
	import { getImageUrl } from '$lib/images';

	export let images: ExampleImage[];
</script>

<div class="flex w-flex justify-center items-center gap-10">
	{#each images as image}
		<figure class="basis-1/2 w-1/2 flex flex-col justify-center items-center">
			<img src={getImageUrl(image.fileName)} alt={image.title} />
            <figcaption>{image.title}</figcaption>
		</figure>
	{/each}
</div>
