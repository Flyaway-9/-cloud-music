<template>
  <div>
    <show-content title="推荐歌单"></show-content>
    <section class="section">
      <div v-if="profile">
        <div class="daily-content" @mouseenter="mouChange" @mouseleave="mouChange1" @click="dailyClick">
          <div v-if="isShow" class="cover-play">
            <i class="iconfont icon-bofang"></i>
          </div>
          <div v-if="isShow" class="inner-cover">
          <p>根据您的音乐口味生成每日更新</p>
        </div>
          <span class="daily-date">{{date}}</span>
          <span><i class="iconfont icon-rili"></i></span>
        </div>
        <span class="dialy-title" @click="dailyClick">每日歌曲推荐</span>
      </div>
      <template v-if="recommendList.length">
        <s-picture-cover
        style="width: 200px;"
        v-for="item in recommendList" 
        :key="item.index"
        :title="item.name"
        :image="item.picUrl"
        :copywriter="item.copywriter"
        :playCount="item.playCount"
        :id="item.id"
        @click.native="detaleTurn(item.id)"
        ></s-picture-cover>
      </template>


       <el-skeleton v-else style="width: 200px;" animated v-for="item in 10" :key="item">
          <template #template>
            <el-skeleton-item variant="image" style="width: 200px; height: 200px;" />
            <div style="margin-top: 8px;">
              <el-skeleton-item variant="p" style="width: 100%;"/>
              <el-skeleton-item variant="p" style="width: 50%; margin-top: 5px;" />
            </div>
          </template>
        </el-skeleton>
        
    </section>
  </div>
</template>

<script>
import ShowContent from 'components/common/showcontent/ShowContent.vue'
import SPictureCover from 'components/common/picturecover/SPictureCover.vue'

import {getRecommendList} from 'network/songList.js'
import {mapGetters} from 'vuex'
import {getRecommendSongs} from 'network/recommend.js'
export default {
  name: 'RecommendList',
  data() {
    return {
      recommendList: [],
      isShow: false,
      date:Number
    }
  },
  components: {
    ShowContent,
    SPictureCover
  },
  created(){
    this.date = getDay()
    getRecommendList().then( res => {
      // console.log(res);
      this.recommendList = res.data.result
      if(this.profile){
        this.recommendList.pop()
      }
    }),
    getRecommendSongs().then( () => {
      // console.log(res);
    })
  },
  methods: {
    detaleTurn(id){
      this.$router.push({path:'/listDetail',query:{id:id}}).catch(() => {return})
    },
     mouChange() {
      this.isShow = true;
      // console.log(this.copywriter);
      // console.log(this.id);
    },
    mouChange1() {
      this.isShow = false;
    },
    dailyClick(){
      this.$router.push({path:'/dailyrecommend'})
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile'
    }),
    
  },
  watch: {

  }
}
function getDay(){
  let date = new Date()
  let D = date.getDate()
  return D
}
</script>

<style lang="less">
.section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
}
.daily-content{
  position: relative;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  border-radius: 10px;
  background:url('../../../../../assets/img/daily-back.png');
  background-size: cover;
  overflow: hidden;
  color: #fff;
  .cover-play{
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: #fff;
    width: 35px;
    height: 35px;
    z-index: 11;
    text-align: center;
    line-height: 35px;
    border-radius: 35px;
    pointer-events: none;
    animation-name: cover2;
    animation-duration: 2s;
    animation-delay: -1s;
    .iconfont{
      color: #409EFF;
      font-size: 16px;
    }
  }
  .iconfont{
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 80px;
    font-weight: 300;
    color: #fff;
    transform: translate(-50%,-50%);
    z-index: 9;
  }
  cursor: pointer;
  .daily-date{
    position: absolute;
    left: 50%;
    top: 55%;
    font-size: 25px;
    transform: translate(-50%,-50%);
    z-index: 9;
  }
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(4px);
    z-index: 5;
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
}
.dialy-title{
  font-size: 14px;
  font-weight: 400;
  color: #424242;
  cursor: pointer;
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