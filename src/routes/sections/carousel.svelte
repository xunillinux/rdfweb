<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const images = [
		'/images/carousel_img_1.jpg',
		'/images/carousel_img_2.jpg',
		'/images/carousel_img_3.jpg'
	];

	let currentSlide = 0;
	let carouselHeight = '100vh';

	onMount(() => {
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % images.length;
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="relative w-full overflow-hidden" style="height: {carouselHeight};">
	<!-- Carousel Image -->
	<div
		class="absolute left-0 top-0 h-full w-full"
		style="background-image: url({images[
			currentSlide
		]}); background-size: cover; background-position: center;"
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
