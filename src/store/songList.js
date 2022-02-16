
const songList = {
  state: {
    songlist: [],
    recentPlays: [],
  },
  mutations: {
    setNewSongList(state, payload) {
      // this.songList = []
      state.songlist = payload;
    },
    addSongList(state, payload) {
      payload.forEach((element) => {
        state.songlist.push(element);
      });
    },
    addSong(state, payload) {
      state.songlist.unshift(payload);
    },
    setSongsRecent(state, payload) {
      state.recentPlays = payload;
    },
  },
  actions: {
    // async recentSong(context) {
    //   let res = await getSongsRecent();
    //   console.log(res.data.data.list);
    //   let sort = res.data.data.list.sort(compare("playTime"));
    //   console.log(sort);
    //   context.commit("setSongsRecent", sort);
    // },
  },
  getters: {
    getSongList(state) {
      return [...new Set(state.songlist)];
    },
    getRecenetSongs(state) {
      return state.recentPlays.sort(compare('playTime'));
    },
  },
};

function compare(prop) {
  return function (obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(val2)) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    console.log(val1 - val2);
    if (val1 > val2) {
      return -1;
    } else if (val1 < val2) {
      return 1;
    } else {
      return 0;
    }
  };
}
export default songList;
