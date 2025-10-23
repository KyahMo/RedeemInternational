<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300"
      :class="hovered ? 'w-56' : 'w-16'"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="flex items-center justify-center h-16 border-b border-gray-700">
        <span v-if="hovered" class="text-xl font-bold">MyWebsite</span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>

      <nav class="mt-6">
        <ul>
          <li v-for="item in menu" :key="item.name" class="group">
            <a
              href="#"
              class="flex items-center gap-3 py-3 px-4 hover:bg-gray-800 transition-colors"
            >
              <component :is="item.icon" class="w-6 h-6" />
              <span v-if="hovered" class="whitespace-nowrap">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div
      class="flex-1 transition-all duration-300 ml-16"
      :class="{ 'ml-56': hovered }"
    >
      <header class="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-40 h-16 flex items-center px-6">
        <h1 class="text-lg font-semibold text-gray-800">Dashboard</h1>
      </header>

      <main class="pt-20 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Home, Info, Briefcase, Phone } from "lucide-vue-next"

const hovered = ref(false)

const menu = [
  { name: "Home", icon: Home },
  { name: "About", icon: Info },
  { name: "Services", icon: Briefcase },
  { name: "Contact", icon: Phone },
]
</script>

<style scoped>
/* Optional smoother animation */
aside {
  overflow: hidden;
}
</style>
