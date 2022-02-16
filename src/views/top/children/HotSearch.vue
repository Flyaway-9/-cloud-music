<template>
  <div>
    <el-popover
      placement="bottom"
      :width="popWidth"
      trigger="focus"
      @show="searchShow"
      :disabled="popVisiable"
    >
      <template #reference>
        <el-input
          :placeholder="defaultKeyword.showKeyword"
          clearable
          v-model.trim="value"
          class="search-input"
          @keyup.enter.native="getSearch(value, 100, 1)"
          ref="input"
        >
          <template #prefix>
            <i
              class="search-icon el-icon-search"
              @click="getSearch(value, 100, 1)"
            ></i>
          </template>
        </el-input>
      </template>
      <!--          搜索弹出层-->
      <el-button id="popo-btn" ref="popo" />
      <div
        v-loading="loading"
        v-show="loading"
        style="width: 100%; height: 40px"
      ></div>
      <div class="item-content" style="">
        <el-scrollbar style="height: 100%" class=".escroll" :native="false">
          <div v-show="suggestResult && !value">
            
            <div>
              <history-item 
            @historyItemClick="historyItemClick"
            >
            </history-item>
            </div>

            <div style="color: #909399; margin: 15px 0">
              <span style="margin-left: 20px">热搜榜</span>
            </div>
            <hot-item
              v-for="(item, index) in hotDetails"
              :key="index"
              :index="index + 1"
              :hItem="item"
              @click.native="decoGet(item.searchWord)"
            ></hot-item>
          </div>
          <div v-show="value">
            <suggest-item
              :albums="suggestResult.albums ? suggestResult.albums : null"
              :artists="suggestResult.artists ? suggestResult.artists : null"
              :songs="suggestResult.songs ? suggestResult.songs : null"
              :playlists="
                suggestResult.playlists ? suggestResult.playlists : null
              "
              :value="value"
            ></suggest-item>
          </div>
        </el-scrollbar>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {Bus} from 'utils/eventBus.js'
import HotItem from "./HotItem.vue";
import SuggestItem from "./SuggestItem.vue";
import HistoryItem from './HistoryItem.vue'
import { throttle } from "utils/throttle.js";
import {
  getSearchDefault,
  getSearchHotDetail,
  getSearchSuggest,
  // getCloudSearch,
} from "network/search.js";
import {mapGetters} from 'vuex'
export default {
  components: {
    HotItem,
    SuggestItem,
    HistoryItem
  },
  inject:['reload'],
  data() {
    return {
      value: "",
      defaultKeyword: {},
      hotDetails: [],
      loading: false,
      popWidth: 350,
      suggestResult: {},
      popVisiable: false,
    };
  },
  mounted() {
    getSearchDefault().then((res) => {
      // console.log(res);
      this.defaultKeyword = res.data.data;
    });
  },
  methods: {
    historyItemClick(keyword){
      this.value = keyword
      this.getSearch(keyword, 100, 1);
    },
    getSearch(value) {
      // console.log(value);
      // event.target.blur();
      // this.popVisiable = false
      this.$refs.input.blur();
      if (!value) {
        this.$router.push({path:'/search'+ this.getSearchType.path,query:{keyword:this.defaultKeyword.realkeyword,type:this.getSearchType.type}})
        this.reload()
      } else
        this.$router.push({path:'/search' + this.getSearchType.path,query:{keyword:value,type:this.getSearchType.type}})
        this.reload()
        // getCloudSearch(value, limit, type).then((res) => {
        //   console.log(res);
        // });
      this.setHistoryItems(value)
      
    },
    decoGet(keyword) {
      // console.log('1');
      this.value = keyword;
      // this.$refs.popo.$el.click();
      this.getSearch(keyword, 100, 1);
    },
    searchShow() {
      // console.log('1');
      this.getHotDetail();
    },
    getHotDetail() {
      // this.loading = true
      getSearchHotDetail().then((res) => {
        // console.log(res);
        if (res.data.data) {
          this.hotDetails = res.data.data;
        }
      });
    },
    setHistoryItems(keyword){
      keyword = keyword.trim();
      let {historyItems} = localStorage;
      if (!historyItems) {
        localStorage.historyItems = keyword;
      } else {
        const onlyItem = historyItems.split('|').filter(e => e!=keyword)
        if(onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.slice(0,9).join('|');
        localStorage.historyItems = historyItems;
      }
      Bus.$emit('historyItemsChange')
    },
  },
  computed:{
    ...mapGetters(['getSearchType']),
    hasHistory(){
      return localStorage.historyItems && localStorage.historyItems.length
    }
  },
  watch: {
    value() {
      if (this.value === "") {
        this.popWidth = 350;
      } else this.popWidth = 400;
      if(this.value){
        throttle(
        getSearchSuggest(this.value).then((res) => {
          console.log(res);
          if (res.data.result.order) {
            this.suggestResult = res.data.result;
          }
        }),
        100
      );
      }
    },
  },
};
</script>

<style lang="less" scoped>

#popo-btn {
  width: 0;
  height: 0;
  border: none;
  padding: 0;
  margin: 0;
}
/deep/ .el-popover {
  padding: 0;
}
/deep/.search-input {
  width: 320px;
  border-radius: 40px;
  // overflow: hidden;
  border: 1px solid #eee;
  .el-input__inner {
    // border: 1px solid #eee;
    border-radius: 40px;
  }
  .search-icon {
    font-size: 16px;
    margin-top: 12px;
    margin-left: 7px;
    &:hover {
      color: rgba(140, 197, 255, 1);
    }
  }
}
.item-content {
  min-height: 400px !important;
  // height: 400px;
  height: 750px;
  max-height: 750px !important;
  overflow: hidden;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
