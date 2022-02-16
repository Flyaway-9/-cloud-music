<template>
  <div id="vedio" v-if="vedio || vedio.data || vedio.data.data.creator">
    <div class="v-pic" v-loading="loading" @click="itemClick(vedio.type)">
      <span class="v-count"
        ><i class="iconfont icon-bofang"></i
        >{{
          getPlayCount(vedio.playCount) ||
          getPlayCount(vedio.data.playTime) ||
          getPlayCount(vedio.data.playCount)
        }}</span
      >
      <span class="v-time" v-if="vedio.data">{{
        setTime(vedio.duration) ||
        setTime(vedio.data.durationms) ||
        setTime(vedio.data.duration)
      }}</span>
      <img
        :src="vedio.cover || vedio.data.imgurl16v9 || vedio.data.coverUrl"
        alt=""
        @load="loaded"
      />
    </div>
    <span class="v-title" @click="itemClick(vedio.type)">
      <span class="v-title-mv" v-if="vedio.artists || vedio.data.artists"
        >MV</span
      >
      {{ vedio.name || vedio.data.title || vedio.data.name }}</span
    >
    <div class="v-creator" v-if="vedio.data && vedio.data.creator">
      by&ensp;{{ vedio.data.creator.nickname }}
    </div>
    <div class="v-ar" v-if="vedio.artists || vedio.data.artists">
      <span
        v-for="(item, index) in vedio.artists || vedio.data.artists"
        :key="index"
        @click="singClick(item.id)"
        class="sing-name"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { Bus } from "utils/eventBus.js";
export default {
  props: {
    vedio: {},
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    singClick(id) {
      Bus.$emit("toTop", 0);
      this.$router.push({ path: "/singerDetail", query: { id: id } });
    },
    itemClick(type) {
      Bus.$emit("toTop", 0);
      switch (type) {
        case 1:
          this.$router.push({
            path: "/videoDetail",
            query: { id: this.vedio.data.vid },
          });
          break;
        case 2:
          this.$router.push({
            path: "/mvDetail",
            query: { id: this.vedio.id || this.vedio.data.id },
          });
          break;
      }
    },
    loaded() {
      this.loading = false;
      // console.log(this.vedio.id);
    },
    videoClick(id) {
      console.log(id);
      // Bus.$emit("toTop", 0);
      // this.$router.push({path:'/mvDetail',query:{id:id}})
    },
    // mvClick(id){
    //     Bus.$emit("toTop", 0);
    //   this.$router.push({path:'/mvDetail',query:{id:id}})
    // }
  },
  computed: {
    getPlayCount() {
      return (count) => {
        return parseInt(count).toString().length > 5
          ? parseInt(count / 10000) + "万"
          : count;
      };
    },
    setTime() {
      return (time) => {
        if (time) {
          let ctime = time + "";
          ctime = ctime.substring(0, ctime.length - 3);
          ctime = parseInt(ctime);
          let min = Math.floor(ctime / 60);
          let second = ctime % 60;
          return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
        } else return "00:00";
      };
    },
  },
};
</script>

<style lang="less" scoped>
#vedio {
  // width: 320px;
  // height: 225px;
  .v-pic {
    position: relative;
    width: 100%;
    height: 80%;
    border-radius: 5px;
    overflow: hidden;
    // box-shadow: black 0 0 10px;
    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   height: 20%;
    //   background: linear-gradient(to top, transparent, #9e9e9e);
    // }
    // &::before{
    //   content: '';
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    //   height: 15%;
    //   background: linear-gradient(to bottom, transparent, #9e9e9e);
    // }
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    .v-count {
      position: absolute;
      right: 10px;
      top: 5px;
      font-size: 12px;
      color: #fff;
      z-index: 999;
      .iconfont {
        font-size: 15px;
        color: #fff;
      }
    }
    .v-time {
      position: absolute;
      right: 10px;
      bottom: 5px;
      font-size: 12px;
      color: #fff;
      z-index: 999;
    }
  }
  .v-title {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #616161;
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      color: #000;
    }
    .v-title-mv {
      display: inline-block;
      font-size: 11px;
      color: #409eff;
      border: 1px solid #409eff;
      border-radius: 3px;
    }
  }
  .v-creator {
    margin-top: 3px;
    font-size: 11px;
    color: #e0e0e0;
    pointer-events: none;
  }
  .v-ar {
    margin-top: 3px;
    font-size: 11px;
    color: #e0e0e0;
    .sing-name {
      margin: 0 5px;
      position: relative;
      cursor: pointer;
      &:hover {
        color: #bdbdbd;
        &::before{
          color: #e0e0e0;
        }
      }
      &:first-child {
        margin-left: 0;
      }
      &:nth-child(n + 2) {
        &::before {
          content: "/";
          position: absolute;
          left: -8px;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
