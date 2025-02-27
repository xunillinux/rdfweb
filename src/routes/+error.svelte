<script>
	import { browser } from '$app/environment';

	export let error;
	export let status;

	// Only access window & navigator in the browser
	let currentUrl = browser ? window.location.href : 'Unknown';
	let browserInfo = browser ? navigator.userAgent : 'Unknown';
	let isOnline = browser ? (navigator.onLine ? "Online" : "Offline") : 'Unknown';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
		<h1 class="mb-4 text-3xl font-bold text-red-600">Error {status}</h1>
		<p class="text-gray-800">{error?.message || "Unknown error occurred"}</p>

		<!-- Debugging Info (Always Visible) -->
		<div class="mt-4 p-3 text-left text-sm bg-gray-200 rounded">
			<strong>Debug Info:</strong>
			<p><strong>URL:</strong> {currentUrl}</p>
			<p><strong>Browser:</strong> {browserInfo}</p>
			<p><strong>Network:</strong> {isOnline}</p>
			<p><strong>Full Error Details:</strong></p>
			<pre class="mt-2 bg-gray-300 p-2 rounded text-left text-xs">
{JSON.stringify(error, null, 2)}
			</pre>
		</div>

		<a href="/" class="mt-4 inline-block text-blue-500 underline">Back to Homepage</a>
	</div>
</div>
