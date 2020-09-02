<template>
  <div class="signatureDetails_warp">
    <div class="signatureDetails_title">
      <div class="contractView">出租合同</div>
    </div>
    <div class="signatureDetails_left" :class="searchBarFixed == true ? 'isFixed' :''">
      <ul>
        <li
          v-for="(item,index) in detailsleftData"
          :key="index"
          @click="selectli(index)"
          :class="{liActive:statekey == index}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="signatureDetails_list">
      <div class="epf_proess">
        <div class="epf_proess_cont" style="width:90%;margin-left:5%;">
          <epf-step :active="active" :data="['填写信息','合同审核','合同鉴证','完成']"></epf-step>
        </div>
      </div>
      <div class="signatureDetails_cont">
        <div ref="imageWrapper" id="pdfCentent" style="padding: 20px;">
          <div class="signNum">
            <div class="signNumCon">
              <!-- 合同编号->合同统一编码 gaojie  2020-6-23-->
              <!-- <p>合同编号：{{rules.code}}</p> -->
              <p>合同统一编码：{{rules.recordNo}}</p>
              <p>合同类型：出租合同</p>
            </div>
          </div>
          <div class="signtitle signlist0 signlist1" v-if="rules.contractStatus">
            {{rules.contractName}}
            <div
              v-if="rules.contractStatus==='contract_status-003'||rules.contractStatus==='contract_status-004'||rules.contractStatus==='contract_status-011'"
              class="contractCancel"
            >{{rules.contractStatusName}}</div>
            <div
              v-if="rules.contractStatus==='contract_status-005'||rules.contractStatus==='contract_status-007'||rules.contractStatus==='contract_status-008'"
              class="contractsuccess"
            >{{rules.contractStatusName}}</div>
            <div
              v-if="rules.contractStatus==='contract_status-006'||rules.contractStatus==='contract_status-009'"
              class="contractnosuccess"
            >{{rules.contractStatusName}}</div>
            <!-- <div v-if="rules.contractStatus==='contract_status-007'" class="contractCancel">
              <span></span>合同已撤销
            </div>
            <div v-if="rules.contractStatus==='contract_status-005'" class="contractsuccess">
              <span></span>审核通过
            </div>
            <div v-if="rules.contractStatus==='contract_status-006'" class="contractnosuccess">
              <span></span>审核未通过
            </div>
            <div v-if="rules.contractStatus==='contract_status-004'" class="contractCancel">
              <span></span>审核中
            </div>
            <div v-if="rules.contractStatus==='contract_status-003'" class="contractCancel">
              <span></span>撤销审核中
            </div>-->
          </div>
          <div class="signDetail">
            <el-form :model="rules"  class="demo-form-inline" :inline="true" label-position="left">
              <el-form-item label="甲方(出租人)：" required  style="width:96%" class="lineWid">
                <div>{{rules.firstParty}}</div>
              </el-form-item>
              <el-form-item label="甲方证件类型："  required :style="{'width':formLabelWidth}" >
                <div>{{rules.firstIdentificationTypeName}}</div>
              </el-form-item>
              <el-form-item :label="rules.firstIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
                <div>{{rules.firstIdentificationNum}}</div>
              </el-form-item>
              <el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="rules.firstIdentificationType=='business_license'">
                <div>{{rules.firstLegalPerson}}</div>
              </el-form-item>
              <el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="rules.firstIdentificationType=='business_license'">
                <div>{{rules.firstLegalPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
                <div>{{rules.firstAgentPerson}}</div>
              </el-form-item>
              <el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
                <div>{{rules.firstAgentPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="甲方联系电话：" required :style="{'width':formLabelWidth}" >
                <div>{{rules.firstPhone}}</div>
              </el-form-item>
              <el-form-item label="甲方联系地址：" required :style="{'width':formLabelWidth}" >
                <div>{{rules.firstAddress}}</div>
              </el-form-item>
              <el-form-item label="乙方(承租人)：" required  style="width:96%" class="lineWid">
                <div>{{rules.secondParty}}</div>
              </el-form-item>
              <el-form-item label="乙方证件类型："  required :style="{'width':formLabelWidth}" >
                <div>{{rules.secondIdentificationTypeName}}</div>
              </el-form-item>
              <el-form-item :label="rules.secondIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
                <div>{{rules.secondIdentificationNum}}</div>
              </el-form-item>
              <el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="rules.secondIdentificationType=='business_license'">
                <div>{{rules.secondLegalPerson}}</div>
              </el-form-item>
              <el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="rules.secondIdentificationType=='business_license'">
                <div>{{rules.secondLegalPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
                <div>{{rules.secondAgentPerson}}</div>
              </el-form-item>
              <el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
                <div>{{rules.secondAgentPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="乙方联系电话：" required :style="{'width':formLabelWidth}" >
                <div>{{rules.secondPhone}}</div>
              </el-form-item>
              <el-form-item label="乙方联系地址：" required :style="{'width':formLabelWidth}" >
                <div>{{rules.secondAddress}}</div>
              </el-form-item>
            </el-form>
          </div>
          <div class="signlist signlist2">
            <p class="signlistTi">第一条 出租宗地的基本情况</p>
            <p>1.土地坐落:{{rules.landLocation}}</p>
            <p>2.土地性质:{{rules.landCharName}}</p>
            <p>3.使用权类型:{{rules.useTypeName}}</p>
            <p>4.土地用途:{{rules.firstClassUseName}}{{rules.secondClassUseName}}</p>
            <p>5.不动产权证号:{{rules.warrantNum}}</p>
            <p>6.房产证号:{{rules.houseNum}}</p>
            <p>7.土地证号:{{rules.warrantNum}}</p>
            <p>8.出租土地面积:{{rules.area}}平方米</p>
            <p>9.出租建筑物面积:{{rules.buildArea}}平方米</p>
            <p>10.地块的具体位置详见附图，附图已经双方签字盖章确认</p>
          </div>
          <div class="signlist signlist3">
            <p class="signlistTi">第二条 租赁期限</p>
            <p>本合同项下的建设用地使用权及地上建筑物、其他附着物所有权租赁年限为 {{rules.term}}个月,即{{rules.beginDate}}至{{rules.endDate}}止。</p>
          </div>
          <div class="signlist signlist4">
            <p class="signlistTi">第三条 租金缴纳</p>
            <p>1.乙方同意按本合同规定向甲方支付租金。</p>
            <!-- <p>2.本合同出租不动产租金为人民币（大写） {{rules.rent1}} /月（小写）{{rules.rent/10000}}万/月,总租金为人民币（大写） {{rules.total}} （小写）{{(rules.rent*rules.term)/10000}}万元。</p> -->
            <p>2.本合同出租不动产租金为人民币（大写） {{NumToChinese(rules.rent)}} /月（小写）{{Division(rules.rent)}}万元/月,
              <!-- 总租金为人民币（大写） {{NumToChinese(rules.rent*rules.term)}} （小写）{{Division(rules.rent*rules.term)}}万元。</p> -->
              总租金为人民币（大写） {{NumToChinese(Division(rules.total3,1000))}} （小写）{{Division(rules.total3,10000000)}}万元。</p>
            <p>3.付款方式：{{rules.payment}}</p>
          </div>
          <div class="signlist signlist5">
            <p class="signlistTi">第四条 双方的权利与义务</p>
            <p>(一)甲方的权利义务</p>
            <p>1.甲方有权按本合同约定向乙方收取租金;</p>
            <p>2.甲方有义务30日前将本合同项下的建设用地及地上建筑物、其他附着物交付乙方使用;</p>
            <p>3.甲方有义务协助乙方办理相关租赁备案手续;</p>
            <p>4.租赁期间,除法律、行政法规及本合同另有约定外,甲方不得擅自收回建设用地使用权及地上建筑物、其他附着物使用权;</p>
            <p>5.甲方有权监督乙方按法定用途使用土地,乙方擅自改变土地用途的,甲方有权提前收回建设用地使用权及地上建筑物、其他附着物使用权;</p>
            <p>6.甲方保证租赁期间未经乙方同意,不设立供役地义务等影响乙方正常使用土地及地上建筑物、其他附着物的权利负担;</p>
            <p>7.以划拨方式取得的建设用地使用权经依法批准出租的,甲方有义务按照有关规定上缴应缴的土地出让收益金;</p>
            <p>8.以出租方式取得的土地使用权,甲方将土地转租给乙方使用的,甲方应事先征得出让方的同意。</p>
            <p>9.双方约定的甲方其它权利或义务请写在附件中。</p>
            <p>(二)乙方的权利义务</p>
            <p>1.乙方有义务按时向甲方支付租金;</p>
            <p>2.乙方有义务按法定用途使用土地;</p>
            <p>3.乙方租赁土地上修建建(构)筑物的,需要按临时建筑办理相关规划、建设、环保等手续,接受国土、规建、环保等部门监管,不办理不动产登记;</p>
            <p>4.乙方不得将租赁建设用地及地上建筑物、其他附着物进行转让、抵押,未经甲方同意,不得转租给第三方;</p>
            <p>5.租赁期限届满或本合同提前终止的,乙方需及时、完好地向甲方交还本合同项下建设用地及地上建筑物、其他附着物;</p>
            <p>6.双方约定的其它权利或义务请写在附件中。</p>
          </div>
          <div class="signlist signlist6">
            <p class="signlistTi">第五条 违约责任</p>
            <p>1.本合同生效后,甲乙双方均应当履行本合同约定的义务,任何一方如有违反,应赔偿由此给对方造成的损失。</p>
            <p>2.乙方应当按照本合同约定,按时支付建设用地使用权租金。乙方不能按时支付建设用地使用权租金的,自违约之日起,每日按迟延支付款项的_15‰向出租人缴纳违约金,延期付款超过日,经甲方催交后仍不能支付建设用地使用权租金的,甲方有权解除合同,并可请求乙方赔偿损失。</p>
            <p>3.因一方违约导致合同解除的,违约方应按转让租赁价总额的_10___%承担违约责任,给对方造成损失的,违约方还应当依法承担赔偿责任。</p>
            <p>4.乙方按本合同约定支付建设用地使用权租金的,甲方必须按照本合同约定按时交付出让土地。由于甲方未按时提供转让土地而致使乙方本合同项下宗地占有延期的,每延期一日,甲方应当按乙方已经支付的建设用地使用权租货总价的_%向乙方给付违约金,土地使用年期自实际交付土地之日起算.甲方延期交付土地超过日,经乙方催交后仍不能交付土地的,乙方有权解除合同,退还已经支付建设用地使用权租金,并可请求甲方赔偿损失。</p>
            <p>5.甲乙双方应在本合同签署之日起___30_日内,共同到建设用地二级市场交易服务中心申请办理租赁备案手续,同时按规定缴纳相关税费。一方逾期不配合办理的,每逾期一日,按租金总额的_15‰支付违约金。</p>
          </div>
          <div class="signlist signlist7">
            <p class="signlistTi">第六条约定事项</p>
            <p>1.对本合同的任何变更,需经双方同意并以书面形式作出方可生效,双方需持变更后的书面协议到建设用地二级市场交易服务中心办理租赁备案变更。</p>
            <div>
              2.有下列情形之一,本合同终止:
              <p>(1)本合同约定的租赁期限届满;</p>
              <p>(2)租赁期内,双方就合同终止达成一致;</p>
              <p>(3)任何一方因地震、水灾、战争等不可抗力丧失继续履行本合同的能力;</p>
              <p>(4)根据法律、法规的规定,或有管辖权的法院或仲裁机构所作出的终止本合同的判决、裁定或决定而终止本合同;</p>
              <p>(5)其它</p>
            </div>

            <p>3.建设用地使用权及地上建筑物、其他附着物所有权租赁期限届清后,乙方需要继续租赁的,应当在期限届满前___3_月前申请续期,在同等条件下,乙方口是口否享有优先承租权,甲方同意续期的,乙方应当与甲方重新签订租赁合同,并到建设用地二级市场交易服务中心办理租赁备案。</p>
            <p>4.甲乙双方应遵守国家相关政策、法规,并按规定交纳税费。以划拨方式取得的建设用地使用权出租的,应经依法批准,并按照有关规定上缴应缴的土地出让收益金。</p>
            <p>5.本合同经双方签字、盖章生效。</p>
            <p>6.本合同一式份,甲方执份,乙方执份,建设用地二级市场交易服务中心备案壹份,每份具有同等法律效力。</p>
            <p>7.甲乙双方确定,若以下约定内容与本合同其他款项约定约定存在不一致的,以本条约定内容为准:</p>
          </div>
          <div class="signlist signlist8">
            <p class="signlistTi">第七条 争议解决</p>
            <p>双方在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也可向行政主管部门申请行政调解。协商或调解不成的,可选择以下第种方式解决纠纷。</p>
            <p>1.向成都仲裁委员会申请仲裁。</p>
            <p>2.向不动产所在地人民法院提起诉讼。</p>
            <div class="signlistwarp">
              <div class="signlistwarpTi">
                <span>甲方盖章(或签字):</span>
              </div>
              <div class="signlistwarpTi">
                <span>乙方盖章(或签字):</span>
              </div>
              <div class="signlistwarpTi">
                <span>甲方代表(签字):</span>
              </div>
              <div class="signlistwarpTi">
                <span>乙方代表(签字):</span>
              </div>
              <div class="signlistwarptime">
                <span>年</span>
                <span>月</span>
                <span>日</span>
              </div>
            </div>
          </div>
          <div class="signlist signlist9" id="signlistTi11">
            <p class="signlistTi">附件</p>
            <ul class="signlistenclosure" v-if="tableData">
              <li v-for="(item,index) in tableData" :key="index">
                <a
                  :href="baseUrl + item.files[0].fid"
                  v-if="item.files&&item.files[0]&&item.files[0].fid"
                >
                  <span style="color: var(--lightColor);" v-if="item.files.length!= 0">{{index+1}}.</span>
                  <span style="color: var(--lightColor);">{{item.files.length== 0?'':item.files[0].fname}}</span>
                </a>
              </li>
            </ul>
            <ul v-else>暂无</ul>
          </div>
        </div>
        <div>
          <span class="button" style="margin-right:10px;" @click="$router.go(-1)">返回</span>
          <span class="button" @click="ExportSavePdf('pdfCentent',htmlTitle)">下载</span>
         
        </div>
        <!-- <div style="clear:both;"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      active:2,
			formLabelWidth: "48%",
      rules:{},
      statekey: 1,
      state: 1,
      isShowHeader: false,
      searchBarFixed: false,
      detailsleftData: [
        "甲方",
        "乙方",
        "第一条",
        "第二条",
        "第三条",
        "第四条",
        "第五条",
        "第六条",
        "签字部分",
        "附件"
      ],
      screenWidth: document.documentElement.clientWidth,
      tableData: [],
      belongId: null,
      areaCode: null,
      htmlTitle:"出租合同"
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.init();
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
      this.active=this.$route.query.contactState
  },
  methods: {
    init() {
      let token = localStorage.getItem("token");
      // axios.post("/api/epf-contract/transContract/selectOne", qs.stringify({token:token,contractId:this.$route.query.contractId})).then( res => {
      axios
        .post(
          // "/api/epf-contract/transContract/selectOne",
          "/api/epf-landweb/transContract/selectOne",
          qs.stringify({
            token: token,
            contractId: this.$route.query.contractId
          })
        )
        .then(res => {
          console.log("ddddddddd", res);
          if (res.data.code == "0000") {
            this.rules = res.data.data.list[0];
            this.belongId = res.data.data.list[0].fileId;
            this.areaCode = res.data.data.list[0].cantonArea;
            this.$axios.get(
              `/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${this.belongId}&areaCode=${this.areaCode}`,
              {},
              res => {
                let resData = JSON.parse(res.ztreeJson);
                console.log("附件清单", resData);
                for (let i = 0; i < resData.length; i++) {
                  if (resData[i].code.indexOf("CONTRACT") != -1) {
                    //附件清单
                    this.tableData = resData[i].childData;
                  }
                }
                this.seeFlie();
              }
            );
          }
        })
        .catch(data => {
          this.$message.error(data);
        });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth;
      if (scrollTop > 410 && this.screenWidth > 1600) {
        this.searchBarFixed = true;
        for (let i = 0; i < this.detailsleftData.length; i++) {
          if (
            scrollTop >=
            document.getElementsByClassName(`signlist${i}`)[0].offsetTop - 200
          ) {
            this.statekey = i;
          }
        }
      } else {
        this.searchBarFixed = false;
      }
    },
    selectli(item) {
      this.statekey = item;
      var el = document.getElementsByClassName(`signlist${item}`)[0];
      if (el) {
        this.$nextTick(function() {
          window.scrollTo({ behavior: "smooth", top: el.offsetTop - 50 });
        });
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        if (that.screenWidth < 1600) {
          that.searchBarFixed = false;
        } else {
          that.searchBarFixed = true;
        }
      })();
    };
  },
  destroyed() {
    // 销毁绑定
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.signatureDetails_warp {
  @include size(100%, auto);
  overflow: hidden;
  .signatureDetails_title {
    @include size(auto, 420px);
    margin: 0 auto;
    overflow: hidden;
    background: url("../../../../../../../assets/image/icon_signdetailBJ.jpg")
      no-repeat center center;
    display: flex;
    justify-content: center;
    align-items: center;
    .contractView {
      @include size(308px, 98px);
      color: #fff;
      line-height: 98px;
      text-align: center;
      border: 1px solid #fff;
      font-size: 38px;
    }
  }
  .signatureDetails_left {
    @include size(124px, auto);
    background: #fff;
    display: none;
    ul {
      @include size(100%, auto);
      li {
        @include size(100%, 48px);
        box-sizing: border-box;
        border-bottom: solid 1px #f3f3f3;
        text-align: center;
        line-height: 48px;
        color: #646463;
        font-size: 14px;
        cursor: pointer;
      }
      li:hover {
        box-sizing: border-box;
        border-left: 2px solid var(--Colors);
        color: var(--Colors);
      }
      .liActive {
        box-sizing: border-box;
        border-left: 2px solid var(--Colors);
        color: var(--Colors);
      }
    }
  }
  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 104px;
    left: 154px;
    display: block !important;
  }
  .signatureDetails_list {
    @include size(1200px, auto);
    background: #ffffff;
    margin: 0 auto;
    margin-top: -127px;
    .signatureDetails_cont {
      @include size(100%, auto);
      box-sizing: border-box;
      padding: 20px 62px 10px 117px;
      .signNum {
        @include size(100%, 60px);
        .signNumCon {
          float: right;
          p {
            color: #666666;
            font-size: 14px;
            line-height: 30px;
          }
        }
      }
      .signtitle {
        @include size(100%, auto);
        text-align: center;
        line-height: 50px;
        color: #666666;
        font-size: 26px;
        margin: 30px 0;
        div {
          float: right;
          @include size(110px, 34px);
          border-radius: 0px 17px 17px 0px;
          font-size: 14px;
          line-height: 35px;
          margin-top: 7px;
          span {
            display: inline-block;
            @include size(5px, 5px);
            background-color: #ffffff;
            border-radius: 50%;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
        .contractCancel {
          background: #ebebeb;
          color: #999999;
        }
        .contractsuccess {
          background: #e7f4bd;
          color: #93b52d;
        }
        .contractnosuccess {
          background: #ffd6d7;
          color: #fe3f45;
        }
      }
      .signaturelist {
        @include size(100%, auto);
        display: flex;
        flex-wrap: wrap;
        .signaturelistcon {
          @include size(50%, 50px);
          line-height: 50px;
          display: flex;
          .signaturelistconTitle {
            @include size(30%, auto);
            border-bottom: none;
            color: #999999;
            span {
              color: #fe3f45;
              margin-right: 2px;
            }
          }
          .signaturelistdetail {
            @include size(60%, auto);
            box-sizing: border-box;
            border-bottom: solid 2px #f3f3f3;
          }
        }
      }
          .signaturelistdetail {
            @include size(60%, auto);
            box-sizing: border-box;
            border-bottom: solid 2px #f3f3f3;
          }
      .signlist {
        @include size(100%, auto);
        color: #333;
        font-size: 14px;
        line-height: 35px;
        margin-top: 70px;
        .signlistTi {
          color: #666666;
          font-size: 16px;
          font-weight: bold;
          line-height: 50px;
        }
        .signlistwarp {
          @include size(870px, 235px);
          border: solid 1px #979797;
          box-sizing: border-box;
          padding: 40px 68px 10px 119px;
          display: flex;
          flex-wrap: wrap;
          .signlistwarpTi {
            @include size(340px, auto);
            span {
              display: inline-block;
              // @include size(70px,auto);
              font-size: 12px;
              color: #666666;
              text-align: right;
            }
          }
          .signlistwarptime {
            @include size(100%, auto);
            text-align: right;
            span {
              margin-left: 40px;
            }
          }
        }
        .signlistenclosure {
          @include size(100%, auto);
          li {
            line-height: 30px;
            font-size: 14px;
            color: #666666;
            cursor: pointer;
            span {
              color: var(--lightColor);
            }
          }
        }
      }
      .button {
        @include size(80px, 36px);
        display: inline-block;
        background-color: var(--Colors);
        border-radius: 2px;
        cursor: pointer;
        text-align: center;
        color: #fff;
        line-height: 36px;
        margin: 50px 0;
      }
    }
  }
}
</style>
<style>
  .signDetail .el-form-item__content{width:57%;border-bottom: 2px solid rgb(243, 243, 243);height:40px;  }
  .signDetail .el-form-item__label{width:125px;}
  .lineWid .el-form-item__content{width:80%;}
</style>