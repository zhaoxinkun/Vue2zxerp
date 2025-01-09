<script>

// 导入所有员工二次封装的数据 因为还要复用
import {getEmployeeData} from "@/utils/EmployeeData";

// 导入提交申请的api
import {travelList} from "@/api/api";


export default {
  name: "TravelApply",

  // 一上来先获取员工数据列表信息
  async mounted() {
    // 发送获取员工名单的请求
    try {
      this.EmployeeData = await getEmployeeData()
    } catch (error) {
      // 提示
      this.$notify({
        title: '提示',
        message: '获取员工数据失败',
        type: 'error'
      });
    }
  },

  // form表单数据
  data() {
    return {
      // 请求过来的员工列表数据
      EmployeeData: [],

      // 表单的数据
      ruleForm: {
        // 申请人
        applicant: "",
        // 申请时间
        created: "",
        // 申请的天数
        travel_day: 1,
        // 报销的金额
        money: "",
        // 发票文件
        bill: "",
        // 省市信息
        destination: []
      },

      // 校验规则
      rules: {
        // 用户名   --必填的标志不显示
        applicant: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
        ],
        // 时间
        created: [
          {type: 'date', required: true, message: '请选择申请时间', trigger: 'blur'}
        ],
        // 申请的天数
        travel_day: [
          {required: true, message: '请选择申请的天数', trigger: 'blur'}
        ],
        // 报销的金额
        money: [
          {required: true, message: '请输入报销的金额', trigger: 'blur'}
        ],
        // 原因
        bill: [
          {required: true, message: '请填写申请上传文件', trigger: 'blur'}
        ]
      }
    };
  },

  methods: {
    // 收集表单数据----提交申请
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送请求
          let response = await travelList(this.ruleForm);
          // 结构数据
          let {code, data} = response.data;
          if (code === 20000) {
            // 跳转路由
            await this.$router.push("/approvalManage/TravelManage")
            // 提示
            this.$notify({
              title: '申请成功',
              message: '你已申请成功等待审批',
              type: 'success'
            });
          }

        } else {
          this.$notify({
            title: '申请失败',
            message: '申请失败,请查看表单数据数据重新提交',
            type: 'error'
          });
          return false;
        }
      });
    },

    // 取消申请---element ui 的重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}

</script>

<template>
  <!--card卡片-->
  <el-card class="box-card">

    <!--      卡片头部-->
    <div slot="header" class="clearfix">
      <span>差旅申请</span>
    </div>

    <!--  from表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="申请用户" prop="applicant">
        <el-select v-model="ruleForm.applicant" placeholder="请选择申请人" style="width: 100%">
          <!--          遍历员工列表数据-->
          <el-option v-for="val in EmployeeData" :key="val.id" :label="val.account" :value="val.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="申请日期" prop="created">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.created"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>


      <el-form-item label="出差天数" prop="travel_day">
        <el-input-number v-model="ruleForm.travel_day" :min="1" :max="50" label="出差天数"></el-input-number>
      </el-form-item>


      <el-form-item label="报销金额" prop="money">
        <el-input v-model="ruleForm.money" placeholder="请输入报销金额" style="width: 100%"></el-input>
      </el-form-item>


      <!--      文件上传-->
      <el-form-item label="发票文件" prop="bill">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"

            list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>


      <!--      表单按钮-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm');" plain>立即申请</el-button>
        <el-button @click="resetForm('ruleForm')">取消申请</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>

