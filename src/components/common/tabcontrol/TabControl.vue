<template>
  <el-row type="flex" class="row-bg">
    <el-col
      :span="2"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: !isActive(item.path) }"
      @click.native="itemClick(index,item.path)"
      class="tab-control-item"
    >
      <div>{{ item.title }}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mode:'history',
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
    itemClick(index,path) {
      // console.log("1");
      this.currentIndex = index;
      this.$router.push({path:'/findMusic'+ path}).catch(() => {return})
    },
  },
  computed:{
    isActive() {
      return (path) => {
        return this.$route.path.indexOf(path) === -1;
      };
    },
  }
};
</script>

<style scoped>
.row-bg {
  height: 60px;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 0;
}
.active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}
.tab-control-item {
  margin: 0 20px;
  font-size: 18px;
  line-height: 50px;
  cursor: pointer;
}
.tab-control-item:hover {
  color: #409eff;
}
</style>
