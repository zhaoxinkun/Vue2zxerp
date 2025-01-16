<!--退出按钮-->
<script>
// 导入api
import {logout} from "@/api/api"
// 清除token
import {getToken, removeToken} from "@/utils/token"
// 消息提示
import {Message} from "element-ui";

// 首先我们自己登录后,自动获取token,准备退出
export default {
  name: "LogOut",
  data() {
    return {
      token: ""
    }
  },
  mounted() {
    // 预先加载token
    this.token = getToken()

  },
  methods: {
    async goBack() {
      // 点击按钮,发送退出请求
      await logout(this.token).then(res => {
        const {code, msg} = res.data
        if (code === 20000) {
          // 弹出消息
          Message({
            message: msg,
            type: "success"
          })
          // 清除token
          removeToken(this.token)
          // 路由跳转
          this.$router.push({path: "/login"})
          this.$store.dispatch("LOGOUT")
        }
      })
    }
  }
}
</script>

<template>
  <el-button type="danger" size="mini" @click="goBack">退出用户</el-button>
</template>
