<script>
export default {
  name: "Pagination",
  props: {
    // 总条数
    total: {
      required: true,
      type: Number,
    },
    // 布局
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    // 展示多少条
    seleSizes: {
      type: Array,
      default: [10, 20, 30, 40]
    },
    // 当前页码
    pageNum: {
      type: Number,
      default: 1
    },
    // 显示的条目
    item: {
      type: Number,
      default: 10
    }
  },
  computed: {
    // 这里是因为,我们的当前页是父传过来的,我们不能直接修改,需要使用sync修饰符,注意,使用的使用别忘了加sync
    currentPage: {
      get: function () {
        return this.pageNum;
      },
      set: function (value) {
        this.$emit('update:pageNum', value);
      }
    },
    currentSize: {
      get: function () {
        return this.item;
      },
      set: function (value) {
        this.$emit('update:item', value);
      }
    }
  },
  methods: {
    // 每页多少条变化的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.listQuery.pageSize = val;
      // this.getList();
      this.$emit("action")
    },

    // 页码变化的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // this.listQuery.pageNo = val;
      // this.getList();
      this.$emit("action")
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
    <!--      current-page:当前页码-->
    <!--      size-change每页多少条的函数-->
    <!--      current-change 页码变化的函数-->
    <!--      current-page 当前页码-->
    <!--    currentPage==pageNum-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="seleSizes"
        :page-size.sync="currentSize"
        :layout="layout"
        :total="total"
    >
    </el-pagination>

  </div>

</template>

<style scoped>

</style>