<template>
  <div style="width:1400px">
    <div class="daily-title">
      <div class="daily-date-content">
        <span class="daily-date">{{ date }}</span>
        <span><i class="iconfont icon-rili"></i></span>
      </div>
      <p class="daily-name">每日歌曲推荐</p>
      <p class="daily-desc">根据你的口味生成，每天6:00更新</p>
      <div class="list-play">
              <span class="list-play-all" @click="playAll"
                ><i class="el-icon-caret-right"></i> 播放全部</span
              >
              <span class="list-play-add" @click="playAdd"><i class="el-icon-plus"></i></span>
            </div>
      </div>
    <div style="height:40px;color: #757575;font-size:13px;line-height:40px;">
      <div style="float:left;margin-left:125px">音乐标题</div>
      <div style="float:left;margin-left:505px">歌手</div>
      <div style="float:left;margin-left:235px">专辑</div>
      <div style="float:left;margin-left:390px">时间</div>
    </div>
    <div style="width:100%">
      <song-item
      v-for="(item, index) in songList"
      :key="index"
      :song="item"
      @dblclick.native="itemClick(item.id)"
      :index="index"
    ></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from "./children/SongItem.vue";
import { getDailySong } from "network/song.js";
import { Bus } from "utils/eventBus.js";
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      songList: [],
    };
  },
  created() {
    this.date = getDay();
    getDailySong().then((res) => {
      // console.log(res);
      this.songList = res.data.data.dailySongs;
      this.songList = setlist(this.songList);
      // console.log(this.songList);
    });
  },
  methods: {
    itemClick(id) {
      Bus.$emit("songPlay", id);
      // let newList = setlist(this.songList)
      this.$store.commit("setNewSongList", this.songList);
    },
    playAll(){
      // Bus.$emit('songPlay',this.songId)
      Bus.$emit("songPlay", this.songList[0].id);
      // console.log(this.songs);
      // let songs = setlist(this.songs)
      // this.song = songs
      // console.log(songs);
      this.$store.commit('setNewSongList',this.songList)
    },
    playAdd(){  
      this.$store.commit('addSongList',this.songList)
    },
  },
};
function getDay() {
  let date = new Date();
  let D = date.getDate();
  return D;
}
function setlist(songs) {
  const newList = songs.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      song: { alias: item.alia, artists: item.ar, duration: item.dt,album:item.al },
    };
  });
  return newList;
}
</script>

<style lang="less" scoped>
.daily-title {
  // width: 1650px;
  height: 170px;
  position: relative;
  border-bottom: 1px solid #eee;
  .daily-date-content {
    position: relative;
    width: 110px;
    height: 110px;
    text-align: center;

    .daily-date {
      position: absolute;
      left: 30%;
      top: 40%;
      font-size: 35px;
      color: #409eff;
    }
    .iconfont {
      color: #409eff;
    }
  }
  .daily-name {
    position: absolute;
    left: 120px;
    font-size: 23px;
    font-weight: 600;
    color: #424242;
    top: 0;
  }
  .daily-desc {
    position: absolute;
    left: 120px;
    font-size: 12px;
    color: #757575;
    top: 45px;
  }
}
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
  background-color: #409EFF;
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
  background-color: #409EFF;
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
