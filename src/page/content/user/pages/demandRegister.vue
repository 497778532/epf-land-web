<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未登记信息" name="first">
        <epf-filter
          @filterInfo="getFilterInfo"
          :closeTypeIpt="closeTypeIpt"
          :demandSelect="demandSelect"
        ></epf-filter>
        
        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @edioBtn="toPublishDemand"
          @deleBtn="deleteData">
          <template v-slot:area="scope">
            <epf-column slot="area">
              <epf-modeMsg 
                @clickTitle="toDetail"
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div clas="epf_fie_box">
                <span
                  class="epf_money"
                  v-if="!scope.row.dealOrg">
                  {{scope.row.price?'￥ '+Division(scope.row.price) +'万元':'面议'}}
                </span>
                <span 
                  class="epf_money" 
                  v-if="scope.row.dealOrg">
                  {{scope.row.dealOrg}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:img="scope">
            <epf-column slot="img">
              <div clas="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.demandName || scope.row.flowType}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div clas="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.statusName}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:taskId="scope">
            <epf-column slot="taskId">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">- -</span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>
        <div v-if="tableContentData == [] || tableContentData == ''"
          class="epf_row_c">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>
        <div class="epf_row_c">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="unRegister_handleSizeChange"
            @current-change="unRegister_handleCurrentChange"
            :total="unRegister_totalRecord"
            :current-page="unRegister_pageNo"
            :page-size="unRegister_pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已登记信息" name="second">
        <epf-filter
          @filterInfo="getFilterInfo"
          :closeTypeIpt="closeTypeIpt"
          :demandSelect="demandSelect"
        ></epf-filter>
        <epf-customTable
          :data="tableContentData2"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          @edioBtn="delPop"
          @deleBtn="deleteData">
          <template v-slot:area="scope">
            <epf-column slot="area">
              <epf-modeMsg  
                @clickTitle="toDetail" 
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div clas="epf_fie_box">
                <span
                  class="epf_money"
                  v-if="!scope.row.dealOrg">
                  {{scope.row.price?'￥ '+Division(scope.row.price) +'万元':'面议'}}
                </span>
                <span 
                  class="epf_money" 
                  v-if="scope.row.dealOrg">
                  {{scope.row.dealOrg}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:img="scope">
            <epf-column slot="img">
              <div clas="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.demandName || scope.row.flowType}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div clas="epf_fie_box">
                <span class="epf_fie_lihe">
                  <span :class="scope.row.status=='published'?'success':''"></span>
                  <span :class="scope.row.status=='down_mytpurchase'?'default':''"></span>
                  <span>{{scope.row.statusName}}</span>
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:taskId="scope">
            <epf-column slot="taskId">
              <div class="epf_btn_flex">
                <span>
                  <el-button size="mini" @click="toPublishDemand(scope.row)">
                    信息变更
                  </el-button>
                </span>
              </div>
            </epf-column>
          </template>
        </epf-customTable>
        <div v-if="tableContentData2 == [] || tableContentData2 == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>

        <div class="epf_page_sile">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="sizeChange"
            @current-change="currentChange"
            :total="total"
            :current-page="haveRegister_pageNo"
            :page-size="haveRegister_pageSize"
          ></el-pagination>
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
      activeName: "first",
      delShow: false,
      closeTypeIpt: true, //取消状态按钮
      demandSelect: true, //选择流转方式还是需求类型
      config: [
        {
          span: 9,
          fie: "area",
          title: "基本信息"
        },
        {
          span: 4,
          fie: "id",
          title: "金额/万元"
        },
        {
          span: 3,
          fie: "img",
          title: "需求类型"
        },
        {
          span: 4,
          fie: "price",
          title: "状态"
        },
        {
          span: 4,
          fie: "taskId",
          title: "操作"
        }
      ],
      tableContentData: [{ id: 1, insertTime: "2", title: "ssssf" }],
      tableContentData2: {},
      haveRegister_pageNo: 1,
      haveRegister_pageSize: 10,
      haveRegister_totalPage: 1,
      total: 1,
      haveRegisterSearch: {},
      unRegister_pageNo: 1,
      unRegister_pageSize: 10,
      unRegister_totalPage: 1,
      unRegister_totalRecord: 1,
      unRegisterSearch: {},
      delId: "",
      loading: true
    };
  },
  created() {

    let params = {
      page: this.unRegister_pageNo,
      rows: this.unRegister_pageSize,
      status: "draft"
    };
    this.init(params);
  },
  methods: {
    init(params) {
      this.loading = true;
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          "  " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
        );
      }
      this.$axios.get(
        // "/epf-supply/admin/tpurchase/getMyTPurchase",
        this.$API.EPF_SUPPLY.GETTP,
        params,
        res => {
           console.log(res)
          if (res.code != 0) {
           
            this.loading = false;
            this.$message.error(res.msg);
            return;
          }
          let result = res.pager["results"].map((item, index) => {
            return item;
          });
          if (this.activeName == "first") {
            this.tableContentData = result;
            this.unRegister_pageNo = res.pager.pageNo;
            this.unRegister_pageSize = res.pager.pageSize;
            this.unRegister_totalPage = res.pager.totalPage;
            this.unRegister_totalRecord = res.pager.totalRecord;
          } else {
            this.tableContentData2 = result;
            this.haveRegister_pageNo = res.pager.pageNo;
            this.haveRegister_pageSize = res.pager.pageSize;
            this.haveRegister_totalPage = res.pager.totalPage;
            this.total = res.pager.totalRecord;
          }
          this.loading = false;
        }
      );
    },
    getFilterInfo(val) {
      this.unRegister_pageNo = 1;
      this.haveRegister_pageNo = 1;
      if (this.activeName == "first") {
        this.unRegisterSearch = val;
        this.unRegisterSearch["page"] = this.unRegister_pageNo;
        this.unRegisterSearch["rows"] = this.unRegister_pageSize;
        this.unRegisterSearch["status"] = "draft";
        this.init(this.unRegisterSearch);
      } else {
        this.haveRegisterSearch = val;
        this.haveRegisterSearch["page"] = this.haveRegister_pageNo;
        this.haveRegisterSearch["rows"] = this.haveRegister_pageSize;
        this.haveRegisterSearch["status"] = "published";
        this.init(this.haveRegisterSearch);
      }
    },
    handleClick() {
      if (this.activeName == "first") {
        let params = {
          page: this.unRegister_pageNo,
          rows: this.unRegister_pageSize,
          status: "draft"
        };
        this.init(params);
      } else {
        let params = {
          page: this.haveRegister_pageNo,
          rows: this.haveRegister_pageSize,
          status: "published"
        };
        this.init(params);
      }
    },
    //分页
    currentChange(val) {
      //获取当前页
      this.haveRegisterSearch["page"] = val;
      this.haveRegisterSearch["rows"] = this.haveRegister_pageSize;
      if (this.activeName == "first") {
        this.haveRegisterSearch["status"] = "draft";
      } else {
        this.haveRegisterSearch["status"] = "published";
      }
      this.init(this.haveRegisterSearch);
    },
    unRegister_handleSizeChange(val) {
      //每页条数改变时触发
      this.unRegister_pageNo = 1;
      this.unRegisterSearch["page"] = this.unRegister_pageNo;
      this.unRegisterSearch["rows"] = val;
      if (this.activeName == "first") {
        this.unRegisterSearch["status"] = "draft";
      } else {
        this.unRegisterSearch["status"] = "published";
      }
      this.init(this.unRegisterSearch);
    },
    sizeChange(val) {
      //每页条数改变时触发
      this.haveRegister_pageNo = 1;
      this.haveRegisterSearch["page"] = this.haveRegister_pageNo;
      this.haveRegisterSearch["rows"] = val;
      if (this.activeName == "first") {
        this.haveRegisterSearch["status"] = "draft";
      } else {
        this.haveRegisterSearch["status"] = "published";
      }
      this.init(this.haveRegisterSearch);
    },
    unRegister_handleCurrentChange(val) {
      //获取当前页
      this.unRegisterSearch["page"] = val;
      this.unRegisterSearch["rows"] = this.unRegister_pageSize;
      if (this.activeName == "first") {
        this.unRegisterSearch["status"] = "draft";
      } else {
        this.unRegisterSearch["status"] = "published";
      }
      this.init(this.unRegisterSearch);
    },
    toDetail(data) {
      this.$router.push({ path: "/supplyDetails", query: { supply: data.id } });
    },
    toPublishDemand(id) {
      console.log('信息变更',id)
      this.$router.push({
        path: "/demandForm",
        query: { demand: id.id, demandChage: "change" }
      });
    },
    delPop(id) {
      this.delId = "";
      this.delShow = true;
      this.delId = id;
      this.toPublishDemand(id)
    },
    // deleteData() {
    deleteData(id) {
      this.$axios.post(
        // "/epf-supply/admin/tpurchase/deleteTPurchase",
        this.$API.EPF_SUPPLY.DELTP,
        // qs.stringify({ id: this.delId }),
        qs.stringify({ id: id.id }),
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          } else {
            this.delShow = false;
            this.$message.success(res.msg);
            if (this.activeName == "first") {
              let params = {
                page: this.unRegister_pageNo,
                rows: this.unRegister_pageSize,
                status: "draft"
              };
              this.init(params);
            } else {
              let params = {
                page: this.haveRegister_pageNo,
                rows: this.haveRegister_pageSize,
                status: "published"
              };
              this.init(params);
            }
          }
        }
      );
      this.delShow = false;
    }
  }
};
</script>