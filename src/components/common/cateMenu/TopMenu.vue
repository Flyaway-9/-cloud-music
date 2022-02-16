<template>
  <div>
    <el-popover placement="bottom-start" width="500" trigger="click">
      <strong
        @click="changeTag('全部歌单')"
        :class="{ tagActive: '全部歌单' === catt }"
        style="padding: 3px 5px"
        >全部歌单</strong
      >
      <el-divider></el-divider>
      <div style="margin-bottom: 20px">
        <span
          v-for="item in tags"
          :key="item.index"
          class="top-cate-item"
          @click="changeTag(item.name)"
          :class="{ tagActive: item.name === catt }"
          >{{ item.name }}</span
        >
      </div>
      <el-button round slot="reference" size="small">{{ catt }}</el-button>
    </el-popover>
  </div>
</template>

<script>
import {getToplistTag} from '@/network/songList.js';
export default {
  props: {
    nowTag: {
      type: String,
      default: '全部歌单'
    }
  },
  data() {
    return {
      catt:'',
      tags:[]
    }
  },
  created(){
    this.catt = this.nowTag
    getToplistTag().then(res => {
      // console.log(res);
      this.tags = res.data.tags
    })
  },
  methods:{
    changeTag(tag) {
      // console.log(tag);
      this.catt = tag;
      this.$emit("changeTopTag", tag);
    },
  }
}
</script>

<style>
.cate-menu {
  display: block;
  height: 100%;
  color: #e0e0e0;
  font-size: 14px;
  line-height: 100%;
}
.top-cate-item {
  display: inline-block;
  width: 80px;
  margin: 15px 10px;
  text-align: center;
  cursor: pointer;
}
.cate-item:hover {
  color: #409eff;
}
.tag-nav {
  float: right;
  font-size: 16px;
}
.tag-nav-item {
  display: inline-block;
  margin: 5px 10px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  padding: 3px 5px;
}
.tag-nav-item:hover {
  color: #409eff;
}
.tagActive {
  border-radius: 20px;
  background-color: #b3e5fc;
  color: #409eff;
}
</style>