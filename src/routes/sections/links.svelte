<script lang="ts">
	import SocialMediaLinks from './socialMediaLinks.svelte';
	import type { Link } from '$lib/mock/database';

	let { links, socialMediaLinks }: { links: Link[]; socialMediaLinks: SocialMediaLinks } = $props();
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
				{link.text}
			</a>
		{/each}

		<div class="pt-6">
			<SocialMediaLinks {socialMediaLinks} textSize="text-3xl sm:text-4xl" spaceX="space-x-12" />
		</div>
	</div>
</div>
