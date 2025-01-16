// 实现路由的拦截
import router from '@/router'
import store from '@/store'

//路由拦截
router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') { //是登录页
        next()
    } else {  //不是登录页
        let R = store?.getters.getRoles?.length > 0; //是否有缓存
        if (R) { //判断用户角色  role = 角色缓存  vuex
            //有角色
            next()
        } else { //没有角色
            //1、请求的发送 获取角色
            let roles = await store.dispatch('USERROLES'); //调用actions - USERROLES
            console.log('roles:', roles)
            //2、vuex过滤和处理数据
            let filterRoutes = await store.dispatch('CHANGEROUTES', roles);
            router.addRoutes(filterRoutes);  //router.addRoute()
            if (roles) {
                next({path: to.path});
            } else {
                next({path: '/login'});  //没有角色回到登录
            }
        }
    }
})

//next()  //a页面到b页面  next({path:'/c'})  //a页面到c页面