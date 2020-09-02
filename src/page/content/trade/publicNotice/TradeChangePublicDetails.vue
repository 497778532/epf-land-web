<template>
  <div class="notice_warp win1200">
    <epf-lePage :location="location"></epf-lePage>
    <div style="background:#fff;">
      <div class="tab">
        <span :class="activeTitle == 'first' ? 'activeTitle' : ''" @click="activeTitle = 'first'" >变更公告详情</span>
        <span :class="activeTitle == 'second' ? 'activeTitle' : ''" @click="activeTitle = 'second'" >标的详情</span>
      </div>
      <!-- 公告信息 -->
      <div class="noticeDetail" v-show="activeTitle == 'first'">
        <div class="textBox">
          <p class="title" align="center">{{ transNoticeEntity.title }}</p>
          <p class="vice" align="center">{{ transNoticeEntity.noticeNo }}</p>
          <p
            align="center"
            style="border-bottom: solid 1px #e0dede;line-height:50px;"
          >
            <span v-if="transNoticeEntity.noticeType == 'common_notice'"
              >普通公告</span
            >
            <span v-if="transNoticeEntity.noticeType == 'change_notice'"
              >变更公告</span
            >&nbsp;&nbsp; 公告日期：{{
              transNoticeEntity.noticeTime
                ? /\d{4}-\d{1,2}-\d{1,2}/g.exec(transNoticeEntity.noticeTime)[0]
                : "0000-00-00"
            }}
            <span style="float:right;">浏览次数：{{ count }}次</span>
          </p>
          <p class="htmlBox" style="color: red" v-html="transNoticeEntity.noticeContent"></p>
        </div>
        <!-- 相关公告--TransNoticeChildren -->
        <epf-switchTitle titles_h="相关公告" :shutOff="false" background="#fff">
          <ul class="public" v-if="TransNoticeChildren">
            <li
              v-for="(item, index) in TransNoticeChildren"
              :key="index"
              @click="policedetail(item.id)"
            >
              <span v-if="item.noticeType == 'common_notice'" class="noticeType"
                >普通</span
              >
              <span v-if="item.noticeType == 'change_notice'" class="noticeType"
                >变更</span
              >
              {{ item.noticeNo }}<span class="time">{{ item.noticeTime }}</span>
            </li>
          </ul>
          <div v-else>暂无</div>
        </epf-switchTitle>
      </div>
      <div class="noticeDetail" v-show="activeTitle == 'second'">
        <!-- 标的信息 -->
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="(item, index) in transTargetEntityList"
            :key="index"
            @click="ListClick(index)"
            :label="item.targetNo"
            :name="item.targetNo"
          ></el-tab-pane>
        </el-tabs>
        <!-- 每个标的下不同信息 -->
        <epf-switchTitle titles_h="标的信息" :shutOff="false" background="#fff">
          <ul class="notictCon">
            <li style="width:160px;">标的编号</li>
            <li style="width:998px;">
              {{ transTargetEntityListData.targetNo }}
              <span
                v-if="transTargetEntityListData.status == 'trans_status-001'"
                >录件</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-002'"
                >未公告</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-003'"
                >已公告</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-004'"
                >交易中</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-005'"
                >成交待审核</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-006'"
                >未成交(流拍)</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-007'"
                >已成交</span
              >
              <span
                v-if="transTargetEntityListData.status == 'trans_status-008'"
                >已公示</span
              >
            </li>
            <li>流转方式</li>
            <!-- {{transTargetEntityListData}} -->
            <li>
              {{
                transTargetEntityListData.circulation == "transfer"
                  ? "转让"
                  : transTargetEntityListData.circulation == "rent"
                  ? "出租"
                  : transTargetEntityListData.circulation == "mortgage"
                  ? "抵押"
                  : ""
              }}
            </li>
            <li>交易方式</li>
            <li>{{ transTargetEntityListData.transTypeName }}</li>
            <li>起始价</li>
            <li>
              {{
                transTargetEntityListData.beginPrice
                  ? transTargetEntityListData.beginPrice + "万元"
                  : ""
              }}
            </li>
            <li>竞价增价幅度</li>
            <li>
              {{
                transTargetEntityListData.priceStep
                  ? transTargetEntityListData.priceStep + "万元"
                  : ""
              }}
            </li>
            <li>竞买保证金</li>
            <li>{{ transTargetEntityListData.amount }}</li>
            <li>公告开始时间</li>
            <li >{{ transTargetEntityListData.beginNoticeTime }}</li>

            <li v-if="transTargetEntityListData.beginFocusTime">
              挂牌起始时间
            </li>
            <li v-if="transTargetEntityListData.beginFocusTime" >
              {{ transTargetEntityListData.beginFocusTime }}
            </li>
            <li v-if="transTargetEntityListData.beginFocusTime">
              挂牌截止时间
            </li>
            <li v-if="transTargetEntityListData.beginFocusTime" >
              {{ transTargetEntityListData.endFocusTime }}
            </li>

            <li v-if="transTargetEntityListData.beginFocusTime">
              限时竞价开始时间
            </li>
            <li v-else>拍卖开始时间</li>
            <li >{{ transTargetEntityListData.beginLimitTime }}</li>

            <li>保证金缴纳截止时间</li>
            <li >{{ transTargetEntityListData.endEarnestTime }}</li>

            <li>竞买申请开始时间</li>
            <li >{{ transTargetEntityListData.beginApplyTime }}</li>

          </ul>
        </epf-switchTitle>
        <!-- 标的的土地信息 -->
        <epf-switchTitle titles_h="地块信息" :shutOff="false" background="#fff">
          <div v-if="transTargetEntityListData.publicity">
            <div
              class="landInfo"
              v-for="(item, index) in transTargetEntityListData.publicity
                .transGoodsEntityList"
              :key="index"
            >
              <div class="title">地块编号:{{ item.goodsNo }}</div>
              <ul class="textul">
                <li>
                  行政区域：<span
                    >{{ item.cantonProvinceName }}{{ item.cantonCityName
                    }}{{ item.cantonAreaName }}</span
                  >
                </li>
                <li>
                  土地权属单位：<span>{{ item.ownerShipName }}</span>
                </li>
                <li>
                  土地位置：<span>{{ item.location }}</span>
                </li>
              </ul>
              <ul class="textul">
                <li>
                  使用权面积（m2）：<span>{{ item.area }}</span>
                </li>
                <li>
                  土地用途：<span
                    >{{ item.firstClassUseName }}-{{
                      item.secondClassUseName
                    }}</span
                  >
                </li>
                <li>
                  {{
                    item.circulation == "transfer"
                      ? "剩余使用年限"
                      : item.circulation == "rent"
                      ? "出租年限"
                      : item.circulation == "mortgage"
                      ? "抵押年限"
                      : ""
                  }}（年）：<span>{{ item.years }}</span>
                </li>
              </ul>
            </div>
          </div>
        </epf-switchTitle>
        <epf-switchTitle
          titles_h="竞买资格信息"
          :shutOff="false"
          background="#fff"
        >
          <div
            class="info"
            style="border:1px solid #e2e2e2;background: #f6f9ff;padding: 12px;"
            v-html="transTargetEntityListData.transCondition"
          ></div>
        </epf-switchTitle>
      </div>

      <div v-show="false">{{ compublicRegulateData }}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      count: 1,
      activeTitle: "first",
      location: [
        { path: "/", name: "首页" },
        { path: "/TradingHall", name: "交易大厅" },
        { path: null, name: "变更公告详情" }
      ],
      baseUrl: "",
      transNoticeEntity: {},
      transTargetEntityListData: {},
      transTargetEntityList: [
        "DAZ2018002，DAZ2018001",
        "DAZ2018002，DAZ2018001"
      ],
      spanActiveKey: 0,
      tableNmae: ["序号", "文件名", "文件", "操作"],
      belong: "",
      areaCode: "",
      fileType: ["rar", "zip", "doc", "docx", "pdf", "jpg"],
      landType: "NOTICE",
      TransNoticeChildren:{},
      TransNoticeChildren1: [
        {
          noticeType: "change_notice",
          noticeNo: "济南市国有建设用地权转让变更公告",
          noticeTime: "2020-02-02 18:00:00"
        },
        {
          noticeType: "change_notice",
          noticeNo: "济南市国有建设用地权转让变更公告",
          noticeTime: "2020-02-02 18:00:00"
        },
        {
          noticeType: "change_notice",
          noticeNo: "济南市国有建设用地权转让变更公告",
          noticeTime: "2020-02-02 18:00:00"
        },
        {
          noticeType: "change_notice",
          noticeNo: "济南市国有建设用地权转让变更公告",
          noticeTime: "2020-02-02 18:00:00"
        }
      ],
      activeName: "DAZ2018002"
    };
  },
  created() {
    // 公告详情/变更公告详情接口
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.getNoticeDetails(this.$route.query.noticeId);
    this.getChangeNoticeList(this.$route.query.noticeId);
  },
  computed: {
    ...mapState("publicNotice", ["noticeDetails", "changeNoticeList"]),
    ...mapState("TradingHall", ["transGoodsDetails"]),
    compublicRegulateData() {
      if (
        this.noticeDetails &&
        this.noticeDetails !== null &&
        this.noticeDetails.map &&
        this.noticeDetails.map !== null
      ) {
        this.count = this.noticeDetails.map.count;//浏览次数
        this.TransNoticeChildren = this.noticeDetails.map.TransNoticeChildren;//相关公告对象
console.log(this.noticeDetails)
        this.transNoticeEntity = this.noticeDetails.map.transNoticeEntity;
       console.log(this.transNoticeEntity)
        this.transTargetEntityList = this.noticeDetails.map.transTargetEntityList;
        this.activeName = this.transTargetEntityList[0].targetNo;
        this.transTargetEntityListData = this.noticeDetails.map.transTargetEntityList[0];
        // this.traPublicityData.push(this.noticeDetails.map.transTargetEntityList[0].publicity.transTargetEntityMap) ;
        //通过第一个标的ID去查询的标的绑定地块的区域的编码
        this.$axios.get(
          `/epf-landweb/landweb/transtarget/getTransTargetById?targetId=${this.transTargetEntityListData.id}`,
          {},
          res => {
            //先清空belong
            this.belong = "";
            let _this = this;
            //获取地块的信息
            let transGoodsJson = res.map.transGoodsList[0];
            //赋值地区字符
            let areaCode = "";
            //根据条件拼接
            if (transGoodsJson.cantonArea) {
              areaCode = areaCode + transGoodsJson.cantonArea + ",";
            }
            if (transGoodsJson.cantonCity) {
              areaCode = areaCode + transGoodsJson.cantonCity + ",";
            }
            if (transGoodsJson.cantonProvince) {
              areaCode = areaCode + transGoodsJson.cantonProvince + ",";
            }
            _this.areaCode = areaCode;

            //设置附件的ID
            _this.belong = this.transNoticeEntity.enclosureId;
          }
        );

        // 地块信息接口
        this.getTransGoodsDetails({
          targetId: this.noticeDetails.map.transTargetEntityList[0].id
        });
        return this.noticeDetails.map.transTargetEntityList[0];
      }
    }
  },
  methods: {
    ...mapActions("publicNotice", ["getNoticeDetails", "getChangeNoticeList"]),
    ...mapActions("TradingHall", ["getTransGoodsDetails"]),
    ListClick(index) {
      this.spanActiveKey = index;
      this.transTargetEntityListData = this.transTargetEntityList[index];
      this.getTransGoodsDetails({
        targetId: this.noticeDetails.map.transTargetEntityList[index].id
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
.notice_warp {
  .noticeDetail {
    box-sizing: border-box;
    @include size(100%, auto);
    box-sizing: border-box;
    padding: 50px 40px 20px 40px;
    background: #fff;
    color: #666666;
    .textBox {
      @include size(100%, auto);
      color: #333333;
      font-size: 14px;
      line-height: 30px;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .vice {
        font-size: 18px;
        line-height: 50px;
      }
      .htmlBox {
        box-sizing: border-box;
        padding: 24px;
        text-indent: 2rem;
        color: #333333;
      }
      p {
        color: #666666;
        font-size: 14px;
        line-height: 30px;
      }
    }
    .tradePublic_main_cont {
      box-sizing: border-box;
      padding: 0 24px;
      li {
        width: 100%;
        height: auto;
        line-height: 54px;
        font-size: 14px;
        color: #666666;
        cursor: pointer;
        border-bottom: 1px solid #f3f3f3;
        .time {
          float: right;
        }
      }
      li:hover {
        color: #517cd2;
        cursor: pointer;
      }
    }
  }
  .notictCon {
    width: 1080px;
    margin-left: 20px;
    .target {
      line-height: 45px;
      div {
        display: inline-block;
        padding: 0 30px;
        cursor: pointer;
        span {
          padding: 15px;
        }
        .spanActive {
          border-bottom: 2px solid #ffb82f;
          color: #ffb82f;
          font-weight: bold;
        }
      }
    }
    ul {
      @include size(100%, 100%);
      border: 1px solid rgb(243, 243, 243);
      li {
        height: 48px;
        line-height: 48px;
        box-sizing: border-box;
        padding-right: 40px;
        width: 330px;
        border-bottom: 1px solid rgb(243, 243, 243);
        border-left: 1px solid rgb(243, 243, 243);
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        &:nth-child(2n + 1) {
          text-align: right;
          width: 200px;
        }
        .title {
          line-height: 49px;
        }
        p {
          text-align: left;
        }
      }
    }
    table {
      margin: 22px auto;
      tr {
        @include size(100%, 60px);
        border-bottom: 1px solid #f3f3f3;
        &:nth-child(1) {
          background: #f6f9fe;
          height: 50px;
          td {
            font-weight: bold;
          }
        }
        td {
          text-align: center;
          color: #333333;
          font-size: 14px;
          span {
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .tradePublic_main {
    @include size(1200px, auto);
    margin-bottom: 25px;
    background: #fff;
    &_cont {
      box-sizing: border-box;
      @include size(1200px, auto);
      padding: 0 22px;
      margin: 0 auto;
      border-bottom: solid 1px #f3f3f3;
      p {
        margin: 18px 0 18px 0px;
        color: #999999;
      }
      .enclosure {
        p {
          color: #517cd2;
          cursor: pointer;
          margin: 0;
        }
      }
    }
  }
}
.noActive {
  color: var(--priceColor);
}
.notice_warp {
  .noticeType {
    color: var(--lightColor);
    font-weight: bold;
    font-size: 12px;
    background: #f2f5f7;
    padding: 5px 12px;
    margin-right: 15px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .tab {
    border-bottom: 1px solid #ebebeb;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    color: #999;
    font-size: 16px;
    span {
      padding: 15px 0px;
      margin: 0 20px;
      cursor: pointer;
    }
    .activeTitle {
      border-bottom: 4px solid var(--lightColor);
      color: var(--lightColor);
    }
  }
  .noticeDetail {
    box-sizing: border-box;
    @include size(100%, auto);
    box-sizing: border-box;
    padding: 0px 20px 20px 20px;
    background: #fff;
    color: #666666;
    margin-top: 30px;
    .textBox {
      @include size(100%, auto);
      font-size: 14px;
      line-height: 30px;
      .title {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        line-height: 50px;
      }
      .vice {
        font-size: 18px;
        line-height: 50px;
      }
      .htmlBox {
        padding: 40px 0;
        text-indent: 2rem;
        color: #333333;
        border-bottom: solid 1px #e0dede;
      }
    }
    p {
      color: #666666;
      font-size: 14px;
      line-height: 30px;
    }
    .notictCon {
      width: 100%;
      border: 1px solid rgb(243, 243, 243);
      display: table;
      li {
        height: 48px;
        line-height: 48px;
        box-sizing: border-box;
        width: 418px;
        border-bottom: 1px solid rgb(243, 243, 243);
        border-left: 1px solid rgb(243, 243, 243);
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        padding: 0 16px;
        &:nth-child(2n + 1) {
          text-align: right;
          width: 160px;
          background: rgb(246, 249, 254);
        }
        span {
          padding: 0px 20px;
          height: 34px;
          line-height: 34px;
          color: #93b52d;
          font-size: 14px;
          vertical-align: middle;
          font-weight: bold;
          margin-top: 7px;
          background: rgb(231, 244, 189);
          border-top-right-radius: 9px;
          border-bottom-right-radius: 9px;
          float: right;
        }
      }
    }
  }
  .landInfo {
    .title {
      background: #f6f9fe;
      font-size: 18px;
      color: #666666;
      font-weight: bold;
      line-height: 50px;
      padding: 0 20px;
      border: 1px solid #e2e2e2;
    }
    .textul {
      width: 100%;
      color: #999999;
      border: 1px solid #e2e2e2;
      display: flex;
      list-style: disc inside;
      li {
        width: 33%;
        padding: 20px;
        display: inline-block;
        span {
          color: #333333;
        }
      }
    }
  }
  .public {
    li {
      @include size(100%, auto);
      line-height: 60px;
      font-size: 16px;
      color: #666666;
      cursor: pointer;
      border-bottom: 1px solid #f3f3f3;
      .time {
        float: right;
      }
    }
    li:hover {
      color: var(--lightColor);
    }
  }
}
</style>
<style>
.el-table thead {
  color: #333333;
  font-weight: bold;
}
.landB .el-table th.is-leaf {
  background: #f6f9fe;
}
</style>
