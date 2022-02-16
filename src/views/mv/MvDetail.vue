<template>
  <div id="mv">
    <div class="mv-detail">
      <div class="mv-ti" @click="goback"> <i class="el-icon-arrow-left"></i>MV详情</div>
      <video :src="vedioUrl" controls autoplay class="video"></video>
      <div class="author">
        <span class="author-av" @click="singClick(mvDetali.artists[0].id)"
          ><img :src="avImg" alt=""
        /></span>
        <span
          class="author-name"
          v-for="item in mvDetali.artists"
          :key="item.index"
          @click="singClick(item.id)"
          >{{ item.name }}</span
        >
      </div>
      <div class="mv-name">
        <span class="mv-name-item1">{{ mvDetali.name }}</span>
      </div>
      <div style="font-size: 12px; color: #e0e0e0">
        <span>发布：{{ mvDetali.publishTime }}</span>
        <span style="margin-left: 30px">总播放：{{ playcount }}</span>
      </div>
      <div class="mv-des" v-if="mvDetali.desc">{{ mvDetali.desc }}</div>
      <div class="mv-comment">
        评论
        <span>({{ mvDetali.commentCount }})</span>
      </div>
      <div class="v-input" style="width: 780px; margin: 20px 0">
        <el-input
          type="textarea"
          v-model="textarea"
          maxlength="140"
          show-word-limit
        >
        </el-input>
      </div>
      <div style="margin-top: 20px; overflow: auto">
        <el-button
          round
          size="mini"
          style="float: right; margin-right: 40px"
          @click="sendComment"
          :disabled="isSend"
          >评论</el-button
        >
      </div>
      <div style="width: 780px; margin-top: 20px">
        <comment-detail ref="comment" :toTop="900"></comment-detail>
      </div>
    </div>
    <div class="mv-recommend">
      <video-reco :id="mvid"></video-reco>
    </div>
  </div>
</template>

<script>
import { getMVDetail, getMVUrl } from "network/mv.js";
import {sendComment} from 'network/comment.js'
import CommentDetail from '../comment/CommentDetail.vue'
import {Bus} from 'utils/eventBus.js'
import VideoReco from '../../components/common/videorelative/VideoReco.vue'
export default {
  data() {
    return {
      mvid: Number,
      vedioUrl: Number,
      mvDetali: {},
      avImg:String,
      textarea:'',
      hotComment:[],
      comments:[],
      loading:true
    };
  },
  components:{
    CommentDetail,
    VideoReco
  },
  created() {
    this.mvid = parseInt(this.$route.query.id);
    getMVDetail(this.mvid).then((res) => {
      // console.log(res);
      this.mvDetali = res.data.data;
      this.avImg = this.mvDetali.artists[0].img1v1Url
    });
    getMVUrl(this.mvid).then((res) => {
      // console.log(res);
      this.vedioUrl = res.data.data.url;
    });
    this.$nextTick(()=>{
      this.$refs.comment.id = this.mvid
      this.$refs.comment.type = 1
    })
  },
  mounted(){

  },
  methods:{
    goback(){
      this.$router.push({path:'/video/mv'})
    },
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
    sendComment(){
      sendComment(1,1,this.mvid,this.textarea).then(res => {
        // console.log(res);
        this.textarea = ''
        setTimeout(() => {
          if(res.data.code === 200){
            this.$message({
              message: '回复成功',
              type: 'success',
              duration: 2000
            })
          Bus.$emit('sendComment')
        }
        if(res.data.code === 250){
              this.$message({
                    message: res.data.data.dialog.subtitle,
                    type: 'error',
                    duration: 2000
            })
        }
        }, 500);
      })
    }
  },
  computed:{
    playcount(){
      let count = this.mvDetali.playCount + ''
      if(count.length > 5){
        return count.substr(0,count.length - 4) + '万次'
      } else return count + '次'
    },
    isSend(){
      return this.textarea === ''
    }
  }
};
</script>

<style lang="less" scoped>
#mv {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .mv-detail {
    flex: 3;
    margin: 20px 0;
    .mv-ti {
      font-size: 16px;
      font-weight: 600;
      color: #424242;
      margin: 20px 0;
      cursor: pointer;
    }
    .video {
      width: 780px;
      height: 405px;
      border-radius: 5px;
      background-color: #000;
    }
    .author {
      width: 100%;
      height: 50px;
      margin: 15px 0;
      .author-av {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        overflow: hidden;
        vertical-align: middle;
        margin-right: 15px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .author-name {
        font-size: 14px;
        font-weight: 300;
        color: #616161;
        cursor: pointer;
        &:hover {
          color: #000;
        }
        &:nth-child(n + 3) {
          &::before {
            content: "/";
            margin: 0 5px;
            cursor: default;
          }
        }
      }
    }
    .mv-name {
      font-size: 25px;
      font-weight: 600;
      margin: 20px 0;
      .mv-name-item1 {
        display: inline-block;
        max-width: 750px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .mv-des {
      width: 780px;
      font-size: 12px;
      color: #424242;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 20px 0;
    }
    .mv-comment {
      margin-top: 50px;
      font-size: 20px;
      font-weight: 600;
      span {
        font-size: 12px;
        font-weight: 400;
        color: #e0e0e0;
      }
    }
    .v-input {
      /deep/ .el-textarea__inner {
        height: 90px;
      }
    }
  }
  .mv-recommend {
    flex: 1;
    margin-top: 20px;
  }
}
</style>
