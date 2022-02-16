<template>
  <div id="top">
    <strong>精品歌单</strong>
    <top-menu style="float:right;" :nowTag="cat" @changeTopTag="changeTopTag"></top-menu>
        
   <div class="section" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <top-cover
        v-for="item in playlists"
        :id="item.id"
        :key="item.index"
        :title="item.name"
        :image="item.coverImgUrl"
        :playCount="item.playCount"
        :copywriter="item.copywriter"
        :tag="item.tag"
        
      ></top-cover>
    </div>
      <p class="no-more" v-if="!noMore">到底啦~</p>
  </div>
</template>

<script>
import TopMenu from 'components/common/cateMenu/TopMenu.vue';
import TopCover from "components/common/picturecover/TopCover.vue";
import {getTopList} from 'network/songList.js';
// import {Bus} from 'utils/eventBus.js'
export default {
  data() {
    return {
      cat: '全部歌曲',
      playlists:[],
      limit: 10,
      total: 0
    }
  },
  components:{
    TopMenu,
    TopCover
  },
  methods:{
    load(){
      this.limit = this.limit + 5
      getTopList(this.cat,this.limit).then(res => {
      // console.log(res);
      this.playlists = res.data.playlists
    })
    },
    changeTopTag(cat){
      this.cat = cat
      this.limit= 10
      getTopList(cat,this.limit).then(res => {
      // console.log(res);
      this.playlists = res.data.playlists
    })
    },
    
  },
  created(){
    this.cat = this.$route.query.cat
    getTopList(this.cat,this.limit).then(res => {
      // console.log(res);
      this.playlists = res.data.playlists
      this.total = res.data.total
      // console.log(this.total);
    })
  },
  computed:{
    noMore(){
      return this.playlists.length === this.total
    },
    disabled(){
      return !this.noMore
    }
  }
}
</script>

<style scoped>
#top {
  width: 1100px;
  margin: 0 auto;
  margin-top: 40px;
}
.section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1100px;
  margin: 0 auto;
}
.no-more {
  text-align: center;
}
</style>