<template>
  <el-menu>
    <el-menu-item>
      <i class="iconfont icon-yinle"></i>
      <span class="aside-item">发现音乐</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-video"></i>
      <span class="aside-item">视频</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-airudiantubiaohuizhi-zhuanqu_zixundongtai"></i>
      <span class="aside-item">动态</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-sirenfm-copy-copy"></i>
      <span class="aside-item">私人FM</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-zuijinbofang"></i>
      <span class="aside-item">最近播放</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-wodeshoucang"></i>
      <span class="aside-item">我的收藏</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-aixin"></i>
      <span class="aside-item">我喜欢的音乐</span>
    </el-menu-item>
    <el-menu-item>
      <i class="iconfont icon-wodegedan"></i>
      <span class="aside-item">我的歌单</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name:'Aside'
}
</script>

<style scoped>
.el-menu-item {
  border: none;
}
.iconfont {
  /* color: #409EFF; */
  font-size: 24px;
}
.aside-item {
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.el-menu-item:hover {
  color: #409EFF;
}
</style>