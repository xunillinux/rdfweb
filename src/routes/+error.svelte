<script>
	import { page } from '$app/state';
</script>

<div class="flex min-h-screen items-center justify-center bg-black text-white">
	<div class="w-full max-w-md rounded-lg border border-yellow-500 bg-gray-900 p-6 text-center shadow-lg">
		{#if page.status === 404}
			<pre class="mb-4 text-xs text-yellow-400">
      ⡴⠶⠦⠤⣤⣄⣀⡀⢀⣠⡴⠖⠚⠋⠛⠛⠲⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⢀⠀
      ⠙⢦⡀⠉⠒⠤⣍⡉⠉⠁⠀⠐⢤⠐⠀⡰⠀⠀⠈⠙⠉⢉⣉⣉⣉⠍⠉⣩⠇
      ⠀⠀⠻⣄⠀⠀⠀⢻⢤⣞⣿⣿⡆⢀⡀⢠⣟⣿⣷⠄⡾⠉⠀⠀⠀⣠⡾⠃⠀
      ⠀⠀⠀⠙⠳⣤⣀⣈⣀⠙⠿⠟⠃⢓⡊⠙⠻⠛⠋⣠⣃⣀⣀⣤⠞⠋⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠈⢻⡝⠓⠒⢺⠷⠒⠒⠒⠛⠛⢉⣩⠿⣿⡁⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⣼⡟⢲⢤⣸⡄⠀⢀⣠⠴⣺⡏⣏⣤⡾⠇⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⣿⢞⣺⣠⠋⠹⠉⡏⢁⡴⣹⣧⣤⠾⠁⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠙⢻⡟⢁⠄⡇⢠⠈⠉⠀⠋⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⢸⠋⠁⠀⡇⢸⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠙⠛⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		</pre>
			<h1 class="mb-4 text-3xl font-bold text-yellow-500">404 Not Found</h1>
			<p class="text-gray-300">This is not the page you are looking for...</p>
			<p class="text-sm italic text-gray-400">*waves hand mysteriously*</p>
		{:else}
			<h1 class="mb-4 text-3xl font-bold text-yellow-500">Error {page.status}</h1>
			<p class="text-gray-300">{page.error?.message}</p>
		{/if}
		<a href="/" class="mt-4 inline-block text-blue-400 underline hover:text-blue-300"> ⬅ Back to the Light Side </a>
	</div>
</div>
