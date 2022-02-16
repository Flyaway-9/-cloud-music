<template>
  <div>
    <div class="new-title">
      <cate-control :cates="cates" @cateChange="cateChange"></cate-control>
      <div class="playAll">
        <el-button type="primary" size="mini" round @click="itemClick(songList[0].id)">
          <i class="el-icon-video-play" style="font-size:14px"></i> 
          播放全部
        </el-button>
      </div>
    </div>
    <div>
      <div
        class="loading"
        style="width: 100%; height: 80px"
        v-loading="loading"
        v-show="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.1)"
      ></div>
      <song-item
        v-for="(item, index) in songList"
        :key="index"
        :song="item"
        :index="index"
        @songloaded="loaded"
        @itemPlay="itemPlay"
        v-show="!loading"
        @dblclick.native="itemClick(item.id)"
      ></song-item>
    </div>
  </div>
</template>

<script>
import CateControl from "./children/CateControl.vue";
import SongItem from "./children/SongItem.vue";
import { getTopSong } from "network/newMusic.js";
import {debounce} from 'utils/debounce.js'
// import {throttle} from 'utils/throttle.js'
import {Bus} from 'utils/eventBus.js'
export default {
  components: {
    CateControl,
    SongItem,
  },
  data() {
    return {
      cates: [
        { name: "全部", area: 0 },
        { name: "华语", area: 7 },
        { name: "欧美", area: 96 },
        { name: "日本", area: 8 },
        { name: "韩国", area: 16 },
      ],
      type: 0,
      songList: [],
      loading: true,
    };
  },
  created() {
    this.getSongs(this.type)
  },
  mounted(){
    
  },
  methods:{
    getSongs(type){
      getTopSong(type).then((res) => {
      // console.log(res);
      this.songList = res.data.data;
      this.songList = setlist(this.songList)
      // console.log(this.songList);
    });
    },
    loaded:debounce(function(){
      console.log('1');
      this.loading = false
    },500),
    cateChange(type){
      // console.log(type);
      this.type = type
      this.loading = true
      this.getSongs(type)
    },
    itemClick(id){
      Bus.$emit('songPlay',id)
      // let newList = setlist(this.songList)
      this.$store.commit('setNewSongList',this.songList)
    },
    itemPlay(id){
      this.itemClick(id)
    }
  },
  computed: {},
};
function setlist(songs) {
  const newList =  songs.map(function(item){
    return {id: item.id,name: item.name,album:item.album,song: {alias:item.alias,artists: item.artists,duration:item.duration}}
  })
  return newList
}
</script>

<style scoped lang="less">
.new-title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .playAll{
  }
}
</style>
