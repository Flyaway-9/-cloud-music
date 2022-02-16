<template>
  <div id="ranki" v-if="mv" :class="{oactive: index%2===1,dactive:index%2===0,tactive:index<3,bactive:total-index<2}">
    <div class="mv-title">{{ mvIndex }}</div>
    <div class="mv-img" @click="mvClick(mv.id)">
      <span class="mv-hot"><i class="iconfont icon-redu"></i>{{mv.score}}</span>
      <img :src="mv.cover" @load="loaded" alt="" />
    </div>
    <div class="mv-content">
      <span class="mv-name">{{ mv.name }}</span>
    </div>
    <span class="sing-name">
      <span
        v-for="item in mv.artists"
        :key="item.index"
        class="sing-name-item"
        @click="singClick(item.id)"
        >{{ item.name }}</span
      >
    </span>
  </div>
</template>

<script>
import {Bus} from 'utils/eventBus.js'
export default {
  props: {
    mv: {},
    index: Number,
    total:Number
  },
  data() {
    return {};
  },
  methods:{
    loaded(){
      this.$emit('itemloaded')
    },
    mvClick(id){
      Bus.$emit("toTop", 0);
      this.$router.push({path:'/mvDetail',query:{id:id}})
    },
    singClick(id) {
      Bus.$emit("toTop", 0);
      this.$router.push({ path: "/singerDetail", query: { id: id } });
    },
  },
  computed:{
    mvIndex(){
      return this.index < 10 ? '0' + this.index : this.index
    },
  }
};
</script>

<style lang="less" scoped>
.tactive{
  border-top: 0!important;
}
.bactive{
  border-bottom: 0!important;
}
.oactive{
  border-left: 0!important;
}
.dactive{
  border-right: 0!important;
}
#ranki {
  user-select: none;
  position: relative;
  width: 49%;
  height: 135px;
  // background-color: pink;
  border: 0.5px solid #eee;
  // line-height: 135px;
  .mv-title {
    position: absolute;
    top: 55px;
    left: 15px;
    font-size: 20px;
    color: #90a4ae;
  }
  .mv-img {
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translate(0, -50%);
    width: 175px;
    height: 95px;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    // background-color: pink;
    .mv-hot{
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 12px;
      color: #fff;
      .iconfont{
        font-size: 12px;
        color: #fff;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mv-content {
    position: absolute;
    // pointer-events: none;
    left: 45%;
    top: 30px;
    width: 195px;
    height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .mv-name {
      // position: absolute;
      // top: 20px;
      font-size: 14px;
      cursor: pointer;
      color: #616161;
      &:hover {
        color: #000;
      }
    }
  }
  .sing-name {
    position: absolute;
    top: 60px;
    font-size: 12px;
    color: #bdbdbd;
    position: absolute;
    left: 45%;
    height: 0;
    cursor: pointer;

    .sing-name-item {
      position:relative;
      margin-right: 10px;
      &:hover {
        color: #616161;
        &::before{
          color: #bdbdbd;
        }
      }
      &:nth-child(n+2){
        &::before{
          content: '/';
          position: absolute;
          left: -8px;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
