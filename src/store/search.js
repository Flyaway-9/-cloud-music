

const search ={
  state:{
    searchType:{path:'/songs',type:1}
  },
  mutations:{
    setSearchType(state,payload){
      state.searchType = payload
    }
  },
  getters:{
    getSearchType(state){
      return state.searchType
    }
  }
}
export default search