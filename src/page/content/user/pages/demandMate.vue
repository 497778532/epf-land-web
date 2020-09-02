<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="需求匹配" name="first">
        <epf-filter @filterInfo="getFilterInfo" :closeTypeIpt="closeTypeIpt"></epf-filter>
        <epf-customTable
          :data="tableContentData"
          :config="config"
          v-loading="loading"
          element-loading-text="拼命加载中..."
        >
          <template v-slot:img="scope">
            <epf-column slot="img">
              <epf-modeMsg :data="scope.row"  @clickTitle="openDetail(scope.row.id)"></epf-modeMsg>
            </epf-column>
          </template>
          <template v-slot:id="scope">
            <epf-column slot="id">
              <div v-if="!scope.row.dealOrg" class="epf_fie_box">
                <span class="epf_money">{{scope.row.price?'￥ '+Division(scope.row.price) +'万元':'面议'}}</span>
              </div>
            </epf-column>
          </template>
          <template v-slot:price="scope">
            <epf-column slot="price">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe" 
                  v-if="scope.row.circulation == 'transfer'">
                  转让
                </span>
                <span class="epf_fie_lihe" 
                  v-if="scope.row.circulation == 'rent'">
                  出租
                </span>
                <span class="epf_fie_lihe" 
                  v-if="scope.row.circulation == 'mortgage'">
                  抵押
                </span>
              </div>
            </epf-column>
          </template>
          <template v-slot:title="scope">
            <epf-column slot="title">
              <div class="epf_fie_box">
                <span class="epf_fie_lihe">{{scope.row.phone}}</span>
              </div>
            </epf-column>
          </template>
          <!-- <template v-slot:area="scope">
            <epf-column slot="area"></epf-column>
          </template> -->
        </epf-customTable>

        <!-- 需求匹配 -->
        <div class="epf_page_sile" v-if="tableContentData == [] || tableContentData == ''">
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
      closeTypeIpt: true, //取消状态按钮
      config: [
        {
          span: 9,
          fie: "img",
          title: "供给基本信息"
        },
        {
          span: 5,
          fie: "id",
          title: "金额/万元"
        },
        {
          span: 4,
          fie: "price",
          title: "流转方式"
        },
        {
          span: 6,
          fie: "title",
          title: "联系电话"
        },
        // {
        //   span: 4,
        //   fie: "area",
        //   title: "操作"
        // }
      ],
      tableContentData: {},
      unRegister_pageNo: 1,
      unRegister_pageSize: 10,
      unRegister_totalPage: 1,
      unRegister_totalRecord: 1,
      unRegisterSearch: {},
      loading: true,
      baseUrl: ""
    };
  },
  created() {
    this.baseUrl = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC;
    let params = {
      page: this.un_pageNo,
      rows: this.un_pageSize,
      issue: "1"
    };
  },
  mounted() {
    let params = {
      page: this.unRegister_pageNo,
      rows: this.unRegister_pageSize
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
        // "/epf-supply/admin/tsell/getMatchTSell",
        this.$API.EPF_SUPPLY.SELL,
        params,
        res => {
          if (res.code != 0) {
            this.loading = false;
            this.$message.error(res.msg);
            return;
          }
          let result = res.pager["results"].map((item, index) => {
            return item;
          });
          this.tableContentData = result;
          this.unRegister_pageNo = res.pager.pageNo;
          this.unRegister_pageSize = res.pager.pageSize;
          this.unRegister_totalPage = res.pager.totalPage;
          this.unRegister_totalRecord = res.pager.totalRecord;
          this.loading = false;
        }
      );
    },
    getFilterInfo(val) {
      this.unRegisterSearch = val;
      this.unRegisterSearch["page"] = this.unRegister_pageNo;
      this.unRegisterSearch["rows"] = this.unRegister_pageSize;
      this.init(this.unRegisterSearch);
    },
    unRegister_handleSizeChange(val) {
      //每页条数改变时触发
      this.unRegisterSearch = val;
      this.unRegisterSearch["page"] = this.unRegister_pageNo;
      this.unRegisterSearch["rows"] = this.unRegister_pageSize;
      this.init(this.unRegisterSearch);
    },
    unRegister_handleCurrentChange(val) {
      //获取当前页
      this.unRegisterSearch["page"] = val;
      this.unRegisterSearch["rows"] = this.unRegister_pageSize;
      this.init(this.unRegisterSearch);
    },
    openDetail(id) {
      //跳转详情
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>