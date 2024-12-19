<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { Editor, EditorContent, createEditor } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import { faBold, faItalic, faLink, faUnderline } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const extensions = [
		StarterKit,
		Underline,
		Link.configure({
			openOnClick: false,
			autolink: true,
			defaultProtocol: 'https',
			protocols: ['http', 'https', 'mailto'],
			HTMLAttributes: {
				class: 'text-blue-500 hover:underline'
			},
			isAllowedUri: (url, ctx) => ctx.defaultValidate(url) && !url.startsWith('./')
		})
	];
	let editor = $state() as Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions,
			content: `
        <p>This is still the text editor you're used to, but enriched with node views.</p>
      `,
			editorProps: {
				attributes: {
					class: 'border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto'
				}
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

	const toggleLink = (href: string) => {
		$editor.chain().focus().toggleLink({ href }).run();
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

		<button type="button" class={isActive('link') ? 'rounded bg-gray-200 p-1' : 'p-1'} onclick={() => toggleLink('asdf')}>
			<Fa icon={faLink} />
		</button>
	</div>
{/if}

<EditorContent editor={$editor} />
