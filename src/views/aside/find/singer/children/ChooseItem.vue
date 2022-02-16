<template>
  <div style="margin: 30px 0;">
    <div class="option-name">
      <slot name="option"></slot>
      <!-- <span class="option-item">
        <span class="item-name"></span>
      </span> -->
      <div class="option-content">
        <span class="option-item" v-for="(item, index) in options" :key="index">
          <span
            class="item-name"
            :class="{ active: currentIndex === index }"
            v-for="(value, key, i) in item"
            :key="i"
            @click="itemClick(value, index)"
            >{{ key }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: [],
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(value, index) {
      this.currentIndex = index;
      // console.log(value);
      
      if(this.options.length <= 4){
        this.$emit('changeType',value)
      } else if (4 <= this.options.length <=6){
        this.$emit('changeArea',value)
      } 
      if(this.options.length > 6) {
        this.$emit('changeInitial',value)
      }
      this.$emit('loading')
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #409eff;
  background-color: #e1f5fe;
  &:hover {
    background-color: #b3e5fc;
    color: #409eff !important;
  }
}
.option-name {
  user-select: none;
  font-size: 12px;
  position: relative;
  .option-content {
    position: absolute;
    top: -18px;
    left: 30px;
    .option-item {
      display: inline-block;
      position: relative;
      width: 70px;
      height: 10px;
      margin-top: 20px;
      text-align: center;
      border-right: 1px solid #eeeeee;
      color: #bdbdbd;
      &:last-child{
        border:none
      }

      .item-name {
        position: absolute;
        top: -5px;
        left: 10px;
        width: 50px;
        display: inline-block;
        margin: 0 auto;
        padding: 3px 0;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
          color: #616161;
        }
      }
    }
  }
}
</style>
