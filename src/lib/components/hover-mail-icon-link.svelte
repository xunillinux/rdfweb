<script lang="ts">
	import AnimatedMailIcon from '$lib/components/animated-mail-icon.svelte';
	let { text }: { text: string } = $props();

	let isHovered = $state(false);
</script>

<a
	href={'mailto:' + text}
	class="flex items-center space-x-2 text-4xl font-bold uppercase hover:underline sm:text-3xl"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<AnimatedMailIcon isOpen={isHovered} />
	<span>{text}</span>
</a>
