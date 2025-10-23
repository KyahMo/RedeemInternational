<template>
    <navigation>
        <div class="p-6 space-y-6">
            <!-- Header -->
            <div class="flex justify-between items-center flex-wrap gap-4">
            <h1 class="text-2xl font-bold text-gray-800">Orders</h1>
            <div class="flex items-center gap-2">
                <input
                v-model="searchQuery"
                type="text"
                placeholder="Search orders..."
                class="p-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-200 outline-none w-64"
                />
                <select
                v-model="filterStatus"
                class="p-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-200 outline-none"
                >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                </select>
                <a
                    href="/order_items"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg shadow transition"
                    >
                    New Order
                </a>
            </div>
            </div>

            <!-- Overview Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-xl shadow text-center">
                <p class="text-sm text-gray-500">Total Orders</p>
                <p class="text-2xl font-bold text-blue-600">{{ overview.total }}</p>
            </div>
            <div class="bg-white p-4 rounded-xl shadow text-center">
                <p class="text-sm text-gray-500">Completed</p>
                <p class="text-2xl font-bold text-green-600">{{ overview.completed }}</p>
            </div>
            <div class="bg-white p-4 rounded-xl shadow text-center">
                <p class="text-sm text-gray-500">Processing</p>
                <p class="text-2xl font-bold text-yellow-600">{{ overview.processing }}</p>
            </div>
            <div class="bg-white p-4 rounded-xl shadow text-center">
                <p class="text-sm text-gray-500">Cancelled</p>
                <p class="text-2xl font-bold text-red-600">{{ overview.cancelled }}</p>
            </div>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-2xl shadow overflow-x-auto">
            <table class="w-full border-collapse">
                <thead class="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                    <th class="text-left p-4">Order ID</th>
                    <th class="text-left p-4">Customer</th>
                    <th class="text-left p-4">Date</th>
                    <th class="text-left p-4">Amount</th>
                    <th class="text-left p-4">Status</th>
                    <th class="text-left p-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="order in filteredOrders"
                    :key="order.id"
                    class="border-b hover:bg-gray-50 transition"
                >
                    <td class="p-4 font-medium text-gray-800">#{{ order.id }}</td>
                    <td class="p-4">{{ order.customer }}</td>
                    <td class="p-4 text-gray-500">{{ order.date }}</td>
                    <td class="p-4 font-semibold text-gray-800">₱{{ order.amount.toLocaleString() }}</td>
                    <td class="p-4">
                    <span
                        :class="[
                        'px-3 py-1 text-xs font-semibold rounded-full',
                        order.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'Pending'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-600'
                        ]"
                    >
                        {{ order.status }}
                    </span>
                    </td>
                    <td class="p-4 flex items-center gap-2">
                    <button
                        class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-sm"
                    >
                        View
                    </button>
                    <button
                        class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                    >
                        Edit
                    </button>
                    <button
                        class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm"
                    >
                        Cancel
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center pt-4">
            <p class="text-sm text-gray-500">
                Showing {{ filteredOrders.length }} of {{ orders.length }} orders
            </p>
            <div class="flex gap-2">
                <button
                class="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                Prev
                </button>
                <button
                class="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                Next
                </button>
            </div>
            </div>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref, computed } from "vue";

const searchQuery = ref("");
const filterStatus = ref("");

const overview = ref({
  total: 120,
  completed: 85,
  processing: 25,
  cancelled: 10,
});

const orders = ref([
  { id: 101, customer: "John Doe", date: "2025-10-10", amount: 1500, status: "Completed" },
  { id: 102, customer: "Jane Smith", date: "2025-10-11", amount: 2300, status: "Processing" },
  { id: 103, customer: "Michael Reyes", date: "2025-10-12", amount: 800, status: "Pending" },
  { id: 104, customer: "Sarah Cruz", date: "2025-10-13", amount: 3000, status: "Completed" },
  { id: 105, customer: "Daniel Tan", date: "2025-10-14", amount: 1200, status: "Cancelled" },
]);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.id.toString().includes(searchQuery.value);
    const matchesStatus = filterStatus.value
      ? order.status === filterStatus.value
      : true;
    return matchesSearch && matchesStatus;
  });
});
</script>
