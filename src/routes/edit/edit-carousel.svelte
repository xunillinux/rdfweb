<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import type { Images } from '$lib/model/rdf-data-model';

	let { headerImages, onHeaderImagesChange }: { headerImages: Images; onHeaderImagesChange: any } = $props();

	let carouselData = $state(JSON.parse(JSON.stringify(headerImages)) as Images);

	async function onConfirm() {
		// TODO
	}

	function onClose() {
		// TODO
	}
</script>

<ModalBtn title="Edit Images" btnText="Edit Images" {onConfirm} {onClose}>
	<div class="py-1">
		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>Portrait</span>
		</h2>

		TODO

		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>Landscape</span>
		</h2>
	</div>
</ModalBtn>
