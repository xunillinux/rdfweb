<script lang="ts">
	import { r2bucketEndpoint } from '$lib/config';
	import { replaceEscapedNewlines } from '$lib/helper/format-helper';
	import type { Feature } from '$lib/model/rdf-data-model';

	let { feature }: { feature: Feature } = $props();

	let imageSource = $derived(r2bucketEndpoint + '/' + feature.image);

	let isImageLoaded = $state(false);
</script>

<div class="flex flex-col items-center bg-black py-24 text-white">
	<!-- Heading -->
	<div class="text-center">
		{#if feature.subheading}
			<h3 class="whitespace-pre-line text-4xl uppercase">{feature.subheading}</h3>
		{/if}
		<h2 class="mt-3 whitespace-pre-line text-4xl font-bold uppercase">{replaceEscapedNewlines(feature.heading)}</h2>
	</div>

	<!-- Caption -->
	{#if feature.caption}
		<p class="mt-3 whitespace-pre-line text-center text-4xl uppercase">{feature.caption}</p>
	{/if}

	<!-- Image -->
	<div class="mt-12 p-6">
		<!-- Placeholder -->
		{#if !isImageLoaded}
			<div class="sm:max-h-128 md:max-h-160 lg:max-h-192 h-full w-full sm:max-w-128 md:max-w-160 lg:max-w-192"></div>
		{/if}

		<!-- Image -->
		<img
			src={imageSource}
			alt="Feature"
			class="sm:max-h-128 md:max-h-160 lg:max-h-192 h-full w-full object-cover sm:max-w-128 md:max-w-160 lg:max-w-192"
			onload={() => (isImageLoaded = true)}
			style:display={!isImageLoaded ? 'none' : 'block'}
		/>
	</div>

	<!-- Video -->
	{#if feature.youtubeURL}
		<!-- Embedded YouTube Video -->

		{#if feature.videoCaption}
			<p class="mt-12 text-center text-4xl uppercase">{feature.videoCaption}</p>
			<p class="mb-6 mt-3 text-center text-4xl font-bold uppercase">{feature.videoTitle}</p>
		{:else}
			<p class="mb-6 mt-12 text-center text-4xl uppercase">{feature.videoTitle}</p>
		{/if}

		<div class="mb-6 mt-12 space-y-4 text-center">
			<iframe
				src={feature.youtubeURL}
				class="max-h-[300px] max-w-full sm:max-h-[325px] sm:max-w-[578px] lg:max-h-[350] lg:max-w-[622px] xl:max-h-[450] xl:max-w-[800px]"
				height="350"
				width="650"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			>
			</iframe>
		</div>
	{/if}

	<!-- Links -->
	<div class="mt-12 space-y-4 text-center">
		{#each feature.featureLinks as featureLink}
			<div>
				<a href={featureLink.href} class="text-4xl uppercase hover:underline" target="_blank">{featureLink.text}</a>
			</div>
		{/each}
	</div>
</div>
