<script lang="ts">
	import { r2bucketEndpoint } from '$lib/config';
	import type { Feature } from '$lib/model/rdf-data-model';

	let { feature }: { feature: Feature } = $props();

	let isImageLoaded = $state(false);
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
		<!-- Placeholder -->
		{#if !isImageLoaded}
			<div class="sm:max-h-128 md:max-h-160 lg:max-h-192 h-full w-full sm:max-w-128 md:max-w-160 lg:max-w-192"></div>
		{/if}

		<!-- Image -->
		<img
			src={r2bucketEndpoint + feature.image}
			alt="Feature"
			class="sm:max-h-128 md:max-h-160 lg:max-h-192 h-full w-full object-cover sm:max-w-128 md:max-w-160 lg:max-w-192"
			onload={() => (isImageLoaded = true)}
			style:display={!isImageLoaded ? 'none' : 'block'}
		/>
	</div>

	<!-- Links -->
	<div class="mt-12 space-y-4 text-center">
		{#each feature.featureLinks as featureLink}
			<div>
				<a href={featureLink.href} class="text-2xl font-bold uppercase hover:underline" target="_blank">{featureLink.text}</a>
			</div>
		{/each}
	</div>
</div>
