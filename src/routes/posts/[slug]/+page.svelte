<script lang="ts">
	import { formatDate } from '$lib/utils'

	export let data
</script>

<article>
  <!-- Tags -->
	<!-- <div class="tags">
		{#each data.meta.tags as tag}
			<span class="surface-4">&num;{tag}</span>
		{/each}
	</div> -->

  <!-- Post -->
	<div class="mx-auto">
		<svelte:component this={data.content} />
	</div>

    <div class="flex justify-center text-sm">
		<p>Gepubliceerd op {formatDate(data.meta.date)}</p>
	</div>
</article>
