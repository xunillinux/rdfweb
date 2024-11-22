<script lang="ts">
	let { message = 'Notification', type = 'success', duration = 3000 }: { message: string; type: 'success' | 'error'; duration: number } = $props();

	let visible = $state(true);

	// Auto-hide after `duration`
	setTimeout(() => {
		visible = false;
	}, duration);
</script>

{#if visible}
	<div
		class="fixed right-4 top-4 z-50 max-w-sm rounded-lg p-4 text-sm text-white shadow-lg md:text-base"
		class:bg-green-500={type === 'success'}
		class:bg-red-500={type === 'error'}
		class:border-green-700={type === 'success'}
		class:border-red-700={type === 'error'}
		role="alert"
	>
		<p>{message}</p>
	</div>
{/if}
