<template>
  <div class="PublishTransfer_wrap">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="publishTra_wrap">
        <EntrustlandbasicInfo></EntrustlandbasicInfo>
      </div>
    </div>
  </div>
</template>
<script>
import EntrustlandbasicInfo from "./EntrustlandbasicInfo";
export default {
  components: {  EntrustlandbasicInfo },
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'委托交易'},
      ],
    };
  },
  created(){
    if(this.$route.query.detail){
      this.location[1].name="委托交易详情"
    }else{
      this.location[1].name="委托交易"
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.PublishTransfer_wrap {
  @include size(100%, auto);
  //border-top: 2px solid #ffa300;
  background: #f2f1f9;
  .publishTra_wrap {
    @include size(100%, auto);
  }
}
</style>
