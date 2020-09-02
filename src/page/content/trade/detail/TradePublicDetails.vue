<template>
  <div class="tradeDeta win1200">
    <epf-lePage :location="location"></epf-lePage>
    <div style="background:#fff;">
      <div class="tab">
        <span v-if="transNoticeEntity.noticeType=='change_notice'" :class="activeTitle == 'first' ? 'activeTitle' : ''" @click="activeTitle = 'first'" >变更公告详情</span>
        <span v-else :class="activeTitle == 'first' ? 'activeTitle' : ''" @click="activeTitle = 'first'" >公告详情</span>
        <span :class="activeTitle == 'second' ? 'activeTitle' : ''" @click="activeTitle = 'second'" >标的详情</span>
      </div>
      <!-- 公告信息 -->
      <div class="noticeDetail" v-show="activeTitle == 'first'">
        <div class="textBox">
          <p class="title" align="center">{{transNoticeEntity.noticeTitle}}</p>
          <p class="vice" align="center">{{transNoticeEntity.noticeNo}}</p>
          <p align="center" style="border-bottom: solid 1px #e0dede;line-height:50px;">
            <span v-if="transNoticeEntity.noticeType=='common_notice'">普通公告</span>
            <span v-if="transNoticeEntity.noticeType=='change_notice'">变更公告</span>&nbsp;&nbsp;
            公告日期：
            {{transNoticeEntity.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(transNoticeEntity.noticeTime)[0]:''}}
            <!-- 浏览次数------count -->
            <span style="float:right;">浏览次数：{{count}}次</span>
          </p>
          <p class="htmlBox" v-html="transNoticeEntity.noticeContent?transNoticeEntity.noticeContent:'暂无'"></p>
        </div>
        <!-- 相关公告--TransNoticeChildren -->
        <epf-switchTitle v-show="TransNoticeChildren" titles_h="相关公告" :shutOff="false" background="#fff">
          <ul class="public" v-if="TransNoticeChildren">
            <li v-for="(item, index) in TransNoticeChildren" :key="index" @click="policedetail(item)">
              <span v-if="item.noticeType=='common_notice'" class="noticeType" style="color:#4571d5;background:#f2f5f7;">普通</span>
              <span v-if="item.noticeType=='change_notice'" class="noticeType" style="color:#ff6825;background:#fdf5ec;">变更</span>
              {{ item.noticeNo }}<span class="time">
                {{item.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.noticeTime)[0]:''}}
              </span>
            </li>
          </ul>
          <div v-else>暂无</div>
        </epf-switchTitle>
        
        <!-- 附件 目前后台开发中  基线版本-->
        <epf-switchTitle titles_h="附件" :shutOff="false" background="#fff">
          <epf-annexList
            v-if="belong"
            :tableType='true'
            :tableNmae='tableNmae'
            :belong='belong'
            :areaCode='areaCode'
            :fileSize='6'
            :fileType='fileType'
            :annexType='annexType'>
          </epf-annexList>
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
            <li style="width:998px;">{{ transTargetEntityListData.targetNo }}
              <span v-if="transTargetEntityListData.status=='trans_status-001'">录件</span>
              <span v-if="transTargetEntityListData.status=='trans_status-002'">未公告</span>
              <span v-if="transTargetEntityListData.status=='trans_status-003'">已公告</span>
              <span v-if="transTargetEntityListData.status=='trans_status-004'">交易中</span>
              <span v-if="transTargetEntityListData.status=='trans_status-005'">成交待审核</span>
              <span v-if="transTargetEntityListData.status=='trans_status-006'">未成交(流拍)</span>
              <span v-if="transTargetEntityListData.status=='trans_status-007'">已成交</span>
              <span v-if="transTargetEntityListData.status=='trans_status-008'">已公示</span>
            </li>
            <li>流转方式</li>
            <li>{{ transTargetEntityListData.circulation=='transfer'?'转让':(transTargetEntityListData.circulation=='rent'?'出租':(transTargetEntityListData.circulation=='mortgage'?'抵押':'')) }}</li>
            <li>交易方式</li>
            <li>{{ transTargetEntityListData.transTypeName }}</li>
            <li>起始价</li>
            <li>{{transTargetEntityListData.beginPrice? transTargetEntityListData.beginPrice + "万元": ""}}</li>
            <li>竞价增价幅度</li>
            <li>{{transTargetEntityListData.priceStep? transTargetEntityListData.priceStep + "万元": ""}}</li>
            <li>竞买保证金</li>
            <li>{{ transTargetEntityListData.amount }}</li>
            <li>公告开始时间</li>
            <li>{{ transTargetEntityListData.beginNoticeTime }}</li>

            <li v-if="transTargetEntityListData.beginFocusTime">挂牌起始时间</li>
            <li v-if="transTargetEntityListData.beginFocusTime">{{ transTargetEntityListData.beginFocusTime }}</li>
            <li v-if="transTargetEntityListData.beginFocusTime">挂牌截止时间</li>
            <li v-if="transTargetEntityListData.beginFocusTime">{{ transTargetEntityListData.endFocusTime }}</li>

            <li v-if="transTargetEntityListData.beginFocusTime">限时竞价开始时间</li>
            <li v-else>拍卖开始时间</li>
            <li>{{transTargetEntityListData.beginLimitTime}}</li>

            <li>保证金缴纳截止时间</li>
            <li>{{transTargetEntityListData.endEarnestTime}}</li>

            <li>竞买申请开始时间</li>
            <li>{{transTargetEntityListData.beginApplyTime}}</li>


            <!-- <li>限时竞价开始时间</li>
            <li>{{transTargetEntityListData.beginLimitTime}}</li> -->
            <!-- <li>保证金截止时间</li>
            <li>{{transTargetEntityListData.endEarnestTime}}</li>
            <li>竞买申请开始时间</li>
            <li>{{transTargetEntityListData.beginApplyTime}}</li>
            <li style="width:160px;">竞买资格条件</li>
            <li style="width:1000px;">{{transTargetEntityListData.transCondition}}</li> -->
          </ul>
        </epf-switchTitle>
        <!-- 标的的土地信息 -->
        <epf-switchTitle titles_h="地块信息" :shutOff="false" background="#fff">
          <div v-if="transTargetEntityListData.publicity&&transTargetEntityListData.publicity.transGoodsEntityList">
            <div class="landInfo" v-for="(item, index) in transTargetEntityListData.publicity.transGoodsEntityList" :key="index">
              <div class="title">地块编号:{{ item.goodsNo }}</div>
              <ul class="textul">
                <li>行政区域：<span>{{ item.cantonProvinceName }}{{ item.cantonCityName}}{{ item.cantonAreaName }}</span></li>
                <li>土地权属单位：<span>{{ item.ownerShipName }}</span></li>
                <li>土地位置：<span>{{ item.location }}</span></li>
              </ul>
              <ul class="textul">
                <li>使用权面积（m2）：<span>{{ item.area }}</span></li>
                <li>土地用途：<span>{{ item.firstClassUseName }}-{{item.secondClassUseName}}</span></li>
                <li>{{item.circulation=='transfer'?'剩余使用年限':(item.circulation=='rent'?'出租年限':(item.circulation=='mortgage'?'抵押年限':'')) }}（年）：<span>{{ item.years }}</span></li>
              </ul>
            </div>
          </div>
          <div v-else>暂无</div>
        </epf-switchTitle>
        <epf-switchTitle titles_h="竞买资格信息" :shutOff="false" background="#fff">
          <div class="info" v-if="transTargetEntityListData.transCondition" style="border:1px solid #e2e2e2;background: #f6f9ff;padding: 12px;" v-html="transTargetEntityListData.transCondition"></div>
          <div v-else>暂无</div>
        </epf-switchTitle>
        <!-- 成交公示去掉 2020-5-19 高捷-李清源-->
        <!-- <epf-switchTitle titles_h="成交公示" :shutOff="false" background="#fff">
          <ul class="public" v-if="transTargetEntityListData.publicity&&transTargetEntityListData.publicity.transTargetEntityMap">
            <li @click="viewresultdetail(transTargetEntityListData.publicity.transTargetEntityMap.targetNo,transTargetEntityListData.publicity.transTargetEntityMap.id)">
              {{ transTargetEntityListData.publicity.transTargetEntityMap.targetNo}}
              <span class="time">{{ transTargetEntityListData.publicity.transTargetEntityMap.insertTime }}</span>
            </li>
          </ul>
          <div v-else>暂无</div>
        </epf-switchTitle> -->
        <!-- 附件 目前后台开发中  基线版本-->
        <epf-switchTitle titles_h="附件" :shutOff="false" background="#fff">
          <epf-annexList
            v-if="belong1"
            :tableType='true'
            :tableNmae='tableNmae'
            :belong='belong1'
            :areaCode='areaCode'
            :fileSize='6'
            :fileType='fileType'
            :annexType='landType'>
          </epf-annexList>
        </epf-switchTitle>
      </div>
    </div>
    <div v-show="false">{{compublic}}</div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tableNmae: ['序号', '文件名', '文件', '操作'],
      belong: '',
      belong1: '',
      areaCode: '',
      fileType: ['jpg', 'GIF', 'png', 'pdf', 'zip'],
      annexType: 'NOTICE',
      baseUrl: '',
      activeTitle: "first",
      traPublicityData: [],
      activeName: "DAZ2018002",
      landType: "TARGET",
      
      location: [
        { path: "/", name: "首页" },
        { path: "/TradingHall", name: "交易大厅" },
        { path: null, name: "公告详情" }
      ],
      detailInfo: [],
      transNoticeEntity: {},
      transTargetEntityListData: {},
      transTargetEntityList: [
        { targetNo: "DAZ2018002" },
        { targetNo: "DAZ2018003" },
        { targetNo: "DAZ2018004" }
      ],
      tableData: [],
      noticeCode: "", //附件标识
      circulationName: "",
      TransNoticeChildren:"",
      count:"",
    };
  },
  mounted() {
    this.getNoticeDetails(this.$route.query.noticeId);
    // this.compublic();
  },
  computed: {
    ...mapState("publicNotice", ["noticeDetails"]),
    ...mapState("TradingHall", ["transGoodsDetails"]),
    compublic() {
      if (
        // true
        this.noticeDetails &&
        this.noticeDetails !== null &&
        this.noticeDetails.map &&
        this.noticeDetails.map !== null
      ) {
        this.count = this.noticeDetails.map.count;//浏览次数
        this.TransNoticeChildren = this.noticeDetails.map.TransNoticeChildren;//相关公告对象

        this.transNoticeEntity = this.noticeDetails.map.transNoticeEntity;
        if(this.transNoticeEntity.noticeType=='change_notice'){
          this.location = [];
          this.location = [
            { path: "/", name: "首页" },
            { path: "/TradingHall", name: "交易大厅" },
            { path: null, name: "变更公告详情" }]
        }else{
          this.location = [];
          this.location = [
            { path: "/", name: "首页" },
            { path: "/TradingHall", name: "交易大厅" },
            { path: null, name: "公告详情" }]
        }
        debugger;
        this.transTargetEntityList = this.noticeDetails.map.transTargetEntityList;
        this.activeName = this.transTargetEntityList[0].targetNo;
        this.transTargetEntityListData = this.noticeDetails.map.transTargetEntityList[0];

        // this.traPublicityData.push(this.noticeDetails.map.transTargetEntityList[0].publicity.transTargetEntityMap) ;

        //通过第一个标的ID去查询的标的绑定地块的区域的编码
        this.$axios.get(
          `/epf-landweb/landweb/transtarget/getTransTargetById?targetId=${this.transTargetEntityListData.id}`,
          {},
          res => {
            debugger;
            //先清空belong
            this.belong = "";

            let _this = this;
            //获取地块的信息
            let transGoodsJson = res.map.transGoodsList[0];

            this.transGoodsJson = transGoodsJson;
            this.circulationName = res.map.transTargetObj.circulationName;
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
            _this.areaCode = transGoodsJson.cantonArea;

            //设置附件的ID
            _this.belong = this.transNoticeEntity.enclosureId;
            _this.belong1 = res.map.transTargetObj.id;
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
    ...mapActions("publicNotice", ["getNoticeDetails"]),
    ...mapActions("TradingHall", ["getTransGoodsDetails"]),
    ListClick(index) {
      this.transTargetEntityListData = this.transTargetEntityList[index];
      this.getTransGoodsDetails({
        targetId: this.noticeDetails.map.transTargetEntityList[index].id
      });
    },
    policedetail(item){
      console.log(item.id)
      if(item.noticeType == 'change_notice'){
        this.$router.push({path:'/TradeChangePublicDetails',query:{noticeId:item.id}})
      }else{
        this.$router.push({path:'/TradePublicDetails',query:{noticeId:item.id}})
      }
      this.getNoticeDetails(item.id);
    },
    viewresultdetail(id, targetId){
      this.$router.push({path:'/ResultsPublicityDetails',query:{noticeId:id, targetId: targetId}})
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.noticeType{
 padding:5px 15px;
 margin-right:10px;
 border-bottom-left-radius: 10px;
 border-top-right-radius: 10px;
}
.tradeDeta {
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
      border-bottom: 4px solid var(--lightColor) ;
      color: var(--lightColor) ;
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
      width:100%;
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
        span{
          padding: 0px 20px;height: 34px;line-height: 34px;color: #93b52d;font-size: 14px;vertical-align: middle;font-weight: bold;margin-top: 7px;background: rgb(231, 244, 189);border-top-right-radius: 9px;border-bottom-right-radius: 9px;float: right;
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
      color: var(--Colors);
    }
  }
}
</style>
<style>
.el-tabs__item.is-active {
  color: var(--lightColor);
}
.el-tabs__item {
  height: 48px;
  line-height: 48px;
  font-weight: bold;
  color: #999;
  font-size: 16px;
}
.el-tabs__item:hover {
  color: var(--lightColor);
}
.el-tabs__active-bar {
  background: var(--lightColor);
}
</style>
