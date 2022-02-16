<template>
  <el-carousel :interval="4000" type="card" height="200px" class="swiper">
    <el-carousel-item v-for="(item, index) in bannersMessage" :key="index">
      <span class="banner-title" :class="{ colorRed: item.titleColor === 'red' }">{{
        item.typeTitle
      }}</span>

      <h3 class="medium">
        <img
          :src="item.imageUrl"
          alt=""
          @click="itemClick(item.targetType, item.targetId)"
        />
      </h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getBanner } from "network/recommend.js";
import { Bus } from "utils/eventBus.js";
export default {
  name: "Banner",
  data() {
    return {
      bannersMessage: [],
    };
  },
  created() {
    this.getBannerMessage();
  },
  methods: {
    getBannerMessage() {
      getBanner().then((res) => {
        // console.log(res);
        const data = res.data;
        this.bannersMessage = data.banners;
        // console.log(this.bannersMessage[0].imageUrl);
      });
    },
    itemClick(type, id) {
      // console.log("1");
      switch (type) {
        case 1:
          Bus.$emit("songPlay", id);
          break;
        case 10:
          this.$router.push({path:'/albumDetail',query:{id:id}})
          break;
        case 1000:
          this.$router.push({path:'/listDetail',query:{id:id}})
      }
    },
  },
};
</script>

<style lang="less">
.colorRed{
  background-color:  rgba(204, 74, 74, 1);
}
.banner-title {
  position: absolute;
  right: 0;
  bottom: 0;
  display: inline-block;
  width: 70px;
  height: 20px;
  font-size: 12px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-top-left-radius: 8px;
  z-index: 999;
}
.is-active button {
  background-color: #409eff;
}
.swiper {
  width: 1100px;
  margin: 15px auto !important;
}
.el-carousel__item {
  border-radius: 8px;
  overflow: hidden;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.medium img {
  width: 100%;
}
</style>
