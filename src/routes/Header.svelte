<script lang="ts">

   export let image;
   export let title;
   export let description;


</script>

<div class="navbar  px-10">
	<div class="navbar-start">
		<a class="navbar-item" href="/">NerdKunst</a>
	</div>
	<div class="navbar-end">
		<div class="flex-none">
			<ul class="menu menu-lg menu-horizontal px-1">
				<li><a href="/posts">Artikels</a></li>
				<li><a href="/over-ons">Over ons</a></li>
			</ul>
		</div>
	</div>
</div>

<div
	class="hero min-h-80"
	style="background-image: url({image});"
>
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-neutral-content text-center">
		<div class="max-w-lg ">
			<h1 class="mb-5 text-5xl font-bold">{title}</h1>
			<p class="mb-5 text-2xl">
				{description}
			</p>
		</div>
	</div>
</div>
