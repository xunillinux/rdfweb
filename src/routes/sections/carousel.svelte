<script lang="ts">
	import { r2bucketEndpoint } from '$lib/config';
	import { ImageCategory, type HeaderImage } from '$lib/model/rdf-data-model';
	import { onMount, untrack } from 'svelte';
	import { fade } from 'svelte/transition';

	let { headerImages = [] }: { headerImages: HeaderImage[] } = $props();

	let portraitImages = $derived(headerImages.filter((i) => i.category === ImageCategory.Portrait));
	let landscapeImages = $derived(headerImages.filter((i) => i.category === ImageCategory.Landscape));

	let images: HeaderImage[] = $state([]);
	let currentSlide = $state(0);
	let carouselHeight = $state('100vh');

	let isCurrentLandscape = $state(false);

	$effect(() => {
		window.innerWidth;
		console.log(window.innerWidth);
	});

	onMount(() => {
		updateImagesBasedOnRatio();

		window.addEventListener('resize', onScreenResize);

		const interval = setInterval(() => {
			fadeToNextSlide();
		}, 5000);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', onScreenResize);
		};
	});

	async function onScreenResize() {
		const isLandscape = window.innerWidth > window.innerHeight;
		if (isCurrentLandscape === isLandscape) {
			return;
		}
		isCurrentLandscape = isLandscape;
		await updateImagesBasedOnRatio();
	}

	async function updateImagesBasedOnRatio() {
		const selectedImages = window.innerWidth > window.innerHeight ? landscapeImages : portraitImages;

		await preloadImages(selectedImages);

		images = [...selectedImages];
		currentSlide = Math.min(currentSlide, images.length - 1);
	}

	async function preloadImages(images: HeaderImage[]) {
		if (!images || images.length === 0) {
			return;
		}

		const promises = images.map((image) => {
			return new Promise<void>((resolve) => {
				const img = new Image();
				img.src = r2bucketEndpoint + image.src;
				img.onload = () => resolve();
			});
		});
		await Promise.all(promises);
	}

	function fadeToNextSlide() {
		currentSlide = (currentSlide + 1) % images.length;
	}
</script>

<svg class="absolute inset-0 h-0 w-0">
	<filter id="blur-effect">
		<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurred" />
		<feMerge>
			<feMergeNode in="blurred" />
			<feMergeNode in="SourceGraphic" />
		</feMerge>
	</filter>
</svg>

<div class="relative w-full overflow-hidden" style="height: {carouselHeight};">
	<!-- Render Current Slide -->
	{#each images as image, index (image)}
		{#if index === currentSlide}
			<img src={r2bucketEndpoint + image.src} alt="Header" class="absolute inset-0 h-full w-full object-cover" transition:fade={{ duration: 500 }} />
		{/if}
	{/each}

	<!-- Overlay Text with SVG Blur and Outline -->
	<div class="absolute inset-0 flex items-center justify-center text-center">
		<div
			class="relative text-6xl font-bold uppercase leading-snug text-white md:text-7xl lg:text-9xl"
			style="filter: url(#blur-effect); text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);"
		>
			<div>Robot</div>
			<div>Dog</div>
			<div>Funeral</div>
		</div>
	</div>
</div>
