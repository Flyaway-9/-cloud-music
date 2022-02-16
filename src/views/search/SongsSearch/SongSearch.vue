<template>
  <div style="width: 1400px;margin:0 auto;position: relative;">
    <div class="daily-title">
      <div class="list-play">
        <span class="list-play-all" @click="playAll"
          ><i class="el-icon-caret-right"></i> 播放全部</span
        >
        <span class="list-play-add" @click="playAdd"
          ><i class="el-icon-plus"></i
        ></span>
      </div>
    </div>
    <div style="position:absolute;right:0;top:0;font-size:13px;color:#C0C4CC;" v-if="!loading">找到{{total}}首歌曲</div>
    <div
      style="height: 40px; color: #757575; font-size: 13px; line-height: 40px"
    >
      <div style="float: left; margin-left: 125px">音乐标题</div>
      <div style="float: left; margin-left: 505px">歌手</div>
      <div style="float: left; margin-left: 235px">专辑</div>
      <div style="float: left; margin-left: 390px">时间</div>
    </div>
    <div style="width: 100%; height: 40px;margin-top:20px"
      v-loading="loading"
      v-show="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.1)"></div>
    <div v-show="!loading">
      <song-item
        v-for="(item, index) in songList"
        :key="index"
        :song="item"
        @dblclick.native="itemClick(item.id)"
        :index="index"
        :nowPage="nowPage"
      ></song-item>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="parseInt(total)"
      :page-size="100"
      style="text-align: center; margin: 20px 0"
      :current-page="nowPage"
      @current-change="pageChange"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script>
import SongItem from "./children/SongItem.vue";
import { getCloudSearch } from "network/search.js";
import { Bus } from "utils/eventBus.js";
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      keyword: String,
      type: null,
      songList: [],
      total: Number,
      nowPage: 1,
      loading:false
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.type = this.$route.query.type;
  },
  mounted() {
    this.getSongs()
  },
  methods: {
    pageChange(page){
      this.nowPage = page
      this.songList = []
      this.getSongs()
    },
    getSongs(){
      this.loading = true
      getCloudSearch(this.keyword, 100, this.type,(this.nowPage-1)*100).then((res) => {
        // console.log(res);
        this.songList = setlist(res.data.result.songs);
        this.total = res.data.result.songCount;
      });
      setTimeout(()=>{
        this.loading = false
      },500)
    },
    itemClick(id) {
      Bus.$emit("songPlay", id);
      this.$store.commit("setNewSongList", this.songList);
    },
    playAll() {
      Bus.$emit("songPlay", this.songList[0].id);
      this.$store.commit("setNewSongList", this.songList);
    },
    playAdd() {
      this.$store.commit("addSongList", this.songList);
    },
  },
};
function setlist(songs) {
  const newList = songs.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      song: {
        alias: item.alia,
        artists: item.ar,
        duration: item.dt,
        album: item.al,
      },
    };
  });
  return newList;
}
</script>

<style lang="less" scoped>
.list-play {
  color: #fff;
  font-size: 14px;
  border-radius: 28px;
}
.list-play-all {
  display: inline-block;
  padding: 10px 0;
  width: 100px;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  background-color: #409eff;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  cursor: pointer;
}
.list-play-add {
  display: inline-block;
  padding: 10px 0;
  width: 40px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  background-color: #409eff;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
}
.list-play-all:hover {
  background-color: #039be5;
}
.list-play-add:hover {
  background-color: #039be5;
}
</style>
