<template>
<div class="applyBidde_warp">
  <div class="borderImg">
    <img src="../../../../assets/image/included_border.png" style="width:93%;height:95%">
  </div>
  <div class="applyBidde_close" @click="close()"></div>
  <div class="applyBidde_box">
    <div class="applyBidde_title">XX市国有建设用地使用权转让竞买申请书</div>
    <div class="applyBidde_cont">
      <div class="applyBidde_applicant">xx市地产交易中心：</div>
      <div class="applyBidde_text">
        <p>经认真阅读DAL2018002，DAL2018003号标的物挂牌转让交易文件及相关资料，我方完全接受并愿意遵守该文件的规定和要求，且对该交易文件及相关资料均无异议。我方现在正式申请你参加你方组织的该标的网上交易活动 。</p>
        <p>我方愿意按出让文件规定，缴纳足够竞买保证金。</p>
        <p style="color:#666666;">请选择保证金缴纳方式 :</p>
        <el-table
          :data="tableBondData"
          style="width: 100%">
          <el-table-column label="" width="65">
            <template slot-scope="scope">
                <el-radio :label="scope.row.id" v-model="templateSelection" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
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
        <p>身份证号：<span>142112196802180225</span></p>
        <p v-if="competeShow">法定代表人：<span>法人</span></p>
        <p v-if="competeShow">联系人：<span>周XX</span></p>
        <p>联系电话：<span>18645678966</span></p>
        <p>地址：<span>济南万科</span></p>
        <p>邮政编码：<span>030677</span></p>
        <p style="float:right;">申请日期：2018年12月21日</p>
        <p style="clear:both;"></p>
      </div>
      <div class="applyBidde_oper">
        <div>下载</div>
        <div @click="applyBidding(templateSelection)">继续</div>
        <div @click="close()">关闭</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import PopUpWidget from '@/components/PopUpWidget'
export default {
  components: {PopUpWidget},
  data() {
    return{
      competeShow:false,
      tableBondData:[
        {id:0,currency:'人民币',money:'200万元'},
        {id:1,currency:'美元',money:'100万美元'},
      ],
      templateSelection:0
    }
  },
  methods:{
    close(){
      let flag = false;
      this.$emit('closeApplyPop',flag);
    },
    getTemplateRow(index,row){
      this.templateSelection = row.id;
    },
    applyBidding(id){
      this.$router.push({path:"/applyBidding",query:{currencyType:id}})
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.applyBidde_warp{
  @include size(680px,auto);
  background: #fff;
  margin:0 auto;
  overflow: hidden;
  position: relative;
  .applyBidde_close {
    @include size(24px,24px);
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    top: 13px;
    right: 13px;
    cursor: pointer;
    background: url('../../../../assets/image/close.png') no-repeat center center;
  }
  .borderImg{
    width:100%;
    height:100%;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .applyBidde_box{
    @include size(632px,auto);
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
            margin-right: 0px;
            border: solid 1px #e0dfdf;
            background: #fff;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
