import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
    // • true  → listen on 0.0.0.0 (all IPv4 interfaces)
    // • "127.0.0.1" → listen on the numeric loop‑back address only
    // • "localhost" (default) → only the name “localhost”
    host: true,          // <-- change this line
    port: 5173,          // optional, keeps the default port
  }
});
