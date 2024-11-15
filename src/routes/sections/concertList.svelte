<script lang="ts">
	import type { Concert } from '$lib/model/rdfDataModel';

	let { title, concerts }: { title: string; concerts: Concert[] } = $props();
	import { replaceEscapedNewlines } from '$lib/helper/helper';
</script>

<!-- Heading -->
<h2 class="mb-7 text-center text-4xl font-bold uppercase tracking-wide">{title}</h2>

{#if concerts?.length > 0}
	<div class="mx-auto max-w-xl lg:max-w-4xl">
		<div class="grid grid-cols-1">
			{#each concerts as concert, index}
				<div class="text-md grid grid-cols-2 border-black py-2 sm:py-4 sm:text-xl md:text-2xl {index === 0 ? 'border-t' : ''} border-b">
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
			{/each}
		</div>
	</div>
{:else}
	<div class="flex h-20 items-center justify-center text-center text-lg text-gray-600">
		<p>There are no upcoming concerts :(</p>
	</div>
{/if}
