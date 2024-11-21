<script lang="ts">
	import ModalBtn from '$lib/components/modalBtn.svelte';
	import type { Concert } from '$lib/model/rdfDataModel';

	let { concerts }: { concerts: Concert[] } = $props();

	function onConfirm() {}
</script>

<ModalBtn title="Edit Concerts" btnText="Edit Concerts" {onConfirm}>
	{#each concerts as concert}
		{concert.date.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + ' - ' + concert.name}<br />
	{/each}
</ModalBtn>
