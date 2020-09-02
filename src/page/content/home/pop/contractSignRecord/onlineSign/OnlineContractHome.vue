<template>
  <div class="SignRecordHome_wrap">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'出租合同服务'},
      ]
    };
  },
  created(){
    this.location[1].name=this.$route.query.signRecordtype+'合同服务'
  },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.SignRecordHome_wrap {
  @include size(100%, auto);
  //border-top: 2px solid #ffa300;
  background: #f2f1f9;
  .SignRecord_wrap {
    @include size(100%, auto);
  }
}
</style>
