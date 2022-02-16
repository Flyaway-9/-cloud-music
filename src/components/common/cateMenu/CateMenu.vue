<template>
  <div id="cate-nav">
    <el-popover placement="bottom-start" width="800" trigger="click">
      <strong
        @click="changeTag('全部歌单')"
        :class="{ tagActive: '全部歌单' === nowTag }"
        style="padding: 3px 5px"
        >全部歌单</strong
      >
      <el-divider></el-divider>
      <div style="margin-bottom: 20px">
        <span class="cate-menu"
          ><i style="font-size: 35px" class="el-icon-bangzhu"></i
          ><span style="display: inline-block; margin-bottom: 5px"
            >语种</span
          ></span
        >
        <span
          v-for="item in tags[0]"
          :key="item.index"
          class="cate-item"
          @click="changeTag(item.name)"
          :class="{ tagActive: item.name === nowTag }"
          >{{ item.name }}</span
        >
      </div>
      <div style="margin-bottom: 20px">
        <span class="cate-menu"
          ><i style="font-size: 35px" class="el-icon-copy-document"></i
          ><span style="display: inline-block; margin-bottom: 5px"
            >风格</span
          ></span
        >
        <span
          v-for="item in tags[1]"
          :key="item.index"
          class="cate-item"
          @click="changeTag(item.name)"
          :class="{ tagActive: item.name === nowTag }"
          >{{ item.name }}</span
        >
      </div>
      <div style="margin-bottom: 20px">
        <span class="cate-menu"
          ><i style="font-size: 35px" class="el-icon-hot-water"></i
          ><span style="display: inline-block; margin-bottom: 5px"
            >场景</span
          ></span
        >
        <span
          v-for="item in tags[2]"
          :key="item.index"
          class="cate-item"
          @click="changeTag(item.name)"
          :class="{ tagActive: item.name === nowTag }"
          >{{ item.name }}</span
        >
      </div>
      <div style="margin-bottom: 20px">
        <span class="cate-menu"
          ><i style="font-size: 35px" class="el-icon-sunny"></i
          ><span style="display: inline-block; margin-bottom: 5px"
            >情感</span
          ></span
        >
        <span
          v-for="item in tags[3]"
          :key="item.index"
          class="cate-item"
          @click="changeTag(item.name)"
          :class="{ tagActive: item.name === nowTag }"
          >{{ item.name }}</span
        >
      </div>
      <div style="margin-bottom: 20px">
        <span class="cate-menu"
          ><i style="font-size: 35px" class="el-icon-menu"></i
          ><span style="display: inline-block; margin-bottom: 5px"
            >主题</span
          ></span
        >
        <span
          v-for="item in tags[4]"
          :key="item.index"
          class="cate-item"
          @click="changeTag(item.name)"
          :class="{ tagActive: item.name === nowTag }"
          >{{ item.name }}</span
        >
      </div>
      
      <el-button round slot="reference" size="small">{{ nowTag }}</el-button>
    </el-popover>
    <div class="tag-nav">
      <span
        class="tag-nav-item"
        v-for="item in hotList"
        :key="item.index"
        @click="changeTag(item.name)"
        :class="{ tagActive: item.name === nowTag }"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { getCatlist, getCatlistHot } from "network/songList.js";
export default {
  name: "CateMenu",
  data() {
    return {
      tags: [[], [], [], [], []],
      nowTag: "全部歌单",
      hotList: [],
    };
  },
  created() {
    getCatlist().then((res) => {
      res.data.sub.forEach((item) => {
        if (item.category === 0) {
          this.tags[0].push({ name: item.name, is: item.hot });
        } else if (item.category === 1) {
          this.tags[1].push({ name: item.name, is: item.hot });
        } else if (item.category === 2) {
          this.tags[2].push({ name: item.name, is: item.hot });
        } else if (item.category === 3) {
          this.tags[3].push({ name: item.name, is: item.hot });
        } else if (item.category === 4) {
          this.tags[4].push({ name: item.name, is: item.hot });
        }
      });
      // console.log(res);
    });
    getCatlistHot().then((res) => {
      this.hotList = res.data.tags;
    });
  },
  methods: {
    changeTag(tag) {
      console.log(tag);
      this.nowTag = tag;
      this.$emit("changeTag", this.nowTag);
    },
  },
  computed: {
    isActive() {
      return true;
    },
  },
};
</script>

<style>
#cate-nav {
  margin: 10px 0;
}
.cate-menu {
  display: block;
  height: 100%;
  color: #e0e0e0;
  font-size: 14px;
  line-height: 100%;
}
.cate-item {
  display: inline-block;
  width: 80px;
  margin: 5px 10px;
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
