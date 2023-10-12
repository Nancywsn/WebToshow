import { createRouter, createWebHistory } from 'vue-router'
import toshow from '../views/toshow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: toshow
    },
  ]
})


export default router
