<script lang="ts">
	import HoverMailIconLink from '$lib/components/hover-mail-icon-link.svelte';
	import type { Link, SocialMediaLinksType } from '$lib/model/rdf-data-model';
	import SocialMediaLinks from './social-media-links.svelte';

	let { links, socialMediaLinks }: { links: Link[]; socialMediaLinks: SocialMediaLinksType } = $props();
</script>

<div class="bg-white py-24 text-black">
	<div class="flex flex-col items-center space-y-6">
		{#each links as link}
			<a
				href={link.href}
				target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
				rel="noopener noreferrer"
				class="text-4xl font-bold uppercase hover:underline sm:text-3xl"
			>
				{#if link.href.startsWith('mailto:')}
					<!-- Flex container for icon and text -->
					<div class="flex items-center space-x-2">
						<HoverMailIconLink text={link.text} />
					</div>
				{:else}
					{link.text}
				{/if}
			</a>
		{/each}

		<div class="pt-6">
			<SocialMediaLinks {socialMediaLinks} textSize="text-3xl sm:text-4xl" spaceX="space-x-12" />
		</div>
	</div>
</div>
