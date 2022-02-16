<template>
  <el-menu style=" height: 100%" :default-openeds='openeds'>
    <el-menu-item
      @click="tabChange('/findMusic')"
      :class="{ routeractive: findmusicActive }"
    >
      <i class="iconfont icon-yinle"></i>
      <span class="aside-item">发现音乐</span>
    </el-menu-item>
    <el-menu-item
      @click="tabChange('/video')"
      :class="{ routeractive: videoActive }"
    >
      <i class="iconfont icon-video"></i>
      <span class="aside-item">视频</span>
    </el-menu-item>
    <!-- <el-menu-item>
      <i class="iconfont icon-airudiantubiaohuizhi-zhuanqu_zixundongtai"></i>
      <span class="aside-item">动态</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-sirenfm-copy-copy"></i>
      <span class="aside-item">私人FM</span>
    </el-menu-item> -->
    <!-- <el-menu-item @click="tabChange('/recentPlay')" :class="{routeractive: recentActive}">
      <i class="iconfont icon-zuijinbofang" ></i>
      <span class="aside-item">最近播放</span>
    </el-menu-item> -->
    <!-- <el-menu-item>
      <i class="iconfont icon-wodeshoucang"></i>
      <span class="aside-item">我的收藏</span>
    </el-menu-item> -->
    <el-menu-item
      @click="itemClick(likeList.id)"
      :class="{ routeractive: likeList.id === clickId }"
      v-if="getProfile"
    >
      <i class="iconfont icon-aixin"></i>
      <span class="aside-item">我喜欢的音乐</span>
    </el-menu-item>
    <el-submenu index="1" v-if="getProfile">
      <template slot="title">
        <i class="iconfont icon-wodegedan"></i>
        <span class="aside-item">我的歌单</span>
      </template>
      <el-submenu index="1-1">
        <template slot="title">我创建的歌单</template>
        <el-menu-item
          class="list-name"
          v-for="(item, index) in mylist"
          :key="index"
          @click="itemClick(item.id)"
          :class="{ routeractive: item.id === clickId }"
          >{{ item.name }}</el-menu-item
        >
      </el-submenu>
      <el-submenu index="1-2" >
        <template slot="title">我收藏的歌单</template>
        <el-menu-item
          class="list-name"
          v-for="(item, index) in collectlist"
          :key="index"
          @click="itemClick(item.id)"
          :class="{ routeractive: item.id === clickId }"
          >{{ item.name }}</el-menu-item
        >
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getUserPlayList } from "network/profile.js";
import { mapGetters } from "vuex";
import { Bus } from "utils/eventBus.js";
export default {
  name: "Aside",
  data() {
    return {
      likeList: [],
      clickId: null,
      mylist: [],
      collectlist: [],
      openeds: ['1', '1-1', '1-2'], 
    };
  },
  inject: ["reload"],
  mounted() {
    // console.log(this.$route);
    getUserPlayList(this.getProfile.userId).then((res) => {
      console.log(res);
      this.likeList = res.data.playlist.shift();
      this.mylist = res.data.playlist.filter((item) => {
        return item.userId === this.getProfile.userId;
      });
      this.collectlist = res.data.playlist.filter((item) => {
        return item.userId !== this.getProfile.userId;
      });
    });
  },
  methods: {
    tabChange(path) {
      this.clickId = null;
      if (this.$route.path.indexOf(path)) {
        this.$router.push({ path: path });
      }
    },
    itemClick(id) {
      Bus.$emit("toTop", 0);
      this.clickId = id;
      this.$router.push({ path: "/listDetail", query: { id: id } });
      this.reload();
    },
  },
  computed: {
    ...mapGetters(["getProfile"]),
    videoActive() {
      return (
        this.$route.matched.length && this.$route.matched[0].path === "/video"
      );
    },
    findmusicActive() {
      return (
        this.$route.matched.length &&
        this.$route.matched[0].path === "/findMusic"
      );
    },
    recentActive() {
      return (
        this.$route.matched.length &&
        this.$route.matched[0].path === "/recentPlay"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.list-name {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.routeractive {
  color: #409eff !important;
  pointer-events: none;
}
.el-menu-item {
  border: none;
}
.iconfont {
  /* color: #409EFF; */
  font-size: 24px;
}
.aside-item {
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.el-menu-item:hover {
  color: #409eff;
}
/deep/.el-submenu__title:hover {
  color: #409eff !important;
}
</style>
