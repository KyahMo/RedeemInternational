<template>
	<navigation>
		<div class="p-6 space-y-6">
		<!-- Page Header -->
		<div class="flex flex-col md:flex-row md:items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-800">Manage Members</h1>
			<button
			class="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
			>
			+ Add Member
			</button>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow">
			<div class="flex items-center gap-2 w-full md:w-1/2">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Search member name or email..."
				class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
			/>
			</div>
			<div class="flex items-center gap-2">
			<select
				v-model="filterRank"
				class="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
			>
				<option value="">All Ranks</option>
				<option>Gold</option>
				<option>Platinum</option>
				<option>Emerald</option>
			</select>
			<select
				v-model="filterStatus"
				class="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
			>
				<option value="">All Status</option>
				<option>Active</option>
				<option>Inactive</option>
			</select>
			</div>
		</div>

		<!-- Members Table -->
		<div class="bg-white rounded-xl shadow overflow-hidden">
			<table class="min-w-full table-auto text-left text-sm">
			<thead class="bg-blue-50 text-blue-900">
				<tr>
				<th class="px-6 py-3 font-semibold">Member</th>
				<th class="px-6 py-3 font-semibold">Rank</th>
				<th class="px-6 py-3 font-semibold">Referrals</th>
				<th class="px-6 py-3 font-semibold">Join Date</th>
				<th class="px-6 py-3 font-semibold">Status</th>
				<th class="px-6 py-3 font-semibold text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr
				v-for="member in filteredMembers"
				:key="member.id"
				class="border-b hover:bg-blue-50 transition"
				>
				<!-- Member Info -->
				<td class="px-6 py-4 flex items-center gap-3">
					<img
					:src="member.avatar"
					alt="avatar"
					class="w-10 h-10 rounded-full object-cover border border-gray-300"
					/>
					<div>
					<p class="font-semibold text-gray-800">{{ member.name }}</p>
					<p class="text-xs text-gray-500">{{ member.email }}</p>
					</div>
				</td>

				<!-- Rank -->
				<td class="px-6 py-4">
					<span
					:class="[
						'px-3 py-1 text-xs font-semibold rounded-full',
						member.rank === 'Gold'
						? 'bg-yellow-100 text-yellow-700'
						: member.rank === 'Platinum'
						? 'bg-gray-200 text-gray-700'
						: member.rank === 'Emerald'
						? 'bg-green-100 text-green-700'
						: 'bg-blue-100 text-blue-700'
					]"
					>
					{{ member.rank }}
					</span>
				</td>

				<!-- Referrals -->
				<td class="px-6 py-4">{{ member.referrals }}</td>

				<!-- Join Date -->
				<td class="px-6 py-4 text-gray-600">{{ member.joined }}</td>

				<!-- Status -->
				<td class="px-6 py-4">
					<span
					:class="[
						'px-3 py-1 text-xs font-medium rounded-full',
						member.status === 'Active'
						? 'bg-green-100 text-green-700'
						: 'bg-red-100 text-red-600'
					]"
					>
					{{ member.status }}
					</span>
				</td>

				<!-- Actions -->
				<td class="px-6 py-4 text-right space-x-2">
					<button
					class="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium"
					>
					View
					</button>
					<button
					class="px-3 py-1 text-yellow-600 hover:bg-yellow-100 rounded-lg text-xs font-medium"
					>
					Edit
					</button>
					<button
					class="px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium"
					>
					Remove
					</button>
				</td>
				</tr>
			</tbody>
			</table>

			<!-- Pagination -->
			<div class="flex justify-between items-center px-6 py-4 bg-gray-50">
			<p class="text-sm text-gray-600">Showing 1–10 of {{ members.length }} members</p>
			<div class="flex items-center gap-2">
				<button
				class="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm"
				>
				Prev
				</button>
				<button
				class="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm"
				>
				Next
				</button>
			</div>
			</div>
		</div>
		</div>
	</navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref, computed } from "vue";

const searchQuery = ref("");
const filterRank = ref("");
const filterStatus = ref("");

// Sample members data
const members = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/100?img=1",
    rank: "Gold",
    referrals: 12,
    joined: "2025-02-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://i.pravatar.cc/100?img=2",
    rank: "Platinum",
    referrals: 8,
    joined: "2024-11-02",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://i.pravatar.cc/100?img=3",
    rank: "Emerald",
    referrals: 5,
    joined: "2023-10-10",
    status: "Inactive",
  },
]);

// Filtered members
const filteredMembers = computed(() =>
  members.value.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRank = !filterRank.value || m.rank === filterRank.value;
    const matchesStatus = !filterStatus.value || m.status === filterStatus.value;
    return matchesSearch && matchesRank && matchesStatus;
  })
);
</script>
