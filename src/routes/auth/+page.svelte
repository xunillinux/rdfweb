<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, user } from '$lib/firebase';
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

	let email = $state('');
	let password = $state('');
	let errorMessage = $state<string | null>(null);

	async function logIn() {
		try {
			errorMessage = null;
			await signInWithEmailAndPassword(auth, email, password);
			email = '';
			password = '';
			goto('/');
		} catch (error) {
			errorMessage = 'Invalid email or password. Please try again.';
			password = '';
			console.error('Error signing in:', error);
		}
	}

	async function logOut() {
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		logIn();
	};

	const handleLogout = (event: Event) => {
		event.preventDefault();
		logOut();
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 p-3">
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">
			{#if $user}
				Welcome Back!
			{:else}
				Login
			{/if}
		</h1>

		{#if $user}
			<!-- Logged-in User Section -->
			<p class="mb-4 text-center text-sm text-gray-600">
				Logged in as {$user.email}
			</p>
			<form onsubmit={handleLogout} class="mb-4 text-center">
				{#if errorMessage}
					<p class="text-center text-sm text-red-500">{errorMessage}</p>
				{/if}
				<button
					type="submit"
					class="w-full rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
				>
					Logout
				</button>
			</form>
		{:else}
			<!-- Login Form -->
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-600">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						bind:value={email}
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
						bind:value={password}
						required
						class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
						placeholder="Enter your password"
					/>
				</div>

				{#if errorMessage}
					<p class="text-center text-sm text-red-500">{errorMessage}</p>
				{/if}

				<button
					type="submit"
					class="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
				>
					Login
				</button>
			</form>
		{/if}
	</div>
</div>
