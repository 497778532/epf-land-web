<template>
<div class="SaveDraft_warp">
  <div class="win1200">
      <div class="SignRecord_wrap">
        <div class="epf_proess">
          <span class="epf_proess_title">{{ signRecordtype }}合同服务</span>
          <div class="epf_proess_cont">
            <epf-step :active="3" :data="['甲乙双方基本信息','地块基本信息','完成']"></epf-step>
          </div>
        </div>
        <div class="publishTra_main">
          <div class="publishTra_main_con">
            <div class="publishTra_main_con_img">
                <img src="@/assets/image/savedraft.png" alt="" width="68" height="72">
            </div>
            <p class="conp01">保存成功</p>
            <p class="conp02">合同保存为草稿状态，可以在<span  @click="mycontact()">个人中心-我的合同</span>中查看</p>
            <div style="text-align: center;">
              <div class="epf_btn epf_btn_bg" @click="reHome()">返回首页</div>
              <div class="epf_btn epf_btn_def" @click="reApply()">继续申请</div>
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
      signRecordtype:null
    };
  },
  created(){
    this.signRecordtype = this.$route.query.signRecordtype
  },
  methods:{
    reHome(){
      this.$router.push('/')
    },
    mycontact(){
      this.$router.push('/PersonalCenter/registerContract')
    },
    reApply(){
      // this.$router.push({path:'/',query:{openSign:true}})
      this.$router.push({path:'/',query:{showcontact:1}})
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
    @include size(450px, 230px);
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
}
</style>
