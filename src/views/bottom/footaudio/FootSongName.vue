<template>
  <div class="foot-content" v-if="songDetails">
    <span
          class="foot-img-content"
          :style="{ 'background-image': 'url(' + songDetails.al.picUrl + ')'}"
          @mouseenter="incover" 
          @mouseleave="outcover"
          @click="imgclick"
        >
          <i v-show="cover" class="el-icon-arrow-up"></i>
        </span>
        <span class="foot-song-name">{{ songDetails.name }} <span class="song-describe" v-if="songDetails.alia.length">({{songDetails.alia[0]}})</span></span>
        <div class="foot-singer-names">
          <span
            class="foot-singer-name"
            v-for="ar in songDetails.ar"
            :key="ar.index"
            @click="singClick(ar.id)"
            >{{ ar.name }}</span
          ></div>
  </div>
  <div v-else class="foot-content">
    <span
          class="foot-img-content"
          style=""
          @mouseenter="incover" 
          @mouseleave="outcover"
          @click="imgclick"
        >
          <i v-show="cover" class="el-icon-arrow-up"></i>
        </span>
        <span class="foot-song-name" >云音乐</span>
        
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
import {Bus} from 'utils/eventBus.js'
export default {
  data() {
    return {
      cover: false,
    }
  },
  methods: {
    incover(){
      this.cover = true
    },
    outcover(){
      this.cover = false
    },
    imgclick(){
      Bus.$emit('DetailDialog',this.songDetails.id)
      // console.log(this.songDetails);
    },
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
  },
  computed:{
    ...mapGetters({
      songDetails: 'getSongDetail'
    })
  }
}
</script>

<style>
.song-describe {
  font-size: 13px;
  font-weight: 300;
}
.foot-content {
  float: left;
  width: 200px;
  position: relative;
  /* overflow: hidden; */
  margin-top: 9px;
  
}
.foot-img-content {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  background-size: 50px 50px;
  overflow: hidden;
  cursor: pointer;
  background-image: url('../../../assets/img/网易云音乐.png')
}
.foot-img-content .el-icon-arrow-up {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 50px;
  font-size: 25px;
  opacity: 0.5;
  color: #fff;
  background-color: #000;
  cursor: pointer;
}
.foot-img-content .el-icon-arrow-up:hover {
  display: block;
}
.foot-img-content img {
  width: 100%;

}
.foot-song-name {
  position: absolute;
  max-width: 170px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 15px;
  top: 4px;
  left: 60px;
  /* text-overflow: ellipsis; */
  cursor: pointer;
  color: #424242;
}
.foot-singer-names {
  position: absolute;
  bottom: 7px;
  left: 60px;
  font-size: 14px;
  color: #424242;
  white-space: nowrap;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.foot-singer-name {
  margin-bottom: 7px;
  cursor: pointer;
  margin-right: 5px;
}

.foot-song-name:hover {
  color: #000;
}
</style>