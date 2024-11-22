<script lang="ts">
	import Header from './sections/header.svelte';
	import Carousel from './sections/carousel.svelte';
	import Feature from './sections/feature.svelte';
	import Concerts from './sections/concerts.svelte';
	import Footer from './sections/footer.svelte';
	import Presstext from './sections/presstext.svelte';
	import Members from './sections/members.svelte';
	import Links from './sections/links.svelte';
	import EditConcerts from './edit/edit-concerts.svelte';
	import type { Concert, RdfWebData } from '$lib/model/rdf-data-model';
	import { updateDocument, userData } from '$lib/firebase';

	let { data } = $props();

	let concerts = $state(data.concerts);
	let feature = $state(data.feature);
	let links = $state(data.links);
	let members = $state(data.members);
	let presstexts = $state(data.presstexts);
	let socialMediaLinks = $state(data.socialMediaLinks);

	function onConcertDataChange(updatedConcerts: Concert[]) {
		concerts = updatedConcerts;
		updateDocument('rdfweb', 'data', getUpdatedData());
	}

	function getUpdatedData(): RdfWebData {
		return {
			concerts,
			feature,
			links,
			members,
			presstexts,
			socialMediaLinks
		};
	}
</script>

<Header {socialMediaLinks} />

<main id="top" class="main">
	<section id="carousel" class="carousel-section">
		<Carousel />
	</section>

	<section id="feature" class="feature-section">
		<Feature {feature} />
	</section>

	<section id="concerts" class="concert-section relative">
		<Concerts {concerts} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditConcerts {concerts} {onConcertDataChange} />
			</div>
		{/if}
	</section>

	<section id="presstexts" class="presstext-section">
		<Presstext {presstexts} />
	</section>

	<section id="members" class="members-section">
		<Members {members} />
	</section>

	<section id="links" class="links-section">
		<Links {links} {socialMediaLinks} />
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
