import {request} from './index'
export function getUserPlayList(uid,limit,offset){
  return request({
    url:'/user/playlist',
    params:{
      uid,
      limit,
      offset
    }
  })
}