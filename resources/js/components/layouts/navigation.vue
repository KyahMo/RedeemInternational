<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 h-full bg-gradient-to-b from-blue-900 to-blue-300 text-white transition-all duration-300 z-50 overflow-hidden"
      :class="[
        expanded ? 'w-60' : 'w-16',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between h-16 px-4">
        <span v-if="expanded" class="text-lg font-bold whitespace-nowrap">NetGrow</span>
        <button
          @click="expanded = !expanded"
          class="p-2 rounded hover:text-blue-900 hover:bg-white transition"
          title="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              v-if="expanded"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Menu -->
      <nav class="mt-4 h-[calc(100vh-4rem)] overflow-y-auto custom-scroll pr-1">
        <ul>
          <!-- USER MENU -->
          <SidebarGroup
            v-for="(item, i) in staticMenu"
            :key="i"
            :item="item"
            :expanded="expanded"
            :openIndex="openIndex"
            :index="i"
            @toggle="toggleIndex"
          />

          <li class="mt-4 border-t border-white/10"></li>

          <!-- ADMIN MENU -->
          <SidebarGroup
            v-for="(admin, j) in adminMenu"
            :key="j"
            :item="admin"
            :expanded="expanded"
            :openIndex="openIndex"
            :index="j + staticMenu.length"
            @toggle="toggleIndex"
          />
        </ul>
      </nav>
    </aside>

    <!-- Overlay (mobile) -->
    <div
      v-if="mobileOpen"
      @click="mobileOpen = false"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300 ml-0 md:ml-16" :class="{ 'md:ml-60': expanded }">
      <header
        class="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
      >
        <h1 class="text-lg font-semibold text-gray-800"></h1>

        <!-- Mobile menu button -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="p-2 rounded-md text-gray-700 hover:bg-gray-200 md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      <main class="pt-20">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarGroup from "./SidebarGroup.vue";
import {
  Home,
  Info,
  Briefcase,
  User,
  Users,
  Wallet,
  ShoppingBag,
  Settings,
  ArrowUpCircle,
  Box,
  ClipboardList,
  BarChart3,
  FileText,
  ShieldCheck,
} from "lucide-vue-next";

const expanded = ref(true);
const mobileOpen = ref(false);
const openIndex = ref(null);

const toggleIndex = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// USER MENU
const staticMenu = [
    { name: "Dashboard", icon: Home, link: "/dashboard" },
    { name: "Profile", icon: User, link: "/profile" },
    { name: "Earnings", icon: ShoppingBag, link: "/earnings" },
        {
            name: "Order",
            icon: Wallet,
            children: [
            { name: "Order List", link: "/order_list" },
            { name: "Order Items", link: "/order_items" },
            ],
        },
    { name: "Manage Members", icon: Briefcase, link: "/manage_members" },
    { name: "Downline Tree", icon: Users, link: "/downline_tree" },
    { name: "Upgrade Account", icon: ArrowUpCircle, link: "/upgrade" },
    { name: "Settings", icon: Settings, link: "/settings" },
];

// ADMIN MENU
const adminMenu = [
  {
    name: "Members Management",
    icon: Users,
    children: [
      { name: "All Members", link: "/admin/members" },
      { name: "Add Member", link: "/admin/members/add" },
      { name: "Downline Tree", link: "/admin/members/tree" },
    ],
  },
  {
    name: "Products",
    icon: Box,
    children: [
      { name: "Product List", link: "/admin/products" },
    //   { name: "Add Product", link: "/admin/products/add" },
    //   { name: "Categories", link: "/admin/products/category" },
    ],
  },
  {
    name: "Orders",
    icon: ClipboardList,
    children: [
      { name: "All Orders", link: "/admin/orders" },
      { name: "Pending", link: "/admin/orders/pending" },
      { name: "Completed", link: "/admin/orders/completed" },
    ],
  },
  {
    name: "Earnings",
    icon: Wallet,
    children: [
      { name: "Commission Reports", link: "/admin/commissions" },
      { name: "Payout Requests", link: "/admin/payouts" },
      { name: "Wallet Adjustments", link: "/admin/wallet-adjust" },
    ],
  },
  {
    name: "Reports",
    icon: BarChart3,
    children: [
      { name: "Sales Report", link: "/admin/reports/sales" },
      { name: "Member Growth", link: "/admin/reports/members" },
    ],
  },
  {
    name: "Master Files",
    icon: FileText,
    children: [
      { name: "Ranks / Badges", link: "/admin/master/ranks" },
      { name: "Payment Methods", link: "/admin/master/payments" },
      { name: "System Settings", link: "/admin/settings" },
    ],
  },
  {
    name: "Admin Accounts",
    icon: ShieldCheck,
    children: [
      { name: "Manage Admins", link: "/admin/accounts" },
      { name: "Roles & Permissions", link: "/admin/roles" },
    ],
  },
];
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
