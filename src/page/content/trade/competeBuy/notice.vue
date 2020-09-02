<!--igjnqtrf-->
<template>
<div class="ApplyInfo_warp">
  <div class="win1200">
    <epf-lePage :location="location"></epf-lePage>
    <div class="ApplyInfo_Pro">
        <div>
            <epf-switchTitle
              titles_h="成交确认书"
              padding="0px"
              background="#fff"
              height="80px"
              ref="one"
              :shutOff="false"
              class="scroll-item"
            ></epf-switchTitle>
            <div class="ApplyInfo_Pro_cont">
                  <div class="content">
                    <div id="printTransBook">
                      <h2 class="title_h">
                        <b style="color:#000;">{{TransCertificateInfo.cantonCityName}}建设用地使用权二级市场成交确认书</b>
                      </h2>
                      <div class="surface">
                        <table border= "1" width= "100%">
                          <tr>
                            <td width="10%" class="text_center">交易结束日期</td>
                            <td class="text_center" width="15%">{{TransCertificateInfo.bargainTime}}</td>
                            <td class="text_center">交易方式</td>
                            <td class="text_center">
                              {{TransCertificateInfo.transactionType}}{{TransCertificateInfo.circulation}}
                            </td>
                          </tr>
                          <tr>
                            <td width="10%" rowspan="11" class="text_center">交易地块</td>
                            <td width="15%" class="text_right">标的编号</td>
                            <td width="25%" colspan="2">{{TransCertificateInfo.targetNo}}</td>
                          </tr>
                          <tr>
                            <td width="15%" class="text_right">交易地点</td>
                            <td width="25%" colspan="2">{{TransCertificateInfo.tradingCenterName}}</td>
                          </tr>
                          <tr>
                            <td width="15%" class="text_right">土地四至范围</td>
                            <td width="25%" colspan="2" v-if="TransCertificateInfo.transGoodsVoInfo">{{TransCertificateInfo.transGoodsVoInfo.square}}</td>
                          </tr>
                          <tr>
                            <td width="15%" class="text_right">土地（转让/出租）面积</td>
                            <td width="25%" colspan="2" v-if="TransCertificateInfo.transGoodsVoInfo">{{TransCertificateInfo.transGoodsVoInfo.transactionArea}}平方米</td>
                          </tr>
                          <tr>
                            <td width="15%" class="text_right">土地用途</td>
                            <td width="25%" colspan="2" v-if="TransCertificateInfo.transGoodsVoInfo">{{TransCertificateInfo.transGoodsVoInfo.firstClassUse}}-{{TransCertificateInfo.transGoodsVoInfo.secondClassUse}}</td>
                          </tr>
                          <tr>
                            <td width="15%" class="text_right">土地截止日期</td>
                            <td width="25%" colspan="2" v-if="TransCertificateInfo.transGoodsVoInfo">{{TransCertificateInfo.transGoodsVoInfo.mortgageEndTime}}</td>
                          </tr>
                          <tr>
                            <td width="15%" class="text_right">地上建（构）筑物</td>
                            <td width="25%" colspan="2" v-if="TransCertificateInfo.transGoodsVoInfo">{{TransCertificateInfo.transGoodsVoInfo.buildArea}}平方米</td>
                          </tr>
                          <tr>
                            <td width="15%" rowspan="2" class="text_right">成交单价（元/平方米）</td>
                            <td width="25%" colspan="2">大写：{{TransCertificateInfo.unitPriceUp}}</td>
                          </tr>
                          <tr>
                            <td width="25%" colspan="2">小写：{{TransCertificateInfo.unitPrice}}</td>
                          </tr>
                          <tr>
                            <td width="15%" rowspan="2" class="text_right">成交总价（万元）</td>
                            <td width="25%" colspan="2" class="text_color">大写：{{TransCertificateInfo.totalPriceUp}}</td>
                          </tr>
                          <tr>
                            <td width="25%" colspan="2" class="text_color">小写：{{TransCertificateInfo.totalPrice}}</td>
                          </tr>
                          <tr>
                            <td width="10%" rowspan="2" class="text_center">说明事项</td>
                            <td width="25%" rowspan="2" colspan="3">
                              一、本《成交确认书》为买卖（租赁）双方签订《转入、出租合同》的凭证。<br/>

                              二、交易双方应当在签订本《成交确认书》后10个工作如内签订《转入、出租合同》

                              交易双方逾期或拒绝签订《转入、出租合同》的竞得人放弃竞得标的的转入（出租）

                              人或交易机构擅自变更交易结果的，均应当承担违规违约和法律责任。<br/>

                              三、签订《转入、出租合同》后，竞得人交纳的竞买保证金转作合同定金，定金以《

                              转让、出租合同》约定金额为准。<br/>

                              四、本《成交确认书》一式五份，双方各执两份，交易机构留存一份。
                            </td>
                          </tr>
                          <tr>
                          </tr>
                        </table>
                        <table class="bottom_table" border= "1"  width= "100%" >
                          <tr>
                            <td widht="33.3%">
                              <p v-if="TransCertificateInfo.transGoodsVoInfo">原权利人：{{TransCertificateInfo.transGoodsVoInfo.ownerShip}}</p>
                              <p>法定代表人（委托代理人）：</p>
                              <p>地址：</p>
                              <p>法人联系电话：</p>
                            </td>
                            <td widht="33.3%">
                              <p>交易机构：{{TransCertificateInfo.tradingCenterName}}</p>
                              <p>法定代表人：</p>
                              <p>地址：{{TransCertificateInfo.tradingCenterAddress}}</p>
                              <p>联系电话：{{TransCertificateInfo.tradingCenterTel}}</p>
                            </td>
                            <td widht="33.3%">
                              <p>竞得人：{{TransCertificateInfo.applyName}}</p>
                              <p>法定代表人（或委托代理人）：</p>
                              <p>地址：</p>
                              <p>联系电话：</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div class="text_right" style="margin-top:40px;">
                        签订时间：___年___月___日
                      </div>
                    </div>
                    <div class="btns_box">
                        <div class="middleBox applyBidde_oper" style="text-align:center;">
                            <div class="button_border" @click="transEndBook">下载</div>
                            <div class="button_bg"  v-print="'#printTransBook'">打印</div>
                            <div class="button_default" @click="close">关闭</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>1
</div>
</template>
<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:'/TradingHall',name:'交易大厅'},
        {path:null,name:'成交确认书'},
      ],
      TransCertificateInfo:{
        area:''
      },
      userId:"",
    }
  },
  created(){
    this.userId=localStorage.getItem('userId');
    this.getTransCertificateInfoBytargetId();
  },
  methods: {
    close(){
      window.history.go(-1);
    },
    // 下载成交确认书
    transEndBook(){
      let url = baseURL1.baseURL1 + "/epf-landweb/pdf/downloadTransEndBook?licenseId=" + this.$route.query.id;
      window.open(url);
    },
     //获取证书的信息
    getTransCertificateInfoBytargetId(){
        this.$axios.post("/epf-landweb/transcertificateinfo/getTransCertificateInfoBylicenseId?licenseId=" + this.$route.query.id,
        {},
        res => {
          debugger
          if (res.code != "0") {
              this.$message.error(res.msg); //失败
              return;
            }
          console.log('获取的信息是--------------：'+res.TransCertificateInfo);
          this.TransCertificateInfo = res.TransCertificateInfo;
          });
    },
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.ApplyInfo_warp{
  @include size(100%, 100%);
  background: #f2f1f9;
}
.ApplyInfo_Pro {
  @include size(100%, auto);
  background: #fff;
  box-sizing: border-box;
  .ApplyInfoTab{
    @include size(100%, 50px);
    border-bottom: solid 1px #f3f3f3;
    li{
        font-size: 14px;
        color: #666666;
        line-height: 50px;
        display: inline-block;
        padding:0 10px 0 30px;
        span{
            display: inline-block;
            line-height: 50px;
            cursor: pointer;
        }
        .spanActive{
            color: #ffa300;
            border-bottom: solid 1px #ffa300;
        }
    }
  }
  &_cont {
    box-sizing: border-box;
    @include size(1200px,auto);
    padding: 0 50px;
    margin:0 auto;
    padding-bottom:30px;
    border-bottom: solid 1px #f3f3f3;
    .ApplyInfoUl{
        line-height: 40px;
        color: #333333;
        font-size: 14px;
        span{
            color: #999999;
        }
        p{
            border: solid 1px #f3f3f3;
            box-sizing: border-box;
            padding: 25px 20px;
            margin-left: 74px;
            color: #999999;
            span{
                color: var(--Colors);
            }
        }
    }
    .applyBidde_box{
        // @include size(632px,auto);
        // margin:25px auto;
        box-sizing: border-box;
        padding:40px;
        border: solid 1px #eeeeee;
        .applyBidde_title{
        text-align: center;
        line-height:50px;
        font-size: 20px;
        color: #333333;
        font-weight: bold;
        }
        .applyBidde_cont{
        .applyBidde_applicant{
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            font-weight: bold;
        }
        .applyBidde_text{
            .applyBidde_rem{
            text-indent: 2rem;
            }
            p{
            text-indent: 2rem;
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            margin:10px;
            span{
                color:var(--Colors);
            }
            }
        }
        .applyBidde_oper{
            @include size(275px,36px);
            margin:0 auto;
            div{
            @include size(70px,36px);
            background-color: var(--Colors);
            border-radius: 2px;
            text-align: center;
            line-height: 36px;
            display: inline-block;
            margin-right: 25px;
            color: #fff;
            cursor: pointer;
            &:nth-child(2){
                border: solid 1px var(--Colors);
                background: #fff;
                color:var(--Colors);
            }
            &:nth-last-child(1){
                margin-right: 0px;
                border: solid 1px #e0dfdf;
                background: #fff;
                color: #666666;
            }
            }
        }
        }
    }
    table{
      border:1px solid #f3f3f3;
      thead{
        tr{
          @include size(100%,50px);
          border-bottom:1px solid #f3f3f3;
          &:nth-child(1){
            background: #f2f5f7;
            td{
              font-weight: bold;
            }
          }
        }
      }
      tr{
        @include size(100%,50px);
        border-bottom:1px solid #f3f3f3;
        td{
          text-align: left;
          color:#666666;
          font-size: 14px;
          &:nth-child(1){
            width:150px;
            text-align: center;
          }
          &:nth-child(4){
            // color:#4671d5;
          }
          .text_red{
            color:red;
            margin-right: 5px;
            cursor: auto;
          }
          span{
            margin-right: 10px;
            cursor: pointer;
          }
          input{
            @include size(320px,36px);
            color: #666666;
            background-color: #ffffff;
            border-radius: 2px;
            box-sizing: border-box;
            border: solid 1px #e0dfdf;
            text-indent:1rem;
          }
          input:disabled{
            border: none;
            text-indent:0rem;
          }
        }
      }
      .oper{
        span{
          margin-right: 10px;
          cursor: pointer;
          color:#4671d5;
        }
      }
    }
    .opertion{
      @include size(30%,50px);
      margin:0 auto;
      .submit_input{
          @include size(82px, 36px);
          background-color: var(--Colors);;
          border-radius: 3px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 36px;
          cursor: pointer;
          margin-right: 24px;
          display: inline-block;
      }
      .save_input{
          background: #fff;
          border:solid 1px var(--Colors);
          color: var(--Colors);
      }
    }
    .applyType_warp{
      box-sizing: border-box;
      padding: 30px 32px;
      overflow: hidden;
      .applyType_ul{
        @include size(100%,auto);
        margin-bottom: 40px;
        ul{
          @include size(100%,auto);
          line-height: 50px;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 50px;
          border-bottom: 1px solid #f3f3f3;
          li{
            @include size(50%,50px);
            .contractype{
              span{
                display: inline-block;
                width:100px;
                text-align: right;
              }
            }
          }
        }
      }
      .button{
        @include size(82px, 36px);
        background-color: var(--Colors);;
        border-radius: 3px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        margin-bottom: 15px;
        margin-top:- 15px;
        float: right;
      }
      .button_delete{
        float:right;background:#fff;color:#666;border: solid 1px #e0dfdf;margin-left:20px;
      }
    }
  }
}
.applyBidde_oper{
  @include size(275px,36px);
  margin:0 auto;
  div{
    @include size(70px,36px);
    background-color: var(--Colors);
    border-radius: 2px;
    text-align: center;
    line-height: 36px;
    display: inline-block;
    margin-right: 25px;
    color: #fff;
    cursor: pointer;
    &:nth-child(2){
      border: solid 1px var(--Colors);
      background: #fff;
      color:var(--Colors);
    }
    &:nth-last-child(1){
      margin-right: 0px;
      border: solid 1px #e0dfdf;
      background: #fff;
      color: #666666;
    }
  }
}
</style>
<style>
  .has-gutter tr{
    background-color: #f2f5f7 !important;
  }
.title_h{
    text-align: center;
    font-size: 18px;
}
.surface{
    margin-top: 70px;
}
.surface table{
    border-color: #e2e2e2;
}
.surface tr td{
    padding: 14px 25px;
}
.text_center{
    text-align: center;
}
.text_right{
    text-align: right;
}
.text_color{
    color: #ffa300;
}
.bottom_table{
    border-top: 0;
    border-color: #e2e2e2;
}
.btns_box{
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
}
</style>
