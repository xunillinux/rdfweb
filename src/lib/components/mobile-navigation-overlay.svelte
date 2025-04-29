<script lang="ts">
	import type { SocialMediaLinksType } from '$lib/model/rdf-data-model';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import SocialMediaLinks from '../../routes/sections/social-media-links.svelte';

	let {
		isOpen = $bindable(),
		scrollToSection,
		socialMediaLinks
	}: {
		isOpen: boolean;
		scrollToSection: (event: any, id: string) => void;
		socialMediaLinks: SocialMediaLinksType;
	} = $props();

	const menuTopOffsetClass = 'top-16';
</script>

<div
	in:fly={{ duration: 300, x: 100, y: -100, easing: quintOut, opacity: 0 }}
	out:fly={{ duration: 250, x: 100, y: -100, easing: quintOut, opacity: 0 }}
	class="fixed inset-x-0 bottom-0 {menuTopOffsetClass} z-40 flex flex-col bg-white sm:hidden"
	style="transform-origin: top right;"
>
	<div class="flex flex-grow flex-col items-center justify-center space-y-6">
		<a href="#listen" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#feature')}>Listen</a>
		<a href="#see" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#concerts')}>See</a>
		<a href="#about" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#presstexts')}>About</a>
		<a href="#contact" class="text-2xl uppercase text-gray-800 hover:underline" onclick={(event) => scrollToSection(event, '#links')}>Contact</a>
	</div>

	<div class="flex justify-center pb-8">
		<SocialMediaLinks {socialMediaLinks} textSize="text-3xl" spaceX="space-x-12" translateY="0.15" />
	</div>
</div>
