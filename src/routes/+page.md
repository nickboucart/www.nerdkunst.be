---
title: "NerdKunst.be"
description: "Omdat wetenschap en technologie soms ook gewoon mooi kunnen zijn."
image: "vierkanten.png"
---
<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
    import Posts from '$lib/components/Posts.svelte'

	export let data
</script>
## Welkom op NerdKunst.be. 

Hier vind je voorbeelden en tutorials over hoe je al programmerend kunst maakt. Dat wordt __generative art__ genoemd. Je zal versteld staan hoe een paar eenvoudige wiskundige formules fascinerende grafische effecten kunnen opleveren. 

Kijk hieronder naar enkele voorbeelden, ga aan de slag met de turorials en word zelf een programmerende kunstenaar, of is het kunstzinnige programmeur? 

## Recente artikels

<Posts posts={data.posts} limit="5" />
