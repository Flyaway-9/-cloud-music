<template>
  <div id="singer-content" v-loading="loading">
    <div class="singer-pic"> <img :src="singerItem.img1v1Url" alt=""  @load="isload" @click="singerClick"></div>
    <span class="singer-name">{{singerItem.name}}</span>
  </div>
</template>

<script>
export default {
  props:{
    singerItem:{}
  },
  inject:['reload'],
  data() {
    return {
      loading: true
    }
  },
  methods:{
    isload(){
      this.loading = false
      this.$emit('loaded')
    },
    singerClick(){
      this.$router.push({path:'/singerDetail',query:{id:this.singerItem.id}})
      this.reload()
    }
  },
  mounted(){
  },
  
  computed: {
  }
}
</script>

<style lang="less" scoped>
#singer-content {
  margin-top: 10px;
  .singer-pic {
    width: 170px;
    height: 170px;
    background-color: pink;
    border-radius: 5px;
    background-size: cover !important;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .singer-name {
    display: inline-block;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #757575;
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #212121;
    }
  }
}
</style>
