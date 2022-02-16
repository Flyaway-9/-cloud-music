import {request} from './index'
export function getVideoDetail(id){
  return request({
    url:'/video/detail',
    params:{
      id
    }
  })
}

export function getVideoUrl(id){
  return request({
    url:'/video/url',
    params:{
      id
    }
  })
}

export function getVideoCategory(){
  return request({
    url:'/video/category/list'
  })
}

export function getVideoTag(){
  return request({
    url:'/video/group/list'
  })
}

export function getAllVideo(offset){
  return request({
    url:'/video/timeline/recommend',
    params:{
      offset
    }
  })
}

export function getTagVideo(id,offset){
  return request({
    url:'/video/group',
    params:{
      id,
      offset
    }
  })
}

export function getVideoRelevant(id){
  return request({
    url:'/related/allvideo',
    params:{
      id
    }
  })
}