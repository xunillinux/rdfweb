<script>
	export let error;
	export let status;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
		<h1 class="mb-4 text-3xl font-bold text-red-600">Error {status}</h1>
		<p class="text-gray-800">{error}</p>
		<a href="/" class="mt-4 inline-block text-blue-500 underline">Back to Homepage</a>
	</div>
</div>
