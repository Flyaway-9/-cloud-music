<template>
  <div id="cate">
    <div 
    :class="{active: currentIndex === index}" 
    class="cate-item" v-for="(item,index) in cateItems" 
    :key="index"
    @click="cateItemClick(index,item.type)"
    > 
      <span class="cate-split" v-if="index > 0">|</span>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      cateItems:{
        type:Array
      }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods:{
    cateItemClick(index,type){
      this.currentIndex = index
      this.$emit('cateItemChange',type)
    }
  }
}
</script>

<style lang="less" scoped>
.active{
  background-color: #e1f5fe;
  color: #409EFF !important;
  pointer-events: none;
}
#cate{
  display: flex;
  .cate-item{
    position: relative;
  font-size: 13px;
  padding: 3px 10px;
  // height: 10px;
  border-radius: 20px;
  color: #9e9e9e;
  margin:0 10px;
  cursor: pointer;
  .cate-split{
    pointer-events: none;
    position: absolute;
    left: -10px;
    color: #f5f5f5;
  }
}
}
</style>