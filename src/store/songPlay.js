import {getSongDetail} from '@/network/song.js'
// import getters from './getters'

const songDetail = {
  state: {
    songDetail: null,
    playing: null,
    lyric:[],
    nowUrl:''
  },
  mutations:{
    setSongDetail(state,payload){
      state.songDetail = {}
      state.playing = payload.id
      state.songDetail = payload
    },
    setLyric(state,payload) {
      state.lyric = payload
    },
    setUrl(state,payload){
      state.nowUrl = payload
    }
  },
  actions:{
    //设置当前音乐的图标
    async songDetail(context,payload) {
      let res = await getSongDetail(payload)
      context.commit('setSongDetail',res.data.songs[0])
      // console.log(res.data.songs[0]);
    },    
  },
  getters: {
    getSongDetail(state){
      return state.songDetail
    },
    getPlayingId(state){
      return state.playing
    },
    getLyric(state){
      return state.lyric
    },
    getUrl(state){
      return state.nowUrl
    }
  }
}

export default songDetail