import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout';
/* Component */
import LoginIndex from '@/views/login/index'; // 登陆页面

const constantRoutes = [
  {
      path: '/login',
      component: LoginIndex,
      hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { title: '首页' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
