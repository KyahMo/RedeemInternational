<template>
    <navigation>
        <div class="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

            <form class="space-y-5">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input
                type="text"
                v-model="product.name"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                v-model="product.category"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                <option disabled value="">Select Category</option>
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
                </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                <input
                    type="number"
                    v-model="product.price"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                <input
                    type="number"
                    v-model="product.stock"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Upload Image</label>
                <input type="file" @change="onImageUpload" />
                <img
                v-if="preview"
                :src="preview"
                alt="preview"
                class="w-32 h-32 mt-2 rounded object-cover"
                />
            </div>

            <button
                type="submit"
                class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
                Save Product
            </button>
            </form>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from "vue";

const product = ref({
  name: "",
  category: "",
  price: null,
  stock: null,
  image: null,
});

const preview = ref(null);
const categories = ["Membership", "Kits", "Merchandise"];

const onImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) preview.value = URL.createObjectURL(file);
};
</script>
