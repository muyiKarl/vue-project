import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout';
/* Component */
import LoginIndex from '@/views/login/index'; // 登陆页面

const routes = [
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
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
