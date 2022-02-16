<template>
  <div id="mvcontent">
    <span class="mv-title"
      >{{title}} <span class="el-icon-arrow-right"></span
    ></span>
    <div class="tag-nav" v-if="areas">
      <span
        class="tag-nav-item"
        v-for="item in areas"
        :key="item.index"
        @click="changeTag(item)"
        :class="{ tagActive: item === nowArea }"
        >{{ item }}</span
      >
    </div>
    <div class="video-content" >
      <video-item 
      class="video-item"
      v-for="(item, index) in videoList"
      :key="index"
      :vedio="item"
      ref="videoItem"
      ></video-item>
    </div>
  </div>
</template>

<script>
import VideoItem from '../../uservideo/children/VideoItem.vue'
export default {
  props:{
    title:String,
    videoList:[],
    areas: [],
  },
  components:{
    VideoItem
  },
  data() {
    return {
      loading:true,
      nowArea:'内地',
    };
  },
  methods:{
    changeTag(area){
      this.nowArea = area
      this.$emit('changeArea',area)
      this.$refs.videoItem.loading = true
    }
  }
};
</script>

<style lang="less" scoped>
.tagActive {
  border-radius: 20px;
  background-color: #b3e5fc;
  color: #409eff !important;
  pointer-events: none;
}
#mvcontent {
  width: 100%;
  margin: 25px 0;
  // overflow: auto;
  .video-content{
    width: 100%;
    // height: ;
    overflow:auto;
    height: 450px;
    // clear:both;
    margin-top: 20px;
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
  .mv-title {
    // margin-top: 30px;
    font-weight: 600;
    color: #303133;
    cursor: pointer;
  }
  .tag-nav {
    float: right;
    font-size: 16px;
    .tag-nav-item {
      display: inline-block;
      margin: 5px 5px;
      text-align: center;
      cursor: pointer;
      color: #616161;
      font-size: 12px;
      padding: 3px 10px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
