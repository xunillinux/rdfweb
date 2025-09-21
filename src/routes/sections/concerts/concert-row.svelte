<script lang="ts">
	import { replaceEscapedNewlines } from '$lib/helper/format-helper';
	import type { Concert } from '$lib/model/rdf-data-model';
	import { faStar } from '@fortawesome/free-regular-svg-icons';
	import { faTicket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let { concert, isFirstElement, showTicketUrl = false }: { concert: Concert; isFirstElement: boolean; showTicketUrl?: boolean } = $props();
</script>

<div class="text-md relative grid grid-cols-2 py-2 sm:py-4 sm:text-xl md:text-2xl {isFirstElement ? 'border-t' : ''} border-b border-black">
	{#if concert.isSpecial}
		<div class="absolute inset-0 flex items-center justify-center">
			<span class="z-10 block bg-white p-1">
				<Fa icon={faStar} translateX=".04" class="text-yellow-600" size="xs" />
			</span>
		</div>
	{/if}

	<div class="pr-3 text-right sm:pr-6">
		<p class="uppercase">
			{concert.date.toLocaleString('en-US', { month: 'long', day: 'numeric' })}
		</p>
		<p class="uppercase">{concert.date.getFullYear()}</p>
	</div>

	<div class="border-l border-black pl-3 text-left sm:pl-6">
		<div class="grid grid-cols-[1fr_auto]">
			<div>
				<p class="whitespace-pre-line uppercase lg:whitespace-normal">
					{replaceEscapedNewlines(concert.name)}
				</p>
				<p class="whitespace-pre-line uppercase lg:whitespace-normal">{replaceEscapedNewlines(concert.location)}</p>
			</div>

			{#if true && concert.ticketUrl}
				<div class="flex items-center justify-center pr-4 sm:pr-8">
					<a
						href={concert.ticketUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center uppercase text-black hover:text-red-500"
						aria-label="Get Tickets"
					>
						<Fa icon={faTicket} /> <span class="ml-2 hidden xs:inline">Tickets</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
