<template>
  <section>
    <show-content title="推荐MV"></show-content>
    <div class="mv-content">
      <mv-content v-for="(item,index) in mvs" :key="index" class="mv-item" :mv="item"></mv-content>
    </div>
  </section>
</template>

<script>
// import VPictureCover from 'components/common/picturecover/VPictureCover.vue'
import ShowContent from 'components/common/showcontent/ShowContent.vue'
import MvContent from 'views/detail/children/MvContent.vue'
import {getMVPersonal} from 'network/mv.js'

export default {
  name: 'ReMV',
  data() {
    return {
      mvs:[]
    }
  },
  components: {
    ShowContent,
    MvContent,
  },
  created(){
    getMVPersonal().then(res => {
      // console.log(res);
      this.mvs = res.data.result
    })
  }
}
</script>

<style lang="less" scoped>
.mv-content{
  width: 1100px;
  margin: 0 auto;
  .mv-item{
    width:260px;height:180px;float:left;margin:10px 10px;
    &:nth-child(1){
      margin-left: 0;
    }
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>