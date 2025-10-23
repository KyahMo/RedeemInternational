<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-300 p-4">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 text-white">
      <!-- Branding -->
      <div class="text-center mb-8">
        <img src="" alt="Logo" class="mx-auto h-16 mb-3" />
        <h1 class="text-3xl font-bold tracking-wide">Create Account</h1>
        <p class="text-blue-200 text-sm mt-1">Join the Redeem International today</p>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="block text-sm mb-1 text-blue-100">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div class="mb-3">
          <label class="block text-sm mb-1 text-blue-100">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div class="mb-3">
          <label class="block text-sm mb-1 text-blue-100">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <div class="mb-3">
          <label class="block text-sm mb-1 text-blue-100">Confirm Password</label>
          <input
            v-model="password_confirmation"
            type="password"
            required
            class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm mb-1 text-blue-100">Referral Code (optional)</label>
          <input
            v-model="referral_code"
            type="text"
            class="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="Enter referral code"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-white shadow-lg"
        >
          Sign Up
        </button>

        <p class="text-center text-sm mt-6 text-blue-200">
          Already have an account?
          <router-link to="/" class="text-white underline hover:text-blue-200">
            Login
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const referral_code = ref('')

const register = () => {
  console.log('Register submitted:', name.value, email.value, referral_code.value)
}
</script>
