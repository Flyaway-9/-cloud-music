<template>
  <div id="paly-list">
    <top-list-com v-if="top.length" :playlists="top[0]" @click.native="topClick"></top-list-com>
    <cate-menu @changeTag="changeTag"></cate-menu>
    <div class="section">
      <s-picture-cover
        v-for="item in playlists"
        style="width: 200px"
        :key="item.index"
        :title="item.name"
        :image="item.coverImgUrl"
        :playCount="item.playCount"
        @click.native="detaleTurn(item.id)"
      ></s-picture-cover>
    </div>
    <el-pagination
      style="margin-left: 380px"
      background
      layout="prev, pager, next"
      :page-size="50"
      :total="500"
      :current-page="nowPage"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import SPictureCover from "components/common/picturecover/SPictureCover.vue";
import TopListCom from "./children/TopListCom.vue";
import { getPlayList, getTopList } from "network/songList.js";
import CateMenu from "components/common/cateMenu/CateMenu.vue";
import { Bus } from "utils/eventBus.js";
export default {
  data() {
    return {
      top: [],
      cat: "全部歌单",
      playlists: [],
      nowPage: 1,
      path: '/toplist'
    };
  },
  components: {
    CateMenu,
    SPictureCover,
    TopListCom,
  },
  methods: {
    changeTag(tag) {
      this.cat = tag;
      this.nowPage = 1;
      console.log(this.nowPage);
      getPlayList(this.cat).then((res) => {
        // console.log(res);
        this.playlists = res.data.playlists;
      });
      getTopList(this.cat, 1).then((res) => {
        // console.log(res);
        this.top = res.data.playlists;
      });
    },
    pageChange(page) {
      this.nowPage = page;
      page = page - 1;
      getPlayList(this.cat, page * 50).then((res) => {
        // console.log(res);
        this.playlists = res.data.playlists;
      });

      Bus.$emit("toTop", 0);
      // console.log(page);
    },
    topClick(){
      this.$router.push({path:'/findMusic'+ this.path,query:{cat: this.cat}}).catch(() => {return})
    },
    detaleTurn(id){
      this.$router.push({path:'/listDetail',query:{id:id}}).catch(() => {return})
    }
  },
  created() {
    getPlayList(this.cat).then((res) => {
      // console.log(res);
      this.playlists = res.data.playlists;
    });
    getTopList(this.cat, 1).then((res) => {
      // console.log(res);
      this.top = res.data.playlists;
    });
  },
};
</script>

<style>
#paly-list {
  width: 1100px;
  margin: 0 auto;
}
.section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1100px;
  margin: 0 auto;
}
</style>
