<template>
  <el-drawer
    title="我是标题"
    :visible.sync="visiableSongDetail"
    direction="btt"
    class="detail-dialog scrollbar"
    :modal="false"
    :withHeader="false"
  >
    <!-- <div class="dialog-top"></div> -->
    <div class="overflowAuto" @scroll="getScroll">
      <div class="dialog-contain">
        <div class="detail-dialog-header"></div>
        <div class="header-lyric">
          <i class="el-icon-arrow-down" @click="detailClose"></i>
          <div class="header-lyric-del" v-if="headerShow">
            <div style="height: 20px; color: #424242">
              {{ songDetails.name }}
            </div>
            <div
              style="
                height: 20px;
                font-size: 14px;
                color: #9e9e9e;
                font-weight: 300;
              "
            >
              {{ lyricNow }}
            </div>
          </div>
        </div>
        <div class="dialog-song-name">{{ songDetails.name }}</div>
        <div class="dialog-detail-title">{{ songDetails.alia[0] }}</div>
        <div class="dialog-detail-item">
          <span class="sing-name-content">
            <span
              class="dialog-singer-name"
              v-for="ar in songDetails.ar"
              :key="ar.index"
              @click="singClick(ar.id)"
              >{{ ar.name }}</span
            >
          </span>
          <span>- </span>
          <!-- <el-col :span="1">-</el-col> -->
          <span
            style="text-align: left; cursor: pointer"
            class="al-name"
            @click="albumClick(songDetails.al.id)"
            >{{ songDetails.al.name }}
            <span v-if="songDetails.alia[0]"
              >({{ songDetails.alia[0] }})</span
            ></span
          >
        </div>
        <div class="song-animation">
          <div id="effect-music">
            <div
              class="image"
              :class="{ move: isActive }"
              :style="{ background: 'url(' + songDetails.al.picUrl + ')' }"
            ></div>
            <div class="wave" :class="{ move: isActive }"></div>
            <div class="wave" :class="{ move: isActive }"></div>
            <div class="wave" :class="{ move: isActive }"></div>
            <div class="wave" :class="{ move: isActive }"></div>
          </div>
        </div>
        <div class="song-lyric-content">
          <el-row type="flex" justify="center" class="lyric-contain">
            <el-col :span="23" class="song-lyric" :style="lyricMove">
              <!-- 这里用内联样式来实现当前歌词的高亮显示 -->
              <el-row
                v-for="(item, index) in lyric"
                :key="index"
                :style="{
                  'font-size': index == currentRow ? '20px' : '14px',
                  'font-weight': index == currentRow ? '600' : '300',
                }"
                class="lyric-row"
                >{{ item.text }}</el-row
              >
            </el-col>
          </el-row>
        </div>
        <div style="width: 780px; margin: 20px auto; margin-top: 600px">
          <div class="position-box"></div>
          <comment-detail
            ref="comment"
            v-if="visiableSongDetail"
            @commentCan="commentCan"
          ></comment-detail>
        </div>
        <div class="detail-dialog-footer" v-if="visiableSongDetail">
          <el-button size="small" round @click="commentClick" v-if="buttonShow"
            ><i class="el-icon-edit" style="font-size: 15px"></i>
            发表我的音乐评论</el-button
          >
          <el-button
            icon="el-icon-top"
            circle
            style="position: absolute; right: -50px"
            v-if="buttonShow"
            @click="toTop"
          ></el-button>
          <el-button
            size="small"
            round
            @click="commentClick"
            v-if="!buttonShow"
            style="position: absolute; right: -90px;top:-50px;"
            ><i class="el-icon-edit" style="font-size: 15px"></i
            >写评论</el-button
          >
        </div>
        <el-dialog
          :title="songDetails.name"
          :visible.sync="replyVisable"
          width="470px"
          center
        >
          <div slot class="dialog-body">
            <div class="c-input" style="width: 100%; margin: 20px 0">
              <el-input
                type="textarea"
                v-model="textarea"
                maxlength="140"
                show-word-limit
                placeholder="发表评论"
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
    </div>
  </el-drawer>
</template>

<script>
import { Bus } from "utils/eventBus.js";
import { mapGetters } from "vuex";
import { sendComment } from "network/comment.js";
import CommentDetail from "@/views/comment/CommentDetail.vue";
export default {
  data() {
    return {
      visiableSongDetail: false,
      isActive: true,
      lyricCurrent: 0,
      currentRow: 0,
      lyricMove: {
        top: 0,
      },
      top: 0,
      commentShow: false,
      replyVisable: false,
      textarea: "",
      buttonShow: false,
      lyricNow: "",
      headerShow: false,
    };
  },
  components: {
    CommentDetail,
  },
  methods: {
    detailClose() {
      this.visiableSongDetail = false;
    },
    singClick(id) {
      this.$router.push({ path: "/singerDetail", query: { id: id } });
      this.detailClose();
    },
    albumClick(id) {
      this.$router.push({ path: "/albumDetail", query: { id: id } });
      this.detailClose();
    },
    sendComment() {
      sendComment(1, 0, this.id, this.textarea).then((res) => {
        // console.log(res);
        this.textarea = "";
        console.log(res);
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
      this.replyVisable = false;
    },
    commentClick() {
      this.replyVisable = true;
    },
    getScroll() {
      this.top = this.$el.querySelector(".overflowAuto").scrollTop;
      // console.log(this.top);
    },
    toTop() {
      document
        .getElementsByClassName("detail-dialog-header")[0]
        .scrollIntoView({ behavior: "smooth" });
    },
    commentCan() {
      //   this.$refs.comment.id = this.id;
      //   this.$refs.comment.type = 0;
    },
  },
  mounted() {
    Bus.$on("DetailDialog", () => {
      // console.log(id);
      this.visiableSongDetail = !this.visiableSongDetail;
      let timer = setInterval(() => {
        if (this.$refs.comment) {
          this.$nextTick(() => {
            this.$refs.comment.id = this.id;
            this.$refs.comment.type = 0;
            clearInterval(timer);
          });
        }
      }, 100);
    });
    Bus.$on("animationMove", (res) => {
      this.isActive = res;
    });
    Bus.$on("songChange", (id) => {
      // console.log(this.id);
      // console.log(id);
      // this.id = id
      let timer = setInterval(() => {
        if (this.$refs.comment) {
          this.$refs.comment.id = id;
          this.$refs.comment.type = 0;
          clearInterval(timer);
        }
      });
    });
    Bus.$on("timeupdate", (res) => {
      // console.log(res);
      this.lyricCurrent = res;
    });
  },
  updated() {},
  computed: {
    ...mapGetters({
      lyric: "getLyric",
      songDetails: "getSongDetail",
      id: "getPlayingId",
    }),
    isSend() {
      return this.textarea === "";
    },
  },
  watch: {
    lyricCurrent() {
      this.lyric.forEach((element, index) => {
        if (this.lyricCurrent === element.time) {
          this.lyricMove.top = -index * 60 + 20 + "px";
          this.currentRow = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
          // console.log("change");
          // console.log(this.lyric[this.currentRow]);
          this.lyricNow = this.lyric[this.currentRow].text;
        }
      });
    },
    top() {
      if (this.top >= 100) {
        this.buttonShow = true;
      }
      if (this.top < 100) {
        this.buttonShow = false;
      }
      if (this.top >= 200) {
        this.headerShow = true;
      }
      if (this.top < 200) {
        this.headerShow = false;
      }
    },
  },
};
</script>

<style lang="less">
.position-box{
  padding-bottom: 50px;
}
.dialog-contain {
  position: relative;
  width: 1400px;
  margin: 0 auto;
  height: 100%;
}
.detail-dialog {
  bottom: 70px !important;
  position: relative;

  /* min-width: 1100px; */
}
.dialog-detail-title {
  width: 400px;
  margin: 0 auto;
  font-size: 14px;
  color: #000;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.sing-name-content {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
.dialog-song-name {
  width: 100%;
  text-align: center;
  font-size: 30px;
}
.dialog-detail-item {
  width: 400px;
  margin: 0 auto;
  font-size: 14px;
  color: #000;
  font-weight: 300;
  text-align: center;
}
.al-name {
  display: inline-block;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dialog-singer-name {
  margin-right: 5px;
  cursor: pointer;
}
.dialog-singer-name:hover {
  color: #409eff;
}
.al-name:hover {
  color: #409eff;
}
.detail-dialog .el-drawer.btt {
  height: 100% !important;
  /* width: 1440px; */
  background: linear-gradient(
    179.8242466263601deg,
    rgba(227, 227, 227, 1) 9.617868675995695%,
    rgba(254, 254, 254, 1) 44.709364908503765%,
    rgba(255, 255, 255, 1) 44.709364908503765%
  );
}
.detail-dialog-header {
  position: relative;
  height: 80px;
  line-height: 80px;
}
.header-lyric {
  position: fixed;
  top: 0;
  width: 1400px;
  height: 80px;
  margin: 0 auto;
  background: rgba(227, 227, 227, 1);
  z-index: 10;
  .header-lyric-del {
    user-select: none;
    position: absolute;
    left: 50%;
    width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 20px;
    transform: translate(-50%);
    text-align: center;
  }
  .el-icon-arrow-down {
    position: absolute;
    bottom: 30px;
    left: 0;
    font-size: 25px;
    cursor: pointer;
    z-index: 99;
  }
}

.detail-dialog-footer {
  position: fixed;
  bottom: 110px;
  width: 780px;
  height: 37px;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
}
.c-input {
  .el-textarea__inner {
    height: 105px !important;
  }
}
.song-lyric-content {
  position: absolute;
  left: 50%;
  top: 200px;
  width: 400px;
  height: 500px;
  overflow: hidden;
  transform: translate(-50%);
}
.song-lyric {
  position: absolute;
  margin-top: 200px;
  transition: all 1s;
}
.lyric-row {
  text-align: center;
}
.song-animation {
  position: absolute;
  top: 200px;
  left: 0;
  width: 400px;
  height: 400px;
}
.move {
  animation-play-state: paused !important;
}
@keyframes lyric-slider {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20px);
  }
}
#effect-music {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#effect-music > .image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  /* background: url(); */
  background-size: cover !important;
  background-position: center center !important;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  animation: rotate 10s linear 0s infinite;
  -webkit-animation: rotate 10s linear 0s infinite;
}

#effect-music > .wave {
  position: absolute;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 204px;
  height: 204px;
  border-radius: 50%;
  border: 2px solid #eee;
  animation: wave 4s linear 0s infinite;
  -webkit-animation: wave 4s linear 0s infinite;
}

#effect-music > .wave::after {
  content: "";
  position: absolute;
  top: -4px;
  left: 50%;
  width: 6px;
  height: 6px;
  overflow: hidden;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  background-color: #ccc;
}

#effect-music > .wave:nth-child(2) {
  animation-delay: 1s;
}

#effect-music > .wave:nth-child(3) {
  animation-delay: 2s;
}

#effect-music > .wave:nth-child(4) {
  animation-delay: 3s;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
  }
}

@keyframes wave {
  from {
    opacity: 1;
    transform: rotate(0deg) scale(1);
    -webkit-transform: rotate(0deg) scale(1);
    -moz-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    -o-transform: rotate(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotate(-300deg) scale(2.2);
    -webkit-transform: rotate(-300deg) scale(2.2);
    -moz-transform: rotate(-300deg) scale(2.2);
    -ms-transform: rotate(-300deg) scale(2.2);
    -o-transform: rotate(-300deg) scale(2.2);
  }
}
</style>
