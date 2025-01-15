import Vue from 'vue'
import App from './App.vue'
// 注册路由
import router from './router'
// 引入组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

// 引入Sass样式
import "@/styles/index.scss"

// 全局组件
import GloCom from "@/views/Home/GlobalCom/GloCom.vue"
import Pagination from "@/components/global/my-Pagination/Pagination.vue"

Vue.component("GloCom", GloCom)
// 分页组件
Vue.component("Pagination", Pagination)

// 使用vuex
import store from "@/store"

// 全局的过滤器
import "@/filter"

// 加载路由拦截
import "@/router/permission"

// 取消开发提示
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
