<template>
  <div>
    <div class="new-title">
      <cate-control :cates="cates" @cateChange="cateChange"></cate-control>
      <!-- <cate-item :cateItems="cateItems" @cateItemChange="cateItemChange"></cate-item> -->
    </div>
    <div
      class="loading"
      style="width: 100%; height: 40px"
      v-loading="loading"
      v-show="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.1)"
    ></div>
    <div v-show="!loading" >
      <div class="album-content">
        <album-item v-for="(item,index) in albumList" :key="index" :album="item" :value="1" @loaded="loaded"></album-item>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="50"
        :current-page="offset+1"
        style="text-align:center"
        @current-change="pageChange"
        :total="albumTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CateControl from "./children/CateControl.vue";
// import CateItem from './children/CateItem.vue'
import AlbumItem from './children/AlbumItem.vue'
import {getTopAlbum} from 'network/newMusic.js'
import { Bus } from "utils/eventBus.js";
import {debounce} from 'utils/debounce.js'
export default {
  components:{
    CateControl,
    // CateItem,
    AlbumItem
  },
  data() {
    return {
      cates: [
        { name: "全部", area: 'ALL' },
        { name: "华语", area: 'ZH' },
        { name: "欧美", area: 'EA' },
        { name: "韩国", area: 'KR' },
        { name: "日本", area: 'JP' },
      ],
      cateItems:[
        { name: "推荐",type:'hot'},
        { name: "全部",type:'new'},
      ],
      type: 'hot',
      area: 'ALL',
      offset:0,
      limit:50,
      albumTotal:0,
      albumList:[],
      loading:true
    }
  },
  created(){
    this.getalbums()
  },
  methods:{
    getalbums(){
      getTopAlbum(this.offset * this.limit,this.limit,this.area).then(res=>{
      // console.log(res);
      this.albumTotal = res.data.total
      this.albumList = res.data.albums.map(item => {
        return {alias:item.alias,artist:item.artist,blurPicUrl:item.blurPicUrl,id:item.id,name:item.name,transNames:item.transNames}
      })
    })
    },
    cateChange(area){
      // console.log(area);
      this.offset = 0
      this.loading = true
      this.area = area
      this.getalbums()
    },
    cateItemChange(type){
      this.type = type
    },
    pageChange(page){
      this.loading = true
      this.offset = page - 1 
      this.getalbums()
      Bus.$emit("toTop", 0);
    },
    loaded:debounce(function(){
      // console.log('1');
      this.loading = false
    },500),
    // loaded(){
    //   console.log('1');
    // }
  }
}
</script>

<style lang="less" scoped>
.new-title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.album-content{
  display: flex;
  justify-content: space-between;
  width: 950px;
  margin: 0 auto;
  flex-wrap: wrap;
}
</style>