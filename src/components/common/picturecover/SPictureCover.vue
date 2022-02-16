<template>
  <div class="cover">
    <div v-if="isShow" class="cover-play">
      <i class="el-icon-video-play"></i>
    </div>
    <div
      v-if="playCount && !isShow"
      class="play-count"
      @mouseenter="mouChange"
      @mouseleave="mouChange1"
    >
      <i class="el-icon-headset"></i>
      {{ getPlayCount }}
    </div>

    <span class="list-content" @mouseenter="mouChange" @mouseleave="mouChange1">
      <div class="img-content">
        <div v-if="isShow && copywriter" class="inner-cover">
          <p>{{ copywriter }}</p>
        </div>
        <img :src="this.image" alt="" />
      </div>
      <span>{{ title }}</span>
    </span>
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
  width: 100%;

  overflow: hidden;
  margin: 10px 0;
}
.cover .list-content {
  cursor: pointer;
}
.cover img {
  width: 100%;
  height: 100%;
  /* height: 150px; */
}
.img-content {
  /* width: 100%; */
  height: 200px;
  border: 1px solid #efedf0;
  border-radius: 10px;
  overflow: hidden;
}
.cover span {
  font-size: 14px;
  font-weight: 400;
  color: #424242;
}
.inner-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9;
  font-size: 12px;
  color: #fff;
  padding: 0 10px;
  pointer-events: none;
  animation-name: cover1;
  animation-duration: 1.2s;
  animation-delay: -0.6s;
}
.cover-play {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 10px;
  bottom: 50px;
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
</style>
