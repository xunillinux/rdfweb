<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { getCacheBusterToken } from '$lib/helper/cache-buster-helper';
	import type { Member } from '$lib/model/rdf-data-model';
	import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
	import { uploadR2File } from '../api/r2-upload/r2-upload';
	import { r2bucketEndpoint } from '$lib/config';

	let { members, onMembersDataChange }: { members: Member[]; onMembersDataChange: any } = $props();

	let membersData = $state(JSON.parse(JSON.stringify(members)) as Member[]);

	let previewFiles: Map<number, { file: File; previewUrl: string }> = $state(new Map());

	async function onConfirm() {
		try {
			if (previewFiles?.size > 0) {
				for (const [key, previewFile] of previewFiles.entries()) {
					const uploadedUrl = await handleUpload(previewFile.file);
					const cacheBuster = getCacheBusterToken();
					members[key].image = uploadedUrl + cacheBuster;
				}
			}
			onMembersDataChange(membersData);
		} catch (error) {
			console.error('Error in onConfirm:', error);
		} finally {
			previewFiles = new Map();
		}
	}

	function onClose() {
		previewFiles = new Map();
		membersData = JSON.parse(JSON.stringify(members)) as Member[];
	}

	function onFileChange(event: Event, index: number) {
		const input = event.target as HTMLInputElement;

		const file = input.files?.[0];

		if (file) {
			previewFiles.set(index, { file, previewUrl: URL.createObjectURL(file) });
			membersData[index].image = previewFiles.get(index)?.previewUrl ?? '';
		}
	}

	async function handleUpload(file: File, fileName?: string): Promise<string | null> {
		try {
			if (!file) {
				throw new Error('No file selected');
			}

			const uploadedUrl = await uploadR2File(file, 'FeatureImage.png');

			console.log('File uploaded successfully:', uploadedUrl);
			return uploadedUrl;
		} catch (error) {
			console.error('Error uploading file. Please try again.', error);
			return null;
		}
	}
</script>

<ModalBtn title="Edit Members" btnText="Edit" btnFaIcon={faPenToSquare} {onConfirm} {onClose}>
	<div class="py-1">
		{#each members as member, index}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<input
					id="member-name-{index}"
					name="member-name-{index}"
					type="text"
					bind:value={member.name}
					class="w-full rounded border p-2"
					required
					placeholder="Name"
				/>
				<input
					id="member-role-{index}"
					name="member-role-{index}"
					type="text"
					bind:value={member.role}
					class="w-full rounded border p-2"
					required
					placeholder="Role"
				/>
			</div>

			<div class="py-4">
				<img
					src={previewFiles.get(index)?.previewUrl ?? r2bucketEndpoint + membersData[index].image}
					alt="photoURL"
					width="256"
					height="256"
					class="mx-auto mb-4 rounded-lg shadow-md sm:mx-0"
				/>
				<label
					for="file-upload"
					class="mx-auto block w-[256px] rounded border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 sm:mx-0"
				>
					Select Image
					<input
						id="file-upload-{index}"
						onchange={(event) => onFileChange(event, index)}
						name="photoURL"
						type="file"
						class="hidden"
						accept="image/png, image/jpeg, image/webp"
					/>
				</label>
			</div>
		{/each}
	</div>
</ModalBtn>
