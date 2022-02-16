<template>
  <div id="history" v-if="items && items[0]">
    <div style="color: #909399;">
              <span style="margin-bottom:10px">历史搜索<i class="el-icon-delete delete-icon" @click="clearHistory"></i></span>
            </div>
    <div ref="content" class="topColumn" style="overflow:auto;" >
      <span class="item"  v-for="(item,index) in items" :key="index" @mouseenter="mousein(index)" @mouseleave="mouseout" >
      <el-button size="mini" round @click="historyItemClick(item)" >{{item}}</el-button>
      <i class="el-icon-close close" v-show="iconVisiable && currentIndex === index" @click="historyItemDelete(index)"></i>
    </span>
    </div>
  </div>
</template>

<script>
import {Bus} from 'utils/eventBus.js'
export default {
  data() {
    return {
      iconVisiable:false,
      items:[],
      currentIndex:null
    }
  },
  mounted(){
    this.getHistoryItems()
    Bus.$on('historyItemsChange',()=>{
        
        
      this.$nextTick(()=>{
        this.getHistoryItems()
      })
      // if (this.$refs.content) {
      // // this.$nextTick(function()  {
      // //   // let h = window.getComputedStyle(this.$refs.content).height
      // //   let h = document.getElementsByClassName("topColumn")[0].clientHeight;
         
      // //     console.log(h);
      // // });
      // }
    })
  },
  methods:{
    historyItemClick(value){
      this.$emit('historyItemClick',value)
    },
    historyItemDelete(index){
      this.items.splice(index,1)
      localStorage.historyItems = this.items.join('|')
    },
    clearHistory() {
      localStorage.historyItems = ''
       this.$nextTick(()=>{
        this.getHistoryItems()
      })
    },
    getHistoryItems(){
      let {historyItems} = localStorage;
      if(historyItems){
        this.items = historyItems.split('|')
      }
    },
    mousein(index){
      this.iconVisiable = true
      this.currentIndex = index
    },
    mouseout(){
      this.iconVisiable = false
    },
    
  }
}
</script>

<style lang="less" scoped>
.delete-icon{
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover{
    color: #409EFF;
  }
}
#history{
  width: 310px;
  max-height: 100px;
  margin: 10px auto;
  overflow: hidden;
  .item{
    display: inline-block;
    margin: 5px 3px;
    position: relative;
    .close{
      position: absolute;
      right: 2px;
      top: 52%;
      color: #bdbdbd;
      font-size: 12px;
      transform: scale(0.86);
      transform: translate(0,-50%);
      cursor: pointer;
      &:hover{
        color: #409EFF;
      }
  }}
}
</style>