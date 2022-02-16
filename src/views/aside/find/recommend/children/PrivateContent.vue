<template>
  <div>
    <show-content title="专属定制"></show-content>
    <section class="section">
      <template v-if="vedioList.length" >
        <v-picture-cover 
        v-for="item in vedioList" 
        :key="item.index"
        :title="item.name"
        :image="item.picUrl"
        :id="item.id"
        ></v-picture-cover>
      </template>


       <el-skeleton v-else style="width: 300px;" animated v-for="item in 3" :key="item">
          <template #template>
            <el-skeleton-item variant="image" style="width: 300px; height: 110px;" />
            <div style="margin-top: 8px;">
              <el-skeleton-item variant="p" style="width: 100%;"/>
              <el-skeleton-item variant="p" style="width: 50%; margin-top: 5px;" />
            </div>
          </template>
        </el-skeleton>
        
    </section>
  </div>
</template>

<script>
import ShowContent from 'components/common/showcontent/ShowContent.vue'
import VPictureCover from 'components/common/picturecover/VPictureCover.vue'

import {getPrivateContent} from 'network/recommend.js'


export default {
  name: 'PrivateContent',
  components: {
    ShowContent,
    VPictureCover
  },
  data() {
    return {
      vedioList: []
    }
  },
  created() {
    getPrivateContent().then(res => {
      // console.log(res);
      this.vedioList = res.data.result
      // console.log(this.vedioList);
    })
  }
}
</script>

<style scoped>
.section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1100px;
  margin: 0 auto;
}
</style>