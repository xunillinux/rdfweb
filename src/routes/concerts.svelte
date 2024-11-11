<script lang="ts">
	import type { Concert } from '$lib/mock/database';

	let { concerts }: { concerts: Concert[] } = $props();

	const today = new Date();

	const futureConcerts = concerts
		.filter((concert) => new Date(concert.date) >= today)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const pastConcerts = concerts
		.filter((concert) => new Date(concert.date) < today)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<h2 class="mt-8 text-center text-3xl font-bold">Concerts</h2>
<div class="container mx-auto p-6">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each futureConcerts as concert}
			<div class="mx-0 grid grid-cols-2 items-center px-0 py-2">
				<span>{concert.date}</span>
				<span>{concert.location}</span>
			</div>
		{/each}
	</div>
</div>

<h2 class="mt-8 text-center text-3xl font-bold">Past Concerts</h2>
<div class="container mx-auto p-6">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each pastConcerts as concert}
			<div class="mx-0 grid grid-cols-2 items-center px-0 py-2">
				<span>{concert.date}</span>
				<span>{concert.location}</span>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
