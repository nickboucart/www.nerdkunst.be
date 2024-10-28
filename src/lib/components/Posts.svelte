<script lang="ts">
  import type { Post } from '$lib/types'

    import {getImageUrl} from '$lib/images'
	export let posts: Post[] 
  export let limit: number
</script>

<div class="flex flex-col md:flex-row justify-center flex-wrap gap-10">
    {#each posts.slice(0, limit) as post}
      <a class="card card-hover card-compact bg-base-100 basis-1/3 hover:shadow-xl no-underline" href="/{post.slug}">
        <figure>    
          <img
            src="{getImageUrl(post.image)}"
            alt="{post.title}" />
        </figure>
        <div class="card-body">
          <h2 class="card-title not-prose">{post.title}</h2>
          <p>{post.description}</p>
        </div>
    </a>
    {/each}


</div>