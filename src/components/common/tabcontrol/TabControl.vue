<template>
  <el-row type="flex" class="row-bg">
    <el-col
      :span="2"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click.native="itemClick(index)"
      class="tab-control-item"
    >
      <div>{{ item }}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      // console.log("1");
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.row-bg {
  height: 40px;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}
.active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}
.tab-control-item {
  margin: 0 20px;
  font-size: 14px;
  cursor: pointer;
}
.tab-control-item:hover {
  color: #409eff;
}
</style>
