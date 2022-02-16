<template>
  <div id="suggesti">
    <div class="sug-content" v-if="songs">
      <div class="sug-title">
        <i class="iconfont icon-faxian"></i><span class="title-name">单曲</span>
      </div>
      <div class="sug-item" v-for="(item, index) in songs" :key="index" @click="songClick(item.id)">
        <span class="item-name" v-html="brightenKeyword(item.name, value )"></span
        >-<span class="sing-name" v-for="ar in item.artists" :key="ar.indnex" v-html="brightenKeyword(ar.name, value )"></span>
      </div>
    </div>
    <div class="sug-content" v-if="artists">
      <div class="sug-title">
        <i class="iconfont icon-geshou"></i><span class="title-name">歌手</span>
      </div>
      <div class="sug-item" v-for="(item, index) in artists" :key="index" @click="singClick(item.id,item.name)">
        <span class="item-name" v-html="brightenKeyword(item.name, value )"></span>
      </div>
    </div>
    <div class="sug-content" v-if="albums">
      <div class="sug-title" >
        <i class="iconfont icon-changpian"></i
        ><span class="title-name">专辑</span>
      </div>
      <div class="sug-item" v-for="(item, index) in albums" :key="index" @click="albumClick(item.id,item.name)">
        <span class="item-name" v-html="brightenKeyword(item.name, value )"></span>
        -<span class="sing-name"  v-html="brightenKeyword(item.artist.name, value )"></span>
      </div>
    </div>
    <div class="sug-content" v-if="playlists">
      <div class="sug-title">
        <i class="iconfont icon-liebiao"></i
        ><span class="title-name">歌单</span>
      </div>
      <div class="sug-item" v-for="(item, index) in playlists" :key="index" @click="listClick(item.id,item.name)">
        <span
          class="item-name"
          v-html="brightenKeyword(item.name, value )"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import {Bus} from 'utils/eventBus.js'
export default {
  props: {
    albums: Array,
    artists: Array,
    playlists: Array,
    songs: Array,
    value: String,
  },
  inject:['reload'],
  data() {
    return {};
  },
  methods: {
    brightenKeyword(val, keyword) {
      const Reg = new RegExp(keyword, "i");
      if (val) {
        return val.replace(
          Reg,
          `<span style="color: #409EFF;">${keyword}</span>`
        );
      }
    },
    listClick(id){
      this.$router.push({path:'/listDetail',query:{id:id}})
      this.reload()
    },
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
      this.reload()
    },
    albumClick(id){
      this.$router.push({path:'/albumDetail',query:{id:id}})
      this.reload()
    },
    songClick(id){
      Bus.$emit('songPlay',id)
    },
  },
  computed: {
    BK() {
      return (val) => {
        return brightenKeyword(val, this.value);
      };
    },
  },
};
function brightenKeyword(val, keyword) {
  const Reg = new RegExp(keyword, "i");
  if (val) {
    return val.replace(Reg, `<span style="color: #409EFF;">${keyword}</span>`);
  }
}
</script>

<style lang="less" scoped>

#suggesti {
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  .sug-title {
    width: 100%;
    font-size: 14px;
    margin-left: 15px;
    height: 35px;
    line-height: 35px;
    color: #9e9e9e;
    .title-name {
      margin-left: 5px;
    }
    .iconfont {
      font-size: 18px;
      color: #9e9e9e;
      vertical-align: middle;
    }
  }
  .sug-item {
    font-size: 12px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    &:hover {
      background-color: rgba(242, 242, 242);
    }
    .item-name {
      color: #303133;
      margin-left: 30px;
    }
  }
}
</style>
