<template>

    <el-aside  width="200px" class="aside">
      <Menu></Menu>
    </el-aside>

</template>

<script>
import Menu from './Menu/Menu.vue'
export default {
  name: "ContainerAside",
  components: {
    Menu
  }
}
</script>
