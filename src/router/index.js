import { createRouter, createWebHistory } from 'vue-router'
import toshow from '../views/toshow.vue'
import home from '../views/home.vue'
// import toshow from '../views/try.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/result',
      name: 'result',
      component: toshow
    },
  ]
})


export default router
