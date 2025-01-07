<script>
// 导入所有员工二次封装的数据 因为还要复用
import {getEmployeeData} from "@/utils/EmployeeData";
export default {
  name: "FromDialog",
  async mounted() {
    // 发送获取员工名单的请求
    try {
      this.EmployeeData = await getEmployeeData()
      console.log("获取员工列表成功")
    } catch (error) {
      console.log("获取员工列表成功失败", error)
    }
  },
  props: {
    // 标题
    FromDialogTitle: {
      type: String,
      default: "FromDialog Title"
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    btnTitle: {
      type: String,
      default: "确 定"
    },
    ruleForm: {
      type: Object,
      // required: true,
      default: {
        applicant: "akin",
        created: "",
        apply_goods: "笔记本",
        apply_goods_num: "1",
        apply_reason: "暂无",
      }
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
      // 物品
      apply_goods: [
        {required: true, message: '请选择申请的物品', trigger: 'blur'}
      ],
      // 数量
      apply_goods_num: [
        {required: true, message: '请选择申请数量', trigger: 'blur'}
      ],
      // 原因
      apply_reason: [
        {required: true, message: '请填写申请原因', trigger: 'blur'}
      ]
    }
  },
  methods: {
    // 取消
    cancel() {
      // 需要关闭对话框,isVisible休要修改,但是他在父组件里,所以使用$emit
      this.$emit("update:isVisible", false);
    },
    // 确定
    confirm() {
      this.$emit("confirm")
    }
  }
}
</script>

<template>
  <el-dialog :title="FromDialogTitle" :visible.sync="isVisible" :before-close="cancel">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="申请用户" prop="applicant">
        <el-select v-model="ruleForm.applicant" placeholder="请选择申请人" style="width: 100%">
          <!--          遍历员工列表数据-->
          <el-option v-for="val in EmployeeData" :key="val.id" :label="val.account" :value="val.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="申请时间" prop="created">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.created"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>


      <el-form-item label="申请物品" prop="apply_goods">
        <el-select v-model="ruleForm.apply_goods" placeholder="请选择申请物品" style="width: 100%">
          <!--          模拟静态数据-->
          <el-option v-for="val in apply_goods" :key="val.key" :label="val.goods_name" :value="val.key"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="申请数量" prop="apply_goods_num">
        <el-input-number v-model="ruleForm.apply_goods_num" :min="1" :max="50" label="申请数量"></el-input-number>
      </el-form-item>


      <el-form-item label="申请描述" prop="apply_reason">
        <el-input type="textarea" v-model="ruleForm.apply_reason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cencel">取 消</el-button>
      <el-button type="primary" @click="confirm">{{ btnTitle }}</el-button>
    </div>
  </el-dialog>
</template>


