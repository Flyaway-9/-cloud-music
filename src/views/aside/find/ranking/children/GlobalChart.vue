<template>
  <div class="o-chart">
    <div class="chart-item"  >
      <div class="item-img" :style="{background:'url('+ gchart.coverImgUrl +')'}" @click="itemClick" @mouseenter="onmouse" @mouseleave="outmouse">
        <div class="item-play-count">
          <i class="el-icon-headset"></i>
          {{playCount}}
        </div>
        <div class="item-play" v-if="active">
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <span class="item-name" @click="itemClick">{{gchart.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },
  props: {
    gchart: []
  },
  methods: {
    onmouse(){
      this.active = true
    },
    outmouse(){
      this.active = false
    },
    itemClick(){
      // console.log('1');
      this.$router.push({path:'/listDetail',query:{id:this.gchart.id}}).catch(() => {return})
    }
  },
  computed: {
    playCount() {
     let count =  this.gchart.playCount.toString()
     return count.length > 8 ? count.substr(0,count.length - 8) + '亿' : count.substr(0,count.length - 4) + '万'
    }
  }
}
</script>

<style lang="less" scoped>
.o-chart{
  -webkit-user-select: none; /*webkit浏览器*/
  user-select: none;
  .chart-item {
    margin: 10px 0;
    width: 200px;
    .item-img {
      position: relative;
      width: 100%;
      height: 200px;
      border-radius: 5px;
      cursor: pointer;
      background-size: cover !important;
      background-color: pink;
      .item-play-count {
        position: absolute;
        right: 10px;
        top: 5px;
        color: #fff;
        font-size: 8px;
      }
      .item-play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50px;
        background-color: rgba(255,255,255,.9);
        .iconfont {
          font-size: 25px;
        }
      }
    }
    .item-name {
      display: inline-block;
      max-width: 180px;
      font-size: 14px;
      font-weight: 400;
      color: #616161;
      margin-top: 5px;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>