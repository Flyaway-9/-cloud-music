import {request} from './index'

export function getSearchDefault(){
  return request({
    url:'/search/default',
  })
}

export function getSearchHot(){
  return request({
    url:"/search/hot"
  })
}

export function getSearchHotDetail(){
  return request({
    url:'/search/hot/detail'
  })
}

export function getSearchSuggest(keywords){
  return request({
    url:'/search/suggest',
    params:{
      keywords
    }
  })
}

export function getSearchMatch(keywords){
  return request({
    url:'/search/multimatch',
    params:{
      keywords
    }
  })
}

export function getCloudSearch(keywords,limit,type,offset){
  return request({
    url:'/cloudsearch',
    params:{
      keywords,limit,type,offset
    }
  })
}