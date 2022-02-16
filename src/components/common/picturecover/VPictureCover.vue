<template>
  <div style="width:350px;" class="cover">
    <span>
      <img :src="this.image" alt="" @click="mvClick(id)">
      <span>{{title}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'VPictureCover',
  props:{
     title: {
       type: String,
       default(){
         return ''
       }
     },
     image: {
       type: String,
       default(){
         return ''
       }
     },
     id:{
       type:Number
     }
  },
  methods:{
    mvClick(id){
      this.$router.push({path:'/mvDetail',query:{id:id}})
    }
  }
}
</script>

<style scoped>
.cover span{
  cursor: pointer;
  height: 160px;
}
.cover  img{
  width: 100%;
  border-radius: 5px;
  /* height: 200px; */
}
.cover span {
  font-size: 13px;
  font-weight: 400;
  color: #424242;
}
</style>