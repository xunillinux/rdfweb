<script lang="ts">
	import Header from './sections/header.svelte';
	import Carousel from './sections/carousel.svelte';
	import Feature from './sections/feature.svelte';
	import Concerts from './sections/concerts.svelte';
	import Footer from './sections/footer.svelte';
	import Presstext from './sections/presstext.svelte';
	import Members from './sections/members.svelte';
	import Links from './sections/links.svelte';
	import EditConcerts from './edit/editConcerts.svelte';

	let { data } = $props();
</script>

<Header socialMediaLinks={data.socialMediaLinks} />

<main id="top" class="main">
	<section id="carousel" class="carousel-section">
		<Carousel />
	</section>

	<section id="feature" class="feature-section">
		<Feature feature={data.feature} />
	</section>

	<section id="concerts" class="concert-section relative">
		<Concerts concerts={data.concerts} />
		<div class="absolute bottom-4 right-5 transform">
			<EditConcerts concerts={data.concerts} />
		</div>
	</section>

	<section id="presstexts" class="presstext-section">
		<Presstext presstexts={data.presstexts} />
	</section>

	<section id="members" class="members-section">
		<Members members={data.members} />
	</section>

	<section id="links" class="links-section">
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
