<script>
import {leaveList} from "@/api/api";

export default {
  name: "LeaveManage",
  data() {
    return {
      // 表格数据
      tableData: [],

      // 分页查询参数
      listQuery: {
        // 查询页码
        pageNo: 1,
        // 一页几个
        pageSize: 10,
        // 查询条件
        name: ""
      },

      // 总条数
      rows: 0,
      // 页码
      pages: 0
    }
  },
  mounted() {
    this.getListData();
  },
  methods: {
    // 获取表格数据
    async getListData() {
      try {
        // 发送请求
        const res = await leaveList(this.listQuery);
        // 解构数据
        let {code, data} = res.data;
        if (code === 20000) {
          // 存储数据
          this.tableData = data.list;
          console.log(data.list)
          // 总条数
          this.rows = data.rows;
          this.pages = data.pages;
        } else {
          console.log("获取办公审批列表失败");
        }
      } catch (error) {
        console.error("请求发生错误：", error);
      }
    },

    // 筛选处理函数
    filterHandler(value, row, column) {
      // value 就是我们的状态值
      // row是我们的表行数据的信息
      // console.log(" is ",value)
      // console.log("row is ",row)
      // console.log("column is ",column)
      const property = column['property'];
      return row[property] === value;
    },

    // 每页多少条变化的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.pageSize = val;
      this.getListData();
    },

    // 页码变化的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.pageNo = val;
      this.getListData();
    },
  },
  computed: {
    // 状态的插槽数据
    StatusMenu() {
      // 数组对象的去重
      // 创建map
      let map = new Map();
      // 遍历数据
      for (let item of this.tableData) {
        // 避免修改源数据
        let v = {...item};
        // 看看有没有
        if (!map.has(v)) {
          // 文本格式化,使用我们的过滤器,传入数据
          v.text = this.$options.filters["statusFilter"](v.status)
          // 放进去
          map.set(v.status, v);
        }
      }
      // 放进新的data中
      const data = [...map.values()];
      return data.map(item => ({
        text: item.text,
        value: item.status
      }))
    }
  }

}
</script>


<template>

  <!--  卡片-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>办公申请</span>
    </div>

    <!--      搜索框  clearable-可清除   input事件,只要输入就触发获取列表-->
    <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入查询用户名"
        v-model="listQuery.name"
        @input="getListData()"
        clearable
        style="width: 100%;"
        size="medium"
    >
    </el-input>

    <!--表格   stripe斑马纹-->
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">

      <!--      序号-->
      <el-table-column
          fixed
          type="index"
          label="序号"
      >
      </el-table-column>

      <!--      申请人-->
      <el-table-column
          fixed
          prop="account"
          label="申请人"
          column-key="account"
          class="custom-column">
        <!--        :filter-method="filterHandler"-->
      </el-table-column>

      <!--申请时间-->
      <el-table-column
          prop="created"
          label="申请时间"
          column-key="created">
        <template slot-scope="scope">
          {{ scope.row.created | formatDate }}
        </template>
      </el-table-column>

      <!--      请假天数-->
      <el-table-column
          prop="leave_days"
          label="请假天数"
      >
      </el-table-column>

      <!--      请假原因-->
      <el-table-column
          prop="leave_reason"
          label="请假原因"
      >
      </el-table-column>

      <!--      申请状态 filters 过滤出所有的状态并去重  filter-method 筛选的逻辑-->
      <el-table-column
          prop="status"
          label="审批状态"
          :filters="StatusMenu"
          :filter-method="filterHandler"
      >
        <!--          作用域插槽-->
        <template slot-scope="scope">
          <!--            使用全局过滤器  -->
          <!--          status +statusStyle 根据状态样式过略-->
          <!--          status +statusFilter 状态的显示内容-->
          <el-tag :type="scope.row.status | statusStyle" disable-transitions> {{ scope.row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>


      <!--      操作-->
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">

          <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>

          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>

          <el-button
              size="mini"
              type="primary"
              @click="handleSubmit(scope.$index, scope.row)"
              :disabled="scope.status === 0">提交
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <!--    使用分页组件-->
    <div class="block">
      <!--        分页功能-->
      <!--      layout:需要显示的内容布局方式,用逗号分割,-->
      <!--      total:数据总条数,-->
      <!--      sizes:每页显示的页面数量,-->
      <!--      prev:上一页,-->
      <!--      pager:页码列表,-->
      <!--      next:下一页,-->
      <!--      jumper:跳页元素-->
      <!--      page-size:每页显示的数量-->
      <!--      current-page:当前页数-->
      <!--      size-change每页展示多少条的函数-->
      <!--      current-change 页码变化的函数-->
      <!--      current-page 当前页码-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rows">
      </el-pagination>
    </div>

  </el-card>

</template>