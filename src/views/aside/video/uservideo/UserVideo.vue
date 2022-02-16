<template>
  <el-scrollbar v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="50">
    <div id="user" style=""  >
    <video-menu @changeVideoTag="changeVideoTag" @changeVideoAll="changeVideoAll"></video-menu>
    
    <div class="video-content" >
      <video-item
      v-for="(item, index) in videoList"
      :key="index"
      :vedio="item"
      class="video-item"
    ></video-item>
    <div v-if="noMore" style="width:100%;text-align:center;margin-top:100px;">没有更多了</div>
      <div style="width:100%;float:left;"></div>
    </div>
  </div>
  </el-scrollbar>
</template>

<script>
import VideoMenu from "./children/VideoMenu.vue";
import VideoItem from "./children/VideoItem.vue";
import { getAllVideo, getTagVideo } from "network/video.js";
import {throttle} from 'utils/throttle.js'
export default {
  components: {
    VideoMenu,
    VideoItem,
  },
  data() {
    return {
      id: null,
      offset: 0,
      videoList: [],
      loading:false,
      msg:'暂无视频',
      tag:'',
      hasmore:String
    };
    
  },
  mounted() { 
      this.getAll()
  },
  methods:{
    changeVideoAll(){
      this.videoList = []
      this.offset = 0
      this.id = null
      this.getAll()
      this.$nextTick(this.load())
    },
    changeVideoTag(id){
      this.videoList = []
      this.id = id
      this.offset = 0
      getTagVideo(this.id,0).then(res=>{
        // console.log(res);
        this.videoList = this.videoList.concat(res.data.datas)
        this.hasmore = res.data.hasmore
      })
      setTimeout(() => {
        this.load()
      }, 100);
    },
    getTag(){
      getTagVideo(this.id,this.offset).then(res=>{
        // console.log(res);
        this.videoList = this.videoList.concat(res.data.datas)
        this.hasmore = res.data.hasmore
      })
    },
    getAll(){
      getAllVideo(this.offset).then(res => {
        // console.log(res);
        this.id = null
        if(res){
          this.videoList = this.videoList.concat(res.data.datas)
        this.hasmore = res.data.hasmore
        }
      })
    },
    load:throttle(function(){
      ++this.offset
      if(this.id){
        // this.offset++
        this.getTag()
      } else this.getAll()
    },200)
  },
  computed:{
    
    noMore(){
      return !this.hasmore
    },
    disabled(){
      return this.noMore
    }
  }
};
</script>

<style lang="less" scoped>
#user {
  width: 1100px;
  margin: 20px auto;
  // overflow:auto;
  height: 100%;
   
  .video-content{
    // margin-top: 20px;
    // width: 100%;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    width: 100%;
    // overflow:auto;
    // clear:both;
    .video-item{
      width: 260px;
      height: 180px;
      margin: 20px 10px;
      float: left;
      &:nth-child(4n+1){
        margin-left: 0;
      }
      &:nth-child(4n){
        margin-right: 0;
      }
    }
  }
}
</style>
