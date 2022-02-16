import {request} from './index'

export function getRecommendList(){
  return request({
    url: '/personalized?limit=10'
  })
}

export function getCatlist(){
  return  request({
    url: '/playlist/catlist'
  })
}

export function getCatlistHot(){
  return request({
    url: '/playlist/hot'
  })
}

export function getPlayList(cat,offset){
  return request({
    url: '/top/playlist',
    params:{
      cat,
      offset
    }
  })
}

export function getTopList(cat,limit){
  return request({
    url: '/top/playlist/highquality',
    params: {
      cat,
      limit
    }
  })
}

export function getToplistTag(){
  return request({
    url:'/playlist/highquality/tags'
  })
}

export function getListDetail(id){
  return request({
    url: '/playlist/detail',
    params:{
      id
    }
  })
}

export function getListAll(id,limit){
  return request({
    url: '/playlist/track/all',
    params: {
      id,
      limit
    }
  })
}

export function getSongsChart(){
  return request({
    url: '/toplist'
  })
}

export function getSongsRecent(uid,type){
  return request({
    url:'/user/record',
    params:{
      uid,type
    }
  })
}

