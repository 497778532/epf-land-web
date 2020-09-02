<template>
  <div class="SignRecordHome_wrap">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <router-view></router-view>
      <!-- <div class="SignRecord_wrap">
        <PartybasicInfo></PartybasicInfo>
      </div> -->
    </div>
  </div>
</template>
<script>
import PartybasicInfo from "./PartybasicInfo";

export default {
  components: { PartybasicInfo },
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'出租合同网签备案'},
      ]
    };
  },
  created(){
    if(Number(this.$route.query.signRecord)===1){
      this.location[1].name="转让合同网签备案"
    } else if(Number(this.$route.query.signRecord)===2){
      this.location[1].name="出租合同网签备案"
    }  else if(Number(this.$route.query.signRecord)===3){
      this.location[1].name="抵押合同网签备案"
    }
    
  },
  methods:{
    
  }
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
