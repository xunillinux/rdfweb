<script lang="ts">
	import Portal from 'svelte-portal';
	import { faTimes, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let {
		title,
		btnText,
		btnFaIcon,
		confirmBtnText = 'Save',
		cancelBtnText = 'Cancel',
		onConfirm,
		onClose,
		isSaving,
		children
	}: {
		title: string;
		btnText?: string;
		btnFaIcon?: IconDefinition;
		confirmBtnText?: string;
		cancelBtnText?: string;
		onConfirm: any;
		onClose: any;
		isSaving?: boolean;
		children: any;
	} = $props();

	let isOpen = $state(false);

	function openModal() {
		isOpen = true;
	}

	function closeModal() {
		onClose();
		isOpen = false;
	}
</script>

<!-- Trigger Button -->
<button
	class={`flex items-center rounded bg-green-500 text-white hover:bg-green-600 ${btnText ? 'px-4 py-2' : 'h-10 w-10 justify-center'}`}
	onclick={openModal}
>
	{#if btnFaIcon}
		<Fa icon={btnFaIcon} />
	{/if}
	{#if btnText}
		<span class={btnFaIcon ? 'ml-2' : ''}>{btnText}</span>
	{/if}
</button>

<!-- Modal -->
{#if isOpen}
	<Portal>
		<!-- Greyed-out background with click listener -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onclick={() => {
				if (!isSaving) closeModal();
			}}
		>
			<!-- Modal content with event propagation stopped -->
			<div
				class="w-11/12 max-w-4xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl sm:p-8"
				style="max-height: 90vh;"
				onclick={(event) => event.stopPropagation()}
			>
				<!-- Title with Close Button -->
				<div class="mb-3 flex items-center justify-between sm:mb-4">
					<h2 class="text-2xl font-bold">{title}</h2>
					<button
						class="-m-2 p-2 text-gray-500 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
						aria-label="Close Modal"
						onclick={closeModal}
						disabled={isSaving}
					>
						<Fa icon={faTimes} scale={1.4} />
					</button>
				</div>

				<!-- Slot for Modal Body -->
				<div class="mb-6 space-y-2 sm:space-y-4">
					{@render children()}
				</div>

				<!-- Footer Buttons -->
				<div class="flex justify-end space-x-4">
					<button
						class="rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
						onclick={closeModal}
						disabled={isSaving}
					>
						{cancelBtnText}
					</button>

					<button
						class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
						onclick={async () => {
							await onConfirm();
							closeModal();
						}}
						disabled={isSaving}
					>
						{confirmBtnText}
					</button>
				</div>
			</div>
		</div>
	</Portal>
{/if}
