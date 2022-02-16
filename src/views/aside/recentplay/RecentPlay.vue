<template>
  <div>
    <h3 class="recent-title">最近播放<span class="recent-count">共{{getRecenetSongs.length}}首</span></h3>
    <div class="list-play">
      <span class="list-play-all" @click="playAll"
        ><i class="el-icon-caret-right"></i> 播放全部</span
      >
      <span class="list-play-add" @click="playAdd"
        ><i class="el-icon-plus"></i
      ></span>
    </div>
    <div>
      <song-item v-for="(item,index) in getRecenetSongs" :key="index" :index="index" :song="item"></song-item>
    </div>
  </div>
</template>

<script>
import SongItem from './children/SongItem.vue'
import {mapGetters} from 'vuex'
import {Bus} from 'utils/eventBus.js'
export default {
  components:{
    SongItem
  },
  mounted(){
    
  },
  methods:{
    playAll() {
      // Bus.$emit('songPlay',this.songId)
      Bus.$emit("songPlay", this.songList[0].id);
      // console.log(this.songs);
      // let songs = setlist(this.songs)
      // this.song = songs
      // console.log(songs);
      this.$store.commit("setNewSongList", this.songList);
    },
    playAdd() {
      this.$store.commit("addSongList", this.songList);
    },
  },
  computed:{
    ...mapGetters(['getRecenetSongs'])
  }
};
</script>

<style lang="less" scoped>
.recent-title {
  color: #303133;
  .recent-count {
    margin-left: 10px;
    font-size: 16px;
    color: #bdbdbd;
    font-weight: 300;
  }
}
.list-play {
  color: #fff;
  font-size: 14px;
  border-radius: 28px;
}
.list-play-all {
  display: inline-block;
  padding: 8px 0;
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
  padding: 8px 0;
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
