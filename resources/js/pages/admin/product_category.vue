<template>
    <navigation>
        <div class="p-6 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Manage Categories</h2>

            <form
            @submit.prevent="addCategory"
            class="flex gap-3 mb-6"
            >
            <input
                type="text"
                v-model="newCategory"
                placeholder="Enter category name"
                class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Add
            </button>
            </form>

            <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="min-w-full border-collapse">
                <thead class="bg-gray-100 text-gray-700">
                <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold">#</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th class="px-6 py-3 text-center text-sm font-semibold">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(cat, i) in categories"
                    :key="i"
                    class="hover:bg-gray-50"
                >
                    <td class="px-6 py-3 text-sm">{{ i + 1 }}</td>
                    <td class="px-6 py-3 text-sm">{{ cat }}</td>
                    <td class="px-6 py-3 text-center space-x-3">
                    <button class="text-blue-600 hover:underline">Edit</button>
                    <button class="text-red-600 hover:underline">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from "vue";

const categories = ref(["Membership", "Kits", "Merchandise"]);
const newCategory = ref("");

const addCategory = () => {
  if (newCategory.value.trim() !== "") {
    categories.value.push(newCategory.value.trim());
    newCategory.value = "";
  }
};
</script>
