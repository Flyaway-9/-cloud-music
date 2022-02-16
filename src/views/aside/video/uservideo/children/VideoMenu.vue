<template>
  <div>
    
      <el-popover placement="bottom-start" width="600" trigger="click" v-model="cateVisiable">
      <strong
        @click="changeAll('全部视频')"
        :class="{ tagActive: '全部视频' === nowTag }"
        style="padding: 3px 5px;cursor:pointer;"
        >全部视频</strong
      >
      <el-divider></el-divider>
      <el-scrollbar>
      <div style="margin-bottom: 20px;height:400px;">
        <span
          v-for="item in tags"
          :key="item.index"
          class="top-cate-item"
          @click="changeTag(item.name,item.id)"
          :class="{ tagActive: item.name === nowTag }"
          >{{ item.name }}</span
        >
      </div>
      </el-scrollbar>
      <el-button round slot="reference" size="mini">{{ nowTag }}</el-button>
    </el-popover>
    <div class="tag-nav">
      <span
        class="tag-nav-item"
        v-for="item in hotList"
        :key="item.index"
        @click="changeTag(item.name,item.id)"
        :class="{ tagActive: item.name === nowTag }"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
import {getVideoCategory,getVideoTag} from '@/network/video.js';
export default {
  data() {
    return {
      tags:[],
      hotList:[],
      nowTag: "全部视频",
      cateVisiable:false
    }
  },
  created(){
    this.catt = this.nowTag
    getVideoTag().then(res => {
      // console.log(res);
      this.tags = res.data.data
    })
    getVideoCategory().then(res =>{
      console.log(res);
      if(res){
        this.hotList = res.data.data
      }
    })
  },
  methods:{
    changeTag(tag,id) {
      // console.log(tag);
      this.nowTag = tag
      this.cateVisiable = false
      this.$emit("changeVideoTag", id);
    },
    changeAll(tag){
      this.nowTag = tag
      this.cateVisiable = false
      this.$emit("changeVideoAll");
    }
  }
}
</script>

<style lang="less" scoped>
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
  &:hover{
    color: #409eff;
  }
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
  margin: 5px 5px;
  text-align: center;
  cursor: pointer;
  color: #616161;
  font-size: 12px;
  padding: 3px 10px;
}
.tag-nav-item:hover {
  color: #409eff;
}
.tagActive {
  border-radius: 20px;
  background-color: #b3e5fc;
  color: #409eff;
  pointer-events: none;
}
</style>