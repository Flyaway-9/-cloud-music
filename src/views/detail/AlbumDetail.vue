<template>
  <div>
    <el-row :gutter="20" style="height: 240px">
      <el-col :span="3.5"
        ><div
          class="list-img"
          :style="{ background: 'url(' + album.blurPicUrl + ')' }"
        ></div
      ></el-col>
      <el-col :span="18" :offset="0">
        <el-row :gutter="0">
          <el-col :span="1" :offset="0">
            <div class="list-tag">专辑</div></el-col
          >
          <el-col :span="22" :offset="0"
            ><span class="list-title">{{ album.name }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="list-play">
              <span class="list-play-all" @click="playAll"
                ><i class="el-icon-caret-right"></i> 播放全部</span
              >
              <span class="list-play-add" @click="playAdd"
                ><i class="el-icon-plus"></i
              ></span>
            </div>
          </el-col>
        </el-row>
        <div class="list-des">
          歌手：<span
            v-for="item in album.artists"
            :key="item.index"
            class="list-des-sing"
            @click="singClick(item.id)"
            >{{ item.name }}</span
          >
        </div>
        <div class="list-des">时间：{{ albumTime(album.publishTime) }}</div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" class="list-tabs-control" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="songs">
        <el-row :gutter="20" class="list-title">
          <el-col :span="1">序号</el-col>
          <el-col :span="10">音乐标题</el-col>
          <el-col :span="5">歌手</el-col>
          <el-col :span="5">专辑</el-col>
          <el-col :span="2">时长</el-col>
        </el-row>
        <more-album-list :songs="songs" ref="morelist"></more-album-list>
      </el-tab-pane>
      <el-tab-pane :label="'评论(' + commentCount + ')'" name="comments"  :labelContent="commentTab">
        <div class="v-input" style="width: 780px; margin: 20px auto">
          <el-input
            type="textarea"
            v-model="textarea"
            maxlength="140"
            show-word-limit
          >
          </el-input>
          <div style="margin-top: 20px; overflow: auto">
            <el-button
              round
              size="mini"
              style="float: right"
              @click="sendComment"
              :disabled="isSend"
              >评论</el-button
            >
          </div>
        </div>

        <div style="width: 780px; margin: 20px auto" >
          <comment-detail ref="comment" :toTop="400" v-if="commentShow"></comment-detail>
        </div>
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="details">
        <p style="font-size:14px;color:#212121;font-weight:600;">
            专辑介绍
          </p>
        <p v-for="item in getDesc(description)" :key="item.index" style="font-size:14px;color:#616161">&emsp;&emsp;{{item}}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAlbum } from "network/singer.js";
// import {Bus} from 'utils/eventBus.js';
import MoreAlbumList from "./children/MoreAlbumList.vue";
import { sendComment } from "network/comment.js";
import CommentDetail from "../comment/CommentDetail.vue";
import { Bus } from "utils/eventBus.js";
export default {
  data() {
    return {
      activeName: "songs",
      id: Number,
      album: {},
      songId: Number,
      commentCount: null,
      songs: [],
      textarea: "",
      commentShow: false,
      description:''
    };
  },
  components: {
    MoreAlbumList,
    CommentDetail,
  },
  created() {
    this.id = parseInt(this.$route.query.id);
    getAlbum(this.id).then((res) => {
      console.log(res);
      this.album = res.data.album;
      this.songId = res.data.songs[0].id;
      this.songs = res.data.songs;
      this.commentCount = res.data.album.info.commentCount;
      this.description = res.data.album.description
    });
    this.$nextTick(() => {
      
    });
  },
  mounted(){
    
  },
  methods: {
    getPlayCount(count) {
      return parseInt(count).toString().length > 4
        ? parseInt(count / 10000) + "万"
        : count;
    },
    playAll() {
      // Bus.$emit('songPlay',this.songId)
      this.$refs.morelist.songPlay(this.songId);
    },
    playAdd() {
      this.$refs.morelist.songAdd();
    },
    singClick(id) {
      this.$router.push({ path: "/singerDetail", query: { id: id } });
    },
    sendComment() {
      sendComment(1, 3, this.id, this.textarea).then((res) => {
        // console.log(res);
        this.textarea = "";
        setTimeout(() => {
          if (res.data.code === 200) {
            this.$message({
              message: "评论成功",
              type: "success",
              duration: 2000,
            });
            Bus.$emit("sendComment");
          }
          if (res.data.code === 250) {
            this.$message({
              message: res.data.data.dialog.subtitle,
              type: "error",
              duration: 2000,
            });
          }
        }, 500);
      });
    },
    handleClick(tab) {
      // console.log(tab);
      if(tab.labelContent){
        tab.labelContent()
      }
    },
    commentTab(){
      // console.log('1');
      this.commentShow = true
      this.$nextTick(()=>{
        this.$refs.comment.id = this.id;
        this.$refs.comment.type = 3;
      })
    }
  },
  computed: {
    albumTime() {
      return (time) => {
        let date = new Date(time);
        let Y = date.getFullYear();
        let M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return Y + "-" + M + "-" + D;
      };
    },
    isSend() {
      return this.textarea === "";
    },
    getDesc(){
      return (desc) => {
        return desc?desc.split('\n'):''
      }
    }
  },
};
</script>

<style scoped lang="less">
.list-tabs-control {
  .el-tabs__nav-wrap {
    /deep/ &:after {
      height: 0;
    }
  }
  .list-title {
    font-size: 13px;
    font-weight: 400;
    color: #9e9e9e;
    height: 40px;
  }
}
.list-img {
  width: 200px;
  height: 200px;
  background-color: pink;
  border-radius: 5px;
  background-size: cover !important;
}
.list-tag {
  font-size: 14px;
  color: #e53935;
  border: 1px solid #e53935;
  border-radius: 3px;
  padding: 2px;
  text-align: center;
}
.list-title {
  font-size: 22px;
  font-weight: 600;
  margin-left: 10px;
}
.list-play {
  color: #fff;
  font-size: 14px;
  border-radius: 28px;
}
.list-play-all {
  display: inline-block;
  padding: 10px 0;
  width: 100px;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  background-color: #f44336;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  cursor: pointer;
}
.list-play-add {
  display: inline-block;
  padding: 10px 0;
  width: 40px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  background-color: #f44336;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
}
.list-play-all:hover {
  background-color: #e53935;
}
.list-play-add:hover {
  background-color: #e53935;
}
.list-des {
  margin: 10px 0;
  color: #000;
  font-weight: 300;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .list-des-sing {
    color: #29b6f6;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
      color: #283593;
    }
    &:nth-child(n + 2) {
      &::before {
        content: "/";
        color: #616161;
        margin-right: 5px;
      }
    }
  }
}
</style>
