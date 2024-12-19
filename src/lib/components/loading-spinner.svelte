<script lang="ts">
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let { text = 'Loading...' }: { text?: string } = $props();
</script>

<div class="flex flex-col items-center justify-center space-y-4 py-10">
	<Fa icon={faSpinner} class="animate-spin text-gray-400" size="3x" />
	<p class="text-lg font-medium text-gray-700">{text}</p>
</div>
