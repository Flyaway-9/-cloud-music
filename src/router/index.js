import Vue from 'vue'
import VueRouter from 'vue-router'

const FindMusic = () => import('../views/aside/find/FindMusci.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/findMusic/recommend'
  },
  {
    path: '/findMusic',
    component: FindMusic,
    children:[
      {path:'recommend',component:() => import('@/views/aside/find/recommend/Recommend.vue')}
    ]
  },
  {
    path: '/fm',
    component: () => import('@/views/aside/fm/FM.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
