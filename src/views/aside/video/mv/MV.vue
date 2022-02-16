<template>
  <div id="mv">
    <mv-content
      :videoList="FirstList"
      :areas="areas"
      :title="'最新MV'"
      @changeArea="changeArea"
    ></mv-content>
    <mv-content :videoList="HotList" :title="'热播MV'"></mv-content>
    <mv-content :videoList="WYList" :title="'网易出品'"></mv-content>
    <div style="width:100%;height:700px;">
      <mv-rank
      :areas="areas"
      :title="'MV排行'"
      @changeRankArea="changeRankArea"
      :rankList="rankList"
    ></mv-rank>
    </div>
    
  </div>
</template>

<script>
import MvContent from "./children/MvContent.vue";
import MvRank from "./children/MvRank.vue";
import { getMVFirst, getMVAll, getMVrec, getTopMV } from "network/mv.js";
export default {
  components: {
    MvContent,
    MvRank,
  },
  data() {
    return {
      FirstList: [],
      area: "内地",
      areas: ["内地", "港台", "欧美", "日本", "韩国"],
      limit: 8,
      order: "最热",
      HotList: [],
      WYList: [],
      rankArea: "内地",
      rankList: [],
    };
  },
  mounted() {
    this.getFirst();
    this.getHot();
    this.getWY();
    this.getRank();
  },
  methods: {
    changeArea(area) {
      // console.log('1');
      this.area = area;
      this.FirstList = [];
      this.getFirst();
    },
    changeRankArea(area) {
      this.rankArea = area;
      this.rankList = [];
      this.getRank()
    },
    getFirst() {
      getMVFirst(this.area, 8).then((res) => {
        this.FirstList = res.data.data.map((item) => {
          item.type = 2;
          return item;
        });
        // console.log(this.FirstList);
      });
    },
    getHot() {
      getMVAll("内地", this.order, this.limit).then((res) => {
        // console.log('1');
        // console.log(res);
        this.HotList = res.data.data.map((item) => {
          item.type = 2;
          return item;
        });
      });
    },
    getWY() {
      getMVrec(8).then((res) => {
        this.WYList = res.data.data.map((item) => {
          item.type = 2;
          return item;
        });
      });
    },
    getRank() {
      getTopMV(10, this.rankArea).then((res) => {
        // console.log(res);
        this.rankList = res.data.data.map((item) => {
          item.type = 2;
          return item;
        });
      });
    },
  },
};
</script>

<style>
#mv {
  width: 1100px;
  margin: 0 auto;
}
</style>
