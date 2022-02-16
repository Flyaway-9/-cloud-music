<template>
  <div>
    <banner class="swiper"></banner>
    <recommend-list></recommend-list>
    <newest/>
    <private-content></private-content>
    <re-m-v></re-m-v>
  </div>
</template>

<script>
import Banner from './children/Banner.vue'
import PrivateContent from './children/PrivateContent.vue'
import RecommendList from './children/RecommendList.vue'
import Newest from './children/Newest.vue'
import ReMV from './children/ReMV.vue'
export default {
  name: 'Recommend',
  data(){
    return {
      
    }
  },
  components: {
    Banner,
    PrivateContent,
    RecommendList,
    Newest,
    ReMV
  },
  created(){
  },
  methods: {
    
  }
}
</script>

<style scoped>
.swiper {
  margin: 15px 0;
}
</style>