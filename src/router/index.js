import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout';
/* Component */
import LoginIndex from '@/views/login/index'; // 登陆页面

export const constantRoutes = [
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
    {
        path: '/self',
        component: Layout,
        children: [
            {
                path: '/home',
                component: Home,
                name: 'home',
                meta: { title: '首页1' }
            },
            {
                path: '/home',
                component: Home,
                name: 'home',
                meta: { title: '首页2' }
            }
        ]
    }
]


/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
    /** 当你的路由图太长时，你可以把它分成小模块 **/

    // 404 页面必须放在最后 !!!
    { path: '*', redirect: '/404', hidden: true }
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
})

export default router
