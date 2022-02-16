<template>
  <header>
    <el-row :gutter="20">
      <el-col :span="3"  class="logo-content">
        <a href="#"><img class="logo" src="../../assets/logo.svg" alt="">
              云音乐</a>
      </el-col>
              
      <el-col :span="5" :offset="1">
        <!--  搜索弹层-->
        
        <hot-search></hot-search>
      </el-col>
      <el-col :span="10"><span style="width:20px;color:#fff;">0</span></el-col>
      <el-col :span="3" :offset="1">
        <el-dropdown v-if="profile" trigger="click">
          <span class="el-dropdown-link" >
            <el-avatar style="vertical-align: middle;" :size="40" :src="profile.avatarUrl"></el-avatar>
            <span style="margin-left: 5px; font-size:15px">{{profile.nickname}}</span>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        

        <span v-else class="el-dropdown-link" @click="userLogin">
          <el-avatar style="vertical-align: middle;" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <span style="margin-left: 5px; font-size:15px">请登录</span>
        </span>
      </el-col>
    </el-row>
    <login ref="login" :profile="profile"/>
  </header>
</template>

<script>
import Login from './children/Login.vue'
import HotSearch from './children/HotSearch.vue'
import {getLogout} from 'network/login.js'
import {mapGetters} from 'vuex'


export default {
  name: "Top",
  components:{
    Login,
    HotSearch
  },
  data() {
    return {
    };
  },
  methods: {
    
    userLogin(){
      this.$refs.login.dialogVisible = true
    },
    logout(){
      getLogout().then(res => {
      console.log(res);
        localStorage.clear()
        this.$router.go(0)
      })
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile'
    }),
  }
};
</script>

<style>
header {
   box-shadow:  0 2px 1px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.el-header {
  /* width: 100vw;
  height: 50px;
   */
   padding: 0 !important;
   
}
.el-main {
  padding-top: 0;
  /* margin-top: 20px; */
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
  width: 320px;
  border-radius: 20px;
}
.el-dropdown-link{
  cursor: pointer;
}
</style>
