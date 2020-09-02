<template>
  <div class="land" :style="{'padding-bottom':inpMessage?1350+'px':690+'px'}">
    <!-- 土地banner -->
    <div class="banner">
      <epf-banner></epf-banner>
    </div>
    <!-- 土地-Maintop -->
    <div class="main">
      <epf-main @messageData="getMessageData"></epf-main>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import moment from "moment";
import "../../../../static/map/js/china";
import banner from "./pages/banner";
import main from "./pages/main";
export default {
  components: {
    'epf-banner':banner,
    'epf-main':main
  },
  data() {
    return {
      inpMessage: false
    };
  },
  methods: {
    getMessageData(val) {
      this.inpMessage = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.land {
  @include size(100%, auto);
  padding-bottom: 690px;
  .banner {
    width: 100%;
    height: 400px;
    margin: 0 auto;
  }
  .main {
    @include size(1200px, 158px);
    margin: 0 auto;
    margin-top: -35px;
  }
}
</style>
