<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="供给匹配" name="first">
        <epf-filter
          @filterInfo="getFilterInfo"
          :closeTypeIpt="closeTypeIpt"
          :demandSelect="demandSelect"
          style="margin-top:5px;"
        ></epf-filter>

        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中...">
          <template v-slot:id="scope">
            <epf-column slot="id">
              <epf-modeMsg 
                @clickTitle="toDetail"
                :data="scope.row">
              </epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:area="scope">
            <epf-column slot="area">
              <div class="epf_fie_box">
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
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">
                  {{scope.row.demandName || scope.row.flowType}}
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:phone="scope">
            <epf-column slot="phone">
              <div class="epf_fie_box">
                <div class="epf_fie_box">
                  <span class="epf_fie_lihe">{{scope.row.phone}}</span>
                </div>
              </div>
            </epf-column>
          </template>
          <!-- <template v-slot:title="scope">
            <epf-column slot="title"></epf-column>
          </template> -->
        </epf-customTable>

        <div v-if="tableContentData == [] || tableContentData == ''" class="epf_page_sile">
          <img src="@/assets/image/dataNone.png" class="epf_def_img" />
        </div>

        <div class="epf_page_sile">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
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
      activeName: "first",
      closeTypeIpt: true,
      demandSelect: true, //选择流转方式还是需求类型
      baseUrl: "",
      delShow: "",
      config: [
        {
          span: 10,
          fie: "id",
          title: "需求基本信息"
        },
        {
          span: 5,
          fie: "area",
          title: "金额/万元"
        },
        {
          span: 4,
          fie: "price",
          title: "需求类型"
        },
        {
          span: 5,
          fie: "phone",
          title: "联系电话"
        },
        // {
        //   span: 4,
        //   fie: "id",
        //   title: "操作"
        // }
      ],
      tableContentData: ["1"],
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 20,
      searchInfo: {},
      loading: true,
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.getProvideMate({});
  },
  methods: {
    getFilterInfo(val) {
      this.searchInfo = val;
      this.getProvideMate(this.searchInfo);
    },
    getProvideMate(params) {
      this.loading = true;
      this.$axios.get(
        "/epf-landweb/admin/tpurchase/getMatchTPurchase",
        params,
        res => {
          if (res.code != 0) {
            this.loading = false;
            this.$message.error(res.msg);
            return;
          }
          this.tableContentData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.loading = false;
        }
      );
    },
    //   分页
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getProvideMate(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 420);
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getProvideMate(this.searchInfo);
    },
    toDetail(data) {
      this.$router.push({ path: "/supplyDetails", query: { supply: data.id } });
    }
  }
};
</script>