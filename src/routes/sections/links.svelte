<script lang="ts">
	import SocialMediaLinks from './socialMediaLinks.svelte';
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
	import { Fa } from 'svelte-fa';
	import type { Link, SocialMediaLinksType } from '$lib/model/rdfDataModel';

	let { links, socialMediaLinks }: { links: Link[]; socialMediaLinks: SocialMediaLinksType } = $props();
</script>

<div class="bg-white py-12 text-black">
	<div class="flex flex-col items-center space-y-6">
		{#each links as link}
			<a
				href={link.href}
				target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
				rel="noopener noreferrer"
				class="text-2xl font-bold uppercase hover:underline sm:text-3xl"
			>
				{#if link.href.startsWith('mailto:')}
					<!-- Flex container for icon and text -->
					<div class="flex items-center space-x-2">
						<Fa icon={faEnvelope} class="fa-solid" translateY="0.02" />
						<span>{link.text}</span>
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
