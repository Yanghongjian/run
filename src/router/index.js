import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/tools/webstore'
import store from '@/store'
const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('@/view/home/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('../view/login/index.vue'),
        meta: {
            title: '登录'
        }
    }
]
const route = createRouter({
    history: createWebHistory(),
    routes
})
route.beforeEach((to, from, next) => {
    if (to.path == '/login') next()
    else {
        if (!getToken()) { //判断是否有token
            next('/login')
        } else {
            next()
            if (store.getters.roles.length === 0) {
                store.dispatch('user/GetInfo').then(res => {
                    console.log(res);
                })
            }

        }
    }
})
export default route