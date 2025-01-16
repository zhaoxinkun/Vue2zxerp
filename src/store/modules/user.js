// 获取用户信息
import {userInfo, logout} from "@/api/api";

const state = {
    roles: [] //角色
}

// 类似于计算属性
const getters = {
    // 获取角色
    getRoles: state => state.roles,
}

// 码农
const mutations = {
    // 实际的方法:(state数据,data你actions传递的数据)
    SETROLES: (state, data) => state.roles = data,

}

// 产品经理,通知mutations修改的
const actions = {
    // 产品经理规定的方法:(commit)  commit 唤起
    USERROLES({commit}) {
        return new Promise((resolve, reject) => {
            // 发送用户权限的请求
            userInfo().then(response => {
                let {data} = response.data;
                // 他说,调用真的方法吧
                commit('SETROLES', data.roles)
                resolve(data.roles)
            })
                .catch(error => {
                    reject(error)
                })
        })
    },
    LOGOUT({commit}) { //退出登录
        return new Promise((resolve, reject) => {
            logout().then(res => {
                commit('SETROLES', []);  //清空角色
                resolve();
            }).catch(err => {
                reject(err)
            })
        })
    }
}


export default {
    // namespaced: true, // 开启命名空间
    state,
    getters,
    mutations,
    actions
}