<template>

    <el-header>
      <div class="app-breadcrumb">

        <div class="right-menu">
          <LogOut></LogOut>
        </div>
      </div>

    </el-header>

</template>

<script>
import LogOut from "@/container/Header/LogOut.vue";
export default {
name: "ContainerHeader",
  components:{
    LogOut
  }
}
</script>

<style scoped>

</style>