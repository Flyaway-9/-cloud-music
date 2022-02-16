<template>
  <div id="album">
    <div class="album-img">
      <img :src="album.blurPicUrl" @load="loaded" @click="albumClick(album.id)" alt="">
    </div>
    <span @click="albumClick(album.id)" class="album-name" :data-attr="content">
      {{album.name}}
    </span>
    <p class="sing-name">
      <span @click="singClick(album.artist.id)">{{album.artist.name}}</span>
    </p>
    
  </div>
</template>

<script>
export default {
  props:{
    album:{},
    value: Number
  },
  data() {
    return {
    }
  },
  methods:{
    loaded(){
      this.$emit('loaded')
    },
    singClick(id){
      this.$router.push({path:'/singerDetail',query:{id:id}})
    },
    albumClick(id){
      this.$router.push({path:'/albumDetail',query:{id:id}})
    }
  },
  computed:{
    content(){
      // console.log('1');
      if(this.album.alias.length){
      return  '(' + this.album.alias[0] + ')'
      } 
      else if(this.album.transNames){
        return  '(' + this.album.transNames[0] + ')'
      } else return ''
    }
  }
}
</script>

<style lang="less" scoped>
#album{
  margin-top: 20px;
  width: 170px;
  .album-img{
    width: 170px;
    height: 170px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .album-name{
    display: inline-block;
    max-width: 170px;
    font-size: 14px;
    color: #616161;
    cursor: pointer;
    margin-top: 5px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover{
      color: #000;
    }
    &::after{
      content: attr(data-attr);
      font-size: 14px;
      color: #757575;
    }
  }
  .sing-name{
    font-size: 12px;
    color: #757575;
    span{
    cursor: pointer;
    &:hover{
      color: #424242;
    }
    }
  }
}
</style>