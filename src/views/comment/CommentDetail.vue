<template>
  <div id="comment">
    <div
      class="loading"
      style="width: 100%; height: 40px"
      v-loading="loading"
      v-show="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.1)"
    ></div>
    <div v-show="!loading">
      <div class="top-comment-title" v-show="pageNo === 1">精彩评论</div>
      <div class="top-comment" v-show="pageNo === 1">
        <comment-item
          v-for="(item, index) in hotComments"
          :key="index"
          :comment="item"
          :id="id"
          :type="type"
          @loaded="loaded"
        ></comment-item>
      </div>
      <div class="top-comment-title">
        最新评论
        <span>({{ totalCount }})</span>
      </div>
      <div class="all-comment">
        <comment-item
          v-for="(value, index) in comments"
          :key="'a' + index"
          :comment="value"
          :id="id"
          :type="type"
          @loaded="loaded"
        ></comment-item>
      </div>
      <div v-if="noComment" style="color: #424242;text-align:center;margin-top:40px;">暂无评论，快来抢沙发吧~</div>
      <div style="width:none;margin-top: 30px;margin-bottom: 50px;">
        
          <el-pagination
            style="text-align:center;margin-top:50px;"
            background
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="pageSize"
            :current-page="pageNo"
            @current-change="pageChange"
          >
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "./childern/CommentItem.vue";
import {
  getHotComment,
  commentMV,
  commentAlbum,
  commentPlayList,
  commentSong,
  commentVideo
} from "network/comment.js";
import { Bus } from "utils/eventBus.js";
import { throttle } from "utils/throttle.js";
import { debounce } from "utils/debounce.js";
export default {
  props: {
    // id:{
    //   type:Number,
    //   default: 0
    // },
    // type:{
    //   type:Number,
    //   default: 0
    // },
    toTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      id: null,
      type: Number,
      limit: 10,
      limit2: 20,
      pageSize: 20,
      pageNo: 1,
      sortType: 3,
      cursor: 0,
      hotComment: [],
      comment: [],
      totalCount: 0,
      getComment: null,
      loading: true,
      noComment:false
    };
  },
  components: {
    CommentItem,
  },
  mounted() {
    this.$nextTick(() => {});
    Bus.$on("sendComment", () => {
      this.cursor = 0;
      this.noComment = false
      throttle(
        this.getComment(this.id, (this.pageNo - 1)*20, this.cursor).then((res) => {
          this.comment = res.data.comments;
          // console.log(this.comment);
          this.cursor = res.data.comments[this.limit2 - 1].time;
        }),
        1000
      );
    });
    this.$emit('commentCan')
  },
  methods: {
    test() {
      console.log(this.id);
    },
    pageChange(page) {
      this.pageNo = page;
      // this.cursor = 0
      // getComments(
      //   this.id,
      //   this.type,
      //   this.pageNo,
      //   this.pageSize,
      //   this.sortType,
      //   this.cursor
      // ).then((res) => {
      //   this.comment = res.data.data.comments;
      //   // console.log(this.comment);
      //   this.cursor = res.data.data.cursor;
      //   Bus.$emit("toTop", this.toTop);
      // });
      this.getComment(this.id, (this.pageNo - 1)*20).then((res) => {
        this.comment = res.data.comments;
        this.cursor = res.data.comments[this.limit2 - 1].time;
        if(!this.toTop){
          document.getElementsByClassName('position-box')[0].scrollIntoView({behavior: "smooth"});
        } else Bus.$emit("toTop", this.toTop);
      });
    },
    loaded: debounce(function () {
      // console.log('11');
      this.loading = false;
    }, 100),
  },
  computed: {
    comments() {
      return this.comment;
    },
    hotComments() {
      return this.hotComment;
    },
  },
  watch: {
    id() {
      this.loading = true
      switch (this.type) {
        case 0:
          this.getComment = commentSong;
          break; //歌曲
        case 1:
          this.getComment = commentMV;
          break; //mv
        case 2:
          this.getComment = commentPlayList;
          break; //歌单
        case 3:
          this.getComment = commentAlbum;
          break; //专辑
        case 5:
          this.getComment = commentVideo;
          break; //视频
      }
      // getComments(this.id,this.type,this.pageNo,this.pageSize,this.sortType).then(res => {
      // this.comment = res.data.data.comments
      // console.log(res);
      // this.cursor = res.data.data.cursor
      // this.totalCount = res.data.data.totalCount
      // })
      getHotComment(this.id, this.type, this.limit).then((res) => {
        // console.log(res);
        this.hotComment = res.data.hotComments;
      });
      this.getComment(this.id, this.pageNo - 1, ).then((res) => {
        // console.log(res);
        this.totalCount = res.data.total;
        if(this.totalCount === 0){
          this.loading = false
          this.noComment = true
        }
        this.comment = res.data.comments;
        // this.cursor = res.data.comments[this.limit2 - 1].time;
      });
      
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 50px;
}
.top-comment-title {
  font-size: 14px;
  font-weight: 600;
  color: #424242;
  margin-top: 30px;
}
.top-comment .comment-item:last-child {
  border: none;
}
.all-comment .comment-item:last-child {
  border: none;
}
</style>
