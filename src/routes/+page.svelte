<script lang="ts">
	import Header from './sections/header.svelte';
	import Carousel from './sections/carousel.svelte';
	import Feature from './sections/feature.svelte';
	import Concerts from './sections/concerts.svelte';
	import Footer from './sections/footer.svelte';
	import Presstext from './sections/presstext.svelte';
	import Members from './sections/members.svelte';
	import Links from './sections/links.svelte';

	let { data } = $props();
</script>

<Header socialMediaLinks={data.socialMediaLinks} />

<main class="main">
	<section class="carousel-section">
		<Carousel />
	</section>
	<section class="feature-section">
		<Feature feature={data.feature} />
	</section>
	<section class="concert-section">
		<Concerts concerts={data.concerts} />
	</section>
	<section class="presstext-section">
		<Presstext presstexts={data.presstexts} />
	</section>
	<section class="members-section">
		<Members members={data.members} />
	</section>
	<section class="links-section">
		<Links links={data.links} socialMediaLinks={data.socialMediaLinks} />
	</section>
</main>

<Footer />

<style>
	.main {
		width: 100%;
	}

	.carousel-section {
		position: relative;
		width: 100%;
	}
</style>
