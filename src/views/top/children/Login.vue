<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="400px"
    class="dialog1"
    >
    <section class="login-content">
      <div class="icon"><i class="iconfont icon-shoujidenglu-"></i></div>
        <el-form 
        :model="user"
        >
        <el-form-item  size="medium " style="width: 250px; margin-left:55px">
          <el-input prefix-icon="el-icon-mobile" v-model="user.phone" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item  size="medium " style="width: 250px;margin-left:55px" >
          <el-input prefix-icon="el-icon-key" v-model="user.password" type="password" placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-button 
        type="primary" 
        round 
        size="medium"
        @click="login" 
        :disabled="!canSubmit"
        class="login-buttom">登录</el-button>
        </el-form>
    </section>
  </el-dialog>
  
</template>

<script>
// import {phoneLogin} from 'network/login.js'
import { mapActions} from 'vuex'
export default {
  name: 'Login',
  props:{
    profile:null
  },
  data() {
    return {
      dialogVisible: false,
      user:{phone:'',password:''}
    }
  },
  computed: {
    canSubmit(){
      const { phone, password} = this.user
      return  Boolean(phone && password)
    }
  },
  methods: {
    ...mapActions({
      Login: 'login'
    }),
    
    // login(){
    //   console.log('111');
    //   phoneLogin(this.user).then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     this.$message.error(err.response.data.message)
    //   })
    // }
    login(){
      this.Login(this.user).then( () => {
        this.dialogVisible = false
        location.reload()
        // console.log();
        // console.log(this.profile);
      })
    }
  }
}
</script>

<style>
.dialog1 .el-dialog__header  {
    background-color: #f5f5f5 ;
  }
  /*body背景色*/
  .dialog1 .el-dialog__body  {
    background-color: #f5f5f5 ;
  }

.icon {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconfont {
  font-size: 100px;
  color: #4fc3f7;
}
.login-buttom {
  width: 100px;
  margin-left: 130px!important;
}
</style>