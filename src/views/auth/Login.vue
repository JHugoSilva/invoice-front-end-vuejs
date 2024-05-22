<script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { storeToRefs } from 'pinia'
    import router from "@/router"

    const store = useAuthStore()

    const { getErrors:errors } = storeToRefs(useAuthStore())

    const form = ref({
        email: 'hugo@email.com',
        password: '123456'
    })

    const handleLogin = () => {
        store.login(form).then(()=>{
            router.push({
                name: 'dashboard'
            })
        })
    }


</script>

<template>
    {{ store.token }}
    <h1 class="text-gray-900 text-2x1 font-medium text-center mb-10">Login</h1>
    <form @submit.prevent="handleLogin">
        <div class="mb-3">
             <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
             <input type="email" v-model="form.email" name="email" class="w-full border border-gray-300 rounded text-gray-700 py-1 px-3 leading-8 ease-in-out">
             <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email[0] }}</p>
        </div>
        <div class="mb-3">
             <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
             <input type="password" v-model="form.password" name="password" class="w-full border border-gray-300 rounded text-gray-700 py-1 px-3 leading-8 ease-in-out">
             <p v-if="errors.password" class="text-red-500 text-xs">{{ errors.password[0] }}</p>
        </div>
        <div class="pt-3">
         <button type="submit" class="text-white bg-indigo-500 border-0 py-2 px-6 rounded text-lg w-full hover:bg-indigo-600">Login</button>
        </div>
    </form>
</template>