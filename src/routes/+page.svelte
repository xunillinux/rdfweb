<script lang="ts">
	import { auth, updateDocument, userData } from '$lib/firebase';
	import { showNotification } from '$lib/helper/notification-helper';
	import type { Concert, Feature as FeatureType, HeaderImage, Link, Member, PressText, RdfWebData } from '$lib/model/rdf-data-model';
	import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
	import { signOut } from 'firebase/auth';
	import Fa from 'svelte-fa';
	import EditCarousel from './edit/edit-carousel.svelte';
	import EditConcerts from './edit/edit-concerts.svelte';
	import EditFeature from './edit/edit-feature.svelte';
	import EditLinks from './edit/edit-links.svelte';
	import EditMembers from './edit/edit-members.svelte';
	import EditPresstexts from './edit/edit-presstexts.svelte';
	import Carousel from './sections/carousel.svelte';
	import Concerts from './sections/concerts/concerts.svelte';
	import Feature from './sections/feature.svelte';
	import Footer from './sections/footer.svelte';
	import Header from './sections/header.svelte';
	import Links from './sections/links.svelte';
	import Members from './sections/members.svelte';
	import Presstext from './sections/presstext.svelte';

	let { data } = $props();

	let headerImages = $state(data.headerImages);
	let concerts = $state(data.concerts);
	let feature = $state(data.feature);
	let links = $state(data.links);
	let members = $state(data.members);
	let presstexts = $state(data.presstexts);
	let socialMediaLinks = $state(data.socialMediaLinks);

	function onHeaderImagesChange(updatedHeaderImages: HeaderImage[]) {
		headerImages = updatedHeaderImages;
		saveChanges();
	}

	function onFeatureDataChange(updatedFeature: FeatureType) {
		feature = updatedFeature;
		saveChanges();
	}

	function onConcertDataChange(updatedConcerts: Concert[]) {
		concerts = updatedConcerts;
		saveChanges();
	}

	function onPressTextDataChange(updatedPresstexts: PressText[]) {
		presstexts = updatedPresstexts;
		saveChanges();
	}

	function onMembersDataChange(updatedMembers: Member[]) {
		members = updatedMembers;
		saveChanges();
	}

	function onLinksDataChange(updatedLinks: Link[]) {
		links = updatedLinks;
		saveChanges();
	}

	function saveChanges() {
		updateDocument('rdfweb', 'data', getUpdatedData());
		// TODO on fail reset data with initial data
	}

	function getUpdatedData(): RdfWebData {
		return { headerImages, concerts, feature, links, members, presstexts, socialMediaLinks };
	}

	async function logout() {
		try {
			await signOut(auth);
			showNotification('success', 'Logged out successfully');
		} catch (error) {
			showNotification('error', 'There was a problem while logging out. Please try again.');
		}
	}
</script>

<Header {socialMediaLinks} />

<main id="top" class="w-100">
	<section id="carousel" class="carousel-section relative">
		<Carousel {headerImages} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditCarousel {headerImages} {onHeaderImagesChange} />
			</div>
		{/if}
	</section>

	<section id="feature" class="feature-section relative">
		<Feature {feature} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditFeature {feature} {onFeatureDataChange} />
			</div>
		{/if}
	</section>

	<section id="concerts" class="concert-section relative">
		<Concerts {concerts} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditConcerts {concerts} {onConcertDataChange} />
			</div>
		{/if}
	</section>

	<section id="presstexts" class="presstext-section relative">
		<Presstext {presstexts} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditPresstexts {presstexts} {onPressTextDataChange} />
			</div>
		{/if}
	</section>

	<section id="members" class="members-section relative">
		<Members {members} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditMembers {members} {onMembersDataChange} />
			</div>
		{/if}
	</section>

	<section id="links" class="links-section relative">
		<Links {links} {socialMediaLinks} />
		{#if $userData.user}
			<div class="absolute bottom-4 right-5 transform">
				<EditLinks {links} {onLinksDataChange} />
			</div>
		{/if}
	</section>
</main>

<Footer />

{#if $userData.user}
	<button
		class="fixed bottom-4 left-4 flex items-center rounded bg-gray-800 px-4 py-2 text-white shadow-lg hover:bg-gray-700"
		onclick={logout}
		aria-label="Logout"
	>
		<Fa icon={faSignOutAlt} class="mr-2" />
		Logout
	</button>
{/if}
