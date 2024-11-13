<script lang="ts">
	import { fade } from 'svelte/transition';
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

<div class="relative w-full overflow-hidden" style="height: {carouselHeight};">
	{#if isImagesPreloaded}
		<!-- Render Current Slide -->
		{#each images as image, index (image)}
			{#if index === currentSlide}
				<img src={image} alt="" class="absolute inset-0 h-full w-full object-cover" transition:fade={{ duration: 500 }} />
			{/if}
		{/each}

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
