<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName" @tab-click="selectTabs">
      <el-tab-pane label="未发布信息" name="first" :disabled="showMsgF">
        <epf-filter
          @filterInfo="getFilterInfo_un" 
          ref="un_clearSearchText" 
          :isFlag="isFlag">
        </epf-filter>
        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @edioBtn="ediotHandle"
          @deleBtn="delSupply">
          <template v-slot:area="scope">
            <epf-column slot="area">
              <epf-modeMsg
                @clickTitle="openDetail"
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div clas="epf_fie_box">
                <span class="epf_money">
                  {{scope.row.price?'￥ '+Division(scope.row.price) +'万元':'面议'}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:img="scope">
            <epf-column slot="img">
              <div clas="epf_fie_box">
                <span class="epf_fie_lihe"
                >{{scope.row.demandName || scope.row.circulationName}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div clas="epf_fie_box">
                <span class="epf_fie_lihe">
                  <span :class="scope.row.publishStatus=='draft2'?'default':''"></span>
                  <span :class="scope.row.publishStatus=='audit'?'default':''"></span>
                  <span :class="scope.row.publishStatus=='audit_failure'?'error':''"></span>
                  <span>{{scope.row.publishStatusName}}</span>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:taskId="scope">
            <epf-column slot="taskId">
              <div class="epf_btn_flex">
                <!-- 解决1428bug -->
                <span>
                  <p v-if="scope.row.publishStatus=='draft2'||scope.row.publishStatus=='audit_failure'">
                    <el-button size="mini" @click="ediotHandle(scope.row)">编辑</el-button>
                  </p>
                  <p v-if="scope.row.publishStatus=='draft2'||scope.row.publishStatus=='audit_failure'">
                    <el-button size="mini" @click="delSupply(scope.row)">删除</el-button>
                  </p>
                  <p v-if="scope.row.publishStatus=='audit'">
                    <el-button size="mini" @click="openDetail(scope.row)">查看详情</el-button>
                  </p>
                  <p v-if="scope.row.publishStatus=='audit_failure'">
                      <el-popover
                      ref="popover1"
                      placement="bottom-start"
                      transition="el-zoom-in-top"
                      title="查看审核失败原因"
                      width="350"
                      trigger="click"
                      popper-class="auditErrorPop">
                      <div class="remarkContent_box">
                        <div style="color:#ff3f45;width:65px;float:left;height:100%;padding:0 0 10px 10px;">失败原因:</div>
                        <div style="float:left;width:245px;">{{auditFailure}}</div>
                      </div>
                      <el-button
                        slot="reference"
                        class="auditErrorPopBtn"
                        style="border:none;padding:0px;"
                        @click.native="addComment(scope.row.applyId, scope._index)">
                        审核意见
                        <i class="el-icon-caret-bottom"></i>
                      </el-button>
                    </el-popover>
                  </p>
                </span>
                <!-- <span v-if="scope.row.publishStatus=='draft2'||scope.row.publishStatus=='audit_failure'"
                  class="epf_fie_lihe" style="margin-right:10px;"> 
                  <el-button size="mini" @click="ediotHandle(scope.row)">编辑</el-button>
                </span>
                <span v-if="scope.row.publishStatus=='draft2'||scope.row.publishStatus=='audit_failure'"
                  class="epf_fie_lihe"> 
                  <el-button size="mini" @click="delSupply(scope.row)">删除</el-button>
                </span>
                <span v-if="scope.row.publishStatus=='audit'"
                  class="epf_fie_lihe">
                  <el-button size="mini" @click="openDetail(scope.row)">查看详情</el-button>
                </span>
                <span v-if="scope.row.publishStatus=='audit_failure'"  :style="scope.row.publishStatus=='draft2'||scope.row.publishStatus=='audit_failure'?'position:absolute;bottom:-40px;':''"
                  class="epf_fie_lihe">
                  <el-popover
                    ref="popover1"
                    placement="bottom-start"
                    transition="el-zoom-in-top"
                    title="查看审核失败原因"
                    width="350"
                    trigger="click"
                    popper-class="auditErrorPop">
                    <div class="remarkContent_box">
                      <div style="color:#ff3f45;width:65px;float:left;height:100%;padding:0 0 10px 10px;">失败原因:</div>
                      <div style="float:left;width:245px;">{{auditFailure}}</div>
                    </div>
                    <el-button
                      slot="reference"
                      class="auditErrorPopBtn"
                      style="border:none;padding:0px;"
                      @click.native="addComment(scope.row.applyId, scope._index)">
                      审核意见
                      <i class="el-icon-caret-bottom"></i>
                    </el-button>
                  </el-popover> -->
                <!-- </span> -->
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div v-if="tableContentData == [] || tableContentData == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img"/>
        </div>
        <div class="epf_page_sile">
          <el-pagination
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="un_handleSizeChange"
            @current-change="un_handleCurrentChange"
            :total="un_totalRecord"
            :page-size="un_pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已发布信息" name="second" :disabled="showMsgS">
        <epf-filter 
          @filterInfo="getFilterInfo_have" 
          ref="have_clearSearchText">
        </epf-filter>
        <epf-customTable
          :data="tableContentData2"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @deleBtn="delSupply">
          <template v-slot:area="scope">
            <epf-column slot="area">
              <epf-modeMsg  @clickTitle="openDetail" v-if="scope.row!==''||{}" :data="scope.row"></epf-modeMsg>
              <epf-modeMsg v-else :data="{}"></epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div class="epf_fie_box" v-if="!scope.row.dealOrg">
                <span class="epf_money">{{scope.row.price?'￥ '+Division(scope.row.price) +'万元':'面议'}}</span>
              </div>
              <div class="epf_fie_box" v-if="scope.row.dealOrg">
                <span class="epf_money">{{scope.row.dealOrg}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:img="scope">
            <epf-column slot="img">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{scope.row.circulationName}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  <span :class="scope.row.publishStatus=='published2'?'success':''"></span>
                  <span :class="scope.row.publishStatus=='down_mytsell'?'default':''"></span>
                  <span>{{scope.row.publishStatusName}}</span>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:taskId="scope">
            <epf-column slot="taskId">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe"
                  v-if="scope.row.publishStatus=='down_mytsell'">
                  --
                </span>
                <span class="epf_fie_lihe"
                  v-if="scope.row.publishStatus=='draft2'">
                  --
                </span>
                <div
                  style="padding:20px 18px;line-height:30px;color:#666"
                  v-if="scope.row.publishStatus=='published2'"
                  class="operate">
                  <router-link :to="'/PersonalCenter/reserve/?id='+scope.row.id">
                    <el-button size="mini" @click="showRes(scope.row.id)">预约信息</el-button>
                  </router-link>
                  <router-link :to="'/PersonalCenter/purposeBidding?id='+scope.row.id">
                    <p class="hoverStyle" @click="showPrice(scope.row.id)">意向报价信息</p>
                  </router-link>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="margin-left:40px;">
                      <el-dropdown-item>
                        <p class="hoverStyle" @click="downPop(scope.row.id)">下架</p>
                      </el-dropdown-item>
                          <!-- @click="seekPurchase(scope.row.id,scope.row.circulationName,scope._index)" -->
                      <el-dropdown-item>
                        <p class="hoverStyle"
                          v-show="scope.row.circulationName!='抵押'"
                          @click="seekPurchase(scope.row.id,scope.row.circulation,scope.row.circulationName)"
                          v-if="scope.row.isEntrustStatus == 0 || scope.row.contractNetSignStatus == 0"
                        >委托交易</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p class="hoverStyle"
                          v-if="scope.row.contractNetSignStatus == 0"
                          @click="seekRent(scope.row.id,scope.row.circulation,scope.row.circulationName)"
                        >合同服务</p>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <p class="hoverStyle"
                         v-if="scope.row.isEntrustStatus == 0 || scope.row.contractNetSignStatus == 0"
                         @click="ediotHandle(scope.row)">信息变更</p>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </epf-column>
          </template>
        </epf-customTable>

        <div v-if="tableContentData2 == [] || tableContentData2 == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img"/>
        </div>
        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="have_handleSizeChange"
            @current-change="have_handleCurrentChange"
            :total="have_totalRecord"
            :page-size="have_pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹窗 -->
    <!-- 下架 -->
    <div class="delDialog_box">
      <div v-show="issusedSoltOut" class="delDialog" @click.stop="issusedSoltOut=false"></div>
      <div v-show="issusedSoltOut" class="container_box">
        <div class="title_box">
          <h4>提示</h4>
          <span>
            <i class="el-icon-circle-close" @click="issusedSoltOut=false"></i>
          </span>
        </div>
        <div class="container">
          下架信息将不在平台展示,
          <br />确认下架该地块吗？
        </div>
        <div class="epf_btn epf_btn_bg" @click="downProduct">确认</div>
        <div
          class="epf_btn epf_btn_def"
          @click="issusedSoltOut=false"
        >取消</div>
      </div>
    </div>

    <!-- 委托交易 -->
    <!-- <div class="delDialog_box">
      <div v-show="isGetOrg" class="delDialog" @click.stop="isGetOrg=false"></div>
      <div v-show="isGetOrg" class="container_box">
        <div class="title_box">
          <h4>提示</h4>
          <span>
            <i class="el-icon-circle-close" @click="isGetOrg=false"></i>
          </span>
        </div>
        <div class="container">
          未检测到可识别的归属该行政区域的交易系统
        </div>
        <div class="primary" @click="sureOrg">确认</div>
        <div
          class="primary"
          style="background:#fff;color:#555;border:1px solid #c9c9c9;margin-left:0px !important;"
          @click="isGetOrg=false"
        >取消</div>
      </div>
    </div> -->

  </div>
</template>

<script>
import qs from "qs";
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      showMsgF: false,
      showMsgS: false,
      activeName: "first",
      isFlag: true,
      isGetOrg:false,//委托交易弹窗
      baseUrl: "",
      issusedSoltOut: false,
      applyTrading: false,
      intentionBuyDialog: false,
      subscribeDialog: false,
      flexibleOpen: false,
      un_pageNo: 1,
      un_pageSize: 5,
      un_totalPage: 1,
      un_totalRecord: 0,
      un_search: {},
      have_pageNo: 1,
      have_pageSize: 5,
      have_totalPage: 1,
      have_totalRecord: 0,
      have_search: {},
      id: "",
      config: [
        {
          span: 9,
          fie: "area",
          title: "供给基本信息"
        },
        {
          span: 6,
          fie: "id",
          title: "金额/万元"
        },
        {
          span: 2,
          fie: "img",
          title: "流转方式"
        },
        {
          span: 3,
          fie: "price",
          title: "状态"
        },
        {
          span: 4,
          fie: "taskId",
          title: "操作"
        }
      ],
      tableContentData: [],
      tableContentData2: [],
      currentId: "", //当前申请交易ID
      currentName: "", //当前流转方式
      loading: true,
      auditFailure: "",
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let params = {
      page: this.un_pageNo,
      rows: this.un_pageSize,
      issue: "1"
    };
    this.getMyProvide(params);
  },
  mounted(){
    // this.seekPurchase(id,type)
  },
  methods: {
    delSupply(data) {
      this.$axios.post(
        "/epf-landweb/admin/tsell/removeById",
        qs.stringify({ id: data.id }),
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          }
          this.delShow = false;
          this.$message.success(res.msg);
          var tab = { name: this.activeName };
          this.selectTabs(tab, event);
        }
      );
    },
    getFilterInfo_un(val) {
      this.un_search = val;
      this.un_search["page"] = 1;
      this.un_search["rows"] = this.un_pageSize;
      this.getMyProvide(this.un_search);
    },

    getFilterInfo_have(val) {
      this.have_search = val;
      this.have_search["page"] = 1;
      this.have_search["rows"] = this.have_pageSize;
      this.getMyProvide(this.have_search);
    },
    getMyProvide(params) {
      this.loading = true;
      params["issue"] = this.activeName == "first" ? "1" : "2";
      this.$axios.get("/epf-landweb/admin/tsell/getMyTSell", params, res => {
        console.log(res)
        if (res.code != 0) {
          this.loading = false;
          this.$confirm("需要重新登录，是否前往？", "登录已失效!", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false
          })
            .then(() => {
              this.$bus.$emit("loginOrMine");
              this.$router.push({ path: "/login" });
            })
            .catch(() => {
              this.$bus.$emit("loginOrMine");
              this.$router.push({ path: "/" });
              this.$message({
                showClose: true,
                message: "已取消",
                type: "warning"
              });
            });
          return;
        }
        let result = res.pager["results"];
        if (this.activeName == "first") {
          this.tableContentData = result;
          this.un_pageNo = res.pager.pageNo;
          this.un_pageSize = res.pager.pageSize;
          this.un_totalPage = res.pager.totalPage;
          this.un_totalRecord = res.pager.totalRecord;
        } else {
          result.map(item=>{
            return item.tag = false
          })
          this.tableContentData2 = result;
          this.have_pageNo = res.pager.pageNo;
          this.have_pageSize = res.pager.pageSize;
          this.have_totalPage = res.pager.totalPage;
          this.have_totalRecord = res.pager.totalRecord;
        }
        this.loading = false;
      });
    },
    // 查看审核失败原因  -- zhushaobing
    addComment(businessId, index) {
      console.log(index)
      this.auditFailure = "";
      //未发布的数据中去查询审核失败的数据
      var jsonVars = "{'test':'test'}";
      //流程实例ID
      console.log(businessId)
      let param = { businessId: businessId, jsonVars: jsonVars };
      this.$axios.post(
        // "/epf-activiti/act/task/histoicFlow",
        "/epf-activiti/act/task/getTasksByBusinessId",
        qs.stringify(param),
        res => {
          //查询意见
          if (res.code != "0") {
            //失败
            this.$message.error(res.msg);
            return;
          }
          //循环拿到所有的意见，每次覆盖，最后赋值的就是，最后的审核人提的意见
          // let comments = res.histoicFlowList;
          let comments = res.comments;
          let index = comments.length;
          let k = Number(index) - 1;
          // this.auditFailure = comments[k].comment;
          this.auditFailure = comments[k].fullMessage;
        }
      );
    },
    tryDeal(id, type) {
      this.applyTrading = true;
      this.currentId = id;
      this.currentName = type;
    },
    // 确认未检测到行政区域
    // sureOrg(){
    //   this.isGetOrg = false
    // },
    // 委托交易
    // seekPurchase(id, type,index) {
    //   console.log("======id====",id)
    //   console.log("======type====",type)
    //   console.log("======index====",index)
    //   var cantonProvince = this.tableContentData2[index].cantonProvince;
    //   var cantonCity = this.tableContentData2[index].cantonCity;
    //   var cantonArea = this.tableContentData2[index].cantonArea;
    //   this.$axios.get(
    //     // `/epf-admin/admin/org/getOrgsByareas`,
    //     `/epf-landweb/landweb/sysenterprise/listSysEnterpriseByArea`,
    //     {
    //       cantonProvince: cantonProvince,
    //       cantonCity: cantonCity,
    //       cantonArea: cantonArea
    //     },
    //     res => {
    //       // if(res.orgs == "" || res.orgs == null){
    //       if(res.enterprises == "" || res.enterprises == null){
    //       }else{
    //         this.isGetOrg = true
    //       }
    //     }
    //   );
    // },
    seekPurchase(id,type,name) {
      // this.isGetOrg = true
      this.$store.state.entrustland = null;
      this.$router.push({
        path: "/EntrustTransHome",
        query: { id: id, publishLandtype: name }
      });
    },
    // 合同网签备案
    seekRent(id, signRecord, type) {
      this.$store.state.contract = null;
      this.$store.state.LandbasicInfo = null;
      this.$router.push({
        path: "/OnlineContractHome/PartybasicInfo",
        query: {
          landId: id,
          signRecord: signRecord,
          signRecordtype: type,
          transactype: "自行交易",
          relevanceCode: "1"
        }
      });
    },
    have_handleSizeChange(val) {
      this.have_pageSize = val;
      this.have_search["page"] = this.have_pageNo;
      this.have_search["rows"] = val;
      this.getMyProvide(this.have_search);
    },
    have_handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 160);
      this.have_search["page"] = val;
      this.have_search["rows"] = this.have_pageSize;
      this.getMyProvide(this.have_search);
    },
    un_handleSizeChange(val) {
      //每页条数改变时触发
      this.un_pageSize = val;
      this.un_search["page"] = this.un_pageNo;
      this.un_search["rows"] = val;
      this.getMyProvide(this.un_search);
    },
    un_handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 160);
      this.un_search["page"] = val;
      this.un_search["rows"] = this.un_pageSize;
      this.getMyProvide(this.un_search);
    },
    ediotHandle(data) {
      this.$store.state.publishLand = null;
      this.$router.push({ path: "/PublishLandHome", query: { id:data.id } });
    },
    selectTabs(tab, event) {
      this.un_search = {};
      this.have_search = {};
      if (tab.name == "first") {
        this.$refs.un_clearSearchText.clearText();
        this.un_search["page"] = this.un_pageNo;
        this.un_search["rows"] = this.un_pageSize;
        this.getMyProvide(this.un_search);
        this.isFlag = true;
      } else if (tab.name == "second") {
        this.$refs.have_clearSearchText.clearText();
        this.have_search["page"] = this.have_pageNo;
        this.have_search["rows"] = this.have_pageSize;
        this.getMyProvide(this.have_search);
        this.isFlag = false;
      }
    },
    openDetail(data) {
      //跳转详情
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: data.id }
      })
      window.open(routeUrl.href, "_blank")
    },
    // 点击预约看地弹框
    showRes(id) {
      console.log(id)
      this.id = "";
      this.id = id;
    },
    // 点击意向报价弹框
    showPrice(id) {
      this.id = "";
      this.id = id;
    },
    // 点击下架弹框
    downPop(id) {
      this.id = "";
      this.issusedSoltOut = true;
      this.id = id;
    },
    // 确认下架
    downProduct() {
      let para = { id: this.id, publishStatus: "down_mytsell" };
      let that = this;
      this.$axios.post(
        "/epf-landweb/admin/tsell/downMyTSell",
        qs.stringify(para),
        res => {
          if (res.code == "0") {
            this.$message.success("下架成功");
            this.issusedSoltOut = false;
            this.getMyProvide(this.un_search);
          } else {
            this.$message.error("下架失败");
          }
        }
      );
    },
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
    }
  }
};
</script>

<style lang='scss' scoped>
@import url("../../../../assets/css/centerTable.css");
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.publishDemand {
  @include size(100%, 232px);
  box-sizing: border-box;
  padding-top: 5px;
  ul {
    li {
      width: 109px;
      display: inline-block;
      cursor: pointer;
      .publishDemand_top {
        @include size(109px, 109px);
        border-radius: 50%;
        border: solid 2px #f3f2f9;
        box-sizing: border-box;
        padding: 5px;
        &_center {
          @include size(95px, 95px);
          border-radius: 50%;
          background: rgba(225, 239, 254, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      p {
        font-size: 14px;
        color: #999;
        text-align: center;
        line-height: 40px;
      }
    }
    li:nth-child(1) {
      margin-right: 120px;
    }
  }
}
</style>