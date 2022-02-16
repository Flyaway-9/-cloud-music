<template>
  <div id="recoitem">
    <div class="reco-img" @click="itemClick(recoItem.type)" v-loading="loading">
      <span class="reco-playtime"
        ><i class="iconfont icon-bofang"></i
        >{{ getPlayCount(recoItem.playTime) }}</span
      >
      <span class="reco-dt">{{ setTime(recoItem.durationms) }}</span>
      <img :src="recoItem.coverUrl" @load="loaded" alt="" />
    </div>
    <div class="reco-name" @click="itemClick(recoItem.type)">
      <span class="reco-mv" v-if="recoItem.type === 0">MV</span>{{ recoItem.title }}
    </div>
    <div class="reco-author">
      <i class="by" v-if="recoItem.type === 1">by&ensp;</i
      ><span
        class="author-name"
        v-for="item in recoItem.creator"
        :key="item.index"
        @click="singClick(recoItem.type,item.id)"
        >{{ item.userName }}</span
      >
    </div>
  </div>
</template>

<script>
import { Bus } from "utils/eventBus.js";
export default {
  props: {
    recoItem: {},
  },
  inject: ["reload"],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    itemClick(type) {
      Bus.$emit("toTop", 0);
      this.reload();
      switch (type) {
        case 1:
          this.$router.push({
            path: "/videoDetail",
            query: { id: this.recoItem.vid },
          });
          break;
        case 0:
          this.$router.push({
            path: "/mvDetail",
            query: { id: this.recoItem.vid },
          });
          break;
      }
    },
    singClick(type,id){
      switch(type){
        case 0:
          this.$router.push({ path: "/singerDetail", query: { id: id } });
          break;
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
#recoitem {
  width: 290px;
  height: 80px;
  position: relative;
  margin-top: 20px;
  .reco-img {
    position: relative;
    float: left;
    width: 140px;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    .reco-playtime {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 10px;
      color: #fff;
      .iconfont {
        font-size: 10px;
        color: #fff;
      }
    }
    .reco-dt {
      position: absolute;
      right: 5px;
      bottom: 5px;
      font-size: 10px;
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .reco-name {
    float: right;
    // position: absolute;
    width: 135px;
    color: #303133;
    // right: 0;
    // height: 35px;
    font-size: 12px;
    margin-top: 10px;
    // white-space: nowrap;
    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
    .reco-mv{
      display: inline-block;
      color: #409EFF;
      padding: 0 2px;
      border: 1px solid #409EFF;
      border-radius: 3px;
      font-size: 12px;
      -webkit-transform : scale(0.84,0.84) ;
      transform : scale(0.84,0.84);
    }
  }
  .reco-author {
    float: right;
    width: 135px;
    margin-top: 10px;
    font-size: 11px;
    color: #e0e0e0;
    .author-name {
      position: relative;
      margin-right: 10px;
      cursor: pointer;
      &:nth-child(n + 2) {
        &::before {
          content: "/";
          position: absolute;
          font-size: 10px;
          left: -8px;
          pointer-events: none;
        }
      }
      &:hover {
        color: #9e9e9e;
        &::before {
          color: #e0e0e0;
        }
      }
    }
  }
}
</style>
