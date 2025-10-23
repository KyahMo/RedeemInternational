<template>
    <navigation>
        <div class="p-6 space-y-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Shop for Maintenance</h1>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Sidebar -->
                <div class="lg:col-span-1 space-y-4">
                    <div class="bg-white rounded-xl shadow p-4">
                    <h2 class="text-lg font-semibold mb-2 text-gray-700">Order History</h2>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>- View previous orders</li>
                        <li>- Review transactions</li>
                    </ul>
                    </div>

                    <div class="bg-white rounded-xl shadow p-4">
                    <h2 class="text-lg font-semibold mb-2 text-gray-700">Shipping Rate</h2>
                    <table class="w-full text-sm text-gray-600 border">
                        <thead>
                        <tr class="bg-gray-100 text-gray-700">
                            <th class="border p-1 text-left">Qty</th>
                            <th class="border p-1 text-left">Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(rate, i) in shippingRates" :key="i">
                            <td class="border p-1">{{ rate.qty }}</td>
                            <td class="border p-1">{{ rate.rate }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-gray-500 mt-2">Qty is based on number of items per product.</p>
                    </div>
                </div>

                <!-- Main Form -->
                <div class="lg:col-span-3 bg-white rounded-xl shadow p-6 space-y-6">
                    <!-- Order Details -->
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Date:</strong> <span>{{ today }}</span></div>
                    <div><strong>Customer:</strong> <span>Jason Flor</span></div>
                    <div><strong>Address:</strong> Magsaysay St</div>
                    <div><strong>City/Town:</strong> CITY OF VICTORIAS</div>
                    <div><strong>Mobile:</strong> 09656664192</div>
                    <div><strong>Landmarks:</strong> Negros Occidental Center</div>
                    <div>
                        <label class="font-semibold">Payment Option:</label>
                        <select v-model="payment" class="border rounded-lg p-1 w-full">
                        <option>Online Payment</option>
                        <option>Cash on Delivery</option>
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold">Ship Via:</label>
                        <select v-model="ship" class="border rounded-lg p-1 w-full">
                        <option>Delivery</option>
                        <option>Pickup</option>
                        </select>
                    </div>
                    </div>

                    <!-- Product Table -->
                    <div class="overflow-x-auto">
                    <div class="flex justify-between items-center mb-2">
                        <label class="font-semibold text-gray-700">Search Product:</label>
                        <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search..."
                        class="border rounded-lg p-1 w-64"
                        />
                    </div>

                    <table class="w-full border-collapse text-sm text-gray-700">
                        <thead class="bg-gray-100">
                        <tr>
                            <th class="border p-2 text-left">Item Code</th>
                            <th class="border p-2 text-left">Item</th>
                            <th class="border p-2 text-center">CV</th>
                            <th class="border p-2 text-center">SRP</th>
                            <th class="border p-2 text-center">Discounted</th>
                            <th class="border p-2 text-center">Qty</th>
                            <th class="border p-2 text-center">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item, index) in filteredProducts"
                            :key="item.code"
                            class="hover:bg-gray-50"
                        >
                            <td class="border p-2">{{ item.code }}</td>
                            <td class="border p-2">{{ item.name }}</td>
                            <td class="border p-2 text-center">{{ item.cv }}</td>
                            <td class="border p-2 text-center">{{ item.srp.toFixed(2) }}</td>
                            <td class="border p-2 text-center">{{ item.discount.toFixed(2) }}</td>
                            <td class="border p-2 text-center">
                            <input
                                v-model.number="item.qty"
                                type="number"
                                min="0"
                                class="border rounded-lg p-1 w-16 text-center"
                                @input="updateTotals"
                            />
                            </td>
                            <td class="border p-2 text-center font-medium">
                            ₱{{ (item.qty * item.discount).toFixed(2) }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>

                    <!-- Summary -->
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div></div>
                    <div class="bg-gray-50 p-4 rounded-xl">
                        <div class="flex justify-between py-1">
                        <span>Total:</span>
                        <span>₱{{ totalAmount.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between py-1">
                        <span>Shipping Fee:</span>
                        <span>₱{{ shippingFee.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between py-1">
                        <span>Convenience Fee:</span>
                        <span>₱{{ convenienceFee.toFixed(2) }}</span>
                        </div>
                        <div class="border-t my-2"></div>
                        <div class="flex justify-between font-semibold py-1">
                        <span>Net Amount:</span>
                        <span>₱{{ netAmount.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between py-1 text-gray-600">
                        <span>Total CV:</span>
                        <span>{{ totalCV }}</span>
                        </div>

                        <button
                        class="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg shadow transition"
                        >
                        Submit Order
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref, computed } from "vue";

const today = new Date().toLocaleDateString();

const payment = ref("Online Payment");
const ship = ref("Delivery");
const searchQuery = ref("");

const convenienceFee = ref(20);
const shippingFee = ref(0);

const shippingRates = ref([
  { qty: "1 - 3", rate: "₱90.00" },
  { qty: "4 - 6", rate: "₱150.00" },
  { qty: "7 - 11", rate: "₱180.00" },
  { qty: "12 - 15", rate: "₱200.00" },
]);

const products = ref([
  { code: "XS", name: "Sample Item 1", cv: 350, srp: 3650.75, discount: 2786.06, qty: 0 },
  { code: "SJ12", name: "Sample Item 2", cv: 50, srp: 650, discount: 472.5, qty: 0 },
  { code: "DFG23", name: "Sample Item 3", cv: 40, srp: 525, discount: 393.75, qty: 0 },
  { code: "SKJ9", name: "Sample Item 4", cv: 135, srp: 1433.25, discount: 1074.94, qty: 0 },
]);

const filteredProducts = computed(() => {
  return products.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalAmount = computed(() =>
  products.value.reduce((sum, item) => sum + item.qty * item.discount, 0)
);

const totalCV = computed(() =>
  products.value.reduce((sum, item) => sum + item.qty * item.cv, 0)
);

const netAmount = computed(
  () => totalAmount.value + shippingFee.value + convenienceFee.value
);

const updateTotals = () => {};
</script>
