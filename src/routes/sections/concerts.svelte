<script lang="ts">
	import type { Concert } from '$lib/model/rdf-data-model';
	import ConcertList from './concert-list.svelte';

	let { concerts }: { concerts: Concert[] } = $props();

	const today = new Date();
	let futureConcerts = $derived<Concert[]>(getFutureConcerts());
	let pastConcerts = $derived<Concert[]>(getPastConcerts());

	function getFutureConcerts() {
		return concerts.filter((concert) => new Date(concert.date) >= today).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}

	function getPastConcerts() {
		return concerts.filter((concert) => new Date(concert.date) < today).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}
</script>

<div class="bg-white px-0 py-12 text-black sm:px-6 sm:py-24">
	<div class=" py-6">
		<ConcertList title="Concerts" concerts={futureConcerts} />
	</div>

	<div class=" py-6">
		<ConcertList title="Past Concerts" concerts={pastConcerts} />
	</div>
</div>
