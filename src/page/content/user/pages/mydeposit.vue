<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="竞买保证金查询" name="first">
        <epf-filter>
          <div class="epf_height_act">
            <el-row :gutter="2">
              <el-col :span="3">
                <span class="epf_form_title">竞买号 :</span>
              </el-col>
              <el-col :span="6">
                <el-input size="medium"
                  v-model="filtermarginForm.licenseNo"
                  placeholder="请输入竞买号">
                </el-input>
              </el-col>
              <el-col :span="3">
                <span v-if="dicFinsh"
                  class="epf_form_title">标的编号 :</span>
              </el-col>
              <el-col v-if="dicFinsh" :span="5">
                <el-input size="medium"
                  v-model="filtermarginForm.targetNo"
                  placeholder="请输入标的编号">
                </el-input>
              </el-col>
              <el-col :span="2" :offset="1">
                <div class="epf_btn epf_btn_bg"
                  @click="searchMargin_Data">查询</div>
              </el-col>
              <el-col :span="2" :offset="0">
                <div class="epf_btn epf_btn_def"
                  @click="resetMargin_FilterInfo">重置</div>
              </el-col>
            </el-row>
          </div>
        </epf-filter>
        <!-- 保证金查询 -->

        <epf-customTable
          :data="MarginInquiryList"
          :config="config"
          v-loading="loading"
          tableTpe="money"
          element-loading-text="拼命加载中...">
          <template v-slot:licenseNo="scope">
            <epf-column slot="licenseNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{scope.row.targetNo}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:targetNo="scope">
            <epf-column slot="targetNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{scope.row.amount}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:amount="scope">
            <epf-column slot="amount">
              <div class="epf_fie_box">
                <span class="epf_money">{{scope.row.paymentAmount}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:paymentAmount="scope">
            <epf-column slot="paymentAmount">
              <div class="epf_fie_box">
                <span class="epf_money">{{scope.row.mispaidAmount}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:mispaidAmount="scope">
            <epf-column slot="mispaidAmount">
              <div class="epf_fie_box">
                <span class="epf_money">{{scope.row.totalAmount}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div class="epf_btn_flex">
                <span>
                  <div class="epf_btn epf_btn_bg epf_not_margin"
                  @click="viewPaymentAmount(scope.row.licenseId,0)">
                  查看保证金到账情况
                </div>
                <div class="epf_btn epf_btn_def epf_not_margin"
                  v-if="scope.row.errorPayPrice != '0'"
                  @click="viewPaymentAmount(scope.row.licenseId,1)">
                  查看错转款到账情况
                </div>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>
        <div v-if="MarginInquiryList == [] || MarginInquiryList == ''"
          class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <!-- 保证金查询分页 -->
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="margin_handleSizeChange"
            @current-change="margin_handleCurrentChange"
            :total="margin_totalRecord"
            :page-size="margin_pageSize"
            :current-page="margin_pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="竞买保证金到账查询" name="second">
        <epf-filter>
          <!-- 筛选组件 -->
          <div class="epf_height_act"
            :style="{'height':switchHeight + 'px','overflow':'hidden'}">
            <el-row>
              <el-col :span="3">
                <span class="epf_form_title">竞买号 :</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  size="medium"
                  v-model="getMarginFilter.licenseNo"
                  placeholder="请输入竞买号">
                </el-input>
              </el-col>
              <el-col :span="4">
                <span class="epf_form_title">标的编号 :</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  size="medium"
                  v-model="getMarginFilter.targetNo"
                  placeholder="请输入交款账户">
                </el-input>
              </el-col>
              <el-col :offset="1" :span="4">
                <div class="epf_not_margin epf_btn epf_btn_bg"
                  @click="getsearchMargin_Data(0)">查询</div>
                <div class="epf_btn epf_btn_def"
                  @click="getresetMargin_Data(0)">重置</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <span class="epf_form_title">交款账户名称 :</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  size="medium"
                  v-model="getMarginFilter.bidderAccountName"
                  placeholder="请输入交款账户名称"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <span class="epf_form_title">交款账户开户行 :</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  size="medium"
                  v-model="getMarginFilter.bidderAccountBank"
                  placeholder="请输入交款账户开户行"
                ></el-input>
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
        <!-- 竞买保证金到账查询 -->
        <epf-customTable
          :data="getAllMarginData"
          :config="gure"
          v-loading="loading"
          tableTpe="money"
          element-loading-text="拼命加载中...">
          <template v-slot:targetNo="scope">
            <epf-column slot="targetNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.targetNo}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:childAccountNo="scope">
            <epf-column slot="childAccountNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.childAccountNo}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:bidderAccountName="scope">
            <epf-column slot="bidderAccountName">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.bidderAccountName}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:bidderAccountBank="scope">
            <epf-column slot="bidderAccountBank">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.bidderAccountBank}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:amountName="scope">
            <epf-column slot="amountName">
              <div class="epf_fie_box">
                <span class="epf_money">
                  {{scope.row.amountName}}
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div class="epf_page_sile"
          v-if="getAllMarginData == [] || getAllMarginData == ''">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="getMargin_handleSizeChange"
            @current-change="getMargin_handleCurrentChange"
            :total="getMargin_totalRecord"
            :page-size="getMargin_pageSize"
            :current-page="getMargin_pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="错转款到账查询" name="third">
        <epf-filter>
          <!-- 筛选组件 -->
          <div class="epf_height_act" :style="{'height':switchHeight + 'px'}">
            <el-row>
              <el-col :span="3">
                <span class="epf_form_title">竞买号 :</span>
              </el-col>
              <el-col :span="6">
                <el-input size="medium"
                  v-model="getMarginFilter.licenseNo"
                  placeholder="请输入竞买号">
                </el-input>
              </el-col>
              <el-col :span="4">
                <span class="epf_form_title">标的编号 :</span>
              </el-col>
              <el-col :span="6">
                <el-input size="medium"
                  v-model="getMarginFilter.targetNo"
                  placeholder="请输入标的编号">
                </el-input>
              </el-col>
              <el-col :offset="1" :span="4">
                <div class="epf_not_margin epf_btn epf_btn_bg"
                  @click="getsearchMargin_Data(2)">查询</div>
                <div class="epf_btn epf_btn_def"
                  @click="getresetMargin_Data(2)">重置</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <span class="epf_form_title">交款账户名称 :</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  size="medium"
                  v-model="getMarginFilter.bidderAccountName"
                  placeholder="请输入交款账户名称"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <span class="epf_form_title">交款账户开户行 :</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  size="medium"
                  v-model="getMarginFilter.bidderAccountBank"
                  placeholder="请输入交款账户开户行"
                ></el-input>
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

        <!-- 错转款到账查询 -->
        <epf-customTable
          :data="wrongTransferData"
          :config="gure"
          v-loading="loading"
          tableTpe="money"
          element-loading-text="拼命加载中...">
          <template v-slot:targetNo="scope">
            <epf-column slot="targetNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.targetNo}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:childAccountNo="scope">
            <epf-column slot="childAccountNo">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.childAccountNo}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:bidderAccountName="scope">
            <epf-column slot="bidderAccountName">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.bidderAccountName}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:bidderAccountBank="scope">
            <epf-column slot="bidderAccountBank">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.bidderAccountBank}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:amountName="scope">
            <epf-column slot="amountName">
              <div class="epf_fie_box">
                <span class="epf_money">
                  {{scope.row.amountName}}
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div class="epf_page_sile"
          v-if="wrongTransferData == [] || wrongTransferData == ''">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <!-- 错转款到账查询分页 -->
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10,15,20]"
            @size-change="haveRegister_handleSizeChange"
            @current-change="haveRegister_handleCurrentChange"
            :total="haveRegister_totalRecord"
            :page-size="haveRegister_pageSize"
            :current-page="haveRegister_pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 查看保证金到账情况 -->
    <el-dialog title="保证金到账情况" :visible.sync="getMargin">
      <el-table :data="getMarginData">
        <el-table-column property="licenseNo" label="竞买号" min-width="150"></el-table-column>
        <el-table-column property="targetNo" label="标的编号" min-width="150"></el-table-column>
        <el-table-column property="childAccountNo" label="竞买保证金子账号" min-width="200"></el-table-column>
        <el-table-column property="bidderAccountName" label="交款账户名称" min-width="150"></el-table-column>
        <el-table-column property="bidderAccountBank" label="交款账户开户行" min-width="180"></el-table-column>
        <el-table-column property="amountName" label="交款金额" min-width="160"></el-table-column>
        <el-table-column property="submitTime" label="到账时间" min-width="160"></el-table-column>
      </el-table>
      <div class="epf_row_c">
        <!-- 保证金查询分页 -->
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[5,10, 15, 20]"
          @size-change="marginSee_handleSizeChange"
          @current-change="marginSee_handleCurrentChange"
          :total="marginSee_totalRecord"
          :page-size="marginSee_pageSize"
          :current-page="marginSee_pageNo"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 错转款到账查询 -->
    <el-dialog title="错转款到账情况" :visible.sync="errorPay">
      <el-table :data="errorPayData">
        <el-table-column property="licenseNo" label="竞买号" min-width="150"></el-table-column>
        <el-table-column property="targetNo" label="标的编号" min-width="150"></el-table-column>
        <el-table-column property="childAccountNo" label="竞买保证金子账号" min-width="200"></el-table-column>
        <el-table-column property="bidderAccountName" label="交款账户名称" min-width="150"></el-table-column>
        <el-table-column property="bidderAccountBank" label="交款账户开户行" min-width="180"></el-table-column>
        <el-table-column property="amountName" label="交款金额" min-width="160"></el-table-column>
        <el-table-column property="submitTime" label="到账时间" min-width="160"></el-table-column>
      </el-table>
      <div class="epf_row_c">
        <!-- 错转款到账查询分页 -->
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[5,10, 15, 20]"
          @size-change="errorPay_handleSizeChange"
          @current-change="errorPay_handleCurrentChange"
          :total="errorPay_totalRecord"
          :page-size="errorPay_pageSize"
          :current-page="errorPay_pageNo"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      loading: true,
      //成交 / 剩余缴费通知书数据
      clinchData: {
      },
      // 交易服务费缴费通知书
      tradeServiceData: {
      },
      included: false,
      activeName: "first",
      delShow: false,
      closeTypeIpt: true, //取消状态按钮
      //保证金头部啊
      config: [
        {
          span: 4,
          fie: "licenseNo",
          title: "标的编号"
        },
        {
          span: 4,
          fie: "targetNo",
          title: "应交保证金"
        },
        {
          span: 4,
          fie: "amount",
          title: "实交保证金"
        },
        {
          span: 4,
          fie: "paymentAmount",
          title: "错转款金额"
        },
        {
          span: 4,
          fie: "mispaidAmount",
          title: "交款总额"
        },
        {
          span: 4,
          fie: "id",
          title: "操作"
        }
      ],
      gure: [
        {
          span: 4,
          fie: "targetNo",
          title: "标的编号"
        },
        {
          span: 6,
          fie: "childAccountNo",
          title: "竞买保证金子账号"
        },
        {
          span: 6,
          fie: "bidderAccountName",
          title: "交款账户名称"
        },
        {
          span: 4,
          fie: "bidderAccountBank",
          title: "交款账户开户行"
        },
        {
          span: 4,
          fie: "amountName",
          title: "交款金额"
        }
      ],
      wrongData: {
        //错转款到账查询筛选条件
        title: "",
        account: "",
        accountName: "",
        openingBank: ""
      },
      getMarginFilter: {
        //保证金到账查询
        licenseNo: "",
        targetNo: "",
        childAccountName: "",
        childAccountNo: "",
        childAccountBank: "",
        type: 0,
        page: 1,
        rows: 5
      },
      tableContentData: [
        {
          number: "33983580",
          title: ["DAZ20180004", "DAZ20180005"],
          needBuyPrice: "￥100000.00万元",
          NowPayPrice: "￥2000.00万元",
          errorPayPrice: "￥2000.00万元",
          allPayPrice: "￥4000.00万元",
          publishStatus: "7",
          stateKey: 1,
          state: "联合竞买确认中",
          date: "2019-01-01 18:00:05"
        },
        {
          number: "33983581",
          title: ["DAZ20180004"],
          needBuyPrice: "￥100000.00万元",
          NowPayPrice: "￥2000.00万元",
          errorPayPrice: "0",
          allPayPrice: "500.00万元",
          publishStatus: "7",
          stateKey: 1,
          state: "联合竞买确认中",
          date: "2019-01-01 18:00:05"
        }
      ],
      getAllMarginData: [
        {
          number: "33983580",
          title: "DAZ20180004",
          sonAccount: "154099186912",
          payName: "师帅",
          payAccount: "732915831500000621",
          payBank: "中国工商银行济南分行",
          money: "￥12345678.90元",
          date: "2019-01-01 18:00:05"
        }
      ],
      tableContentData3: [
        //错转款到账查询Data
        {
          numder: "13283580",
          title: "DAZ2018003",
          name: "师帅",
          buyNum: "732915831500000621",
          payType: "中国工商银行济南分行",
          publishStatus: "人民币：500万元",
          date: "2019-01-01 18:00:05"
        },
        {
          numder: "13283580",
          title: "DAZ2018003",
          name: "师帅",
          buyNum: "732915831500000621",
          payType: "中国工商银行济南分行",
          publishStatus: "人民币：500万元",
          date: "2019-01-01 18:00:05"
        },
        {
          numder: "13283580",
          title: "DAZ20180004",
          name: "师帅",
          buyNum: "732915831500000621",
          payType: "中国银行济南分行",
          publishStatus: "人民币：1.000万元",
          date: "2019-01-01 18:00:05"
        }
      ],
      tableContentData3: [],
      ruleForm: {
        title: "",
        //流转方式：
        circulation1: "",
        circulation2: "",
        start: "",
        end: ""
      },
      getPayment: {
        licenseId: "",
        type: "",
        page: 1,
        rows: 5
      },
      //保证金查询筛选
      filtermarginForm: {
        licenseNo: "",
        targetNo: "",
        page: 1,
        rows: 5
      },
      //保证金查询分页
      margin_pageNo: 1,
      margin_pageSize: 5,
      margin_totalPage: 1,
      margin_totalRecord: 1,
      //保证金到账分页
      marginSee_pageNo: 1,
      marginSee_pageSize: 5,
      marginSee_totalPage: 1,
      marginSee_totalRecord: 1,
      //错转款到账查询分页
      errorPay_pageNo: 1,
      errorPay_pageSize: 5,
      errorPay_totalPage: 1,
      errorPay_totalRecord: 1,
      //保证金到账查询分页
      getMargin_pageNo: 1,
      getMargin_pageSize: 5,
      getMargin_totalPage: 1,
      getMargin_totalRecord: 1,

      haveRegister_pageNo: 1,
      haveRegister_pageSize: 5,
      haveRegister_totalPage: 1,
      haveRegister_totalRecord: 1,

      unRegister_pageNo: 1,
      unRegister_pageSize: 10,
      unRegister_totalPage: 1,
      unRegister_totalRecord: 40,
      flexibleOpen: false,
      switchHeight: 41,
      dicRequest: ["flow_mode"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      //保证金到账弹窗
      getMargin: false,
      //保证金到账数据
      getMarginData: [
        {
          needBuyNum: "33983580",
          landMark: "DAZ20180004",
          payName: "万科房地产开发有限公司",
          sonAccount: "22448456156",
          payAccount: "7375346546874867657",
          payBank: "中国银行济南分行",
          priceNum: "￥100000.00万元",
          createdDate: "2019-01-10 18:00:00"
        }
      ],
      //错转款到账查询弹窗
      errorPay: false,
      // 错转款到账查询数据
      errorPayData: [
        {
          needBuyNum: "33983580",
          landMark: "DAZ20180004",
          payName: "万科房地产开发有限公司",
          sonAccount: "22448456156",
          payAccount: "7375346546874867657",
          payBank: "中国银行济南分行",
          priceNum: "￥100000.00万元",
          createdDate: "2019-01-10 18:00:00"
        }
      ],
      MarginInquiryList: [],
      wrongTransferData: []
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-admin/admin/dict/getDictsByCodeOrParentId?code=${item}`,
            { parentId: '0' },
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
      // console.log(res);
      let dicArr = res.map(item => {
        // console.log(item);
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
    this.getMyMarginInquiryList(this.filtermarginForm);
    this.getMyMarginAmountList(this.getMarginFilter);
  },
  methods: {
    // 竞买保证金查询列表
    getMyMarginInquiryList(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/getMyMarginInquiryList",
        params,
        res => {
          if (res.code == "0") {
            this.loading = false;
            this.MarginInquiryList = res.pager.results;
            this.margin_totalRecord = res.pager.totalRecord;
            this.margin_pageSize = res.pager.pageSize;
            this.margin_pageNo = res.pager.pageNo;
          }
        }
      );
    },
    // 保证金到账查询/错转款到账查询
    getMyMarginAmountList(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/queryPaymentAmountOrMispaidAmountList",
        params,
        res => {
          if (res.code == "0") {
            this.loading = false;
            if (this.getMarginFilter.type == 0 && this.activeName == "second") {
              this.getAllMarginData = res.pager.results;
              this.getMargin_totalRecord = res.pager.totalRecord;
              this.getMargin_pageSize = res.pager.pageSize;
              this.getMargin_pageNo = res.pager.pageNo;
            }
            if (this.getMarginFilter.type == 2 && this.activeName == "third") {
              this.wrongTransferData = res.pager.results;
              this.haveRegister_totalRecord = res.pager.totalRecord;
              this.haveRegister_pageSize = res.pager.pageSize;
              this.haveRegister_pageNo = res.pager.pageNo;
            }
          }
        }
      );
    },
    // 查看保证金到账情况/查看错转款到账情况
    getPaymentAmount(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/getPaymentAmountOrMispaidAmountList",
        params,
        res => {
          if (res.code == "0") {
            this.loading = false;
            if (this.getPayment.type == 0) {
              this.getMarginData = res.pager.results;
              this.marginSee_totalRecord = res.pager.totalRecord;
              this.marginSee_pageSize = res.pager.pageSize;
              this.marginSee_pageNo = res.pager.pageNo;
            }
            if (this.getPayment.type == 1) {
              this.errorPayData = res.pager.results;
              this.errorPay_totalRecord = res.pager.totalRecord;
              this.errorPay_pageSize = res.pager.pageSize;
              this.errorPay_pageNo = res.pager.pageNo;
            }
          }
        }
      );
    },
    viewPaymentAmount(id, type) {
      if (type == 0) {
        this.getMargin = true;
      }
      if (type == 1) {
        this.errorPay = true;
      }
      this.getPayment.licenseId = id;
      this.getPayment.type = type;
      this.getPaymentAmount(this.getPayment);
    },
    getFilterInfo(val) {
      console.log(val);
    },
    //保证金分页
    margin_handleSizeChange(val) {
      this.filtermarginForm.rows = val;
      this.getMyMarginInquiryList(this.filtermarginForm);
    },
    margin_handleCurrentChange(val) {
      this.filtermarginForm.page = val;
      this.getMyMarginInquiryList(this.filtermarginForm);
    },
    //保证金查询
    searchMargin_Data() {
      this.getMyMarginInquiryList(this.filtermarginForm);
    },
    //保证金重置
    resetMargin_FilterInfo() {
      this.filtermarginForm.licenseNo = "";
      this.filtermarginForm.targetNo = "";
      this.getMyMarginInquiryList(this.filtermarginForm);
    },
    getsearchMargin_Data(val) {
      this.getMarginFilter.type = val;
      this.getMyMarginAmountList(this.getMarginFilter);
    },
    getresetMargin_Data(val) {
      this.getMarginFilter.type = val;
      this.getMarginFilter.licenseNo = "";
      this.getMarginFilter.targetNo = "";
      this.getMarginFilter.bidderAccountName = "";
      this.getMarginFilter.bidderAccountNo = "";
      this.getMarginFilter.bidderAccountBank = "";
      this.getMyMarginAmountList(this.getMarginFilter);
    },
    //保证金到账查询分页
    getMargin_handleSizeChange(val) {
      this.getMarginFilter.rows = val;
      this.getMyMarginAmountList(this.getMarginFilter);
    },
    getMargin_handleCurrentChange(val) {
      this.getMarginFilter.page = val;
      this.getMyMarginAmountList(this.getMarginFilter);
    },
    //保证金到账分页
    marginSee_handleSizeChange(val) {
      this.getPayment.rows = val;
      this.getPaymentAmount(this.getPayment);
    },
    marginSee_handleCurrentChange(val) {
      this.getPayment.page = val;
      this.getPaymentAmount(this.getPayment);
    },

    //错转款到账查询
    errorPay_handleSizeChange(val) {},
    errorPay_handleCurrentChange(val) {},

    haveRegister_handleSizeChange(val) {
      this.getMarginFilter.rows = val;
      this.getMyMarginAmountList(this.getMarginFilter);
    },
    haveRegister_handleCurrentChange(val) {
      this.getMarginFilter.page = val;
      this.getMyMarginAmountList(this.getMarginFilter);
    },
    unRegister_handleSizeChange(val) {},
    unRegister_handleCurrentChange(val) {},
    // 展开与收起
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 161 : 41;
    }
  },
  watch: {
    activeName(newVal, oldVal) {
      if (newVal == "second") {
        this.getMarginFilter.type = 0;
        this.getMyMarginAmountList(this.getMarginFilter);
        this.getMarginFilter.licenseNo = "";
        this.getMarginFilter.targetNo = "";
        this.getMarginFilter.bidderAccountName = "";
        this.getMarginFilter.bidderAccountNo = "";
        this.getMarginFilter.bidderAccountBank = "";
      } else if (newVal == "third") {
        this.getMarginFilter.type = 2;
        this.getMyMarginAmountList(this.getMarginFilter);
        this.getMarginFilter.licenseNo = "";
        this.getMarginFilter.targetNo = "";
        this.getMarginFilter.bidderAccountName = "";
        this.getMarginFilter.bidderAccountNo = "";
        this.getMarginFilter.bidderAccountBank = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.applyBidde_oper {
  @include size(275px, 36px);
  margin: 0 auto;
  div {
    @include size(70px, 36px);
    background-color: var(--Colors);
    border-radius: 2px;
    text-align: center;
    line-height: 36px;
    display: inline-block;
    margin-right: 25px;
    color: #fff;
    cursor: pointer;
    &:nth-child(2) {
      border: solid 1px var(--Colors);
      background: #fff;
      color: var(--Colors);
    }
    &:nth-last-child(1) {
      margin-right: 0px;
      border: solid 1px #e0dfdf;
      background: #fff;
      color: #666666;
    }
  }
}
.tc_info_title {
  color: #a7a7a7;
  margin: 4px 0;
}
.handlesStyle {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  color: #a7a7a7;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.blue_btn {
  width: 90%;
  padding: 2px 0;
  border: 1px solid #4573d5;
  color: #4573d5;
  background: #fff;
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
  margin: 8px 0;
  cursor: pointer;
}
</style>
