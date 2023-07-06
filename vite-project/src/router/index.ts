import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    }, {
        path: '/service',
        name: 'service',
        component: () => import('../views/service.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router