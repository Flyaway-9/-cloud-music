<template>
  <div id="song" :class="{hoverActive: itemIndex % 2 === 1}">
    <span class="song-index" v-show="!(song.id === activeId)">{{itemIndex}}</span>
    <span class="song-index" v-show="(song.id === activeId)"><i class="iconfont icon-shengyin"></i></span>
    <div class="song-img" @click="itemPlay(song.id)">
      <img :src="song.album.blurPicUrl" alt="" @load="loaded">
      <div class="song-play">
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
    <div class="song-name">
      <span :class="{playing: song.id === activeId}">{{song.name}}</span>
      <span class="song-desc">{{song.song.alias[0]}}</span>
    </div>
    <div class="sing-name-content">
      <span class="sing-name" v-for="(item,index) in song.song.artists" :key="index" @click="singClick(item.id)">
      <span v-show="index > 0" class="name-split">/</span>
        {{item.name}}
      </span>
    </div>
    <div class="album-name-content">
      <span class="album-out" @click="albumClick(song.album.id)">
        <span class="album-name">{{song.album.name}}</span>
        <span class="album-desc" v-if="song.album.alias.length">({{song.album.alias[0]}})</span>
      </span>
    </div>
    <div class="album-time">{{getTime(song.song.duration)}}</div>
  </div>
</template>

<script>
// import {debounce} from 'utils/debounce.js'
import {Bus} from 'utils/eventBus.js'
import {mapGetters} from 'vuex'
export default {
  props:{
    song:{
      type:Object
    },
    index:{
      type:Number
    }
  },
  data() {
    return {
      sent:false,
      activeId:0
    }
  },
  created(){
    this.activeId = this.getPlayingId
  },
  mounted(){
    Bus.$on("playcolor", (id) => {
      this.activeId = id;
    });
  },
  methods:{
    // loaded: debounce(function(){
    //   console.log('1');
    //     this.$emit('songloaded')
    // },100)
    loaded(){
      this.$emit('songloaded')
    },
    itemPlay(id){
      this.$emit('itemPlay',id)
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
    itemIndex(){
      return this.index < 10? '0' + (this.index + 1) : (this.index + 1)
    },
    getTime() {
      return (time) => {
        let ctime = time + "";
        ctime = ctime.substring(0, ctime.length - 3);
        ctime = parseInt(ctime);
        let min = Math.floor(ctime / 60);
        let second = ctime % 60;
        return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.playing{
  color: #409EFF;
}
.hoverActive{
  background-color: rgba(249,249,249);
}
#song{
  user-select: none;
  display: flex;
  width: 100%;
  height: 85px;
  border-radius: 3px;
  line-height: 85px;
  font-size: 14px;
  padding: 0 35px;
  &:hover{
    background-color: rgba(240,241,242);
  }
  .song-index{
    flex: 1;
    // width: 25px;
    margin-right: 5px;
    color: #bdbdbd;
    .iconfont{
      font-size: 18px;
    }
  }
  .song-img{
    flex: 2.4;
    position: relative;
    width: 60px;
    height: 60px;;
    border-radius: 5px;
    margin-top: 13px;
    overflow: hidden;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
    }
    .song-play{
      position: absolute;
      left: 51%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 25px;
      height: 25px;
      border-radius: 25px;
      line-height: 25px;
      text-align: center;
      background: rgba(255,255,255,.8);
      .iconfont{
        font-size: 14px;
      }
    }
  }
  .song-name{
    // flex: 18;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 450px;
    margin-left: 10px;
    margin-right: 20px;
    color: #424242;
    .song-desc{
      color: #bdbdbd;
      margin-left: 5px;
    }
  }
  .sing-name-content{
    // flex: 7.2;
    width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    margin-right: 10px;
    .sing-name{
      position: relative;
      &:nth-child(n+2){
        margin-left: 9px;
      }
      color: #757575;
      cursor: pointer;
      .name-split{
        position: absolute;
        left: -9px;
        font-size: 12px;
        color: #757575;
        pointer-events: none;
        // cursor: default;
      }
      &:hover{
        color: #424242;
      }
    }
  }
  .album-name-content{
    // flex: 8.4;
    width: 210px;
    color: #757575;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .album-out{
    cursor: pointer;
    
      .album-desc{
        margin-left: 5px;
        color: #bdbdbd;
      }
      &:hover{
        .album-name{
          color: #424242;
        }
      }
    }
  }
  .album-time{
    flex: 4.8;
    // width: 120px;
    color: #bdbdbd;
    text-align: right;
  }
}
</style>