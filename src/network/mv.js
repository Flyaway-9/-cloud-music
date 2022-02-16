import {request} from './index'
export function getMVDetail(mvid) {
  return request({
    url:'/mv/detail',
    params:{
      mvid
    }
  })
}
export function getMVUrl(id) {
  return request({
    url:'/mv/url',
    params: {
      id
    }
  })
}

export function getMVPersonal(){
  return request({
    url:'/personalized/mv',
  })
}

export function getMVFirst(area,limit){
  return request({
    url:'/mv/first',
    params:{
      area,
      limit
    }
  })
}

export function getMVAll(area,order,limit,offset){
  return request({
    url:'/mv/all',
    params:{
      area,order,limit,offset
    }
  })
}

export function getMVrec(limit){
  return request({
    url:'/mv/exclusive/rcmd',
    params:{
      limit
    }
  })
}

export function getTopMV(limit,area,offset){
  return request({
    url:'/top/mv',
    params:{
      limit,area,offset
    }
  })
}
