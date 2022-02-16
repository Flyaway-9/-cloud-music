import {request} from './index'

export function getHotComment(id,type,limit,offset){
  return request({
    url:'/comment/hot',
    params:{
      id,
      type,
      limit,
      offset
    }
  })
}
export function getComments(id,type,pageNo,pageSize,sortType,cursor){
  return request({
    url:'/comment/new',
    params:{
      id,
      type,
      pageNo,
      pageSize,
      sortType,
      cursor
    }
  })
}
export function sendComment(t,type,id,content,commentId){
  return request({
    url:'/comment',
    params:{
      t,
      type,
      id,
      content,
      commentId
    }
  })
}
export function commentLike(id,cid,t,type){
  return request({
    url:'/comment/like',
    params:{
      id,cid,t,type
    }
  })
}

export function commentAlbum(id){
  return request({
    url:'/comment/album',
    params:{
      id
    }
  })
}
export function commentMV(id,offset,before,limit){
  return request({
    url:'/comment/mv',
    params:{
      id,
      offset,
      before,
      limit
    }
  })
}
export function commentSong(id,offset,before){
  return request({
    url:'/comment/music',
    params:{
      id,
      offset,
      before,
    }
  })
}
export function commentPlayList(id,offset,before){
  return request({
    url:'/comment/playlist',
    params:{
      id,
      offset,
      before,
    }
  })
}
export function commentVideo(id,offset,before){
  return request({
    url:'/comment/video',
    params:{
      id,
      offset,
      before
    }
  })
}