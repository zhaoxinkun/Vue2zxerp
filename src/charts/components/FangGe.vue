<script>
// 导入数字滚动插件
import CountTo from "vue-count-to"

export default {
  name: "FangGe",
  data() {
    return {
      // 数字滚动的配置  开始数字,结束数字,持续时间
      ListData: [
        // startVal  开始数字   endVal 结束数字 duration 持续时间  name 名字 color 颜色
        {
          startVal: 0, endVal: 8888, duration: 40000, name: "企业回报率", color: "#1f7aa8"
        },
        {
          startVal: 0, endVal: 6666, duration: 50000, name: "企业回报率", color: "#c04b8e"
        },
        {
          startVal: 0, endVal: 7777, duration: 60000, name: "企业回报率", color: "#411728"
        },
        {
          startVal: 0, endVal: 8888, duration: 70000, name: "企业回报率", color: "#bd7840"
        },
        {
          startVal: 0, endVal: 9999, duration: 48000, name: "企业回报率", color: "#42e14f"
        },
        {
          startVal: 0, endVal: 8756, duration: 80000, name: "企业回报率", color: "#c0be34"
        }]
    };
  },
  components: {
    // 使用数字滚动插件
    CountTo
  }
};
</script>

<template>
  <!-- 这是内容区域一 -->
  <!--  列-->
  <el-row :gutter="10" class="panel-group">

    <!--    行-->
    <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col" v-for="(item,index) in ListData" :key="index">

      <div class="card-panel" :style="{ background: item.color }">

        <div class="card-panel-description">

          <!--          字体-->
          <div class="card-panel-text"> {{ item.name }}</div>

          <!--        数字-->
          <countTo :startVal='item.startVal' :endVal='item.endVal' :duration='item.duration'
                   class="card-panel-num">
          </countTo>

        </div>

      </div>

    </el-col>

  </el-row>

</template>
