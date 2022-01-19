<template>
  <div>
    <tab-control :titles="titles"></tab-control>
    <router-view></router-view>
  </div>
</template>

<script>
import TabControl from 'components/common/tabcontrol/TabControl.vue'
export default {
  name: 'FindMusic',
  data() {
    return {
      titles: ['个性推荐','歌单','排行榜','歌手','最新音乐'],
    }
  },
  components: {
    TabControl
  }
}
</script>

<style>

</style>