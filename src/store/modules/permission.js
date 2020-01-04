// eslint-disable-next-line no-unused-vars
import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: constantRoutes,
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
