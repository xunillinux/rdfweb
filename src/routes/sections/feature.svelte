<script lang="ts">
	import type { Feature } from '$lib/mock/database';

	let { feature }: { feature: Feature } = $props();
</script>

<div class="flex flex-col items-center bg-black py-24 text-white">
	<!-- Heading -->
	<div class="text-center">
		{#if feature.subheading}
			<h3 class="text-3xl uppercase">{feature.subheading}</h3>
		{/if}
		<h2 class="mt-3 text-4xl font-bold uppercase">{feature.heading}</h2>
	</div>

	<!-- Caption -->
	{#if feature.caption}
		<p class="mt-3 text-center text-2xl uppercase">{feature.caption}</p>
	{/if}

	<!-- Image -->
	<div class="mt-6 p-6">
		<img
			src={feature.image}
			alt="Feature"
			class="w-full object-cover sm:max-w-128 md:max-w-160 lg:max-w-192"
		/>
	</div>

	<!-- Links -->
	<div class="mt-12 space-y-4 text-center text-xl font-bold uppercase">
		{#each feature.featureLinks as featureLink}
			<div class="text-2xl">
				<a href={featureLink.link} class="hover:underline" target="_blank">{featureLink.text}</a>
			</div>
		{/each}
	</div>
</div>
