import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message } from 'element-ui'

const FindMusic = () => import('../views/aside/find/FindMusci.vue')
const Video = () => import('../views/aside/video/Video.vue')
// const RecentPlay = () => import('../views/aside/recentplay/RecentPlay.vue')
const Search = () => import('../views/search/SearchDetail.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '',
    redirect: '/findMusic'
  },
  //findmusic
  {
    path: '/findMusic',
    component: FindMusic,
    children:[
      {path:'',redirect:'/findMusic/recommend'},
      {path:'recommend',component:() => import('@/views/aside/find/recommend/Recommend.vue')},
      {path:'playlist',component:() => import('@/views/aside/find/playlist/PlayList.vue')},
      {path:'toplist',component:() => import('@/views/aside/find/playlist/children/TopList.vue')},
      {path:'songschart',component:() => import('@/views/aside/find/ranking/SongsCharts.vue')},
      {path:'singer',component:() => import('@/views/aside/find/singer/Singer.vue')},
      {path:'newestMusic',component:() => import('@/views/aside/find/newmusic/NewestMusic.vue'),
        children:[
          {path:'',redirect:'/findMusic/newestMusic/newSong'},
          {path:'newSong',component:() => import('@/views/aside/find/newmusic/NewSong.vue')},
          {path:'newAlbum',component:() => import('@/views/aside/find/newmusic/NewAlbum.vue')}
        ]}
    ]
  },
  //vedio
  {
    path:'/video',
    component: Video,
    children:[
      {path:'',redirect:'/video/userVideo',},
      {path:'uservideo',component:() => import('@/views/aside/video/uservideo/UserVideo.vue')},
      {path:'mv',component:() => import('@/views/aside/video/mv/MV.vue')},
    ]
  },
  // {
  //   path:'/recentPlay',
  //   component:RecentPlay,
  // },
  {
    path: '/fm',
    component: () => import('@/views/aside/fm/FM.vue')
  },
  //listdetail
  {
    path: '/listDetail',
    component: () => import('@/views/detail/ListDetail.vue')
  },
  //singerdetail
  {
    path: '/singerDetail',
    component: () => import('@/views/detail/SingerDetail.vue')
  },
  //albumdetail
  {
    path: '/albumDetail',
    component: () => import('@/views/detail/AlbumDetail.vue')
  },
  //mvdetail
  {
    path:'/mvDetail',
    component: () => import('@/views/mv/MvDetail.vue')
  },
  {
    path:'/videoDetail',
    component:()=>import('@/views/video/VideoDetail.vue')
  },
  //daily
  {
    path:'/dailyrecommend',
    component:()=>import('@/views/dailyRec/DailyRecommend.vue')
  },
  //search
  {
    path:'/search',
    component: Search,
    children:[
      {path:'songs',component:()=>import('@/views/search/SongsSearch/SongSearch.vue')},
      {path:'singer',component:()=>import('@/views/search/SingerSearch/SingerSearch.vue')},
      {path:'album',component:()=>import('@/views/search/AlbumSearch/AlbumSearch.vue')},
      {path:'video',component:()=>import('@/views/search/VideoSearch/VideoSearch.vue')},
      {path:'playlist',component:()=>import('@/views/search/PlaylistSearch/PlaylistSearch.vue')},
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
import store from '@/store/index.js'
router.beforeEach((to,from,next) => {
  if (!store.state.login.profile && to.path.indexOf('findMusic') === -1 ){
    console.log('1');
    Message.error({
      message: '请先登录',
      type: 'error'
    })
    next('/findMusic')
  } else next()
})
export default router
