<script lang="ts">
	interface Props {
		isOpen: boolean;
	}

	let { isOpen }: Props = $props();

	// Fixed values
	const size = 26;
	const color = 'currentColor';
	const strokeWidth = 3.5;
</script>

<svg
	class="burger-icon"
	class:open={isOpen}
	viewBox="0 0 32 32"
	width={size}
	height={size}
	stroke={color}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	fill="none"
>
	<line class="line top" x1="4" y1="8" x2="28" y2="8" />
	<line class="line middle" x1="4" y1="16" x2="28" y2="16" />
	<line class="line bottom" x1="4" y1="24" x2="28" y2="24" />
</svg>

<style>
	.burger-icon .line {
		transition:
			transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55),
			opacity 0.3s ease-in-out;
		transform-origin: center center;
		transform-box: fill-box;
	}

	.burger-icon.open .top {
		transform: translateY(8px) rotate(-45deg);
	}

	.burger-icon.open .middle {
		opacity: 0;
		transform: scaleX(0);
	}

	.burger-icon.open .bottom {
		transform: translateY(-8px) rotate(45deg);
	}
</style>
