<template>
      <div class="app-breadcrumb">
        <BreadCrumbs></BreadCrumbs>
        <div class="right-menu">
          <LogOut></LogOut>
        </div>
      </div>
</template>

<script>
import {LogOut,BreadCrumbs} from "@/container/Header/index.js";
export default {
name: "ContainerHeader",
  components:{
    LogOut,
    BreadCrumbs
  }
}
</script>