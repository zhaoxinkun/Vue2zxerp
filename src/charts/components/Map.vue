<script>
// 导入地图
import * as echarts from "echarts"
// 导入地图数据
import ChinaMap from "@/assets/json/china.json"
// 导入请求
import {employMap} from "@/api/api";

export default {
  name: "Map",
  data() {
    return {
      // 存储数据
      employMapData: [],
      // 配置项数据
      options: {
        // 悬浮提示
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ( / 人)'
        },
        // 配置
        series: [
          {
            type: "map",
            mapType: "china",
            // 标签样式
            label: {
              show: true,
              color: "#fff",
              fontsize: 12
            },
            itemStyle: {
              areaColor: "#5e84fd",
              borderColor: "#fff"
            },
            // 数据条数据
            data: this.employMapData || [
              {
                "name": "北京",
                "value": 1081
              },
              {
                "name": "上海",
                "value": 400
              },
              {
                "name": "湖北",
                "value": 280
              },
              {
                "name": "广东",
                "value": 450
              },
              {
                "name": "四川",
                "value": 46
              },
              {
                "name": "黑龙江",
                "value": 3
              },
              {
                "name": "吉林",
                "value": 24
              },
              {
                "name": "辽宁",
                "value": 5
              },
              {
                "name": "内蒙古",
                "value": 14
              },
              {
                "name": "天津",
                "value": 26
              },
              {
                "name": "河北",
                "value": 110
              },
              {
                "name": "山东",
                "value": 153
              },
              {
                "name": "山西",
                "value": 35
              },
              {
                "name": "河南",
                "value": 26
              },
              {
                "name": "江苏",
                "value": 436
              },
              {
                "name": "浙江",
                "value": 64
              },
              {
                "name": "福建",
                "value": 226
              },
              {
                "name": "台湾",
                "value": 15
              },
              {
                "name": "海南",
                "value": 54
              },
              {
                "name": "安徽",
                "value": 426
              },
              {
                "name": "陕西",
                "value": 26
              },
              {
                "name": "重庆",
                "value": 150
              },
              {
                "name": "贵州",
                "value": 243
              },
              {
                "name": "云南",
                "value": 16
              },
              {
                "name": "甘肃",
                "value": 2
              },
              {
                "name": "青海",
                "value": 5
              },
              {
                "name": "西藏",
                "value": 11
              },
              {
                "name": "新疆",
                "value": 446
              },
              {
                "name": "湖南",
                "value": 5
              },
              {
                "name": "江西",
                "value": 11
              },
              {
                "name": "广西",
                "value": 6
              }
            ]
          },
        ],
        // 侧边数据条
        visualMap: {
          min: 1,
          max: 100,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
      },
    }
  },
  methods: {
    MapInit() {
      let myChart = echarts.init(this.$refs.myChart);
      // 注册地图
      echarts.registerMap('china', ChinaMap);

      myChart.setOption(this.options)
      // 响应式
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    }
  },
  async beforeMount() {
    // 发送请求
    const res = await employMap()
    // 拿到数据
    const {code, data} = res.data;
    if (code === 20000) {
      this.employMapData = data
      this.MapInit()
    }
  }
}
</script>

<template>
  <div class="myChart" ref="myChart"></div>
</template>

<style scoped>
.myChart {
  width: 100%;
  height: 500px;
}
</style>