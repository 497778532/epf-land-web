<template>
<div class="SaveDraft_warp">
  <div class="win1200">
    <epf-lePage :location="location"></epf-lePage>
      <div class="SignRecord_wrap">
        <div class="publishTra_main">
          <div class="publishTra_main_con">
            <div class="publishTra_main_con_img">
                <img src="../../../../assets/image/savedraft.png" alt="" width="68" height="72">
            </div>
            <p class="conp01">保存为草稿</p>
            <p class="conp02">竞买申请还未提交，可以在<span @click="mybid()">个人中心-我的申购-我的订单</span>中查看</p>
            <div class="operation">
              <div class="epf_btn epf_btn_bg" @click="reHome()">返回首页</div>
              <div class="epf_btn epf_btn_def" @click="mybid()">我的订单</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:'/TradingHall',name:'交易大厅'},
        {path:null,name:'申请竞买'},
      ],
    };
  },
  created(){
    if(Number(this.$route.query.signRecord)===1){
      this.signRecordtype="转让"
      this.contractType="转让合同"
      this.location="转让合同网签备案"
    } else if(Number(this.$route.query.signRecord)===2){
      this.signRecordtype="出租"
      this.contractType="出租合同"
      this.location="出租合同网签备案"
    }  else if(Number(this.$route.query.signRecord)===3){
      this.signRecordtype="抵押"
      this.contractType="抵押合同"
      this.location="抵押合同网签备案"
    }
  },
  methods:{
    reHome(){this.$router.push('/')},
    mybid(){this.$router.push('/PersonalCenter/myOrder')},
    reapply(){this.$router.push({
        path:'/applyBiddingBook',
        query:{id: this.$route.query.id, type:'3'}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.SaveDraft_warp{
  @include size(100%, 100%);
  background: #f2f1f9;
}
.publishTra_main {
  @include size(1200px, auto);
  margin-bottom: 30px;
  background: #fff;
  padding-top:148px;
  padding-bottom:148px;
  &_con{
    @include size(400px, 230px);
    margin:0 auto;
    &_img{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p{
      text-align: center;
      color:#333333;
      line-height: 60px;
    }
    .conp01{
      line-height: 44px;
      font-size: 30px;
      margin-top:20px;
    }
    .conp02{
      font-size: 14px;
      span{
        color:var(--lightColor);
        cursor: pointer;
      }
    }
  }
  .operation{
    margin-left: 120px;
  }
}
</style>
