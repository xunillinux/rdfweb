<script>
	import Carousel from './Carousel.svelte';
	import Concerts from './Concerts.svelte';

	let { data } = $props();
</script>

<main class="main">
	<section class="carousel-section">
		<Carousel />
	</section>
	<section class="concert-section">
		<Concerts concerts={data.concerts} />
	</section>
</main>

<style>
	.main {
		width: 100%;
	}

	.carousel-section {
		position: relative;
		width: 100%;
	}

	.concert-section {
		min-height: 100vh;
		padding: 2rem 0;
	}
</style>
