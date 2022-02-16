import axios from "axios";
import { ElMessage } from "element-ui";

let timer = null
export function request(config) {
  const instance = axios.create({
    baseURL: "http://47.113.186.111:3000",
    timeout: 10000,
    withCredentials:true
  });

  instance.interceptors.request.use(config => {
    if (config.method === "post") {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()), //获取时间戳
      }
    } else if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.parse(new Date()),
      }
    }
    return config
  }, err=> {
    console.log(err);
  })

  instance.interceptors.response.use(config => {
    if(config.data.code === 301){
      localStorage.clear()
      ElMessage({
        message: '请重新登录',
        type: 'error'
      })
    }
    return config
  }, err => {
    console.log(err);
    clearTimeout(timer)
    timer = setTimeout(() => {
      ElMessage({
        message: '网络异常请重新刷新',
        type: 'error',
      })
    },1000)
  })
  return instance(config)
}
