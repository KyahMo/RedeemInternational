<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-300 p-4">
		<div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 text-white">
			<!-- Company Branding -->
			<div class="text-center mb-8">
				<img src="" alt=" Logo" class="mx-auto h-16 mb-3" />
				<h1 class="text-3xl font-bold tracking-wide">Welcome Back</h1>
				<p class="text-blue-200 text-sm mt-1">Login to your Redeem International account</p>
			</div>

			<!-- Login Form -->
			<form @submit.prevent="login">
				<div class="mb-4">
				<label class="block text-sm mb-1 text-blue-100">Email Address</label>
				<input
					v-model="email"
					type="email"
					required
					class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
					placeholder="you@example.com"
				/>
				</div>

				<div class="mb-6">
				<label class="block text-sm mb-1 text-blue-100">Password</label>
				<input
					v-model="password"
					type="password"
					required
					class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
					placeholder="••••••••"
				/>
				</div>

				<a
					href="/dashboard"
					type="submit"
					class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-center font-semibold text-white shadow-lg"
					>
					Login
				</a>

				<p class="text-center text-sm mt-6 text-blue-200">
				Don’t have an account?
				<router-link to="/register" class="text-white underline hover:text-blue-200">
					Create one
				</router-link>
				</p>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Login submitted:', email.value)
}
</script>