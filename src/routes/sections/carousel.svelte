<script lang="ts">
	import { onMount } from 'svelte';

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
	let fading = $state(false);
	let hasLoaded = $state(false);

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
		setTimeout(() => {
			hasLoaded = true;
		}, 200);
	}

	async function updateImagesBasedOnRatio() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		const selectedImages = screenWidth > screenHeight ? landscapeImages : portraitImages;

		await preloadImages(selectedImages);

		images = selectedImages;

		if (images.length < currentSlide) {
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

	async function fadeToNextSlide() {
		fading = true;
		await new Promise((resolve) => setTimeout(resolve, 200)); // Match fade duration
		currentSlide = (currentSlide + 1) % images.length;
		fading = false;
	}
</script>

<div class="relative w-full overflow-hidden" style="height: {carouselHeight};">
	{#if isImagesPreloaded}
		<!-- Carousel Image -->
		<div
			class="absolute left-0 top-0 h-full w-full transition-opacity duration-500"
			style="background-image: url({images[currentSlide]}); background-size: cover; background-position: center;"
			class:opacity-0={!hasLoaded || fading}
			class:opacity-100={hasLoaded && !fading}
		></div>

		<!-- Overlay Text -->
		<div class="absolute inset-0 flex items-center justify-center text-center text-white">
			<div class="text-5xl font-bold uppercase leading-snug md:text-7xl lg:text-9xl">
				<div>Robot</div>
				<div>Dog</div>
				<div>Funeral</div>
			</div>
		</div>
	{/if}
</div>
