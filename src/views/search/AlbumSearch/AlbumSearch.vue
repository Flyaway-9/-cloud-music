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
      找到{{ total }}张专辑
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
      <album-item
        v-for="(item, index) in albums"
        :key="index"
        :albumItem="item"
        @loaded="loaded"
        :class="{ odd: index % 2 === 1 }"
        @click.native="albumClick(item.id)"
      ></album-item>
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
import AlbumItem from "./children/AlbumItem.vue";
import { debounce } from "utils/debounce";
import { getCloudSearch } from "network/search.js";
export default {
  components: {
    AlbumItem,
  },
  data() {
    return {
      keyword: String,
      type: null,
      total: Number,
      loading: true,
      nowPage: 1,
      albums: [],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.type = this.$route.query.type;
  },
  mounted() {
    this.getAlbum();
  },
  methods: {
    albumClick(id){
      this.$router.push({path:'/albumDetail',query:{id:id}})
    },
    loaded: debounce(function () {
      this.loading = false;
    }, 800),
    pageChange(page) {
      this.nowPage = page;
      this.getAlbum();
    },
    getAlbum() {
      this.loading = true;
      getCloudSearch(this.keyword, 20, this.type,this.nowPage).then((res) => {
        // console.log(res);
        this.albums = res.data.result.albums;
        this.total = res.data.result.albumCount;
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