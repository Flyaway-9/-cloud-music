<template>
  <div>
    <my-swiper class="swiper"></my-swiper>
  </div>
</template>

<script>
import MySwiper from 'components/common/Swiper/MySwiper.vue'

export default {
  name: 'Recommend',
  components: {
    MySwiper
  }
}
</script>

<style scoped>
.swiper {
  margin: 15px 0;
}
</style>