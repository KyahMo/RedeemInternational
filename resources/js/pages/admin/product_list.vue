<template>
    <navigation>
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Product Management</h2>
            <div class="flex gap-3">
                <button
                @click="showAddCategory = true"
                class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                >
                + Add Category
                </button>
                <button
                @click="showAddProduct = true"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                + Add Product
                </button>
            </div>
            </div>

            <!-- Product Table -->
            <div class="bg-white rounded-xl shadow overflow-hidden">
            <table class="min-w-full border-collapse">
                <thead class="bg-gray-100 text-gray-700">
                <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold">#</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Product</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Price</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                    <th class="px-6 py-3 text-center text-sm font-semibold">Status</th>
                    <th class="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                </tr>
                </thead>
                <tbody class="divide-y">
                <tr
                    v-for="(product, i) in products"
                    :key="product.id"
                    class="hover:bg-gray-50"
                >
                    <td class="px-6 py-3 text-sm">{{ i + 1 }}</td>
                    <td class="px-6 py-3 flex items-center gap-3">
                    <img
                        :src="product.image"
                        alt="product"
                        class="w-10 h-10 rounded object-cover"
                    />
                    <span>{{ product.name }}</span>
                    </td>
                    <td class="px-6 py-3 text-sm">{{ product.category }}</td>
                    <td class="px-6 py-3 text-sm">${{ product.price }}</td>
                    <td class="px-6 py-3 text-sm">{{ product.stock }}</td>
                    <td class="px-6 py-3 text-center">
                    <span
                        class="px-3 py-1 rounded-full text-xs font-medium"
                        :class="product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                    >
                        {{ product.active ? 'Active' : 'Inactive' }}
                    </span>
                    </td>
                    <td class="px-6 py-3 text-center space-x-3">
                    <button class="text-blue-600 hover:underline">Edit</button>
                    <button class="text-red-600 hover:underline">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>

            <!-- Add Product Modal -->
            <transition name="fade">
            <div
                v-if="showAddProduct"
                class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
                <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                <button
                    @click="showAddProduct = false"
                    class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <h3 class="text-xl font-bold mb-4 text-gray-800">Add New Product</h3>

                <form @submit.prevent="addProduct" class="space-y-4">
                    <div>
                    <label class="block text-sm font-semibold mb-1">Product Name</label>
                    <input
                        v-model="newProduct.name"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label class="block text-sm font-semibold mb-1">Category</label>
                    <select
                        v-model="newProduct.category"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option disabled value="">Select Category</option>
                        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
                    </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-1">Price</label>
                        <input
                        type="number"
                        v-model="newProduct.price"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Stock</label>
                        <input
                        type="number"
                        v-model="newProduct.stock"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    </div>

                    <div>
                    <label class="block text-sm font-semibold mb-1">Image</label>
                    <input type="file" @change="onImageUpload" />
                    <img
                        v-if="preview"
                        :src="preview"
                        alt="preview"
                        class="w-24 h-24 rounded mt-2 object-cover"
                    />
                    </div>

                    <div class="flex justify-end">
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </transition>

            <!-- Add Category Modal -->
            <transition name="fade">
            <div
                v-if="showAddCategory"
                class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
                <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <button
                    @click="showAddCategory = false"
                    class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <h3 class="text-xl font-bold mb-4 text-gray-800">Add New Category</h3>

                <form @submit.prevent="addCategory" class="space-y-4">
                    <div>
                    <label class="block text-sm font-semibold mb-1">Category Name</label>
                    <input
                        type="text"
                        v-model="newCategory"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div class="flex justify-end">
                    <button
                        type="submit"
                        class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Add Category
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </transition>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from "vue";

const showAddProduct = ref(false);
const showAddCategory = ref(false);

const preview = ref(null);
const newProduct = ref({
  name: "",
  category: "",
  price: null,
  stock: null,
  image: null,
});

const products = ref([
  {
    id: 1,
    name: "Gold Package",
    category: "Membership",
    price: 299,
    stock: 50,
    active: true,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Emerald Kit",
    category: "Kits",
    price: 149,
    stock: 100,
    active: false,
    image: "https://via.placeholder.com/80",
  },
]);

const categories = ref(["Membership", "Kits", "Merchandise"]);
const newCategory = ref("");

const onImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) preview.value = URL.createObjectURL(file);
};

const addProduct = () => {
  if (!newProduct.value.name) return;
  products.value.push({
    ...newProduct.value,
    id: products.value.length + 1,
    image: preview.value || "https://via.placeholder.com/80",
    active: true,
  });
  newProduct.value = { name: "", category: "", price: null, stock: null };
  preview.value = null;
  showAddProduct.value = false;
};

const addCategory = () => {
  if (newCategory.value.trim() !== "") {
    categories.value.push(newCategory.value.trim());
    newCategory.value = "";
    showAddCategory.value = false;
  }
};
</script>

<style scoped>
/* Backdrop Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Modal Scale/Slide */
.scale-up-enter-active, .scale-up-leave-active {
  transition: all 0.3s ease;
}
.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.scale-up-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
