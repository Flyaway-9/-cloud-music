<template>
  <div id="album">
    <div class="album-cover">
      <div
        class="album-img"
        :style="{ background: 'url(' + albumName + ')' }"
        @click="albumClick"
      ></div>
      <span class="album-time">{{ albumTime(this.album.publishTime) }}</span>
    </div>
    <div class="album-songs">
      <div class="album-title">
        <span class="album-name">{{ album.name }}</span>
        <span class="iconfont icon-icon-bofang" @click="playAll"></span>
      </div>
      <div class="song-list">
        <div
          class="song-item"
          v-for="(item, index) in songs"
          :key="index"
          v-show="develop(index)"
          @dblclick="songPlay(item.id)"
        >
          <span v-if="item.id === activeId" style="flex:1;text-align:center;"
            ><i class="iconfont icon-shengyin"></i
          ></span>
          <span v-else class="song-no">{{
            index + 1 >= 10 ? index + 1 : "0" + (index + 1)
          }}</span>
          <span class="song-name" :class="{ active: item.id === activeId }"
            >{{ item.name }}
            <span
              style="color: #757575; font-size: 13px"
              v-if="item.song.alias.length"
              :class="{ active: item.id === activeId }"
              >({{ item.song.alias[0] }})</span
            >
          </span>
          <span class="song-time">{{ songTime(item.song.duration) }}</span>
        </div>
        <div v-if="show" @click="isShow" class="load-more">查看更多></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbum } from "network/singer.js";
import { Bus } from "utils/eventBus";
import { mapGetters } from 'vuex';
export default {
  props: {
    album: {},
    name: String,
    pic: String,
  },
  data() {
    return {
      songs: [],
      show: false,
      activeId: Number,
    };
  },
  created() {
    this.activeId = this.getPlayingId;
  },
  mounted() {
    // console.log(this.album);
    getAlbum(this.album.id).then((res) => {
      // console.log(res);
      this.songs = setlist(res.data.songs);
      if (this.songs.length > 10) {
        this.show = true;
      }
    });
    Bus.$on("playcolor", (id) => {
      this.activeId = id;
    });
  },
  methods: {
    isShow() {
      // console.log(this.show);
      this.show = false;
    },
    songPlay(id) {
      // console.log(id);
      Bus.$emit("songPlay", id);
      this.$store.commit("setNewSongList", this.songs);
    },
    playAll(){
      let id = this.songs[0].id
      Bus.$emit("songPlay", id);
      this.$store.commit("setNewSongList", this.songs);
    },
    albumClick(){
      this.$router.push({path:'/albumDetail',query:{id:this.album.id}})
    }
  },
  computed: {
    ...mapGetters(['getPlayingId']),
    songTime() {
      return (time) => {
        let ctime = time + "";
        ctime = ctime.substring(0, ctime.length - 3);
        ctime = parseInt(ctime);
        let min = Math.floor(ctime / 60);
        let second = ctime % 60;
        return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
      };
    },
    albumName() {
      return this.pic ? this.pic : this.album.picUrl;
    },
    albumTime() {
      return (time) => {
        let date = new Date(time);
        let Y = date.getFullYear();
        let M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return Y + "-" + M + "-" + D;
      };
    },
    develop() {
      return (index) => {
        if (this.show === true) {
          return index < 10;
        } else return true;
      };
    },
  },
  watch: {},
};
function setlist(songs) {
  const newList = songs.map(function (item) {
    return {
      id: item.id,
      name: item.name,
      song: { alias: item.alia, artists: item.ar, duration: item.dt },
    };
  });
  return newList;
}
</script>

<style lang="less" scoped>
.active {
  color: #409eff!important;
}
#album {
  margin: 20px 0;
  display: flex;
  overflow: auto;
  .album-cover {
    flex: 1;
    .album-img {
      width: 160px;
      height: 160px;
      border-radius: 5px;
      background-size: cover !important;
      cursor: pointer;
    }
    .album-time {
      display: inline-block;
      margin-top: 5px;
      font-size: 12px;
      color: #757575;
    }
  }
  .album-songs {
    flex: 5;
    .album-title {
      span {
        display: inline-block;
      }

      .album-name {
        font-size: 17px;
        font-weight: 600;
      }
      .iconfont {
        margin-left: 20px;
        color: #757575;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .song-list {
      margin: 10px 0;
      .song-item {
        display: flex;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        &:nth-child(2n + 1) {
          background-color: #fafafa;
        }
        &:hover {
          background-color: #eeeeee;
        }
        .iconfont {
          font-size: 20px;
      }
        .song-no {
          flex: 1;
          text-align: center;
          color: #bdbdbd;
          font-size: 12px;
        }
        .song-name {
          flex: 10;
          color: #424242;
          font-size: 14px;
        }
        .song-time {
          flex: 2;
          color: #bdbdbd;
          font-size: 12px;
        }
      }
      .load-more {
        color: #757575;
        font-size: 14px;
        padding-right: 120px;
        text-align: end;
        line-height: 35px;
        height: 35px;
        border-radius: 3px;
        background-color: #fafafa;
        cursor: pointer;
        &:hover {
          color: #424242;
          background-color: #eeeeee;
        }
      }
    }
  }
}
</style>
