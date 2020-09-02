<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="供给信息" name="first">
        <epf-filter
          @filterInfo="getFilterInfo"
          :closeTypeIpt="closeTypeIpt"
          :demandSelect="demandSelect"
        ></epf-filter>
        <!-- 供给信息 -->
        <epf-customTable 
          :data="tableContentData" 
          :config="config">
          <template v-slot:img="scope">
            <epf-column slot="img">
              <epf-modeMsg 
                @clickTitle="openDetail"
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div class="epf_fie_box">
                <span v-if="!scope.row.dealOrg" class="epf_money">
                  <span>￥</span>
                   {{scope.row.price?Division(scope.row.price):'面议'}}
                </span>
                <span v-if="scope.row.dealOrg" class="epf_money">
                  {{scope.row.dealOrg}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:title="scope">
            <epf-column slot="title">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.spTypeName}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:time="scope">
            <epf-column slot="time">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.insertTime}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_btn_flex">
                <span>
                  <el-button 
                    size="mini" 
                    @click="cancelCollection(scope.row.id)">
                    取消收藏
                  </el-button>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>
        <!-- 供给信息 -->
        <div class="epf_page_sile"
          v-if="tableContentData == [] || tableContentData == ''">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="unRegister_handleSizeChange"
            @current-change="unRegister_handleCurrentChange"
            :total="unRegister_totalRecord"
            :page-size="unRegister_pageSize"
            :current-page="unRegister_pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="需求信息" name="second">
        <epf-filter
          @filterInfo="getFilterInfo"
          :closeTypeIpt="closeTypeIpt"
          :demandSelect="!demandSelect"
        ></epf-filter>

        <!-- 需求信息 -->
        <epf-customTable :data="tableContentData2" :config="config2">
          <template v-slot:img="scope">
            <epf-column slot="img">
              <epf-modeMsg 
                @clickTitle="toDetail"
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div class="epf_fie_box">
                <span v-if="!scope.row.dealOrg" class="epf_money">
                  <span>￥</span>
                 {{scope.row.price?Division(scope.row.price):'面议'}}
                </span>
                <span v-if="scope.row.dealOrg" class="epf_money">
                  {{scope.row.dealOrg}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:title="scope">
            <epf-column slot="title">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe" 
                  v-if="scope.row.spType == 'need_rent'">求租</span>
                <span v-else class="epf_fie_lihe">求购</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:time="scope">
            <epf-column slot="time">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.insertTime}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_btn_flex">
                <span>
                  <el-button size="mini" 
                    @click="cancelCollection(scope.row.id)">
                    取消收藏
                  </el-button>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>
        <div class="epf_page_sile"
          v-if="tableContentData2 == [] || tableContentData2 == ''">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>

        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="haveRegister_handleSizeChange"
            @current-change="haveRegister_handleCurrentChange"
            :total="haveRegister_totalRecord"
            :page-size="haveRegister_pageSize"
            :current-page="haveRegister_pageNo"
            style="margin-top:10px;"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="委托交易信息" name="third">
        <epf-filter
          @filterInfo="getFilterInfo"
          :transSelect="transSelect"
          :closeTypeIpt="closeTypeIpt"
        ></epf-filter>
        <!-- 委托交易信息 -->
        <epf-customTable :data="tableContentData3" :config="config3">
          <template v-slot:img="scope">
            <epf-column slot="img">
              <epf-modeMsg
                @clickTitle="toTradeDetail"
                :showLandUseFlag="true"
                :data="scope.row.goodsList[0]">
              </epf-modeMsg>
            </epf-column>
          </template>
          <!-- 交易方式 -->
          <template v-slot:transType="scope">
            <epf-column slot="transType">
              <div class="epf_fie_box">
                <span
                  v-if="scope.row.transTypeName"
                  class="epf_fie_lihe"
                  style="color: rgb(167, 167, 167); text-align: center;font-size: 14px;"
                >{{scope.row.transTypeName}}</span>
              </div>
            </epf-column>
          </template>
          <!-- 交易状态 transState -->
          <template v-slot:transState="scope">
            <epf-column slot="transState">
              <div class="epf_fie_box">
                <span
                  v-if="scope.row.statusName"
                  class="epf_fie_lihe"
                  style="color: rgb(167, 167, 167); float: right; padding-right: 45px; font-size: 14px;"
                >{{scope.row.statusName}}</span>
              </div>
            </epf-column>
          </template>
          <!-- 流转方式 contype -->
          <template v-slot:contype="scope">
            <epf-column slot="contype">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.businessTypeName}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:time="scope">
            <epf-column slot="time">
              <div class="epf_fie_box">
                <!-- listing_mode--网上交易（挂牌）-->
                <span class="epf_fie_lihe" v-if="scope.row.transTypeName=='网上交易（挂牌）'">
                  {{scope.row.beginFocusTime}}
                </span>
                <span class="epf_fie_lihe" v-if="scope.row.transTypeName=='网上交易（拍卖）'">
                  {{scope.row.beginLimitTime}}
                </span>
              </div>
            </epf-column>
          </template>
          <!-- <template v-slot:time="scope">
            <epf-column slot="time">
              <div class="epf_fie_box">
                <span
                  class="epf_fie_lihe"
                  style="color: rgb(167, 167, 167); float: right; padding-right: 45px; font-size: 14px;"
                >{{scope.row.beginFocusTime}}</span>
              </div>
            </epf-column>
          </template> -->
          <!-- <template v-slot:title="scope">
            <epf-column slot="title">
              <div class="epf_fie_box">
                <span style="color:#ffa200;" 
                  class="epf_fie_lihe">
                  {{scope.row.transTypeName}}
                </span>
              </div>
            </epf-column>
          </template> -->
          <!-- <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.businessTypeName}}
                </span>
              </div>
            </epf-column>
          </template> -->
          <!-- <template v-slot:time="scope">
            <epf-column slot="time">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.insertTime}}
                </span>
              </div>
            </epf-column>
          </template> -->
          <template v-slot:status="scope">
            <epf-column slot="status">
              <div class="epf_btn_flex">
                <span>
                  <el-button
                    size="mini"
                    class="operationBtn"
                    style="width:100px;"
                    @click="collect(scope.row.id)">
                    取消关注
                  </el-button>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div v-if="tableContentData3 == [] || tableContentData3 == ''" class="epf_row_c">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="entrustInfo_handleSizeChange"
            @current-change="entrustInfo_handleCurrentChange"
            :total="entrustInfo_totalRecord"
            :page-size="entrustInfo_pageSize"
            :current-page="entrustInfo_pageNo"
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
      transSelect:true,
      baseUrl: "",
      activeName: "first",
      ruleForm:{
        title:'',
        cantonProvince: "", //省
        cantonProvinceName: "",
        cantonCity: "", //市
        cantonCityName: "",
        cantonArea: "", //区
        cantonAreaName: "",
        circulation: "", //流转方式：
        circulatemodeName: "",
      },
      delShow: false,
      closeTypeIpt: true, //取消状态按钮
      demandSelect: false, //选择流转方式还是需求类型
      config: [
        {
          span: 9,
          fie: "img",
          title: "供给基本信息"
        },
        {
          span: 4,
          fie: "id",
          title: "金额/万元"
        },
        {
          span: 3,
          fie: "title",
          title: "流转方式"
        },
        {
          span: 4,
          fie: "time",
          title: "发布时间"
        },
        {
          span: 4,
          fie: "price",
          title: "操作"
        }
      ],
      config2: [
        {
          span: 9,
          fie: "img",
          title: "需求基本信息"
        },
        {
          span: 4,
          fie: "id",
          title: "金额/万元"
        },
        {
          span: 3,
          fie: "title",
          title: "需求类型"
        },
        {
          span: 4,
          fie: "time",
          title: "发布时间"
        },
        {
          span: 4,
          fie: "price",
          title: "操作"
        }
      ],
      config3: [
        {
          span: 8,
          fie: "img",
          title: "标的基本信息"
        },
        {
          span: 4,
          fie: "transType",
          title: "交易方式"
        },
        {
          span: 3,
          fie: "transState",
          title: "交易状态"
        },
        {
          span: 2,
          fie: "contype",
          title: "流转方式"
        },
        {
          span: 4,
          fie: "time",
          title: "挂牌（拍卖）开始时间"
        },
        {
          span: 3,
          fie: "status",
          title: "操作"
        }
      ],
      tableContentData: {},
      tableContentData2: {},
      tableContentData3: {},
      tableContentData4: {},
      haveRegisterSearch: {},
      unRegisterSearch: {},
      filterData3: {
        token:"",
        targetNo: "",
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        businessType: "",
        beginTime:"",
        endTime:"",
        firstClassUse:"",
        secondClassUse:"",
        page: 1,
        rows: 5,
        scordbFlag:""
      },
      unRegister_pageNo: 1,
      unRegister_pageSize: 10,
      unRegister_totalPage: 1,
      unRegister_totalRecord: 1,

      haveRegister_pageNo: 1,
      haveRegister_pageSize: 5,
      haveRegister_totalPage: 0,
      haveRegister_totalRecord: 0,

      entrustInfo_pageNo: 1,
      entrustInfo_pageSize: 5,
      entrustInfo_totalPage: 0,
      entrustInfo_totalRecord: 0,

      agreeInfo_pageNo: 1,
      agreeInfo_pageSize: 5,
      agreeInfo_totalPage: 0,
      agreeInfo_totalRecord: 0,
      filterDataPrams: {
        l_type: "tsell",
        title: "",
        startTime: "",
        endTime: "",
        // cantonProvince:"",
        // cantonCity:"",
        // cantonArea:"",
        minArea: "",
        maxArea: "",
        page: 1,
        rows: 5
      },
      testData:{
          "msg": "操作成功！",
          "code": 0,
          "pager": {
              "pageNo": 1,
              "pageSize": 15,
              "totalRecord": 1,
              "totalPage": 1,
              "results": [
                  {
                      "cantonCityName": "",
                      "businessTypeName": "转让",
                      "goodsList": [
                          {
                              "goodsNo": "TG20190625171034",
                              "img": null,
                              "firstClassUseName": "住宅用地",
                              "cantonCityName": "济南市",
                              "goodsId": "3705c3f4-5bd5-4c10-86e5-00aa14009be8",
                              "secondClassUseName": "廉租住房用地",
                              "cantonProvince": "administrative_regions-022",
                              "cantonCity_": "administrative_regions-023",
                              "cantonCity": "administrative_regions-023",
                              "cantonArea": "administrative_regions-024",
                              "cantonAreaName": "历下区",
                              "firstClassUse": "residential_land",
                              "secondClassUse": "land_use-015",
                              "cantonProvinceName": "山东省"
                          }
                      ],
                      "statusName": "已成交",
                      "transType": "listing_mode",
                      "transTypeName": "网上交易（挂牌）",
                      "endFocusTime": "2019-06-25 18:30:00",
                      "targetNo": "TG20190625171034",
                      "id": "aefb81af-c3f1-4a9a-8345-03a46308d38e",
                      "businessType": "transfer",
                      "beginFocusTime": "2019-06-25 18:25:00",
                      "status": "trans_status-007"
                  }
              ],
              "params": {}
          }
      },
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let params = {
      page: this.unRegister_pageNo,
      rows: this.unRegister_pageSize,
      l_type: "tsell"
    };
    this.init(params);
    let token = localStorage.getItem("token")
    // this.filterData3.token = token
    this.initTransCollectList(this.filterData3);
  },
  methods: {
    collect(id) {
      //取消收藏
      this.$axios.post(
        "/epf-landweb/admin/deleteTransCollect",
        qs.stringify({
          targetId: id
        }),
        res => {
          //刷新页面
          this.initTransCollectList(this.filterData3);
        }
      );
    },
    entrustInfo_handleSizeChange(val) {
      //每页条数改变时触发
      this.filterData3["page"] = this.entrustInfo_pageNo;
      this.filterData3["rows"] = val;
      this.initTransCollectList(this.filterData3);
    },
    entrustInfo_handleCurrentChange(val) {
      this.filterData3["page"] = val;
      this.filterData3["rows"] = this.haveRegister_pageSize;
      this.initTransCollectList(this.filterData3);
    },
    agreeInfo_handleSizeChange(val) {},
    agreeInfo_handleCurrentChange(val) {},
    handleClick(tab, event) {
      this.activeName = tab.name;
      // if(this.filterDataPrams.activeName == 'first'){
      //   this.collectType = 'tsell'
      // }else if(this.activeName == 'second'){
      //   this.filterDataPrams.collectType = 'tpurchase'
      // }
      if (this.activeName == "first") {
        let params = {
          page: this.unRegister_pageNo,
          rows: this.unRegister_pageSize,
          l_type: "tsell"
        };
        this.init(params);
      } else if (this.activeName == "second") {
        let params = {
          page: this.haveRegister_pageNo,
          rows: this.haveRegister_pageSize,
          l_type: "tpurchase"
        };
        this.init(params);
      } else {
        this.filterData3 = {
          token:localStorage.getItem('token'),
          targetNo: "",
          cantonProvince: "",
          cantonCity: "",
          cantonArea: "",
          businessType: "",
          beginTime: "",
          endTime: "",
          firstClassUse: "",
          secondClassUse: "",
          page: 1,
          rows: 5
        };
        this.initTransCollectList(this.filterData3);
      }
    },
    init(val) {
      let filter = {
        title: val.title,
        type: val.circulation == "" ? val.demand : val.circulation,
        collectType: val.l_type,
        province: val.cantonProvince,
        city: val.cantonCity,
        region: val.cantonArea,
        startTime: val.issueBeginDate,
        endTime: val.issueEndDate,
        minArea: val.areaLast,
        maxArea: val.areaMost,
        page: val.page,
        rows: val.rows
      };
      let token = localStorage.getItem('token')
      filter.token = token
      console.log(filter)
      this.$axios.get(
        "/epf-landweb/transwebcollect/myCollectList",
        filter,
        res => {
          if (this.activeName == "first") {
            this.tableContentData = res.pager.results;
            this.unRegister_pageNo = res.pager.pageNo;
            this.unRegister_pageSize = res.pager.pageSize;
            this.unRegister_totalPage = res.pager.totalPage;
            this.unRegister_totalRecord = res.pager.totalRecord;
          } else if (this.activeName == "second") {
            this.tableContentData2 = res.pager.results;
            this.haveRegister_pageNo = res.pager.pageNo;
            this.haveRegister_pageSize = res.pager.pageSize;
            this.haveRegister_totalPage = res.pager.totalPage;
            this.haveRegister_totalRecord = res.pager.totalRecord;
          }
        }
      );
    },
    initTransCollectList(filter) {
      this.$axios.get(
        "/epf-landweb/admin/getTransCollectListByUserId",
        filter,
        res => {
          
        console.log("=====",this.activeName)
          if (this.activeName == "third") {
            this.tableContentData3 = res.pager.results;
            this.entrustInfo_pageNo = res.pager.pageNo;
            this.entrustInfo_pageSize = res.pager.pageSize;
            this.entrustInfo_totalPage = res.pager.totalPage;
            this.entrustInfo_totalRecord = res.pager.totalRecord;
          }
        }
      );
    },
    // 所有条件查询
    getFilterInfo(val) {
      // ;
      this.unRegister_pageNo = 1;
      this.haveRegister_pageNo = 1;
      if (this.activeName == "first") {
        this.unRegisterSearch = val;
        this.unRegisterSearch["page"] = this.unRegister_pageNo;
        this.unRegisterSearch["rows"] = this.unRegister_pageSize;
        this.unRegisterSearch["l_type"] = "tsell";
        this.init(this.unRegisterSearch);
      } else if (this.activeName == "second") {
        this.haveRegisterSearch = val;
        this.haveRegisterSearch["page"] = this.haveRegister_pageNo;
        this.haveRegisterSearch["rows"] = this.haveRegister_pageSize;
        this.haveRegisterSearch["l_type"] = "tpurchase";
        this.init(this.haveRegisterSearch);
      } else if (this.activeName == "third") {
        // this.filterData3 = val;
        this.filterData3.targetNo = val.title;
        this.filterData3.businessType = val.circulation;
        this.filterData3.cantonProvince = val.cantonProvince;
        this.filterData3.cantonCity = val.cantonCity;
        this.filterData3.cantonArea = val.cantonArea;
        this.filterData3.token = localStorage.getItem('token')
        console.log("======this.filterData3",this.filterData3)
        this.initTransCollectList(this.filterData3);
      }
    },
    //取消收藏
    cancelCollection(id) {
      let para = { ids: id };
      let that = this;
      this.$axios.post(
        "/epf-landweb/transwebcollect/deleteTransWebCollect",
        qs.stringify({ id: id }),
        res => {
          console.log("==res==",res)
          if (res.code === 0) {
            if (that.activeName == "first") {
              let params = {
                page: that.unRegister_pageNo,
                rows: that.unRegister_pageSize,
                l_type: "tsell"
              };
              that.init(params);
            } else {
              let params = {
                page: that.haveRegister_pageNo,
                rows: that.haveRegister_pageSize,
                l_type: "tpurchase"
              };
              that.init(params);
            }
          }
          that.$message.warning(res.msg);
        }
      );
    },
    //分页
    haveRegister_handleSizeChange(val) {
      //每页条数改变时触发
      this.haveRegisterSearch["page"] = this.haveRegister_pageNo;
      this.haveRegisterSearch["rows"] = val;
      if (this.activeName == "first") {
        this.haveRegisterSearch["l_type"] = "tsell";
      } else {
        this.haveRegisterSearch["l_type"] = "tpurchase";
      }
      this.init(this.haveRegisterSearch);
    },
    haveRegister_handleCurrentChange(val) {
      //获取当前页
      this.haveRegisterSearch["page"] = val;
      this.haveRegisterSearch["rows"] = this.haveRegister_pageSize;
      if (this.activeName == "first") {
        this.haveRegisterSearch["l_type"] = "tsell";
      } else {
        this.haveRegisterSearch["l_type"] = "tpurchase";
      }
      this.init(this.haveRegisterSearch);
    },
    unRegister_handleSizeChange(val) {
      //每页条数改变时触发
      this.unRegisterSearch["page"] = this.unRegister_pageNo;
      this.unRegisterSearch["rows"] = val;
      if (this.activeName == "first") {
        this.unRegisterSearch["l_type"] = "tsell";
      } else {
        this.unRegisterSearch["l_type"] = "tpurchase";
      }
      this.init(this.unRegisterSearch);
    },
    unRegister_handleCurrentChange(val) {
      //获取当前页
      this.unRegisterSearch["page"] = val;
      this.unRegisterSearch["rows"] = this.unRegister_pageSize;
      if (this.activeName == "first") {
        this.unRegisterSearch["l_type"] = "tsell";
      } else {
        this.unRegisterSearch["l_type"] = "tpurchase";
      }
      this.init(this.unRegisterSearch);
    },
    openDetail(data) {
      console.log(data)
      //跳转详情
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: data.targetId }
      });
      window.open(routeUrl.href, "_blank");
    },
    toDetail(data) {
      this.$router.push({ path: "/supplyDetails", query: { supply: data.targetId } });
    },
    toTradeDetail(data) {
      this.$router.push({
        path: "/TradingDetails",
        query: { id: data.targetId, selectedTraState: data.status }
      });
    }
  }
};
</script>
