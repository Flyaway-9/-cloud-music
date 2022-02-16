<template>
  <div id="singer">
    <div class="sing-pic">
      <img :src="singItem.img1v1Url" alt="" @load='loaded'>
    </div>
    <span class="sing-name" v-html="brightenKeyword(singItem.name,keyword)">
    </span>
    <span class="name-desc" v-if="singItem.alia">({{singItem.alia[0]}})</span>
    <span class="name-desc" v-if="singItem.trans">({{singItem.trans}})</span>
  </div>
</template>

<script>
export default {
  props:{
    singItem:{
      type: Object
    }
  },
  data() {
    return {
      keyword:String
    }
  },
  created(){
    this.keyword = this.$route.query.keyword
  },
  methods:{
    loaded(){
      this.$emit('loaded')
    },
    brightenKeyword(val, keyword) {
      const Reg = new RegExp(keyword, "i");
      if (val) {
        return val.replace(
          Reg,
          `<span style="color: #409EFF;">${keyword}</span>`
        );
      }
    },
  }
}
</script>

<style lang="less" scoped>
#singer{
  width: 100%;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  &:hover{
    background-color: rgba(240,241,242,1);
  }
  .sing-pic{
    float: left;
    margin-left: 20px;
    background-color: pink;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .sing-name{
    margin-left: 10px;
    color: #303133;
    font-size: 14px;
  }
  .name-desc{
    font-size: 14px;
    font-weight: 300;
      color: #bdbdbd;
    }
}
</style>