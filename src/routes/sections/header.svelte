<script lang="ts">
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';
	import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
	import { Fa } from 'svelte-fa';

	let isMenuOpen = false;

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
				<a href="#instagram" class="text-gray-800">
					<Fa icon={faInstagram} scale={1.2} translateY={0.3} />
				</a>
			</div>

			<!-- Mobile Burger Icon -->
			<button class="text-gray-800 focus:outline-none sm:hidden" on:click={toggleMenu}>
				<Fa icon={faBars} scale={1.5} />
			</button>
		</div>

		<!-- Fullscreen Mobile Navigation -->
		{#if isMenuOpen}
			<div class="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-6 bg-white">
				<button
					class="absolute right-6 top-6 text-gray-800 focus:outline-none"
					on:click={toggleMenu}
				>
					<Fa icon={faTimes} scale={1.5} />
				</button>
				<a
					href="#listen"
					class="text-2xl text-gray-800 hover:underline"
					on:click={() => (isMenuOpen = false)}>Listen</a
				>
				<a
					href="#see"
					class="text-2xl text-gray-800 hover:underline"
					on:click={() => (isMenuOpen = false)}>See</a
				>
				<a
					href="#about"
					class="text-2xl text-gray-800 hover:underline"
					on:click={() => (isMenuOpen = false)}>About</a
				>
				<a
					href="#contact"
					class="text-2xl text-gray-800 hover:underline"
					on:click={() => (isMenuOpen = false)}>Contact</a
				>
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
