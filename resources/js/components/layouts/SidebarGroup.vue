<template>
  <li class="group relative text-gray-200">
    <!-- Regular link -->
    <router-link
      v-if="!item.children"
      :to="item.link"
      class="flex items-center justify-between py-3 px-4 hover:text-white hover:bg-white/20 transition-colors rounded-md"
      active-class="bg-white/20 text-white"
    >
      <div class="flex items-center gap-3">
        <component :is="item.icon" class="w-6 h-6" />
        <span v-if="expanded" class="whitespace-nowrap">{{ item.name }}</span>
      </div>
    </router-link>

    <!-- Dropdown -->
    <div
      v-else
      @click="$emit('toggle', index)"
      class="flex items-center justify-between py-3 px-4 hover:text-white hover:bg-white/20 transition-colors cursor-pointer rounded-md"
    >
      <div class="flex items-center gap-3">
        <component :is="item.icon" class="w-6 h-6" />
        <span v-if="expanded" class="whitespace-nowrap">{{ item.name }}</span>
      </div>
      <ChevronDown
        v-if="expanded"
        class="w-4 h-4 transition-transform duration-300"
        :class="{ 'rotate-180': openIndex === index }"
      />
    </div>

    <!-- Dropdown children -->
    <transition name="slide-fade">
      <ul
        v-if="item.children && openIndex === index && expanded"
        class="pl-10 pr-4 py-2 text-sm text-gray-300 space-y-1"
      >
        <li v-for="child in item.children" :key="child.name">
          <router-link
            :to="child.link"
            class="block px-2 py-2 rounded-md hover:bg-white/20 hover:text-white transition"
            active-class="bg-white/20 text-white"
          >
            {{ child.name }}
          </router-link>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script setup>
import { ChevronDown } from "lucide-vue-next";
defineProps(["item", "expanded", "openIndex", "index"]);
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
