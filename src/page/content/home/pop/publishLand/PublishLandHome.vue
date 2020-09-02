<template>
  <div class="PublishTransfer_wrap">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="publishTra_wrap">
        <BasiclandInfo></BasiclandInfo>
      </div>
    </div>
  </div>
</template>
<script>
import BasiclandInfo from "./BasiclandInfo";
export default {
  components: { BasiclandInfo },
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'发布地源'},
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.PublishTransfer_wrap {
  @include size(100%, auto);
  background: #f2f1f9;
  .publishTra_wrap {
    @include size(100%, auto);
  }
}
</style>
