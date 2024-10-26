<script lang="ts">
    import {getImageUrl} from '$lib/images'
	export let data

    
</script>

<div class="flex flex-col md:flex-row justify-center flex-wrap gap-10">
    {#each data.posts as post}
      <a class="card card-hover card-compact bg-base-100 basis-1/3 hover:shadow-xl no-underline" href="/{post.slug}">
        <figure>    
          <img
            src="{getImageUrl(post.image)}"
            alt="{post.title}" />

        </figure>
        <div class="card-body pt-8">
          <h2 class="card-title">{post.title}</h2>
          <p>{post.description}</p>
        </div>
    </a>
    {/each}


</div>