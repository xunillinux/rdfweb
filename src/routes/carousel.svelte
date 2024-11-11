<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const images = [
		'https://via.placeholder.com/1920x1080/FF0000',
		'https://via.placeholder.com/1920x1080/00FF00',
		'https://via.placeholder.com/1920x1080/0000FF'
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
	<div
		class="absolute left-0 top-0 h-full w-full"
		style="background-image: url({images[
			currentSlide
		]}); background-size: cover; background-position: center;"
		transition:fade
	></div>
</div>
