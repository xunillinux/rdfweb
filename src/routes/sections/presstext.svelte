<script lang="ts">
	import type { PressText } from '$lib/model/rdf-data-model';
	import TiptapViewer from '$lib/components/tiptap/tiptap-viewer.svelte';

	let { presstexts }: { presstexts: PressText[] } = $props();

	const pressTextEN = $derived(presstexts.find((presstext) => presstext.language?.toUpperCase() === 'EN'));
	const pressTextDE = $derived(presstexts.find((presstext) => presstext.language?.toUpperCase() === 'DE'));
</script>

<div class="bg-black px-6 py-12 text-white">
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 sm:px-12">
		{#if pressTextEN}
			<div class="max-w-4xl border-black py-6 sm:mx-auto">
				<h2 class="mb-4 text-3xl font-bold uppercase">{pressTextEN.language}</h2>
				<TiptapViewer content={pressTextEN.text} viewerClass="whitespace-pre-line leading-relaxed lg:text-xl" />
			</div>
		{/if}

		{#if pressTextDE}
			<div class="max-w-4xl border-black pb-6 sm:mx-auto sm:py-6">
				<h2 class="mb-4 text-3xl font-bold uppercase">{pressTextDE.language}</h2>
				<TiptapViewer content={pressTextDE.text} viewerClass="whitespace-pre-line leading-relaxed lg:text-xl" />
			</div>
		{/if}
	</div>
</div>
