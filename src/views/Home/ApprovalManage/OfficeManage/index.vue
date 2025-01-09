<script>
// 导入api
// 用于编辑,删除,列表数据,提交
import {officeCreate, officeDelete, officeList, officeSubmit} from "@/api/api";

// 导入对话框
import TextDialog from "@/components/global/my-Dialog/TextDialog.vue";
import FromDialog from "@/components/global/my-Dialog/FromDialog.vue";

export default {
  name: "OfficeManage",
  components: {
    FromDialog,
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

      // 用于删除loading框处理
      dialogDelVisible: false,

      // 用于编辑的dialog处理
      dialogEditVisible: false,

      // 缓存一些数据
      temp: {},
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
        const res = await officeList(this.listQuery);
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
            message: '获取数据失败',
            type: 'error'
          });
        }
      } catch (error) {
        this.$notify({
          title: '提示',
          message: '获取数据失败',
          type: 'error'
        });
      }
    },

    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    // 编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogEditVisible = !this.dialogEditVisible;
      this.temp = {...row}
    },

    // 确定编辑的逻辑
    async EditData() {
      const res = await officeCreate()

    },

    // 删除,用于显示对话框
    handleDelete(index, row) {
      // 点击的时候并不是真正地删除,而是先显示出对话框
      // console.log(index, row);
      this.dialogDelVisible = !this.dialogDelVisible;
      // 方式深拷贝,提前准备删除的id数据
      this.temp = {...row}
    },

    // 确定删除的处理逻辑
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
        await this.getListData()
      }
    },

    // 提交的逻辑
    async handleSubmit(index, row) {
      // 弹出框组件 来自element ui
      this.$confirm('是否确定提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          // 执行提交
          .then(async () => {
            // 发送请求
            let res = await officeSubmit({id: row.id})
            let {code} = res.data;
            if (code === 20000) {
              //通知框组件
              this.$notify({
                title: '提交成功',
                message: '提交成功',
                type: "success",
                duration: 1000
              });
              // 再次请求数据,刷新变化
              await this.getListData();
              await this.$router.push("/approvalProcess/firstInstance")
            }

          })
          // 取消提交
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
    },
  },

  computed: {
    // 状态筛选器的插槽数据
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

      <!--      物品名称-->
      <el-table-column
          prop="apply_goods"
          label="物品名称"
      >
      </el-table-column>

      <!--      申请数量-->
      <el-table-column
          prop="apply_goods_num"
          label="申请数量"
      >
      </el-table-column>

      <!--      申请原因-->
      <el-table-column
          prop="apply_reason"
          label="申请原因"
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
          <!--          @click="handleEdit(scope.$index, scope.row)" 自带的,用于获取行信息的数据-->
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

          <!--          :disabled="scope.row.status === 1" 用于判断是否可以点击(通过它行的信息的状态)-->
          <el-button
              size="mini"
              type="primary"
              @click="handleSubmit(scope.$index, scope.row)"
              :disabled="scope.row.status === 1">提交
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <!--    分页器-->
    <div class="block">
      <!--        分页功能-->
      <!--      layout:需要显示的内容,用逗号分割,-->
      <!--      total:数据总条数,-->
      <!--      sizes:每页显示的页面数量,-->
      <!--      prev:上一页,-->
      <!--      pager:页码列表,-->
      <!--      next:下一页,-->
      <!--      jumper:跳页元素-->
      <!--      page-size:每页显示的数量-->
      <!--      current-page:当前页数-->
      <!--      size-change每页多少条的函数-->
      <!--      current-change 页码变化的函数-->
      <!--      current-page 当前页码-->
      <!--      <el-pagination-->
      <!--          @size-change="handleSizeChange"-->
      <!--          @current-change="handleCurrentChange"-->
      <!--          :current-page="listQuery.pageNo"-->
      <!--          :page-sizes="[10, 20, 30, 40]"-->
      <!--          :page-size="listQuery.pageSize"-->
      <!--          layout="total, sizes, prev, pager, next, jumper"-->
      <!--          :total="rows">-->
      <!--      </el-pagination>-->

      <!--      layout="total, prev, pager, next"-->
      <!--      使用分页器组件-->
      <Pagination
          @action="getListData"
          :pageNum.sync="listQuery.pageNo"
          :seleSizes="[10, 20, 30, 40]"
          :item.sync="listQuery.pageSize"
          :total="rows"
      >

      </Pagination>
    </div>


    <!--    弹框-->
    <!--    <el-dialog-->
    <!--        title="办公审批-删除"-->
    <!--        :visible.sync="dialogDelVisible"-->
    <!--        width="30%"-->
    <!--    >-->
    <!--      <span>你确定要删除嘛?</span>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="dialogDelVisible = false">取 消</el-button>-->
    <!--    <el-button type="primary" @click="DeleteData">确 定</el-button>-->
    <!--  </span>-->
    <!--    </el-dialog>-->

    <!--    编辑的对话框-->
    <!--        <FromDialog-->
    <!--            :dialogTitle="'编辑'"-->
    <!--            :isVisible="dialogEditVisible"-->
    <!--            :btnTile="'确 定'"-->

    <!--         >-->

    <!--        </FromDialog>-->


    <!--    删除的对话框-->
    <TextDialog
        :dialogTitle="'办公审批-删除'"
        :isVisible.sync="dialogDelVisible"
        :btnTitle="'删 除'"
        @confirm="DeleteData"
    >
      <!--      confirm emit的方法名字,调用父组件中的DeleteDate方法-->
      <p>是否删除</p>

    </TextDialog>


  </el-card>

</template>