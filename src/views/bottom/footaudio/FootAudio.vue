<template>
  <div class="play-audio">
    <audio
      :src="this.getUrl"
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdata"
      @ended="playNext()"
      @canplay="handleCanplay()"
    ></audio>

    <div class="audio-click">
      <span> <i class="iconfont icon-1_music83" @click="playPre"></i> </span>
      <span class="" v-if="!audio.playing" @click="play">
        <i class="iconfont icon-bofang audio-control"></i
      ></span>
      <span class="" v-if="audio.playing" @click="pause">
        <i class="iconfont icon-iconstop audio-control"></i
      ></span>
      <span> <i class="iconfont icon-1_music82" @click="playNext"></i></span>
    </div>

    <div class="audio-item">
      <div class="play-time">
        {{ audio.currentTime | formatSecond }}
      </div>

      <div class="slider">
        <el-slider
          v-model="audio.currentTime"
          :format-tooltip="formatProcessToolTip"
          @change="changeCurrentTime"
          :max="audio.maxTime"
          @mouseup.native="mouseupChangeTime"
        >
        </el-slider>
      </div>
      <div class="total-time">
        {{ audio.maxTime | formatSecond }}
      </div>
    </div>

    <el-tooltip
      effect="light"
      placement="top"
      class="audio-volumn"
      popper-class="toolp"
    >
      <div slot="content">
        <el-slider
          vertical
          v-model="audio.volume"
          :max="1"
          :step="0.01"
          height="100px"
          @input="changeVolume"
          :format-tooltip="handelVoice"
          input-size="mini"
          class="volume-slider"
        ></el-slider>
      </div>
      <div>
        <i v-if="!audio.muted" @click="mute" class="iconfont icon-shengyin"></i>
        <i
          v-if="audio.muted"
          @click="cancelMute"
          class="iconfont icon-jingyin"
        ></i>
      </div>
    </el-tooltip>
    <foot-play-list></foot-play-list>
  </div>
</template>

<script>
import { Bus } from "@/utils/eventBus.js";
import FootPlayList from "./FootPlayList.vue";
import { getUrl } from "network/song.js";
import { mapGetters } from "vuex";
import { getSongLyric } from "@/network/song.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      audio: {
        playing: false,
        currentTime: 0,
        maxTime: 0,
        muted: false,
        volume: 1,
      },
      songUrl: this.getUrl,
      nowId: undefined,
      cacheCurrent: 0,
      cacheVoice: 1,
      lyric: []
      // ended: this.$refs.audio.ended
    };
  },
  components: {
    FootPlayList,
  },
  methods: {
    ...mapActions(["songDetail"]),
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    },
    onPause() {
      this.audio.playing = false;
    },
    onPlay() {
      this.audio.playing = true;
    },
    play() {
      this.$refs.audio.play();
      // this.audio.playing = true
      Bus.$emit("animationMove", false);
    },
    pause() {
      this.$refs.audio.pause();
      Bus.$emit("animationMove", true);
    },
    mute(event) {
      event && (this.cacheVoice = this.audio.volume);
      this.audio.muted = true;
      this.audio.volume = 0;
      this.$refs.audio.muted = true;
    },
    cancelMute(event) {
      event && (this.audio.volume = this.cacheVoice);
      this.audio.muted = false;
      this.$refs.audio.muted = false;
    },
    onTimeupdata(res) {
      this.audio.currentTime = res.target.currentTime + 0.7;
      this.slidertime = parseInt(
        (this.$refs.currentTime / this.audio.maxTime) * 100
      );
      Bus.$emit('timeupdate',parseInt(this.audio.currentTime))
    },
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration);
    },
    mouseupChangeTime() {
      this.changeCurrentTime(this.cacheCurrent);
    },
    changeCurrentTime(value) {
      // console.log("拖动滚动条触发", this.cacheCurrent);
      this.$refs.audio.currentTime = value >= 0 ? value : this.cacheCurrent;
      this.audio.currentTime = value >= 0 ? value : this.cacheCurrent;
      Bus.$emit('animationMove',false)
    },
    formatProcessToolTip(second) {
      this.cacheCurrent = second;
      return realFormatSecond(second);
    },
    changeVolume() {
      this.cancelMute(false);
      if (this.audio.volume === 0) {
        this.mute(false);
      }
      this.$refs.audio.volume = this.audio.volume;
    },
    handelVoice() {
      return parseInt(this.audio.volume.toFixed(2) * 100);
    },
    //下一首播放
    playNext() {
      let id;
      let result = this.getSongList.findIndex((item) => {
        return item.id === this.getPlayingId;
      });
      if (++result === this.getSongList.length) {
        result = 0;
        id = this.getSongList[0].id;
      } else {
        id = this.getSongList[result].id;
      }
      this.playSong(id);
    },
    //上一首播放
    playPre() {
      let id;
      let result = this.getSongList.findIndex((item) => {
        return item.id === this.getPlayingId;
      });
      if (result === 0) {
        result = this.getSongList.length;
        id = this.getSongList[result - 1].id;
      } else {
        id = this.getSongList[result - 1].id;
      }
      this.playSong(id);
    },
    //播放音乐
    playSong(id) {
        //通知变色
        // this.$store.dispatch('recentSong')
      Bus.$emit("playcolor", id);
      if (this.nowId !== id) {
        this.nowId = id;
        Bus.$emit('songChange',id);
        this.songDetail(id);
        getSongLyric(id).then((res) => {
          this.lyric = formatLyric(res.data.lrc.lyric)
          // console.log(this.lyric);
          this.$store.commit('setLyric',this.lyric)
        });
        Bus.$emit("animationMove", false);
        //获取音乐url
        getUrl(id).then((res) => {
          // console.log(res);
          this.$store.commit('setUrl',res.data.data[0].url) 
          // console.log(this.songUrl);
        });

      }
    },
    handleCanplay() {
      setTimeout(() => {
        this.$refs.audio.play();
      }, 100);
    },
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
  mounted() {
    //监听播放音乐事件
    Bus.$on("songPlay", (id) => {
      this.playSong(id);
      //获取歌词
    });

  },
  computed: {
    //获取当前播放音乐列表和音乐id
    ...mapGetters(["getPlayingId", "getSongList",'getUrl','getProfile']),
  },
  watch: {},
};
function realFormatSecond(second) {
  var secondType = typeof second;
  if ((secondType === "number") | (secondType === "string")) {
    second = parseInt(second);
    var min = Math.floor(second / 60);
    second = second - min * 60;
    return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
}
function formatLyric(text) {
  let lyric1 = []
  let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
  let row = arr.length; //获取歌词行数
  for (let i = 0; i < row; i++) {
    let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
    let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
    let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
    //再对剩下的歌词时间进行处理
    temp_arr.forEach((element) => {
      let obj = {};
      let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
      let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
      obj.time = s;
      obj.text = text;
      lyric1.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
    });
  }
  lyric1.sort(sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
  return lyric1
}
function sortRule(a, b) {
  //设置一下排序规则
  return a.time - b.time;
}
</script>

<style>
.play-audio {
  position: absolute;
  left: 50%;
  width: 800px;
  height: 100%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
}
.audio-click {
  margin: 0 auto;
  width: 400px;
  height: 30px;
  text-align: center;
  padding-top: 5px;
  line-height: 40px;
}
.audio-click .audio-control {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-color: #eeeeee;
  border-radius: 17.5px;
  margin-top: 5px;
  line-height: 35px;
}
.audio-click span {
  cursor: pointer;
  margin: 0 15px;
}
.audio-click .audio-control:hover {
  background-color: #e0e0e0;
}
.audio-click .iconfont:hover {
  color: #409eff;
}
.audio-click .iconfont {
  font-size: 24px;
  color: #000;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.audio-item {
  display: flex;
  height: 36px;
  flex-direction: row;
  margin: 0 auto;
  font-size: 10px;
  color: #ccc;
  line-height: 36px;
}
.slider {
  width: 500px;
  margin: 0 10px;
}
.slider .el-slider__button {
  width: 10px;
  height: 10px;
  background-color: #409eff;
}
.audio-volumn {
  position: absolute;
  right: -220px;
  top: 15px;
  /* width: 20px; */
}

.audio-volumn .iconfont {
  font-size: 30px;
  color: #000;
  cursor: pointer;
}
.volume-slider .el-slider__runway {
  margin: 0 auto !important;
}
.volume-slider .el-slider__button {
  width: 10px;
  height: 10px;
  background-color: #409eff;
}
</style>
