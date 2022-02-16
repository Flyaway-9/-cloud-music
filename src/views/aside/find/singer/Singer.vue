<template>
  <div id="singer" v-loading="loading">
    <choose-item :options="language" @changeArea="changeArea" @loading='isLoading'>
      <span slot="option">语种：</span>
    </choose-item>
    <choose-item :options="cate" @changeType="changeType" @loading='isLoading'>
      <span slot="option">分类：</span>
    </choose-item>
    <choose-item :options="initial" @changeInitial="changeInitial" @loading='isLoading'>
      <span slot="option">筛选：</span>
    </choose-item>
    <div
      class="singer-content"
    >
      <singer-cover
        v-for="item in singerList"
        :key="item.index"
        :singerItem="item"
        ref="singer1"
        @loaded="loaded"
      ></singer-cover>
    </div>
    <el-pagination
      style="margin-left: 380px;margin-top: 50px"
      background
      layout="prev, pager, next"
      :total="900"
      :page-size="90"
      :current-page="nowPage"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import ChooseItem from "./children/ChooseItem.vue";
import SingerCover from "./children/SingerCover.vue";
import { getSinger } from "network/singer.js";
import {Bus} from 'utils/eventBus.js'
import {debounce} from 'utils/debounce.js'
export default {
  data() {
    return {
      loading: true,
      language: [
        { 全部: "-1" },
        { 华语: 7 },
        { 欧美: 96 },
        { 日本: 8 },
        { 韩国: 16 },
        { 其他: 0 },
      ],
      cate: [{ 全部: "-1" }, { 男歌手: 1 }, { 女歌手: 2 }, { 乐队: 3 }],
      initial: [
        { 热门: "-1" },
        { A: "a" },
        { B: "b" },
        { C: "c" },
        { D: "d" },
        { E: "e" },
        { F: "f" },
        { G: "g" },
        { H: "h" },
        { I: "i" },
        { J: "j" },
        { K: "k" },
        { L: "l" },
        { M: "m" },
        { N: "n" },
        { O: "o" },
        { P: "p" },
        { Q: "q" },
        { R: "r" },
        { S: "s" },
        { T: "t" },
        { U: "u" },
        { V: "v" },
        { W: "w" },
        { X: "x" },
        { Y: "y" },
        { Z: "z" },
        { "#": 0 },
      ],
      init: -1,
      type: -1,
      area: -1,
      singerList: [],
      limit: 30,
      nowPage: 1,
    };
  },
  components: {
    ChooseItem,
    SingerCover,
  },
  created() {
    this.Singergetter(0,0);
  },
  mounted(){
    
  },
  methods: {
    Singergetter(limit,offset) {
      this.limit += limit;
      getSinger(this.limit, this.init, this.type, this.area,offset).then((res) => {
        // console.log(res);
        this.singerList = res.data.artists;
      });
    },
    changeArea(value) {
      // console.log(value);
      this.area = parseInt(value);
      this.Singergetter(0,0);
    },
    changeType(value) {
      // console.log(value);
      this.type = parseInt(value);
      this.Singergetter(0,0);
    },
    changeInitial(value) {
      // console.log(value);
      this.init = value;
      this.Singergetter(0,0);
    },
    loaded: debounce(function(){
      this.loading = false
    },100),
    pageChange(page){
      this.nowPage = page;
      page = page - 1;
      this.Singergetter(0,page * 90)
      Bus.$emit("toTop", 0);
      this.loading = true
    },
    isLoading(){
      this.loading = true
      this.nowPage = 1
    }
  },
  computed: {
    
  },
};
</script>

<style lang="less" scoped>
#singer {
  width: 1100px;
  margin: 0 auto;
  .singer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 20px;
  }
}
</style>
