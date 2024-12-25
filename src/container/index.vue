<template>
  <div class="app-wrapper">
    <el-container>

      <Aside ></Aside>

      <el-container>

       <el-header>
         <!--头部-->
         <Header></Header>
       </el-header>

     <el-main>
       <!--        主体-->
       <Main></Main>
     </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import {Header, Aside, Main} from "./index"
export default {
  name: "container",
  components: {
    Header,
    Aside,
    Main
  }
}
</script>