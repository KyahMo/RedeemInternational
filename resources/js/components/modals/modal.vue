<template>
  <transition name="mt-modal">
    <div
      v-if="open"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        @click="onClose"
      ></div>

      <!-- Modal content -->
      <div
        class="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 transform transition-all duration-300"
        :class="sizeClasses"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
          <button @click="onClose" class="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mb-4">
          <slot name="body"></slot>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-2">
          <button
            v-if="showCancel"
            @click="onClose"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            @click="onConfirm"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  open: Boolean,
  title: { type: String, default: "Modal Title" },
  size: { type: String, default: "md" },  // e.g., "sm", "md", "lg", "xl"
  showCancel: { type: Boolean, default: true },
  confirmText: { type: String, default: "Confirm" },
});

const emits = defineEmits(["close", "confirm"]);

const onClose = () => emits("close");
const onConfirm = () => emits("confirm");

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
}[props.size] || "max-w-md";
</script>

<style scoped>
.mt-modal-enter-active,
.mt-modal-leave-active {
  transition: all 0.3s ease;
}
.mt-modal-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.mt-modal-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.mt-modal-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.mt-modal-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
