import {userInfo} from "@/api/api";

const state = {
    roles: [] //角色
}

// 类似于计算属性
const getters = {
    // 获取角色
    getRoles: state => state.roles,

}
const mutations = {
    // 实际的方法:(state数据,data你actions传递的数据)
    SETROLES: (state, data) => state.roles = data,

}

// 产品经理,通知mutations修改的
const actions = {
    // 产品经理规定的方法:(commit)
    USERROLES({commit}) {
        return new Promise((resolve, reject) => {
            userInfo().then(response => {
                console.log(response)
                let {data} = response.data;
                // 他说,调用真的方法吧
                commit('SETROLES', data)
                resolve(response.roles)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}