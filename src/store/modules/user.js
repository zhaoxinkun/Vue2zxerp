// 获取用户信息
import {userInfo, logout} from "@/api/api";

const state = {
    // 储存用户的角色信息
    roles: [] //角色
}

// 类似于计算属性
const getters = {
    // 读取用户的角色
    getRoles: state => state.roles,
}

// 码农 ------唯一的修改数据的方式
const mutations = {
    // 码农实际执行的方法:(state数据,data你actions传递的数据)
    SETROLES: (state, data) => state.roles = data,

}

// 产品经理,通知码农mutations修改的,唯一的提交修改数据的方式

const actions = {
    // 产品经理规定的方法:(commit)  commit 唤起
    // 获取用户的角色信息
    USERROLES({commit}) {
        return new Promise((resolve, reject) => {
            // 发送用户权限的请求
            userInfo().then(response => {
                let {data} = response.data;
                // 他说,调用真的方法吧,把涵盖的用户的信息存起来了,并赋值给roles
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