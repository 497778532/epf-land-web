<template>
  <div class="serivemain_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="search_warp win1200">
      <div class="win1200">
        <div class="tdzr_top">
          <el-input
            v-model="searchText"
            style="width:50%;height:44px;"
            placeholder="请输入行政区域 服务类型等相关信息"
          ></el-input>
          <div class="epf_btn epf_btn_bg searchS" @click="searchBtn">搜索</div>
        </div>
        <div class="tdzr_table">
          <table width="1200" cellpadding="0" cellspacing="0">
            <tr>
              <td class="td1">行政区域</td>
              <td
                @click="
                  filterSelectProvince(
                    regionInfo.dictionariesList,
                    'cantonProvince',
                    -1
                  )
                "
                class="td2"
                :class="filterActive.cantonProvince == 0 ? 'filterActive' : ''"
              >
                <span>不限</span>
              </td>
              <td class="td3" v-if="regionInfo && regionInfo !== null" style="line-height:34px;padding:10px 0">
                <div
                  :class="
                    filterActive.cantonProvince == index + 1
                      ? 'filterActive'
                      : ''
                  "
                  v-for="(item, index) in regionInfo.dictionariesList"
                  @click="
                    filterSelectProvince(
                      regionInfo.dictionariesList,
                      'cantonProvince',
                      index,
                      true
                    )
                  "
                  :key="index"
                >
                  <span>
                    {{ item.regionName }}
                  </span>
                </div>
              </td>
            </tr>
            <!--市级-->
            <tr v-if="cityShow">
              <td class="td1"></td>
              <td
                class="td2"
                @click="filterSelectCity(cityDiect, 'cantonCity', -1)"
                :class="filterActive.cantonCity == 0 ? 'filterActive' : ''"
              >
                <span>全部</span>
              </td>
              <td
                class="td3"
                v-if="cityDiect && cityDiect !== null"
                style="background-color: #f5f5f5;"
              >
                <div
                  v-for="(item, index) in cityDiect"
                  :class="
                    filterActive.cantonCity == index + 1 ? 'filterActive' : ''
                  "
                  @click="
                    filterSelectCity(cityDiect, 'cantonCity', index, true)
                  "
                  :key="index"
                >
                  {{ item.regionName }}
                </div>
              </td>
            </tr>
            <!--县级-->
            <tr v-if="areaShow">
              <td class="td1"></td>
              <td
                class="td2"
                @click="filterSelect(areaDiect, 'cantonArea', -1)"
                :class="filterActive.cantonArea == 0 ? 'filterActive' : ''"
              >
                <span>全部</span>
              </td>
              <td
                class="td3"
                v-if="areaDiect && areaDiect !== null"
                style="background-color: #f5f5f5;"
              >
                <div
                  v-for="(item, index) in areaDiect"
                  :class="
                    filterActive.cantonArea == index + 1 ? 'filterActive' : ''
                  "
                  @click="filterSelect(areaDiect, 'cantonArea', index, true)"
                  :key="index"
                >
                  {{ item.regionName }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td1">服务类型</td>
              <td
                class="td2"
                @click="
                  filterSelect(
                    serviceInfo.dictionariesEntities,
                    'serviceType',
                    -1
                  )
                "
                :class="filterActive.serviceType == 0 ? 'filterActive' : ''"
              >
                <span>不限</span>
              </td>
              <td class="td3" v-if="serviceInfo && serviceInfo !== null">
                <div
                  v-for="(item, index) in serviceInfo.dictionariesEntities"
                  :class="
                    filterActive.serviceType == index + 1 ? 'filterActive' : ''
                  "
                  @click="
                    filterSelect(
                      serviceInfo.dictionariesEntities,
                      'serviceType',
                      index
                    )
                  "
                  :key="index"
                >
                  {{ item.zhCn }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td1">等级</td>
              <td
                class="td2"
                :class="filterActive.gradeType == 0 ? 'filterActive' : ''"
                @click="
                  filterSelect(gradeInfo.dictionariesEntities, 'gradeType', -1)
                "
              >
                <span>不限</span>
              </td>
              <td class="td3" v-if="gradeInfo && gradeInfo !== null">
                <div
                  v-for="(item, index) in gradeInfo.dictionariesEntities"
                  :class="
                    filterActive.gradeType == index + 1 ? 'filterActive' : ''
                  "
                  @click="
                    filterSelect(
                      gradeInfo.dictionariesEntities,
                      'gradeType',
                      index
                    )
                  "
                  :key="index"
                >
                  {{ item.zhCn }}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="tdzr_left_top">
          <div class="tdzr_xuanze">
            <p>您已选择：</p>
            <p
              id="tdzr_xuanze"
              v-for="(val, key, index) in selected"
              @click="delSelect(key)"
              :key="index"
            >
              <span v-show="val" class="tdzr_span">{{ val }}</span>
            </p>
            <a href="javascript:void(0)" @click="clearAll()">全部删除</a>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="serivemain_con">
      <ul class="tdzr_listtop">
        <li
          :class="['sortBox', sortActive == 'default' ? 'sortactive' : '']"
          @click="sortDefault"
        >
          默认排序
        </li>
        <li
          :class="['sortBox', sortActive == 'level' ? 'sortactive' : '']"
          @click="sortTime"
        >
          等级
          <span>{{ this.levelSort ? "↑" : "↓" }}</span>
        </li>
      </ul>
      <ul class="serivemain_content">
        <li v-for="(item, index) in serivemainData" :key="index">
          <div class="serivemain_con_top">
            <div class="serivemain_con_top_img">
              <img v-lazy="baseUrl + item.img" />
            </div>
            <div class="serivemain_con_top_right">
              <div class="serivemainR_title">
                <h4>
                  {{ item.companyName }}
                  <img
                    src="@/assets/image/icon-16.png"
                    style="margin-left:7px;margin-top:8px;"
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
                  服务区域：
                  <span v-if="item.cantonCityName"
                    >{{ item.cantonCityName }}-{{ item.cantonAreaName }}</span
                  >
                </p>
                <p>
                  地址信息：
                  <span>{{ item.address }}</span>
                </p>
                <p>
                  联系方式：
                  <span>{{ item.contactPerson }}：{{ item.phone }}</span>
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
            <div style="clear: both;"></div>
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
      <div style="text-align:center;margin:20px auto;">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[5, 10, 15, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="totalRecord"
          :page-size="pageSize"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
import { mapState, mapActions } from "vuex";
import qs from "qs";
export default {
  data() {
    return {
      cityDiect: "",
      areaDiect: "",
      cityShow: false,
      areaShow: false,
      switchHeight: 49,
      flexibleOpen: false,
      detailDialog: false,
      index: "",
      businessScopeDetail: "",
      baseUrl: "",
      location: [
        { path: "/", name: "首页" },
        { path: "/ServiceCentre", name: "服务中心" },
        { path: "null", name: "服务机构" }
      ],
      selected: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        serviceType: "",
        gradeType: "",
        sortField: "",
        sortOrder: ""
      },
      searchText: "",
      filterActive: {
        cantonProvince: 0,
        cantonCity: 0,
        cantonArea: 0,
        serviceType: 0,
        gradeType: 0,
        sortField: "",
        sortOrder: ""
      },
      serivemainData: [],
      serviceTypeList: [],
      dictionary: {
        //字典码结果
        serviceTypes: ""
      },
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        serviceType: "",
        gradeType: "",
        sortField: "",
        sortOrder: ""
      },
      //排序激活
      sortActive: "default",
      //排序切换
      levelSort: null
    };
  },
  computed: {
    ...mapState("index", ["regionInfo", "serviceInfo", "gradeInfo"])
  },
  created() {
    // this.clearAll();
    this.getSearchDicRegion("0");
    this.getSearchServiceInfo("service_type");
    this.getSearchGradeInfo("grade_type");

    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.selected = JSON.parse(localStorage.getItem("selected")) || {
      cantonProvince: "",
      serviceType: "",
      gradeType: ""
    };
    this.filterActive = JSON.parse(localStorage.getItem("filterActive")) || {
      cantonProvince: 0,
      serviceType: 0,
      gradeType: 0
    };
    this.searchInfo = JSON.parse(localStorage.getItem("searchInfo")) || {
      cantonProvince: "",
      serviceType: "",
      gradeType: ""
    };
    this.searchText = this.searchInfo.search || "";
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
    this.init(this.searchInfo);
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchServiceInfo",
      "getSearchGradeInfo"
    ]),
    filterSelectProvince(data, name, index, code) {
      //省
      // if (code === true) {
      //@name: 行政区域
      //@description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
      //@author: swx0916
      //@chageTime:2020-2-26
      // this.search(data[index].regionName, data[index].regionCode, "");
      // }
      //点击省级地名时，清空市级和县级地域选项
      console.log("===========", this.searchInfo);
      this.filterActive["cantonCity"] = 0;
      this.selected["cantonCity"] = null;
      this.searchInfo["cantonCity"] = null;
      this.filterActive["cantonArea"] = 0;
      this.selected["cantonArea"] = null;
      this.searchInfo["cantonArea"] = null;
      if (index == -1) {
        this.cityShow = false; //市级城市不显示
        this.cityDiect = ""; //清空市级字典
        this.areaShow = false; //县级城市不显示
        this.areaDiect = ""; //清空县级字典

        this.filterSelect(data, name, index); //清空选中的省级地名
        this.search("全国", "", "");
        return;
      }
      this.getCityDiect(data[index].id); //加载市级字典
      this.filterSelect(data, name, index); //设置选中的省级地名
      this.cityShow = true; //市级城市显示
      this.areaShow = false; //县级城市不显示
      this.areaDiect = ""; //清空县级字典
    },

    filterSelectCity(data, name, index, code) {
      //市
      // if (code === true) {
      //   //@name: 行政区域
      //   //@description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
      //   //@author: swx0916
      //   //@chageTime:2020-2-26
      //   this.search(
      //     data[index].regionName,
      //     data[index].parentId,
      //     data[index].regionCode
      //   );
      // }
      //点击市级地名时，清空县级地域选项
      this.filterActive["cantonArea"] = 0;
      this.selected["cantonArea"] = null;
      this.searchInfo["cantonArea"] = null;
      if (index == -1) {
        //不限地名条件
        this.areaShow = false; //市级城市不显示
        this.areaDiect = ""; //清空市级字典
        //this.areaShow=false;//县级城市不显示
        //this.areaDiect = "";//清空县级字典

        this.filterSelect(data, name, index); //清空选中的市级地名
        return;
      }
      this.getAreaDiect(data[index].id); //获取县的城市字典
      this.filterSelect(data, name, index); //设置选中的市级地名
    },
    getCityDiect(parentId) {
      this.$axios.get(
        "/epf-cms/regionals/getAreaByCodeOrParentId",
        {
          parentId: parentId
        },
        res => {
          if (res.code == 0) {
            this.cityDiect = res.dictionariesList;
          }
        }
      );
    },
    //区、县
    getAreaDiect(parentId) {
      this.$axios.get(
        "/epf-cms/regionals/getAreaByCodeOrParentId",
        {
          parentId: parentId
        },
        res => {
          if (res.code == 0) {
            this.areaDiect = res.dictionariesList;
            if (
              this.areaDiect.length != 0 &&
              this.areaDiect[0].id.length < 10
            ) {
              this.areaShow = true; //县级城市显示
            }
          }
        }
      );
    },
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
          console.log(this.serivemainData);
          this.handleserviceTypeList(this.serivemainData);
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
      );
      console.log(this.serivemainData);
    },
    //处理复选服务类型
    handleserviceTypeList(obj) {
      //
      let that = this;
      for (let n = 0; n < obj.length; n++) {
        if (obj[n].serveType) {
          let temp = obj[n].serveType.split(",");
          for (let j = 0; j < temp.length; j++) {
            for (let i = 0; i < that.dictionary.serviceTypes.length; i++) {
              if (that.dictionary.serviceTypes[i].dictKey == temp[j]) {
                that.serviceTypeList.push(that.dictionary.serviceTypes[i].zhCn);
                break;
              }
            }
          }
        }
        obj[n].serviceTypeList = that.serviceTypeList;
        that.serviceTypeList = [];
      }
    },
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 147 : 49;
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val;
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.init(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.init(this.searchInfo);
    },
    contpage() {
      this.$router.push("/serveSearch");
    },
    searchBtn() {
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.init(this.searchInfo);
    },
    clearAll() {
      this.searchInfo = {};
      this.filterActive = {
        cantonProvince: 0,
        serviceType: 0,
        gradeType: 0
      };
      this.cityShow = false; //市级城市不显示
      this.cityDiect = ""; //清空市级字典
      this.areaShow = false; //县级城市不显示
      this.areaDiect = ""; //清空县级字典
      this.searchText = "";
      this.selected = {};
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.init(this.searchInfo);
    },
    delSelect(key) {
      this.selected[key] = null;
      this.filterActive[key] = 0;
      this.searchInfo[key] = null;
      this.init(this.searchInfo);
    },
    filterSelect(data, name, index) {
      console.log(data, name, index, "省市区");
      if (index === -1) {
        this.filterActive[name] = 0;
        this.selected[name] = null;
        this.searchInfo[name] = null;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.init(this.searchInfo);
        return;
      }
      this.filterActive[name] = index + 1;
      if (
        name == "cantonCity" ||
        name == "cantonProvince" ||
        name == "cantonArea"
      ) {
        this.selected[name] = data[index].regionName;
        this.searchInfo[name] = data[index].regionCode;
      } else {
        this.selected[name] = data[index].zhCn;
        this.searchInfo[name] = data[index].dictKey;
      }

      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.init(this.searchInfo);
      console.log(this.searchInfo);
    },
    //默认排序
    sortDefault() {
      this.searchInfo["page"] = 1;
      this.sortActive = "default";
      this.searchInfo["sortField"] = "";
      this.searchInfo["sortOrder"] = "";
      this.init(this.searchInfo);
    },
    //时间排序
    sortTime() {
      this.searchInfo["page"] = 1;
      this.sortActive = "level";
      //清空已有排序值
      if (this.levelSort == null) {
        this.levelSort = false;
      } else {
        this.levelSort = !this.levelSort;
      }
      this.searchInfo["sortField"] = "level";
      this.searchInfo["sortOrder"] = this.levelSort ? "asc" : "desc";
      this.init(this.searchInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.search_warp {
  @include size(100%, auto);
  background: #fff;
  .tdzr_top {
    border-bottom: solid 1px #f3f3f3;
    box-sizing: border-box;
    padding: 30px 0;
    .searchS {
      @include size(132px, 44px);
      line-height: 44px;
      font-size: 16px;
      vertical-align: middle;
    }
  }
  .tdzr_table {
    clear: both;
    .filterActive {
      color: var(--lightColor);
      font-weight: bold;
    }
    table {
      tr {
        td {
          color: #555555;
          line-height: 54px;
          font-size: 14px;
          border-bottom: 1px solid #eee;
          div {
            color: #555555;
            padding: 0 20px;
            display: inline-block;
            cursor: pointer;
          }
        }
        .td1 {
          width: 80px;
          color: #333;
          font-size: 14px;
        }
        .td2 {
          width: 55px;
          // color: var(--Colors);
          font-size: 14px;
          span {
            cursor: pointer;
          }
        }
      }
      tr:last-child td {
        border-bottom: none;
      }
    }
  }
  .tdzr_left_top {
    @include size(100%, auto);
    line-height: 54px;
    p {
      display: inline-block;
    }
    .tdzr_xuanze {
      @include size(1000px, auto);
      span {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        padding: 0 30px 0 5px;
        color: var(--lightColor);
        display: inline-block;
        margin-left: 3px;
        border: 1px solid var(--lightColor);
        background: url("../../../../assets/image/land_01.png") right no-repeat;
        cursor: pointer;
      }
      a {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        padding: 0 10px 0 30px;
        color: var(--lightColor);
        display: inline-block;
        margin: 0 10px 0 3px;
        background: url("../../../../assets/image/land_02.png") left no-repeat;
      }
    }
  }
}
.serivemain_warp {
  @include size(100%, auto);
  .serivemain_con {
    @include size(1200px, auto);
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    margin-top: 35px;
    .tdzr_listtop {
      @include size(100%, 50px);
      clear: both;
      border-bottom: solid 2px #f3f3f3;
      box-sizing: border-box;
      padding-left: 7px;
      li {
        padding: 0px 20px;
        border-right: 1px solid #d4d4d4;
        display: inline-block;
        font-size: 14px;
        margin-top: 15px;
        span {
          margin-left: 7px;
        }
      }
    }
    .serivemain_content {
      li {
        @include size(100%, 251px);
        box-sizing: border-box;
        padding: 25px;
        border-bottom: solid 2px #eeeeee;
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
                overflow: hidden;
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
.sortBox {
  cursor: pointer;
  transition: 0.2s;
}
.sortBox:hover {
  color: var(--Colors);
}
.sortactive {
  color: var(--Colors);
}
</style>

<style>
.tdzr_top .el-input__inner {
  height: 44px;
}
</style>
