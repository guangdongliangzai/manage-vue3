import { createRouter, createWebHistory, } from 'vue-router'
import defaultRouter from "./default";
import { Local } from "@/tool/storage";


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('@/view/Login.vue')
    },
    {
        path: '/home',
        name: '主页',
        meta: { title: '主页' },
        component: () => import('@/layout/Home.vue'),
        redirect: '/index',
        children: defaultRouter
    },
]
const router = createRouter({
    history: createWebHistory("/"),
    routes
})


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.meta.login) {
        const access_token = Local.get("access_token") || "";
        const hrefs = window.location.href;
        if (access_token || (hrefs.indexOf("?") > -1 && hrefs.indexOf("access_token") > -1)) {
            next();
            return;
        } else {
            next("/404");
            return;
        }
    } else {
        next();
        return;
    }
});


// 导出路由
export default router