import {routes} from '@/router'  //路由中的配置对象,目的就是用来找到我们的container,然后往里追加children

import menuData from '@/utils/menuData' //公共路由数据,根据不同的角色进行过滤

import {initRouter} from '@/router/Recursive'  //递归路由的方法

const state = {
    routeData: [] //存储过滤后的路由数据
}
const getters = {
    // 获取过滤后的路由数据
    get_routes: state => state.routeData
}
const mutations = {
    SET_ROUTES: (state, data) => {
        state.routeData = data;
    }
}

const actions = {
    // rolesArr 这里是我们刚刚从user方法中获取的roles数组
    CHANGEROUTES({commit}, rolesArr) {  //rolesArr  [{id:1,name:'input'}]
        return new Promise((resolve, reject) => {
            //1、取出角色
            let rolesName = rolesArr.map(v => v.name);
            //2、从我们的路由数据中选筛选出container,往里准备添加children
            let homeRoutes = routes.filter(v => v.path === '/container')[0];  //{}
            //3、添加children子级
            homeRoutes.children = [];
            //4、动态生成路由数据
            let filterData = [];  //根据角色来数据过滤
            if (rolesName.includes('administrator')) {  //是否是管理员
                filterData = menuData; //是的话,什么都能看到,直接赋值即可
            } else {
                // 过滤的时候,必须有角色,并且,我们路由数据中的roles必须包含你的roles
                filterData = menuData.filter(v => v.roles && rolesName.some(d => v.roles.includes(d)));
            }
            initRouter(filterData, homeRoutes.children);   //将数据转为路由数据
            //vuex缓存一份数据，供导航菜单使用
            commit('SET_ROUTES', filterData);
            resolve(routes); //路由数据
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}


// ['input'].some(v=>['input','approve'].includes(v));  //['input','approve']只要有一个满足input返回true