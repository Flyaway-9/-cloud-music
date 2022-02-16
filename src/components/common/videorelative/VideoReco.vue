<template>
  <div id="video">
    <div class="reco-title">相关推荐</div>
    <div>
      <reco-item v-for="item in recoList" :key="item.index" :recoItem="item"></reco-item>
    </div>
  </div>
</template>

<script>
import RecoItem from './RecoItem.vue'
import {getVideoRelevant} from 'network/video.js'
export default {
  props:{
    id:null
  },
  components:{
    RecoItem
  },
  data() {
    return {
      recoList:[]
    }
  },
  mounted(){
    getVideoRelevant(this.id).then(res =>{
      console.log(res);
      this.recoList = res.data.data
    })
  },
  
}
</script>

<style lang="less" scoped>
#video{
  width: 100%;
  .reco-title{
    font-size: 16px;
    font-weight: 600;
    color: #424242;
    margin: 20px 0;
  }
}
</style>