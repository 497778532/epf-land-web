<template>
  <!-- 找回密码模块 -->
  <div class="findPass_warp">
    <epf-head titles="找回密码"></epf-head>
    <router-view></router-view>
    <epf-foot></epf-foot>
  </div>
</template>
<script>
import head from "@/page/head";
import foot from "@/page/foot";
import { mapActions } from "vuex";
export default {
  components: {
    "epf-head": head,
    "epf-foot": foot
  },
  data() {
    return {};
  },
  methods:{
    ...mapActions("webListMsg", ["getInformationList"]),
  },
  mounted(){
    this.getInformationList();
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.findPass_warp {
  @include size(100%, auto);
  background: #f2f1f9;
}
</style>