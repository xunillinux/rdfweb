<script lang="ts">
	import '../app.css';
	import Fa from 'svelte-fa';
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';

	let { children } = $props();
</script>

<header class="bg-white">
	<nav class="container mx-auto px-6 py-3">
		<div class="flex items-center justify-between">
			<!-- Hide "Robot Dog Funeral" text on xs, show on sm and up -->
			<a href="#" class="hidden text-2xl font-bold text-gray-800 sm:block">Robot Dog Funeral</a>
			<div class="flex space-x-4">
				<a href="#" class="text-gray-800">Listen</a>
				<a href="#" class="text-gray-800">See</a>
				<a href="#" class="text-gray-800">About</a>
				<a href="#" class="text-gray-800">Contact</a>
				<a href="#" class="text-gray-800">
					<!-- Instagram Icon (assuming Fa is a component) -->
					<Fa icon={faInstagram} scale={1.4} translateY={0.3} />
				</a>
			</div>
		</div>
	</nav>
</header>

{@render children()}
