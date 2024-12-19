<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor, EditorContent, createEditor } from 'svelte-tiptap';
	import type { Readable } from 'svelte/store';
	import { extensions } from './tiptap-config';

	// Define props
	let { content = '', viewerClass }: { content: string; viewerClass?: string } = $props();

	// Initialize editor as a readable store
	let editor = $state() as Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions,
			content,
			editable: false, // Read-only mode
			editorProps: {
				attributes: {
					class: viewerClass ?? ''
				}
			}
		});
	});

	$effect(() => {
		if (editor && content !== $editor.getHTML()) {
			$editor.commands.setContent(content);
		}
	});
</script>

<!-- Render the editor content -->
<EditorContent editor={$editor} />
