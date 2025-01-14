<script>
// 导入请求
import {RemoveUser, UserList} from "@/api/api";

// dialog对话框
import TextDialog from "@/components/global/my-Dialog/TextDialog.vue";

export default {
  name: "UserLists",
  components: {
    TextDialog
  },
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
      pages: 0,

      // 弹框的显示与隐藏
      dialogVisible: false,

      // 缓存一些数据
      temp: {},
    }
  },
  mounted() {
    this.getUserListData();
  },
  methods: {
    // 获取表格数据
    async getUserListData() {
      try {
        // 发送请求
        const res = await UserList(this.listQuery);
        console.log("res.data", res.data);
        // 解构数据
        let {code, data} = res.data;
        if (code === 20000) {
          // 存储数据
          this.tableData = data.list;
          // 总条数
          this.rows = data.rows;
          this.pages = data.pages;
        } else {
          this.$notify({
            title: '提示',
            message: '数据更新失败',
            type: 'error'
          });
        }
      } catch (error) {
        this.$notify({
          title: '提示',
          message: '获取一审数据失败',
          type: 'error'
        });
      }
    },

    // 显示弹窗
    DeleUser(row) {

      // 先显示弹框
      this.dialogVisible = true;
      // 然后拿到行数据的用户的id
      this.temp = {...row}
      // 然后发送请求
    },

    // 删除用户数据
    async confirm() {
      // 这里我们拿到id, 发送请求
      let res = await RemoveUser(this.rowID)
      let {code, data} = res.data;
      if (code === 20000) {
        this.$notify({
          type: "success",
          title: "提示",
          message: "删除成功"
        });
        this.dialogVisible = false;
        await this.getUserListData()
        console.log("data is ", data)
      } else {
        this.$notify({
              type: "error",
              title: "提示",
              message: "删除失败"
            }
        )
      }

    }
  },

}
</script>


<template>

  <!--  卡片-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>员工审批员列表</span>
    </div>


    <!--      搜索框  clearable-可清除   input事件,只要输入就触发获取列表-->
    <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入查询用户名"
        v-model="listQuery.name"
        @input="getUserListData()"
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

      <!--      用户名-->
      <el-table-column
          fixed
          prop="account"
          label="用户名"
          column-key="account"
          class="custom-column">
        <!--        :filter-method="filterHandler"-->
      </el-table-column>

      <!--密码-->
      <el-table-column
          prop="password"
          label="用户密码"
          column-key="password">
      </el-table-column>

      <!--创建时间-->
      <el-table-column
          prop="reg_time"
          label="创建时间"
          column-key="reg_time">
        <template slot-scope="scope">
          {{ scope.row.reg_time | formatDate }}
        </template>
      </el-table-column>

      <!--用户权限-->
      <el-table-column
          prop="role_name"
          label="用户权限"
          column-key="role_name">
        <template slot-scope="scope">
          {{ scope.row.role_name | PowerManager }}
        </template>
      </el-table-column>

      <!--      操作-->
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <!--          @click="handleEdit(scope.$index, scope.row)" 自带的,用于获取行信息的数据-->
          <el-button
              size="mini"
              type="danger"
              @click="DeleUser(scope.row)"
              :disabled="scope.row.result === 'pass' "
          >删除
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <!--    分页器-->
    <div class="block">
      <!--      使用分页器组件-->
      <Pagination
          @action="getUserListData"
          :pageNum.sync="listQuery.pageNo"
          :seleSizes="[10, 20, 30, 40]"
          :item.sync="listQuery.pageSize"
          :total="rows"
      >
      </Pagination>
    </div>

    <!--   对话框-->
    <TextDialog
        :dialogTitle="'删除用户'"
        :isVisible.sync="dialogVisible"
        :btnTitle="'删除'"
        @confirm="confirm"
    >
      <!--      confirm emit的方法名字,调用父组件中的DeleteDate方法-->
      <p>{{ "是否删除该用户 ?" }}</p>
    </TextDialog>

  </el-card>

</template>