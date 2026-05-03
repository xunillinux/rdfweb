<script lang="ts">
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';

	let expanded = $state(true);
	const ANIM_DURATION = 1200;

	let isVisible = $state(false);

	$effect(() => {
		const timer = setTimeout(() => {
			isVisible = true;
		}, 1500);
		return () => clearTimeout(timer);
	});

	export function onFooterVisible(isIntersecting: boolean) {
		if (!isVisible) return;
		expanded = !isIntersecting;
	}

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('open');
	}
</script>

{#if isVisible}
	<div class="container" class:expanded>
		<button
			class="button {expanded ? 'expanded' : 'collapsed'}"
			onclick={handleClick}
			style="--anim-duration:{ANIM_DURATION}ms"
			aria-label="Join our fanbase"
		>
			<Fa icon={faHeart} />
			{#if expanded}
				<span class="label">Join our fanbase</span>
			{/if}
		</button>
	</div>
{/if}

<style>
	.container {
		position: fixed;
		bottom: 0.75rem;
		right: 0.6rem;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		pointer-events: none;
		transition: transform 0.6s ease;
	}

	.button {
		background: #ffffff;
		color: rgb(34, 32, 32);
		border: none;
		outline: none;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: auto;
		cursor: pointer;
		transition:
			width 0.6s ease,
			height 0.6s ease,
			border-radius 0.6s ease,
			background 0.3s ease,
			transform 0.3s ease,
			opacity 0.4s ease,
			padding 0.6s ease;
		animation: popIn var(--anim-duration) ease forwards;
		overflow: hidden;
	}

	.button:hover {
		opacity: 1;
		transform: scale(1.05);
	}

	.expanded {
		width: 250px;
		height: 48px;
		border-radius: 30px;
		font-size: 1rem;
		gap: 0.5rem;
		padding: 0 1.2rem;
		opacity: 1;
	}

	.collapsed {
		width: 48px;
		height: 48px;
		border-radius: 28px;
		border: 1px solid rgba(0, 0, 0, 0.091);
		font-size: 1.4rem;
		padding: 0;
		opacity: 1;
	}

	.label {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		transition:
			opacity 0.3s ease,
			width 0.5s ease;
	}

	.collapsed .label {
		opacity: 0;
		width: 0;
	}

	@keyframes popIn {
		0% {
			transform: scale(0.95);
			opacity: 0;
		}
		80% {
			transform: scale(1.02);
		}
		100% {
			transform: scale(1);
			opacity: 0.9;
		}
	}

	@media (max-width: 768px) {
		.container.expanded {
			transform: translateX(calc(-50vw + 125px + 0.6rem));
		}
	}
</style>
