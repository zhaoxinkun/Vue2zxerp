<script>
export default {
  name: "MenuItem",
  props:[ "item"],
}
</script>

<template>
  <div>
    <!--    这里是你的数据没有children的情况-->
    <!--      无子集-->
    <el-menu-item :index="item.url" v-if="!item.children">
      <i :class="item.icon"></i>
      <span slot="title" class="title">{{ item.title }}</span>
    </el-menu-item>

    <!--    这里是你的数据有children的情况-->
    <!--      有子集-->
    <el-submenu :index="item.url" v-else>
      <template slot="title">
        <i :class="item.icon"></i>
        <span class="title">{{item.title}}</span>
      </template>
      <!--   这里进行递归出子集-->
      <!--   这里的数据,应该是你的children数据-->
      <MenuItem v-for="ItemChildren in item.children" :key="ItemChildren.url" :item="ItemChildren"></MenuItem>
    </el-submenu>
  </div>

</template>

<style scoped>

</style>