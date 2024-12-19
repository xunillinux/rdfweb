<script lang="ts">
	import { onMount } from 'svelte';

	let {
		onSubmit,
		onClose
	}: {
		onSubmit: (url: string) => void;
		onClose: () => void;
	} = $props();

	let url = $state('');
	let inputElement: HTMLInputElement | null = null;

	function handleSubmit() {
		onSubmit(url);
		onClose();
	}

	function handleCancel() {
		onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		} else if (event.key === 'Escape') {
			handleCancel();
		}
	}

	onMount(() => {
		if (inputElement) {
			inputElement.focus();
		}
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<!-- Modal Structure -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onclick={handleCancel} onkeydown={handleKeydown} tabindex="0">
	<div class="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg" onclick={(event) => event.stopPropagation()}>
		<h2 class="mb-4 text-lg font-semibold">Insert Link</h2>
		<input
			bind:this={inputElement}
			type="url"
			bind:value={url}
			placeholder="https://example.com"
			class="mb-4 w-full rounded border border-gray-300 px-3 py-2"
		/>
		<div class="flex justify-end gap-2">
			<button class="rounded bg-gray-300 px-4 py-2" onclick={handleCancel}>Cancel</button>
			<button class="rounded bg-blue-500 px-4 py-2 text-white" onclick={handleSubmit}>Insert</button>
		</div>
	</div>
</div>
