<template>
  <!-- 首页模块 -->
  <div class="Homepage">
    <!-- 首页banner -->
    <div class="bar">
      <epf-bar></epf-bar>
    </div>
    <!-- maintop、发布地源、发布需求、合同网签备案等 -->
    <!-- <div class="main">
      <epf-main></epf-main>
    </div> -->
    <!-- 首页土地转让、出租、抵押 -->
    <div class="list">
      <epf-list></epf-list>
    </div>
    <!-- 首页找地需求 -->
    <div class="issue">
      <epf-demand></epf-demand>
    </div>
    <!-- 首页弹框 -->
    <div class="homePop_warp">
      <homePop></homePop>
    </div>
    <!-- 统计数据 -->
    <div class="statistics">
      <dataStatistics></dataStatistics>
    </div>
  </div>
</template>

<script>
import bar from "./pages/bar";
import main from "./pages/main";
import list from "./pages/list";
import demand from "./pages/demand";
import dataStatistics from "./pages/dataStatistics";
import homePop from "./pop/homePop";
import { mapActions } from "vuex";
export default {
  name: "home",
  components: {
    "epf-bar": bar,
    "epf-main": main,
    "epf-list": list,
    "epf-demand": demand,
    dataStatistics,
    homePop: homePop
  },
  data() {
    return {};
  },
  mounted() {
    this.getSearchDicRegion("0");
		this.getSearchLandUseInfo("land_use");
    this.getSearchflowModeInfo("flow_mode");
    this.getSearchPlotAreaInfo("plot_area");
    this.getSearchYearsUseInfo("years_use");
    this.getSearchLandtypeInfo("land_type");
    this.getSearchlandNatureInfo("land_nature");
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchLandUseInfo",
      "getSearchflowModeInfo",
      "getSearchPlotAreaInfo",
      "getSearchYearsUseInfo",
      "getSearchLandtypeInfo",
      "getSearchlandNatureInfo",
      "getTransfer"
    ])
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.Homepage {
  @include size(100%, auto);
  background: #f2f1f9;
  .bar {
    @include size(100%, auto);
    margin: 0 auto;
  }
  .list {
    margin: 0 auto;
    background: #fafafa;
  }
  .issue{
    @include size(100%, auto);
    background: #fff;
  }
  .statistics{
    @include size(100%, auto);
    background: #fff;
    padding-top:20px;
  }
  // .homePop_warp {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 5;
  // }
}
</style>
