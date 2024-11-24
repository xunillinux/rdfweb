<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { replaceNewlinesWithSpace } from '$lib/helper/format-helper';
	import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import type { Concert } from '$lib/model/rdf-data-model';
	import Fa from 'svelte-fa';

	let { concerts, onConcertDataChange }: { concerts: Concert[]; onConcertDataChange: any } = $props();

	let concertData = $state<{ date: string; name: string; location: string }[]>(
		concerts
			.map((c) => ({
				date: c.date.toISOString().split('T')[0],
				name: c.name,
				location: c.location
			}))
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	);

	let newConcert = $state({ date: '', name: '', location: '' });
	let newConcertData = $state<{ date: string; name: string; location: string }[]>([]);

	let pastConcertsCollapsed = $state(true);

	// Add new concert to the beginning of the array
	function addConcert(event: Event) {
		event.preventDefault();
		newConcertData.unshift({ ...newConcert });
		newConcert = { date: '', name: '', location: '' };
	}

	// Delete a concert
	function deleteConcert(index: number, isNewConcert: boolean) {
		isNewConcert ? newConcertData.splice(index, 1) : concertData.splice(index, 1);
	}

	function onConfirm() {
		concertData.push(...newConcertData);
		concertData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		newConcertData = [];

		concerts = concertData.map((c) => ({
			date: new Date(c.date),
			name: c.name,
			location: c.location
		}));

		onConcertDataChange(concerts);
	}

	function onClose() {
		newConcert = { date: '', name: '', location: '' };
		newConcertData = [];
		pastConcertsCollapsed = true;
		concertData = concerts.map((c) => ({
			date: c.date.toISOString().split('T')[0],
			name: c.name,
			location: c.location
		}));
	}

	// Toggle collapsible past concerts
	function togglePastConcerts() {
		pastConcertsCollapsed = !pastConcertsCollapsed;
	}
</script>

<ModalBtn title="Edit Concerts" btnText="Edit Concerts" {onConfirm} {onClose}>
	<div class="py-1">
		<h2 class="mb-4 text-lg font-bold">Add New Concert</h2>

		<!-- Form for adding new concerts -->
		<form onsubmit={addConcert} class="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
			<input
				id="concert-date"
				name="concert-date"
				type="date"
				bind:value={newConcert.date}
				class="w-full rounded border p-2"
				required
				placeholder="Date"
			/>
			<input
				id="concert-name"
				name="concert-name"
				type="text"
				bind:value={newConcert.name}
				class="w-full rounded border p-2"
				required
				placeholder="Concert Name"
			/>
			<input
				id="concert-location"
				name="concert-location"
				type="text"
				bind:value={newConcert.location}
				class="w-full rounded border p-2"
				required
				placeholder="Location"
			/>
			<!-- Hint -->
			<p class="text-sm text-gray-500 sm:col-span-1 md:col-span-3">
				You can add <span class="font-mono font-bold text-black">\n</span> to Name or Location to add a forced line break on smaller screens.
			</p>
			<button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"> Add Concert </button>
		</form>

		{#if newConcertData.length > 0}
			<h2 class="mb-4 mt-8 text-lg font-bold">New Concerts</h2>

			<!-- List of new concerts -->
			<ul class="space-y-4">
				{#each newConcertData as concert, index}
					<li class="flex items-center justify-between rounded border p-4">
						<div>
							<p><strong>Date:</strong> {concert.date}</p>
							<p><strong>Name:</strong> {replaceNewlinesWithSpace(concert.name)}</p>
							<p><strong>Location:</strong> {replaceNewlinesWithSpace(concert.location)}</p>
						</div>
						<button onclick={() => deleteConcert(index, true)} class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"> Delete </button>
					</li>
				{/each}
			</ul>
		{/if}

		<!-- Title with Toggle Icon -->
		<h2 class="mb-4 mt-4 flex items-center text-lg font-bold">
			<span>Existing Concerts</span>
			<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={togglePastConcerts} aria-label="Toggle Past Concerts">
				<Fa icon={pastConcertsCollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
			</button>
		</h2>

		<!-- List of existing concerts -->
		{#if !pastConcertsCollapsed}
			<ul class="space-y-4">
				{#each concertData as concert, index}
					<li class="flex items-center justify-between rounded border p-4">
						<div>
							<p><strong>Date:</strong> {concert.date}</p>
							<p><strong>Name:</strong> {replaceNewlinesWithSpace(concert.name)}</p>
							<p><strong>Location:</strong> {concert.location}</p>
						</div>
						<button onclick={() => deleteConcert(index, false)} class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"> Delete </button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</ModalBtn>
