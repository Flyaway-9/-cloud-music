import {phoneLogin} from 'network/login.js'
import {Message } from 'element-ui'
// import getters from './getters'

const login = {
  state: {
    profile: null
  },
  mutations: {
    //获取用户的信息
    setUser(state,payload){
      state.profile = payload
      // console.log(state.profile);
    }
  },
  actions: {
    //判断登陆成功与否
    async login(context,payload){
      //请求登录接口 返回响应信息
      let res = await phoneLogin(payload)
      console.log(res); 
      if(res.data.code === 200){
        context.commit('setUser',res.data.profile)
        Message.success({
          message: '登陆成功',
          type: 'success'
        })
        // return new Promise(resolve => {
				// 	resolve(true)
				// })
      } else if(res.data.code === 502){
        Message.error({
          message: res.data.msg,
          type: 'error'
        })
      }
    }
  },
  getters: {
    getProfile(state){
      return state.profile
    },
  }
}
export default login