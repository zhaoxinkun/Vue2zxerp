<!--面包屑-->
<!--思路-->
<!--其实就是获取当前的路由的信息-->
<!--中间的文本是路由的地址,点击的话,跳转到路由的位置-->
<!--注意的是,我们需要把路由数据,存起来-->
<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      RouteData: []
    }
  },
  mounted() {
    this.RouteData=this.$route.matched;
    console.log("RouterData is ",this.RouteData);
  },
  watch:{
    $route(newVal){
      this.RouterMatchedHandle(newVal.matched)
      console.log("RouterData is ",this.RouteData)
    }
  },
  methods:{
    RouterMatchedHandle(info){
      this.RouteData = info;
    }
  }
}
</script>

<template>
  <el-breadcrumb separator="/">
    <span> <i class="el-icon-s-home"> </i>当前位置:</span> &nbsp;&nbsp;
    <el-breadcrumb-item v-for="v in RouteData" :to="{path:v.path}"> {{ v.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>