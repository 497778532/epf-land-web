<template>
  <div class="signatureDetails_warp">
    <div class="signatureDetails_title">
      <div class="contractView">合同预览</div>
    </div>
    <div class="signatureDetails_left" :class="searchBarFixed == true ? 'isFixed' :''">
      <ul>
        <li v-for="(item,index) in detailsleftData" :key="index" @click="selectli(index)" :class="{liActive:statekey===index}"><a href="#signlistTi+'index'">{{item}}</a></li>
      </ul>
    </div>
    <div class="signatureDetails_list">
      <div class="signatureDetails_proess">
        <div class="signatureDetails_proess_cont">
          <span>填写信息</span>
          <span>合同审核</span>
          <span>合同鉴证</span>
          <span>完成</span>
        </div>
      </div>
      <div class="signatureDetails_cont">
        <div class="signNum">
          <div class="signNumCon">
            <p>合同编号：晋300000CZ201901010002</p>
            <p>合同类型：转让合同</p>
          </div>
        </div>
        <div class="signtitle" ref="signlist0">
          山西省晋中市建设用地使用权转让合同
          <div v-if="state===1" class="contractCancel"><span></span>待备案</div>
          <div v-if="state===2" class="contractCancel"><span></span>备案终止</div>
          <div v-if="state===3" class="contractsuccess"><span></span>已备案</div>
        </div>
        <div class="signaturelist" ref="signlist1">
          <div id="signlistTi" style="clear:both;" class="signlistTi">
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
          </div>
          <div id="signlistTi1" style="clear:both;" class="signlistTi">
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
            <div class="signaturelistcon"><span>*</span><div class="signaturelistconTitle">甲方</div><div class="signaturelistdetail">山西腾飞房产有限公司</div></div>
          </div>
          
          <div style="clear:both;"></div>
        </div>
        <div class="signlist" ref="signlist2" id="signlistTi2">
          <p class="signlistTi">第二条　本合同所使用的特定词语定义如下</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist3"  id="signlistTi3">
          <p class="signlistTi">第三条　地块信息</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist4"  id="signlistTi4">
          <p class="signlistTi">第四条　转让期限</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist5" id="signlistTi5">
          <p class="signlistTi">第五条　转让期限</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist6" id="signlistTi6">
          <p class="signlistTi">第六条　本合同所使用的特定词语定义如下</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist7" id="signlistTi7">
          <p class="signlistTi">第七条　本合同所使用的特定词语定义如下</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist8" id="signlistTi8">
          <p class="signlistTi">第八条　本合同所使用的特定词语定义如下</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist9" id="signlistTi9">
          <p class="signlistTi">第九条　本合同所使用的特定词语定义如下</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的____开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist" ref="signlist10"  id="signlistTi10">
          <p class="signlistTi">签字部分</p>
          <div class="signlistwarp">
            <div class="signlistwarpTi"><span>甲方签字：</span></div>
            <div class="signlistwarpTi"><span>乙方签字：</span></div>
            <div class="signlistwarpTi"><span>身份证号：</span></div>
            <div class="signlistwarpTi"><span>身份证号：</span></div>
            <div class="signlistwarpTi"><span>证明人：</span></div>
            <div class="signlistwarpTi"><span>证明人：</span></div>
            <div class="signlistwarptime">
              <span>年</span>
              <span>月</span>
              <span>日</span>
            </div>
          </div>
        </div>
        <div class="signlist" ref="signlist11" id="signlistTi11">
          <p class="signlistTi">附件</p>
          <ul class="signlistenclosure">
            <li>1.<span>甲方法人身份证扫描件.pdf</span></li>
            <li>2.<span>乙方法人身份证扫描件.pdf</span></li>
          </ul>
        </div>
        <div class="button">返回</div>
        <div style="clear:both;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statekey:1,
      state:1,
      isShowHeader:false,
      searchBarFixed: false,
      detailsleftData:['甲方','乙方','第一条','第二条','第三条','第四条','第五条','第六条','第七条','第八条','第九条','签字部分','附件']
    }
  },
  created(){
    window.scrollTo(0, 0);
  },
  methods:{
    handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 410) {
          this.searchBarFixed = true;
          // if (scrollTop >= 410) {this.statekey = 0;}
          // if (scrollTop >= 420) {this.statekey = 1;}
          // if (scrollTop >= 620) {this.statekey = 2;}
          // if (scrollTop >= 820) {this.statekey = 3;}
          // if (scrollTop >= 1120) {this.statekey = 4;}
          // if (scrollTop >= 1220) {this.statekey = 5;}
          // if (scrollTop >= 1420) {this.statekey = 6;}
          // if (scrollTop >= 1620) {this.statekey = 7;}
          // if (scrollTop >= 1820) {this.statekey = 8;}
          // if (scrollTop >= 2020) {this.statekey = 9;}
          // if (scrollTop >= 2040) {this.statekey = 10;}
          // if (scrollTop >= 2060) {this.statekey = 11;}
        } else {
          this.searchBarFixed = false;
        }
    },
    selectli(item){
      this.statekey=item
      // if(item===0){window.scrollTo(0,300)}
      // if(item===1){window.scrollTo(0,400)}
      // if(item===2){window.scrollTo(0,500)}
      // if(item===3){window.scrollTo(0,600)}
      // if(item===4){window.scrollTo(0,700)}
      // if(item===5){window.scrollTo(0,800)}
      // if(item===6){window.scrollTo(0,1000)}
      // if(item===7){window.scrollTo(0,1200)}
      // if(item===8){window.scrollTo(0,1400)}
      // if(item===9){window.scrollTo(0,1600)}
      // if(item===10){window.scrollTo(0,1800)}
    },
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () { // 销毁绑定
    window.removeEventListener('scroll', this.handleScroll)
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.signatureDetails_warp{
  @include size(100%,auto);
  overflow: hidden;
  .signatureDetails_title{
    @include size(1920px,420px);
    margin:0 auto;
    overflow: hidden;
    background: url('../../../../../../../assets/image/icon_signdetailBJ.jpg') no-repeat center center;
    .contractView{
      @include size(308px,98px);
      color:#fff;
      line-height: 98px;
      text-align: center;
      border:1px solid #fff;
      margin-top:102px;
      margin-left: 806px;
      font-size: 38px;
    }
  }
  .signatureDetails_left{
    @include size(124px,auto);
    background: #fff;
    display: none;
    ul{
      @include size(100%,auto);
      li{
        @include size(100%,48px);
        box-sizing: border-box;
        border-bottom: solid 1px #f3f3f3;
        text-align: center;
        line-height: 48px;
        color:#646463;
        font-size: 14px;
        cursor: pointer;
      }
      li:hover{
        box-sizing: border-box;
        border-left:2px solid var(--Colors);
        color:var(--Colors); 
      }
      .liActive{
        box-sizing: border-box;
        border-left:2px solid var(--Colors);
        color:var(--Colors); 
      }
    }
  }
  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 104px;
    // z-index: 999;
    left:154px;
    display: block !important;
  }
  .signatureDetails_list{
    @include size(1200px,auto);
    background: #ffffff;
    margin:0 auto;
    margin-top:-127px;
    .signatureDetails_proess{
      @include size(100%, 127px);
      background: #ebeeec;
      box-sizing: border-box;
      background: url('../../../../../../../assets/image/icon_bu_bg.png') no-repeat center center;
      &_cont {
        height:64px;
        background: url('../../../../../../../assets/image/icon_bu042.png') no-repeat center center;
        padding-top:60px;
        margin:auto 80px ;
        position: relative;
        padding-left: 78px;
        span{
          display: inline-block;
          text-align: center;
          line-height: 85px;
          color:var(--Colors);
          width:240px;
          &:nth-child(2){
            width:180px;
          }
          &:nth-child(3){
            color:#999999;
          }
          &:nth-child(4){
            width:190px;
            color:#999999;
          }
        }
      }
    }
    .signatureDetails_cont{
      @include size(100%,auto);
      box-sizing: border-box;
      padding: 20px 62px 10px 117px;
      .signNum{
        @include size(100%,60px);
        .signNumCon{
          float: right;
          p{
            color: #666666;
            font-size: 14px;
            line-height: 30px;
          }
        }
      }
      .signtitle{
        @include size(100%,auto);
        text-align: center;
        line-height: 50px;
        color: #666666;
        font-size: 26px;
        margin: 30px 0;
        div{
          float: right;
          @include size(110px,34px);
	        border-radius: 0px 17px 17px 0px;
          font-size: 14px;
          line-height: 35px;
          margin-top:7px;
          span{
            display: inline-block;
            @include size(5px,5px);
            background-color: #ffffff;
            border-radius: 50%;
            margin-right: 10px;
            vertical-align:middle;
          }
        }
        .contractCancel{
          background: #ebebeb;
          color: #999999;
        }
        .contractsuccess{
          background: #e7f4bd;
          color: #93b52d;
        }
        .contractnosuccess{
          background: #ffd6d7;
          color: #fe3f45;
        }
      }
      .signaturelist{
        @include size(100%,auto);
        .signaturelistcon{
          @include size(420px,50px);
          line-height: 44px;
          float: left;
          span{
            color: #fe3f45;
          }
          .signaturelistconTitle{
            display: inline-block;
            @include size(120px,auto);
            border-bottom:none;
            color:#999999;
          }
          .signaturelistdetail{
            @include size(292px,auto);
            display: inline-block;
            box-sizing: border-box;
            border-bottom: solid 2px #f3f3f3;
          }
        }
        .signaturelistcon:nth-of-type(2n){
          margin-left: 130px;
        }
      }
      .signlist{
        @include size(100%,auto);
        color: #999999;
        font-size: 14px;
        line-height: 35px;
        margin-top:70px;
        .signlistTi{
          color: #666666;
          font-size: 16px;
          font-weight: bold;
          line-height: 50px;
        }
        .signlistwarp{
          @include size(870px,235px);
	        border: solid 1px #979797;
          box-sizing: border-box;
          padding:40px 68px 10px 119px;
          display: flex;
          flex-wrap: wrap;
          .signlistwarpTi{
            @include size(340px,auto);
            span{
              display: inline-block;
              // @include size(70px,auto);
              font-size: 12px;
              color: #666666;
              text-align: right;
            }
          }
          .signlistwarptime{
            @include size(100%,auto);
            text-align: right;
            span{
              margin-left: 40px;
            }
          }
        }
        .signlistenclosure{
          @include size(100%,auto);
          li{
            line-height: 30px;
            font-size: 14px;
            color:#666666;
            cursor: pointer;
            span{
              color:var(--lightColor);
            }
          }
        }
      }
      .button{
        @include size(80px,36px);
        background-color: var(--Colors);
        border-radius: 2px;
        cursor: pointer;
        text-align: center;
        color:#fff;
        line-height: 36px;
        margin: 50px 0;
      }
    }
  }
}
</style>
