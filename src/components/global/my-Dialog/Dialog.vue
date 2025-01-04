<script>
export default {
  name: "Dialog",
  props: {
    // 标题
    dialogTitle: {
      type: String,
      default: "Dialog Title"
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    btnTitle: {
      type: String,
      default: "确 定"
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
  <el-dialog
      title="dialogTitle"
      :visible.sync="isVisible"
      width="30%"
      :before-close="cancel"
  >
    <!--    使用插槽,并给予默认值-->
    <slot>
      <p>确定删除?</p>
    </slot>

    <span slot="footer" class="dialog-footer">
    <!--      两个事件-->
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="confirm">{{ btnTitle }}</el-button>
  </span>
  </el-dialog>
</template>


