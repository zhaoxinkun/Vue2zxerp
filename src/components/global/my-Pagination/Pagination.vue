<script>
export default {
  name: "Pagination",
  props: {
// 总条数
//     页码
//     页数
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
  }
}
</script>

<template>
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

</template>

<style scoped>

</style>