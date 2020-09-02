<template>
<div class="ApplyInfo_warp">
  <div class="win1200">
    <epf-lePage :location="location"></epf-lePage>
    <div class="ApplyInfo_Pro">
        <ul class="ApplyInfoTab">
            <li><span :class="spanTabKey===0?'spanActive':''" @click="spanTab(spanTabKey=0)">竞买申请书</span></li>
            <li><span :class="spanTabKey===1?'spanActive':''" @click="spanTab(spanTabKey=1)">竞买人信息</span></li>
        </ul>
        <div v-if="spanTabKey===0">
            <epf-switchTitle
              titles_h="竞买申请书"
              padding="0px"
              background="#fff"
              height="80px"
              ref="one"
              :shutOff="false"
              class="scroll-item"
            ></epf-switchTitle>
            <div class="ApplyInfo_Pro_cont">
                <div class="applyBidde_box">
                    <div class="applyBidde_title">XX市国有建设用地使用权转让竞买申请书</div>
                    <div class="applyBidde_cont">
                    <div class="applyBidde_applicant">xx市地产交易中心：</div>
                    <div class="applyBidde_text">
                        <p>经认真阅读{{target.targetNo}}号标的物挂牌转让交易文件及相关资料，我方完全接受并愿意遵守该文件的规定和要求，且对该交易文件及相关资料均无异议。我方现在正式申请你参加你方组织的该标的网上交易活动 。</p>
                        <p>我方愿意按出让文件规定，缴纳足够竞买保证金。</p>
                        <p style="color:#666666;">请选择保证金缴纳方式 :</p>
                        <el-table
                            :data="tableBondData"
                            style="width: 100%">
                            <el-table-column
                                prop="currency"
                                label="币种">
                            </el-table-column>
                            <el-table-column
                                prop="money"
                                label="金额">
                            </el-table-column>
                        </el-table>
                        <p>若能竞得该标的物，我方保证按照本次挂牌转让交易文件的规定要求提交所有资料，履行全部义务，如未按规定要求提交资料或者出现不能按期付款等违规违约行为，我方愿意按交易文件规定，承担全部责任，并赔偿由此产生的损失。</p>
                        <p>我方承诺在竞得该标的物使用权后，5个工作日内将成交余额转入指定资金托管账户，全权委托并配合贵方办理不动产登记相关手续。</p>
                        <p>特此申请</p>
                        <p>申请人：<span>万科房地产开发有限公司</span></p>
                        <p>法定代表人：<span>法人</span></p>
                        <p>联系人：<span>周XX</span></p>
                        <p>身份证号：<span>142112196802180225</span></p>
                        <!-- <p>统一社会信用代码：<span>372929xxxxxxxx0031</span></p> -->
                        <p>地址：<span>济南万科</span></p>
                        <p>电话：<span>18645678966</span></p>
                        <p>邮政编码：<span>030677</span></p>
                        <p style="float:right;">申请日期：{{license.insertTime}}</p>
                        <p style="clear:both;"></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{transLicense.applyBidderDetails}} -->
        <div v-if="spanTabKey===1">
            <epf-switchTitle
              titles_h="竞买人信息"
              padding="0px"
              background="#fff"
              height="80px"
              ref="one"
              :shutOff="false"
              class="scroll-item"
            ></epf-switchTitle>
            <div class="ApplyInfo_Pro_cont">
                <ul class="ApplyInfoUl">
                    <li><span><i style="color:red;">*</i>竞买方式：</span>独立竞买</li>
                    <li><span><i style="color:red;">*</i>成立全资子公司：</span>未成立全资子公司</li>
                    <li><span><i style="color:red;">*</i>选择银行：</span>中国工商银行</li>
                    <p><span>提示：</span>根据中国人民银行的相关文件规定及支付结算流程，银行间大额支付系统运行时间为法定工作日。 同时，银行间大额支付结算需经过人民银行清算，故各竞买人汇报时间与保证金账户资金到账存在时差，建议各竞买人在工作日并适当提前缴存竞买保证金。</p>
                </ul>
            </div>
        </div>
    </div>
    <div v-show="false">{{comApplicationForBidding}}</div>
  </div>
</div>
</template>
<script>
// applyBiddingSavedraft\applyBiddingSavesuccess
import arrowDialogBox from "@/components/arrowDialogBox"
import {mapState,mapActions} from 'vuex'
export default {
  components: {arrowDialogBox},
  data() {
    return {
      location:[
        {path:'/',name:'首页'},
        {path:'/TradingHall',name:'交易大厅'},
        {path:null,name:'独立竞买确认详情'},
      ],
      spanTabKey:1,  
      tableBondData:[
        {id:0,currency:'人民币',money:'200万元'},
      ],
      BondInfo1: [
        {
          id:0,
          currency:'',
          amount:'',
        }
      ],
      rules:[],
      disabled:true,
      disabled1:true,
      disabled2:true,
      BondInfo: [
        {id:0,'Jointbidder':'山西万辉地产有限公司','tradeshare':'10'}, 
        {id:1,'Jointbidder':'山西万辉地产有限公司','tradeshare':'10'}, 
      ],
      applycompanyData:[
        {name:'深圳市壹平台',idNum:'140114196805222526',tell:'15136623620',address:'山西省太原市小店区',emali:'123456@163.com',remarks:'无',proportion:25},
        {name:'深圳市壹平台',idNum:'140114196805222526',tell:'15136623620',address:'山西省太原市小店区',emali:'123456@163.com',remarks:'无',proportion:25},
      ],
      // applycompanyDataFirstTitle:[{title:}]
      applycompanyDataFirst:
      {
        companytype:'内资公司',
        companyname:'',
        contact:'',
        fax:'',
        tell:'',
        companyTell:'',
        contactjob:'',
        client:'',
        legalrep:'',
        registeredfunds:'',
        remarks:''
      },
      applycompanyrules:[],
      applyTypeoption:['独立竞买','联合竞买主竞买人份额100%'],
      applycompanyoption:['成立全资子公司','不成立全资子公司'],
      applyPriceoption:['是','否'],
      applybankoption:['中国工商银行','中国建设银行','中国银行'],
      active:0,
      state:4,
      temp: {
        address__province: '',
        address__city: '',
        address__dist: '',
      },
      txtVal:0,
      isShowProvince:true,
      ruleForm:{
        applyType:"独立竞买",
        applycompany:"不成立全资子公司",
        applyPrice:"否", 
        // applyType:"联合竞买主竞买人份额100%",
        // applycompany:"成立全资子公司",
        // applyPrice:"是",
        applybank:"中国工商银行",
      },
      license:'',
      target:'',
      joinBiddingType:'',
      applycompanyDataFirst:'',
      applycompanyData:'',
    }
  },
  created(){
    this.getApplicationForBidding('666')
    let token=localStorage.getItem('token')
    this.getTransLicense({token:token,id:'2'})
  },
  computed:{
    ...mapState('competeBuy',['ApplicationForBidding','transLicense']),
    comApplicationForBidding(){
      if(this.ApplicationForBidding&&this.ApplicationForBidding!==null){
        this.target = this.ApplicationForBidding.map.transTargetEntity
        this.tableBondData=this.ApplicationForBidding.map.transTargetEarnestMoneyEntityList
        this.license = this.ApplicationForBidding.map.transTargetEntity
      }
      // .applyBidderDetails.applyInfo; // 申请基本信息
      // this.target = this.ApplicationForBidding.applyBidderDetails.transTargetEntity;// 标的信息
      // this.joinBiddingType = this.ApplicationForBidding.applyBidderDetails.biddersInfo;// 联合竞买信息
      // this.applycompanyDataFirst = this.ApplicationForBidding.applyBidderDetails.childDealer;// 子公司信息
      // this.applycompanyData = this.ApplicationForBidding.applyBidderDetails.childDealeList;// 子公司股东信息列表
      // this.tableBondData = this.ApplicationForBidding.applyBidderDetails.bankInfo;// 币种列表
    }
  },
  methods: {
    ...mapActions('competeBuy',['getApplicationForBidding','getTransLicense']),
    spanTab(){},
    handleSave(){},
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRow() {
      let newId = this.BondInfo.length==0?0:this.BondInfo[this.BondInfo.length-1].id + 1;
      console.log("ddddddddddd",newId)
      //添加行数
      var newValue = {id:newId,currency: "",Price: ""};
      console.log("添加行数",this.newValue)
      // //添加新的行数
      this.BondInfo.push(newValue);
    },
    submit(){this.$router.push("/applyBiddingSavesuccess")},
    saveapply(){this.$router.push("/applyBiddingSavedraft")},
      // <span @click="editapplyType(item,index)">编辑</span>
      // <span @click="delapplyType(item,index)">删除</span>
      // <span @click="submitapplyType(item,index)">提交</span>
    editapplyType(item,index){
      // this.disabled=!this.disabled
      // const disabled='disabled'+(index+1)
      // console.log('gggggggggggggggggggggg',disabled)
      // // disabled=false
      // this.('disabled'+(index+1))
      // console.log('this.disabled1',this.disabled1)
      // console.log('this.disabled1',index)
      if(index===0){ this.disabled1 = false}
      if(index===1){ this.disabled2 = false}
      this.disabled=false
      console.log()

    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    submitapplyType(){
      this.disabled=true
      // this.$router.push({path:'/Contractexam'})
    },
    save(){
      this.$router.push({path:'/Savedraft',query:{signRecord:this.$route.query.signRecord}})
    },
    onSelected(data) {
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
    },
    descInput(){
      this.txtVal = this.landBasicInfoForm.rentallandInfo.length;
    }
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
</style>
<style>
  .has-gutter tr{
    background-color: #f2f5f7 !important;
  }
</style>
