<template>
  <div id="vedio">
    <div class="v-pic" v-loading="loading" @click="mvClick(mv.id)">
      <span class="v-count"><i class="iconfont icon-bofang"></i>{{getPlayCount(mv.playCount)}}</span>
      <span class="v-time">{{setTime(mv.duration)}}</span>
      <img :src="mv.imgurl16v9?mv.imgurl16v9:mv.picUrl" alt="" @load="loaded" />
    </div>
    <span class="v-title" @click="mvClick(mv.id)">{{ mv.name }}</span>
  </div>
</template>

<script>
import {Bus} from 'utils/eventBus.js'
export default {
  props: {
    mv: {},
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    loaded() {
      this.loading = false;
      // console.log(this.mv.id);
    },
    mvClick(id){
        Bus.$emit("toTop", 0);
      this.$router.push({path:'/mvDetail',query:{id:id}})
    }
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
        let ctime = time + "";
        ctime = ctime.substring(0, ctime.length - 3);
        ctime = parseInt(ctime);
        let min = Math.floor(ctime / 60);
        let second = ctime % 60;
        return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
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
    border-radius: 10px;
    overflow: hidden;
    // box-shadow: black 0 0 10px;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20%;
      background: linear-gradient(to top, transparent, #9e9e9e);
    }
    &::before{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 15%;
      background: linear-gradient(to bottom, transparent, #9e9e9e);
    }
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
      .iconfont{
        font-size: 15px;
        color: #fff;
      }
    }
    .v-time{
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
  }
}
</style>
