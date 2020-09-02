<template>
  <!--  @name: banner
        @description: 主要是banner宽度相互影响
        @author: gaojie
        @chageTime:2020-6-16 -->
  <div class="unify">
    <div class="content">
        <Main style="display:inline-block;"></Main>
        <div style="width:970px;display:inline-block;">
          <el-carousel trigger="click" height="300px">
          <el-carousel-item v-for="(item, index) in list" :key="index" 
              width="970px">
              <img
                alt
                v-lazy="baseURLclu + item.img"
                class="bannerImg"
                @click="AdvertisingUrl(item)"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
    </div>
    <!-- banner上的转让、出租、抵押 -->
    <div class="landsearch_warp win1200">
      <Landsearch></Landsearch>
    </div>
  </div>
</template>

<script>
import Main from "./main";
import Landsearch from './Landsearch'
import { mapState, mapActions } from 'vuex'
import baseURL1 from '@/util/config.js'
export default {
  components: { Main,Landsearch },
  data() {
    return {
      list: []
    }
  },
  methods: {
    AdvertisingUrl(item) {
      var btn = document.createElement('a')
      btn.setAttribute('href', item.url) // href链接
      btn.setAttribute('target', '_blank') //新窗口打开
      if (item.url) {
        btn.click() // 自执行点击事件
      }
    },
    init(param) {
      let that = this
      that.$axios.get(this.$API.EPF_CMS.USE, param, res => {
        if (res.code == 0) {
          that.list = res.advertList
        }
      })
    }
  },
  created() {
    this.baseURLclu = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC
  },
  mounted() {
    this.init({ typeUse: 'home' })
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.unify {
  @include size(100%, auto);
  margin: 0 auto;
  position: relative;
  padding:16px 0 20px 0;
  background:#edf6fc;
  .content{
    width:1200px;
    margin:0 auto;
  }
}
.el-carousel__item {
  position: absolute;
  @include size(100%, 100%);
  overflow: hidden;
  margin: 0 auto;
  .bannerImg {
    width: 100%;
    height: 100%;
  }
}
// .unify .landsearch_warp {
//   width: 1200px;
//   margin: 0 auto;
//   position: absolute;
//   bottom: 0;
//   left: calc(50% - 600px);
//   z-index: 2;
// }
.unify .landsearch_warp{
  border:1px solid #d2d2d2;
  margin-top: 10px;
}
</style>
<style>
  /* <!--  @name: banner
        @description: 主要是banner宽度相互影响
        @author: gaojie
        @chageTime:2020-6-16 --> */
.unify .el-carousel--horizontal{
  /* width:1920px; */
  /* width:970px; */
  width:100%;
  margin:0 auto;
}
.unify .el-carousel__indicator{
  padding:12px 7px;
}
.unify .el-carousel__indicator.is-active button{
  background-color: var(--priceColor);
}
</style>
