<script setup>
 import router from '@/router';
 import { useAuthStore } from '../stores/auth'
 import { storeToRefs } from 'pinia'

 const { logout } = useAuthStore()
 const { authenticated } = storeToRefs(useAuthStore())
 
 const handleLogout = () => {
    logout().then(() => {
        router.push('/')
    })
 }
</script>
<template>
    <header class="bt-white h-16 flex items-center border-b-2 border-gray-300 shadow">
        <nav class="container mx-auto flex items-center justify-between text-lg">
            <router-link to="/" class="flex items-content font-medium text-gray-900">
                <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                </svg>
                Laravel Api Vue -> {{  authenticated }}
            </router-link>
            <div class="flex items-center justify-center space-x-6 text-gray-600">
                <router-link to="/" class="hover:text-gray-900">Home</router-link>
                <template v-if="authenticated">
                    <router-link to="/dashboard" class="hover:text-gray-900">Dashboard</router-link>
                    <button type="button" @click="handleLogout" class="hover:text-gray">Logout</button>
                </template>
                <template v-else>
                    <router-link to="login" class="hover:text-gray-900">Login</router-link>
                    <router-link to="register" class="hover:text-gray-900">Registration</router-link>
                </template>
            </div>
        </nav>
    </header>
</template>