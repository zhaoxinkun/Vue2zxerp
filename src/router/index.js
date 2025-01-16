// 导入Vue
import Vue from "vue"
// 导入路由
import VueRouter from 'vue-router'

// 使用路由
Vue.use(VueRouter)

// 导入路由数据
import RouterData from "@/utils/menuData";
// 导入我们自定义的路由方法
import {initRouter} from "@/router/Recursive";

// 编写路由信息
export const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        // 登录页
        path: "/login",
        name: "login",
        component: () => import("../views/Login/Login.vue"),
    },
    {
        // 布局容器
        path: "/container",
        name: "container",
        redirect: "/index",
        component: () => import("../container/index.vue"),
        // 已使用递归形式
    },
]

// 做路由递归
// 1.遍历路由对象,拿到home
const homeRoutes = routes.filter(v => v.path === "/container")[0]
// console.log("homeRoutes is", homeRoutes)

// 2.然后手动往里添加子集
homeRoutes.children = []

// 3.使用我们的自定义函数,
initRouter(RouterData, homeRoutes.children)

// 实例化路由对象
const router = new VueRouter({
    routes
})

// 暴露路由
export default router