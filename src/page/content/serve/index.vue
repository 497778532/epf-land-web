<template>
  <div class="serve">
    <!-- 服务中心bar -->
    <div class="bar">
      <epf-bar></epf-bar>
    </div>
    <!-- 服务中心-main -->
    <div class="main">
      <epf-main></epf-main>
    </div>
    <!-- 服务中心-list -->
    <div class="list">
      <epf-list></epf-list>
    </div>
  </div>
</template>

<script>
import bar from "./pages/bar"
import main from "./pages/main"
import list from "./pages/list"
export default {
  components: {
    'epf-bar':bar,
    'epf-main':main,
    'epf-list':list
  },
  data() {
    return {}
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.serve {
  @include size(100%, auto);
  padding-bottom: 35px;
  .bar {
    width: 100%;
    height: 400px;
    margin: 0 auto;
  }
  .main {
    @include size(1200px, 158px);
    margin: 0 auto;
    margin-top: -35px;
  }
  .list {
    @include size(1200px, auto);
    margin: 0 auto;
    margin-top: 22px;
    background: #fff;
  }
}
</style>
