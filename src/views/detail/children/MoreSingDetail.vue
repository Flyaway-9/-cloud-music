<template>
  <div class="more-detail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="专辑" name="first" v-infinite-scroll="load" infinite-scroll-disabled="disabled" :labelContent="canloading">
        <top-songs :id="this.id"></top-songs>
        <album-content v-for="item in hotAlbum" :key="item.index" :album="item"></album-content>
      </el-tab-pane>
      <el-tab-pane label="MV" name="second" :labelContent="mvTab">
        <div v-if="!mvs.length" style="font-size:14px;color:#616161;text-align:center;">没有相关mv</div>
        <div>
          <mv-content v-for="(item,index) in mvs" :key="index" :mv="item" style="float:left;margin:10px 20px;width:320px;height:225px"></mv-content>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="third" :labelContent="noloading">
        <div style="color:#757575;font-size:14px;" v-if="!introduction.length"><p>&emsp;&emsp;{{&emsp;descrition}}</p></div>
        <section  v-for="item in introduction" :key="item.index" v-show="introduction.length">
          <p style="font-size:14px;color:#212121;font-weight:600;">
            {{item.ti}}
          </p>
          <p 
          v-for="ins in getDes(item.txt)" 
          :key="ins.index"
          style="font-size:14px;color:#616161">
            &emsp;&emsp;{{ins}}
          </p>
        </section>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="fourth" :labelContent="simple">
        <div v-if="!singerList.length" style="font-size:14px;color:#616161;text-align:center;">没有相似歌手</div>
        <div class="simi-content">
          <singer-cover
            v-for="item in singerList"
            :key="item.index"
            :singerItem="item"
            style="float:left;margin-left:20px;">
          </singer-cover>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AlbumContent from './AlbumContent.vue'
import TopSongs from './TopSongs.vue'
import SingerCover from "../../aside/find/singer/children/SingerCover.vue";
import {getSingerDes,getSimi,getSiAlbum,getSingMv} from 'network/singer.js'
import MvContent from './MvContent.vue'
export default {
  props:{
      id: Number,
      alnumSize: Number,
      mvSize: Number
  },
  components:{
    SingerCover,
    AlbumContent,
    TopSongs,
    MvContent
  },
  data() {
    return {
      activeName:'first',
      singDesc: null ,
      introduction:[],
      singerList:[],
      hotAlbum:[],
      limit: 5,
      loading: false,
      mvs:[],
      descrition:''
    }
  },
  created(){
  },
  mounted(){
    getSiAlbum(this.limit,this.id).then(res => {
      this.hotAlbum = res.data.hotAlbums
    })
     getSingerDes(this.id).then(res => {
      this.descrition = res.data.briefDesc
      this.introduction = res.data.introduction
      // console.log(this.descrition);
    })
    
  },
  methods:{
    load(){
      if(this.hotAlbum.length && this.hotAlbum.length === this.alnumSize){
        this.loading = true
      }
      this.limit++
      getSiAlbum(this.limit,this.id).then(res => {
        // console.log(res);
      this.hotAlbum = res.data.hotAlbums
    })
    },
    canloading(){
      this.loading = false
    },
    noloading(){
      this.loading = true
    },
    handleClick(tab) {
      // console.log(tab);
      if(tab.labelContent){
        tab.labelContent()
      }
    },
    simple(){
      this.loading = true
      getSimi(this.id).then(res => {
        // console.log(res);
        this.singerList =res.data.artists
      })
    },
    mvTab(){
      this.loading = true
      getSingMv(this.id).then(res => {
        // console.log(res);
        this.mvs = res.data.mvs
      })
    } 
  },
  computed:{
    getDes(){
      return (des) => {
        return des.split('\n')
      }
    },
    disabled () {
      return this.loading
    }
  }
}
</script>

<style lang="less" scoped>
.more-detail {
  user-select: none;
  .simi-content {
    overflow: auto;
  }
}
/deep/.el-tabs__nav-wrap {
  &::after {
    height: 0;
  }
}
</style>