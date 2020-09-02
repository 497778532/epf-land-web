<template>
  <el-tabs class="tabBox">
    <el-tab-pane label="我的合同">
      <epf-filter>
        <div class="epf_height_act" 
          :style="{'height':switchHeight + 'px'}">
          <el-row :gutter="2">
            <el-col :span="3">
              <span class="epf_form_title">合同编号 :</span>
            </el-col>
            <el-col :span="5">
              <el-input size="small" 
                placeholder="请输入合同编号" 
                v-model="ruleForm.contactNo">
              </el-input>
            </el-col>
            <el-col :span="3">
              <span class="epf_form_title">合同名称 :</span>
            </el-col>
            <el-col :span="5">
              <el-input size="small" 
                placeholder="请输入合同名称" 
                v-model="ruleForm.contractName">
              </el-input>
            </el-col>
            <el-col :span="4" :offset="3">
              <div class="epf_not_margin epf_btn epf_btn_bg" 
                @click="searchData">查询</div>
              <div class="epf_btn epf_btn_def" 
                @click="resetFilterInfo">重置</div>
            </el-col>
            
          </el-row>
          <el-row :gutter="2">
            <el-col :span="3" v-if="!closeTypeIpt">
              <span class="epf_form_title">合同类型 :</span>
            </el-col>
            <el-col :span="5" v-if="!isFlag && !closeTypeIpt">
              <el-select
                class="filterCirculatemode"
                placeholder="请选择合同类型"
                v-model="ruleForm.signType"
                size="small"
                @change="typeSelect(issueSell2,ruleForm.signType,$event)">
                <el-option
                  v-for="item in issueSell2"
                  :ref="item.zhCn"
                  :dictKey="item.dictKey"
                  :key="item.dictKey"
                  :value="item.zhCn"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <span class="epf_form_title">提交时间 :</span>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                class="filterDateSelecet"
                v-model="ruleForm.issueBeginDate"
                type="date"
                clearable
                size="small"
                value-format="yyyy-MM-dd"
                @change="typeSelect('issueBeginDate',ruleForm.issueBeginDate,$event)"
                placeholder="请选择开始时间"
              ></el-date-picker>
            </el-col>
            <el-col :span="1">
              <span class="epf_form_title epf_row_c">--</span>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                class="filterDateSelecet"
                v-model="ruleForm.issueEndDate"
                clearable
                size="small"
                type="date"
                value-format="yyyy-MM-dd"
                @change="typeSelect('issueEndDate',ruleForm.issueEndDate,$event)"
                placeholder="请选择结束时间"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="3" v-if="!closeTypeIpt">
              <span class="epf_form_title">状态 :</span>
            </el-col>
            <el-col :span="5" v-if="!isFlag && !closeTypeIpt">
              <el-select
                class="filterCirculatemode"
                placeholder="请选择状态"
                v-model="ruleForm.Status"
                size="small"
                @change="typeSelect(issueSell,ruleForm.Status,$event)">
                <el-option
                  v-for="item in issueSell"
                  :ref="item.zhCn"
                  :dictKey="item.dictKey"
                  :key="item.dictKey"
                  :label="item.zhCn"
                  :value="item.zhCn"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div style="height:20px;">
          <span class="flexibleSwitch" @click="flexSwitch">
            {{flexibleOpen?'收起搜索':'高级搜索'}}
            <i :class="flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
          </span>
        </div>
      </epf-filter>

      <epf-customTable
        :data="tableContentData"
        :config="config"
        v-loading="loading"
        tableTpe="contract"
        element-loading-text="拼命加载中...">
        <template v-slot:code="scope">
          <epf-column slot="code">
            <div class="modeMsg">
              <el-row class="box" @click="signatureDetails(scope.row)">
                <el-col :span="10">
                  <img class="defImage" src="@/assets/image/contractImg.png" />
                </el-col>
                <el-col :span="14" class="content">
                  <div class="tc_info_title hoverStyle" @click="signatureDetails(scope.row.contractStatus,scope.row.id,scope.row.contractType)">
                    {{scope.row.contractName}}
                  </div>
                  <div class="tc_info_area" v-if="scope.row.contractType==='transfer'" style="color:#ffa000!important;border:1px solid #ffa000;">转让合同</div>
                  <div class="tc_info_area" v-if="scope.row.contractType==='rent'" style="color:#9ebd43!important;border:1px solid #9ebd43;">出租合同</div>
                  <div class="tc_info_area" v-if="scope.row.contractType==='mortgage'" style="color:#517cd2!important;border:1px solid #517cd2;">抵押合同</div>
                </el-col>
              </el-row>
            </div>
          </epf-column>
        </template>
          <template v-slot:dealType="scope">
          <epf-column slot="dealType">
            <div class="epf_fie_box">
              <span class="epf_fie_lihe">
                <span>{{scope.row.signTypeName}}</span>
              </span>
            </div>
          </epf-column>
        </template>
        <template v-slot:id="scope">
          <epf-column slot="id">
            <div class="epf_fie_box">
              <span
                class="epf_fie_lihe orgText"
                v-if="scope.row.relevanceCode=='1'"
                @click="supply(scope.row.relevanceId)"
              >关联供给信息</span>
              <span
                class="epf_fie_lihe orgText"
                v-if="scope.row.relevanceCode=='2'"
                @click="transactions(scope.row.relevanceId)"
              >关联交易信息</span>
              <span
                class="epf_fie_lihe"
                v-if="scope.row.relevanceCode=='3'">
                未关联
              </span>
            </div>
          </epf-column>
        </template>
        <template v-slot:insertTime="scope">
          <epf-column slot="insertTime">
            <div class="epf_fie_box">
              <span class="epf_fie_lihe">
                <span
                  class="default"
                  v-if="scope.row.contractStatus=='contract_status-002'||
                  scope.row.contractStatus=='contract_status-003'||
                  scope.row.contractStatus=='contract_status-004'||
                  scope.row.contractStatus=='contract_status-007'||
                  scope.row.contractStatus=='contract_status-011'">
                </span>
                <span
                  class="success"
                  v-if="scope.row.contractStatus=='contract_status-005'||
                  scope.row.contractStatus=='contract_status-008'">
                </span>
                <span
                  class="error"
                  v-if="scope.row.contractStatus=='contract_status-006'||
                  scope.row.contractStatus=='contract_status-009'">
                </span>
                {{scope.row.contractStatusName}}
              </span>
            </div>
          </epf-column>
        </template>
        <template v-slot:contractType="scope">
          <epf-column slot="contractType">
            <div class="epf_btn_flex">
              <div v-if="scope.row.contractStatus=='contract_status-002'">
                <el-button 
                  size="mini" 
                  @click="EditData(scope.row.id,scope.row.contractType)">
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  @click="deleteData(scope.row.id,scope.row.relevanceId,scope.row.relevanceCode)">
                  删除
                </el-button>
              </div>
              <el-button
                size="mini"
                v-if="scope.row.contractStatus !=='contract_status-002'"
                @click="signatureDetails(scope.row.contractStatus,scope.row.id,scope.row.contractType)"
              >查看合同</el-button>
              <span
                style="line-height:50px;"
                v-if="scope.row.contractStatus=='contract_status-006' || scope.row.contractStatus=='contract_status-011'">
                <el-button
                  size="mini"
                  v-if="!scope.row.childId"
                  v-show="scope.row.contractStatus !=='contract_status-011'"
                  style="margin-left: 16px;cursor: pointer;color: #606266;display:block"
                  @click="EditData(scope.row.id,scope.row.contractType)"
                >重新提交</el-button>
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="line-height:30px;padding:5px 20px;width: 200px;background:#fff;">
                    <div style="border-bottom: 1px solid #eee;text-align: left;font-weight: bold;">提示：</div>
                    <div>合同编号:{{scope.row.code}}</div>
                    <div>原因：{{scope.row.reason}}</div>
                  </div>
                  <span class="hoverStyle">
                      查看原因
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </el-tooltip>  
              </span>
              <span
                style="line-height:50px;"
                v-if="scope.row.contractStatus=='contract_status-007'">
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="line-height:30px;padding:5px 20px;width: 200px;background:#fff;">
                    <div style="border-bottom: 1px solid #eee;text-align: left;font-weight: bold;">提示：</div>
                    <div>合同编号:{{scope.row.code}}</div>
                    <div>原因：{{scope.row.reason}}</div>
                  </div>
                  <span class="hoverStyle">
                      查看原因
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </el-tooltip>
              </span>
            </div>
          </epf-column>
        </template>
      </epf-customTable>
      <div class="epf_page_sile" 
        v-if="tableContentData == [] || tableContentData == ''">
        <img src="@/assets/image/dataNone.png" class="epf_def_img" />
      </div>
      <div class="epf_page_sile">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[5,10, 15, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="totalRecord"
          :current-page="pageNo"
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import qs from "qs";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import baseURL1 from "@/util/config.js";
export default {
  props: {
    closeTypeIpt: Boolean,
    isFlag: Boolean
  },
  data() {
    return {
      ruleForm: {
        contactNo: "",
        contractName: "",
        Status: "",
        StatusKey: "",
        signType: "",
        signTypeKey: "",

        typeName: "",
        issueBeginDate: "",
        issueEndDate: "",
        areaMost: "",
        areaLast: ""
      },
      contractId: "",
      signtype: "在线签订",
      search: {},
      switchHeight: 41,
      flexibleOpen: false,
      loading: true,
      config: [
        {
          span: 9,
          fie: "code",
          title: "合同基本信息"
        },
        {
          span: 3,
          fie: "dealType",
          title: "交易方式"
        },
        {
          span: 4,
          fie: "id",
          title: "关联信息"
        },
        {
          span: 3,
          fie: "insertTime",
          title: "状态"
        },
        {
          span: 5,
          fie: "contractType",
          title: "操作"
        }
      ],
      tableContentData: [
        {
          id: "",
          // 合同编号
          contractNum: "",
          //
          landChar: "",
          type: "",
          // 提交时间
          insertTime: "",
          // 关联信息
          relevanceCode: "",
          // 合同状态
          contractStatus: "",
          // 合同类型
          contractType: "",
          typeDot: ""
        }
      ],
      pageNo: 1,
      pageSize: 5,
      totalPage: 0,
      totalRecord: 0,
      delShow: false,
      issueSell: null,
      idlist: "",
      issueSell2: null,
      delid: null,
      //			修改地块合同网签状态
      releId: "",
      releCode: "",
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let token = localStorage.getItem("token");
    let param = {
      token: token,
      page: this.pageNo,
      rows: this.pageSize
    };
    this.init(param);
    this.initState();
    // this.init1()
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchServiceInfo",
      "getSearchGradeInfo"
    ]),
    initState() {
      // 合同状态数据
      let token = localStorage.getItem("token");
      axios
        .get(
          "/api/epf-admin/admin/dict/getDictEbyDictGroup/contract_status",
          qs.stringify({
            token: token
          })
        )
        .then(res => {
          if (res.data.code == "0") {
            let newArr = res.data.dictionariesList.slice(0,8)
            this.issueSell = newArr
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // 签订方式数据
      axios
        .get(
          "/api/epf-admin/admin/dict/getDictEbyDictGroup/flow_mode",
          qs.stringify({
            token: token
          })
        )
        .then(res => {
          if (res.data.code == "0") {
            this.issueSell2 = res.data.dictionariesList;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    init(param) {
      this.loading = true;
      axios
        // .post("/api/epf-contract/transContract/pagebyuser", qs.stringify(param))
        .post("/api/epf-landweb/transContract/pagebyuser", qs.stringify(param))
        .then(res => {
          if (res.data.code != 0) {
            this.loading = false;
            this.$message.error(res.data.msg);
            return;
          }
          this.pageNo = res.data.pager.pageNo;
          this.pageSize = res.data.pager.pageSize;
          this.totalPage = res.data.pager.totalPage;
          this.totalRecord = res.data.pager.totalRecord;
          this.tableContentData = res.data.pager.results;
          this.loading = false;
        });
    },
    fatch() {
      this.pageNo = 1;
      let token = localStorage.getItem("token");
      let param = {
        token: token,
        page: this.pageNo,
        rows: this.pageSize,
        code: this.ruleForm.contactNo,
        contractName: this.ruleForm.contractName,
        contractType: this.ruleForm.signTypeKey,
        beginDate: this.ruleForm.issueBeginDate,
        endDate: this.ruleForm.issueEndDate,
        status: this.ruleForm.StatusKey
      };
      this.init(param);
    },
    typeSelect(key, value, event) {
      if (key === this.issueSell) {
        this.ruleForm.StatusKey = this.$refs[value][0].$attrs.dictKey;
      }
      if (key === this.issueSell2) {
        this.ruleForm.signTypeKey = this.$refs[value][0].$attrs.dictKey;
      }
      if (key === "issueBeginDate") {
        this.ruleForm.issueBeginDate = value;
      }
      if (key === "issueEndDate") {
        this.ruleForm.issueEndDate = value;
      }
    },
    EditData(id, contractType) {
      this.$store.state.contract = null;
      sessionStorage.removeItem("ruleFormSign");
      if (contractType === "transfer") {
        this.$router.push({
          path: "/OnlineContractHome/PartybasicInfo",
          query: {
            signRecord: "transfer",
            signRecordtype: "转让",
            radio: this.radio,
            contractId: id
          }
        });
      }
      if (contractType === "rent") {
        this.$router.push({
          path: "/OnlineContractHome/PartybasicInfo",
          query: {
            signRecord: "rent",
            signRecordtype: "出租",
            radio: this.radio,
            contractId: id
          }
        });
      }
      if (contractType === "mortgage") {
        this.$router.push({
          path: "/OnlineContractHome/PartybasicInfo",
          query: {
            signRecord: "mortgage",
            signRecordtype: "抵押",
            radio: this.radio,
            contractId: id
          }
        });
      }
    },
    deleteData(id, rid, rcode) {
      this.delid = id;
      //修改地块合同网签状态
      this.releId = rid;
      this.releCode = rcode;
      this.$confirm('确认要删除该条信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.suredelShow()
      }).catch(() => {});
    },
    suredelShow() {
      //			隐藏弹窗
      this.delShow = false;
      //			定义token
      let token = localStorage.getItem("token");
      //			判断交易方式:自行交易1,委托交易2
      if (this.releCode == "1") {
        axios
          .post(
            "/api/epf-landweb/admin/tsell/updateContractNetSignStatusByTsellId",
            qs.stringify({
              id: this.releId,
              status: 0
            })
          )
          .then(res => {
            if (res.data.code == "0") {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
      } else if (this.releCode == "2") {
        axios
          .post(
            "/api/epf-landweb/landweb/transgoods/updateContractNetSignStatusByGoodsId",
            qs.stringify({
              id: this.releId,
              status: 0
            })
          )
          .then(res => {
            if (res.data.code == "0") {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
      }

      // 签订方式数据
      var that = this;
      axios
        .post(
          // "/api/epf-contract/transContract/delectContract",
          "/api/epf-landweb/transContract/delectContract",
          qs.stringify({
            token: token,
            contractId: this.delid
          })
        )
        .then(function(res) {
          that.fatch();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchData() {
      this.fatch();
    },
    resetFilterInfo() {
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
      }
      (this.ruleForm.contactNo = ""),
        (this.ruleForm.contractName = ""),
        (this.ruleForm.signTypeKey = ""),
        (this.ruleForm.issueBeginDate = ""),
        (this.ruleForm.issueEndDate = ""),
        (this.ruleForm.StatusKey = ""),
        this.fatch();
      this.$emit("filterInfo", this.ruleForm);
    },
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 155 : 41;
    },
    // 分页
    handleSizeChange(val) {
      //每页条数改变时触发
      let token = localStorage.getItem("token");
      let param = {
        token: token,
        page: this.pageNo,
        rows: val,
        code: this.ruleForm.contactNo,
        contractName: this.ruleForm.contractName,
        contractType: this.ruleForm.signTypeKey,
        beginDate: this.ruleForm.issueBeginDate,
        endDate: this.ruleForm.issueEndDate,
        status: this.ruleForm.StatusKey
      };
      this.init(param);
    },
    handleCurrentChange(val) {
      //获取当前页
      let token = localStorage.getItem("token");
      let param = {
        token: token,
        page: val,
        rows: this.pageSize,
        code: this.ruleForm.contactNo,
        contractName: this.ruleForm.contractName,
        contractType: this.ruleForm.signTypeKey,
        beginDate: this.ruleForm.issueBeginDate,
        endDate: this.ruleForm.issueEndDate,
        status: this.ruleForm.StatusKey
      };
      this.init(param);
    },
    signatureDetails(contractStatus, id, contractType) {
      // <!-- 2 草稿 、3 合同撤销中、4 审核中、 5 审核通过 、6 审核未通过 、7 已撤销 、8 已备案、 9 备案已中止、 11合同撤销中 -->
      // <!-- 审核中4//审核未通过6/撤销审核中11 -->
      // <!-- 合同审核-->
      // <!-- 审核通过5 -->
      // <!-- 合同鉴证-->
      // <!-- 备案成功8/备案失效9/合同已撤销7 -->
      // <!-- 完成11 -->

      // 合同流程与状态对应
      // 1、填写信息：草稿2
      // 2、合同审核：待审核、审核中4、审核通过5、撤销审核中4(合同撤销中3)
      // （待审核这个值基线版本中才有）
      // 3、合同鉴证：鉴证成功8/鉴证失效11
      // 4、已完成：鉴证成功8、鉴证失效11、审核不通过6、合同已撤销7
      let contactState
      if (contractStatus == "contract_status-003"||contractStatus == "contract_status-004"||contractStatus == "contract_status-005") {
        contactState = 2;//合同审核
      }
      if (contractStatus == "contract_status-008"||contractStatus == "contract_status-011") {
        contactState = 3;//合同鉴证
      }
      if (contractStatus == "contract_status-006"||contractStatus == "contract_status-007"||contractStatus == "contract_status-008"||contractStatus == "contract_status-011") {
        contactState = 4;//合同鉴证
      } 
      let path = "/transfersignatureDetailsExamine"
      if (contractType === "transfer") {
        path = "/transfersignatureDetailsExamine"
      } else if (contractType === "mortgage") {
        path = "/mortgageSignatureDetailsExamine"
      } else if (contractType === "rent") {
        path = "/rentalSignatureDetailsExamine"
      }
      this.$router.push({
        path: path,
        query: {
          contractId: id,
          contractStatus: contractStatus,
          contactState: contactState,
          signRecord: contractType
        }
      }).catch(err => {});
    },
    supply(relevanceId) {
      this.$router.push({
        path: "/demandDetails",
        query: {
          demand: relevanceId
        }
      });
    },
    transactions(relevanceId) {
      this.$router.push({
        path: "/TradingDetails",
        query: {
          id: relevanceId,
          selectedTraState: "trans_status-007"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.modeMsg {
  .box {
    width: 100%;
    height: 100%;
    padding: 15px;
    text-align: left;
    .defImage {
      display: block;
      height: 91px;
      width: 122px;
      float: left;
    }
    .content {
      height: 91px;
      padding-top: 20px;
    }
  }
}
@import url("../../../../assets/css/centerTable.css");

.tc_info_area {
  width: 69px;
  height: 21px;
  border-radius: 0px 8px 0px 8px;
  border-style: solid;
  border-width: 1px;
  text-align: center;
  line-height: 21px;

}

.orgText {
  display: inline-block;
  cursor: pointer;
  color:var(--lightColor);
}
.orgText:active{
  transform: translateY(1px);
}
</style>