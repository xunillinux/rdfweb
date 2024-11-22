<script lang="ts">
	import Portal from 'svelte-portal';

	let {
		title,
		btnText,
		confirmBtnText = 'Save',
		cancelBtnText = 'Cancel',
		onConfirm,
		children
	}: { title: string; btnText: string; confirmBtnText?: string; cancelBtnText?: string; onConfirm: any; children: any } = $props();

	let isOpen = $state(false);

	function openModal() {
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
	}
</script>

<!-- Trigger Button -->
<button class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" onclick={openModal}>
	{btnText}
</button>

<!-- Modal -->
{#if isOpen}
	<Portal>
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div class="h-5/6 w-11/12 max-w-4xl overflow-y-auto rounded-lg bg-white p-8 shadow-2xl">
				<h2 class="mb-4 text-2xl font-bold">{title}</h2>

				<!-- Slot for Modal Body -->
				<div class="mb-6 space-y-4">
					{@render children()}
				</div>

				<!-- Footer Buttons -->
				<div class="flex justify-end space-x-4">
					<button class="rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300" onclick={closeModal}>
						{cancelBtnText}
					</button>
					<button
						class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
						onclick={() => {
							onConfirm();
							closeModal();
						}}
					>
						{confirmBtnText}
					</button>
				</div>
			</div>
		</div>
	</Portal>
{/if}
