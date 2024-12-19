<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { getCacheBusterToken } from '$lib/helper/cache-buster-helper';
	import type { Member } from '$lib/model/rdf-data-model';
	import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
	import { uploadR2File } from '../api/r2-upload/r2-upload';
	import { r2bucketEndpoint } from '$lib/config';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	let { members, onMembersDataChange }: { members: Member[]; onMembersDataChange: any } = $props();

	let membersData = $state(JSON.parse(JSON.stringify(members)) as Member[]);

	let previewFiles: Map<number, { file: File; previewUrl: string }> = $state(new Map());

	let isSaving = $state(false);
	let isUploadingImages = $state(false);

	const spinnerText = $derived.by(() => {
		if (isUploadingImages) return 'Compressing and uploading image...';
		return 'Saving Changes...';
	});

	async function onConfirm() {
		try {
			isSaving = true;

			if (previewFiles?.size > 0) {
				isUploadingImages = true;
				for (const [key, previewFile] of previewFiles.entries()) {
					const uploadedUrl = await handleUpload(previewFile.file, `MembersImage_${key}.webp`);
					const cacheBuster = getCacheBusterToken();
					membersData[key].image = uploadedUrl + cacheBuster;
					console.log(membersData[key].image);
				}
				isUploadingImages = false;
			}
			onMembersDataChange(membersData);
		} catch (error) {
			console.error('Error in onConfirm:', error);
		} finally {
			resetState();
		}
	}

	function onClose() {
		resetState();
	}

	function resetState() {
		membersData = JSON.parse(JSON.stringify(members)) as Member[];
		previewFiles = new Map();
		isSaving = false;
		isUploadingImages = false;
	}

	function onFileChange(event: Event, index: number) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			const oldFile = previewFiles.get(index);
			if (oldFile) {
				URL.revokeObjectURL(oldFile.previewUrl);
			}

			const previewUrl = URL.createObjectURL(file);
			previewFiles.set(index, { file, previewUrl });
			previewFiles = new Map(previewFiles);

			membersData[index].image = previewUrl;
		}
	}

	async function handleUpload(file: File, fileName: string): Promise<string | null> {
		try {
			if (!file) {
				throw new Error('No file selected');
			}

			const uploadedUrl = await uploadR2File(file, fileName);

			console.log('File uploaded successfully:', uploadedUrl);
			return uploadedUrl;
		} catch (error) {
			console.error('Error uploading file. Please try again.', error);
			return null;
		}
	}
</script>

<ModalBtn title="Edit Members" btnText="Edit" btnFaIcon={faPenToSquare} {onConfirm} {onClose} {isSaving}>
	{#if !isSaving}
		<div class="py-1">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each membersData as member, index}
					<div class="rounded-lg border p-4">
						<!-- Member Name and Role -->
						<div class="grid grid-cols-1 gap-4">
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

						<!-- Member Image -->
						<div class="py-4">
							<img
								src={previewFiles.get(index)?.previewUrl ?? r2bucketEndpoint + membersData[index].image}
								alt="photoURL"
								width="256"
								height="256"
								class="mx-auto mb-4 rounded-lg shadow-md sm:mx-0"
							/>
							<label
								for="file-upload-{index}"
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
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<LoadingSpinner text={spinnerText} />
	{/if}
</ModalBtn>
