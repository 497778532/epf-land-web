<template>
  <div class="unify">
    <el-carousel trigger="click" height="460px">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img alt 
          v-lazy="baseUrl + item.img" 
          class="bannerImg" 
          @click="AdvertisingUrl(item)"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js"
export default {
  components: {},
  data() {
    return {
      baseUrl: "",
      baseImg: require("../../../../assets/image/icon-servicebj.png"),
      list: []
    };
  },
  created() {
    this.baseUrl = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC
    let param = {
      typeUse: "landData"
    };
    this.init(param)
  },
  methods: {
    AdvertisingUrl(item) {
      let btn = document.createElement("a")
      btn.setAttribute("href", item.url)
      btn.setAttribute("target", "_blank")
      if (item.url) {
        btn.click()
      }
    },
    
    init(param) {
      let _this = this
      _this.$axios.get(this.$API.EPF_CMS.USE,param,res => {
          if (res.code == 0) {
            _this.list = res.advertList
          }
        }
      )
    }
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
  border-top: 2px solid var(--Colors);
  margin: 0 auto;
  position: relative;
  //  /deep/ .el-carousel--horizontal{
  //   width:1920px;
  //   margin:0 auto;
  // }
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
.unify .landsearch_warp {
  width: 1200px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: calc(50% - 600px);
  z-index: 2;
}
</style>