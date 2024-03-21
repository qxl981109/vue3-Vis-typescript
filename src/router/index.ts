import { createRouter, createWebHistory } from 'vue-router'
import visTest from '../views/visTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'visTest',
      component: visTest
    }
  ]
})

export default router
