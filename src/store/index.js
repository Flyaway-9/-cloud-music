import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import login from './login'
import songPlay from './songPlay'
import songList from './songList'
import search from './search'
// import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  //配置插件
  plugins:[createPersistedState({
    paths:['login','songPlay','songList','search']
  })],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    songPlay,
    songList,
    search,
  },
  getters:{}
})
