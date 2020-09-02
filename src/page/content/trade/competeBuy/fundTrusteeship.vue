<!--zijbtogr-->
<template>
  <div class="ApplyInfo_warp">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="ApplyInfo_Pro">
        <div>
            <epf-switchTitle
              titles_h="资金托管协议"
              padding="0px"
              background="#fff"
              height="80px"
              ref="one"
              :shutOff="false"
              class="scroll-item"
            ></epf-switchTitle>
          <div class="ApplyInfo_Pro_cont">
            <div class="content">
              <div id="trusteeship">
                <h2 class="title_h">
                  <b style="color:#000;">{{TransCertificateInfo.cantonCityName}}建设用地使用权资金托管协议</b>
                </h2>
                <div class="surface">
                  <p v-if="TransCertificateInfo.transGoodsVoInfoList">甲方：{{TransCertificateInfo.transGoodsVoInfoList[index].ownerShip}}</p>
                  <p>乙方：{{TransCertificateInfo.applyName}}</p>
                  <p>丙方：{{TransCertificateInfo.tradingCenterName}}</p>
                  <p>
                    甲、乙、丙三方遵循平等自愿和诚实信用原则，经协商一致同意将国有建设用地使用权转让交易资金交丙方进行托管，现将有关事项订立如下协议：
                  </p>
                  <p>
                    第一条 甲方与乙方在{{TransCertificateInfo.tradingCenterName}}签订《{{TransCertificateInfo.cantonCityName}}国有建设用地使用权转让合同》（以下简称转让合同），甲方将位于<span v-if="TransCertificateInfo.transGoodsVoInfoList">{{TransCertificateInfo.transGoodsVoInfoList[index].location}}</span>>的国有建设用地使用权及其地
                    上建筑物，建筑面积共计{{TransCertificateInfo.buildArea}}平方米，转让给乙方，并一致同意将全部交易价款（含竞得人交纳的竞买保证金）交丙方托管。丙方承诺
                    将托管资金存在以下指定资金托管账户，不得挪作它用。
                  </p>
                  <p>户  名：<span>{{TransCertificateInfo.tradingCenterName}}</span></p>
                  <p>账  户：<span>{{TransCertificateInfo.tradingCenterTrusteeAccount}}</span></p>
                  <p>开户行：<span>{{TransCertificateInfo.tradingCenterOpeningBank}}</span></p>
                  <p>
                    第二条  交易价款总额以转让交易双方签订的交易合同约定金额为准。乙方已缴纳款竞买保证金由丙方转入资金托管账户，合同剩余款项由乙方
                    在约定时间内存入丙方指定资金托管账户并向丙方提交有效凭证
                  </p>
                  <p>
                    第三条  三方约定，甲方办理托管资金支取时，由以下指定人员办理，资金转入以下指定账户。如指定人员不能亲自办理的，需交经公政的授权
                    委托书，由委托人代为理。
                  </p>
                  <p>
                    1、支取托管资金时甲方支取经办人员身份信息：
                  </p>
                  <p>姓   名：<span></span></p>
                  <p>性   别：<span></span></p>
                  <p>证件名称：<span></span></p>
                  <p>证件号码：<span></span></p>
                  <p>
                    2、支取托管资金汇入甲方账户信息：
                  </p>
                  <p>户  名：<span></span></p>
                  <p>账  户：<span></span></p>
                  <p>开户行：<span></span></p>
                  <p>
                    第四条  全部交易价款到达资金托管账户后，丙方将出具《{{TransCertificateInfo.cantonCityName}}国有建设用地使用权二级市场交易资金托管凭证》（以下简称《托管凭证》）给转
                    让交易双方。《托管凭证》是支取托管资金的重要凭证，如果《托管凭证》发送遗失或毁损，需立即到丙方办理登记挂失手续。
                  </p>
                  <p>
                    第五条  在国有建设用地使用权转移登记已受理并审核通过之日起，可由约定的甲方支取经办人凭《托管凭证》、身份证明材料及《不动产权证书》
                    复印件或办结证明文件，填写《{{TransCertificateInfo.cantonCityName}}国有建设用地使用权二级市场交易资金托管支取凭证》（以下简称《支取凭证》），向丙方办理托管细节支取手续。
                  </p>
                  <p>
                    第六条   若因法院查封或其他国家机关限制交易，或交易双方约定终止交易的，经丙方同意，交易双方在合同上共同书面确认解除合同，凭交易合同、
                    《托管凭证》、身份证明材料，填写《支取凭证》，由交易双方共同向丙方办理托管资金支取手续。
                  </p>
                  <p>
                    第七条   甲、乙双方同意托管资金不计利息，丙方同意不收取资金托管费用。
                  </p>
                  <p>
                    第八条   交易双方因交易产生的任何纠纷与本协议无关，不影响本协议履行。
                  </p>
                  <p>
                    第九条  甲、乙、丙因协议产生的纠纷协商不成的，申请{{TransCertificateInfo.area}}仲裁委员会仲裁。
                  </p>
                  <p>
                    第十条   本协议一式三份，甲、乙、丙三方各执一份。
                  </p>
                  <ul>
                    <li>
                      <p v-if="TransCertificateInfo.transGoodsVoInfoList">甲方：{{TransCertificateInfo.transGoodsVoInfoList[index].ownerShip}}</p>
                      <p>法定代表人（或代理人）：</p>
                      <p>地址：</p>
                      <p>联系电话：</p>
                    </li>
                    <li>
                      <p>乙方：{{TransCertificateInfo.applyName}}</p>
                      <p>法定代表人（或代理人）：</p>
                      <p>地址：</p>
                      <p>联系电话：</p>
                    </li>
                    <li>
                      <p>丙方：{{TransCertificateInfo.tradingCenterName}}</p>
                      <p>法定代表人（或代理人）：</p>
                      <p>地址：{{TransCertificateInfo.tradingCenterAddress}}</p>
                      <p>联系电话：{{TransCertificateInfo.tradingCenterTel}}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="btns_box">
                <div class="middleBox applyBidde_oper" style="text-align:center;">
                  <div class="button_border" @click="trusteeshipBook">下载</div>
                  <div class="button_bg" v-print="'#trusteeship'">打印</div>
                  <div class="button_default" @click="close">关闭</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        {path:null,name:'资金托管协议'},
      ],
      titles:'',
      TransCertificateInfo: {},
      index:0,
    }
  },
  mounted(){
    if(this.$route.query.index){
      this.index = this.$route.query.index;
    }

    // 获取证书的信息
    this.$axios.get("/epf-landweb/transcertificateinfo/getTransCertificateInfoBylicenseId?licenseId=" + this.$route.query.id,{},res => {
      if(res.code == 0){
        this.TransCertificateInfo = res.TransCertificateInfo;
      }
    });
  },
  methods: {
    close(){
      window.history.go(-1);
    },
    // 下载资金委托协议
    trusteeshipBook(){
      let url = baseURL1.baseURL1 + "/epf-landweb/pdf/downloadTrusteeshipBook?licenseId=" + this.$route.query.id+"&index="+this.index
      window.open(url);
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
