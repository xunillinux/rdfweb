<script lang="ts">
	import AnimatedFacebookIcon from '$lib/components/animated-facebook-icon.svelte';
	import AnimatedInstaIcon from '$lib/components/animated-insta-icon.svelte';
	import AnimatedSpotifyIcon from '$lib/components/animated-spotify-icon.svelte';
	import AnimatedYtIcon from '$lib/components/animated-yt-icon.svelte';
	import type { SocialMediaLinksType } from '$lib/model/rdf-data-model';
	import { faInstagram, faYoutube, faFacebook, faSpotify } from '@fortawesome/free-brands-svg-icons';
	import { Fa } from 'svelte-fa';

	// Props

	let {
		socialMediaLinks,
		textSize = 'text-2xl',
		spaceX = 'space-x-6',
		translateY = '0'
	}: { socialMediaLinks: SocialMediaLinksType; textSize?: string; spaceX?: string; translateY?: string } = $props();
</script>

<div class="flex {spaceX} {textSize}">
	{#if socialMediaLinks.linkInstagram}
		<a href={socialMediaLinks.linkInstagram} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<AnimatedInstaIcon />
		</a>
	{/if}
	{#if socialMediaLinks.linkYoutube}
		<a href={socialMediaLinks.linkYoutube} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<AnimatedYtIcon />
		</a>
	{/if}
	{#if socialMediaLinks.linkSpotify}
		<a href={socialMediaLinks.linkSpotify} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<AnimatedSpotifyIcon />
		</a>
	{/if}
	{#if socialMediaLinks.linkFacebook}
		<a href={socialMediaLinks.linkFacebook} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<AnimatedFacebookIcon />
		</a>
	{/if}
</div>
