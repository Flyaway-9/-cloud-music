<template>
  <div class="cover">
    <div class="top-image" :style="{background: 'url('+ this.image +')'}" @mouseenter="mouChange" @mouseleave="mouChange1" @click="detaleTurn">
      <div class="play-count">
        <i class="el-icon-headset"></i> {{ getPlayCount }}
      </div>
      <div class="top-tag"><i class="iconfont icon-huangguan"></i></div>
      <div class="cover-play" v-if="isShow">
        <i class="el-icon-video-play"></i>
      </div>
    </div>
    <div class="cover-name" @click="detaleTurn">{{this.title}}</div>
    <div class="cover-des"> 
      <span class="cover-des-tag">{{this.tag}}</span>
      <span class="cover-des-co">{{this.copywriter}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SPictureCover",
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    image: {
      type: String,
      default() {
        return "";
      },
    },
    copywriter: {
      type: String,
      default() {
        return "";
      },
    },
    id: {
      type: Number,
      default() {
        return null;
      },
    },
    playCount: {
      type: Number,
      default() {
        return null;
      },
    },
    tag: {
      typr: Array,
      default(){
        return null
      }
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    mouChange() {
      this.isShow = true;
      // console.log(this.copywriter);
      // console.log(this.id);
    },
    mouChange1() {
      this.isShow = false;
    },
    detaleTurn(){
      this.$router.push({path:'/listDetail',query:{id:this.id}}).catch(() => {return})
    }
  },
  computed: {
    getPlayCount() {
      let count = this.playCount;
      return count.toString().length > 4
        ? parseInt(count / 10000) + "万"
        : count;
    },
  },
};
</script>

<style scoped>
.cover {
  position: relative;
  width: 500px;
  height: 160px;
  margin: 20px 0;
}
.top-image {
  position: relative;
  float: left;
  width: 160px;
  height: 160px;
  border-radius: 7px;
  background-size: cover !important;
  cursor: pointer;
  overflow: hidden;
}
.top-tag {
  position: absolute;
  left: -18px;
  top: -5px;
  width: 0;
  height: 0;
  border-bottom: 25px solid #ffd54f;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  transform:rotate(-45deg);
}
.top-tag .iconfont {
  position: absolute;
  top: 8px;
  left: -5px;
  font-size: 10px;
  color: #fff;
}
.cover-name {
  position: absolute;
  left: 170px;
  top: 40px;
  font-size: 16px;
  cursor: pointer;
}
.cover-des {
  position: absolute;
  left: 170px;
  bottom: 40px;
}
.cover-des-tag {
  font-size: 4px;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 5px;
}
.cover-des-co {
  font-size: 6px;
  color: #e0e0e0;
}
.play-count {
  position: absolute;
  width: 50%;
  height: 30px;
  font-weight: 300;
  line-height: 30px;
  text-align: end;
  top: 0px;
  right: 10px;
  font-size: 12px;
  color: #fff;
}
.cover-play {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 10px;
  bottom: 10px;
  text-align: start;
  line-height: 35px;
  font-size: 35px;
  border-radius: 35px;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  pointer-events: none;
  animation-name: cover2;
  animation-duration: 2s;
  animation-delay: -1s;
  /* overflow: hidden; */
}
@keyframes cover1 {
  50% {
    top: -50px;
  }
  100% {
    top: 0px;
  }
}
@keyframes cover2 {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
