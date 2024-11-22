<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const landscapeImages = ['/images/carousel_img_1.jpg', '/images/carousel_img_2.jpg'];
	const portraitImages = [
		'/images/carousel_img_3.jpg',
		'/images/carousel_img_4.jpg',
		'/images/carousel_img_5.jpg',
		'/images/carousel_img_6.jpg',
		'/images/carousel_img_7.jpg'
	];

	let images: string[] = $state([]);
	let currentSlide = $state(0);
	let carouselHeight = $state('100vh');
	let isImagesPreloaded = $state(false);

	async function preloadImages(imageList: string[]) {
		const promises = imageList.map((src) => {
			return new Promise<void>((resolve) => {
				const img = new Image();
				img.src = src;
				img.onload = () => resolve();
			});
		});
		await Promise.all(promises);
		isImagesPreloaded = true;
	}

	async function updateImagesBasedOnRatio() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const selectedImages = screenWidth > screenHeight ? landscapeImages : portraitImages;

		await preloadImages(selectedImages);

		images = selectedImages;

		if (images.length <= currentSlide) {
			currentSlide = 0;
		}
	}

	onMount(() => {
		updateImagesBasedOnRatio();

		window.addEventListener('resize', updateImagesBasedOnRatio);

		const interval = setInterval(() => {
			fadeToNextSlide();
		}, 5000);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', updateImagesBasedOnRatio);
		};
	});

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
	{#if isImagesPreloaded}
		<!-- Render Current Slide -->
		{#each images as image, index (image)}
			{#if index === currentSlide}
				<img src={image} alt="" class="absolute inset-0 h-full w-full object-cover" transition:fade={{ duration: 500 }} />
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
	{/if}
</div>
