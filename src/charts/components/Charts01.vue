<script>
// 001导入图表模块
import * as echarts from 'echarts';

export default {
  name: "Charts01",
  data() {
    return {
      // 定义变量,用在存储图标实例.不然无法实现响应式
      myChart: null
    }
  },

  mounted() {
    // 使用init方法.创建图表
    this.init()
    // 图表响应式事件
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },

  methods: {
    // 003创建渲染方法
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.charts01);
      // 实例的配置
      this.myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      })
    }
  }

}
</script>

<template>
  <!-- 002创建图表容器 -->
  <div ref="charts01" class="charts01"></div>

</template>

<style scoped>
.charts01 {
  width: 100%;
  height: 300px;
}
</style>
