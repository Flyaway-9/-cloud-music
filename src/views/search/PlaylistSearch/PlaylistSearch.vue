<template>
  <div id="sing" style="position: relative">
    <div
      style="
        position: absolute;
        right: 0;
        top: -20px;
        font-size: 13px;
        color: #c0c4cc;
      "
      v-if="!loading"
    >
      找到{{ total }}个歌单
    </div>
    <div
      style="width: 100%; height: 40px; margin-top: 20px"
      v-loading="loading"
      v-show="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.1)"
    ></div>
    <div style="margin-top: 20px" v-show="!loading">
      <list-item
        v-for="(item, index) in playlists"
        :key="index"
        :listItem="item"
        @loaded="loaded"
        :class="{ odd: index % 2 === 1 }"
        @click.native="listClick(item.id)"
      ></list-item>
      <el-pagination
        v-show="total > 20"
        background
        layout="prev, pager, next"
        :total="parseInt(total)"
        :page-size="20"
        style="text-align: center; margin: 20px 0"
        :current-page="nowPage"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListItem from "./children/ListItem.vue";
import { debounce } from "utils/debounce";
import { getCloudSearch } from "network/search.js";
export default {
  components: {
    ListItem,
  },
  data() {
    return {
      keyword: String,
      type: null,
      total: Number,
      loading: true,
      nowPage: 1,
      playlists: [],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.type = this.$route.query.type;
  },
  mounted() {
    this.getPlayList();
  },
  methods: {
    listClick(id){
      this.$router.push({path:'/listDetail',query:{id:id}})
    },
    loaded: debounce(function () {
      this.loading = false;
    }, 800),
    pageChange(page) {
      this.nowPage = page;
      this.getPlayList();
    },
    getPlayList() {
      this.loading = true;
      getCloudSearch(this.keyword, 20, this.type,(this.nowPage -1)*20).then((res) => {
        // console.log(res);
        this.playlists = res.data.result.playlists;
        this.total = res.data.result.playlistCount;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.odd {
  background-color: rgba(249, 249, 249) !important;
}
</style>