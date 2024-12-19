<script lang="ts">
	import { faBold, faItalic, faLink, faUnderline } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { Editor, EditorContent, createEditor } from 'svelte-tiptap';
	import type { Readable } from 'svelte/store';
	import { defaultEditorProps, extensions } from './tiptap-config';
	import LinkModal from '../link-modal.svelte';

	let { content = $bindable('') }: { content: string } = $props();

	let editor = $state() as Readable<Editor>;
	let showModal = $state(false);

	onMount(() => {
		editor = createEditor({
			extensions,
			content,
			editorProps: defaultEditorProps,
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			}
		});
	});

	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};

	const toggleUnderline = () => {
		$editor.chain().focus().toggleUnderline().run();
	};

	const openLinkModal = () => {
		if ($editor.isActive('link')) {
			$editor.chain().focus().unsetLink().run();
		} else {
			showModal = true;
		}
	};

	const insertLink = (url: string) => {
		if (url) {
			const formattedUrl = /^(http|https|mailto):/.test(url) ? url : `https://${url}`;
			$editor.chain().focus().toggleLink({ href: formattedUrl }).run();
		}
	};

	const isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

{#if editor}
	<div class="buttons flex flex-wrap items-center gap-x-4 border-l border-r border-t border-gray-400 p-4">
		<button type="button" class={isActive('bold') ? 'rounded bg-gray-200 p-1' : 'p-1'} onclick={toggleBold}>
			<Fa icon={faBold} />
		</button>

		<button type="button" class={isActive('italic') ? 'rounded bg-gray-200 p-1' : 'p-1'} onclick={toggleItalic}>
			<Fa icon={faItalic} />
		</button>

		<button type="button" class={isActive('underline') ? 'rounded bg-gray-200 p-1' : 'p-1'} onclick={toggleUnderline}>
			<Fa icon={faUnderline} />
		</button>

		<!-- Link Button -->
		<button type="button" class={isActive('link') ? 'rounded bg-gray-200 p-1' : 'p-1'} onclick={openLinkModal}>
			<Fa icon={faLink} />
		</button>
	</div>
{/if}

<!-- Editor Content -->
<EditorContent editor={$editor} />

<!-- Link Modal -->
{#if showModal}
	<LinkModal onSubmit={insertLink} onClose={() => (showModal = false)} />
{/if}
