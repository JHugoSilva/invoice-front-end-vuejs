import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'

const isLogged = false
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/register',
      component: Register,
      name: 'register'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (isLogged) {
      next()
    } else {
      next("/login")
    }
    next("/login")
  } else {
    next()
  }
})

export default router
