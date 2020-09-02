<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="预约看地信息列表" name="first">
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
                style="font-size:12px;color:var(--lightColor);margin-left:22px;font-weight:bold;"
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
              >{{sell.price != null?Division(sell.price):'面议'}}</span>
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
              >{{sell.examineTime == null?sell.insertTime:sell.examineTime}}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top:15px;">
          <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#eeeeee">
            <tr height="48px" style="width:470px;background-color:#f2f5f7;">
              <td>
                <span style="font-size:14px;color:#333;margin-left:22px;font-weight:bold;">预约看地信息列表</span>
              </td>
            </tr>
          </table>
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="70"></el-table-column>
            <el-table-column prop="name" label="预约人" width="110"></el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
            <el-table-column prop="seeDate" label="看地时间" width="160"></el-table-column>
            <el-table-column prop="isSee" label="操作" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.isContact=='0'?'未联系':'已联系'}}</span>
                <el-switch
                  :width="30"
                  active-value="1"
                  inactive-value="0"
                  class="contactHandle"
                  :disabled="scope.row.isContact=='1'?true:false"
                  v-model="scope.row.isContact"
                  active-color="#13ce66"
                  inactive-color="#666666"
                  @change="stateChange(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="contactTime" label="联系时间" width="160"></el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="scope">
                <div v-show="!(itentionRemarkIptShow === scope.$index)">
                  <div class="itentionRemarkLeft">
                    <el-popover
                      v-show="scope.row.remark"
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
                        <span style="float:left;width:135px;">{{scope.row.remark}}</span>
                      </div>
                      <el-button
                        slot="reference"
                        class="intentionRemarkBtn"
                        style="border:none;padding:0px;"
                      >{{scope.row.remark}}</el-button>
                    </el-popover>
                  </div>
                  <span @click="itentionRemarkClick(scope.$index,scope.row.remark)">
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
                      <i
                        class="el-input__icon el-icon-circle-close-outline"
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
  data() {
    return {
      sell: {},
      nowTime: "",
      sellId: "",
      activeName: "first",
      closeTypeIpt: true,
      tableContentData: ["1"],
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
      }
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
    this.getTSellById();
  },
  methods: {
    sysTime() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var date = myDate.getDate();
      var h = myDate.getHours();
      var m = myDate.getMinutes();
      var s = myDate.getSeconds();
      var now =
        year +
        "-" +
        this.getMakeZero(month) +
        "-" +
        this.getMakeZero(date) +
        " " +
        this.getMakeZero(h) +
        ":" +
        this.getMakeZero(m) +
        ":" +
        this.getMakeZero(s);

      return now;
    },
    getMakeZero(s) {
      return s < 10 ? "0" + s : s;
    },
    stateChange(data) {
      const nowTime = this.sysTime();
      let params = {
        id: data.id,
        isContact: "1",
        contactTime: nowTime
      };
      this.revise(params);
    },
    init(paras) {
      this.$axios.get(
        "/epf-landweb/admin/treservations/getTReservationsBySellId",
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
    revise: function(params) {
      this.$axios.post(
        "/epf-landweb/admin/treservations/editTReservations",
        qs.stringify(params),
        res => {
          console.log(res)
          if (res.code == "0") {
            let params = {
              page: this.pageNo,
              rows: this.pageSize,
              tsellId: this.sellId
            };
            this.init(params);
          } else {
          }
        }
      );
    },
    formatter(row, column) {
      return row.address;
    },
    itentionRemarkClick(index, remark) {
      this.itentionRemarkIptShow = index;
      this.changeRemark = remark;
    },
    getTSellById() {
      let params = {
        id: this.sellId
      };
      this.$axios.get("/epf-landweb/tsell/getTSellById", params, res => {
        if (res.code == 0) {
          this.sell = res.tSell;
        }
      });
    },
    editorRemark(data) {
      //更改备注
      this.itentionRemarkIptShow = -1
      let token = localStorage.getItem('token')
      let id = data.id;
      this.$axios.post(
        `/epf-landweb/admin/treservations/editTReservations?id=${id}&remark=${this.changeRemark}&token=${token}`,
        {},
        res => {
          console.log(res)
          if(res.code == 0){
            this.$message.success("修改成功")
            this.sellId = this.$route.query.id;
            let params = {
              page: this.pageNo,
              rows: this.pageSize,
              sellId: this.sellId
            };
            this.init(params);
            this.getTSellById();
          }else{
            this.$message.error("修改失败,字数在0-10之间")
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
.table_top {
  margin: 20px 0 34px 0;
}
.itentionRemarkLeft {
  display: inline-block;
  width: 195px;
}
.intentionRemarkBtn {
  display: block;
  width: 190px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /*加宽度width属来兼容部分浏览*/
  height: 16px;
}
.itentionRemarkEidtorIcon {
  font-size: 18px;
  color: #6080e0;
  cursor: pointer;
}
.intentionRemarkBtn.el-button:focus {
  color: #606266;
  background-color: #fff;
}
.intentionRemarkBtn.el-button:hover {
  background-color: #f5f7fa;
}

.intentionBuyTable .el-table thead tr th {
  background: #f6fafe;
  color: #333;
}

.itentionRemarkPop {
  padding: 0;
}
.itentionRemarkPop .el-popover__title {
  border-bottom: 1px solid rgb(223, 223, 223);
  padding: 6px 10px;
  font-size: 14px;
  color: #000;
}
.itentionRemarkPop .remarkContent_box {
  padding: 0px 20px 15px 20px;
  float: left;
}
</style>