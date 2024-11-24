<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { replaceNewlinesWithSpace } from '$lib/helper/format-helper';
	import { faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { Link } from '$lib/model/rdf-data-model';

	let { links, onLinksDataChange }: { links: Link[]; onLinksDataChange: any } = $props();

	let linksData = $state([...links]);

	let newLink = $state({ text: '', href: '' });

	// Add new link to the beginning of the array
	function addLink(event: Event) {
		event.preventDefault();
		linksData.unshift({ ...newLink });
		newLink = { text: '', href: '' };
	}

	// Delete a link
	function deleteLink(index: number) {
		linksData.splice(index, 1);
	}

	// Move link up
	function moveLinkUp(index: number) {
		if (index > 0) {
			const temp = linksData[index];
			linksData[index] = linksData[index - 1];
			linksData[index - 1] = temp;
		}
	}

	// Move link down
	function moveLinkDown(index: number) {
		if (index < linksData.length - 1) {
			const temp = linksData[index];
			linksData[index] = linksData[index + 1];
			linksData[index + 1] = temp;
		}
	}

	function onConfirm() {
		onLinksDataChange(linksData);
		linksData = [...links];
	}

	function onClose() {
		newLink = { text: '', href: '' };
		linksData = [...links];
	}
</script>

<ModalBtn title="Edit Links" btnText="Edit Links" {onConfirm} {onClose}>
	<div class="p-4">
		<h2 class="mb-4 text-lg font-bold">Add New Link</h2>

		<!-- Form for adding new links -->
		<form onsubmit={addLink} class="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
			<input id="link-text" name="link-text" type="text" bind:value={newLink.text} class="w-full rounded border p-2" required placeholder="Text" />
			<input id="link-href" name="link-href" type="text" bind:value={newLink.href} class="w-full rounded border p-2" required placeholder="Href" />
			<button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Add Link</button>
		</form>

		<h2 class="mb-4 mt-8 text-lg font-bold">Links</h2>

		<!-- List of existing links -->
		<ul class="space-y-4">
			{#each linksData as link, index}
				<li class="flex items-center justify-between rounded border p-4">
					<div>
						<p>
							<strong class="text-lg">{link.text}</strong> -
							<a href={link.href} class="text-lg text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Link</a>
						</p>
					</div>
					<div class="flex space-x-2">
						<button
							disabled={index === 0}
							onclick={() => moveLinkUp(index)}
							class="rounded bg-gray-500 px-3 py-3 text-white hover:bg-gray-600 disabled:bg-gray-300"
						>
							<Fa icon={faChevronUp} />
						</button>

						<button
							disabled={index === linksData.length - 1}
							onclick={() => moveLinkDown(index)}
							class="rounded bg-gray-500 px-3 py-3 text-white hover:bg-gray-600 disabled:bg-gray-300"
						>
							<Fa icon={faChevronDown} />
						</button>

						<button onclick={() => deleteLink(index)} class="rounded bg-red-500 px-3 py-3 text-white hover:bg-red-600">
							<Fa icon={faTrash} />
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</ModalBtn>
