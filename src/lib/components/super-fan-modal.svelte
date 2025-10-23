<script lang="ts" module>
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	export const turnstileSiteKey = PUBLIC_TURNSTILE_SITE_KEY;
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<script lang="ts">
	import { showNotification } from '$lib/helper/notification-helper';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { cspNonce, onClose }: { cspNonce: string; onClose: () => void } = $props();

	let name = $state('');
	let email = $state('');
	let streaming = $state('');
	let wantsUpdates = $state(true);
	let firstInput: HTMLInputElement | null = null;
	let submittedAttempt = $state(false);
	let isSubmitting = $state(false);

	let turnstileToken = $state<string | null>(null);
	let turnstileWidgetId = $state<string | null>(null);
	let turnstileContainer: HTMLDivElement;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const valid = $derived(name && email && streaming && emailRegex.test(email) && wantsUpdates);

	onMount(() => {
		if ((window as any).turnstile) {
			renderTurnstile();
		} else {
			const script = document.createElement('script');
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
			script.async = true;
			script.defer = true;
			script.nonce = cspNonce;
			(window as any).onTurnstileLoad = renderTurnstile;
			document.head.appendChild(script);
		}

		return () => {
			if (turnstileWidgetId) {
				(window as any).turnstile?.remove(turnstileWidgetId);
			}
		};
	});

	function renderTurnstile() {
		if (!turnstileContainer || !(window as any).turnstile) return;

		turnstileWidgetId = (window as any).turnstile.render(turnstileContainer, {
			sitekey: turnstileSiteKey,
			mode: 'invisible',
			callback: (token: string) => {
				turnstileToken = token;
			}
		});
	}

	function resetTurnstile() {
		if (turnstileWidgetId && (window as any).turnstile) {
			(window as any).turnstile.reset(turnstileWidgetId);
		}
	}

	$effect(() => {
		if (!valid) {
			turnstileToken = null;
			resetTurnstile();
		}
	});

	$effect(() => {
		if (turnstileToken && isSubmitting) {
			handleActualSubmit();
		}
	});

	function submit() {
		submittedAttempt = true;
		if (!valid || isSubmitting) return;

		isSubmitting = true;

		if (turnstileWidgetId && (window as any).turnstile) {
			(window as any).turnstile.reset(turnstileWidgetId);
			(window as any).turnstile.execute(turnstileWidgetId);
		} else {
			isSubmitting = false;
			showNotification('error', 'Verification widget not ready. Please wait a moment.');
		}
	}

	async function handleActualSubmit() {
		if (!turnstileToken) {
			isSubmitting = false;
			return;
		}

		try {
			const payload = { name, email, streaming, wantsUpdates, turnstileToken };
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
			turnstileToken = null;
			resetTurnstile();
		} finally {
			isSubmitting = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') onClose();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
	onclick={onClose}
	onkeydown={handleKeydown}
	role="dialog"
	transition:fade
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
			<h2 class="mb-4 text-center text-xl font-bold">We love our fans!</h2>

			<label class="block text-sm font-medium text-gray-700">
				First Name
				<input
					id="firstName"
					autocomplete="given-name"
					bind:this={firstInput}
					type="text"
					bind:value={name}
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					class:border-red-500={submittedAttempt && !name}
				/>
			</label>

			<label class="mt-4 block text-sm font-medium text-gray-700">
				Email
				<input
					id="email"
					autocomplete="email"
					type="email"
					bind:value={email}
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					class:border-red-500={submittedAttempt && !emailRegex.test(email)}
				/>
			</label>

			<label class="mt-4 block text-sm font-medium text-gray-700">
				Preferred streaming service
				<select
					bind:value={streaming}
					required
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					class:border-red-500={submittedAttempt && !streaming}
				>
					<option value="" disabled>Select…</option>
					<option>Spotify</option>
					<option>Apple Music</option>
					<option>YouTube Music</option>
					<option>Deezer</option>
					<option>Other</option>
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
					<label for="updates" class="font-medium text-gray-700"> I want to receive updates about upcoming shows and new releases</label>
				</div>
			</div>

			<p class="mt-4 text-xs text-gray-500">Your data is processed in compliance with GDPR. We value your privacy and will never share your infos!</p>

			<div bind:this={turnstileContainer} data-appearance="interaction-only" class="mx-auto my-4 w-max"></div>

			<div class="mt-6 flex justify-end gap-3">
				<button type="button" class="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800" onclick={onClose}>Cancel</button>
				<button
					type="submit"
					class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
					disabled={!valid || isSubmitting}
				>
					{isSubmitting ? 'Verifying...' : 'Join'}
				</button>
			</div>
		</form>
	</div>
</div>
