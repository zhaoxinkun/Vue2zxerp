<script>
// 导入我们封装的api
import {login} from "@/api/api"

// 导入md5
import md5 from "md5"

// 存入token
import {setToken} from "@/utils/token";

export default {
  name: "login",
  data() {
    return {
      // 表单数据
      ruleForm: {
        account: "admin",
        password: "admin@123"
      },
      // 基本的表单校验
      rules: {
        // 账号
        account: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        // 密码
        password: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    // 提交方法
    submitForm(formName) {
      // UI自带的校验
      this.$refs[formName].validate(async valid => {
        // 校验通过
        if (valid) {
          // 密码加密
          this.ruleForm.password = md5(this.ruleForm.password)
          // 异步请求发送
          const res = await login(this.ruleForm)
          // 解构结果
          const {code, data} = res.data

          if (code === 20000) {
            // 封装返回的token,调用setToken方法
            setToken(data.token)
            // 路由跳转
            await this.$router.push({path: "/container"})
          }
          // console.log("login setToken is ", token)
          // console.log("login res is ", res)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>


<template>

  <div class="login-head">
    <!--    图片位置-->
    <div class="login-img"></div>

    <!--    中间的表单-->
    <div class="about">

      <h3>通用流程管理系统</h3>
      <!--      form表单-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <!--        用户名-->
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>

        <!--        密码-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <!--      按钮-->
        <el-form-item class="login-button">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>