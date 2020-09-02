<template>
  <!-- 合同网签备案弹框模块 -->
  <div class="contractPop_warp">
    <pop-up-widget title="请选择合同类型">
      <epf-step :active="1" :data="step" style="padding:0 30px;"></epf-step>
      <div class="contract_title">
        <div class="contractype">
          <span>合同类型：</span>
          <el-radio-group v-model="contractType" @change="contractypechage">
            <el-radio
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in contractTypeData"
              :key="index"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </div>
        <div class="contractype">
          <span>交易方式：</span>
          <el-radio-group v-model="transactype" @change="transactypechage">
            <el-radio label="自行交易">自行交易</el-radio>
            <el-radio label="委托交易" v-show="isShow">委托交易</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="contract_content">
        <div class="manageinfo">
          <span>选择关联信息：</span>
          <el-radio label="是" v-model="contracmanageinfo"></el-radio>
          <el-radio label="否" v-model="contracmanageinfo"></el-radio>
          <span class="careful">
            <img src="../../../../assets/image/careful.png" alt />
            提示：选择否则无需关联！
          </span>
        </div>
        <!-- 自行交易 -->
        <div class="contract_content_table" v-show="contracmanageinfo==='是'&&transactype==='自行交易'">
          <div
            v-loading="loading"
            element-loading-text="拼命加载中..."
            element-loading-background="rgba(251, 251, 251, 0.9)"
          >
            <el-table :data="tabledata" style="width: 100%" max-height="300">
              <el-table-column label width="50">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.id"
                    v-model="templateRadio"
                    @change.native="getTemplateRow(scope.$index,scope.row)"
                  > <i> </i>  </el-radio>
                </template>
              </el-table-column>
              <el-table-column label="土地基本信息" width="250">
                <template slot-scope="scope">
                  <p style="color:#3c8cdc;">{{scope.row.title}}</p>
                  <p>
                    <span
                      style="margin-right:45px;"
                    >{{scope.row.cantonProvinceName}}-{{scope.row.cantonCityName}}-{{scope.row.cantonAreaName}}</span>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="面积"  width="180">
                <template slot-scope="scope">{{scope.row.area}}平方米</template>
              </el-table-column>
              <el-table-column prop="price" label="金额/万元" width="100">
                <template slot-scope="scope" v-show="transactype=='委托交易'">{{scope.row.transPrice==null?"面议":scope.row.transPrice}}</template>
                <template slot-scope="scope" v-show="transactype=='自行交易'">{{scope.row.price==null?"面议":scope.row.price/10000}}</template>
              </el-table-column>
              <el-table-column prop="circulationName" label="流转方式" width="100"></el-table-column>
              <el-table-column prop="examineTime" label="时间" width="180"></el-table-column>
              <el-table-column prop="publishStatusName" label="状态"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                background
                layout="prev, pager, next,sizes,jumper"
                :page-sizes="[5,10, 15, 20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalRecord"
                :page-size="pageSize"
                style="margin-top:10px;"
              ></el-pagination>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <!-- 委托交易 -->
        <div class="contract_content_table" v-show="contracmanageinfo==='是'&&transactype==='委托交易'">
          <div
            v-loading="loading"
            element-loading-text="拼命加载中..."
            element-loading-background="rgba(251, 251, 251, 0.9)"
          >
            <el-table :data="no_tabledata" style="width: 100%">
              <el-table-column label width="50">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.id"
                    v-model="templateRadio"
                    @change.native="getTemplateRow(scope.$index,scope.row)"
                  > <i> </i>  </el-radio>
                </template>
              </el-table-column>
              <el-table-column label="委托交易基本信息" width="280">
                <template slot-scope="scope">
                  <p style="color:#3c8cdc;">{{scope.row.trustTitle}}</p>
                  <p>{{scope.row.cantonProvinceName}}-{{scope.row.cantonCityName}}-{{scope.row.cantonAreaName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="goodsNo" label="地块编号" width="160"></el-table-column>
              <el-table-column prop="price" label="金额/万元" width="100">
                  <template slot-scope="scope" v-show="transactype=='委托交易'">{{scope.row.transPrice==null?"面议":scope.row.transPrice/10000}}</template>
                  <template slot-scope="scope" v-show="transactype=='自行交易'">{{scope.row.price==null?"面议":scope.row.price/10000}}</template>
              </el-table-column>
              <el-table-column prop="circulationName" label="流转方式" width="100"></el-table-column>
              <el-table-column prop="insertTime" label="申请时间" width="180"></el-table-column>
              <el-table-column prop="statusName" label="状态"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                background
                layout="prev, pager, next,sizes,jumper"
                :page-sizes="[5,10, 15, 20]"
                @size-change="no_handleSizeChange"
                @current-change="no_handleCurrentChange"
                :total="no_totalRecord"
                :page-size="no_pageSize"
                style="margin-top:10px;"
              ></el-pagination>
            </div>
            <!-- ../../../../assets/image/dataNone.png -->
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="operate">
          <div class="epf_btn epf_btn_bg" @click="sureSign()">确定</div>
          <div class="epf_btn epf_btn_def" @click="close('SignRecordInfo')">取消</div>
        </div>
      </div>
    </pop-up-widget>
  </div>
</template>
<script>
import PopUpWidget from "@/components/PopUpWidget";
import { mapState, mapMutations, mapActions } from "vuex";
;
export default {
  components: { PopUpWidget },
  data() {
    return {
      step: ['填写信息','合同审核','合同鉴证','完成'],
    	isShow:true,
      //分页
      //自行交易
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 0,
      tabledata: [],
      //委托交易
      no_pageNo: 1,
      no_pageSize: 5,
      no_totalPage: 1,
      no_totalRecord: 0,
      no_tabledata: [],
      loading: true,

      contractType: "transfer",
      contractTypeName: "转让",
      transactype: "自行交易",
      contracmanageinfo: "是",
      relevanceCode: "",
      radio: "",
      sellContract: null,
      TransGoodsCirculation: null,
      sellrows: null,
      Transrows: null,
      contractTypeData: [
        { label: "transfer", value: "转让" },
        { label: "rent", value: "出租" },
        { label: "mortgage", value: "抵押" }
      ],
      contractTypeitem: { label: "transfer", value: "转让" },
      templateSelection: null,
      templateRadio: null
    };
  },
  created() {
    let that = this;
    this.$bus.$off("contactDialogData");
    this.$bus.$on("contactDialogData", val => {
      let params = {
        circulation: this.contractType,
        page: that.pageNo,
        rows: that.pageSize
      };
      console.log("===that.transactype=====", that.transactype);
      if (that.transactype == "自行交易") {
        that.getTSellByContract(params);
      }
      if (that.transactype == "委托交易") {
        that.getTransGoodsByCirculation(params);
      }
    });
  },
  methods: {
    ...mapMutations("homeland", ["close"]),
    getTemplateRow(index, row) {
      //获取选中数据
      this.radio = row.id;
    },
    fetchData() {
      console.log("=====this.contractType==", this.contractType);
      if (this.transactype == "自行交易") {
        let params = {
          circulation: this.contractType,
          page: this.pageNo,
          rows: this.pageSize
        };
        this.getTSellByContract(params);
      } else if (this.transactype == "委托交易") {
        let params = {
          circulation: this.contractType,
          page: this.no_pageNo,
          rows: this.no_pageSize
        };
        this.getTransGoodsByCirculation(params);
      }
    },
    //合同网签弹框--合同网签遍历土地信息-自行交易列表
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.fetchData();
    },
    getTSellByContract(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/tsell/getTSellByContract",
        params,
        res => {
          if (res.code == 0) {
            console.log("列表结果", res);
            this.tabledata = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
          } else {
            this.$message.error(res.msg);
            // this.$message.error("操作失败：登录已失效");
          }
          this.loading = false;
        }
      );
    },
    // 合同网签弹框--合同网签遍历土地信息-委托交易列表
    no_handleSizeChange(val) {
      this.no_pageSize = val;
      this.getTransGoodsByCirculation();
    },
    no_handleCurrentChange(val) {
      this.no_pageNo = val;
      this.getTransGoodsByCirculation();
    },
    getTransGoodsByCirculation(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/getTransGoodsByCirculation",
        params,
        res => {
          if (res.code == 0) {
            console.log("列表结果", res);
            this.no_tabledata = res.pager.results;
            this.no_pageNo = res.pager.pageNo;
            this.no_pageSize = res.pager.pageSize;
            this.no_totalPage = res.pager.totalPage;
            this.no_totalRecord = res.pager.totalRecord;
          } else {
            // this.$message.error(res.msg);
            this.$message.error("操作失败：登录已失效");
          }
          this.loading = false;
        }
      );
    },
    sureSign() {
      this.$store.state.contract = null;
      this.$store.state.LandbasicInfo = null;
      sessionStorage.removeItem("ruleFormSign");
      if (this.contracmanageinfo == "是" && this.transactype == "自行交易") {
        this.relevanceCode = "1";
      } else if (
        this.contracmanageinfo == "是" &&
        this.transactype == "委托交易"
      ) {
        this.relevanceCode = "2";
      } else if (this.contracmanageinfo == "否") {
        this.relevanceCode = "3";
      }
      if (this.contracmanageinfo == "是") {
        let params = {
          landId: this.radio,
          signRecord: this.contractTypeitem.label,
          signRecordtype: this.contractTypeitem.value,
          transactype: this.transactype,
          relevanceCode: this.relevanceCode
        };
        if (this.radio !== "") {
          this.$router.push({
            path: "/OnlineContractHome/PartybasicInfo",
            query: params
          });
        } else if (this.radio == "") {
          this.$message({message:'请选择关联地块信息',type:'error',customClass:'zZindex'});
        }
        return;
      } else if (this.contracmanageinfo == "否") {
        let params = {
          signRecord: this.contractTypeitem.label,
          signRecordtype: this.contractTypeitem.value,
          transactype: this.transactype,
          relevanceCode: this.relevanceCode
        };
        this.$router.push({
          path: "/OnlineContractHome/PartybasicInfo",
          query: params
        });
      }
      if (this.contracmanageinfo == "否") {
        let params = {
          signRecord: this.contractTypeitem.label,
          signRecordtype: this.contractTypeitem.value,
          transactype: this.transactype,
          relevanceCode: this.relevanceCode
        };
        this.$router.push({
          path: "/OnlineContractHome/PartybasicInfo",
          query: params
        });
      } else {
        let params = {
          landId: this.radio,
          signRecord: this.contractTypeitem.label,
          signRecordtype: this.contractTypeitem.value,
          transactype: this.transactype,
          relevanceCode: this.relevanceCode
        };
        this.$router.push({
          path: "/OnlineContractHome/PartybasicInfo",
          query: params
        });
      }
    },
    // 合同类型切换
    contractypechage(item) {
      this.radio = "";
      this.templateRadio = null;
      this.loading = true;
      this.pageNo = 1;
      this.pageSize = 5;
      this.no_pageNo = 1;
      this.no_pageSize = 5;
      this.contractType = item;
      if (item === "transfer") {
        this.contractTypeitem = { label: "transfer", value: "转让" };
        this.isShow = true;
      }
      if (item === "rent") {
        this.contractTypeitem = { label: "rent", value: "出租" };
        this.isShow = true;
      }
      if (item === "mortgage") {
        this.contractTypeitem = { label: "mortgage", value: "抵押" };
        this.isShow = false;
      }
      this.fetchData();
    },
    transactypechage() {
      this.radio = "";
      this.templateRadio = null
    }
  },
  watch: {
    contractType(v1, v2) {
      if (v1 != v2) {
        this.fetchData();
        this.radio = "";
      }
    },
    transactype(v1, v2) {
      if (v1 != v2) {
        this.fetchData();
        this.radio = "";
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
.contractPop_warp {
  @include size(1000px, auto);
  padding-bottom: 30px;
  .contract_title {
    @include size(950px, 110px);
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 28px;
    // margin-top: 70px;
    border-bottom: solid 1px #f3f3f3;
    padding-top: 18px;
    .contractype {
      @include size(100%, auto);
      line-height: 40px;
      font-size: 14px;
      color: #666666;
      span {
        color: #333333;
      }
    }
  }
  .contract_content {
    @include size(950px, auto);
    margin: 0 auto;
    .manageinfo {
      margin: 26px 0;
      .careful {
        font-size: 12px;
        color: #999999;
      }
    }
    .contract_content_table {
      @include size(950px, auto);
      table {
        tr {
          height: 64px;
          text-align: center;
          line-height: 64px;
          border-bottom: solid 1px #f3f3f3;
          color: #666666;
          &:nth-child(1) {
            background-color: #f6f9fe;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            height: 50px;
          }
          td {
            text-align: center;
          }
          .td1 {
            width: 50px;
            text-align: left;
            input {
              @include size(16px, 16px);
              background-image: linear-gradient(0deg, #f2f4f8 1%, #ffffff 100%);
              border-radius: 4px;
              border: solid 1px #ced0da;
              margin-left: 10px;
              margin-top: 10px;
              cursor: pointer;
            }
          }
          .td2 {
            width: 300px;
            text-align: left;
          }
          p {
            line-height: 25px;
          }
        }
      }
      .block {
        margin: 20px;
        float: right;
      }
    }
    .operate {
      @include size(200px, 36px);
      margin: 10px auto;
      // div{width:82px;}
    }
  }
}
</style>
