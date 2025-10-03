<script lang="ts">
	import { r2bucketEndpoint } from '$lib/config';
	import type { Member } from '$lib/model/rdf-data-model';

	let { members }: { members: Member[] } = $props();
</script>

<div class="bg-black px-6 pb-24 pt-12 text-white">
	<div class="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4">
		{#each members as member}
			<div class="flex flex-col items-center">
				<!-- Portrait -->
				<img src={r2bucketEndpoint + '/' + member.image} alt={member.name} class="w-100% rounded-md object-cover sm:w-60" />

				<!-- Name -->
				<p class="mt-4 text-xl font-bold uppercase">{member.name}</p>

				<!-- Role -->
				<p class="text-base">{member.role}</p>
			</div>
		{/each}
	</div>
</div>
