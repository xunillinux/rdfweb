<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Array of image URLs
	const images = [
		'https://via.placeholder.com/1920x1080/FF0000',
		'https://via.placeholder.com/1920x1080/00FF00',
		'https://via.placeholder.com/1920x1080/0000FF'
	];

	let currentSlide = 0;

	// Change the image every 5 seconds
	onMount(() => {
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % images.length;
		}, 5000);

		// Clean up the interval when the component is destroyed
		return () => clearInterval(interval);
	});
</script>

<div class="relative h-screen w-full overflow-hidden">
	<!-- Images with fade transition -->
	<div
		class="absolute left-0 top-0 h-full w-full"
		style="background-image: url({images[
			currentSlide
		]}); background-size: cover; background-position: center;"
		transition:fade
	></div>
</div>

<style>
	/* Ensure the images take up the full screen height */
	.carousel {
		position: relative;
		height: 100vh; /* Full viewport height */
		width: 100%; /* Full width */
	}

	.carousel img {
		object-fit: cover; /* Cover the screen and center crop the image */
		width: 100%;
		height: 100%;
	}
</style>
