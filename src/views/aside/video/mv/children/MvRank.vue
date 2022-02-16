<template>
  <div id="rank">
    <span class="mv-title"
      >{{title}} <span class="el-icon-arrow-right"></span
    ></span>
    <div class="tag-nav" v-if="areas">
      <span
        class="tag-nav-item"
        v-for="item in areas"
        :key="item.index"
        @click="changeTag(item)"
        :class="{ tagActive: item === nowArea }"
        >{{ item }}</span
      >
    </div>
    <rank-content style="margin-top:20px;" :rankList="rankList" ref="rankcontent"></rank-content>
  </div>
</template>

<script>
import RankContent from 'components/common/rankcontent/RankContent.vue'
export default {
  components:{
    RankContent
  },
  props:{
    title:String,
    areas:[],
    rankList:[]
  },
  data() {
    return {
      loading:true,
      nowArea:'内地',
    };
  },
  methods:{
    changeTag(area){
      this.nowArea = area
      this.$emit('changeRankArea',area)
      this.$refs.rankcontent.loading = true
    }
  }
}
</script>

<style lang="less" scoped>
.tagActive {
  border-radius: 20px;
  background-color: #b3e5fc;
  color: #409eff !important;
  pointer-events: none;
}
#rank{
  .mv-title {
    // margin-top: 30px;
    font-weight: 600;
    color: #303133;
    cursor: pointer;
  }
  .tag-nav {
    float: right;
    font-size: 16px;
    .tag-nav-item {
      display: inline-block;
      margin: 5px 5px;
      text-align: center;
      cursor: pointer;
      color: #616161;
      font-size: 12px;
      padding: 3px 10px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>