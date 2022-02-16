<template>
  <div id="sing">
    <div style="overflow:auto;">
      <div class="singer-pic"><img :src="baseDetail.cover" alt=""></div>
      <div class="singer-name">{{baseDetail.name}}</div>
      <div class="singer-size">
        <span>单曲数：{{baseDetail.musicSize}}</span>
        <span style="diplay:inline-block;margin:0 20px;">专辑数：{{baseDetail.albumSize}}</span>
        <span>MV数：{{baseDetail.mvSize}}</span>
      </div>
    </div>
    <more-sing-detail :id="id" :alnumSize="baseDetail.albumSize" :mvSize="baseDetail.mvSize"></more-sing-detail>
  </div>
</template>

<script>

import MoreSingDetail from './children/MoreSingDetail.vue'
import {getSingerDetail} from 'network/singer.js'
export default {
  data() {
    return {
      id:null,
      baseDetail:{}
    }
  },
  inject:  ['reload'],
  components:{
    MoreSingDetail
  },
  created(){
    this.id = parseInt(this.$route.query.id)
    getSingerDetail(this.id).then(res => {
      // console.log(res);
      this.baseDetail = res.data.data.artist
    })
  },
  watch: {
    $route(){
      this.id= parseInt(this.$route.query.id)
      // let NewPage = '_empty' + '?time=' + new Date().getTime()/1000 //定义一个空页面
      // this.$router.push(NewPage)
      // this.$router.go(-1) // 返回上一个页面
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>
#sing {
  padding-top: 20px;
  .singer-pic {
    float: left;
    width: 200px;
    margin-right: 20px;
    // height: 200px;
    // background-color: pink;
    border-radius: 5px;
    background-size: cover !important;
    img {
      width: 100%;
      // height: 100%;
      border-radius: 5px;
    }
  }
  .singer-name {
    font-size: 22px;
    font-weight: 600;
  }
  .singer-size {
    user-select: none;
    font-size: 12px;
    margin-top: 20px;
    // font-weight: 300;
  }
}
</style>