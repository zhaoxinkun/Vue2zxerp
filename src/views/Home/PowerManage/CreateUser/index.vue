<script>
import {getEmployeeData} from "@/utils/EmployeeData";

export default {
  name: "CreateUser",

  data() {
    // 自定义校验
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else {
        if (this.ruleForm.password2 !== this.ruleForm.password) {
          callback(new Error('两次输入不一致'));
        }
        callback();
      }
    };
    return {
      // 员工数据
      EmployeeData: [],

      // 表单数据
      ruleForm: {
        account: "",
        password: "",
        password2: "",
        // 员工是2 ,管理员是3
        role_id: '2',
        // 审批权限分配
        permission: [],
        permissions: ["一审", "二审", "终审"]
      },
      rules: {
        account: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        password2: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
      },
    }
  },


  async mounted() {
    // 获取员工列表数据
    try {
      this.EmployeeData = await getEmployeeData()
    } catch (error) {
      // 提示
      this.$notify({
        title: '提示',
        message: '获取员工列表信息失败',
        type: 'error'
      });
    }
  },
  methods: {
    handleRadioChange() {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.hasAttribute('aria-hidden')) {
        activeElement.blur();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<template>
  <el-card class="box-card">

    <!--    卡片头-->
    <div slot="header" class="clearfix">
      <span>创建员工和用户</span>
    </div>

    <!--表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <!--      用户名-->
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写用户名"></el-input>
      </el-form-item>


      <!--      密码-->
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请填写密码" type="password"></el-input>
      </el-form-item>


      <!--      确认密码-->
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="ruleForm.password2" placeholder="请填写确认密码" type="password"></el-input>
      </el-form-item>


      <!--      权限分配-->
      <el-form-item label="权限分配" prop="role_id">
        <el-radio-group v-model="ruleForm.role_id" id="radio-group" @change="handleRadioChange">
          <el-radio label="2" border>员工</el-radio>
          <el-radio label="3" border>审批管理员</el-radio>
        </el-radio-group>
      </el-form-item>


      <!--      审批权限分配-->
      <el-form-item label="审批权限分配" prop="permission" v-show="ruleForm.role_id ==3">
        <div>
          <el-checkbox-group v-model="ruleForm.permission">
            <el-checkbox-button v-for="item in ruleForm.permissions" :label="item" :key="item">{{
                item
              }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>


  </el-card>
</template>