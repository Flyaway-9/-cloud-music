<template>
  <div id="more-song-list">
    <el-row
      :gutter="20"
      class="song-list"
      v-for="(item, index) in songs"
      :key="index"
      @dblclick.native="songPlay(item.id)"
    >
      <el-col :span="1" :offset="0" class="song-list-no"
        ><span v-if="item.id === activeId"
          ><i class="iconfont icon-shengyin"></i
        ></span>
        <span v-else>{{ index + 1 }}</span></el-col
      >
      <el-col
        :span="10"
        :offset="0"
        class="song-list-name"
        :class="{ active: item.id === activeId }"
        >{{ item.name }}&ensp;<span
          v-if="item.alia.length"
          style="font-size: 13px; color: #9e9e9e"
          >({{ item.alia[0] }})</span
        ></el-col
      >
      <el-col :span="5" :offset="0" class="song-list-sing"
        ><span v-for="ar in item.ar" :key="ar.index" class="sing-item" @click="singClick(ar.id)"
          >{{ ar.name }}
        </span>
      </el-col>
      <el-col :span="5" :offset="0" class="song-list-al">
        <span class="al-item" @click="albumClick(item.al.id)">{{ item.al.name }}</span>
      </el-col>
      <el-col :span="2" :offset="0" class="song-list-time">{{
        getTime(item.dt)
      }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { getListAll } from "network/songList.js";
import { Bus } from "utils/eventBus.js";
import { mapGetters } from 'vuex';
export default {
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      songs: [],
      activeId: Number,
      song: {}
    };
  },
  created() {
    this.activeId = this.getPlayingId
    getListAll(this.id).then((res) => {
      // console.log(res);
      this.songs = res.data.songs;
      // console.log(this.songs);
    });
    
  },
  mounted() {
    Bus.$on("playcolor", (id) => {
      this.activeId = id;
    });
  },
  methods: {
    getTime(time) {
      let ctime = time + "";
      ctime = ctime.substring(0, ctime.length - 3);
      ctime = parseInt(ctime);
      let min = Math.floor(ctime / 60);
      let second = ctime % 60;
      return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
    },
    songPlay(id) {
      // console.log(id);
      Bus.$emit("songPlay", id);
      // console.log(this.songs);
      let songs = setlist(this.songs)
      this.song = songs
      // console.log(songs);
      this.$store.commit('setNewSongList',songs)
    },
    songAdd(){
      // console.log('111');
      let songs = setlist(this.songs)
      this.$store.commit('addSongList',songs)
    },
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
    albumClick(id){
      this.$router.push({path:'/albumDetail',query:{id:id}})
    }
  },
  computed:{
    ...mapGetters(['getPlayingId']),
  }
};
function setlist(songs) {
  const newList =  songs.map(function(item){
    return {id: item.id,name: item.name,song: {alias:item.alia,artists: item.ar,duration:item.dt}}
  })
  return newList
}
</script>

<style lang="less" scoped>
.active {
  color: #409eff;
}
#more-song-list {
  /deep/.song-list {
    font-size: 14px;
    line-height: 40px;
    padding: 0;
    height: 40px;
    &:nth-child(2n + 1) {
      background-color: #f5f5f5;
    }
    &:hover {
      background-color: #eeeeee;
    }

    .song-list-no {
      color: #757575;
      text-align: center;
      .iconfont {
        font-size: 15px;
      }
    }
    .song-list-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .song-list-sing {
      color: #9e9e9e;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .sing-item:hover {
        color: #000;
        cursor: pointer;
      }
    }
    .song-list-al {
      color: #9e9e9e;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .al-item:hover {
        color: #000;
        cursor: pointer;
      }
    }
    .song-list-time {
      color: #757575;
      font-weight: 300;
      font-size: 12px;
    }
  }
}
</style>
