<template>
  <!-- 绑定手机模块 -->
  <div class="findPass_warp">
    <epf-head titles="重新绑定手机号"></epf-head>
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
    'epf-head':head,
    'epf-foot':foot
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
</style>