<template>
  <div class="foot-playlist-item" @click="dialogShow">
    <i class="iconfont icon-bofangliebiao"></i>
  </div>
  
</template>

<script>
import {Bus} from '@/utils/eventBus.js'
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    }
  },
  methods: {
    dialogShow(){
      Bus.$emit('showDialog')
    }
    
  }
}
</script>

<style>
.foot-playlist-item {
    position: absolute;
    right: -255px;
    bottom: 23px;
    cursor: pointer;
    z-index: 999;
}
.foot-playlist-item .iconfont {
  font-size: 24px;
  color: #000;
}
</style>