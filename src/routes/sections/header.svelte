<script lang="ts">
	import MobileNavigationOverlay from '$lib/components/mobile-navigation-overlay.svelte';
	import type { SocialMediaLinksType } from '$lib/model/rdf-data-model';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import { Fa } from 'svelte-fa';
	import SocialMediaLinks from './social-media-links.svelte';
	import AnimatedBurgerIcon from '$lib/components/animated-burger-icon.svelte';

	let { socialMediaLinks }: { socialMediaLinks: SocialMediaLinksType } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function scrollToSection(event: any, id: string) {
		event?.preventDefault();
		const section = document.querySelector(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		isMenuOpen = false;
	}

	$effect(() => {
		if (isMenuOpen) {
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.paddingRight = `${scrollbarWidth}px`;
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		}
		return () => {
			// Cleanup
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		};
	});
</script>

<header class="fixed top-0 z-20 h-16 w-full bg-white shadow-md">
	<nav class="relative mx-auto flex h-full w-full items-center px-6">
		<div class="flex w-full items-center justify-between">
			<a
				href="#top"
				class="text-2xl font-bold text-gray-800 sm:block"
				onclick={(event) => {
					scrollToSection(event, '#top');
				}}
			>
				<span class="hidden uppercase md:inline">Robot Dog Funeral</span>
				<span class="uppercase md:hidden">RDF</span>
			</a>

			<!-- Desktop Navigation Bar -->
			<div class="hidden space-x-6 text-xl sm:flex">
				<a
					href="#listen"
					class="uppercase text-gray-800 hover:underline"
					onclick={(event) => {
						scrollToSection(event, '#feature');
					}}>Listen</a
				>
				<a
					href="#see"
					class="uppercase text-gray-800 hover:underline"
					onclick={(event) => {
						scrollToSection(event, '#concerts');
					}}>See</a
				>
				<a
					href="#about"
					class="uppercase text-gray-800 hover:underline"
					onclick={(event) => {
						scrollToSection(event, '#presstexts');
					}}>About</a
				>
				<a
					href="#contact"
					class="uppercase text-gray-800 hover:underline"
					onclick={(event) => {
						scrollToSection(event, '#links');
					}}>Contact</a
				>
				<div class="text-gray-800">
					<SocialMediaLinks {socialMediaLinks} translateY="0.15" />
				</div>
			</div>

			<!-- Mobile Burger Icon -->
			<button
				class="relative z-50 text-gray-800 focus:outline-none sm:hidden"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isMenuOpen}
			>
				<AnimatedBurgerIcon isOpen={isMenuOpen} />
			</button>
		</div>

		{#if isMenuOpen}
			<MobileNavigationOverlay bind:isOpen={isMenuOpen} {scrollToSection} {socialMediaLinks} />
		{/if}
	</nav>
</header>
