import {request} from './index'
export function getSinger(limit,initial,type,area,offset){
  return request({
    url:'/artist/list',
    params:{
      limit,
      initial,
      type,
      area,
      offset
    }
  })
}

export function getSingerDetail(id){
  return request({
    url:'/artist/detail',
    params: {
      id
    }
  })
}

export function getSingerDes(id){
  return request({
    url:'/artist/desc',
    params:{
      id
    }
  })
}

export function getSimi(id){
  return request({
    url:'/simi/artist',
    params:{
      id
    }
  })
}

export function getSiAlbum(limit,id) {
  return request({
    url:'/artist/album',
    params:{
      limit,
      id
    }
  })
}

export function getAlbum(id){
  return request({
    url:'/album',
    params:{
      id
    }
  })
}

export function getHot50(id){
  return request({
    url:'/artist/top/song',
    params:{
      id
    }
  })
}

export function getSingMv(id){
  return request({
    url:'/artist/mv',
    params:{
      id
    }
  })
}