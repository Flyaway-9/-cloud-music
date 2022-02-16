<template>
  <div class="comment-item">
    <div class="item-img"><img :src="comment.user.avatarUrl" alt="" @load="loaded"/></div>
    <div class="item-content">
      <span class="user-name">{{ comment.user.nickname }}：</span>
      <span class="user-content">{{ comment.content }}</span>
      <div v-if="comment.beReplied && comment.beReplied.length" class="user-reply">
        <span class="user-name">@{{comment.beReplied[0].user.nickname}}：</span>
        <span class="user-content" >{{comment.beReplied[0].content}}</span>
      </div>
      <div class="item-time">{{commentTime}}</div>
    </div>
    <div class="item-operate">
      <span v-if="comment.liked"><i class="iconfont icon-dianzan1" style="color:#e91e63" @click="cancleLike"></i>{{comment.likedCount}}</span>
      <span v-else><i class="iconfont icon-dianzan" @click="likeClick"></i>{{comment.likedCount}}</span>
      <span><i class="el-icon-chat-line-round" @click="isVisible"></i></span>
    </div>
    <el-dialog
      title="评论"
      :visible.sync="centerDialogVisible"
      width="470px"
      center>
      <div slot class="dialog-body">
        <div class="v-input" style="width: 100%; margin: 20px 0">
        <el-input
          type="textarea"
          v-model="textarea"
          maxlength="140"
          show-word-limit
          :placeholder="replyUser"
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
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
import {commentLike,sendComment} from 'network/comment.js'
import {Bus} from 'utils/eventBus.js'
export default {
  props: {
    comment: {},
    id:null,
    type:Number,
  },
  data() {
    return {
      centerDialogVisible: false,
      textarea:''
    };
  },
  methods:{
    likeClick(){
      commentLike(this.id,this.comment.commentId,1,this.type).then(res => {
        // console.log(res);
        if(res.data.code === 200){
          this.comment.liked = true
          this.comment.likedCount++
          this.$notify({
          title: '成功',
          message: '点赞成功',
          type: 'success'
        });
        }
      })
    },
    cancleLike(){
      commentLike(this.id,this.comment.commentId,0,this.type).then(res => {
        // console.log(res);
        if(res.data.code === 200){
          this.comment.liked = false
          this.comment.likedCount--
          this.$notify({
          title: '成功',
          message: '已取消点赞',
          type: 'success'
        });
        }
      })
    },
    isVisible(){
      this.centerDialogVisible = true
    },
    sendComment(){
      sendComment(2,this.type,this.id,this.textarea,this.comment.commentId).then(res => {
        console.log(res);
        setTimeout(() => {
          Bus.$emit('sendComment')
        },500)
        if(res.data.code === 200){
            this.$message({
              message: '回复成功',
              type: 'success',
              duration: 2000
            })
            this.centerDialogVisible = false
        }
        if(res.data.code === 250){
              this.$message({
                    message: res.data.data.dialog.subtitle,
                    type: 'error',
                    duration: 2000
            })
        }
      })
    },
    loaded(){
      this.$emit('loaded')
    }
  },
  computed:{
    commentTime(){
      return getTime(this.comment.time)
    },
    replyUser(){
      return '回复' + ' ' +this.comment.user.nickname + ':'
    },
    isSend(){
      return this.textarea === ''
    }
  }
};
function getTime(second){
  let date = new Date(second)
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 <10? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return Y + M + D + ' ' + h + ':' + min
}
</script>

<style lang="less" scoped>
.comment-item {
  position: relative;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;

  .item-img {
    position: absolute;
    left: 0;
    width: 35px;
    height: 35px;
    border-radius: 35px;
    overflow: hidden;
    background-color: pink;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-content {
    margin-left: 58px;
    font-size: 12px;
    width: 720px;
    // background-color: skyblue;
    .user-name {
      user-select: none;
      color: #303f9f;
    }
    .user-content {
      color: #616161;
    }
    .item-time {
      margin-top: 5px;
      font-size: 12px;
      color: #bdbdbd;
      left: 58px;
      font-weight: 300;
    }
    .user-reply{
      margin-top: 5px;
      border-radius: 5px;
      padding: 8px 10px;
      background-color: #eee;
    }
  }

  .item-operate {
    user-select: none;
    position: absolute;
    right: 0;
    bottom: 20px;
    font-size: 12px;
    span{
      display: inline-block;
      padding: 0 8px;
      border-right: 1px solid #eee;
      i{
        font-size: 16px;
        cursor: pointer;
      }
      .iconfont {
        font-size: 16px;
        color: #000;
      }
      
      &:last-child{
        border: none;
        padding-right: 0;
      }
    }
  }
  .dialog-body{
    .v-input {
      /deep/ .el-textarea__inner {
        height: 105px;
      }
    }
  }
}
</style>
