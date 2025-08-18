import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
// 路由配置示例
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home.vue'),
        meta: {
            requiresAuth: false,
            title: '首页'
        }
    },
    {
        path: '/dirishere',
        name: 'dir',
        component: () => import('../components/Dir.vue'),
        meta: {
            requiresAuth: true,
            title: '目录'
        }
    },
    {
        path: '/fileishere',
        name: 'file',
        component: () => import('../components/File.vue'),
        meta: {
            requiresAuth: true,
            title: '文件'
        }
    },{
        path: '/doc',
        name: 'doc',
        component: () => import('../components/Doc.vue'),
        meta: {
            requiresAuth: false,
            title: '文档'
        }
    }
]
const API_BASE = `${window.location.protocol}//${window.location.hostname}:8888`
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('cookie')
    axios.post(`${API_BASE}/webensure/`, { cookie: isAuthenticated })
        .then(response => {
            if (to.meta.requiresAuth && !response.data.success) {
                next({ name: 'Home' })
            } else {
                next()
            }
        })
        .catch(() => {
            next({ name: 'Home' })
        })
})

export default router