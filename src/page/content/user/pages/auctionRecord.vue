<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="竞价记录" name="first">
        <div class="filter_wrap">
          <div class="epf_height_act" :style="{'height':switchHeight + 'px','overflow':'hidden'}">
            <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">竞价时间 :</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                  v-model="useDate"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                  @change="selectDatarange"
                ></el-date-picker>
              </el-col>
              <el-col :span="3">
                <span class="epf_form_title">竞买人 :</span>
              </el-col>
              <el-col :span="5">
                <el-input size="small" v-model="ruleForm.recorderName"></el-input>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="2">
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">申请状态 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.circulatemodeName2"
                  placeholder="请选择申请状态"
                >
                  <el-option
                    v-for="item in dictionary.flow_mode"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <span v-if="dicFinsh" class="epf_form_title">交易方式 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="ruleForm.circulatemodeName3"
                  placeholder="请选择交易方式"
                >
                  <el-option
                    v-for="item in dictionary.flow_mode"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row> -->
            <!-- <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">申请时间 :</span>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  class="filterDateSelecet"
                  v-model="ruleForm.start"
                  clearable
                  size="small"
                  type="date"
                  placeholder="请选择开始时间"
                ></el-date-picker>
              </el-col>
              <el-col :span="1">
                <span class="epf_form_title epf_row_c">--</span>
              </el-col>
              <el-col :span="5">
                <el-date-picker
                  class="filterDateSelecet"
                  v-model="ruleForm.end"
                  clearable
                  size="small"
                  type="date"
                  placeholder="请选择结束时间"
                ></el-date-picker>
              </el-col>
            </el-row> -->
          </div>
          <el-row :offset="3">
            <div class="epf_btn epf_btn_bg" @click="searchData">查询</div>
            <div class="epf_btn epf_btn_def" @click="resetFilterInfo">重置</div>
          </el-row>
        </div>
        <!-- 未登记 -->
        <div style="margin-top:15px;">
          <el-table
            border
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <!-- @selection-change="handleSelectionChange" -->
            <el-table-column label="序号" type="index" width="170"></el-table-column>
            <el-table-column label="竞买人" width="190" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.confirmUserId == userId">{{scope.row.recorderName}}</span>
                <span v-else>{{scope.row.licenseNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="竞买出价(万元)" width="199" align="left"></el-table-column>
            <el-table-column prop="offerDate" label="竞价时间" width="260" align="left"></el-table-column>
            <el-table-column prop label="状态" width="140" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.status==0">无效</span>
                <span v-else-if="scope.row.status==1">有效</span>
                <span v-else-if="scope.row.status==2">成交价</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[1,5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page.sync="pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      useDate: "", //日期范围
      activeName: "first",
      delShow: false,
      closeTypeIpt: true, //取消状态按钮
      tableData3: [],
        // title: "",
        // //流转方式：
        // circulation1: "",
        // circulation2: "",
      ruleForm:{
        startTime: "",
        endTime: "",
        recorderName:"",
      },
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      flexibleOpen: false,
      switchHeight: 60,
      dicRequest: ["flow_mode"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      userId:localStorage.getItem("userId") ? localStorage.getItem("userId") : "--"
    };
  },
  created() {
    this.baseUrl = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC;
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            this.$API.EPF_SUPPLY.DIC.GET,
            // `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: "0", code: item },
            res => {
              resolve(res);
            }
          );
        } else {
          this.$axios.get(
            this.$API.EPF_TRADE.BANK.DICT_GROUP + "item",
            // `/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,
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
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });
      for (let item in this.dictionary) {
        if (item == "purchasr_status") {
          //正确调用状态字典接口后删除此判断
          break;
        }
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }
      this.dicFinsh = true;
    });
    this.getOfferLine();
  },
  methods: {
    getOfferLine() {
      // 查询标的的竞价记录列表
      let pramse = {
        targetId: this.$route.query.id,
        startTime: this.ruleForm.startTime,
        endTime: this.ruleForm.endTime,
        recorderName:this.ruleForm.recorderName,
        page: this.pageNo,
        rows: this.pageSize,
      }
      this.$axios.get(
        // "/epf-tradeengine/transofferlog/getTransOfferLogJson?targetId=" +
        //   this.$route.query.id,
        this.$API.EPF_TRADEENGINE.LOG.TRADE_PRICE,
        pramse,
        res => {
          if (res.code == 0) {
            this.tableData3 = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
          }
        }
      );
    },
    //   分页
    handleSizeChange(val) {
      //每页条数改变时触发
      // this.searchInfo["page"] = this.pageNo;
      // this.searchInfo["rows"] = val;
      // this.searchInfo["page"] = this.pageNo;
      this.pageSize = val;
      this.getOfferLine();
    },
    handleCurrentChange(val) {
      //获取当前页
      // this.searchInfo["page"] = val;
      // this.searchInfo["rows"] = this.pageSize;
      this.pageNo = val;
      this.getOfferLine();
    },
    resetFilterInfo() {
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
        this.dictionary.cantonCity = "";
        this.dictionary.cantonArea = "";
        this.useDate = "";
      }
      this.getOfferLine();
    },
    selectDatarange() {
      //选择日期范围后的回调
      if (this.useDate == null) {
        this.ruleForm.startTime = "";
        this.ruleForm.endTime = "";
      } else {
        this.ruleForm.startTime = this.useDate[0];
        this.ruleForm.endTime = this.useDate[1];
      }
    },
    searchData() {
      this.getOfferLine();
    },
    circulatemodeSelect(dic, circulatemodeName, event) {
      this.ruleForm.circulation = this.$refs[
        circulatemodeName
      ][0].$attrs.dictKey;
    }
  }
};
</script>

<style scoped></style>
