<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="我的委托交易" name="first">
        <!-- <epf-filter> -->
        <div
          class="epf_height_act"
          :style="{ height: switchHeight + 'px', overflow: 'hidden' }"
        >
          <el-row :gutter="2">
            <el-col :span="3">
              <span class="epf_form_title">申请标题 :</span>
            </el-col>
            <el-col :span="12">
              <el-input
                size="small"
                v-model="ruleForm.title"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col :offset="3" :span="4">
              <div
                class="epf_btn epf_btn_bg epf_not_margin"
                @click="searchData"
              >
                查询
              </div>
              <div class="epf_btn epf_btn_def" @click="resetFilterInfo">
                重置
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="3">
              <span class="epf_form_title">申请时间 :</span>
            </el-col>
            <el-col :span="12">
              <el-date-picker
                v-model="useDate"
                type="daterange"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="起始日期"
                end-placeholder="截止日期"
                size="small"
                style="width:100%"
                @change="selectDatarange"
              ></el-date-picker>
            </el-col>
            <el-col :span="3">
              <span class="epf_form_title">流转方式 :</span>
            </el-col>
            <el-col :span="5">
              <el-select
                size="small"
                class="filterCirculatemode"
                v-model="ruleForm.circulatemodeName"
                placeholder="请选择流转方式"
                @change="
                  circulatemodeSelect(
                    dictionary.flow_mode,
                    ruleForm.circulatemodeName,
                    $event
                  )
                "
              >
                <el-option
                  v-for="item in dictionary.flow_mode"
                  :ref="item.zhCn"
                  :id="item.id"
                  :dictKey="item.dictKey"
                  :label="item.zhCn"
                  :value="item.zhCn"
                  :key="item.dictKey"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="3">
              <span class="epf_form_title">行政区域 :</span>
            </el-col>
            <el-col :span="12">
              <el-col :span="8" class="regionSelectIcon">
                <el-select
                  size="small"
                  class="filterRegion"
                  v-model="ruleForm.cantonProvinceName"
                  placeholder="请选择省"
                  @change="
                    provinceSelect(
                      dictionary.administrative_regions,
                      ruleForm.cantonProvinceName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.administrative_regions"
                    :ref="item.regionName"
                    :id="item.id"
                    :regionCode="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionName"
                    :key="item.regionCode"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" class="regionSelectIcon">
                <el-select
                  size="small"
                  class="filterRegion"
                  v-model="ruleForm.cantonCityName"
                  placeholder="请选择市"
                  @change="
                    citySelect(
                      dictionary.cantonCity,
                      ruleForm.cantonCityName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.cantonCity"
                    :ref="item.regionName"
                    :id="item.id"
                    :regionCode="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionName"
                    :key="item.regionCode"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" class="regionSelectIcon">
                <el-select
                  size="small"
                  class="filterRegion"
                  v-model="ruleForm.cantonAreaName"
                  placeholder="请选择区/县"
                  @change="
                    areaSelect(
                      dictionary.cantonAreaName,
                      ruleForm.cantonAreaName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in dictionary.cantonArea"
                    :ref="item.regionName"
                    :id="item.id"
                    :regionCode="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionName"
                    :key="item.regionCode"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
        </div>
        <div style="height:20px;">
          <span class="flexibleSwitch" @click="flexSwitch">
            {{ flexibleOpen ? "收起搜索" : "高级搜索" }}
            <i
              :class="
                flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "
            ></i>
          </span>
        </div>
        <!-- </epf-filter> -->
        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @edioBtn="ediotHandle"
          @deleBtn="delSupply"
        >
          <template v-slot:area="scope">
            <epf-column slot="area">
              <epf-modeMsg @clickTitle="signatureDetails" :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:goodsNo="scope">
            <epf-column slot="goodsNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{ scope.row.trustOrgName }}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:procDefId="scope">
            <epf-column slot="procDefId">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{ scope.row.circulationName }}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:tSellId="scope">
            <epf-column slot="tSellId">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  <span :class="scope.row.delegationStatus=='draft3'?'default':''"></span>
                  <span :class="scope.row.delegationStatus=='accepting'?'success':''"></span>
                  <span :class="scope.row.delegationStatus=='accept'?'success':''"></span>
                  <span :class="scope.row.delegationStatus=='accept_failure'?'error':''"></span>
                  <b v-if="scope.row.targetStatusName">
                    {{scope.row.targetStatusName}}
                  </b>
                  <b v-else>
                    {{scope.row.delegationStatusName}}
                  </b>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:taskId="scope">
            <epf-column slot="taskId">
              <div class="epf_btn_flex">
                <span
                  class="epf_fie_lihe"
                  v-if="scope.row.delegationStatus == 'draft3'"
                >
                  --
                </span>
                <span>
                  <el-button
                    size="mini"
                    v-if="scope.row.delegationStatus !== 'draft3'"
                    @click="signatureDetails(scope.row)"
                  >
                    查看详情
                  </el-button>
                  <el-button
                    size="mini"
                    v-if="scope.row.targetStatusName"
                    @click="targetDetails(scope.row)">
                    交易详情
                  </el-button>
                  <el-button
                    size="mini"
                    @click="reapply(scope.row)"
                    v-if="scope.row.delegationStatus == 'accept_failure'"
                  >
                    重新申请
                  </el-button>
                  <el-button
                    size="mini"
                    v-if="scope.row.delegationStatus == 'accept'"
                    @click="seePaymentMes(scope.row.tgId, scope.row.area)"
                  >
                    查看交款信息
                  </el-button>
                  <span v-if="scope.row.delegationStatus == 'accept_failure'">
                    <el-popover placement="bottom" width="540" trigger="click">
                      <el-container>
                        <el-header style="height:30px;font-weight: bold;">
                          <div class="headerpop">查看审核失败原因</div>
                        </el-header>
                        <el-container
                          style="border-top:1px solid rgb(243,243,243); padding:20px;"
                        >
                          <el-aside width="70px" style="color:rgb(254,63,68);"
                            >失败原因：</el-aside
                          >
                          <el-main style="padding:0;">{{
                            auditFailure
                          }}</el-main>
                        </el-container>
                      </el-container>
                      <el-button
                        slot="reference"
                        type="text"
                        size="small"
                        @click.native="addComment(scope.row, index)"
                      >
                        查看审核意见
                      </el-button>
                    </el-popover>
                  </span>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div
          v-if="tableContentData == [] || tableContentData == ''"
          class="epf_row_c"
        >
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>

        <div class="epf_row_c">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="sizeChange"
            @current-change="currentChange"
            :total="searchInfo.totalRecord"
            :page-size="searchInfo.pageSize"
            :current-page="searchInfo.pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 查看交款信息 -->
    <el-dialog
      title="查看履约保证金缴纳信息"
      top="10px"
      class="abow_dialog"
      :visible.sync="payMoneyDialog"
    >
      <div style="text-align:left;" class="payMoneyRecordTableBox">
        <table width="100%" class="payMoneyTable">
          <tr>
            <td>
              地块编号:
              <span v-if="baseInf" class="weight" style="color:#4772d5;">{{
                baseInf.goodsNo
              }}</span>
            </td>
            <td>
              申请标题：
              <span v-if="baseInf" class="weight">{{
                baseInf.trustTitle
              }}</span>
            </td>
          </tr>
          <tr>
            <td>子账号开户行</td>
            <td class="weight" v-if="baseInf">
              {{ baseInf.childAccountBank }}
            </td>
          </tr>
          <tr>
            <td>子账号户名</td>
            <td class="weight" v-if="baseInf">
              {{ baseInf.childAccountName }}
            </td>
          </tr>
          <tr>
            <td>履约保证金子账号</td>
            <td class="weight" v-if="baseInf">
              <span id="copyObjInput">{{ baseInf.childAccountNo }}</span>
              <el-button
                size="mini"
                style="margin-left:20px;"
                @click="copyUrl(baseInf.childAccountNo)"
                >复制</el-button
              >
            </td>
          </tr>
          <tr>
            <td>履约保证金</td>
            <td class="weight" style="color:#ffa300;" v-if="baseInf">
              {{ baseInf.amount }}{{ baseInf.unit }}
            </td>
          </tr>
          <tr>
            <td>缴费状态</td>
            <td class="weight" style="color:#ffa300;" v-if="baseInf">
              <span v-if="!payMoneyRecord || payMoneyRecord.length == 0">未缴纳</span>
              <span v-else-if="amountSum < baseInf.amount">未缴足</span>
              <span v-else-if="amountSum >= baseInf.amount">已缴足</span>
            </td>
          </tr>
        </table>

        <div class="tableTop">缴纳记录</div>
        <el-table
          :data="payMoneyRecord"
          style="width: 100%"
          :cell-style="cellStyle"
          :header-row-style="cellStyle"
        >
          <el-table-column prop="date" label="序号" width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收款账户名称"
            prop="accountName"
            min-width="230"
          ></el-table-column>
          <el-table-column
            min-width="230"
            prop="accountBank"
            label="收款账户开户行"
          ></el-table-column>
          <el-table-column
            prop="childAccountNo"
            min-width="230"
            label="履约保证金子账号"
          ></el-table-column>
          <el-table-column
            prop="amount"
            min-width="130"
            label="交款金额"
          ></el-table-column>
          <el-table-column
            prop="bidderAccountName"
            min-width="230"
            label="交款账户名称"
          ></el-table-column>
          <el-table-column
            prop="bidderAccountNo"
            min-width="230"
            label="交款账户"
          ></el-table-column>
          <el-table-column
            prop="bidderAccountBank"
            min-width="230"
            label="交款账户开户行"
          ></el-table-column>
          <el-table-column
            prop="bankBusinessDate"
            min-width="230"
            label="到账时间"
          ></el-table-column>
        </el-table>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="paySizeChange"
            @current-change="payCurrentChange"
            :total="pay.totalRecord"
            :page-size="pay.pageSize"
            :current-page="pay.pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
        <div class="tableTop" style="background:#fff;">温馨提示</div>
        <div class="tipBox" style="margin-top:15px;">
          <p>
            1、一次委托对应一个银行子账号，需要同时委托多个地块的，应在系统中分别申请。
          </p>
          <p>
            2、本系统采用的是唯一随机账户的交易模式，保证金需要足额缴纳到以上子账号，委托交易受理生效，直接缴纳交易中心基本账号的，本系统不识别。
          </p>
          <p>
            3、银行柜台转账手续办理完毕后，请您务必登陆系统查看履约保证金到账情况。
            <span style="color:#ffa100"
              >跨行转账缴纳履约保证金的，请至少提前半天缴纳。</span
            >
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      config: [
        {
          title: "土地基本信息",
          fie: "area",
          span: 9
        },
        {
          title: "交易机构",
          fie: "goodsNo",
          span: 5
        },
        {
          title: "流转方式",
          fie: "procDefId",
          span: 2
        },
        {
          title: "状态",
          fie: "tSellId",
          span: 4
        },
        {
          title: "操作",
          fie: "taskId",
          span: 4
        }
      ],
      tSellId: "",
      flexibleOpen: false,
      useDate: "",
      ruleForm: {
        title: "",
        beginDate: "",
        endDate: "",
        //流转方式：
        circulation: "",
        circulatemodeName: "",
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: ""
      },
      switchHeight: 49,
      activeName: "first",
      baseUrl: "",

      tableContentData: {},
      delShow: false,
      //查看交款信息弹窗
      payMoneyDialog: false,
      //交款信息弹窗分页
      pay: {
        applyId: "",
        pageNo: 1,
        pageSize: 5,
        totalPage: 1,
        totalRecord: 1
      },
      //交款记录表数据
      payMoneyRecord: [
        {
          collectionUserName: "南昌市地产交易中心",
          collectionBank: "中国银行济南分行",
          marginUser: "154099186912 1518 弄",
          payNum: "￥1,000万元",
          payUserName: "张宇",
          payUser: "732915831500000621",
          payBank: "江西银行",
          getMoneyTime: "2019-01-10 17:00:00"
        },
        {
          collectionUserName: "南昌市地产交易中心",
          collectionBank: "中国银行济南分行",
          marginUser: "154099186912 1518 弄",
          payNum: "￥5,000万元",
          payUserName: "山西珊珊网络信息有限公司",
          payUser: "732915831500000621",
          payBank: "江西银行",
          getMoneyTime: "2019-01-10 17:00:00"
        }
      ],
      baseInf: {},
      loading: true,
      parameter: {
        //地块ID
        goodsId: ""
      },
      id: null,
      // @name: 修改bug3585
      // @author: gaojie
      // @chageTime:2020-3-23
      dicRequest: ["flow_mode", "administrative_regions"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0,
      serachInfo: {
        circulation: "",
        title: "",
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        beginDate: "",
        endDate: "",
        rows: 5,
        page: 5
      },
      searchInfo: {
        pageNo: 1,
        pageSize: 5,
        totalPage: 1,
        totalRecord: 1
      },
      auditFailure: "",
      amountSum:0, //缴纳保证金的总数
    };
  },
  created() {
    this.baseUrl = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC;
    // //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "administrative_regions") {
          this.$axios.get(
            `/epf-cms/regionals/getAreaByCodeOrParentId`,
            {
              parentId: "000000"
            },
            res => {
              resolve(res);
            }
          );
        } else {
          this.$axios.get(
            `/epf-admin/admin/dict/getDictEbyDictGroup/${item}`,
            {},
            res => {
              resolve(res);
            }
          );
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          if (item.regionName) {
            return {
              regionCode: item.regionCode,
              regionName: item.regionName,
              id: item.id
            };
          } else {
            return {
              dictKey: item.dictKey,
              zhCn: item.zhCn,
              id: item.id
            };
          }
        });
        return dicArr;
      });
      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }
      this.dicFinsh = true;
    });
    //获取委托交易列表信息
    let params = {
      page: this.searchInfo.pageNo,
      rows: this.searchInfo.pageSize
    };
    this.getEntrustList(params);
  },
  methods: {
    // 查看审核失败原因  -- zhushaobing
    addComment(item, index) {
      this.auditFailure = "";

      var jsonVars = "{'test':'test'}";
      //流程实例ID
      let param = { businessId: item.ttiId };
      this.$axios.post(
        // "/epf-activiti/act/task/histoicFlow",
        this.$API.EPF_ACTIVITI.TASK.COMMENT,
        qs.stringify(param),
        res => {
          //查询意见
          if (res.code != "0") {
            //失败
            this.$message.error(res.msg);
            return;
          }
          //循环拿到所有的意见，每次覆盖，最后赋值的就是，最后的审核人提的意见
          let comments = res.comments;
          let index = comments.length;
          let k = Number(index) - 1;
          this.auditFailure = comments[k].message;
        }
      );
    },
    //委托交易重新申请按钮
    reapply(item) {
      //是否重新提交，存入缓存
      //是否重新提交
      localStorage.setItem("isReapply", "reapply");
      //原 - tgId
      localStorage.setItem("tgId", item.tgId);

      this.$store.state.entrustland = null;
      this.$router.push({
        path: "/EntrustTransHome",
        query: { tgId: item.tgId }
      });
    },
    // 分页
    sizeChange(val) {
      //每页条数改变时触发
      window.scrollTo(0, 160);
      this.searchInfo.pageSize = val;
      let param = {
        rows: this.searchInfo.pageSize,
        page: this.searchInfo.pageNo
      };
      this.getEntrustList(param);
    },
    currentChange(val) {
      //获取当前页
      window.scrollTo(0, 160);
      this.searchInfo.pageNo = val;
      let param = {
        rows: this.searchInfo.pageSize,
        page: this.searchInfo.pageNo
      };
      this.getEntrustList(param);
    },
    getEntrustList(params) {
      //委托交易列表结果
      this.loading = true;
      this.$axios.get("/epf-landweb/admin/getMyEntrust", params, res => {
        if (res.code != 0) {
          this.loading = false;
          this.$message.error(res.msg);
          return;
        }
        this.tableContentData = res.pager.results;
        this.searchInfo.pageNo = res.pager.pageNo;
        this.searchInfo.pageSize = res.pager.pageSize;
        this.searchInfo.totalPage = res.pager.totalPage;
        this.searchInfo.totalRecord = res.pager.totalRecord;
        this.loading = false;
      });
    },
    searchData() {
      this.serachInfo.circulation = this.ruleForm.circulation;
      this.serachInfo.title = this.ruleForm.title;
      this.serachInfo.cantonProvince = this.ruleForm.cantonProvince;
      this.serachInfo.cantonCity = this.ruleForm.cantonCity;
      this.serachInfo.cantonArea = this.ruleForm.cantonArea;
      this.serachInfo.beginDate = this.ruleForm.beginDate;
      this.serachInfo.endDate = this.ruleForm.endDate;
      this.getEntrustList(this.serachInfo);
    },
    resetFilterInfo() {
      this.serachInfo = {
        circulation: "",
        title: "",
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        beginDate: "",
        endDate: "",
        rows: 5,
        page: 1
      };
      this.getEntrustList(this.serachInfo);
    },
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 187 : 41;
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.ruleForm.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
    },
    citySelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonAreaName = "";
      this.cantonArea = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList;
            return;
          }
          this.dictionary.cantonArea = "";
        }
      );
    },
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
      console.log(this.ruleForm);
    },
    circulatemodeSelect(dic, circulatemodeName, event) {
      this.ruleForm.circulation = this.$refs[
        circulatemodeName
      ][0].$attrs.dictKey;
    },
    selectDatarange() {
      //选择日期范围后的回调
      this.ruleForm.beginDate = this.useDate[0];
      this.ruleForm.endDate = this.useDate[1];
    },
    getSeeBond() {
      //查看履约保证金
      this.$axios.get(
        "/epf-landweb/admin/getEarnestMoneyInfo",
        this.parameter,
        res => {
          if (res.code == "0") {
            //
            this.baseInf = res.transEarnestMoneyVo;
            this.pay.applyId = this.baseInf.tabaId;
            let payPrams = {
              applyId: this.baseInf.tabaId,
              rows: this.pay.pageSize,
              page: this.pay.pageNo
            };
            this.paymentRecord(payPrams);
          } else {
            this.$message.error(res.msg); //失败
            return;
          }
        }
      );
    },
    copyUrl(val) {
      var Url2 = document.getElementById("copyObjInput").innerText;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    paymentRecord(params) {
      //查看缴纳记录
      this.loading = true;
      this.$axios.get("/epf-landweb/admin/getBillByApplyId", params, res => {
        if (res.code == "0") {
          this.loading = false;
          this.payMoneyRecord = res.pager.results;
          this.pay.pageNo = res.pager.pageNo;
          this.pay.pageSize = res.pager.pageSize;
          this.pay.totalPage = res.pager.totalPage;
          this.pay.totalRecord = res.pager.totalRecord;
          this.amountSum = res.sumAccount;
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    //查看交款信息弹窗分页
    paySizeChange(val) {
      //每页条数改变时触发
      this.pay.pageSize = val;
      let payPrams = {
        applyId: this.baseInf.tabaId,
        rows: this.pay.pageSize,
        page: this.pay.pageNo
      };
      this.paymentRecord(payPrams);
    },
    payCurrentChange(val) {
      //获取当前页
      this.pay.pageNo = val;
      let payPrams = {
        applyId: this.baseInf.tabaId,
        rows: this.pay.pageSize,
        page: this.pay.pageNo
      };
      this.paymentRecord(payPrams);
    },
    seePaymentMes(tagId, userId) {
      //查看交款信息按钮
      this.payMoneyDialog = true;
      this.parameter.goodsId = tagId;
      this.getSeeBond(); //调用查看履约保证金
      // this.paymentRecord(); //
    },
    getFilterInfo(val) {
      for (let item in val) {
        this.searchInfo[item] = val[item];
      }
      this.getEntrustList(this.searchInfo);
    },
    checkDel(data) {
      this.id = data.id;
      this.tSellId = data.tSellId;
      this.delShow = true;
    },
    delSupply(data) {
      this.$axios.post(
        "/epf-landweb/landweb/transgoods/deleteTransGoods",
        qs.stringify({ id: data.tgId }),
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          }
          this.$message.success(res.msg);
          //审核失败驳回时若关联了地块,对地块状态修改
          if (this.tSellId != "" && this.tSellId != null) {
            this.recoveryEntrustStatus();
          }

          let params = {
            page: this.searchInfo.pageNo,
            rows: this.searchInfo.pageSize
          };
          this.getEntrustList(params);
          this.delShow = false;
        }
      );
    },
    //详情
    signatureDetails(data) {
      this.$store.state.entrustland = null;
      this.$router.push({
        path: "/EntrustTransHome",
        query: { tgId: data.tgId, publishLandtype: data.circulation, detail: 1 }
      });
    },
    //标的详情页面
    targetDetails(data) {
      console.log("=====data===",data)
      this.$router.push({
        path: "/TradingDetails?id="+data.targetId+"&selectedTraState="+data.targetStatus,
        query: { id: data.targetId, selectedTraState: data.targetStatus }
      });
    },
    // 修改
    ediotHandle(data) {
      this.$store.state.entrustland = null;
      this.$router.push({
        path: "/EntrustTransHome",
        query: { tgId: data.tgId, publishLandtype: data.circulationName }
      });
    },
    // 表格单元格样式
    cellStyle() {
      return "padding:12px 15px";
    },
    checkDelsure() {
      this.delShow = true;
    },
    //当供需地块进行委托交易，被删除时调用该接口
    recoveryEntrustStatus() {
      this.$axios.post(
        "/epf-landweb/admin/tsell/recoveryEntrustStatus",
        qs.stringify({
          id: this.tSellId
        }),
        res => {
          if (res.code != "0") {
            //失败
            this.$message.error(res.msg);
            return;
          }
        }
      );
    }
  }
};
</script>

<style scoped>
@import url("../../../../assets/css/centerTable.css");
.payMoneyTable tr:nth-child(1) {
  background: #f1f6f7;
}
.payMoneyTable tr td {
  border: 1px solid rgb(243, 243, 243);
  padding: 12px 20px;
  color: rgb(80, 80, 80);
}
.weight {
  font-weight: 800;
}
.tableTop {
  padding: 15px 20px;
  background: #f1f6f7;
  margin-top: 25px;
  font-weight: 800;
  color: rgb(48, 48, 48);
}
.el-table th.is-leaf {
  background: red;
}
.delDialog_box {
  height: 100%;
}
.tipBox {
  padding: 15px 20px;
  border: 1px solid rgb(223, 223, 223);
}
.tipBox p {
  margin: 8px 0;
  color: rgb(80, 80, 80);
}
</style>
