<template>
  <div class="unify">
    <el-carousel trigger="click" height="460px">
      <el-carousel-item v-for="(item,index) in comImg" :key="index">
        <img v-lazy="baseUrl + item.img" alt class="bannerImg" @click="AdvertisingUrl(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
export default {
  components: {},
  data() {
    return {
      baseUrl: "",
      baseImg: require("../../../../assets/image/icon-servicebj.png"),
      coverImgUrl: "",
      list: []
    };
  },
  created() {
    this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
  },
  computed: {
    comImg() {
      return this.list;
    }
  },
  mounted() {
    let param = {
      typeUse: "service" //服务中心banner类型图
    };
    this.init(param);
  },
  methods: {
    AdvertisingUrl(item) {
      var btn = document.createElement("a");
      btn.setAttribute("href", item.url); // href链接
      btn.setAttribute("target", "_blank"); //新窗口打开
      if (item.url) {
        btn.click(); // 自执行点击事件
      }
    },
    init(param) {
      let _this = this;
      _this.$axios.get(
        // "/epf-cms/cmsAdvert/getCmsAdvertByTypeUse",
        this.$API.EPF_CMS.USE,
        param,
        res => {
          if (res.code == 0) {
            _this.list = res.advertList;
          }
        }
      );
    }
  }
};
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
  // /deep/ .el-carousel--horizontal{
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
