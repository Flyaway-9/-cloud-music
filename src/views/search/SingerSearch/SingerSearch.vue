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
      找到{{ total }}个歌手
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
      <sing-item
        v-for="(item, index) in artists"
        :key="index"
        :singItem="item"
        @loaded="loaded"
        @click.native="singClick(item.id)"
        :class="{ odd: index % 2 === 1 }"
      ></sing-item>
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
import SingItem from "./children/SingerItem.vue";
import { debounce } from "utils/debounce";
import { getCloudSearch } from "network/search.js";
export default {
  components: {
    SingItem,
  },
  data() {
    return {
      keyword: String,
      type: null,
      total: Number,
      loading: true,
      nowPage: 1,
      artists: [],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.type = this.$route.query.type;
  },
  mounted() {
    this.getSings();
  },
  methods: {
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
    loaded: debounce(function () {
      this.loading = false;
    }, 800),
    pageChange(page) {
      this.nowPage = page;
      this.artists = []
      this.getSings();
    },
    getSings() {
      this.loading = true;
      getCloudSearch(this.keyword, 20, this.type,(this.nowPage-1) * 20).then((res) => {
        // console.log(res);
        this.artists = res.data.result.artists;
        this.total = res.data.result.artistCount;
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
