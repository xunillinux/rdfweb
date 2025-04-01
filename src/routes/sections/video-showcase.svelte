<script>
	import { r2bucketEndpoint } from '$lib/config';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isMobile = $state();
	let videoElement = $state();

	let isSlowConnection = $state(false);

	let landscapeHeight = 1080;
	let portraitHeight = 1280;

	const portraitPoster = r2bucketEndpoint + 'video-showcase-portrait-poster.jpg';
	const landscapePoster = r2bucketEndpoint + 'video-showcase-landscape-poster.jpg';

	const portraitVideoWebm = r2bucketEndpoint + 'video-showcase-portrait_resized.webm';
	const landscapeVideoWebm = r2bucketEndpoint + 'video-showcase-landscape_resized.webm';

	const portraitVideoMp4 = r2bucketEndpoint + 'video-showcase-portrait_resized.mp4';
	const landscapeVideoMp4 = r2bucketEndpoint + 'video-showcase-landscape_resized.mp4';

	onMount(() => {
		const handleResize = () => {
			isMobile = window.innerWidth < 768;
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<section id="showcase-video" class="relative mt-[65px] h-[calc(100vh-65px)] overflow-hidden bg-black">
	<!-- Video -->
	{#if isMobile == true}
		<video
			bind:this={videoElement}
			transition:fade
			poster={portraitPoster}
			autoplay
			muted
			loop
			playsinline
			class="absolute left-0 top-0 z-0"
			height={portraitHeight}
			style="object-fit: cover; width: 100%; height: 100%;"
		>
			<source src={portraitVideoWebm} type="video/webm" />
			<source src={portraitVideoMp4} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	{:else if isMobile === false}
		<video
			bind:this={videoElement}
			transition:fade
			poster={landscapePoster}
			autoplay
			muted
			loop
			playsinline
			class="absolute left-0 top-0 z-0"
			height={landscapeHeight}
			style="object-fit: cover; width: 100%; height: 100%;"
		>
			<source src={landscapeVideoWebm} type="video/webm" />
			<source src={landscapeVideoMp4} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	{/if}

	<!-- Blur layer over video -->

	<!--
	<div class="absolute inset-0 z-0 bg-black/10 backdrop-blur-md"></div>
  -->

	<!-- Blur filter for text -->
	<svg class="absolute inset-0 h-0 w-0">
		<filter id="blur-effect">
			<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurred" />
			<feMerge>
				<feMergeNode in="blurred" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</svg>

	<!-- Text Overlay -->
	<div class="z-1 pointer-events-none absolute inset-0 flex items-center justify-center text-center">
		<div
			class="relative text-6xl font-bold uppercase leading-snug text-white md:text-7xl lg:text-9xl"
			style="filter: url(#blur-effect); text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);"
		>
			<div>Robot</div>
			<div>Dog</div>
			<div>Funeral</div>
		</div>
	</div>

	<!-- Optional extra dark overlay -->
	<div class="absolute inset-0 -z-10 bg-black bg-opacity-30"></div>
</section>
