<template>
  <div id="song" :class="{ hoverActive: itemIndex % 2 === 1 }">
    <span class="song-index" v-show="!(song.id === activeId)">{{
      itemIndex
    }}</span>
    <span class="song-index" v-show="song.id === activeId"
      ><i class="iconfont icon-shengyin"></i
    ></span>
    <div class="song-name">
      <span
        :class="{ playing: song.id === activeId }"
        v-html="brightenKeyword(song.name, keyword)"
      ></span>
      <span class="song-desc" v-if="song.song.alias.length"
        >({{ song.song.alias[0] }})</span
      >
    </div>
    <div class="sing-name-content">
      <span
        class="sing-name"
        v-for="(item, index) in song.song.artists"
        :key="index"
        @click="singClick(item.id)"
        v-html="brightenKeyword(item.name, keyword)"
      >
        <span v-show="index > 0" class="name-split">/</span>
      </span>
    </div>
    <div class="album-name-content">
      <span class="album-out" @click="albumClick(song.song.album.id)">
        <span
          class="album-name"
          v-html="brightenKeyword(song.song.album.name, keyword)"
        ></span>
        <span class="album-desc" v-if="song.song.alias.length"
          >({{ song.song.alias[0] }})</span
        >
      </span>
    </div>
    <div class="album-time">{{ getTime(song.song.duration) }}</div>
  </div>
</template>

<script>
// import {debounce} from 'utils/debounce.js'
import { Bus } from "utils/eventBus.js";
import { mapGetters } from "vuex";
export default {
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number,
    },

    nowPage: {
      type: Number,
    },
  },
  data() {
    return {
      sent: false,
      activeId: 0,
      keyword: {
        type: String,
      },
    };
  },
  created() {
    this.activeId = this.getPlayingId;
    this.keyword = this.$route.query.keyword;
  },
  mounted() {
    Bus.$on("playcolor", (id) => {
      this.activeId = id;
    });
  },
  methods: {
    // loaded: debounce(function(){
    //   console.log('1');
    //     this.$emit('songloaded')
    // },100)
    loaded() {
      this.$emit("songloaded");
    },
    itemPlay(id) {
      this.$emit("itemPlay", id);
    },
    singClick(id) {
      this.$router.push({ path: "/singerDetail", query: { id: id } });
    },
    albumClick(id) {
      this.$router.push({ path: "/albumDetail", query: { id: id } });
    },
    brightenKeyword(val, keyword) {
      const Reg = new RegExp(keyword, "i");
      if (val) {
        return val.replace(
          Reg,
          `<span style="color: #409EFF;">${keyword}</span>`
        );
      }
    },
  },
  computed: {
    ...mapGetters(["getPlayingId"]),
    itemIndex() {
      // console.log(this.nowPage);
      return this.index + 1 + (this.nowPage - 1) * 100 < 10
        ? "0" + (this.index + 1)
        : this.index + 1 + (this.nowPage - 1) * 100;
    },
    getTime() {
      return (time) => {
        let ctime = time + "";
        ctime = ctime.substring(0, ctime.length - 3);
        ctime = parseInt(ctime);
        let min = Math.floor(ctime / 60);
        let second = ctime % 60;
        return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
      };
    },
  },
};
</script>

<style lang="less" scoped>
.playing {
  color: #409eff;
}
.hoverActive {
  background-color: rgba(249, 249, 249);
}
#song {
  user-select: none;
  display: flex;
  // width: 1650px;
  width: 100%;
  height: 35px;
  border-radius: 3px;
  line-height: 35px;
  font-size: 14px;
  padding: 0 35px;
  &:hover {
    background-color: rgba(240, 241, 242);
  }
  .song-index {
    flex: 1;
    width: 25px;
    margin-right: 5px;
    color: #bdbdbd;
    .iconfont {
      font-size: 18px;
    }
  }
}
.song-name {
  flex: 7;
  // width: 550px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 20px;
  color: #424242;
  .song-desc {
    color: #bdbdbd;
    margin-left: 5px;
  }
}
.sing-name-content {
  flex: 3;
  // width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin-right: 10px;
  .sing-name {
    position: relative;
    &:nth-child(n + 2) {
      margin-left: 9px;
    }
    color: #757575;
    cursor: pointer;
    .name-split {
      position: absolute;
      left: -9px;
      font-size: 12px;
      color: #757575;
      pointer-events: none;
      // cursor: default;
    }
    &:hover {
      color: #424242;
    }
  }
}
.album-name-content {
  flex: 5.4;
  // width: 420px;
  margin-left: 50px;
  color: #757575;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .album-out {
    cursor: pointer;

    .album-desc {
      margin-left: 5px;
      color: #bdbdbd;
    }
    &:hover {
      .album-name {
        color: #424242;
      }
    }
  }
}
.album-time {
  flex: 1;
  width: 50px;
  color: #bdbdbd;
  text-align: left;
}
</style>
