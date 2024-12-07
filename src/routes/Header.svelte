<script lang="ts">
	export let image;
	export let title;
	export let description;
</script>

<div class="navbar px-10">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
				<li><a href="/posts">Artikels</a></li>
				<li><a href="/over-ons">Over ons</a></li>
			</ul>
		</div>
		<a class="navbar-item" href="/">NerdKunst</a>
	</div>
	<div class="navbar-end hidden lg:flex">
		<div class="flex-none">
			<ul class="menu menu-lg menu-horizontal px-1">
				<li><a href="/posts">Artikels</a></li>
				<li><a href="/over-ons">Over ons</a></li>
			</ul>
		</div>
	</div>
</div>

<div class="hero min-h-80" style="background-image: url({image});">
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-neutral-content text-center">
		<div class="max-w-lg">
			<h1 class="mb-5 text-5xl font-bold">{title}</h1>
			<p class="mb-5 text-2xl">
				{description}
			</p>
		</div>
	</div>
</div>
