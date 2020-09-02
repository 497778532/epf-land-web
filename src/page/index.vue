<template>
  <!-- 主入口模块 -->
  <div>
    <!-- 公共头部 -->
    <epf-head slot="header"></epf-head>
    <!-- 路由切换页面 -->
    <div style="background:#f3f3f9;">
      <router-view slot="routerContent"></router-view>
    </div>
    <!-- 公共底部 -->
    <epf-foot slot="footer"></epf-foot>
    <!-- 公共侧边栏 -->
    <epf-aside slot="aside"></epf-aside>
    <!-- <theme v-show="true"></theme> -->
    <!-- <div
      style="width:500px;height:500px;"
      :style="{
        'border-color': themeColor,
        'background-color': backgroundColor
      }"
      class="primaryColor"
    ></div> -->
  </div>
</template>
<script>
import head from "./head";
import foot from "./foot";
import aside from "./aside";
import { mapState, mapActions } from "vuex";
import theme from "@/page/Theme.vue";
export default {
  name: "index",
  components: {
    "epf-head": head,
    "epf-foot": foot,
    "epf-aside": aside,
    theme: theme
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"])
  },
  mounted() {
    this.getInformationList();
    let root = document.querySelector(":root");
    // let root = 
    // document.documentElement.style.setProperty("--Colors", "aquamarine");
    // document.documentElement.style.setProperty("--lightColor", "yellow");
    // document.documentElement.style.setProperty("--priceColor", "springgreen");
    // root.style.setProperty("--Colors", "aquamarine");
    // root.style.setProperty("--lightColor", "yellow");
    // root.style.setProperty("--priceColor", "springgreen");
    root.style.setProperty("--Colors", "#2d488d");
    root.style.setProperty("--lightColor", "#2b70c2");
    root.style.setProperty("--priceColor", "#ca0202");
  },
  // --Colors:#2d488d;
  // --lightColor:#2b70c2;
  // --priceColor:#ca0202;
  computed: {
    ...mapState({
      themeColor: state => state.commons.themeColor
    }),
    backgroundColor() {
      // 返回某个颜色的三原色
      const tintColor = color => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        return [red, green, blue];
      };
      let color = this.themeColor.replace("#", "");
      color = tintColor(color);
      // 转成rgba格式的，并添加透明度
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, .3)`;
    }
  }
};
</script>
<style lang="scss" scoped></style>
