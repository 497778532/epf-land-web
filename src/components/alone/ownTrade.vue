<template>
  <div>
    <div id="table_head">
      <el-row>
        <el-col v-for="(item,index) in tableHeadData" :key="index" :span="item.span">
          <h4 class="epf_table_heade">{{item.title}}</h4>
        </el-col>
      </el-row>
    </div>
    <div class="table_container" v-for="(item,index) in tableContentData" :key="index">
      <div class="tc_tools">
        <el-row style="background-color:#f8f8f8;">
          <el-col :span="8" :offset="16">
            <div class="tc-date">
              <span style="color:#a7a7a7;">{{item.insertTime}}</span>
              <i v-if="!item.havePublish" class="tools_handle el-icon-edit-outline"></i>
              <i
                v-if="!item.deleteClose"
                class="tools_handle deleteHover el-icon-delete"
                @click="delShow=true"
              ></i>

              <div class="delDialog_box">
                <div v-show="delShow" class="delDialog" @click.stop="delShow=false"></div>
                <div v-show="delShow" class="container_box">
                  <div class="title_box">
                    <h4>提示</h4>
                    <span>
                      <i class="el-icon-circle-close-outline" @click="delShow=false"></i>
                    </span>
                  </div>
                  <div class="container">确认要删除该条信息吗？</div>
                  <div class="epf_btn epf_btn_bg">确认</div>
                  <div class="epf_btn epf_btn_def">取消</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tc_content">
        <el-row style="border:1px solid #f3f3f3;border-top:none;">
          <el-col :span="tableHead.length==5?8:11" class="tc_content_height">
            <div class="tc_info" @click="signatureDetails(item)">
              <img class="epf_land_img" src="../../../static/images/contractDefault.png" alt />
              <div class="tc_info_content">
                <div class="tc_info_title hoverStyle">{{item.title}}</div>
                <div class="tc_info_place">
                  <span>行政区域:</span>
                  {{item.cantonProvinceName}}{{item.cantonCityName}}{{item.cantonAreaName}}
                </div>
                <div class="tc_info_area">
                  <span>面积:</span>
                  {{item.area}}
                </div>
              </div>
            </div>
          </el-col>
          <el-col v-if="!item.dealOrg" :span="5" class="tc_content_height tc_border">
            <div style="height:125px;text-align:center;">
              <span
                style="line-height:125px;font-size:16px;color:#ffa200;font-weight:bold;"
              >{{item.price?'￥ '+Division(item.price) +'万元':'面议'}}</span>
            </div>
          </el-col>
          <el-col v-if="item.dealOrg" :span="5" class="tc_content_height tc_border">
            <div style="height:125px;padding:20px;box-sizing:border-box;position:relative;">
              <span class="dealOrgText">{{item.dealOrg}}</span>
            </div>
          </el-col>
          <el-col :span="tableHead.length==5?3:4" class="tc_content_height tc_border">
            <div style="height:125px;text-align:center;">
              <span style="line-height:125px;color:#9a9a9a;">{{item.demandName || item.flowType}}</span>
            </div>
          </el-col>
          <el-col v-if="item.type || item.phone" :span="4" class="tc_content_height tc_border">
            <div style="height:125px;text-align:center;">
              <span style="line-height:125px;color:#9a9a9a;">
                <span :class="item.typeDot"></span>
                {{item.phone || item.type}}
              </span>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="height:125px;text-align:center;position:relative;">
              <span style="line-height:125px;color:#9a9a9a;" v-if="item.handle=='--'">--</span>

              <div style="padding:20px 18px;" v-if="item.handle=='预约信息'">
                <el-button size="mini">预约信息</el-button>
                <div class="havePublish" style="margin-top:15px;">
                  <span class="hoverStyle">意向报价信息</span>
                  <span class="hoverStyle">下架</span>
                </div>
                <div class="havePublish" style="margin-top:8px;">
                  <span class="hoverStyle">申请交易</span>
                  <span class="hoverStyle">信息变更</span>
                </div>
              </div>

              <el-button
                size="mini"
                class="operationBtn"
                v-if="handleOption && handleOption.handle=='button'"
              >{{handleOption.handleText}}</el-button>

              <span class style="line-height:125px;color:#9a9a9a;" v-if="item.handle=='审核意见'">
                <el-tooltip content="Bottom center" placement="bottom" effect="light">
                  <span class="hoverStyle">
                    审核意见
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </el-tooltip>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableHead: Array,
    tableContent: Array,
    handleOption: Object
  },
  data() {
    return {
      tableHeadData: this.tableHead,
      tableContentData: this.tableContent,
      delShow: false
    };
  },
  // 审核中、
  methods: {
    signatureDetails(State) {
      if (State.flowType === "线上签订" && State.type === "草稿") {
        this.$router.push({
          path: "/OnlineContractSign",
          query: { signRecord: 1 }
        });
      }
      if (State.flowType === "线下签订" && State.type === "草稿") {
        this.$router.push({
          path: "/UnderContractSign",
          query: { signRecord: 1 }
        });
      }
      if (State.flowType === "线上签订" && State.type === "合同已撤销") {
        this.$router.push("/signatureDetailsExamine");
      }
      if (State.flowType === "线上签订" && State.type === "审核通过") {
        this.$router.push("/signatureDetailsExamine");
      }
      if (State.flowType === "线上签订" && State.type === "审核未通过") {
        this.$router.push("/signatureDetailsExamine");
      }
      if (State.flowType === "线上签订" && State.type === "审核中") {
        this.$router.push("/signatureDetailsExamine");
      }
      if (State.flowType === "线上签订" && State.type === "待备案") {
        this.$router.push("/signatureDetailsRecord");
      }
      if (State.flowType === "线上签订" && State.type === "备案终止") {
        this.$router.push("/signatureDetailsRecord");
      }
      if (State.flowType === "线上签订" && State.type === "已备案") {
        this.$router.push("/signatureDetailsRecord");
      }
      if (State.flowType === "线下签订" && State.type === "合同已撤销") {
        this.$router.push("/Contractexam");
      }
      if (State.flowType === "线下签订" && State.type === "审核通过") {
        this.$router.push("/Contractexam");
      }
      if (State.flowType === "线下签订" && State.type === "审核未通过") {
        this.$router.push("/Contractexam");
      }
      if (State.flowType === "线下签订" && State.type === "审核中") {
        this.$router.push("/Contractexam");
      }
      if (State.flowType === "线下签订" && State.type === "待备案") {
        this.$router.push("/ContractRecord");
      }
      if (State.flowType === "线下签订" && State.type === "备案终止") {
        this.$router.push("/ContractRecord");
      }
      if (State.flowType === "线下签订" && State.type === "已备案") {
        this.$router.push("/ContractRecord");
      }
    }
  },
  created() {
  },
  watch: {
    tableContent(newData) {
      this.tableContentData = newData;
    }
  }
};
</script>

<style lang='scss' scoped>
.epf_table_heade {
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  text-align: center;
  background-color: #f1f6f7;
  color: #333330;
}
.tc-date {
  margin-right: 15px;
  text-align: right;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}
.tools_handle {
  margin-left: 8px;
  cursor: pointer;
}
.tc_content_height {
  height: 125px;
}
.tc_info {
  margin-top: 20px;
  margin-left: 20px;
}
.tc_info_content {
  width: 167px;
  float: left;
  margin-left: 10px;
  font-size: 14px;
}
.tc_info_title {
  float: left;
  height: 39px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.tc_info_place,
.tc_info_area {
  width: 100%;
  height: 16px;
  height: auto;
  float: left;
  margin-top: 7px;
  font-size: 12px;
  color: #c6c6c6;
  overflow: hidden;
  text-overflow: ellipsis; //超出部分以省略号显示
  white-space: nowrap;
}
.hoverStyle:hover {
  cursor: pointer;
  color: #4472d4;
}
.tc_border {
  border-right: 1px solid #f3f3f3;
}
.operationBtn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.havePublish {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgb(154, 154, 154);
}
.deleteHover:hover {
  color: rgb(255, 73, 73);
}
.dealOrgText {
  display: block;
  width: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.delDialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(65, 64, 64, 0.24);
  z-index: 200;
  top: 0px;
  left: 0px;
}
.container_box {
  width: 370px;
  height: 225px;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  border: 3px solid #ccd4da;
  z-index: 201;
  .title_box {
    width: 100%;
    height: 45px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #f3f3f3;
    h4 {
      font-size: 18px;
      float: left;
      color: #323232;
    }
    span {
      font-size: 26px;
      float: right;
      color: #b3b3b3;
      i {
        cursor: pointer;
      }
    }
  }
  .container {
    width: 100%;
    margin-top: 15px;
    height: 95px;
    line-height: 95px;
  }
}
</style>