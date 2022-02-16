<template>
  <div id="song-chart">
    <strong>官方榜</strong>
    <offical-chart v-for="item in offical" :key="item.index" :ochart="item"></offical-chart>
    <strong>全球榜</strong>
    <div class="g-chart"><global-chart :gchart="item" v-for="item in global" :key="item.index" ></global-chart></div>
    
  </div>
</template>

<script>
import OfficalChart from './children/OfficalChart.vue'
import GlobalChart from './children/GlobalChart.vue'
import {getSongsChart} from 'network/songList.js'
export default {
  data() {
    return {
      offical:[],
      global:[]
    }
  },
  components:{
    OfficalChart,
    GlobalChart,
  },
  created(){
    getSongsChart().then(res => {
      // console.log(res);
      for(let i = 0;i < 4;i++){
        this.offical.push(res.data.list.shift())
      }
      this.global = res.data.list
    })
  },
  methods: {
   
  }
}
</script>

<style lang="less" scoped>
#song-chart {
  width: 1100px;
  margin: 20px auto;
  .g-chart {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>