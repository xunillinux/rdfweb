<script lang="ts">
	import ModalBtn from '$lib/components/modal-btn.svelte';
	import { r2bucketEndpoint } from '$lib/config';
	import type { Feature } from '$lib/model/rdf-data-model';
	import { faChevronDown, faChevronUp, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { uploadR2File } from '../api/r2-upload/r2-upload';
	import { getCacheBusterToken } from '$lib/helper/cache-buster-helper';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';

	let { feature, onFeatureDataChange }: { feature: Feature; onFeatureDataChange: any } = $props();

	let featureData = $state(JSON.parse(JSON.stringify(feature)) as Feature);

	let featureHeadingCollapsed = $state(false);
	let featureImageCollapsed = $state(false);
	let featureLinksCollapsed = $state(true);
	let featureVideoCollapsed = $state(true);

	let newLink = $state({ text: '', href: '' });

	let files: any = $state(null);
	let file: File = $derived(files?.length > 0 ? files[0] : null);

	let previewImageUrl: string | null = $state(null);

	let isSaving = $state(false);
	let isUploadingImages = $state(false);

	const spinnerText = $derived.by(() => {
		if (isUploadingImages) return 'Compressing and uploading image...';
		return 'Saving Changes...';
	});

	async function onConfirm() {
		try {
			isSaving = true;

			if (file) {
				isUploadingImages = true;
				const uploadedUrl = await handleUpload();
				const cacheBuster = getCacheBusterToken();
				featureData.image = uploadedUrl + cacheBuster;
				isUploadingImages = false;
			}

			onFeatureDataChange(featureData);
		} catch (error) {
			console.error('Error in onConfirm:', error);
		} finally {
			resetState();
		}
	}

	function onClose() {
		resetState();
	}

	function previewImage() {
		previewImageUrl = URL.createObjectURL(file);
		featureData.image = previewImageUrl;
	}

	function resetState() {
		isSaving = false;
		isUploadingImages = false;
		featureHeadingCollapsed = false;
		featureImageCollapsed = false;
		featureLinksCollapsed = true;
		featureVideoCollapsed = true;
		previewImageUrl = null;
		files = null;
		featureData = JSON.parse(JSON.stringify(feature)) as Feature;
	}

	async function handleUpload(): Promise<string | null> {
		try {
			if (!file) {
				throw new Error('No file selected');
			}

			const uploadedUrl = await uploadR2File(file, 'FeatureImage.webp');

			return uploadedUrl;
		} catch (error) {
			console.error('Error uploading file. Please try again.', error);
			return null;
		}
	}

	// Add new link to the beginning of the array
	function addLink(event: Event) {
		event.preventDefault();
		featureData.featureLinks.unshift({ ...newLink });
		newLink = { text: '', href: '' };
	}

	// Delete a link
	function deleteLink(index: number) {
		featureData.featureLinks.splice(index, 1);
	}

	// Move link up
	function moveLinkUp(index: number) {
		if (index > 0) {
			const temp = featureData.featureLinks[index];
			featureData.featureLinks[index] = featureData.featureLinks[index - 1];
			featureData.featureLinks[index - 1] = temp;
		}
	}

	// Move link down
	function moveLinkDown(index: number) {
		if (index < featureData.featureLinks.length - 1) {
			const temp = featureData.featureLinks[index];
			featureData.featureLinks[index] = featureData.featureLinks[index + 1];
			featureData.featureLinks[index + 1] = temp;
		}
	}

	function toggleFeatureHeadingCollapsed() {
		featureHeadingCollapsed = !featureHeadingCollapsed;
	}

	function toggleFeatureImageCollapsed() {
		featureImageCollapsed = !featureImageCollapsed;
	}

	function toggleFeatureLinksCollapsed() {
		featureLinksCollapsed = !featureLinksCollapsed;
	}

	function toggleFeatureVideoCollapsed() {
		featureVideoCollapsed = !featureVideoCollapsed;
	}
</script>

<ModalBtn title="Edit Feature" btnText="Edit" btnFaIcon={faPenToSquare} {onConfirm} {onClose}>
	{#if !isSaving}
		<div class="py-1">
			<!-- Title with Toggle Icon -->
			<h2 class="mb-4 flex items-center text-lg font-bold">
				<span>Feature Heading</span>
				<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={toggleFeatureHeadingCollapsed} aria-label="Toggle Feature Heading">
					<Fa icon={featureHeadingCollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
				</button>
			</h2>

			{#if !featureHeadingCollapsed}
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<input
						id="feature-heading"
						name="feature-heading"
						type="text"
						bind:value={featureData.heading}
						class="w-full rounded border p-2"
						required
						placeholder="Heading"
					/>
					<input
						id="feature-subheading"
						name="feature-subheading"
						type="text"
						bind:value={featureData.subheading}
						class="w-full rounded border p-2"
						required
						placeholder="Subheading"
					/>
					<input
						id="feature-caption"
						name="feature-caption"
						type="text"
						bind:value={featureData.caption}
						class="w-full rounded border p-2"
						required
						placeholder="Caption"
					/>
				</div>
			{/if}

			<!-- Title with Toggle Icon -->
			<h2 class="my-4 flex items-center text-lg font-bold">
				<span>Feature Content</span>
				<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={toggleFeatureImageCollapsed} aria-label="Toggle Feature Content">
					<Fa icon={featureImageCollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
				</button>
			</h2>

			{#if !featureImageCollapsed}
				<!-- Image Section -->
				<div class="mb-4">
					<img
						src={previewImageUrl ?? r2bucketEndpoint + '/' + featureData.image}
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
							id="file-upload"
							onchange={previewImage}
							bind:files
							name="photoURL"
							type="file"
							class="hidden"
							accept="image/png, image/jpeg, image/webp"
						/>
					</label>
				</div>
			{/if}

			<!-- Title with Toggle Icon -->
			<h2 class="my-4 flex items-center text-lg font-bold">
				<span>Feature Links</span>
				<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={toggleFeatureLinksCollapsed} aria-label="Toggle Feature Links">
					<Fa icon={featureLinksCollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
				</button>
			</h2>

			{#if !featureLinksCollapsed}
				<h3 class="my-4 text-sm font-bold">Add Feature Link</h3>

				<!-- Form for adding new links -->
				<form onsubmit={addLink} class="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
					<input
						id="link-text"
						name="link-text"
						type="text"
						bind:value={newLink.text}
						class="w-full rounded border p-2"
						required
						placeholder="Text"
					/>
					<input
						id="link-href"
						name="link-href"
						type="text"
						bind:value={newLink.href}
						class="w-full rounded border p-2"
						required
						placeholder="Href"
					/>
					<button type="submit" class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Add Link</button>
				</form>

				<h2 class="my-4 text-sm font-bold">Links</h2>

				<!-- List of existing links -->
				<ul class="space-y-4">
					{#each featureData.featureLinks as link, index}
						<li class="flex items-center justify-between rounded border p-4">
							<div>
								<p><strong class="sm:text-lg">{link.text}</strong></p>
								<a href={link.href} class="text-blue-500 hover:underline sm:text-lg" target="_blank" rel="noopener noreferrer">Link</a>
							</div>
							<div class="flex space-x-2">
								<button
									disabled={index === 0}
									onclick={() => moveLinkUp(index)}
									class="rounded bg-gray-500 px-2 py-2 text-white hover:bg-gray-600 disabled:bg-gray-300 sm:px-3 sm:py-3"
								>
									<Fa icon={faChevronUp} />
								</button>

								<button
									disabled={index === featureData.featureLinks.length - 1}
									onclick={() => moveLinkDown(index)}
									class="rounded bg-gray-500 px-2 py-2 text-white hover:bg-gray-600 disabled:bg-gray-300 sm:px-3 sm:py-3"
								>
									<Fa icon={faChevronDown} />
								</button>

								<button onclick={() => deleteLink(index)} class="rounded bg-red-500 px-2 py-2 text-white hover:bg-red-600 sm:px-3 sm:py-3">
									<Fa icon={faTrash} />
								</button>
							</div>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Title with Toggle Icon -->
			<h2 class="my-4 flex items-center text-lg font-bold">
				<span>Feature Video</span>
				<button class="ml-2 text-gray-500 hover:text-gray-700" onclick={toggleFeatureVideoCollapsed} aria-label="Toggle Feature Video">
					<Fa icon={featureVideoCollapsed ? faChevronDown : faChevronUp} scale={0.8} translateY={0.1} />
				</button>
			</h2>

			{#if !featureVideoCollapsed}
				<!-- Video Section -->
				<div class="mb-4">
					<input type="text" bind:value={featureData.videoCaption} class="mb-2 w-full rounded border p-2" placeholder="Enter Video Caption" />
					<input type="text" bind:value={featureData.videoTitle} class="mb-2 w-full rounded border p-2" placeholder="Enter Video Title" />
					<input type="text" bind:value={featureData.youtubeURL} class="w-full rounded border p-2" placeholder="Enter YouTube URL" />
				</div>
			{/if}
		</div>
	{:else}
		<LoadingSpinner text={spinnerText} />
	{/if}
</ModalBtn>
