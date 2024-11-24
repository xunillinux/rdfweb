<script lang="ts">
	import type { Concert } from '$lib/model/rdf-data-model';
	import { replaceEscapedNewlines } from '$lib/helper/format-helper';
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { normalizeDate, normalizedToday } from '$lib/helper/date-helper';
	import ConcertRow from './concert-row.svelte';

	let { concerts }: { concerts: Concert[] } = $props();

	let futureConcerts = $derived<Concert[]>(getFutureConcerts());
	let pastConcerts = $derived<Concert[]>(getPastConcerts());

	let isPastConcertsHidden = $state(true); // Toggle state for past concerts

	function getFutureConcerts() {
		return concerts
			.filter((concert) => normalizeDate(concert.date) >= normalizedToday())
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	}

	function getPastConcerts() {
		return concerts
			.filter((concert) => normalizeDate(concert.date) < normalizedToday())
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}
</script>

<div class="bg-white px-0 py-12 text-black sm:py-24">
	<div class=" py-6">
		<!-- Heading -->
		<h2 class="mb-7 text-center text-4xl font-bold uppercase tracking-wide">Concerts</h2>

		{#if futureConcerts?.length > 0}
			<div class="mx-auto">
				<div class="grid grid-cols-1">
					{#each futureConcerts as concert, index}
						<ConcertRow {concert} isFirstElement={index === 0} />
					{/each}
				</div>
			</div>
		{:else}
			<div class="flex h-20 items-center justify-center text-center text-lg text-gray-600">
				<p>There are no upcoming concerts :(</p>
			</div>
		{/if}

		<!-- Toggle Button -->
		<div class="mt-4 flex justify-center">
			<button
				class="flex items-center text-gray-600 hover:text-gray-800"
				onclick={() => (isPastConcertsHidden = !isPastConcertsHidden)}
				aria-label="Toggle Past Concerts"
			>
				<Fa icon={isPastConcertsHidden ? faChevronDown : faChevronUp} class="mr-2" />
				{isPastConcertsHidden ? 'Show Past Concerts' : 'Hide Past Concerts'}
			</button>
		</div>

		<!-- Past Concerts -->
		{#if !isPastConcertsHidden}
			<div class="mx-auto mt-6">
				<div class="grid grid-cols-1">
					{#each pastConcerts as concert, index}
						<ConcertRow {concert} isFirstElement={index === 0} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
