<script lang="ts">
	import { showNotification } from '$lib/helper/notification-helper';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { onClose }: { onClose: () => void } = $props();

	let name = $state('');
	let email = $state('');
	let streaming = $state('');
	let wantsUpdates = $state(false);
	let firstInput: HTMLInputElement | null = null;
	let submittedAttempt = $state(false);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const valid = $derived(name && email && streaming && emailRegex.test(email) && wantsUpdates);

	async function submit() {
		submittedAttempt = true;
		if (!valid) return;

		try {
			const payload = { name, email, streaming, wantsUpdates };
			const res = await fetch('/api/fandata', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!res.ok) throw new Error(await res.text());

			showNotification('success', "Thanks! We'll keep you posted.");
			onClose();
		} catch (e) {
			console.error(e);
			showNotification('error', 'Something went wrong - try again later.');
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') onClose();
	}

	onMount(() => {
		firstInput?.focus();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
	onclick={onClose}
	onkeydown={handleKeydown}
	tabindex="-1"
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialog-title"
	transition:fade={{ duration: 200 }}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mx-3 w-full max-w-md rounded-lg bg-white p-6 shadow-lg" onclick={(event) => event.stopPropagation()}>
		<form
			onsubmit={(event) => {
				event.preventDefault();
				submit();
			}}
		>
			<h2 id="dialog-title" class="mb-4 text-center text-xl font-bold">We love our fans!</h2>
			<label class="block text-sm font-medium text-gray-700">
				First Name
				<input
					bind:this={firstInput}
					type="text"
					bind:value={name}
					placeholder="Your name"
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					class:border-red-500={submittedAttempt && !name}
				/>
			</label>
			<label class="mt-4 block text-sm font-medium text-gray-700">
				Email
				<input
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					class:border-red-500={submittedAttempt && !emailRegex.test(email)}
				/>
			</label>
			<label class="mt-4 block text-sm font-medium text-gray-700">
				Preferred streaming service         <select
					bind:value={streaming}
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					class:border-red-500={submittedAttempt && !streaming}
				>
					<option value="" disabled>Select…</option> <option>Spotify</option> <option>Apple Music</option> <option>YouTube Music</option>
					<option>Deezer</option> <option>Other</option>
				</select>
			</label>
			<div class="mt-4 flex items-start">
				<div class="flex h-5 items-center">
					<input
						id="updates"
						type="checkbox"
						bind:checked={wantsUpdates}
						class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
				</div>
				<div class="ml-3 text-sm">
					<label for="updates" class="font-medium text-gray-700" class:text-red-600={submittedAttempt && !wantsUpdates}>
						I want to receive updates about upcoming shows and new releases
					</label>
				</div>
			</div>
			<p class="mt-4 text-xs text-gray-500">
				Your data is processed in compliance with GDPR. We respect your privacy and will never share your information.
			</p>
			<div class="mt-6 flex justify-end gap-3">
				<button type="button" class="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300" onclick={onClose}>
					Cancel
				</button>
				<button
					type="submit"
					class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
					class:opacity-50={!valid}
				>
					Join
				</button>
			</div>
		</form>
	</div>
</div>
