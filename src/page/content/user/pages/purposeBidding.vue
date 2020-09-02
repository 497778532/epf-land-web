<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="意向竞买记录" name="first">
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          bordercolor="#eeeeee"
          class="table_top"
        >
          <tr height="48px" style="width:470px;background-color:#f2f5f7;">
            <td colspan="2">
              <span style="font-size:14px;color:#333;margin-left:22px;font-weight:bold;">土地基本信息</span>
            </td>
          </tr>
          <tr height="48px">
            <td>
              <span style="font-size:12px;color:#999;margin-left:22px;">标题</span>
            </td>
            <td>
              <span
                style="font-size:12px;color:#4671d5;margin-left:22px;font-weight:bold;"
              >{{sell.title}}</span>
            </td>
          </tr>
          <tr height="48px">
            <td width="270px">
              <span style="font-size:12px;color:#999;margin-left:22px;">面积/平方米</span>
            </td>
            <td>
              <span
                style="font-size:12px;color:#333;margin-left:22px;font-weight:bold;"
              >{{sell.area}}</span>
            </td>
          </tr>
          <tr height="48px">
            <td>
              <span style="font-size:12px;color:#999;margin-left:22px;">金额/万元</span>
            </td>
            <td>
              <span
                style="font-size:12px;color:#333;margin-left:22px;font-weight:bold;"
                v-if="sell.price==''||sell.price==null"
              >面议</span>
              <span
                style="font-size:12px;color:#333;margin-left:22px;font-weight:bold;"
                v-else
              >{{sell.price?Division(sell.price):0}}</span>
            </td>
          </tr>
          <tr height="48px">
            <td>
              <span style="font-size:12px;color:#999;margin-left:22px;">流转方式</span>
            </td>
            <td>
              <span
                style="font-size:12px;color:#333;margin-left:22px;font-weight:bold;"
              >{{sell.circulationName}}</span>
            </td>
          </tr>
          <tr height="48px">
            <td>
              <span style="font-size:12px;color:#999;margin-left:22px;">申请时间</span>
            </td>
            <td>
              <span
                style="font-size:12px;color:#333;margin-left:22px;font-weight:bold;"
              >{{sell.insertTime}}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top:15px;">
          <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#eeeeee">
            <tr height="48px" style="width:470px;background-color:#f2f5f7;">
              <td>
                <span style="font-size:14px;color:#333;margin-left:22px;font-weight:bold;">意向竞买记录</span>
              </td>
            </tr>
          </table>
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column prop="REAL_NAME" label="意向竞买人" width="120"></el-table-column>
            <el-table-column prop="TEL_PHONE" label="联系电话" width="140"></el-table-column>
            <el-table-column prop="PRICE" label="报价/万元" sortable width="120"></el-table-column>
            <el-table-column prop="NUM" label="报价次数" width="100"></el-table-column>
            <el-table-column prop="INSERT_TIME" label="报价时间" width="180"></el-table-column>
            <el-table-column prop="REMARK" label="备注">
              <template slot-scope="scope">
                <div v-show="!(itentionRemarkIptShow === scope.$index)">
                  <div class="itentionRemarkLeft">
                    <el-popover
                      v-show="scope.row.REMARK"
                      ref="popover1"
                      placement="bottom-start"
                      transition="el-zoom-in-top"
                      title="查看备注详情"
                      width="240"
                      trigger="hover"
                      popper-class="itentionRemarkPop"
                    >
                      <div class="remarkContent_box">
                        <span style="color:#000;width:65px;float:left;height:100%;">备注信息:</span>
                        <span style="float:left;width:135px;">{{scope.row.REMARK}}</span>
                      </div>
                      <el-button
                        slot="reference"
                        class="intentionRemarkBtn"
                        style="border:none;padding:0px;"
                      >{{scope.row.REMARK}}</el-button>
                    </el-popover>
                  </div>
                  <span @click="itentionRemarkClick(scope.$index)">
                    <i class="el-icon-edit itentionRemarkEidtorIcon"></i>
                  </span>
                </div>
                <div v-show="itentionRemarkIptShow === scope.$index" class="itentionRemarkIpt">
                  <el-input placeholder="请输入" v-model="changeRemark">
                    <span slot="suffix">
                      <i
                        class="el-input__icon el-icon-circle-check-outline"
                        style="cursor: pointer;color:#4b6fd8;"
                        @click="editorRemark(scope.row)"
                      ></i>
                      <i class="el-input__icon el-icon-circle-close-outline"
                        style="cursor: pointer;"
                        @click="itentionRemarkIptShow=-1;changeRemark='';"
                      ></i>
                    </span>
                  </el-input>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="pageNo"
            :page-size="pageSize"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  props: ["dataId"],
  data() {
    return {
      sell: {},
      activeName: "first",
      closeTypeIpt: true,
      baseUrl: "",
      itentionRemarkIptShow: -1,
      changeRemark: "",
      tableData: [],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      search: {},
      bet: {
        id: ""
      },
      handle: true
    };
  },
  created() {
    this.sellId = this.$route.query.id;
    let params = {
      page: this.pageNo,
      rows: this.pageSize,
      sellId: this.sellId
    };
    this.init(params);
    this.getTSellById(this.sellId);
  },
  methods: {
    init(paras) {
      this.$axios.get(
        "/epf-landweb/admin/tintentionoffer/getSellOffer",
        paras,
        res => {
          this.tableData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
      );
    },
    getTSellById(id) {
      this.$axios.get("/epf-landweb/tsell/getTSellById?id=" + id, {}, res => {
        this.sell = res.tSell;
      });
    },

    formatter(row, column) {
      return row.address;
    },
    itentionRemarkClick(index) {
      this.itentionRemarkIptShow = index;
      this.changeRemark = "";
    },
    editorRemark(index) {
      //更改备注
      this.itentionRemarkIptShow = -1;
      let id = index.ID;
      let params = {
        id: index.ID,
        remark: this.changeRemark
      };
      this.revise(params);
    },
    revise: function(params) {
      this.$axios.post(
        "/epf-landweb/admin/tintentionoffer/editTIntentionOffer",
        qs.stringify(params),
        res => {
          if (res.code == "0") {
            const initParams = {
              page: this.pageNo,
              rows: this.pageSize,
              sellId: this.sellId
            };
            this.init(initParams);
          } else {
          }
        }
      );
    },
    //   分页
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val;
      this.pageNo = 1;
      this.search["page"] = this.pageNo;
      this.search["rows"] = val;
      this.search["sellId"] = this.sellId;
      this.init(this.search);
    },
    handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 420);
      this.search["page"] = val;
      this.search["rows"] = this.pageSize;
      this.search["sellId"] = this.sellId;
      this.init(this.search);
    }
  }
};
</script>

<style scoped>
@import url("../../../../assets/css/centerTable.css");
.itentionRemarkLeft {
  display: inline-block;
  width: 195px;
}
.el-icon-circle-close-outline:before {
  content: "\e609";
}
.el-icon-circle-check-outline:before {
  content: "\e63e";
}
.intentionBuyTable .el-table thead tr th {
  background: #f6fafe;
  color: #333;
}
</style>
