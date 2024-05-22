import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./axiosClient"
import { useAuthStore } from './stores/auth'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const { attempt } = useAuthStore()

attempt(localStorage.getItem('token')).then(()=>{
    app.mount('#app')
})
