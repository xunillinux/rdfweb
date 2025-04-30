<script lang="ts">
	const size = 30;
	const color = 'currentColor';
</script>

<div class="icon-wrapper" style="width: {size}px; height: {size}px; color: {color};">
	<slot />
</div>

<style>
	@keyframes iconBounce {
		0% {
			transform: scale(1) rotate(0deg);
		}
		30% {
			transform: scale(1.15) rotate(3deg);
		}
		60% {
			transform: scale(0.97) rotate(-2deg);
		}
		100% {
			transform: scale(1.05) rotate(1deg);
		}
	}

	.icon-wrapper {
		display: inline-block;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.icon-wrapper:hover {
		animation: iconBounce 0.5s ease forwards;
	}
</style>
