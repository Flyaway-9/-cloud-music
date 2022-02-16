<template>
  <div id="hitem">
    <div class="h-index" :class="{top:index<4}" >{{ index }}</div>
    <div class="h-content">
      <div class="key-words" :class="{ singleline: !hItem.content }">
        <span class="keywords" :class="{big:index<4}">{{ hItem.searchWord }}</span>
        <span class="score">{{ hItem.score }}</span>
        <span class="key-img" v-if="hItem.iconUrl"><img :src="hItem.iconUrl" alt=""></span>
      </div>
      <div class="keys-desc" v-if="hItem.content">
        <span>{{ hItem.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import {Bus} from 'utils/eventBus.js'
export default {
  props: {
    hItem: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods:{
  },
  computed: {
    
  },
};
</script>

<style lang="less" scoped>
.singleline {
  margin-top: 20px !important;
}
/deep/.top{
  color: #e53935 !important;
}
.big{
  font-weight: 600 !important;
}
#hitem {
  user-select: none;
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 55px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: rgba(242, 242, 242);
  }
  .h-index {
    flex: 1;
    font-size: 16px;
    text-align: center;
    line-height: 55px;
    font-weight: 300;
    color: #e0e0e0;
  }
  .h-content {
    flex: 6;
    display: flex;
    // text-align: center;

    flex-direction: column;
    .key-words {
      flex: 1;
      margin-top: 10px;
      .keywords {
        color: #303133;
      }
      .score {
        color: #e0e0e0;
        margin-left: 10px;
      }
      .key-img{
        display: inline-block;
        // width: 25px;
        height: 10px;
        margin-left: 8px;
        img{
          // width: 100%;
          height: 100%;
        }
      }
    }
    .keys-desc {
      flex: 1;
      color: #bdbdbd;
      margin-bottom: 10px;
      
      span{
        display: inline-block;
        max-width: 290px;
        white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      }
    }
  }
}
</style>
