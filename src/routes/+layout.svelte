<script lang="ts">
	import * as config from '$lib/config';
    import {getImageUrl} from '$lib/images'
	import '../app.css';
	import { page } from '$app/stores';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	$: imageName = $page.data.meta ? getImageUrl($page.data.meta.image) : getImageUrl('vierkanten.png');
	$: title = $page.data.meta ? $page.data.meta.title : config.title
	$: description = $page.data.meta? $page.data.meta.description : config.description;
</script>


<!-- truukje om ervoor te zorgen dat de main sectie zoveel mogelijk scherm neemt, en footer tegen onderkant plakt als main niet groot genoeg is -->
<div class="flex flex-col min-h-screen">
	<Header image={imageName} title={title} description={description} />

	<main class="flex-grow mx-auto my-20 w-10/12">
		<div class="mx-auto bg-neutral-content py-10 px-20 prose lg:prose-lg max-w-none">
			<slot />
		</div>
	</main>

	<Footer />
</div>
