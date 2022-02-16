<template>
  <el-card shadow="always" style=" margin:20px 0;cursor: pointer;" :body-style="{padding: '0px'}" >
    <div class="top-list-card" :style="{background:'url('+ playlists.coverImgUrl +') '}">
      <div class="top-list-pic" :style="{background:'url('+ playlists.coverImgUrl +') '}"></div>
      <div class="top-list-tag"><i class="iconfont icon-huangguan"></i> 精品歌单</div>
      <div class="top-list-name">{{playlists.name}}</div>
      <div class="top-list-des">{{playlists.copywriter}}</div>
    </div>
  </el-card>
  
</template>

<script>

export default {
  props:{
    playlists: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods:{
    
  }
}
</script>

<style>
.top-list-card {
  width: 100%;
  height: 160px;
  position: relative;
  /* overflow: auto; */
  /* background: no-repeat!important; */
  background-size: cover !important;
  z-index: 1;
}
.top-list-card::before {
  content: "";
    position: absolute;
    left: -30px;
    top: -30px;
    bottom: -30px;
    right: -30px;
    background: inherit;
    filter: blur(20px);
    z-index: 2;
}
.top-list-pic {
  position: absolute;
  width: 140px;
  height: 140px;
  margin: 10px;
  float: left;
  background-color: pink;
  border-radius: 5px;
  background-size: cover !important;
  z-index: 11;
}
.top-list-tag {
  position: absolute;
  left: 160px;
  top: 30px;
  color: #ffca28;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #ffca28;
  z-index: 11;
}
.top-list-tag .iconfont{
  font-size: 12px;
  color: #ffca28;
}
.top-list-name {
  position: absolute;
  left: 160px;
  top: 80px;
  font-size: 18px;
  color: #fff;
  z-index: 11;
}
.top-list-des {
  position: absolute;
  left: 160px;
  top: 110px;
  font-size: 12px;
  color: #e0e0e0;
  z-index: 11;
}
</style>