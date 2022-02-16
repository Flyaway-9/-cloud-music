<template>
  <div>
    <tab-control :titles="titles"></tab-control>
    <router-view> </router-view>
  </div>
</template>

<script>
import TabControl from "components/common/tabcontrol/TabControl.vue";
export default {
  name: "FindMusic",
  data() {
    return {
      titles: [
        { title: "个性推荐", path: "/recommend" },
        { title: "歌单", path: "/playlist" },
        { title: "排行榜", path: "/songschart" },
        { title: "歌手", path: "/singer" },
        { title: "最新音乐", path: "/newestMusic" },
      ],
    };
  },
  components: {
    TabControl,
  },
};
</script>
<style></style>
