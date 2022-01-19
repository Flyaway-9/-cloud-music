<template>
  <div id="app">
    <el-container>
      <el-header><top/></el-header>
      <el-container>
        <el-aside width="200px">
          <aside-bar></aside-bar>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-footer><bottom/></el-footer>
  </div>
</template>

<script>
import Top from "./views/top/Top.vue";
import AsideBar from "./views/aside/Aside.vue";
import Bottom from "./views/bottom/Bottom.vue";

export default {
  components: {
    Top,
    AsideBar,
    Bottom,
  },
};
</script>
<style scoped>
@import "./assets/css/normalize.css";
.el-aside {
  height: calc(100vh - 120px);
  border-right: 1px solid #e6e6e6
}

</style>
