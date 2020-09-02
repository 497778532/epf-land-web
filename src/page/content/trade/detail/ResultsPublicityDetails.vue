<template>
  <div class="tradePublicDetail_warp">
    <epf-lePage :location="location" v-if="this.$route.path !== '/TradingDetails'"></epf-lePage>
     <div class="tradePublicDetail_cont" :style="this.$route.path == '/TradingDetails' ? 'padding:0 0':'padding:50px 0 0'">
      <div class="landshow_main_listtop_con">
        <div class="landshow_text" v-if="transTargetEntityMap&&transTargetEntityMap!==null">
          <p class="landshowtext_header">{{transTargetEntityMap.publictTitle}}</p>
          <p class="landshowtext_subheader">{{transTargetEntityMap.targetNo}}</p>
          <!-- <p class="landshowtext_subheader">公告日期：2020-09-09</p> -->
          <p class="landshowtext_subheader">发布时间：
            {{transTargetEntityMap.insertTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(transTargetEntityMap.insertTime)[0]:'0000-00-00'}}
          </p>
          <!-- <p style="text-align:right;margin-right:35px;position:absolute;right:0px;top:40px;">浏览次数：{{}}次</p> -->
          <div style="height:1px;background:#e0dede;width:1120px;margin:0 auto 25px;"></div>
          <p class="landshow_textcon"  v-html="transTargetEntityMap.publictContext"> </p>
        </div>
        <div class="landshow_main">
          <div class="landshow_main_cont">
            <epf-switchTitle
            :titles_h="this.$route.path !== '/TradingDetails' ? '标的信息':'地块基本情况'"
            padding="0px"
            background="#f2f5f7"
            height="58px"
            ref="one"
            :shutOff="false"
            class="scroll-item"
          ></epf-switchTitle>
            <div width="100%;" class="landshow_tableTitle">
              <span>{{transTargetEntityMap.targetNo}}</span>
            </div>
            <table class="landshow_table1" width="100%" cellpadding="0" cellspacing="0"  v-if="transTargetEntityMap&&transTargetEntityMap!==null&&transGoodsEntityList&&transGoodsEntityList!==null&&transGoodsEntityList[0]&&transGoodsEntityList[0]!==null">
                <tr>
                  <td style="text-align:center">标的编号：</td>
                  <td colspan='3' style="padding-left:45px;color:var(--lightColor)">{{transTargetEntityMap.targetNo}}</td>
                </tr>
                <!-- 基线版本 -->
                <tr>
                  <td style="text-align:center">交易类型</td>
                  <td style="padding-left:45px;"   v-if="transGoodsEntityList[0]">
                    {{transGoodsEntityList[0].circulation == "transfer"? "转让": transGoodsEntityList[0].circulation == "rent"? "出租": transGoodsEntityList[0].circulation == "mortgage"? "抵押": ""}}
                  </td>
                  <td style="text-align:center">交易方式</td>
                  <td style="padding-left:45px;">{{transTargetEntityMap.transTypeName}}</td>
                </tr>
                <tr>
                  <td style="text-align:center">起始价（万元）</td>
                  <td style="padding-left:45px;">{{transTargetEntityMap.beginPrice}}</td>
                  <td style="text-align:center">成交价（万元）</td>
                  <td style="padding-left:45px;">{{transTargetEntityMap.transPrice}}</td>
                </tr>
                <tr>
                  <td style="text-align:center">成交时间</td>
                  <td style="padding-left:45px;">{{transTargetEntityMap.endTransTime}}</td>
                  <td style="text-align:center"   v-if="transGoodsEntityList[0]">
                    {{transGoodsEntityList[0].circulation == "transfer"? "转让方": transGoodsEntityList[0].circulation == "rent"? "出租方":  ""}}
                  </td>
                  <td style="padding-left:45px;">{{transTargetEntityMap.ownerShipName}}</td>
                </tr>
                <tr>
                  <td style="text-align:center" v-if="transGoodsEntityList[0]">
                    {{transGoodsEntityList[0].circulation == "transfer"? "受让人": transGoodsEntityList[0].circulation == "rent"? "承租方":  ""}}
                  </td>
                  <td style="padding-left:45px;">{{transTargetEntityMap.winnerId}}</td>
                  <td style="text-align:center"></td>
                  <td style="padding-left:45px;"></td>
                </tr>
            </table>
            <div style="padding:25px 20px 0">
              <table class="otherTable" width="100%" cellpadding="0" cellspacing="0" style="text-align:left">
                <tr style="background:#f6f9fe;line-height:50px;font-size:12px;font-weight: bold;color:#333;">
                  <td>地块编号</td>
                  <td>地块位置</td>
                  <td>使用权面积（m²）</td>
                  <td>土地用途</td>
                  <td  v-if="transGoodsEntityList[0]">
                     {{transGoodsEntityList[0].circulation == "transfer"? "剩余使用年限": transGoodsEntityList[0].circulation == "rent"? "出租年限": transGoodsEntityList[0].circulation == "mortgage"? "抵押年限": ""}}
                  </td>
                  <!-- <td>转让方</td> -->
                </tr>
                <tr class="td1" v-for="(item,index) in transGoodsEntityList" :key="index">
                  <td style="color:#4571d5">{{item.goodsNo}}</td>
                  <td>{{item.location}}</td>
                  <td>{{item.area}}</td>
                  <td>{{item.firstClassUseName}}-{{item.secondClassUseName}}</td>
                  <td>{{item.years}}</td>
                  <!-- <td>{{transTargetEntityMap.ownerShipName}}</td> -->
                </tr>
              </table>
            </div>
            
          </div>
        </div>
         <div style="height:1px;background:#e0dede;width:1120px;margin:25px auto 0;"></div>
        <div class="landshow_main" style="background:#fff">
          <epf-switchTitle
            titles_h="联系方式"
            padding="0px"
            background="#fff"
            height="58px"
            ref="one"
            :shutOff="false"
            class="scroll-item"
          ></epf-switchTitle>
          <div class="landshow_main_cont">
            <div class="applyBidde_text">
              <p>联系单位：<span>{{userInfoVo.orgName}}</span></p>
              <p>单位地址：<span>{{userInfoVo.address}}</span></p>
              <p>邮政编码：<span>{{userInfoVo.postalCode}}</span></p>
              <p>联系电话：<span>{{userInfoVo.telPhone}}</span></p>
              <p>联系人：<span>{{userInfoVo.liaison}}</span></p>
              <p>电子邮件：<span>{{userInfoVo.email}}</span></p>
              <p style="text-align:right;">{{userInfoVo.orgName}}</p>
              <p style="text-align:right;">{{insertTime}}</p>
              <p style="clear:both;"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ['targetid'],
  data() {
    return {
      location: [
        { path: "/", name: "首页" },
        { path: "/TradingHall", name: "交易大厅" },
        { path: null, name: "成交结果公示" }
      ],
      transTargetEntityMap: {},
      transGoodsEntityList: [],
      params: {
        //请求参数
        token: "",
        targetId: ""
      },
      insertTime: "",
      userInfoVo: {}
    };
  },
  created() {
    const targetId = ""
    if(this.$route.path == '/TradingDetails'){
      this.params.targetId = this.targetid;
    }else if(this.$route.path  == '/ResultsPublicityDetails'){
      this.params.targetId = this.$route.query.targetId;
    }
    this.params.token = sessionStorage.getItem("token"); //登录session
    this.queryData();
  },
  methods: {
    format(shijianchuo) {
      if (shijianchuo) {
        var tt = new Date(parseInt(shijianchuo) * 1000).toLocaleString();
        return tt;
      }
    },
    queryData() {
      this.$axios.get(
        "/epf-landweb/landweb/transtarget/getPublicity",
        this.params,
        res => {
          if (res.code == "0") {
            this.insertTime = res.publicity.insertTime;
            this.userInfoVo = res.publicity.orgInfo;
            this.transGoodsEntityList = res.publicity.transGoodsEntityList;//地块信息
            this.transTargetEntityMap = res.publicity.transTargetEntityMap;//标的及其他信息
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.tradePublicDetail_warp {
  @include size(1200px, auto);
  margin: 0 auto;
  padding:0 0 30px;
  .tradePublicDetail_cont{
    @include size(100%,auto);
    box-sizing: border-box;
    padding: 50px 0 0;
    background: #fff;
    color:#666666;
    .landshow_main_listtop_con {
      box-sizing: border-box;
      .landshow_text{
        @include size(100%,auto);
        position: relative;
        color:#bebebf;
        font-size: 14px;
        line-height: 30px;
        .landshowtext_header{
          text-align: center;
          color: #333333;
          font-size: 20px;
          font-weight: 500;
          line-height: 40px;
        }
        .landshowtext_subheader{
          text-align: center;
          color: #666666;
          font-size: 12px;
          line-height: 30px;
        }
      }
      .landshow_text_dow{
        line-height: 50px;
        color: #666666;
        font-size: 16px;
        padding: 0 24px;
        span{
          color: #4572d5;
          cursor: pointer;
          margin-left: 10px;
        }
      }
      .landshow_textcon{
        box-sizing: border-box;
        padding:0 40px;
        text-indent: 2rem;
        color: #333333;
        margin-bottom:22px;
      }
      p{
        color: #666666;
        font-size: 14px;
        line-height: 30px;
      }
      .landshow_main{
        margin:0px 40px 0;
        background: #f2f5f7;
        border-radius: 3px;
        padding-bottom:17px;
      }
      .landshow_main_cont{
        box-sizing: border-box;
        margin:0 20px;
        background: #fff;
        .applyBidde_text{
          p{
            font-size: 14px;
            line-height: 24px;
            color: #999999;
            margin:10px;
            span{
              color:#666666;
            }
          }
        }
      }
      .landshow_lefttop {
        @include size(100%, 45px);
        box-sizing: border-box;
        margin: 20px auto;
        background: url("../../../../assets/image/icon-bg1.png") no-repeat
          center bottom;
        font-size: 18px;
        color: #333333;
        img {
          margin-top: 4px;
          margin-right: 10px;
        }
      }
      .landshow_bot {
        @include size(100%,auto);
        .download{
          div{
            display: inline;
            span{
              border-radius: 3px;
              border: solid 1px #e0dfdf;
              padding: 7px 16px;
              margin-right: 10px;
              cursor: pointer;
              font-size: 14px;
              color: #4572d5;
            }
          }
        }
        .bidprocess{
          // @include size(1000px,240px);
          margin:0 auto;
          margin-left:50px;
          padding-bottom: 35px;
          // margin-bottom: 40px;
          // background: url('../../../../assets/image/bidprocess.png') no-repeat center center;
        }
      }
      .otherTable{
        tr td{
          padding-left:20px;
        }
        .td1 td{
          padding:20px;
          border-bottom:1px solid #e2e2e2;
        }
        tr:last-of-type{
          border-bottom:none;
        }
      }
      .landshow_table {
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        clear: both;
        td {
          line-height: 25px;
          color: #333333;
          font-size: 14px;
          padding: 10px 15px;
          border-right: 1px solid #f2f2f2;
          border-bottom: 1px solid #e2e2e2;
        }
        .td1 {
          width: 120px;
          background: #f2f5f7;
          color:#666666;
          text-align: right;
        }
        .td2 {
          width: 460px;
          background: #fff;
          text-align: left;
        }
      }
      .landshow_tableTitle{
        position: relative;
        line-height: 60px;
        border: 1px solid #f2f2f2;
        border-bottom: 0px solid #e2e2e2;
        font-size: 14px;
        font-weight: bold;
        color: var(--lightColor);
        padding-left: 40px;
        // margin-top:20px;
        span{
          display: inline-block;
          line-height: 60px;
          border-bottom:1px solid var(--lightColor);
        }
      }
      .landshow_table1{
        border: 1px solid #e2e2e2;
        td {
          border-right: 1px solid #e2e2e2;
          border-bottom: 1px solid #e2e2e2;
          color: #555555;
          line-height: 50px;
          font-size: 14px;
          border-bottom: 1px solid #e2e2e2;
        }
      }
      .landshow_table2{
        border: 1px solid #e2e2e2;
        tr{
          height:50px;
        }
        tr:nth-child(1){
          background-color: #f2f5f7;
          font-weight: bold;
        }
        .trActive{
          td{
            color:var(--lightColor);
            font-weight: bold;
          }
        }
        td {
          border-right: 1px solid #e2e2e2;
          border-bottom: 1px solid #e2e2e2;
          text-align: center;
          color: #555555;
          line-height: 50px;
          font-size: 14px;
          border-bottom: 1px solid #e2e2e2;
        }
      }
      .landshow_explain{
        @include size(100%,auto);
        line-height: 30px;
        margin-top:30px;
        color: #666666;
        &_title{
          display: inline-block;
        }
        &_text{
          @include size(1040px,auto);
          color: #999999;
          display: inline-block;
          vertical-align: top;
        }
      }
      .landshow_leftpic {
        display: flex;
        flex-wrap: wrap;
        div {
          @include size(566px, 383px);
          margin-bottom: 14px;
          margin-right: 14px;
          img {
            width: 100%;
            height: 100%;
          }
          video{
            width: 100%;
            height: 100%;
          }
          &:nth-child(2n){
            margin-right: 0;
          }
        }
      }
      .landshow_leftmap {
        @include size(1150px, 560px);
        .amap-page-container {
          height: 100% !important;
        }
      }
      .landshow_leftrank {
        @include size(847px, auto);
        margin-left: 23px;
              margin-top: 24px;
        table {
          border: solid 1px #f3f3f3;
          tr {
            text-align: center;
            height: 50px;
            border: solid 1px #f3f3f3;
            color: #666666;
          }
        }
        thead {
          tr {
            background-color: #f2f5f7;
            font-size: 14px;
            color: #333333;
            font-weight: bold;
          }
        }
      }
      .block{
        float: right;
        margin:10px auto 20px;

      }
    }
  }
  // .tradePublicDetail_cont {
  //   @include size(100%, auto);
  //   box-sizing: border-box;
  //   padding: 50px 0;
  //   background: #fff;
  //   color: #666666;
  //   .landshow_text {
  //     @include size(100%, auto);
  //     color: #bebebf;
  //     font-size: 14px;
  //     line-height: 30px;
  //     .landshowtext_header {
  //       text-align: center;
  //       color: #333333;
  //       font-size: 20px;
  //       font-weight: bold;
  //       line-height: 50px;
  //     }
  //     .landshowtext_subheader {
  //       text-align: center;
  //       color: #333333;
  //       font-size: 18px;
  //       line-height: 50px;
  //     }
  //   }
  //   .landshow_text_dow {
  //     line-height: 50px;
  //     color: #666666;
  //     font-size: 16px;
  //     padding: 0 24px;
  //     span {
  //       color: #4572d5;
  //       cursor: pointer;
  //       margin-left: 10px;
  //     }
  //   }
  //   .landshow_textcon {
  //     box-sizing: border-box;
  //     padding: 0 24px;
  //     text-indent: 2rem;
  //     color: #666666;
  //   }
  //   p {
  //     color: #666666;
  //     font-size: 14px;
  //     line-height: 30px;
  //   }
  //   .landshow_main_title {
  //     @include size(100%, 80px);
  //     .title {
  //       font-size: 16px;
  //       color: #333333;
  //       font-weight: bold;
  //       line-height: 80px;
  //     }
  //   }
  //   .landshow_main_cont {
  //     box-sizing: border-box;
  //     padding: 0 24px;
  //     .applyBidde_text {
  //       p {
  //         font-size: 14px;
  //         line-height: 24px;
  //         color: #999999;
  //         margin: 10px;
  //         span {
  //           color: #666666;
  //         }
  //       }
  //     }
  //   }
  //   .landshow_lefttop {
  //     @include size(100%, 45px);
  //     box-sizing: border-box;
  //     margin: 20px auto;
  //     background: url("../../../../assets/image/icon-bg1.png") no-repeat center
  //       bottom;
  //     font-size: 18px;
  //     color: #333333;
  //     img {
  //       margin-top: 4px;
  //       margin-right: 10px;
  //     }
  //   }
  //   .landshow_bot {
  //     @include size(100%, auto);
  //     .download {
  //       div {
  //         display: inline;
  //         span {
  //           border-radius: 3px;
  //           border: solid 1px #e0dfdf;
  //           padding: 7px 16px;
  //           margin-right: 10px;
  //           cursor: pointer;
  //           font-size: 14px;
  //           color: #4572d5;
  //         }
  //       }
  //     }
  //     .bidprocess {
  //       margin: 0 auto;
  //       margin-left: 50px;
  //       padding-bottom: 35px;
  //     }
  //   }
  //   .landshow_table {
  //     border-top: 1px solid #f2f2f2;
  //     border-left: 1px solid #f2f2f2;
  //     clear: both;
  //     td {
  //       line-height: 25px;
  //       color: #333333;
  //       font-size: 14px;
  //       padding: 10px 15px;
  //       border-right: 1px solid #f2f2f2;
  //       border-bottom: 1px solid #f2f2f2;
  //       text-align: center;
  //     }
  //     .td1 {
  //       width: 120px;
  //       background: #f2f5f7;
  //       color: #666666;
  //       text-align: right;
  //     }
  //     .td2 {
  //       width: 460px;
  //       background: #fff;
  //       text-align: left;
  //     }
  //   }
  //   .landshow_tableTitle {
  //     line-height: 62px;
  //     border: 1px solid #f2f2f2;
  //     border-bottom: 0px solid #f2f2f2;
  //     text-align: center;
  //     font-size: 14px;
  //     font-weight: bold;
  //     color: #666666;
  //   }
  //   .landshow_table1 {
  //     border: 1px solid #f2f2f2;
  //     td {
  //       border-right: 1px solid #f2f2f2;
  //       border-bottom: 1px solid #f2f2f2;
  //       text-align: center;
  //       color: #555555;
  //       line-height: 50px;
  //       font-size: 14px;
  //       border-bottom: 1px solid #eee;
  //     }
  //   }
  //   .landshow_table2 {
  //     border: 1px solid #f2f2f2;
  //     tr {
  //       height: 50px;
  //     }
  //     tr:nth-child(1) {
  //       background-color: #f2f5f7;
  //       font-weight: bold;
  //     }
  //     .trActive {
  //       td {
  //         color: var(--Colors);
  //         font-weight: bold;
  //       }
  //     }
  //     td {
  //       border-right: 1px solid #f2f2f2;
  //       border-bottom: 1px solid #f2f2f2;
  //       text-align: center;
  //       color: #555555;
  //       line-height: 50px;
  //       font-size: 14px;
  //       border-bottom: 1px solid #eee;
  //     }
  //   }
  //   .landshow_explain {
  //     @include size(100%, auto);
  //     line-height: 30px;
  //     margin-top: 30px;
  //     color: #666666;
  //     &_title {
  //       display: inline-block;
  //     }
  //     &_text {
  //       @include size(1040px, auto);
  //       color: #999999;
  //       display: inline-block;
  //       vertical-align: top;
  //     }
  //   }
  //   .landshow_leftpic {
  //     display: flex;
  //     flex-wrap: wrap;
  //     div {
  //       @include size(566px, 383px);
  //       margin-bottom: 14px;
  //       margin-right: 14px;
  //       img {
  //         width: 100%;
  //         height: 100%;
  //       }
  //       video {
  //         width: 100%;
  //         height: 100%;
  //       }
  //       &:nth-child(2n) {
  //         margin-right: 0;
  //       }
  //     }
  //   }
  //   .landshow_leftmap {
  //     @include size(1150px, 560px);
  //     .amap-page-container {
  //       height: 100% !important;
  //     }
  //   }
  //   .landshow_leftrank {
  //     @include size(847px, auto);
  //     margin-left: 23px;
  //     table {
  //       border: solid 1px #f3f3f3;
  //       tr {
  //         text-align: center;
  //         height: 50px;
  //         border: solid 1px #f3f3f3;
  //         color: #666666;
  //       }
  //     }
  //     thead {
  //       tr {
  //         background-color: #f2f5f7;
  //         font-size: 14px;
  //         color: #333333;
  //         font-weight: bold;
  //       }
  //     }
  //   }
  //   .block {
  //     float: right;
  //     margin: 10px auto 20px;
  //   }
  // }
}
</style>
