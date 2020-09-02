<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="履约保证金到账查询" name="first">
        <epf-filter>
          <div class="epf_height_act"  :style="{'height':switchHeight + 'px'}">
            <el-row :gutter="3">
              <el-col :span="3">
                <span
                  class="epf_form_title">委托编号：</span>
              </el-col>
              <el-col :span="5">
                <el-input size="medium"
                  v-model="getBondFilter.transactionNo"
                  placeholder="请输入委托编号">
                </el-input>
              </el-col>
              <el-col :span="4">
                <span class="epf_form_title">缴款账户名称：</span>
              </el-col>
              <el-col :span="6">
                <el-input size="medium"
                  v-model="getBondFilter.bidderAccountName"
                  placeholder="请输入缴款账户名称">
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
            <el-row :gutter="3"> 
              <el-col :span="3">
                <span class="epf_form_title">收款账户名称：</span>
              </el-col>
              <el-col :span="6">
                <el-input size="medium"
                  v-model="getBondFilter.childAccountName"
                  placeholder="请输入收款账户名称">
                </el-input>
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
        <!-- 履约保证金查询 -->

        <epf-customTable
          :data="porformanceBondList"
          :config="config"
          v-loading="loading"
          tableTpe="bond"
          element-loading-text="拼命加载中...">
          <template v-slot:bidderAccountName="scope">
            <epf-column slot="bidderAccountName">
                <div class="epf-bond">
                    <p ref="long">交款账户：{{scope.row.bidderAccountNo}}</p>
                    <p ref="long">交款账户名称：{{scope.row.bidderAccountName}}</p>
                    <p ref="long">交款账户开户行：{{scope.row.bidderAccountBank}}</p>
                </div>
            </epf-column>
          </template>
          <template v-slot:childAccountName="scope">
            <epf-column slot="childAccountName">
                <div class="epf-bond">
                    <p ref="long">收款账户：{{scope.row.childAccountNo}}</p>
                    <p ref="long">收款账户名称：{{scope.row.childAccountName}}</p>
                    <p ref="long">收款账户开户行：{{scope.row.childAccountBank}}</p>
                </div>
            </epf-column>
          </template>
          <template v-slot:getPrice="scope">
            <epf-column slot="getPrice">
                <span class="epf_money">{{scope.row.amountName}}</span>
            </epf-column>
          </template>
        </epf-customTable>
        <div v-if="porformanceBondList == [] || porformanceBondList == ''"
          class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <!-- 履约保证金查询分页 -->
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo"
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
      loading: true,
      activeName: "first",
      //履约保证金头部
      config: [
        {
          span: 9,
          fie: "bidderAccountName",
          title: "交款账户信息"
        },
        {
          span: 9,
          fie: "childAccountName",
          title: "收款账户信息"
        },
        {
          span: 6,
          fie: "getPrice",
          title: "到账金额"
        }
      ],
      // 履约保证金查询筛选
      getBondFilter: {
        transactionNo: "",//委托编号
        bidderAccountName: "",	//	缴款账号名称
        childAccountName:"",//收款账号名称
        page: 1,
        rows: 5
      },
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      porformanceBondList:[],
      flexibleOpen: false,
      switchHeight: 41,
    };
  },
  created() {
    this.getlistMyGoodsMargin(this.getBondFilter)
  },
  methods: {
    // 履约保证金查询列表
    getlistMyGoodsMargin(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/listMyGoodsMargin",
        params,
        res => {
          if (res.code == "0") {
            this.loading = false;
            this.porformanceBondList = res.pager.results;
            this.totalRecord = res.pager.totalRecord;
            this.pageSize = res.pager.pageSize;
            this.pageNo = res.pager.pageNo;
          }
        }
      );
    },
    handleSizeChange(val){
        console.log(val)
        this.getBondFilter.rows = val;
        this.getlistMyGoodsMargin(this.getBondFilter)
    },
    handleCurrentChange(val){
        console.log(val)
        this.getBondFilter.page = val;
        this.getlistMyGoodsMargin(this.getBondFilter)
    },
    //保证金重置
    resetMargin_FilterInfo() {
      this.getBondFilter.transactionNo = "";
      this.getBondFilter.bidderAccountName = "";
      this.getBondFilter.childAccountName = "";
      this.getlistMyGoodsMargin(this.getBondFilter);
    },
    //履约保证金查询
    searchMargin_Data(val) {
      this.getlistMyGoodsMargin(this.getBondFilter);
    },
    //展开收起
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 100 : 41;
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.tabBox{
    /deep/ h4.title{
        text-align: left;
        padding-left:18px;
    }
    .epf-bond{
        padding-left:18px;
        display: initial;
        flex-direction: column;
        justify-content: space-around;
        p{
            text-align: left;
            color: #666;
            line-height: 30px;
            padding-left:10px;
        }
    }
}


</style>
