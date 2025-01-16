<!--这里相当于一个Menu组件-->
<!--我们需要做的是:-->
<!--1.拿到菜单数据-->
<!--2.把菜单数据传给MenuItem组件-->

<script>
// 导入菜单数据
import Items from "@/utils/menuData"

// 导入菜单组件
import MenuItem from "./MenuItem.vue"
import {mapGetters} from "vuex";

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
  computed: {
    ...mapGetters(["get_routes"])
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
}
</script>

<template>

  <!--  @open="handleOpen"-->
  <!--  @close="handleClose"-->
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo el-menu"
      router
      exact
  >

    <!--    使用自己的菜单组件-->
    <MenuItem v-for="item in get_routes" :key="item.url" :item="item"></MenuItem>


  </el-menu>
</template>
