<!--这里相当于一个Menu组件-->
<!--我们需要做的是:-->
<!--1.拿到菜单数据-->
<!--2.把菜单数据传给MenuItem组件-->

<script>
// 导入菜单数据
import Items from "@/utils/menuData"

// 导入菜单组件
import MenuItem from "./MenuItem.vue"

export default {
  name: "index",
  // 本地化菜单数据
  data() {
    return {
     Items
    }
  },
  components: {
    MenuItem
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<template>

  <el-menu
      default-active="/index"
      class="el-menu-vertical-demo el-menu"
      router
      exact
      @open="handleOpen"
      @close="handleClose">

<!--    使用自己的菜单组件-->
    <MenuItem v-for="item in Items"  :key="item.url" :item="item"></MenuItem>


  </el-menu>
</template>
