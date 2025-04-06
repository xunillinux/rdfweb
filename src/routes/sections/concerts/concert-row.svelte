<script lang="ts">
	import type { Concert } from '$lib/model/rdf-data-model';

	let { concert, isFirstElement, showTicketUrl = false }: { concert: Concert; isFirstElement: boolean; showTicketUrl?: boolean } = $props();
	import { replaceEscapedNewlines } from '$lib/helper/format-helper';
	import Fa from 'svelte-fa';
	import { faTicket } from '@fortawesome/free-solid-svg-icons';
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
		<div class="grid grid-cols-[1fr_auto]">
			<div>
				<p class="whitespace-pre-line uppercase lg:whitespace-normal">{replaceEscapedNewlines(concert.name)}</p>
				<p class="whitespace-pre-line uppercase lg:whitespace-normal">{replaceEscapedNewlines(concert.location)}</p>
			</div>

			{#if showTicketUrl && concert.ticketUrl}
				<div class="flex items-center justify-center pr-4 sm:pr-8">
					<a
						href={concert.ticketUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center uppercase text-black hover:text-red-500"
						aria-label="Get Tickets"
					>
						<Fa icon={faTicket} />
						<span class="xs:inline ml-2 hidden">Tickets</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
