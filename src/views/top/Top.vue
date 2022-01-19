<template>
  <header>
    <el-row :gutter="20">
      <el-col :span="3"  class="logo-content">
        <a href="#"><img class="logo" src="../../assets/logo.svg" alt="">
              云音乐</a>
      </el-col>
      <el-col :span="6">
        <!--  搜索弹层-->
        <el-popover placement="bottom" :width="320" trigger="focus">
          <template #reference>
            <el-input
              placeholder="请输入内容"
              clearable
              v-model.trim="value"
              class="search-input"
            >
              <template #append>
                <el-button icon="el-icon-search"></el-button>
              </template>
            </el-input>
          </template>
          <!--          搜索弹出层-->
        </el-popover>
      </el-col>
      <el-col :span="11">1</el-col>
      <el-col :span="3">
        <span>
          <el-avatar style="vertical-align: middle;" :size="40" :src="profileUrl"></el-avatar>
        </span>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      value: "",
      profileUrl: "../../assets/img/profile.svg"
    };
  },
};
</script>

<style scoped>
header {
  /* width: 100vw;
  height: 50px;
   */
   background-color: pink;
}
.el-row {
  height: 60px;
  padding: 10px 0;
}
.logo{
  width: 36px;
  margin-left: 20px;
  
  vertical-align: middle;
}
.logo-content a{
  /* line-height: 1.5; */
  display: block;
  /* height: 40px; */
  font-size: 18px;
  line-height: 40px;
}
.search-input {
}
</style>
