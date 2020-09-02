<template>
  <div id="list">
    <div class="contpage">
      <span class="title">{{ title }}</span>
      <span class="added" @click="contpage()">更多></span>
    </div>
    <div class="serivemain_con">
      <ul class="serivemain_content">
        <li v-for="(item, index) in serivemainData" :key="index">
          <div class="serivemain_con_top">
            <div class="serivemain_con_top_img">
              <img v-lazy="baseUrl + item.img" alt />
            </div>
            <div class="serivemain_con_top_right">
              <div class="serivemainR_title">
                <h4>
                  {{ item.companyName
                  }}<img
                    alt
                    src="@/assets/image/icon-16.png"
                    style="margin-left:7px;vertical-align: middle;"
                  />
                </h4>
                <div
                  class="serivemainR_title_active01"
                  v-for="(item2, index) in item.serveType.split(',')"
                  :key="index"
                >
                  <span v-if="item2 == 'service_type-001'">中介服务</span>
                  <span v-if="item2 == 'service_type-002'">评估服务</span>
                  <span v-if="item2 == 'service_type-003'">测绘服务</span>
                  <span v-if="item2 == 'service_type-004'">法律咨询</span>
                </div>
                <p>
                  服务区域：<span v-if="item.cantonCityName"
                    >{{ item.cantonCityName }}-{{ item.cantonAreaName }}</span
                  >
                </p>
                <p>
                  地址信息：<span>{{ item.address }}</span>
                </p>
                <p>
                  联系方式：<span
                    >{{ item.contactPerson }}：{{ item.phone }}</span
                  >
                </p>
              </div>
              <div class="serivemainR_content">
                <p style="font-weight: bold;">经营范围：</p>
                <div class="serivemainR_contentRt">
                  {{
                    item.tag
                      ? item.businessScope.substring(0, 145)
                      : item.businessScope
                  }}
                  <button v-if="item.tag" @click="seeDetail(index)">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 查看经营范围 -->
      <el-dialog
        title="经营范围"
        :visible.sync="detailDialog"
        width="30%"
        center
      >
        <span>{{ businessScopeDetail }}</span>
      </el-dialog>
      <div v-if="serivemainData == [] || serivemainData == ''" style="text-align:center;">
        <img
          style="margin-top:10px;margin-bottom:10px;height:190px;"
          src="../../../../assets/image/dataNone.png"
        />
      </div>
      <div class="epf_row_c">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[5, 10, 15, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :total="totalRecord"
          :page-size="pageSize"
          style="margin:20px auto;"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      detailDialog: false,
      index: "",
      businessScopeDetail: "",
      baseUrl: "",
      title: "金牌服务机构",
      serivemainData: [],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      search: {},
      serviceTypeList: [],
      dictionary: {
        //字典码结果
        serviceTypes: ""
      }
    };
  },
  mounted() {
    this.baseUrl = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC;
    let param = {
      page: this.pageNo,
      rows: this.pageSize
    };
    this.init(param);
    //请求字典
    this.$axios.get(
      `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=service_type`,
      {},
      res => {
        if (res.dictionariesList.length != 0) {
          this.dictionary.serviceTypes = res.dictionariesList;
          return;
        }
        this.dictionary.serviceTypes = "";
      }
    );
  },
  methods: {
    seeDetail(index) {
      this.index = "";
      this.detailDialog = true;
      this.index = index;
      this.businessScopeDetail = this.serivemainData[index].businessScope;
    },
    init(params) {
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      this.$axios.get(
        "/epf-landweb/tserveinstitution/queryTServeInstitutionList",
        params,
        res => {
          res.pager.results.map((item, index) => {
            if (item.businessScope.length > 145) {
              //超出字数
              item.tag = 1; //查看详情
            }
          });
          this.serivemainData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
      );
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val;
      this.search["page"] = this.pageNo;
      this.search["rows"] = val;
      this.init(this.search);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.search["page"] = val;
      this.search["rows"] = this.pageSize;
      this.init(this.search);
    },
    contpage() {
      this.$router.push("/serveSearch");
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
#list {
  @include size(100%, auto);
  .contpage {
    height: 50px;
    font-size: 14px;
    color: #333333;
    border-bottom: 2px solid #eeeeee;
    box-sizing: border-box;
    padding-left: 17px;
    padding-top: 15px;
    font-size: 16px;

    .title {
      font-weight: bold;
      border-left: 6px solid var(--lightColor);
      box-sizing: border-box;
      padding-left: 14px;
      margin-top: 17px;
    }
    .added {
      float: right;
      padding-right: 14px;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
    }
  }
  .serivemain_con {
    @include size(100%, auto);
    overflow: hidden;
    .serivemain_content {
      li {
        width: 100%;
        height: 251px;
        box-sizing: border-box;
        padding: 25px;
        border-bottom: solid 2px #eeeeee;
        box-sizing: border-box;
        transition: all 0.1s;
        clear: both;
        .serivemain_con_top {
          clear: both;
          &_img {
            @include size(300px, 203px);
            float: left;
            img {
              display: block;
              @include size(100%, 100%);
            }
          }
          &_right {
            @include size(850px, 203px);
            float: left;
            box-sizing: border-box;
            padding: 25px 0 0 20px;
            .serivemainR_title {
              @include size(400px, 154px);
              float: left;
              box-sizing: border-box;
              background: #fff;
              line-height: 30px;
              border-right: solid 2px #eeeeee;
              h4 {
                color: #333;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
              }
              h4:hover {
                color: var(--Colors);
              }
              .serivemainR_title_active01 {
                color: var(--lightColor);
                background: #f2f5f7;
                display: inline-block;
                font-size: 14px;
                padding: 0 5px;
                margin-right: 10px;
                border-radius: 0px 8px 0px 8px;
              }
              p {
                color: #999999;
                span {
                  color: #666666;
                }
              }
            }
            .serivemainR_content {
              @include size(360px, 100%);
              float: left;
              box-sizing: border-box;
              line-height: 33px;
              margin-left: 30px;
              .serivemainR_contentRt {
                @include size(360px, auto);
                color: #999999;
                line-height: 24px;
                position: relative;
                button {
                  position: absolute;
                  bottom: 0;
                  right: 0;
                }
              }
            }
          }
        }
      }
      li:hover {
        -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
      }
    }
  }
}
</style>
