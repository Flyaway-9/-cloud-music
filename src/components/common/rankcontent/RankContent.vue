<template>
  <div id="rankc">
    <div
      style="width: 100%; heigth: 50px; margin-top: 100px"
      v-loading="loading"
      v-if="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.1)"
    ></div>
    <div style="display: flex; flex-wrap: wrap; border-collapse: collapse" v-show="!loading" >
      <rank-item
        v-for="(item, index) in rankList"
        :key="index"
        :index="index + 1"
        :mv="item"
        :total="rankList.length"
        @itemloaded="loaded"
      ></rank-item>
    </div>
  </div>
</template>

<script>
import RankItem from "./RankItem.vue";
import {debounce} from 'utils/debounce.js'
export default {
  props: {
    rankList: [],
  },
  data() {
    return {
      loading: true,
    };
  },
  components: {
    RankItem,
  },
  methods: {
    loaded:debounce(function(){
      // console.log('1');
      this.loading = false;
    },100),
  },
};
</script>
<style lang="less" scoped>
#rankc {
  width: 1100px;
  margin: 0 auto;
}
</style>
