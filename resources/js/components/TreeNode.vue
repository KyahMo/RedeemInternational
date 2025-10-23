<template>
  <div class="flex flex-col items-center">
    <!-- Node -->
    <div class="relative flex flex-col items-center">
      <div
        class="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow cursor-pointer hover:scale-105 transition-transform"
        @click="toggle"
      >
        <UserCircle2 class="w-6 h-6" />
        <div class="text-sm">
          <p class="font-semibold">{{ node.name }}</p>
          <p class="text-xs opacity-90">{{ node.rank }}</p>
        </div>
        <span
          class="ml-2 px-2 py-0.5 text-xs rounded-full"
          :class="node.active ? 'bg-green-500' : 'bg-gray-400'"
        >
          {{ node.active ? 'Active' : 'Inactive' }}
        </span>

        <component
          :is="expanded ? ChevronDown : ChevronRight"
          v-if="node.children?.length"
          class="w-4 h-4 ml-1"
        />
      </div>

      <!-- Connection line -->
      <div
        v-if="node.children?.length"
        class="w-0.5 bg-gray-300 h-6"
      ></div>
    </div>

    <!-- Children -->
    <transition name="fade">
      <div
        v-show="expanded"
        class="flex flex-wrap justify-center gap-6 mt-4 relative"
      >
        <TreeNode
          v-for="child in node.children"
          :key="child.name"
          :node="child"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { ChevronDown, ChevronRight, UserCircle2 } from "lucide-vue-next"

const props = defineProps({
  node: Object
})

const expanded = ref(true)
const toggle = () => (expanded.value = !expanded.value)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
