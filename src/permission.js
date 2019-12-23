/* eslint-disable no-console */
import router from './router'
import NProgress from 'nprogress'

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
})

router.afterEach( route => {
    console.log(route)
    NProgress.done();
})