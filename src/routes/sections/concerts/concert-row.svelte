<script lang="ts">
	import type { Concert } from '$lib/model/rdf-data-model';

	let { concert, isFirstElement }: { concert: Concert; isFirstElement: boolean } = $props();
	import { replaceEscapedNewlines } from '$lib/helper/format-helper';
</script>

<div class="text-md grid grid-cols-2 border-black py-2 sm:py-4 sm:text-xl md:text-2xl {isFirstElement ? 'border-t' : ''} border-b">
	<!-- Left Column: Date -->
	<div class="border-r border-black pr-3 text-right sm:pr-6">
		<p class="uppercase">
			{concert.date.toLocaleString('en-US', { month: 'long', day: 'numeric' })}
		</p>
		<p class="uppercase">{concert.date.getFullYear()}</p>
	</div>

	<!-- Right Column: Name and Location -->
	<div class="pl-3 text-left sm:pl-6">
		<p class="whitespace-pre-line uppercase lg:whitespace-normal">{replaceEscapedNewlines(concert.name)}</p>
		<p class="whitespace-pre-line uppercase lg:whitespace-normal">{replaceEscapedNewlines(concert.location)}</p>
	</div>
</div>
