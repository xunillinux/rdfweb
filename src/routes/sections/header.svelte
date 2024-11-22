<script lang="ts">
	import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
	import { Fa } from 'svelte-fa';
	import SocialMediaLinks from './socialMediaLinks.svelte';
	import type { SocialMediaLinksType } from '$lib/model/rdfDataModel';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let { socialMediaLinks }: { socialMediaLinks: SocialMediaLinksType } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function scrollToSection(event: any, id: string) {
		event.preventDefault();
		const section = document.querySelector(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		isMenuOpen = false;
	}
</script>

<header class="bg-white shadow-md">
	<nav class="mx-auto w-full px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
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

			<!-- Desktop Navigation -->
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
			<button class="text-gray-800 focus:outline-none sm:hidden" onclick={toggleMenu}>
				<Fa icon={faBars} scale={1.5} />
			</button>
		</div>

		<!-- Fullscreen Mobile Navigation -->
		{#if isMenuOpen}
			<div
				in:fly={{ duration: 250, x: 100, y: 0, easing: quintOut }}
				out:fade={{ easing: quintOut }}
				class="fixed inset-0 z-50 flex flex-col bg-white"
			>
				<!-- Close Button -->
				<button class="absolute right-6 top-6 text-gray-800 focus:outline-none" onclick={toggleMenu}>
					<Fa icon={faTimes} scale={1.5} />
				</button>

				<!-- Centered Links -->
				<div class="flex flex-grow flex-col items-center justify-center space-y-6">
					<a href="#listen" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#feature')}>Listen</a
					>
					<a href="#see" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#concerts')}>See</a>
					<a href="#about" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#presstexts')}
						>About</a
					>
					<a href="#contact" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#links')}>Contact</a
					>
				</div>

				<!-- Social Media Links -->
				<div class="flex justify-center pb-8">
					<SocialMediaLinks {socialMediaLinks} textSize="text-3xl" spaceX="space-x-12" translateY="0.15" />
				</div>
			</div>
		{/if}
	</nav>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;
	}
</style>
