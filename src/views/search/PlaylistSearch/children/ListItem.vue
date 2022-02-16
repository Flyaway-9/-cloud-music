<template>
  <div id="list">
    <div class="list-pic">
      <img :src="listItem.coverImgUrl" alt="" @load="loaded" />
    </div>
    <span class="list-name" v-html="brightenKeyword(listItem.name, keyword)">
    </span>
    <span class="list-count">共{{listItem.trackCount}}首</span>
    <span class="user-content" style="position: absolute; left: 60%">
      <span
        class="user-name"
      > <span style="color:#C0C4CC">by</span>&ensp;{{listItem.creator.nickname}}</span>
    </span>
    <span class="play-count"><i class="el-icon-video-play">{{playCount}}</i></span>
  </div>
</template>

<script>
export default {
  props: {
    listItem: {
      type: Object,
    },
  },
  data() {
    return {
      keyword: String,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
  },
  methods: {
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
    loaded() {
      this.$emit("loaded");
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
  },
  computed:{
    playCount(){
      let e = this.listItem.playCount + ''
      if(e.length > 8) {
        return e.substr(0,e.length - 8) + "亿次"
      } else if(e.length > 5) {
        return e.substr(0,e.length-4) + '万次'
      } else return e + '次'
    }
  }
};
</script>

<style lang="less" scoped>
#list {
  width: 100%;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  &:hover {
    background-color: rgba(240, 241, 242, 1);
  }
  .list-pic {
    float: left;
    margin-left: 20px;
    background-color: pink;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .list-name {
    margin-left: 10px;
    color: #303133;
    font-size: 14px;
  }
  .list-count{
    position: absolute;
    left: 50%;
    font-size: 12px;
    color: #bdbdbd;
  }
  .user-content {
      cursor: pointer;
    &:hover {
      .user-name{
        color: #424242;
      }
    }
    .user-name {
      font-size: 12px;
      color: #757575;
    }
  }
  .play-count{
    font-size: 12px;
    color: #757575;
    position: absolute;
    left:90%;;
  }
}
</style>
