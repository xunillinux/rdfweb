<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import type { Member } from '$lib/model/rdf-data-model';
	import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

	let { members, onMembersDataChange }: { members: Member[]; onMembersDataChange: any } = $props();

	let membersData = $state(JSON.parse(JSON.stringify(members)) as Member[]);

	async function onConfirm() {
		// TODO
	}

	function onClose() {
		// TODO
	}
</script>

<ModalBtn title="Edit Members" btnText="Edit" btnFaIcon={faPenToSquare} {onConfirm} {onClose}>
	<div class="py-1">
		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>Member 1</span>
		</h2>

		TODO

		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>Member 2</span>
		</h2>

		TODO

		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>Member 3</span>
		</h2>

		TODO

		<h2 class="my-4 flex items-center text-lg font-bold">
			<span>Member 4</span>
		</h2>

		TODO
	</div>
</ModalBtn>
