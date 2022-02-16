import {request} from './index'

export function getTopSong(type){
  return request({
    url:'/top/song',
    params:{
      type
    }
  })
}

export function getTopAlbum(offset,limit,area,){
  return request({
    url:'/album/new',
    params:{
      offset,limit,area,
    }
  })
}