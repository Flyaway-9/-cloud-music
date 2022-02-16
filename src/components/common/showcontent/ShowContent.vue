<template>
  <div>
    <el-row :gutter="20" type="flex" class="show-title">
    <el-col :span="3" :offset="0"><span>{{title}}</span></el-col>
    <el-col :span="1.1" :offset="0"><span>更多</span><i class="el-icon-caret-right"></i></el-col>
  </el-row>
  
  </div>
</template>

<script>
export default {
  name: 'ShowContent',
  components: {
  },
  props: {
    title: null
  }
  
}
</script>

<style>
.show-title {
  width: 1100px;
  height: 40px;
  margin: 10px auto !important;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 5px;
}
.show-title div:nth-child(1){
  font-size: 18px;
  padding-left: 0 !important;
}
.show-title div:nth-child(2){
  font-size: 10px;
  padding-right: 0 !important;
  text-align: right ;
  color: #bdbdbd;
  cursor: pointer;
}
</style>