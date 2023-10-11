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


//导入nprogress
import NProgress from 'nprogress'
//导入nprogress的样式
import 'nprogress/nprogress.css'

//定义路由导航前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

//定义路由导航后置守卫
router.afterEach((to, from) => {
  NProgress.done();

})


export default router
