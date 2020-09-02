<template>
<!-- 申请竞买书 -->
<div class="ApplyInfo_warp">
  <div class="win1200">
    <epf-lePage :location="location"></epf-lePage>
    <div class="ApplyInfo_Pro">
      <epf-switchTitle
        titles_h="申请竞买书"
        padding="0px"
        background="#fff"
        height="80px"
        ref="one"
        :shutOff="false"
        class="scroll-item"
      ></epf-switchTitle>
      <div class="ApplyInfo_Pro_cont">
        <div class="applyBidde_box">
          <div class="applyBidde_title">{{area}}建设用地使用权转让竞买申请书</div>
          <div class="applyBidde_cont">
            <div class="applyBidde_applicant">{{target.tradingCenter}}：</div>
            <div class="applyBidde_text">
              <p>经认真阅读{{target.targetNo}}号标的物挂牌转让交易文件及相关资料，我方完全接受并愿意遵守该文件的规定和要求，且对该交易文件及相关资料均无异议。我方现在正式申请你参加你方组织的该标的网上交易活动 。</p>
              <p>我方愿意按出让文件规定，缴纳足够竞买保证金。</p>
              <p style="color:#666666;">请选择保证金缴纳方式 :</p>
              <el-table
              border
                v-if="tableBondData.length > 0"
                :data="tableBondData"
                style="width: 100%">
                <el-table-column label="" width="65">
                  <template slot-scope="scope">
                      <el-radio :label="scope.row.currency" v-model="templateSelection" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="currencyName"
                  label="币种">
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="金额">
                  <template slot-scope="scope">
                    {{scope.row.amount}}{{scope.row.unit}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table
              border
                v-else
                :data="tableBondData"
                style="width: 100%">
                <el-table-column label="" width="65">
                  <template slot-scope="scope">
                      <el-radio :label="scope.row.currency" v-model="templateSelection" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="currencyName"
                  label="币种">
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="金额">
                  <template slot-scope="scope">
                    {{scope.row.amount}}{{scope.row.unit}}
                  </template>
                </el-table-column>
              </el-table>

              <p>若能竞得该标的物，我方保证按照本次挂牌转让交易文件的规定要求提交所有资料，履行全部义务，如未按规定要求提交资料或者出现不能按期付款等违规违约行为，我方愿意按交易文件规定，承担全部责任，并赔偿由此产生的损失。</p>
              <p>我方承诺在竞得该标的物使用权后，5个工作日内将成交余额转入指定资金托管账户，全权委托并配合贵方办理不动产登记相关手续。</p>
              <p>特此申请</p>
              <p>申请人：<span>{{userInfo.realName}}</span></p>

              <p v-if="userAuthentication && userAuthentication.certificatesNo">身份证号：<span>{{userAuthentication.certificatesNo}}</span></p>
              <p v-else>身份证号：<span>无法获取[原因:未实名认证]</span></p>

              <p v-if="competeShow">法定代表人：<span>法人</span></p>
              <p v-if="competeShow">联系人：<span>周XX</span></p>


              <p>联系电话：<span>{{userInfo.telPhone}}</span></p>

              <p v-if="userAuthentication && userAuthentication.locationInfomation">地址：<span>{{userAuthentication.cantonProvinceName}}{{userAuthentication.cantonCityName}}{{userAuthentication.cantonAreaName}}{{userAuthentication.locationInfomation}}</span></p>
              <p v-else>地址：<span>无法获取[原因:未实名认证]</span></p>

              <p v-if="userAuthentication && userAuthentication.postCode">邮政编码：<span>{{userAuthentication.postCode}}</span></p>
              <p v-else>邮政编码：<span>无法获取[原因:未实名认证]</span></p>

              <p style="float:right;">申请日期：{{applyDate}}</p>
              <p style="clear:both;"></p>
            </div>
            <div class="applyBidde_oper">
              <div @click="applyBidding(templateSelection)">继续</div>
              <div @click="downApplyBook">下载</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import arrowDialogBox from "@/components/arrowDialogBox"
import {mapState, mapActions} from 'vuex'
import baseURL1 from "@/util/config.js";
export default {
  components: {arrowDialogBox},
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:'/TradingHall',name:'交易大厅'},
        {path:null,name:'申请竞买书'},
      ],
      tableBondData:[
        // {id:0,currency:'人民币',amount:'200万元'},
        // {id:1,currency:'美元',amount:'100万美元'},
      ],
      templateSelection:'',
      competeShow:false,
      target:{}, // 标的信息
      license:{}, // 申请基本信息
      type:'',
      area:'',
      applyDate: '',
      userInfo: {}, //替代CA信息
      data:{
        "msg": "success",
        "code": 0,
        "map": {
          "transTargetEarnestMoneyList": [
            {
              "id": "4f584579-6ff0-4efd-953f-4850b7356672",
              "currency": "CNY",
              "amount": 300,
              "unit": "万元",
              "insertTime": "2019-05-11",
              "updateTime": "2019-05-11",
              "insertUser": "111",
              "updateUser": "userId",
              "deleteFlag": 1,
              "targetId": "111"
            },
            {
              "id": "6f84ee8f-5efd-4905-a789-901f94d57955",
              "currency": "USD",
              "amount": 200,
              "unit": "万元",
              "insertTime": "2019-05-11",
              "updateTime": "2019-05-11",
              "insertUser": "111",
              "updateUser": "userId",
              "deleteFlag": 1,
              "targetId": "111"
            },
            {
              "id": "dc4e9893-a523-48a0-bcbb-a5900eeb22c8",
              "currency": "EUR",
              "amount": 100,
              "unit": "万元",
              "insertTime": "2019-05-11",
              "updateTime": "2019-05-11",
              "insertUser": "111",
              "updateUser": "userId",
              "deleteFlag": 1,
              "targetId": "111"
            }
          ],
          "transGoodsList": [
            {
              "id": "2e86f7d80-07e6-416f-a9f-988e10fcf2b5",
              "circulation": "transfer",
              "landChar": "state-owned_construction_land",
              "channel": "supply_and_demand",
              "tSellId": "8005f0f3-3d6c-4d05-8773-007730256614",
              "goodsNo": "DY201905100001",
              "authentication": "0",
              "cantonProvince": "shanxisheng",
              "cantonCity": "taiyuanshi",
              "cantonArea": "xiaodianqu",
              "useType": "tosell",
              "landType": "personal_land",
              "firstClassUse": "arable_land",
              "secondClassUse": "paddy_field",
              "area": 50000,
              "endDate": "2020-12-12",
              "years": 3,
              "location": "小店区88号",
              "coordinate": "132°,52°",
              "mapIdentification": "111",
              "north": "工业南路正丰路",
              "south": "经十路南",
              "west": "顺风路西",
              "east": "舜华路东",
              "price": 8000,
              "warrantNumType": "real_estate_no",
              "warrantNum": "quanzhenghao001",
              "registration": "shanxishengtudiju",
              "unitNum": "budognchandanyuanhao001",
              "isAdjunct": "1",
              "isDevelope": 1,
              "isPercent": 1,
              "buildArea": 20,
              "buildingStructure": "ferroconcrete",
              "greenSpaceRate": "10",
              "greenSpaceRate2": "30",
              "greenSpaceRateSymbol1": "<",
              "greenSpaceRateSymbol2": "<",
              "buildingDensity": "10",
              "buildingDensity2": "30",
              "buildingDensitySymbol1": "<",
              "buildingDensitySymbol2": "<",
              "heightLimit": "100",
              "plotRatio": "10",
              "plotRatio2": "30",
              "plotRatioSymbol1": "<",
              "plotRatioSymbol2": "<",
              "publishStatus": "published",
              "examineTime": "2019-12-12",
              "landLevel": "grade_type-001",
              "img": "tupian001",
              "fileTemplateId": "fujianmuban001",
              "fileId": "shipin001",
              "remark": "其他说明",
              "isUnion": 0,
              "amount": 10000,
              "amountStatus": null,
              "insertTime": "2019-05-10",
              "insertUser": "003",
              "updateTime": "2019-05-10",
              "updateUser": "003",
              "deleteFlag": 0,
              "isBinding": 1
            },
            {
              "id": "8e86f7d80-07e6-416f-a9f-987e10fcf2b5",
              "circulation": "transfer",
              "landChar": "state-owned_construction_land",
              "channel": "supply_and_demand",
              "tSellId": "8005f0f3-3d6c-4d05-8773-007730256614",
              "goodsNo": "DY201905100002",
              "authentication": "0",
              "cantonProvince": "shanxisheng",
              "cantonCity": "taiyuanshi",
              "cantonArea": "xiaodianqu",
              "useType": "tosell",
              "landType": "personal_land",
              "firstClassUse": "arable_land",
              "secondClassUse": "paddy_field",
              "area": 50000,
              "endDate": "2020-12-12",
              "years": 3,
              "location": "小店区88号",
              "coordinate": "132°,52°",
              "mapIdentification": "111",
              "north": "工业南路正丰路",
              "south": "经十路南",
              "west": "顺风路西",
              "east": "舜华路东",
              "price": 8000,
              "warrantNumType": "real_estate_no",
              "warrantNum": "quanzhenghao001",
              "registration": "shanxishengtudiju",
              "unitNum": "budognchandanyuanhao001",
              "isAdjunct": "1",
              "isDevelope": 1,
              "isPercent": 1,
              "buildArea": 20,
              "buildingStructure": "ferroconcrete",
              "greenSpaceRate": "10",
              "greenSpaceRate2": "30",
              "greenSpaceRateSymbol1": "<",
              "greenSpaceRateSymbol2": "<",
              "buildingDensity": "10",
              "buildingDensity2": "30",
              "buildingDensitySymbol1": "<",
              "buildingDensitySymbol2": "<",
              "heightLimit": "100",
              "plotRatio": "10",
              "plotRatio2": "30",
              "plotRatioSymbol1": "<",
              "plotRatioSymbol2": "<",
              "publishStatus": "published",
              "examineTime": "2019-12-12",
              "landLevel": "grade_type-001",
              "img": "tupian001",
              "fileTemplateId": "fujianmuban001",
              "fileId": "shipin001",
              "remark": "其他说明",
              "isUnion": 0,
              "amount": 10000,
              "amountStatus": null,
              "insertTime": "2019-05-10",
              "insertUser": "003",
              "updateTime": null,
              "updateUser": null,
              "deleteFlag": 0,
              "isBinding": 1
            }
          ],
          "transTarget": {
            "id": "111",
            "targetNo": "DY201905100001,DY201905100002",
            "transType": "listing_mode",
            "tradingCenter": "交易中心(对应关联的ID)",
            "isAisJointBidding": 1,
            "isLiveWebcast": 1,
            "isAfterCheck": 1,
            "transCondition": "竞买资格条件",
            "conditionOrganName": "条件设置部门",
            "handleUnit": null,
            "beginPrice": 100,
            "priceStep": 10,
            "unit": "万元",
            "status": "being_accepted",
            "isSuspend": 0,
            "isStop": 0,
            "fileTemplateCode": "附件模板标识ID",
            "insertTime": "2019-05-11",
            "updateTime": "2019-05-11",
            "insertUser": "111",
            "updateUser": "userId",
            "deleteFlag": 1,
            "businessType": "transfer",
            "beginNoticeTime": "2019-05-08",
            "endNoticeTime": "2019-05-08",
            "beginFocusTime": "2019-05-08",
            "endFocusTime": "2019-05-08",
            "beginApplyTime": "2019-05-08",
            "endApplyTime": "2019-05-08",
            "endEarnestTime": "2019-05-08",
            "beginLimitTime": "2019-05-08",
            "endTransPrice": 0
          },
        },
        userAuthentication:{
          id:'',
          userId:'',
          realName:'',
          certificatesType:'',
          certificatesNo:'',
          certificatesLmdate:'',
          cantonProvinceName:'',
          cantonCityName:'',
          cantonAreaName:'',
          idcardFront:'',
          idcardBack:'',
          locationInfomation:'',
          auditStatus:'',
          commitDate:'',
          checkRadio:'',
          postCode:''
        },
      }
    }
  },
  created(){

    let id = this.$route.query.id;
    this.type = this.$route.query.type;
    if(this.type == 2){
      this.init2();
    }
    else if(this.type != '3'){
      this.init(id);
    }else{
      this.$store.state.targetId = id;
      this.firstApply(id);
    }
  },
  computed:{
    ...mapState('competeBuy',['ApplicationForBidding']),
  },
  methods: {
    ...mapActions('competeBuy',['getBankByCurrency','getApplicationForBidding']),
    init(id){
      this.$axios.get('/epf-landweb/admin/getTransLicense?id='+id,{},res => {
        if(res.code=='0'){
          this.license = res.applyBidderDetails.applyInfo; // 申请基本信息
          this.target = res.applyBidderDetails.transTargetEntity;// 标的信息
          this.tableBondData = res.applyBidderDetails.bankInfo;// 币种列表
          this.templateSelection=this.tableBondData[0].currency;
          this.$store.state.targetId = this.target.id;
          this.$store.state.currency = this.tableBondData[0].currency;
          this.$store.state.currencyName = this.tableBondData[0].currencyName;
          this.area = res.applyBidderDetails.area;
          this.userInfo = res.userInfo;
          this.applyDate = res.applyDate;
          if(res.userAuthentication){
            this.userAuthentication = res.userAuthentication;
          }

        }
      });
    },
    init2(){
      //调用接口查询新数据
      this.$axios.get(
        "/epf-landweb/admin/restTransLicense?id=" +
        localStorage.getItem("linceId"),
        {},
        res => {
          if (res.code === 0) {
            console.log("获取到的数据是：",res)

            this.license = res.applyBidderDetails.applyInfo; // 申请基本信息
            this.target = res.applyBidderDetails.transTargetEntity;// 标的信息
            this.tableBondData = res.applyBidderDetails.bankInfo;// 币种列表
            this.templateSelection=this.tableBondData[0].currency;
            this.$store.state.targetId = this.target.id;
            this.$store.state.currency = this.tableBondData[0].currency;
            this.$store.state.currencyName = this.tableBondData[0].currencyName;
            console.log('11111', this.tableBondData);
            this.area = res.applyBidderDetails.area;
            this.userInfo = res.userInfo;
            this.applyDate = res.applyDate;
            if(res.userAuthentication){
              this.userAuthentication = res.userAuthentication;
            }

            //设置重新提交的参数
            this.$store.state.rest = res
          }
        }
      );
    },
    // 交易大厅申请竞买初始化标的数据
    firstApply(id){
      let that = this;
      this.$axios.get('/epf-landweb/admin/getTransTargetById?targetId='+id,{},res => {
        if(res.code == 0){
          console.log('标的', res.map.transTargetObj);
          console.log('区域', res.map.area);
          that.target = res.map.transTargetObj;// 标的信息
          that.tableBondData = res.map.transTargetEarnestMoneyList; // 保证金列表
          that.area = res.map.area;
          that.applyDate = res.applyDate;
          that.userInfo = res.userInfo;
          if(res.userAuthentication){
            this.userAuthentication = res.userAuthentication;
          }

        }
      });
    },
    applyBidding(){
      if(!this.templateSelection){
        this.$message.error("请选择币种！");
        return;
      }

      if(typeof(this.$store.state.currency) == 'undefined'){
        this.$message.error("请选择币种！");
        return;
      }
      let id = '';
      if(this.type != 2){
        if(this.$route.query.tgId){
          id = this.$route.query.tgId
        }else if(this.$route.query.id){
          id = this.$route.query.id
        }
      }else{
        id = localStorage.getItem("targetId")
      }

      this.$router.push({path:"/applyBidding",query:{id:id, type:this.type}});

    },
    getTemplateRow(index,row){
      console.log("fdgth",row.currency)
      this.templateSelection=row.currency;
      this.$store.state.currency = row.currency;
      this.$store.state.currencyName = row.currencyName;
      let token=localStorage.getItem('token');
    },
    // 下载竞买申请书
    downApplyBook(){
      let url = baseURL1.baseURL1 + "/epf-landweb/pdf/download?targetId="+this.target.id+"&userId="+this.userInfo.id+"?licenseId=" + localStorage.getItem("linceId")
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
  &_cont {
    box-sizing: border-box;
    @include size(1200px,auto);
    padding: 0 50px;
    margin:0 auto;
    padding-bottom:30px;
    border-bottom: solid 1px #f3f3f3;
    .applyBidde_box{
      // @include size(632px,auto);
      // margin:25px auto;
      box-sizing: border-box;
      padding:40px;
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
              // margin-right: 0px;
              border: solid 1px #e0dfdf;
              background: #fff;
              color: #666666;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
  .has-gutter tr{
    background-color: #f2f5f7 !important;
  }
</style>
