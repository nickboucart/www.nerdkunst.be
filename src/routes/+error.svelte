<script>
	import { page } from '$app/stores'
</script>

<div class="flex justify-center">
	<h1 class="text-error">{$page.status}: {$page.error?.message}</h1>
</div>

