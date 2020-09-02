<template>    
<!-- 交易大厅 -->
  <div class="tradehall_warp">

    <!-- 交易大厅虚线图 -->
    <!-- 正在建设中 -->
    <!-- 交易大厅指向箭头 -->
   
    <!-- <div class="construct">
       <div class="entrustHome">
        <span>交易大厅</span>
        <img src="../../../assets/image/entrustHome.png" alt />
      </div>
      <div class="construct_content">
        <img class="entrustConstruct" src="../../../assets/image/entrustConstruct.png" alt/>
        <img src="../../../assets/image/tradingHall.gif" alt />
        <div>
          <span class="constructing">交易大厅正在建设中，敬请期待...</span>
          <span class="backIndex"  @click="backToIndex">返回首页</span>
        </div>
      </div>
    </div> -->

    <div class="tradehall_banner">
      <!-- 交易大厅竞价状态 -->
      <div class="biddingState">
        <epf-bidding></epf-bidding>
      </div>
    </div>
    <!-- 委托交易 -->
    <div class="listingtransacte">
      <epf-listing></epf-listing>
    </div>
    <!-- 自行交易 -->
    <div class="agreementtransacte">
      <epf-agree></epf-agree>
    </div>
    <!-- 公示公告 -->
    <div class="noticePublic">
      <epf-notice></epf-notice>
    </div>
    <!-- <div class="gray" v-show="tradeShow"></div> -->
  </div>
</template>

<script>
import bidding from './pages/bidding'
import listing from './pages/listing'
import agree from './pages/agree'
import notice from './pages/notice'
export default {
  components: {
    'epf-bidding':bidding,
    'epf-listing':listing,
    'epf-agree':agree,
    'epf-notice':notice
  },
  data () {
    return {
      tradeShow: false
    }
  },
  methods: {
    backToIndex(){
      this.$router.push({path:"/"})
    }
  },
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.tradehall_warp{
  @include size(100%,100%);
  overflow: hidden;
  padding-bottom: 35px;
  border-top: 2px solid var(--Colors);
  .construct{
    position: absolute;
    top: 80px;
    left: 50%;
    width: 536px;
    margin-left: -268px;
    z-index:10000;
    .entrustConstruct{
      margin:28px 0 -35px 295px;
    }
    .constructing {
      padding-left: 27px;
      margin-right: 40px;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      float: left;
      line-height: 22px;
    }
    .backIndex {
      margin-top: 10px;
      background: url("../../../assets/image/backIndex.png") no-repeat;
      font-weight: normal;
      font-size: 14px;
      padding: 15px 28px 18px 28px;
      color: #fff;
      cursor: pointer;
    }
    .entrustHome{
      position: absolute;
      top:-30px;
      span{
        margin:18px 0 0 375px;
        display:block;
        width:70px;
        color:#ffa300;
        font-size:16px; 
        font-weight: bold;
      }
      img{
        margin:-30px 0 0 352px;
      }
    }
  }
 
  .tradehall_banner{
    @include size(auto,558px);
	  background: url('../../../assets/image/icon-23.png') no-repeat center center;
    overflow: hidden;
    .biddingState{
      @include size(1200px,480px);
      margin:0 auto;
      margin-top:40px;
    }
  }
  .listingtransacte{
    @include size(1200px,471px);
    margin:0 auto;
    background: #fff;
    margin-top:25px;
  }
  .agreementtransacte{
    @include size(1200px,451px);
    margin:0 auto;
    background: #fff;
    margin-top:25px;
    overflow: hidden;
  }
  .noticePublic{
    @include size(1200px,407px);
    margin:0 auto;
    background: #fff;
    margin-top:25px;
  }
}
.gray {
  width: 100%;
  height: 2530px;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
</style>
