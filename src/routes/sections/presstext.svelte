<script lang="ts">
	import type { PressText } from '$lib/model/rdfDataModel';

	let { presstexts }: { presstexts: PressText[] } = $props();
	import { replaceEscapedNewlines } from '$lib/helper/helper';

	const pressTextEN = presstexts.find((presstext) => presstext.language?.toUpperCase() === 'EN');
	const pressTextDE = presstexts.find((presstext) => presstext.language?.toUpperCase() === 'DE');
</script>

<div class="bg-black px-6 py-12 text-white">
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 sm:px-12">
		{#if pressTextEN}
			<div class="max-w-4xl border-black py-6 sm:mx-auto">
				<h2 class="mb-4 text-3xl font-bold uppercase">{replaceEscapedNewlines(pressTextEN.language)}</h2>
				<p class="whitespace-pre-line leading-relaxed lg:text-xl">{replaceEscapedNewlines(pressTextEN.text)}</p>
			</div>
		{/if}

		{#if pressTextDE}
			<div class="max-w-4xl border-black pb-6 sm:mx-auto sm:py-6">
				<h2 class="mb-4 text-3xl font-bold uppercase">{replaceEscapedNewlines(pressTextDE.language)}</h2>
				<p class="whitespace-pre-line leading-relaxed lg:text-xl">{replaceEscapedNewlines(pressTextDE.text)}</p>
			</div>
		{/if}
	</div>
</div>
