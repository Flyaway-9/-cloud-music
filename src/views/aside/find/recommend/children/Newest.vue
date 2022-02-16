<template>
  <section>
    <show-content title="最新音乐"></show-content>
    <el-row
      v-if="songs.length"
      :gutter="20"
      type="flex"
      class="new el-col"
      style="
        width: 1100px;
        height: 300px;
        margin: 0 auto;
        justify-content: space-between;
        flex-wrap: wrap;
        overflow: auto;
      "
    >
      <el-col
        :span="8"
        :offset="0"
        v-for="item in songs"
        :key="item.index"
        style="
          height: 50px;
          padding-left: 0;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 5px;
        "
        @dblclick.native="songPlay(item.id)"
      >
        <span
          class="new-img-content"
          :style="{ 'background-image': 'url(' + item.picUrl + ')' }"
        >
          <i class="iconfont icon-icon-bofang"></i>
        </span>
        <span class="new-song-name">{{ item.name }} <span class="song-describe" v-if="item.song.alias.length">({{item.song.alias[0]}})</span></span>
        <div class="new-singer-names">
          <span
            class="new-singer-name"
            v-for="ar in item.song.artists"
            :key="ar.index"
            @click="singClick(ar.id)"
            >{{ ar.name }}</span
          >
        </div>
      </el-col>
    </el-row>
    <el-row 
    v-else
    :gutter="20"
    style="
        width: 1100px;
        height: 300px;
        margin: 0 auto;
      ">
      <el-col  :span="8" v-for="item in 12" :key="item.index">
        <el-skeleton style="width: 100%" animated>
          <template slot="template">
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 100%" />
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-items: space-between;
                "
              >
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import ShowContent from "components/common/showcontent/ShowContent.vue";
import { getRecommendNewSongs } from "network/recommend.js";
import {Bus} from '@/utils/eventBus.js'
export default {
  name: "Newest",
  data() {
    return {
      songs: [],
    };
  },
  components: {
    ShowContent,
  },
  created() {
    getRecommendNewSongs().then((res) => {
      // console.log(res);
      this.songs = res.data.result;
    });
  },
  methods: {
    
    songPlay(id){
      Bus.$emit('songPlay',id);
      console.log(this.songs);
      this.$store.commit('setNewSongList',this.songs)
    },
    singClick(id) {
      this.$router.push({ path: "/singerDetail", query: { id: id } });
    },
  }
};
</script>

<style>
.new .el-col {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.new .el-col:hover {
  background-color: #eeeeee;
  transition: all 0.4s ease;
}

.new-img-content {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 4px;
  background-size: 50px 50px;
}
.new-img-content .iconfont {
  font-size: 30px;
  opacity: 0.6;
  color: #fff;
}
.new-img-content img {
  width: 100%;
}
.new-song-name {
  position: absolute;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  top: 3px;
  left: 60px;
  /* text-overflow: ellipsis; */
  pointer-events: none;
}
.new-singer-names {
  position: absolute;
  bottom: 3px;
  left: 60px;
  max-width: 300px;
  font-size: 13px;
  font-weight: 300;
  color: #ccc;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
}
.new-singer-name {
  margin-right: 7px;
}
.new-singer-name:hover {
  /* font-weight: 400; */
  color: #000;
}
</style>
