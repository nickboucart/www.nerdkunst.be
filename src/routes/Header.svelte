<script lang="ts">
	import * as config from '$lib/config';

  	import { page } from "$app/stores";

	async function loadImage(name: string) {
	 return (await import(name)).default
	}

	let imageName: string = '../lib/assets/' + $page.data.meta.image
	let loadedImage: any = loadImage(imageName);


</script>

<div class="navbar  px-10">
	<div class="navbar-start">
		<a class="navbar-item" href="/">NerdKunst</a>
	</div>
	<div class="navbar-end">
		<div class="flex-none">
			<ul class="menu menu-lg menu-horizontal px-1">
				<li><a href="/artikels">Artikels</a></li>
				<li><a href="/over-ons">Over ons</a></li>
			</ul>
		</div>
	</div>
</div>
{#await loadedImage}
<p>loading....</p>
{:then image}
<div
	class="hero min-h-80"
	style="background-image: url({image});"
>
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-neutral-content text-center">
		<div class="max-w-md ">
			<h1 class="mb-5 text-8xl font-bold">{config.title}</h1>
			<p class="mb-5 text-2xl">
				{config.description}
			</p>
		</div>
	</div>
</div>
{/await}
