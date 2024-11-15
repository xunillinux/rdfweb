<script lang="ts">
	import type { SocialMediaLinksType } from '$lib/server/database';
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
			<Fa icon={faInstagram} {translateY} />
		</a>
	{/if}
	{#if socialMediaLinks.linkYoutube}
		<a href={socialMediaLinks.linkYoutube} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<Fa icon={faYoutube} {translateY} />
		</a>
	{/if}
	{#if socialMediaLinks.linkSpotify}
		<a href={socialMediaLinks.linkSpotify} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<Fa icon={faSpotify} {translateY} />
		</a>
	{/if}
	{#if socialMediaLinks.linkFacebook}
		<a href={socialMediaLinks.linkFacebook} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center">
			<Fa icon={faFacebook} {translateY} />
		</a>
	{/if}
</div>
