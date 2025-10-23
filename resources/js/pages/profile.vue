<template>
	<navigation>
		<div class="p-6 space-y-6">
			<!-- Header -->
			<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-800">My Profile</h1>
			<button
				class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
			>
				Upgrade Account
			</button>
			</div>

			<!-- Profile Card -->
			<div class="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
			<!-- Avatar -->
			<div class="relative">
				<img
				:src="user.avatar"
				alt="Profile Picture"
				class="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
				/>
				<label
				for="upload-photo"
				class="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700"
				>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z" />
				</svg>
				</label>
				<input id="upload-photo" type="file" class="hidden" @change="updatePhoto" />
			</div>

			<!-- Info -->
			<div class="flex-1 space-y-3">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>
					<p class="text-sm text-gray-500">Referral Code: <b>{{ user.referral_code }}</b></p>
				</div>
				<span
					:class="[
					'px-4 py-1 text-xs font-semibold rounded-full',
					user.rank === 'Gold'
						? 'bg-yellow-100 text-yellow-700'
						: user.rank === 'Platinum'
						? 'bg-gray-200 text-gray-700'
						: user.rank === 'Emerald'
						? 'bg-green-100 text-green-700'
						: 'bg-blue-100 text-blue-700'
					]"
				>
					{{ user.rank }}
				</span>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				<div>
					<label class="text-sm text-gray-500">Email</label>
					<input
					type="email"
					v-model="user.email"
					class="w-full mt-1 p-2 rounded-lg border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
					/>
				</div>

				<div>
					<label class="text-sm text-gray-500">Phone</label>
					<input
					type="text"
					v-model="user.phone"
					class="w-full mt-1 p-2 rounded-lg border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
					/>
				</div>

				<div>
					<label class="text-sm text-gray-500">Join Date</label>
					<input
					type="text"
					disabled
					:value="user.join_date"
					class="w-full mt-1 p-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-600"
					/>
				</div>

				<div>
					<label class="text-sm text-gray-500">Last Login</label>
					<input
					type="text"
					disabled
					:value="user.last_login"
					class="w-full mt-1 p-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-600"
					/>
				</div>

				<div class="col-span-2">
					<label class="text-sm text-gray-500">Change Password</label>
					<input
					type="password"
					v-model="password"
					placeholder="Enter new password"
					class="w-full mt-1 p-2 rounded-lg border border-gray-200 focus:ring focus:ring-blue-200 outline-none"
					/>
				</div>
				</div>

				<div class="flex justify-end mt-6">
				<button
					@click="saveChanges"
					class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
				>
					Save Changes
				</button>
				</div>
			</div>
			</div>

			<!-- Referral Section -->
			<div class="bg-white shadow rounded-2xl p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Your Referral Link</h3>
			<div class="flex items-center gap-2">
				<input
				type="text"
				readonly
				:value="`https://mycompany.com/signup?ref=${user.referral_code}`"
				class="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
				/>
				<button
				@click="copyReferral"
				class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
				>
				Copy
				</button>
			</div>
			</div>
		</div>
	</navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from "vue";

const user = ref({
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=32",
  email: "john@example.com",
  phone: "+639171234567",
  referral_code: "JD1234",
  join_date: "2025-01-10",
  last_login: "2025-10-17 08:42 AM",
  rank: "Gold",
});

const password = ref("");

const updatePhoto = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      user.value.avatar = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveChanges = () => {
  alert("Profile updated successfully!");
};

const copyReferral = () => {
  navigator.clipboard.writeText(`https://mycompany.com/signup?ref=${user.value.referral_code}`);
  alert("Referral link copied!");
};
</script>
