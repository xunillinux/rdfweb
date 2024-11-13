<script lang="ts">
	import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
	import { Fa } from 'svelte-fa';
	import SocialMediaLinks from './socialMediaLinks.svelte';
	import type { SocialMediaLinks as SocialMediaLinksType } from '$lib/mock/database';

	let { socialMediaLinks }: { socialMediaLinks: SocialMediaLinksType } = $props();

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="bg-white shadow-md">
	<nav class="mx-auto w-full px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="#top" class="text-2xl font-bold text-gray-800 sm:block">
				<span class="hidden sm:inline">Robot Dog Funeral</span>
				<span class="sm:hidden">RDF</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden space-x-6 text-xl sm:flex">
				<a href="#listen" class="text-gray-800 hover:underline">Listen</a>
				<a href="#see" class="text-gray-800 hover:underline">See</a>
				<a href="#about" class="text-gray-800 hover:underline">About</a>
				<a href="#contact" class="text-gray-800 hover:underline">Contact</a>
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
			<div class="fixed inset-0 z-50 flex flex-col bg-white">
				<!-- Close Button -->
				<button class="absolute right-6 top-6 text-gray-800 focus:outline-none" onclick={toggleMenu}>
					<Fa icon={faTimes} scale={1.5} />
				</button>

				<!-- Centered Links -->
				<div class="flex flex-grow flex-col items-center justify-center space-y-6">
					<a href="#listen" class="text-2xl text-gray-800 hover:underline" onclick={() => (isMenuOpen = false)}>Listen</a>
					<a href="#see" class="text-2xl text-gray-800 hover:underline" onclick={() => (isMenuOpen = false)}>See</a>
					<a href="#about" class="text-2xl text-gray-800 hover:underline" onclick={() => (isMenuOpen = false)}>About</a>
					<a href="#contact" class="text-2xl text-gray-800 hover:underline" onclick={() => (isMenuOpen = false)}>Contact</a>
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
