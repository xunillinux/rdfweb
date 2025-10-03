<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { r2bucketEndpoint } from '$lib/config';
	import { getCacheBusterToken, removeCacheBusterToken } from '$lib/helper/cache-buster-helper';
	import { ImageCategory, type HeaderImage } from '$lib/model/rdf-data-model';
	import { faPenToSquare, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { v4 as uuidv4 } from 'uuid';
	import { deleteR2File } from '../api/r2-delete/r2-delete';
	import { uploadR2File } from '../api/r2-upload/r2-upload';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	let { headerImages, onHeaderImagesChange }: { headerImages: HeaderImage[]; onHeaderImagesChange: (images: HeaderImage[]) => void } = $props();

	let headerImagesData = $state([...headerImages]);

	let newImages = $state<{ file: File; category: ImageCategory; previewUrl: string }[]>([]);

	let selectedImage: { src: string } | null = $state(null);

	let imagesToDelete: string[] = $state([]);

	let isSaving = $state(false);
	let isDeletingImages = $state(false);
	let isUploadingImages = $state(false);

	const spinnerText = $derived.by(() => {
		if (isDeletingImages) return 'Deleting Images...';
		if (isUploadingImages) return 'Compressing and uploading images...';
		return 'Saving Changes...';
	});

	// Handle file selection and categorize images
	function handleFileSelection(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			for (const file of input.files) {
				const img = new Image();
				const objectUrl = URL.createObjectURL(file);
				img.onload = () => {
					const category = img.width > img.height ? ImageCategory.Landscape : ImageCategory.Portrait;
					newImages.push({ file, category, previewUrl: objectUrl });
				};
				img.src = objectUrl;
			}
		}
	}

	function removeExistingImage(index: number) {
		const deletedImage = headerImagesData.splice(index, 1);
		imagesToDelete.push(deletedImage[0].src);
	}

	function removeNewImage(index: number) {
		newImages.splice(index, 1);
	}

	function viewImage(src: string) {
		selectedImage = { src };
	}

	// Confirm and upload images
	async function onConfirm() {
		try {
			isSaving = true;

			// Delete old images
			for (const fileName of imagesToDelete) {
				isDeletingImages = true;
				await deleteR2File(removeCacheBusterToken(fileName));
			}
			isDeletingImages = false;

			// Upload new images
			for (const { file, category } of newImages) {
				isUploadingImages = true;
				const uniqueFileName = `HeaderImage_${uuidv4()}.webp`;
				const uploadedUrl = await uploadR2File(file, uniqueFileName);
				const cacheBuster = getCacheBusterToken();
				headerImagesData.push({ src: uploadedUrl + cacheBuster, category });
			}
			isUploadingImages = false;

			onHeaderImagesChange(headerImagesData);
		} catch (error) {
			console.error('Error updating images:', error);
		} finally {
			resetState();
		}
	}

	function onClose() {
		resetState();
	}

	function resetState() {
		headerImagesData = [...headerImages];
		newImages = [];
		imagesToDelete = [];
		selectedImage = null;
		isSaving = false;
		isDeletingImages = false;
		isUploadingImages = false;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<ModalBtn title="Edit Images" btnText="Edit" btnFaIcon={faPenToSquare} {onConfirm} {onClose} {isSaving}>
	{#if !isSaving}
		<div class="py-1">
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{#each headerImagesData as image, index}
					<div class="relative">
						<img
							src={r2bucketEndpoint + '/' + image.src}
							alt="Landscape"
							class="h-32 w-full cursor-pointer object-cover"
							onclick={() => viewImage(r2bucketEndpoint + image.src)}
						/>
						<button class="absolute right-1 top-1 rounded bg-red-500 p-2 text-white" onclick={() => removeExistingImage(index)}>
							<Fa icon={faTrash} />
						</button>
					</div>
				{/each}
				{#each newImages as { previewUrl }, index}
					<div class="relative">
						<img src={previewUrl} alt="New Landscape" class="h-32 w-full cursor-pointer object-cover" onclick={() => viewImage(previewUrl)} />

						<button class="absolute right-1 top-1 rounded bg-red-500 p-2 text-white" onclick={() => removeNewImage(index)}>
							<Fa icon={faTrash} />
						</button>
					</div>
				{/each}
			</div>
			{#if (headerImagesData?.length ?? 0) === 0 && (newImages?.length ?? 0) === 0}
				<p>There are currently no images selected.</p>
			{/if}

			<!-- Image Upload Section -->
			<div class="mb-4 mt-6">
				<label
					for="file-upload"
					class="mx-auto block w-[256px] rounded border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300 sm:mx-0"
				>
					Select Images
					<input
						id="file-upload"
						onchange={handleFileSelection}
						name="photoURL"
						type="file"
						multiple
						class="hidden"
						accept="image/png, image/jpeg, image/webp"
					/>
				</label>
			</div>

			<!-- Full-Size Image Modal -->
			{#if selectedImage}
				<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4" onclick={() => (selectedImage = null)}>
					<div class="relative rounded-lg bg-white p-4 shadow-lg">
						<img src={selectedImage.src} alt="Selected" class="max-h-[80vh] max-w-full rounded" />
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<LoadingSpinner text={spinnerText} />
	{/if}
</ModalBtn>
