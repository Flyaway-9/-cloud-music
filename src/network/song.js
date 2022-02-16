import { request } from "./index"

export function getUrl(id){
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

export function getSongDetail(ids){
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getSongLyric(id){
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

export function getDailySong(){
  return request({
    url: '/recommend/songs',
  })
}