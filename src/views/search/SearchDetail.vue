<template>
  <div id="search">
    <h3 class="search-content">
      搜索&ensp;<span>{{ keyword }}</span>
    </h3>
    <div class="search-control">
      <span
        class="control-item"
        :class="{ typeActive: isActive(item.type) }"
        v-for="(item, index) in searchType"
        :key="index"
        @click="controlClick(item)"
        >{{ item.name }}</span
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: String,
      type: null,
      searchType: [
        { name: "单曲", path: "/songs", type: 1 },
        { name: "歌手", path: "/singer", type: 100 },
        { name: "专辑", path: "/album", type: 10 },
        { name: "视频", path: "/video", type: 1014 },
        { name: "歌单", path: "/playlist", type: 1000 },
      ],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.type = this.$route.query.type;
  },
  mounted() {},
  methods: {
    controlClick(e) {
      this.$store.commit('setSearchType',{path:e.path,type:e.type})
      this.$router.push({
        path: this.$route.matched[0].path + e.path,
        query: { keyword: this.keyword, type: e.type },
      });
    },
  },
  computed: {
    isActive() {
      return (type) => {
        return String(type) === this.$route.query.type;
      };
    },
  },
};
</script>

<style lang="less" scoped>
.typeActive {
  font-weight: 600;
  border-bottom: 3px solid #409eff;
}
#search {
  user-select: none;
  margin: 0 auto;
  width: 1400px;
  .search-content {
    color: #303133;
  }
  .search-control {
    margin: 10px 0;
    font-size: 15px;
    color: #606266;
    .control-item {
      display: inline-block;
      margin-right: 30px;
      padding: 5px 0;
      cursor: pointer;
      &:hover {
        color: #303133;
      }
    }
  }
}
</style>
