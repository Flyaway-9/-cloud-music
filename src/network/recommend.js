import {request} from './index'

export function getBanner(){
  return request({
    url:'/banner?type=0'
  })
}

export function getRecommendList(){
  return request({
    url:''
  })
}

export function getPrivateContent(){
  return request({
    url:'/personalized/privatecontent'
  })
}

export function getRecommendSongs(){
  return request({
    url: '/recommend/songs'
  })
}

export function getRecommendNewSongs(){
  return request({
    url: '/personalized/newsong?limit=12',
  })
}

export function getRecommendMV() {
  return request({
    url: '/personalized/mv'
  })
}