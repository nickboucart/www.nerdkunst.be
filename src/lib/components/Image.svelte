<script lang="ts">
import type { ExampleImage } from '$lib/types';
    export let image: ExampleImage
</script>

<figure class="mx-auto">
    <img src={image.fileName} alt={image.title} />
    <figcaption>{image.title}</figcaption>
</figure>