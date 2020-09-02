<template>
  <div>
    <el-tabs class="tabBox">
      <el-tab-pane label="竞买保证金缴纳信息">
        <div style="margin-top:15px;">
          <div style="text-align:left;" class="payMoneyRecordTableBox">
            <table width="100%" class="payMoneyTable">
              <tr>
                <td>标的编号: <span v-if="baseInfo" class="weight" style="color:#4772d5;" >{{baseInfo.targetNo}}</span></td>
                <td>竞买号：<span v-if="baseInfo" class="weight">{{baseInfo.licenseNo}}</span>

                </td>
              </tr>
              <tr v-for="(item,index) in tablecount" :key="index">
                <td>{{item.name}}</td>
                <td class="weight" v-if="item.name == '竞买保证金子账号'">
                  <span id="copyObj" class="copyObj" v-show="isFlage">{{item.text}}</span>
                  <span
                    id="copyObj"
                    class="copyObj"
                    v-show="!isFlage"
                    style="font-size:14px;font-weight:200"
                  >资格审核中，不能获取子账号</span>
                  <el-button
                    size="mini"
                    style="margin-left:20px;"
                    v-show="isFlage"
                    @click="copyShaneUrl(item.text)"
                  >复制</el-button>
                </td>
                <td class="weight" v-else>{{item.text}}</td>
              </tr>
              <tr>
                <td>缴费状态</td>
                <td class="weight" style="color:#ffa300;" v-if="amount">
                  <span v-if="!tableData1 || tableData1.length == 0">未缴纳</span>
                  <span v-else-if="amountSum < amount">未缴足</span>
                  <span v-else-if="amountSum >= amount">已缴足</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="margin-top:15px;">
          <div>
            <div id="table_head">
              <el-row>
                <el-col
                  class="epf_table_heade"
                  v-for="(item,index) in tableHead2"
                  :key="index"
                  :span="item.span"
                  style="width:100%;text-align:left;padding-left:26px; "
                >
                  <h4>{{item.title}}</h4>
                </el-col>
              </el-row>
              <div class="tc_content">
                <el-table :data="tableData1" border style="width: 100%">
                  <el-table-column prop="number" label="序号" width="100" align="left">
                    <template slot-scope="scope">
                      <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="accountName" label="账户名称" width="250" align="left"></el-table-column>
                  <el-table-column prop="accountBank" label="账户开户行" width="250" align="left"></el-table-column>
                  <el-table-column prop="childAccountNo" label="子账号" width="250" align="left"></el-table-column>
                  <el-table-column prop="amount" label="交款金额" width="150" align="left"></el-table-column>
                  <el-table-column prop="bidderAccountName" label="交款账户名称" width="150" align="left"></el-table-column>
                  <el-table-column prop="bidderAccountNo" label="交款账户" width="150" align="left"></el-table-column>
                  <el-table-column prop="bidderAccountBank" label="交款账户开户行" width="150" align="left"></el-table-column>
                  <el-table-column prop="bankBusinessDate" label="到账时间" width="150" align="left"></el-table-column>
                </el-table>
              </div>
              <div class="epf_page_sile">
                <el-pagination
                  background
                  layout="prev, pager, next,sizes,jumper"
                  :page-sizes="[5,10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :total="totalRecord"
                  :page-size="pageSize"
                  :current-page.sync="pageNo"
                  style="margin-top:10px;"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top:15px;">
          <el-row style="width:100%" class="epf_table_heade">
            <el-col class="epf_table_heade" style="width:100%;text-align:left;padding-left:26px; ">
              <h4>温馨提示</h4>
            </el-col>
          </el-row>
          <el-row style="border:1px solid #f3f3f3;border-top:none;">
            <p class="title">1：一个标的物对应一个竞买银行账户，需要同时竞买多个标的，应在系统中分别申请。</p>
            <p
              class="title"
            >2：本系统采用的是唯一随机账户的交易模式，保证金需要不足额缴纳到以上子账号，系统方能开通网上报价资格。直接缴纳交易中心基本账号的，本系统不识别。</p>
            <p class="title">
              3：银行柜台转账手续办理完毕后，请您务必登陆网上交易系统查看履约保证金到账情况。
              <span style="color: #ffa000;">跨行转账缴纳保证金的，请至少提前半天缴纳。</span>
            </p>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tableHead2: [
        {
          span: 5,
          title: "缴纳记录"
        }
      ],
      tablecount: [],
      tableData1: [],
      tableContentData: ["1"],
      tableContentData2: ["1"],
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      search: {},
      isFlage: true,
      baseInfo: {targetNo: '', licenseNo: ''},
      amountSum:0, //缴纳保证金的总数
      amount:0, //保证金数量
    };
  },
  created() {
    let pramas = {
      page: this.pageNo,
      rows: this.pageSize
    };
    let targetId = this.$route.query.targetId;
    let id = this.$route.query.id;
    this.init(pramas, id, targetId);
  },
  methods: {
    init(pramas, id, targetId) {
      this.$axios.get(
        "/epf-landweb/admin/getAccountBillApplyById?id=" + id,
        pramas,
        res => {
          if (res.code == "0") {
            if (res.transAccountBillApply != null) {
              this.tablecount = [
                {
                  name: "收款账户名称",
                  text: res.transAccountBillApply.accountName
                },
                {
                  name: "收款账户开户行",
                  text: res.transAccountBillApply.accountBank
                },
                {
                  name: "竞买保证金子账号",
                  text: res.transAccountBillApply.childAccountNo
                },
                {
                  name: "竞买保证金金额",
                  text:
                    res.transAccountBillApply.currencyName +
                    ":" +
                    res.transAccountBillApply.amount +
                    res.transAccountBillApply.unit
                }
              ];
              this.amount = res.transAccountBillApply.amount;
              this.$axios.get(
                "/epf-landweb/admin/getBillByApplyId?applyId=" +
                  res.transAccountBillApply.id,
                {},
                res => {
                  this.tableData1 = res.pager.results;
                  this.pageNo = res.pager.pageNo;
                  this.pageSize = res.pager.pageSize;
                  this.totalPage = res.pager.totalPage;
                  this.totalRecord = res.pager.totalRecord;
                  this.amountSum = res.sumAccount;
                }
              );
              this.initLicense(res.transAccountBillApply.licenseId);
            } else {
              this.tablecount = [
                {
                  name: "收款账户名称",
                  text: ""
                },
                {
                  name: "收款账户开户行",
                  text: ""
                },
                {
                  name: "竞买保证金子账号",
                  text: ""
                }
              ];
            }
            this.$axios.get(
              "/epf-landweb/admin/getTransTargetById?targetId=" +
                targetId,
              {},
              res2 => {
                this.tablecount.push({
                  name: "竞买保证金缴纳截止时间",
                  text: res2.map.transTarget.endEarnestTime
                });
                if (
                  res2.map.transTarget.isAfterCheck == 0 &&
                  this.$route.query.status == "license_status-004"
                ) {
                  this.isFlage = false;
                }
              }
            );
          }
        }
      );
    },
    copyShaneUrl(val) {
      var Url2 = document.getElementById("copyObj").innerText;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    //   分页
    handleSizeChange(val) {
      //每页条数改变时触发
      this.search["page"] = this.pageNo;
      this.search["rows"] = val;
      this.init(this.search);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.search["page"] = val;
      this.search["rows"] = this.pageSize;
      this.init(this.search);
    },
    // 判断订单状态
    initLicense(id) {
      this.$axios.get(
        "/epf-landweb/admin/getTransLicense?id=" + id,
        {},
        res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            return;
          }
          this.baseInfo.targetNo = res.applyBidderDetails.transTargetEntity.targetNo;
          this.baseInfo.licenseNo = res.applyBidderDetails.applyInfo.licenseNo;
          if (res.applyBidderDetails.applyInfo.status == "license_status-004") {
            this.isFlage = false;
          }
        }
      );
    }
  }
};
</script>

<style scoped>
@import url("../../../../assets/css/centerTable.css");
.title {
  font-size: 14px;
  line-height: 18px;
  color: #999999;
  margin: 16px;
}
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
</style>
