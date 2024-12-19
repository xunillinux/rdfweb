<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { faChevronUp, faChevronDown, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { PressText } from '$lib/model/rdf-data-model';
	import Tiptap from '$lib/components/tiptap.svelte';

	let { presstexts, onPressTextDataChange }: { presstexts: PressText[]; onPressTextDataChange: any } = $props();

	let presstextEN = $state(getPresstext('EN'));
	let presstextDE = $state(getPresstext('DE'));

	let isENCollapsed = $state(false);
	let isDECollapsed = $state(true);

	function onConfirm() {
		const pressTextData = [presstextDE, presstextEN];

		presstextEN = getPresstext('EN');
		presstextDE = getPresstext('DE');

		onPressTextDataChange(pressTextData);
	}

	function onClose() {
		isENCollapsed = false;
		isDECollapsed = true;
		presstextEN = getPresstext('EN');
		presstextDE = getPresstext('DE');
	}

	function getPresstext(language: string) {
		const originalPText = presstexts.find((p) => p.language.toUpperCase() === language) ?? {};
		const pText = JSON.parse(JSON.stringify(originalPText)) as PressText;
		pText.text = pText.text.replace(/\\n/g, '\n');
		return pText;
	}

	function toggleENCollapsed() {
		isENCollapsed = !isENCollapsed;
	}

	function toggleDECollapsed() {
		isDECollapsed = !isDECollapsed;
	}
</script>

<ModalBtn title="Edit Presstexts" btnText="Edit" btnFaIcon={faPenToSquare} {onConfirm} {onClose}>
	<div class="py-1">
		<div class="py-2">
			<Tiptap />
		</div>

		<!-- Title with Toggle Icon -->
		<h2 class="mb-4 flex items-center text-lg font-bold">
			<span>EN</span>
			<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={toggleENCollapsed} aria-label="Toggle Past Concerts">
				<Fa icon={isENCollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
			</button>
		</h2>

		{#if !isENCollapsed}
			<textarea
				id="presstext-en"
				name="presstext-en"
				bind:value={presstextEN.text}
				class="w-full rounded border p-2"
				required
				placeholder="Presstext"
				rows="11"
			></textarea>
		{/if}

		<!-- Title with Toggle Icon -->
		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>DE</span>
			<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={toggleDECollapsed} aria-label="Toggle Past Concerts">
				<Fa icon={isDECollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
			</button>
		</h2>
		{#if !isDECollapsed}
			<textarea
				id="presstext-de"
				name="presstext-de"
				bind:value={presstextDE.text}
				class="w-full rounded border p-2"
				required
				placeholder="Presstext"
				rows="11"
			></textarea>
		{/if}
	</div>
</ModalBtn>
