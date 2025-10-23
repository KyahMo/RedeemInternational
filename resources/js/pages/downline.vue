<template>
    <navigation>
        <div class="p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Downline Tree</h1>

            <div class="bg-white rounded-2xl shadow p-6 overflow-x-auto">
            <div class="flex flex-col items-center">
                <TreeNode :node="treeData" />
            </div>
            </div>
        </div>
    </navigation>
</template>

<script setup>
import navigation from '@/components/layouts/navigation.vue'
import { ref } from "vue"
import TreeNode from "@/components/TreeNode.vue"

const treeData = ref({
  name: "Jason Flor",
  rank: "Platinum",
  active: true,
  children: [
    {
      name: "Maria Santos",
      rank: "Gold",
      active: true,
      children: [
        { name: "Ryan Cruz", rank: "Silver", active: true, children: [] },
        { name: "Liza Tan", rank: "Silver", active: false, children: [] },
        { name: "Liza Tan", rank: "Silver", active: false, children: [] },
        { name: "Liza Tan", rank: "Silver", active: false, children: [] },
        { name: "Liza Tan", rank: "Silver", active: false, children: [] },
        { name: "Liza Tan", rank: "Silver", active: false, children: [] },
      ],
    },
    {
      name: "Daniel Lim",
      rank: "Gold",
      active: true,
      children: [
        {
          name: "Karen Lee",
          rank: "Emerald",
          active: true,
          children: [
            { name: "John Dela Cruz", rank: "Bronze", active: true, children: [] },
            { name: "John Dela Cruz", rank: "Bronze", active: true, children: [] },
            { name: "John Dela Cruz", rank: "Bronze", active: true, children: [] },
          ],
        },
      ],
    },
  ],
})
</script>
