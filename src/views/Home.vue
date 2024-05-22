<script setup>
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'

const { authenticated, getUser: user } = storeToRefs(useAuthStore())

</script>

<template>
    <h1 class="text-3xl font-bold underline">
        <div v-if="authenticated">
            <h1>{{ user.name }}</h1>
            <h1>{{ user.email }}</h1>
        </div>
        <div v-else>
            Home Page
        </div>
    </h1>
</template>