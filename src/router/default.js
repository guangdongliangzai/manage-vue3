const ItemRoutes = [
    {
        path: '/home',
        name: "Home",
        meta: { title: '首页', keepAlive: true },
        component: () => import('@/view/dashboard/index.vue')
    },
    {
        path: '/user/list',
        name: "userList",
        meta: { title: '用户管理', keepAlive: false },
        component: () => import('@/view/user/Index.vue'),
    },
    {
        path: '/user/Welcome',
        name: "Welcome",
        meta: { title: '欢迎用户', keepAlive: false },
        component: () => import('@/view/user/Welcome.vue'),
    },

];

export default ItemRoutes;
