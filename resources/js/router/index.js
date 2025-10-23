import { createRouter, createWebHistory } from "vue-router";


import notFound from '../pages/notFound.vue'
import login from '../pages/login.vue'
import register from '../pages/register.vue'
import dashboard from '../pages/dashboard.vue'
import members from '../pages/members.vue'
import earnings from '../pages/earn.vue'
import profile from '../pages/profile.vue'
import order_list from '../pages/order_list.vue'
import order_items from '../pages/order_items.vue'
import downline from '../pages/downline.vue'

import product_list from '../pages/admin/product_list.vue'
import product_add from '../pages/admin/product_add.vue'
import product_cat from '../pages/admin/product_category.vue'

const routes = [
    {
        path:'/',
        component: login,
    },
    {
        path:'/register',
        component: register,
    },
    {
        path:'/dashboard',
        component: dashboard,
    },
    {
        path:'/manage_members',
        component: members,
    },
    {
        path:'/earnings',
        component: earnings,
    },
    {
        path:'/profile',
        component: profile,
    },
    {
        path:'/order_list',
        component: order_list,
    },
    {
        path:'/order_items',
        component: order_items,
    },
    {
        path:'/downline_tree',
        component: downline,
    },
    {
        path:'/admin/products',
        component: product_list,

    },
    {
        path:'/admin/products/add',
        component: product_add,
    },
    {
        path:'/admin/products/category',
        component: product_cat,
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component: notFound,
        meta:{
            requiresAuth:false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
