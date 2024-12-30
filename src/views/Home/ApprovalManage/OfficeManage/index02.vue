<script>
/**
 *  此组件,未使用任何封装的组件,纯第一次写
 *
 * */

// 引入请求
// officeList 表格数据
// officeSubmit 表格提交数据
import {officeList, officeSubmit, officeDelete} from "@/api/api";

export default {
  name: "OfficeManage",
  data() {
    return {
      // 存储请求的表格数据
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

      //总条数
      rows: 0,
      // 当前页码
      pages: 0,
      // 用于删除loading框处理
      dialogDelVisible: false,
      // 缓存一些数据
      temp: {},
    }
  },

  mounted() {
    // 挂载的时候先获取数据
    this.getList();
  },

  methods: {



    // 每页多少条变化的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.pageSize = val;
      this.getList();
    },

    // 页码变化的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.pageNo = val;
      this.getList();
    },


    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },

    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      // 显示提示框
      this.dialogDelVisible = !this.dialogDelVisible;
      // 方式深拷贝
      this.temp = {...row}
    },

    // 删除确定的处理逻辑
    async DeleteData() {
      const res = await officeDelete(this.temp.id);
      let {code} = res.data;
      if (code === 20000) {
        //通知框组件
        this.$notify({
          title: '删除成功',
          message: '删除成功',
          type: "success",
          duration: 1500
        });
        this.dialogDelVisible = !this.dialogDelVisible;
        // 重新刷新数据列表
        await this.getList()
      }
    },

    // 提交的逻辑
    async handleSubmit(index, row) {
      // 弹出框组件 来自element ui
      this.$confirm('是否确定提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await officeSubmit({id: row.id})
        let {code} = res.data;
        if (code === 20000) {
          //通知框组件
          this.$notify({
            title: '提交成功',
            message: '提交成功',
            type: "success",
            duration: 1500
          });
          // 再次请求数据,刷新变化
          await this.getList();
          await this.$router.push("/approvalProcess/firstInstance")
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
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
  },
}
</script>

<template>
  <!--  卡片-->
  <el-card class="box-card">

    <div slot="header" class="clearfix">
      <span>办公申请</span>
    </div>


    <div class="filter-container">

      <!--      搜索框  clearable-可清除   input事件,只要输入就触发获取列表-->
      <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入查询用户名"
          v-model="listQuery.name"
          @input="getList()"
          clearable
          style="width: 100%;"
          size="medium"
      >
      </el-input>

      <!--表格   stripe-斑马纹-->
      <el-table
          :data="tableData"
          style="width: 100%"
          stripe
      >

        <el-table-column
            fixed
            type="index"
            label="序号"
        >
        </el-table-column>

        <el-table-column
            fixed
            prop="account"
            label="申请人"
            column-key="account"
            :filter-method="filterHandler"
            class="custom-column">
        </el-table-column>

        <el-table-column
            prop="created"
            label="申请时间"
            column-key="created">
          <template slot-scope="scope">
            {{ scope.row.created | formatDate }}
          </template>
        </el-table-column>

        <el-table-column
            prop="apply_goods"
            label="物品名称"
        >
        </el-table-column>

        <el-table-column
            prop="apply_goods_num"
            label="申请数量"
        >
        </el-table-column>

        <el-table-column
            prop="apply_reason"
            label="申请原因"
        >
        </el-table-column>

        <!--        filters 过滤出所有的状态并去重  filter-method 筛选的逻辑-->
        <el-table-column
            prop="status"
            label="审批状态"
            :filters="StatusMenu"
            :filter-method="filterHandler"
        >
          <!--          作用域插槽-->
          <template slot-scope="scope">
            <!--            使用全局过滤器-->
            <el-tag :type="scope.row.status | statusStyle"> {{ scope.row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>


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

    </div>

    <!--        对话框,一开始是不显示的-->
    <el-dialog
        title="提示"
        :visible.sync="dialogDelVisible"
        width="30%">
      <span>你确定要删除该数据吗</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDelVisible = false">取 消</el-button>
        <!--        执行真正的删除-->
            <el-button type="primary" @click="DeleteData">确 定</el-button>
          </span>
    </el-dialog>


    <div class="block">

      <!--      size-change每页多少条的函数-->
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
