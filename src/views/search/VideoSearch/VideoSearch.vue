<template>
  <div style="position:relative;">
    <div
      style="
        position: absolute;
        right: 0;
        top: -20px;
        font-size: 13px;
        color: #c0c4cc;
      "
    >
      找到{{ total }}个视频
    </div>
    <div class="video-content">
      <video-item
      v-for="(item, index) in videos"
      :key="index"
      :vedio="item"
      class="video-item"
      ></video-item>
    </div>

    <el-pagination
        v-show="total > 20"
        background
        layout="prev, pager, next"
        :total="parseInt(total)"
        :page-size="20"
        style="text-align: center; margin: 20px 0"
        :current-page="nowPage"
        @current-change="pageChange"
      >
      </el-pagination>
  </div>
</template>

<script>
import VideoItem from './children/VideoItem.vue'
import { getCloudSearch } from "network/search.js";
export default {
  components:{
    VideoItem
  },
  data() {
    return {
      keyword: String,
      type: null,
      total: Number,
      loading: true,
      nowPage: 1,
      videos: [],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.type = this.$route.query.type;
  },
  mounted(){
    this.getVideo()
  },
  methods:{
    getVideo(){
      this.videos = ''
      getCloudSearch(this.keyword, 20, this.type,(this.nowPage-1)*20).then((res) => {
        console.log(res);
        this.videos = res.data.result.videos;
        this.total = res.data.result.videoCount;
      });
    },
    pageChange(page) {
      this.nowPage = page;
      this.getVideo();
    },
  }
}
</script>

<style lang="less" scoped>
.video-content{
    // margin-top: 20px;
    // width: 100%;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    width: 100%;
    overflow:auto;
    // clear:both;
    .video-item{
      width: 320px;
      height: 220px;
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
</style>