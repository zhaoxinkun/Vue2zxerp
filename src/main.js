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


// 取消开发提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
