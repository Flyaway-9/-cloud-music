<template>
  <div id="control">
    <div
      class="control-item"
      v-for="(item, index) in items"
      :key="index"
      :class="{ active: !isActive(item.path) }"
      @click="itemClick(item.path)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
  },
  computed: {
    isActive() {
      return (path) => {
        return this.$route.path.indexOf(path) === -1;
      };
    },
  },
  methods: {
    itemClick(path) {
      this.$emit("routerChange",path);
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  font-size: 20px !important;
  font-weight: 600;
  border-bottom: 3px solid #409eff;
  pointer-events: none;
}
#control {
  user-select: none;
  display: flex;
  // height: 50px;
  margin: 10px 0;
  .control-item {
    margin: 0 20px;
    // height: 20px;
    padding: 5px 0px;
    font-size: 18px;
    cursor: pointer;
    // text-align: end;
  }
}
</style>
