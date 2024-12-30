<script>
import * as echarts from "echarts";

export default {
  name: "ChartsCom",
  // props接收参数
  props: {
    // 宽
    width: {
      type: String,
      default: "100%"
    },
    // 高
    height: {
      type: String,
      default: "300px"
    },
    // 配置项
    options: {
      type: Object,
      default: () => ({
        title: {
          text: "企业图表"
        },
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
  },
  data() {
    return {
      // 定义变量,用在存储图标实例.不然无法实现响应式
      myChart: null
    }
  },
  computed:{
    // 本地化样式数据
    style (){
      return {
        width: this.width,
        height: this.height
      }
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
    // init渲染方法
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.chart);
      // 实例的配置,这里的数据,应该是使用的时候传递的
      this.myChart.setOption(this.options)
    }
  }
}
</script>

<template>
  <!--  组件容器-->
  <div ref="chart" class="chart" :style="style"></div>
</template>
