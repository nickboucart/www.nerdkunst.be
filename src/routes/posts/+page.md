---
title: "NerdKunst.be | Overzicht"
description: "Alle onze artikels."
image: "vierkanten.png"
---
<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
    import Posts from '$lib/components/Posts.svelte'

	export let data
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

## Alle tutorials en artikels. 

Hier vind je een overzicht van al onze artikels en tutorials. Duik er snel in ;) 

## Onze artikels

<Posts posts={data.posts} limit="100" />
