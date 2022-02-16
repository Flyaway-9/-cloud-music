<template>
  <div class="o-chart">
    <div
      class="chart-img"
      :style="{ background: 'url(' + ochart.coverImgUrl + ')' }"
      @mouseenter="onmouse" @mouseleave="outmouse"
      @click="itemClick"
    >
      <div class="item-play" v-if="active">
        <i class="iconfont icon-bofang"></i>
      </div>
      <span class="update-time">{{ updateTime }}</span>
    </div>
    <div class="chart-list" >
      <div class="list-item" v-for="(item, index) in chartList" :key="index" @dblclick="listClick(item.id)">
        <span class="list-item-no" :class="{ hot: index < 3 }">{{
          index + 1
        }}</span>
        <span
          >{{ item.name }}
          <span v-if="item.alia.length" style="font-size: 13px; color: #9e9e9e"
            >({{ item.alia[0] }})</span
          ></span
        >
        <span class="list-item-sing" v-for="ar in item.ar" :key="ar.index">{{
          ar.name
        }}</span>
      </div>
      <span class="chart-more"
      @click="itemClick"
        >查看更多<i class="el-icon-arrow-right"></i
      ></span>
    </div>
  </div>
</template>

<script>
import { getListAll } from "network/songList.js";
import {getSongDetail} from 'network/song.js'
import {Bus} from "utils/eventBus.js"
export default {
  props: {
    ochart: {},
  },
  data() {
    return {
      chartList: [],
      active: false
    };
  },
  created() {
    getListAll(this.ochart.id, 5).then((res) => {
      // console.log(res);
      this.chartList = res.data.songs;
    });
  },
  computed: {
    updateTime() {
      return updatetime(this.ochart.updateTime);
    },
  },
  methods:{
    onmouse(){
      this.active = true
    },
    outmouse(){
      this.active = false
    },
    itemClick(){
      // console.log('1');
      this.$router.push({path:'/listDetail',query:{id:this.ochart.id}}).catch(() => {return})
    },
    listClick(id){
      let a
      // console.log(id);
      Bus.$emit('songPlay',id)
      getSongDetail(id).then( res => {
        a = res.data.songs[0]
        // console.log(a);
        let b = {id: a.id,name: a.name,song: {alias:a.alia,artists: a.ar,duration:a.dt}}
        // console.log(b);
        this.$store.commit('addSong',b)
      })
      
    }
  }
};
function updatetime(second) {
  let date = new Date(second);
  let M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return M + "月" + D + "日更新";
}
</script>

<style lang="less" scoped>
.hot {
  color: #d32f2f !important;
}
.o-chart {
  position: relative;
  margin: 20px 0;
  height: 180px;
  -webkit-user-select: none; /*webkit浏览器*/
  user-select: none;
  .update-time {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%);
    color: #fff;
    font-size: 12px;
  }
  .chart-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 160px;
    border-radius: 5px;
    cursor: pointer;
    background-color: pink;
    background-size: cover !important;
    .item-play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 40px;
        background-color: rgba(255,255,255,.5);
        .iconfont {
          font-size: 25px;
        }
      }
  }
  .chart-list {
    position: absolute;
    right: 0;
    width: 900px;
    .chart-more {
      margin-top: 5px;
      font-size: 12px;
      color: #9e9e9e;
      cursor: pointer;
    }
    .list-item {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      &:nth-child(2n + 1) {
        background-color: #f5f5f5;
      }
      &:hover {
        background-color: #eeeeee;
      }
      span {
        display: inline-block;
      }
      .list-item-no {
        margin: 0 10px;
        color: #9e9e9e;
      }
      .list-item-sing {
        float: right;
        color: #9e9e9e;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 10px;
        cursor: pointer;
        &:hover {
          color: #212121;
        }
      }
    }
  }
}
</style>
