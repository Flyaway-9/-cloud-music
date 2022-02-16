import {request} from './index'

export function getLoginStatus(){
  return request({
    url: '/login/status'
  })
}

export function phoneLogin(data){
  return request({
    url: '/login/cellphone',
    method: 'POST',
    data
  })
}

export function getInfo(){
  return request({
    url: '/user/account'
  })
}

export function getLogout(){
  return request({
    url: '/logout'
  })
}