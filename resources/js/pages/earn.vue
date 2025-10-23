<template>
    <navigation>
        <div class="p-6 space-y-6">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-800">Earnings Overview</h1>
            <button
                class="mt-4 md:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
            >
                Request Payout
            </button>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white shadow rounded-xl p-6 text-center">
                <p class="text-sm text-gray-500">Total Earnings</p>
                <p class="text-2xl font-bold text-green-600">₱{{ totalEarnings.toLocaleString() }}</p>
            </div>
            <div class="bg-white shadow rounded-xl p-6 text-center">
                <p class="text-sm text-gray-500">Available Balance</p>
                <p class="text-2xl font-bold text-blue-600">₱{{ balance.toLocaleString() }}</p>
            </div>
            <div class="bg-white shadow rounded-xl p-6 text-center">
                <p class="text-sm text-gray-500">Pending Payouts</p>
                <p class="text-2xl font-bold text-yellow-600">₱{{ pendingPayouts.toLocaleString() }}</p>
            </div>
            </div>

            <!-- Tabs -->
            <div>
            <div class="flex border-b border-gray-200">
                <button
                v-for="tab in tabs"
                :key="tab"
                @click="activeTab = tab"
                :class="[
                    'px-4 py-2 font-medium text-sm transition-all',
                    activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                ]"
                >
                {{ tab }}
                </button>
            </div>

            <!-- Tab Content -->
            <div class="mt-6 bg-white shadow rounded-xl p-6 overflow-x-auto">
                <!-- Commission History -->
                <table
                v-if="activeTab === 'Commission History'"
                class="min-w-full table-auto text-sm"
                >
                <thead class="bg-blue-50 text-blue-900">
                    <tr>
                    <th class="px-4 py-3 text-left font-semibold">Date</th>
                    <th class="px-4 py-3 text-left font-semibold">Source</th>
                    <th class="px-4 py-3 text-left font-semibold">Description</th>
                    <th class="px-4 py-3 text-right font-semibold">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(c, index) in commissions"
                    :key="index"
                    class="border-b hover:bg-blue-50 transition"
                    >
                    <td class="px-4 py-3">{{ c.date }}</td>
                    <td class="px-4 py-3">{{ c.source }}</td>
                    <td class="px-4 py-3">{{ c.description }}</td>
                    <td class="px-4 py-3 text-right text-green-600 font-medium">
                        ₱{{ c.amount.toLocaleString() }}
                    </td>
                    </tr>
                </tbody>
                </table>

                <!-- Payout History -->
                <table
                v-else-if="activeTab === 'Payout History'"
                class="min-w-full table-auto text-sm"
                >
                <thead class="bg-blue-50 text-blue-900">
                    <tr>
                    <th class="px-4 py-3 text-left font-semibold">Date</th>
                    <th class="px-4 py-3 text-left font-semibold">Reference No.</th>
                    <th class="px-4 py-3 text-left font-semibold">Amount</th>
                    <th class="px-4 py-3 text-left font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(p, index) in payouts"
                    :key="index"
                    class="border-b hover:bg-blue-50 transition"
                    >
                    <td class="px-4 py-3">{{ p.date }}</td>
                    <td class="px-4 py-3">{{ p.reference }}</td>
                    <td class="px-4 py-3 text-green-600 font-medium">
                        ₱{{ p.amount.toLocaleString() }}
                    </td>
                    <td class="px-4 py-3">
                        <span
                        :class="[
                            'px-3 py-1 text-xs rounded-full font-semibold',
                            p.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : p.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-600'
                        ]"
                        >
                        {{ p.status }}
                        </span>
                    </td>
                    </tr>
                </tbody>
                </table>

                <!-- Wallet Transfer -->
                <table
                v-else-if="activeTab === 'Wallet Transfers'"
                class="min-w-full table-auto text-sm"
                >
                <thead class="bg-blue-50 text-blue-900">
                    <tr>
                    <th class="px-4 py-3 text-left font-semibold">Date</th>
                    <th class="px-4 py-3 text-left font-semibold">Recipient</th>
                    <th class="px-4 py-3 text-left font-semibold">Type</th>
                    <th class="px-4 py-3 text-right font-semibold">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(t, index) in transfers"
                    :key="index"
                    class="border-b hover:bg-blue-50 transition"
                    >
                    <td class="px-4 py-3">{{ t.date }}</td>
                    <td class="px-4 py-3">{{ t.recipient }}</td>
                    <td class="px-4 py-3">
                        <span
                        :class="[
                            'px-3 py-1 text-xs font-semibold rounded-full',
                            t.type === 'Sent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        ]"
                        >
                        {{ t.type }}
                        </span>
                    </td>
                    <td
                        class="px-4 py-3 text-right"
                        :class="t.type === 'Sent' ? 'text-red-600' : 'text-green-600'"
                    >
                        ₱{{ t.amount.toLocaleString() }}
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from "vue";

const activeTab = ref("Commission History");
const tabs = ["Commission History", "Payout History", "Wallet Transfers"];

const totalEarnings = ref(45200);
const balance = ref(12000);
const pendingPayouts = ref(5300);

const commissions = ref([
  { date: "2025-10-05", source: "Referral", description: "Level 1 Bonus", amount: 1200 },
  { date: "2025-10-12", source: "Team Sale", description: "Downline Sale", amount: 3000 },
]);

const payouts = ref([
  { date: "2025-09-28", reference: "PAYOUT-00045", amount: 5000, status: "Completed" },
  { date: "2025-10-10", reference: "PAYOUT-00046", amount: 3500, status: "Pending" },
]);

const transfers = ref([
  { date: "2025-10-15", recipient: "Jane Smith", type: "Sent", amount: 1000 },
  { date: "2025-10-17", recipient: "John Doe", type: "Received", amount: 1500 },
]);
</script>
