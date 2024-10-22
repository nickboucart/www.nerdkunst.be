<script lang="ts">
	import Footer from './Footer.svelte'
	import Header from './Header.svelte'

	import '../app.css'
</script>
<!-- truukje om ervoor te zorgen dat de main sectie zoveel mogelijk scherm neemt, en footer tegen onderkant plakt als main niet groot genoeg is -->
<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex-grow mx-auto my-20 w-10/12">
        <div class="mx-auto bg-neutral-content py-10 px-20 prose lg:prose-lg max-w-none">
		<slot />
        </div>
	</main>

	<Footer />
</div>


