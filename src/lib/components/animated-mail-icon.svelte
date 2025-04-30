<script lang="ts">
	interface Props {
		isOpen: boolean;
	}

	let { isOpen }: Props = $props();

	const width = 42; // Enough room for envelope and dashes
	const height = 32;
	const strokeWidth = 3.5;
	const color = 'currentColor';
</script>

<svg
	{width}
	{height}
	viewBox="0 0 42 32"
	fill="none"
	stroke={color}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="mail-icon mt-1"
>
	<!-- Animated "send" lines -->
	{#if isOpen}
		<line class="dash dash1" x1="4" x2="8" y1="10" y2="10" />
		<line class="dash dash2" x1="2" x2="8" y1="16" y2="16" />
		<line class="dash dash3" x1="0" x2="8" y1="22" y2="22" />
	{/if}

	<!-- Envelope group that shifts inside SVG -->
	<g class:shifted={isOpen}>
		<rect x="12" y="6" width="24" height="20" rx="2" />
		<path d="M12 10 L24 18 L36 10" />
	</g>
</svg>

<style>
	.mail-icon {
		cursor: pointer;
		display: block;
		overflow: visible;
	}

	/* Animated dashes */
	.dash {
		stroke: currentColor;
		stroke-width: 2;
		opacity: 0;
		transform: translateX(-6px);
		animation: dashIn 0.3s ease-out forwards;
	}

	.dash1 {
		animation-delay: 0s;
	}
	.dash2 {
		animation-delay: 0.05s;
	}
	.dash3 {
		animation-delay: 0.1s;
	}

	@keyframes dashIn {
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	/* Envelope shift inside SVG */
	g {
		transition: transform 0.3s ease;
	}
	g.shifted {
		transform: translateX(2px); /* subtle shift */
	}
</style>
