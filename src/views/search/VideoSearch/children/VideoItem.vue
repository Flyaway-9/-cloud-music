<template>
  <div id="vedio" v-if="vedio.creator">
    <div class="v-pic" v-loading="loading" @click="itemClick(vedio.type)">
      <span class="v-count"
        ><i class="iconfont icon-bofang"></i
        >{{
          getPlayCount(vedio.playTime)
        }}</span
      >
      <span class="v-time" v-if="vedio">{{
        setTime(vedio.durationms)
      }}</span>
      <img
        :src="vedio.coverUrl"
        alt=""
        @load="loaded"
      />
    </div>
    
    <span class="v-title" @click="itemClick(vedio.type)">
      <span class="v-title-mv" v-if="vedio.type === 0"
        >MV</span>
      {{ vedio.title}} </span
    >
    <div class="v-creator" v-if="vedio.type === 1">
      by&ensp;<span>{{vedio.creator[0].userName}}</span>
    </div>
    <div class="v-ar" v-if="vedio.type === 0">
      <span
        v-for="(item, index) in vedio.creator"
        :key="index"
        @click="singClick(item.userId)"
        class="sing-name"
        >{{ item.userName }}</span
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
      keyword:String
    };
  },
  created(){
    this.keyword = this.$route.query.keyword
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
            query: { id: this.vedio.vid },
          });
          break;
        case 0:
          this.$router.push({
            path: "/mvDetail",
            query: { id: this.vedio.vid},
          });
          break;
      }
    },
    brightenKeyword(val, keyword) {
      const Reg = new RegExp(keyword, "i");
      if (val) {
        return val.replace(
          Reg,
          `<span style="color: #409EFF;">${keyword}</span>`
        );
      }
    },
    loaded() {
      this.loading = false;
    },
    
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
      position: absolute;
      max-width:100%;
      // height: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
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
      font-size: 12px;
      transform: scale(0.86);
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
     text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
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