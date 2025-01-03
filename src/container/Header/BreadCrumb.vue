<!--面包屑-->
<!--思路-->
<!--其实就是获取当前的路由的信息-->
<!--中间的文本是路由的地址,点击的话,跳转到路由的位置-->
<!--注意的是,我们需要把路由数据,存起来-->
<script>
export default {
  name: "BreadCrumb",
  watch: {
    breadcrumbs(newVal) {
      console.log("newVal", newVal)
    }
  },
  computed: {
    breadcrumbs() {
      return this.$route.matched.map(route => ({
        path: route.path,
        breadcrumb: route.meta.breadcrumb
      }))
    }
  },
}
</script>

<template>
  <el-breadcrumb separator="/">
    <span> <i class="el-icon-s-home"> </i>当前位置:</span> &nbsp;&nbsp;
    <el-breadcrumb-item v-for="(crumb,index) in breadcrumbs" :key="index"
                        :to="(index !== 1 && index !==breadcrumbs.length-1) ? crumb.path : undefined">
      {{ crumb.breadcrumb }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>