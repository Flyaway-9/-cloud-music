<template>
  <div id="album" >
    <div class="album-pic">
      <img :src="albumItem.picUrl" alt="" @load="loaded" />
    </div>
    <span class="album-name" v-html="brightenKeyword(albumItem.name, keyword)">
    </span>
    <span
      class="sing-content"
      style="position: absolute; left: 50%"
      @click.stop="singClick(albumItem.artist.id)"
    >
      <span
        class="sing-name"
        v-html="brightenKeyword(albumItem.artist.name, keyword)"
      ></span>
      <span class="name-desc" v-if="albumItem.artist.alias.length"
        >({{ albumItem.artist.alias[0] }})</span
      >
      <span class="name-desc" v-if="albumItem.artist.trans"
        >({{ albumItem.artist.trans }})</span
      >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    albumItem: {
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
    albumClick(id){
      this.$router.push({path:'/albumDetail',query:{id:id}})
    },
    singClick(id) {
      this.$router.push({ path: "/singerDetail", query: { id: id } });
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
};
</script>

<style lang="less" scoped>
#album {
  width: 100%;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  &:hover {
    background-color: rgba(240, 241, 242, 1);
  }
  .album-pic {
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
  .album-name {
    margin-left: 10px;
    color: #303133;
    font-size: 14px;
  }
  .sing-content {
    cursor: pointer;
    &:hover {
      .sing-name {
        color: #424242;
      }
    }
    .name-desc {
      font-size: 14px;
      font-weight: 300;
      color: #bdbdbd;
    }
    .sing-name {
      font-size: 12px;
      color: #757575;
      z-index: 999;
    }
  }
}
</style>
