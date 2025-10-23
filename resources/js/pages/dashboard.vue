<template>
    <navigation>
        <section class="pt-5 min-h-screen bg-gray-50 px-6">
            <div class="max-w-8xl mx-auto space-y-10">
                <!-- Profile Section -->

               
                <div class="flex flex-col lg:flex-row gap-6 items-start">
                    <!-- Profile Card -->
                    <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-6 w-full lg:w-2/3">
                        <img
                        :src="user.avatar"
                        alt="User avatar"
                        class="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                        />
                        <div class="flex-1">
                        <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>

                        <div class="flex items-center gap-2 mt-1">
                            <!-- Rank Badge -->
                            <span
                            :class="[
                                'px-3 py-1 text-xs font-semibold rounded-full',
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

                            <!-- Payment Status -->
                            <span
                            :class="[
                                'text-xs px-2 py-1 rounded-full font-medium',
                                user.payment_status === 'Paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-600'
                            ]"
                            >
                            {{ user.payment_status }}
                            </span>
                        </div>

                        <p class="text-sm text-gray-500 mt-3">
                            Referral Count: <b>{{ user.referrals }}</b>
                        </p>
                        </div>
                    </div>

                    <!-- Account Overview (Main Card) -->
                    <div class="bg-white rounded-2xl shadow p-6 w-full">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                            <div class="text-center">
                                <p class="text-sm text-gray-500">Orders Completed</p>
                                <p class="text-2xl font-bold text-yellow-600 ">{{ overview.ordersCompleted }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-gray-500">Earnings</p>
                                <p class="text-2xl font-bold text-green-600 ">₱{{ overview.earnings.toLocaleString() }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-gray-500">Balance</p>
                                <p class="text-2xl font-bold text-pink-600 ">₱{{ overview.balance.toLocaleString() }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-gray-500">Active Downlines</p>
                                <p class="text-xl font-bold text-purple-600 ">{{ overview.activeDownlines }}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-2 gap-y-1 pt-5">
                            <div class="">
                                <div class="flex justify-center space-x-1">
                                    <p class="text-sm text-gray-500 font-medium">Team Members </p>
                                    <div class="flex -space-x-3">
                                        <img
                                        v-for="(member, index) in overview.teamAvatars"
                                        :key="index"
                                        :src="member"
                                        alt="Team Member"
                                        class="w-6 h-6 rounded-full border-2 border-white object-cover"
                                        />
                                    </div>
                                    <span class=" text-xs text-gray-500">
                                        +{{ overview.teamMembers - overview.teamAvatars.length }} more
                                    </span>
                                </div>
                            </div>
                            <div class="text-center">
                                <p class="text-sm font-medium text-gray-700 "> Last Login {{ overview.lastLogin }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row gap-6 items-start !mt-5">
                    <!-- Downline List -->
                    <div class="bg-white rounded-2xl shadow p-6 w-full lg:w-2/3">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Your Downline</h3>
                        <div v-if="downlines.length" class="overflow-x-auto">
                            <table class="min-w-full text-left text-sm">
                            <thead class="border-b bg-gray-100 text-gray-600">
                                <tr>
                                <th class="px-4 py-3">Name</th>
                                <th class="px-4 py-3">Rank</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="(d, index) in downlines"
                                :key="index"
                                class="border-b hover:bg-gray-50"
                                >
                                <td class="px-4 py-3 font-medium text-gray-700">{{ d.name }}</td>
                                <td class="px-4 py-3">{{ d.rank }}</td>
                                <td class="px-4 py-3">
                                    <span
                                    :class="[
                                        'px-2 py-1 text-xs font-semibold rounded-full',
                                        d.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                    ]"
                                    >
                                    {{ d.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">{{ d.joined }}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <p v-else class="text-gray-500 text-center py-6">No downlines yet.</p>
                    </div>
                    <!-- Sales Overview Section -->
                    <div class="bg-white rounded-2xl shadow p-6 w-full">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h3>

                        <div v-if="sales.length" class="overflow-x-auto">
                            <table class="min-w-full text-left text-sm">
                            <thead class="border-b bg-gray-100 text-gray-600">
                                <tr>
                                <th class="px-4 py-3">Date</th>
                                <th class="px-4 py-3">Order ID</th>
                                <th class="px-4 py-3">Customer</th>
                                <th class="px-4 py-3">Amount</th>
                                <th class="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="(sale, index) in sales"
                                :key="index"
                                class="border-b hover:bg-gray-50"
                                >
                                <td class="px-4 py-3">{{ sale.date }}</td>
                                <td class="px-4 py-3 font-medium">{{ sale.orderId }}</td>
                                <td class="px-4 py-3">{{ sale.customer }}</td>
                                <td class="px-4 py-3 font-semibold text-blue-600">₱{{ sale.amount.toLocaleString() }}</td>
                                <td class="px-4 py-3">
                                    <span
                                    :class="[
                                        'px-2 py-1 text-xs font-semibold rounded-full',
                                        sale.status === 'Completed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    ]"
                                    >
                                    {{ sale.status }}
                                    </span>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                        <p v-else class="text-gray-500 text-center py-6">No sales data available.</p>
                    </div>

                    
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-white py-6 border-t mt-10">
            <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <p class="text-sm text-gray-500">&copy; 2025 MyNetwork. All rights reserved.</p>
                <div class="space-x-3 text-sm">
                <a href="#" class="text-gray-500 hover:text-blue-600">Privacy</a>
                <a href="#" class="text-gray-500 hover:text-blue-600">Terms</a>
                </div>
            </div>
        </footer>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from 'vue'

// Mock user
const user = ref({
  name: 'Jane Doe Gonzales',
  avatar: 'https://i.pravatar.cc/150?img=32',
  rank: 'Gold',
  payment_status: 'Paid',
  referrals: 12
})

const overview = {
  ordersCompleted: 46,
  earnings: 24500,
  balance: 5500,
  teamMembers: 10,
  teamAvatars: [
    '/images/member1.jpg',
    '/images/member2.jpg',
    '/images/member3.jpg',
  ],
  activeDownlines: 5,
  lastLogin: 'Oct 17, 2025',
}

// Sales overview
const sales = ref([
  { date: 'Oct 17, 2025', orderId: 'ORD-20251017-01', customer: 'John Doe', amount: 2500, status: 'Completed' },
  { date: 'Oct 15, 2025', orderId: 'ORD-20251015-04', customer: 'Mary Cruz', amount: 1800, status: 'Pending' },
  { date: 'Oct 12, 2025', orderId: 'ORD-20251012-09', customer: 'Robert Tan', amount: 3200, status: 'Completed' }
])

// Downline list
const downlines = ref([
  { name: 'Alice Reyes', rank: 'Silver', status: 'Active', joined: 'Oct 10, 2025' },
  { name: 'Mark Santos', rank: 'Gold', status: 'Active', joined: 'Oct 8, 2025' },
  { name: 'Ella Cruz', rank: 'Starter', status: 'Inactive', joined: 'Sep 30, 2025' }
])
</script>
