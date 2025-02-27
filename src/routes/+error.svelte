<script>
	export let error;
	export let status;

	// Get the current URL
	const currentUrl = window.location.href;

	// Get browser details
	const browserInfo = navigator.userAgent;

	// Check if online or offline
	const isOnline = navigator.onLine ? "Online" : "Offline";
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
		<h1 class="mb-4 text-3xl font-bold text-red-600">Error {status}</h1>
		<p class="text-gray-800">{error?.message || "Unknown error occurred"}</p>

		<!-- Debugging Info -->
		<div class="mt-4 p-3 text-left text-sm bg-gray-200 rounded">
			<strong>Debug Info:</strong>
			<p><strong>URL:</strong> {currentUrl}</p>
			<p><strong>Browser:</strong> {browserInfo}</p>
			<p><strong>Network:</strong> {isOnline}</p>
			<details class="mt-2">
				<summary class="cursor-pointer text-blue-500">Show Full Error Details</summary>
				<pre class="mt-2 bg-gray-300 p-2 rounded text-left text-xs">{JSON.stringify(error, null, 2)}</pre>
			</details>
		</div>

		<a href="/" class="mt-4 inline-block text-blue-500 underline">Back to Homepage</a>
	</div>
</div>
