// 路由模块
import Vue from "vue";
import Router from "vue-router";
//主体页面
import page from '../page/index'


// 发布地源
import PublishLandHome from "@/page/content/home/pop/publishLand/PublishLandHome";
import ApplicantInfo from "@/page/content/home/pop/publishLand/ApplicantInfo";
import AttachmentInfoList from "@/page/content/home/pop/publishLand/AttachmentInfoList";
// 发布需求
import demandForm from "@/page/content/home/pop/publishDemand/demandForm";

// 合同网签备案---线上
const onlineSign = name => () =>
  import("@/page/content/home/pop/contractSignRecord/onlineSign/" + name);

// 线上详情页---合同审核
import transferSignatureDetailsExamine from "@/page/content/home/pop/contractSignRecord/onlineSign/signatureDetails/transferSignatureDetailsExamine";
import rentalSignatureDetailsExamine from "@/page/content/home/pop/contractSignRecord/onlineSign/signatureDetails/rentalSignatureDetailsExamine";
import mortgageSignatureDetailsExamine from "@/page/content/home/pop/contractSignRecord/onlineSign/signatureDetails/mortgageSignatureDetailsExamine";
// 线上详情页---合同鉴证
import signatureDetailsRecord from "@/page/content/home/pop/contractSignRecord/onlineSign/signatureDetails/signatureDetailsRecord";

// 委托交易
import EntrustTransHome from "@/page/content/home/pop/entrustTrans/EntrustTransHome";
import EntrustApplicantInfo from "@/page/content/home/pop/entrustTrans/EntrustApplicantInfo";
import EntrustAttachmentInfoList from "@/page/content/home/pop/entrustTrans/EntrustAttachmentInfoList";

//委托交易详情
import EntrustDetail from "@/page/content/home/detail/entrustDetails.vue";
// 土地需求搜索
import demandSearch from "@/page/content/home/detail/demandSearch";
// 地块搜索
import seniorSearch from "@/page/content/home/detail/seniorSearch";
// 供给地块详情页
import supplyDetails from "@/page/content/home/detail/supplyDetails";
// 需求地块详情页
import demandDetails from "@/page/content/home/detail/demandDetails";
// 地图找地
import mapFindPlace from "@/page/content/map/index";
// 城市列表
import CityList from "@/page/content/home/detail/CityList";
// 比价详情
import bettalPriceDetails from "@/page/content/home/detail/bettalPriceDetails";


// 交易大厅
import TradingHallAgreeTrans from "@/page/content/trade/detail/TradingHallAgreeTrans";
import TradingHallListTrans from "@/page/content/trade/detail/TradingHallListTrans";
// 申请竞买
const competeBuy = name => () =>
  import("@/page/content/trade/competeBuy/" + name);
const IndependBidding = name => () =>
  import("@/page/content/trade/competeBuy/IndependBidding/" + name);


// 交易大厅详情页
import AgreeTransacteDetails from "@/page/content/trade/detail/AgreeTransacteDetails";
import ResultsPublicityDetails from "@/page/content/trade/detail/ResultsPublicityDetails"
import TradePublicDetails from "@/page/content/trade/detail/TradePublicDetails"
import TradingDetails from "@/page/content/trade/detail/TradingDetails";

const publicNotice = name => () =>
  import("@/page/content/trade/publicNotice/" + name);



/* 个人中心子路由 */
const personalCenter = name => () =>
  import("@/page/othen/verify/" + name);

import notice from "@/page/content/trade/competeBuy/notice.vue";
import fundTrusteeship from "@/page/content/trade/competeBuy/fundTrusteeship.vue";
import attestation from "@/page/othen/verify/attestate.vue";
import shiming from "./shiming.vue";
import { resolve } from "path";

Vue.use(Router);

function content(url) { //主要页面
  return () => import(`../page/content/${url}.vue`);
}
var router = new Router({
  routes: [
    {
      path: "/shiming",
      component: shiming
    },
    // 首页
    {
      path: "/",
      component: page,
      meta: {
        isLogin: false
      },
      children: [
        {
          path: "",
          component: content('home/index'),
          name: "Homepage",
          meta: {
            isLogin: false,
            keepAlive: true
          }
        },
        // 帮助中心
        {
          path: "/HelpCenter",
          component: content('help/index'),
          name: "HelpCenter",
          meta: {
            keepAlive: true
          }
        },
        // 个人中心
        {
          path: "/PersonalCenter",
          component: content("user/index"),
          name: "PersonalCenter",
          meta: {
            isLogin: true,
            keepAlive: true
          },
          children: [
            {
              path: "myProvide",
              component: content("user/pages/myProvide"),
              name: "myProvide",
              meta: {
                isLogin: true,
                keepAlive: false
              }
            },
            {
              path: "provideMate",
              component: content("user/pages/provideMate"),
              name: "provideMate",
              meta: {
                isLogin: true
              }
            },
            {
              path: "demandRegister",
              component: content("user/pages/demandRegister"),
              name: "demandRegister",
              meta: {
                isLogin: true
              }
            },
            {
              path: "demandMate",
              component: content("user/pages/demandMate"),
              name: "demandMate",
              meta: {
                isLogin: true
              }
            },
            {
              path: "entrustDeal",
              component: content("user/pages/entrustDeal"),
              name: "entrustDeal",
              meta: {
                isLogin: true
              }
            },
            {
              path: "protocolDeal",
              component: personalCenter("protocolDeal"),
              name: "protocolDeal",
              meta: {
                isLogin: true
              }
            },
            {
              path: "registerContract",
              component: content("user/pages/registerContract"),
              name: "registerContract",
              meta: {
                isLogin: true
              }
            },
            {
              path: "safetySet",
              component: content("user/pages/safetySet"),
              name: "safetySet",
              meta: {
                isLogin: true
              }
            },
            {
              path: "myCollect",
              component: content("user/pages/myCollect"),
              name: "myCollect",
              meta: {
                isLogin: true
              }
            },
            {
              path: "myMessage",
              component: content("user/pages/myMessage"),
              name: "myMessage",
              meta: {
                isLogin: true
              }
            },
            {
              path: "reserve",
              component:content("user/pages/reserve"),
              name: "reserve",
              meta: {
                isLogin: true
              }
            },
            {
              path: "purposeBidding",
              component: content("user/pages/purposeBidding"),
              name: "purposeBidding",
              meta: {
                isLogin: true
              }
            },
            {
              path: "intentionPrice",
              component: content("user/pages/intentionPrice"),
              name: "intentionPrice",
              meta: {
                isLogin: true
              }
            },
            {
              path: "orderLand",
              component: content("user/pages/orderLand"),
              name: "orderLand",
              meta: {
                isLogin: true
              }
            },
            {
              path: "myOrder",
              component: content("user/pages/myOrder"),
              name: "myOrder",
              meta: {
                isLogin: true
              }
            },
            {
              path: "payInfo",
              component: content("user/pages/payInfo"),
              name: "payInfo",
              meta: {
                isLogin: true
              }
            },
            {
              path: "auctionRecord",
              component: content("user/pages/auctionRecord"),
              name: "auctionRecord",
              meta: {
                isLogin: true
              }
            },
            {
              path: "mydeposit",
              component: content("user/pages/mydeposit"),
              name: "mydeposit",
              meta: {
                isLogin: true
              }
            },
            {
              path: "performanceBond",
              component: content("user/pages/performanceBond"),
              name: "performanceBond",
              meta: {
                isLogin: true
              }
            },
          ]
        },
        // 政策法规
        {
          path: "/PoliciesRegulate",
          component: content("rule/index"),
          name: "PoliciesRegulate",
          meta: {
            keepAlive: true
          }
        },
        // 政策法规详情
        {
          path: "/ruleDetails",
          component: content("rule/detail/ruleDetails"),
          name: "ruleDetails",
          meta: {
            keepAlive: true
          }
        },
        // 发布地源
        {
          path: "/PublishLandHome",
          component: PublishLandHome,
          name: "PublishLandHome",
          meta: {
            isLogin: true
          }
        },
        {
          path: "/ApplicantInfo",
          component: ApplicantInfo,
          name: "ApplicantInfo",
          meta: {
            isLogin: true
          }
        },
        {
          path: "/AttachmentInfoList",
          component: AttachmentInfoList,
          name: "AttachmentInfoList",
          meta: {
            isLogin: true
          }
        },
        // 发布需求
        {
          path: "/demandForm",
          component: demandForm,
          name: "demandForm",
          meta: {
            isLogin: true
          }
        },
        // 合同网签备案
        // 线上
        {
          path: "/OnlineContractHome",
          component: onlineSign("OnlineContractHome"),
          meta: {
            isLogin: true
          },
          children: [
            {
              path: "PartybasicInfo",
              component: onlineSign("PartybasicInfo"),
              meta: {
                isLogin: true
              }
            },
            {
              path: "LandbasicInfo",
              component: onlineSign("LandbasicInfo"),
              meta: {
                isLogin: true
              }
            },
            {
              path: "Savedraft",
              component: onlineSign("Savedraft"),
              meta: {
                isLogin: true
              }
            },
            {
              path: "Savesuccess",
              component: onlineSign("Savesuccess"),
              meta: {
                isLogin: true
              }
            }
          ]
        },
        // 线上详情---合同审核
        {
          path: "/transferSignatureDetailsExamine",
          component: transferSignatureDetailsExamine,
          meta: {
            isLogin: true
          }
        },
        {
          path: "/rentalSignatureDetailsExamine",
          component: rentalSignatureDetailsExamine,
          meta: {
            isLogin: true
          }
        },
        {
          path: "/mortgageSignatureDetailsExamine",
          component: mortgageSignatureDetailsExamine,
          meta: {
            isLogin: true
          }
        },
        // 线上详情---合同鉴证
        {
          path: "/signatureDetailsRecord",
          component: signatureDetailsRecord,
          meta: {
            isLogin: true
          }
        },
        // 委托交易
        {
          path: "/EntrustTransHome",
          component: EntrustTransHome,
          name: "EntrustTransHome",
          meta: {
            isLogin: true
          }
        },
        {
          path: "/EntrustApplicantInfo",
          component: EntrustApplicantInfo,
          name: "EntrustApplicantInfo",
          meta: {
            isLogin: true
          }
        },
        
        {
          path: "/EntrustAttachmentInfoList",
          component: EntrustAttachmentInfoList,
          name: "EntrustAttachmentInfoList",
          meta: {
            isLogin: true
          }
        },
        {
          path: "/EntrustDetail",
          component: EntrustDetail,
          name: "EntrustDetail",
          meta: {
            isLogin: true
          }
        },

        // 土地需求搜索
        {
          path: "/demandSearch",
          component: demandSearch,
          name: "Homepage",
          meta: {
            isLogin: false
          }
        },
        // 地块高级搜索
        {
          path: "/seniorSearch",
          component: seniorSearch,
          name: "Homepage",
          meta: {
            isLogin: false
          }
        },
        // 供给地块详情页
        {
          path: "/supplyDetails",
          component: supplyDetails,
          name: "Homepage",
          meta: {
            isLogin: false
          }
        },
        // 需求地块详情页
        {
          path: "/demandDetails",
          component: demandDetails,
          name: "Homepage",
          meta: {
            isLogin: false
          }
        },
        // 城市列表
        {
          path: "/CityList",
          component: CityList,
          meta: {
            isLogin: false
          }
        },
        {
          path: "/bettalPriceDetails",
          component: bettalPriceDetails,
          meta: {
            isLogin: false
          }
        },

        //交易大厅
        {
          path: "/TradingHall",
          component: content("trade/index"),
          name: "TradingHall",
          meta: {
            isLogin: false,
            keepAlive: true
          }
        },
        {
          path: "/TradingHallAgreeTrans",
          component: TradingHallAgreeTrans
        },
        {
          path: "/TradingHallListTrans",
          component: TradingHallListTrans
        },
        {
          path: "/PublicNoticeHome",
          component: publicNotice("PublicNoticeHome"),
          children: [
            // 交易公告
            {
              path: "TradePublic",
              component: publicNotice("TradePublic")
            },
            // 结果公示
            {
              path: "ResultsPublicity",
              component: publicNotice("ResultsPublicity")
            }
          ]
        },
        {
          path: "TradePublicDetails",
          component: TradePublicDetails,
          name: "TradingHall"
        },
        {
          path: "ResultsPublicityDetails",
          component: ResultsPublicityDetails,
          name: "TradingHall"
        },
        // 申请竞买

        {
          path: "/applyBiddingBook",
          component: competeBuy("applyBiddingBook"),
          name: "TradingHall"
        },
        {
          path: "/applyBidding",
          component: competeBuy("applyBidding"),
          name: "TradingHall"
        },
        {
          path: "/applyBiddingSavedraft",
          component: competeBuy("Savedraft"),
          name: "TradingHall"
        },
        {
          path: "/applyBiddingSavesuccess",
          component: competeBuy("Savesuccess"),
          name: "TradingHall"
        },

        {
          path: "/IndependBiddingDetail",
          component: IndependBidding("IndependBiddingDetail"),
          name: "TradingHall"
        },
        {
          path: "/JointBiddingDetail",
          component: IndependBidding("JointBiddingDetail"),
          name: "TradingHall"
        },
        {
          path: "/JointBiddingAgree",
          component: IndependBidding("JointBiddingAgree"),
          name: "TradingHall"
        },
        {
          path: "/JointBiddingRefuse",
          component: IndependBidding("JointBiddingRefuse"),
          name: "TradingHall"
        },
        {
          path: "/notice",
          component: notice,
          name: "TradingHall"
        },
        {
          path: "/fundTrusteeship",
          component: fundTrusteeship,
          name: "TradingHall"
        },

        {
          path: "/attestation",
          component: attestation,
          name: "attestation"
        },

        // 集中竞价
        {
          path: "/centerPrice",
          component: competeBuy("centerPrice"),
          name: "TradingHall"
        },
        {
          path: "/TradingDetails",
          component: TradingDetails,
          name: "TradingHall"
        },
        // 自行交易详情
        {
          path: "/AgreeTransacteDetails",
          name: "AgreeTransacteDetails",
          component: AgreeTransacteDetails,
          name: "TradingHall"
        },
        // 变更公告详情
        {
          path: "/TradeChangePublicDetails",
          name: "TradeChangePublicDetails",
          component: publicNotice("TradeChangePublicDetails"),
          name: "TradingHall"
        },
        // 服务中心
        {
          path: "/ServiceCentre",
          component: content("serve/index"),
          name: "ServiceCentre",
          meta: {
            isLogin: false
          }
        },
        {
          path: "/serveSearch",
          component: content("serve/detail/serveSearch"),
          name: "serveSearch"
        },
        // 土地数据
        {
          path: "/landData",
          component: content("land/index"),
          name: "landData",
          meta: {
            isLogin: false
          },
          meta: {
            keepAlive: true
          }
        },
      ]
    },
    // 登录
    {
      path: "/login",
      component: resolve => require(["@/page/othen/login"], resolve),
      meta: {
        isLogin: false
      }
    },
    // 注册
    {
      path: "/register",
      component: resolve => require(["@/page/othen/register"], resolve),
      meta: {
        isLogin: false
      }
    },
    // 注册成功
    {
      path: "/registerSuccess",
      component: resolve => require(["@/page/othen/pages/regSuccess"], resolve),
    },
    // 同意协议
    {
      path: "/RegulatoryDocumentagree",
      component: resolve =>
        require(["@/page/othen/pages/agree"], resolve),
      meta: {
        isLogin: false
      }
    },
    // 忘记密码
    {
      path: "/findPass",
      component: resolve => require(["@/page/othen/findPass/index"], resolve),
      meta: {
        isLogin: false
      },
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: "setpOne",
          component: resolve =>
            require(["@/page/othen/findPass/setpOne"], resolve),
          meta: {
            isLogin: false
          }
        },
        {
          path: "setpSecond",
          component: resolve =>
            require(["@/page/othen/findPass/setpSecond"], resolve),
          meta: {
            isLogin: false
          }
        },
        {
          path: "setpThird",
          component: resolve =>
            require(["@/page/othen/findPass/setpThird"], resolve),
          meta: {
            isLogin: false
          }
        }
      ]
    },
    // 身份认证及手机验证码认证
    {
      path: "/bindPhone",
      component: resolve =>
        require(["@/page/othen/phone/index"], resolve),
      meta: {
        isLogin: false
      },
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: "setpOne",
          component: resolve =>
            require(["@/page/othen/phone/setpOne"], resolve),
          meta: {
            isLogin: false
          }
        },
        {
          path: "setpSecond",
          component: resolve =>
            require(["@/page/othen/phone/setpSecond"], resolve),
          meta: {
            isLogin: false
          }
        },
        {
          path: "setpThird",
          component: resolve =>
            require(["@/page/othen/phone/setpThird"], resolve),
          meta: {
            isLogin: false
          }
        }
      ]
    },
    //地图找地
    {
      path: "/mapFindPlace",
      component: mapFindPlace,
      name: "mapFindPlace",
      meta: {
        isLogin: false
      }
    },
  ],
  linkActiveClass: "is-active"
});
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    let getlogin = sessionStorage.getItem("login");
    if (getlogin) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          next: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  next(false)
  if (
    (from.path == "/PublishLandHome" && to.path != "/ApplicantInfo") ||
    (from.path == "/ApplicantInfo" && to.path != "/AttachmentInfoList" && to.path != "/PublishLandHome") ||
    (from.path == "/AttachmentInfoList" && to.path != "/PersonalCenter/myProvide" && to.path != "/ApplicantInfo") ||
    (from.path == "/demandForm" && to.path != "/PersonalCenter/demandRegister") ||
    (from.path == "/OnlineContractHome/PartybasicInfo" && to.path != "/OnlineContractHome/LandbasicInfo")||
    (from.path == "/EntrustTransHome" && to.path != "/EntrustApplicantInfo") ||
    (from.path == "/EntrustApplicantInfo" && to.path != "/EntrustAttachmentInfoList" && to.path != "/EntrustTransHome") ||
    (from.path == "/EntrustAttachmentInfoList" && to.path != "/PersonalCenter/entrustDeal" && to.path != "/EntrustApplicantInfo") 
  ) {
    setTimeout(() => {
      Vue.prototype
        .$confirm("离开无法保存数据，确定要放弃填写内容?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          next();
        }).catch(() => {
          next(false);
        });
    }, 200)
  } else if (from.path == "/seniorSearch" || from.path == "/demandSearch") {
    const addObj = { //创建返回地理信息对象
      // creditArea:'',
      creditCity: '全国', //城市名
      creditLatitude: 109.59960, //经度
      creditLongitude: 33.50475, //纬度
      // creditProvince:'',
      // creditStreet:''
      cantonProvince: '',
      cantonCity: '',
    }
    sessionStorage.setItem('Address', JSON.stringify(addObj)) //保存
    next();
  } else {
    next();
  }
});
export default router;
