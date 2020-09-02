<template>
  <div class="signatureDetails_warp">
    <div class="signatureDetails_title">
      <div class="contractView">转让合同</div>
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
        <div id="pdfCentent" style="padding: 20px;">
          <div class="signNum signlist0 signlist1">
            <div class="signNumCon">
              <!-- 合同编号->合同统一编码 gaojie  2020-6-23-->
              <!-- <p>合同编号：{{transSignTemplateData.code}}</p> -->
              <p>合同统一编码：{{transSignTemplateData.recordNo}}</p>
              <p>合同类型：转让合同</p>
            </div>
          </div>
          <div class="signtitle" v-if="transSignTemplateData.contractStatus">
            {{transSignTemplateData.contractName}}
            <div
              v-if="transSignTemplateData.contractStatus==='contract_status-003'||transSignTemplateData.contractStatus==='contract_status-004'||transSignTemplateData.contractStatus==='contract_status-011'"
              class="contractCancel"
            >{{transSignTemplateData.contractStatusName}}</div>
            <div
              v-if="transSignTemplateData.contractStatus==='contract_status-005'||transSignTemplateData.contractStatus==='contract_status-007'||transSignTemplateData.contractStatus==='contract_status-008'"
              class="contractsuccess"
            >{{transSignTemplateData.contractStatusName}}</div>
            <div
              v-if="transSignTemplateData.contractStatus==='contract_status-006'||transSignTemplateData.contractStatus==='contract_status-009'"
              class="contractnosuccess"
            >{{transSignTemplateData.contractStatusName}}</div>
          </div>
          <div class="signDetail">
            <el-form :model="transSignTemplateData"  class="demo-form-inline" :inline="true" label-position="left">
              <el-form-item label="甲方(转让方)：" required  style="width:96%" class="lineWid">
                <div>{{transSignTemplateData.firstParty}}</div>
              </el-form-item>
              <el-form-item label="甲方证件类型："  required :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.firstIdentificationTypeName}}</div>
              </el-form-item>
              <el-form-item :label="transSignTemplateData.firstIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
                <div>{{transSignTemplateData.firstIdentificationNum}}</div>
              </el-form-item>
              <el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="transSignTemplateData.firstIdentificationType=='business_license'">
                <div>{{transSignTemplateData.firstLegalPerson}}</div>
              </el-form-item>
              <el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="transSignTemplateData.firstIdentificationType=='business_license'">
                <div>{{transSignTemplateData.firstLegalPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.firstAgentPerson}}</div>
              </el-form-item>
              <el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.firstAgentPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="甲方联系电话：" required :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.firstPhone}}</div>
              </el-form-item>
              <el-form-item label="甲方联系地址：" required :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.firstAddress}}</div>
              </el-form-item>
              <el-form-item label="乙方(受让方)：" required  style="width:96%" class="lineWid">
                <div>{{transSignTemplateData.secondParty}}</div>
              </el-form-item>
              <el-form-item label="乙方证件类型："  required :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.secondIdentificationTypeName}}</div>
              </el-form-item>
              <el-form-item :label="transSignTemplateData.secondIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
                <div>{{transSignTemplateData.secondIdentificationNum}}</div>
              </el-form-item>
              <el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="transSignTemplateData.secondIdentificationType=='business_license'">
                <div>{{transSignTemplateData.secondLegalPerson}}</div>
              </el-form-item>
              <el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="transSignTemplateData.secondIdentificationType=='business_license'">
                <div>{{transSignTemplateData.secondLegalPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.secondAgentPerson}}</div>
              </el-form-item>
              <el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.secondAgentPersonIdNum}}</div>
              </el-form-item>
              <el-form-item label="乙方联系电话：" required :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.secondPhone}}</div>
              </el-form-item>
              <el-form-item label="乙方联系地址：" required :style="{'width':formLabelWidth}" >
                <div>{{transSignTemplateData.secondAddress}}</div>
              </el-form-item>
            </el-form>
          </div>
          <div class="signlist signlist2">
            <p class="signlistTi">第一条 转让宗地的基本情况</p>
            <p>1.土地坐落:{{transSignTemplateData.landLocation?transSignTemplateData.landLocation:'无'}}</p>
            <p>2.土地性质:{{transSignTemplateData.landCharName?transSignTemplateData.landCharName:'无'}}</p>
            <p>3.使用权类型:{{transSignTemplateData.useTypeName?transSignTemplateData.useTypeName:'无'}}</p>
            <p>4.土地用途:{{transSignTemplateData.firstClassUseName}}{{transSignTemplateData.secondClassUseName}}</p>
            <p>5.不动产权证号（或土地证号）:{{transSignTemplateData.warrantNum?transSignTemplateData.warrantNum:'无'}}</p>
            <p>6.房产证号:{{transSignTemplateData.houseNum?transSignTemplateData.houseNum:'无'}}</p>
            <p>7.建设用地使用权出让合同号（或划拨决定书号）:{{transSignTemplateData.contractNum?transSignTemplateData.contractNum:'无'}}</p>
            <p>8.转让土地面积:{{transSignTemplateData.area?transSignTemplateData.area:0}}平方米</p>
            <p>9.转让建筑物面积:{{transSignTemplateData.buildArea?transSignTemplateData.buildArea:0}}平方米</p>
            <p>10.地块的具体位置详见附图，附图已经双方签字盖章确认</p>
          </div>
          <div class="signlist signlist3">
            <p class="signlistTi">第二条 剩余使用年限</p>
            <p>建设用地使用权剩余使用期限为 {{transSignTemplateData.term}} 年,即{{transSignTemplateData.beginDate}}至{{transSignTemplateData.endDate}}(剩余使用期限不得超过原出让(或出租)合同约定的使用年限减去甲方已使用年限后的剩余年限)。</p>
          </div>
          <div class="signlist signlist4">
            <p class="signlistTi">第三条 转让价款及支付方式</p>
            <p>1.转让总金额人民币（大写）{{transSignTemplateData.total}}（小写）{{(transSignTemplateData.total3)/10000}}万元，
              其中土地转让金额人民币（大写）{{NumToChinese(transSignTemplateData.landTransfer)}}（小写）{{Division(transSignTemplateData.landTransfer)}}万元，
              附着物转让金额人民币（大写）{{transSignTemplateData.attachTransfer?NumToChinese(transSignTemplateData.attachTransfer):'零元整'}}（小写） {{Division(transSignTemplateData.attachTransfer)}}万元。
              交易发生的各项税费由甲、乙双方按照有关规定承担。</p>
            <!-- <p>1.转让总金额人民币（大写）{{transSignTemplateData.total}}（小写）{{(transSignTemplateData.total3)/10000}}万元，其中土地转让金额人民币（大写）{{transSignTemplateData.total1}}（小写 ）{{transSignTemplateData.landTransfer/10000}}万元，附着物转让金额人民币（大写）{{transSignTemplateData.total2}}（小写） {{transSignTemplateData.attachTransfer/10000}}万元。交易发生的各项税费由甲、乙双方按照有关规定承担。</p> -->
            <p>2.付款方式:{{transSignTemplateData.payment?transSignTemplateData.payment:'无'}}</p>
          </div>
          <div class="signlist signlist5">
            <p class="signlistTi">第四条 转让双方权利义务</p>
            <p>(一)甲方的权利义务</p>
            <p>1.有权获得土地使用权及地上建筑物、其他附着物所有权转让价款;</p>
            <p>2.甲方于合同签订30日之内前将土地及地上建(构)筑物、其他附着物交付乙方;</p>
            <p>3.甲方保证本合同第一条所述内容真实,保证不动产权属清晰,符合法律、法规、规章和有关政策规定的以及原出让(或出租、划拨决定书)合同约定的土地使用权转让应具备的条件;</p>
            <p>4.法律、法规、规章和政策规定的其他权利和义务;</p>
            <p>5.双方约定的甲方其它权利或义务请写在附件中。</p>
            <p>(二)乙方的权利义务</p>
            <p>1.乙方有义务无条件全面继受原《建设用地使用权出让(或出租)合同》(或划拨决定书)及《补充协议》确定的权利义务;</p>
            <p>2.乙方应按约及时足额支付转让价款;</p>
            <p>3.乙方在本合同项下宗地内进行建设时,有关用水、用气、污水及其他设施与宗地外主管线、用电变电站接口和引入工程,乙方按有关规定办理;</p>
            <p>4.乙方同意政府为公用事业需要而敷设的各种管道与管线进出、通过、穿越受让宗地,但由此影响受让宗地使用功能的,政府或公用事业营建主体应当给予合理补偿。法律、法规、规章和政策所规定的其他权利和义务;</p>
            <p>5.乙方应当按照《建设用地使用权出让(或出租)合同》(或划拨决定书)约定的土地用途、容积率利用土地,不得擅自改变。</p>
            <p>6.乙方按照本合同约定支付全部建设用地使用权转让价款,领取不动产权证书后,有权将本合同项下的全部或部分建设用地使用权转让。</p>
            <p>7.双方约定的乙方其它权利或义务请写在附件中详细说明</p>
          </div>
          <div class="signlist signlist6">
            <p class="signlistTi">第五条 违约责任</p>
            <p>1.本合同生效后,甲乙双方均应当履行本合同约定的义务,任何一方如有违反,应赔偿由此给对方造成的损失。</p>
            <p>2.乙方应当按照本合同约定,按时支付建设用地使用权转让价款。乙方不能按时支付建设用地使用权转让价款的,自违约之日起,每日按迟延支付款项的 15‰向转让人缴纳违约金,延期付款超过60日,经甲方催交后仍不能支付建设用地使用权转让价款的,甲方有权解除合同,并可请求乙方赔偿损失。</p>
            <p>3.因一方违约导致合同解除的,违约方应按转让成交价总额的 10 %承担违约责任,给对方造成损失的,违约方还应当依法承担赔偿责任</p>
            <p>4.乙方按本合同约定支付建设用地使用权转让价款的,甲方必须按照本合同约定按时交付出让土地。由于甲方未按时提供转让土地而致使乙方本合同项下宗地占有延期的,每延期一日,甲方应当按乙方已经支付的建设用地使用权转让价款的_%向乙方给付违约金,土地使用年期自实际交付土地之日起算。甲方延期交付土地超过日,经乙方催交后仍不能交付土地的,乙方有权解除合同,要求甲方退还已经支付建设用地使用权转让价款,并可请求甲方赔偿损失。</p>
            <p>5.甲乙双方应在本合同签署之日起30日内,共同到建设用地二级市场交易服务中心申请办理转让手续,同时按规定缴纳相关税费。一方逾期不配合办理的,每逾期一日,按转让价款总额的 15 ‰支付违约金。</p>
          </div>
          <div class="signlist signlist7">
            <p class="signlistTi">第六条 合同解除</p>
            <p>1.甲乙双方协商一致后,可解除本合同。</p>
            <p>2.乙方迟延履行支付款项义务,经甲方催告后在合理期限内仍未履行的,甲方有权解除本合同。</p>
            <p>3.甲方拒不履行配合乙方办理转让相关手续或因甲方原因造成迟延交付建设用地使用权的,经乙方催告后在合理期限内仍未履行的,乙方有权解除本合同。</p>
            <p>4.甲乙双方约定的其他情形请在附件中约束。</p>
          </div>
          <div class="signlist signlist8">
            <p class="signlistTi">第七条 其他约定事项</p>
            <p>甲乙双方确定,若以下约定内容与本合同其他款项约定约定存在不一致的,以本条约定内容为准:</p>
          </div>
          <div class="signlist signlist9">
            <p class="signlistTi">第八条 争议解决</p>
            <p>双方在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也可向行政主管部门申请行政调解。协商或调解不成的,可选择以下第_种方式解决纠纷。</p>
            <p>1.向成都仲裁委员会申请仲裁。</p>
            <p>2.向不动产所在地人民法院提起诉讼。</p>
          </div>
          <div class="signlist signlist10">
            <p class="signlistTi">第九条 附则</p>
            <p>1.甲乙双方应遵守国家相关政策、法规,并按规定交纳税费。2.本合同自甲乙双方签字、盖章之日起生效。</p>
            <p>3.本合同一式份,甲方执份,乙方执份,建设用地二级市场交易服务中心存档壹份,每份具有同等法律效力。</p>
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
          <div class="signlist signlist11">
            <p class="signlistTi">附件</p>
            <ul class="signlistenclosure" v-if="tableData&&tableData!==null">
              <li v-for="(item,index) in tableData" :key="index">
                <a :href="baseUrl + item.files[0].fid" v-if="item.files&&item.files[0]&&item.files[0].fid">
                  <span style="color: var(--lightColor);" v-if="item.files.length!= 0">{{index+1}}.</span>
                  <span style="color: var(--lightColor);">{{item.files.length== 0?'':item.files[0].fname}}</span>
                </a>
              </li>
            </ul>
            <ul class="signlistenclosure" v-else>无</ul>
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
      transSignTemplateData: {},
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
        "第七条",
        "第八条",
        "第九条",
        "签字部分",
        "附件"
      ],
      screenWidth: document.documentElement.clientWidth,
      tableData: [],
      belongId: null,
      areaCode: null,
      htmlTitle:"转让合同"
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
          if (res.data.code == "0000") {
            this.transSignTemplateData = res.data.data.list[0];
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
      console.log(item);
      var el = document.getElementsByClassName(`signlist${item}`)[0];
      console.log(el);
      this.$nextTick(function() {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 50 });
      });
    },
    back() {
      this.$router.replace("/PersonalCenter/registerContract");
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
    @include size(100%, 420px);
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
      li.liActive {
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