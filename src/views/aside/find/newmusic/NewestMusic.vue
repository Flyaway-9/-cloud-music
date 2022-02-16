<template>
  <div id="newest">
    <div class="router-control">
      <div
        class="router-button"
        :class="{ active: !isActive(item.path) }"
        v-for="(item, index) in childrenRouter"
        :key="index"
        @click="routeChange(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childrenRouter: [
        { name: "新歌速递", path: "/newSong" },
        { name: "新碟上架", path: "/newAlbum" },
      ],
    };
  },
  created() {
  },
  methods: {
    routeChange(path){
      // if(this.isActive(path)){
        this.$router.replace({path: this.$route.matched[1].path + path})
      // }
      
    }
  },
  computed: {
    isActive() {
      return (path) => {
        return this.$route.path.indexOf(path) === -1;
      };
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #fff;
  background-color: rgba(187, 187, 187, 1);
  pointer-events: none;
}
#newest {
  user-select: none;
  width: 1100px;
  margin: 0 auto;
  .router-control {
    display: flex;
    width: 230px;
    height: 30px;
    border-radius: 30px;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    line-height: 30px;
    margin: 20px auto;
    border: 1px solid rgba(187, 187, 187, 1);
    .router-button {
      width: 50%;
      height: 100%;
      border-radius: 30px;
      &:hover {
        background-color: rgba(244, 244, 244);
      }
    }
  }
}
</style>
