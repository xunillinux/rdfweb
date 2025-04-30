<script lang="ts">
	import HoverMailIconLink from '$lib/components/hover-mail-icon-link.svelte';
	import type { Link, SocialMediaLinksType } from '$lib/model/rdf-data-model';
	import SocialMediaLinks from './social-media-links.svelte';

	let { links, socialMediaLinks }: { links: Link[]; socialMediaLinks: SocialMediaLinksType } = $props();
</script>

<div class="bg-white py-24 text-black">
	<div class="flex flex-col items-center space-y-6">
		{#each links as link}
			{#if link.href.startsWith('mailto:')}
				<div class="flex items-center space-x-2">
					<HoverMailIconLink text={link.text} />
				</div>
			{:else}
				<a
					href={link.href}
					target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
					rel="noopener noreferrer"
					class="text-4xl font-bold uppercase hover:underline sm:text-3xl"
				>
					{link.text}
				</a>
			{/if}
		{/each}

		<div class="pt-6">
			<SocialMediaLinks {socialMediaLinks} textSize="text-3xl sm:text-4xl" spaceX="space-x-12" />
		</div>
	</div>
</div>
