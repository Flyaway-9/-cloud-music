<template>
  <el-drawer
    title="我是标题"
    :visible.sync="visibleDialog"
    :with-header="false"
    :modal="false"
    class="vue-dialog"
    size="100%"
    :show-close="false"
  >
    <div class="overflowAuto">
      <div class="dialog-header">
        <div class="dialog-header-item">
          <span class="dialog-header-title">当前播放</span>
          <span class="dialog-count">共{{ songsCount }}首</span>
        </div>
      </div>
      <div
        class="dialog-item"
        v-for="(item, index) in getSongList"
        :key="index"
        @mouseenter="currentIndex = index"
        @mouseleave="currentIndex = null"
        @dblclick="songPlay(item.id)"
      >
        <span
          class="item-song-name"
          :class="{
            colorplay: item.id === currentId,
            fontcolor: item.id !== currentId && index === currentIndex,
          }"
          >{{ item.name }}
          <span
            class="song-describe"
            style="font-size: 10px"
            v-if="item.song.alias.length"
            >({{ item.song.alias[0] }})</span
          >
        </span>
        <span
          class="item-sing-name"
          :class="{
            fontcolor: item.id !== currentId && index === currentIndex,
            colorplay: item.id === currentId,
          }"
        >
          <span
            class="new-singer-name"
            style="cursor: pointer"
            v-for="ar in item.song.artists"
            :key="ar.index"
            @click="singClick(ar.id)"
            >{{ ar.name }}</span
          ></span
        >
        <span
          class="item-song-time"
          :class="{ fontcolor: index === currentIndex }"
          >{{ realFormatSecond(item.song.duration) }}</span
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { Bus } from "utils/eventBus.js";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      visibleDialog: false,
      currentIndex: Number,
      currentId: Number,
      total: 0,
    };
  },
  mounted() {
    //监听抽屉拉开事件
    Bus.$on("showDialog", () => {
      this.visibleDialog = !this.visibleDialog;
      // console.log(this.getSongList);
    });
    //监听歌曲播放颜色改变事件
    Bus.$on("playcolor", (id) => {
      this.currentId = id;
      // console.log(id);
    });
  },
  methods: {
    ...mapActions(["songDetail"]),
    //接受播放歌曲的id
    songPlay(id) {
      Bus.$emit("songPlay", id);
      this.songDetail(id);
    },
    //获取歌曲时间
    realFormatSecond(time) {
      let ctime = time + "";
      ctime = ctime.substring(0, ctime.length - 3);
      ctime = parseInt(ctime);
      let min = Math.floor(ctime / 60);
      let second = ctime % 60;
      return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
    },
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
  },
  computed: {
    //获取当前store音乐列表
    ...mapGetters(["getSongList"]),
    songsCount() {
      if (this.getSongList.length) {
        return this.getSongList.length;
      } else return this.total;
    },
  },
};
</script>

<style>
.vue-dialog {
  left: unset !important;
  width: 420px !important;
  top: 61px !important;
  right: 0 !important;
  bottom: 70px !important;
}
.vue-dialog .el-drawer__body {
}
.vue-dialog .el-drawer {
  width: 99% !important;
  box-shadow: -1px 1px 1px #ccc;
}
.dialog-header {
  width: 100%;
  height: 80px;
  padding: 10px 20px 0;
  margin-bottom: 5px;
}
.dialog-header-item {
  height: 100%;
  border-bottom: 1px solid #e0e0e0;
}
.dialog-header-title {
  color: #424242;
  font-size: 20px;
  font-weight: 600;
}
.dialog-count {
  display: block;
  font-size: 12px;
  color: #e0e0e0;
  margin-top: 17px;
}
.dialog-item {
  padding: 0 20px;
  font-size: 11px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  color: #212121;
}
.item-song-name {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-sing-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90px;
  overflow: hidden;
  color: #9e9e9e;
}
.item-song-time {
  width: 60px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  color: #e0e0e0;
}
.dialog-item:nth-child(2n + 1) {
  background-color: #f5f5f5;
}
.dialog-item:hover {
  color: #000 !important;
  background-color: #e0e0e0;
}
.fontcolor {
  color: #000;
}
.colorplay {
  color: #409eff;
}
.overflowAuto {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}
.overflowAuto::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.overflowAuto::-webkit-scrollbar-thumb {
  background: rgba(224, 214, 235, 0.5);
}
</style>
