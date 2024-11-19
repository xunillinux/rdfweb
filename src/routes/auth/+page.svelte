<script lang="ts">
	let { form }: { form: any } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 p-3">
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Login</h1>

		<form method="POST" action="?/login" class="space-y-4">
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-gray-600">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Enter your email"
				/>
			</div>

			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-gray-600">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
					placeholder="Enter your password"
				/>
			</div>

			{#if form?.error}
				<div class="mb-4 rounded bg-red-100 p-3 text-red-800">
					{form.error}
				</div>
			{/if}

			<button
				type="submit"
				class="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
			>
				Login
			</button>
		</form>
	</div>
</div>
