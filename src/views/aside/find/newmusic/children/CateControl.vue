<template>
  <div id="cate">
    <div
      class="cate-item"
      :class="{ active: currentIndex === index }"
      v-for="(item, index) in cates"
      :key="index"
      @click="cateClick(item.area,index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cates: {
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods:{
    cateClick(area,index){
      this.currentIndex = index
      // console.log(area);
      this.$emit('cateChange',area)
    }
  },
  components: {},
};
</script>

<style lang="less" scoped>
.active {
  font-weight: 600;
  color: #424242 !important;
  pointer-events: none;
}
#cate {
  display: flex;
  .cate-item {
    font-size: 14px;
    margin-left: 30px;
    color: #9e9e9e;
    cursor: pointer;
    &:hover {
      color: #616161;
    }
  }
}
</style>
