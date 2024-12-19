import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

// Shared extensions
export const extensions = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https', 'mailto'],
    HTMLAttributes: {
      class: 'text-blue-500 hover:underline',
    },
    isAllowedUri: (url, ctx) => ctx.defaultValidate(url) && !url.startsWith('./'),
  }),
];

// Default editor properties
export const defaultEditorProps = {
  attributes: {
    class: 'border border-gray-400 p-4 min-h-[14rem] max-h-[14rem] overflow-y-auto outline-none',
  },
};
