<template>
  <div id="video">
    <video-control :items="items" @routerChange="routerChange"></video-control>
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import VideoControl from './children/VedioControl.vue'
export default {
  components:{
    VideoControl
  },
  data() {
    return {
      items:[{name:'视频',path:'/userVideo'},{name:'MV',path:'/mv'}]
    }
  },
  methods:{
    routerChange(path){
      this.$router.push(this.$route.matched[0].path + path)
      // console.log(this.$route);
    }
  }
}
</script>

<style lang="less" scoped>
#video{
  // height: 800px;
}
</style>