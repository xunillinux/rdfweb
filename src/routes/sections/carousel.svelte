<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Classify images into landscape and portrait groups
	const landscapeImages = ['/images/carousel_img_1.jpg', '/images/carousel_img_2.jpg'];
	const portraitImages = [
		'/images/carousel_img_3.jpg',
		'/images/carousel_img_4.jpg',
		'/images/carousel_img_5.jpg',
		'/images/carousel_img_6.jpg',
		'/images/carousel_img_7.jpg'
	];

	let images: string[] = []; // Active image list
	let currentSlide = 0;
	let carouselHeight = '100vh';

	// Function to determine screen ratio and select appropriate images
	function updateImagesBasedOnRatio() {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		// If the width is greater than height, use landscape images, otherwise portrait
		images = screenWidth > screenHeight ? landscapeImages : portraitImages;

		// Reset current slide to avoid index out-of-bounds issues
		currentSlide = 0;
	}

	onMount(() => {
		// Set the initial images based on the current screen ratio
		updateImagesBasedOnRatio();

		// Re-check when the window is resized
		window.addEventListener('resize', updateImagesBasedOnRatio);

		// Start the image rotation interval
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % images.length;
		}, 5000);

		return () => {
			// Cleanup
			clearInterval(interval);
			window.removeEventListener('resize', updateImagesBasedOnRatio);
		};
	});
</script>

<div class="relative w-full overflow-hidden" style="height: {carouselHeight};">
	<!-- Carousel Image -->
	<div
		class="absolute left-0 top-0 h-full w-full"
		style="background-image: url({images[currentSlide]}); background-size: cover; background-position: center;"
		transition:fade
	></div>

	<!-- Overlay Text -->
	<div class="absolute inset-0 flex items-center justify-center text-center text-white">
		<div class="text-5xl font-bold uppercase leading-snug sm:text-7xl md:text-8xl lg:text-9xl">
			<div>Robot</div>
			<div>Dog</div>
			<div>Funeral</div>
		</div>
	</div>
</div>
