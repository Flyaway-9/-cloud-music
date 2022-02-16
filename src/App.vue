<template>
  <div id="app" style="width: 100%; margin: 0 auto; min-width: 1440px">
    <el-container>
      <el-header><top /></el-header>
      <el-container class="main-container">
          <el-aside width="200px" style="padding-top: 20px">
            <el-scrollbar 
        style="height: 100%"
            class="escroll"
            :native="false">
            <aside-bar></aside-bar>
        </el-scrollbar>

          </el-aside>
        <el-main class="elmain">
          <el-scrollbar
            style="height: 100%"
            class="escroll"
            :native="false"
            ref="scroll"
          >
            <!-- <keep-alive exclude="find"> -->
            <router-view v-if="isRouterAlive"></router-view>
            <!-- </keep-alive> -->
          </el-scrollbar>
          <vue-dialog> </vue-dialog>
          <song-detail-dialog></song-detail-dialog>
        </el-main>
      </el-container>
    </el-container>
    <el-footer class="foot" style="height: 70px"><bottom /></el-footer>
  </div>
</template>

<script>
import Top from "./views/top/Top.vue";
import AsideBar from "./views/aside/Aside.vue";
import Bottom from "./views/bottom/Bottom.vue";
import VueDialog from "components/common/vuedialog/VueDialog.vue";
import SongDetailDialog from "components/common/songdetail/SongDetailDialog.vue";
import { Bus } from "utils/eventBus.js";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  components: {
    Top,
    AsideBar,
    Bottom,
    VueDialog,
    SongDetailDialog,
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {
    Bus.$on("toTop", (res) => {
      this.$refs.scroll.wrap.scrollTop = res;
    });
  },
};
</script>
<style lang="less">
.el-popover{
  padding: 10px 0 !important;
  /* margin: 0; */
  transition:all 0.8s ;
}
#app {
  position: relative;
  height: 100vh;
}
@import "./assets/css/normalize.css";
.el-aside {
  height: calc(100vh - 120px);
  border-right: 1px solid #e6e6e6;
}
.elmain {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}

.main-container {
  height: calc(100vh - 130px);
}
.foot {
  position: absolute;
  width: 100%;
  bottom: 0px;
  border-top: 1px solid #e6e6e6;
}
.v-modal {
  width: 0 !important;
}
</style>
