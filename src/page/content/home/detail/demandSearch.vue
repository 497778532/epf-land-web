<template>
  <div>
    <epf-lePage :location="location"></epf-lePage>
    <div class="search_warp">
      <div class="win1200" style="background:#fff;">
        <div style="padding:0 24px;">
          <div class="tdzr_top">
            <div class="search_body">
              <!-- <input
                type="text"
                placeholder="请输入土地位置土地用途土地面积等相关信息"
                class="input_text fl"
                v-model="searchText"
              /> -->
              <el-input
                v-model="searchText"
                style="width:50%;height:44px;"
                placeholder="请输入土地位置土地用途土地面积等相关信息"
              ></el-input>
              <div
                class="epf_btn epf_btn_bg searchS"
                style="margin-left:0"
                @click="searchBtn"
              >
                搜索
              </div>
              <!-- <router-link to="/mapFindPlace">
                <div class="epf_btn epf_btn_bg searchS" style="background-color: var(--Colors);">
                  <img src="../../../../assets/image/icon-local.png" alt style="vertical-align: middle;"/>
              /> -->
              <router-link to="/demandForm?disabledType=false">
                <div class="epf_btn epf_btn_def searchS findland_input_new">
                  <span>发布需求</span>
                </div>
              </router-link>
              <router-link to="/PublishLandHome?disabledType=false">
                <div class="epf_btn epf_btn_def searchS findland_input_new">
                  <span>发布地源</span>
                </div>
              </router-link>
            </div>
          </div>
          <div
            class="tdzr_table"
            :style="{ height: switchHeight, overflow: 'hidden' }"
          >
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td class="td1">行政区域</td>
                <td class="td3" v-if="regionInfo && regionInfo !== null" style="line-height:34px;padding:10px 0">
                  <div
                    @click="
                      filterSelectProvince(
                        regionInfo.dictionariesList,
                        'cantonProvince',
                        -1
                      )
                    "
                    :class="
                      filterActive.cantonProvince == 0 ? 'filterActive' : ''
                    "
                  >
                    <span>不限</span>
                  </div>
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
                  class="td3"
                  v-if="cityDiect && cityDiect !== null"
                  style="background-color: #f5f5f5;"
                >
                  <div
                    :class="filterActive.cantonCity == 0 ? 'filterActive' : ''"
                    @click="filterSelectCity(cityDiect, 'cantonCity', -1)"
                  >
                    全部
                  </div>
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
                  class="td3"
                  v-if="areaDiect && areaDiect !== null"
                  style="background-color: #f5f5f5;"
                >
                  <div
                    @click="filterSelect(areaDiect, 'cantonArea', -1)"
                    :class="filterActive.cantonArea == 0 ? 'filterActive' : ''"
                  >
                    全部
                  </div>
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
                <td class="td1">土地用途</td>
                <td class="td3" v-if="landUseInfo && landUseInfo !== null">
                  <div
                    @click="
                      filterSelect(
                        landUseInfo.dictionariesEntities,
                        'firstClassUse',
                        -1
                      )
                    "
                    :class="
                      filterActive.firstClassUse == 0 ? 'filterActive' : ''
                    "
                  >
                    不限
                  </div>
                  <div
                    v-for="(item, index) in landUseInfo.dictionariesEntities"
                    :class="
                      filterActive.firstClassUse == index + 1
                        ? 'filterActive'
                        : ''
                    "
                    @click="getsecondClassUse(item.id, index)"
                    :key="index"
                  >
                    {{ item.zhCn }}
                  </div>
                </td>
              </tr>
              <tr v-if="isTwo">
                <td class="td1"></td>
                <td class="td3" style="background-color: #f5f5f5;">
                  <div
                    @click="filterSelect(twoUser, 'secondClassUse', -1)"
                    :class="
                      filterActive.secondClassUse == 0 ? 'filterActive' : ''
                    "
                  >
                    全部
                  </div>
                  <div
                    v-for="(item, index) in twoUser"
                    :key="index"
                    :class="
                      filterActive.secondClassUse == index + 1
                        ? 'filterActive'
                        : ''
                    "
                    @click="filterSelect(twoUser, 'secondClassUse', index)"
                  >
                    {{ item.zhCn }}
                  </div>
                </td>
              </tr>

              <tr>
                <td class="td1">需求类型</td>
                <td class="td3" v-if="flowModeInfo && flowModeInfo !== null">
                  <div
                    @click="
                      filterSelect(
                        flowModeInfo.dictionariesEntities,
                        'demand',
                        -1
                      )
                    "
                    :class="filterActive.demand == 0 ? 'filterActive' : ''"
                  >
                    不限
                  </div>
                  <div
                    v-for="(item, index) in flowModeInfo.dictionariesEntities"
                    :class="
                      filterActive.demand == index + 1 ? 'filterActive' : ''
                    "
                    @click="
                      filterSelect(
                        flowModeInfo.dictionariesEntities,
                        'demand',
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
                <td class="td1">地块面积</td>
                <td class="td3" v-if="plotAreaInfo && plotAreaInfo !== null">
                  <div
                    @click="
                      filterSelect(
                        plotAreaInfo.dictionariesEntities,
                        'area',
                        -1
                      )
                    "
                    :class="filterActive.area == 0 ? 'filterActive' : ''"
                  >
                    不限
                  </div>
                  <div
                    v-for="(item, index) in plotAreaInfo.dictionariesEntities"
                    :class="
                      filterActive.area == index + 1 ? 'filterActive' : ''
                    "
                    @click="
                      filterSelect(
                        plotAreaInfo.dictionariesEntities,
                        'area',
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
                <td class="td1">使用年限</td>
                <td class="td3" v-if="yearsUseInfo && yearsUseInfo !== null">
                  <div
                    @click="
                      filterSelect(
                        yearsUseInfo.dictionariesEntities,
                        'years',
                        -1
                      )
                    "
                    :class="filterActive.years == 0 ? 'filterActive' : ''"
                  >
                    不限
                  </div>
                  <div
                    v-for="(item, index) in yearsUseInfo.dictionariesEntities"
                    :class="
                      filterActive.years == index + 1 ? 'filterActive' : ''
                    "
                    @click="
                      filterSelect(
                        yearsUseInfo.dictionariesEntities,
                        'years',
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

            <div style="height: 1px;background-color: #eee;"></div>
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
              <div class="clear" style="background-color: #eee;"></div>
            </div>
          </div>
          <div style="height: 40px;line-height: 40px;text-align: center;">
            <span class="flexibleSwitchCenter" @click="flexSwitch">
              {{ flexibleOpen ?  "收起筛选项" : "更多筛选项" }}
              <i
                :class="
                  flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                "
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="landmain win1200">
      <div class="tdzr_main">
        <div class="tdzr_left">
          <ul class="tdzr_listtop">
            <li
              :class="['sortBox', sortActive == 'default' ? 'sortactive' : '']"
              @click="sortDefault"
            >
              默认排序
            </li>
            <li
              :class="['sortBox', sortActive == 'time' ? 'sortactive' : '']"
              @click="sortTime"
            >
              发布时间
              <span>{{ this.timeSort ? "↑" : "↓" }}</span>
            </li>
            <li
              :class="['sortBox', sortActive == 'area' ? 'sortactive' : '']"
              @click="sortArea"
            >
              面积
              <span>{{ this.areaSort ? "↑" : "↓" }}</span>
            </li>
            <li
              :class="['sortBox', sortActive == 'year' ? 'sortactive' : '']"
              @click="sortYear"
            >
              年限
              <span>{{ this.yearSort ? "↑" : "↓" }}</span>
            </li>
          </ul>
          <div
            class="tdzr_list"
            style="min-height:170px;"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            element-loading-background="rgba(251, 251, 251, 0.9)"
          >
            <!-- 渲染列表 -->
            <div
              class="tdzr"
              v-for="(item, index) in matchData"
              :key="index"
              @click="openDemandDetail(item.id)"
            >
              <!-- <div class="list_img">
                  <img class="tdzr_right_img" :src="baseUrl+item.img" />
                  <div class="collect">
                    <img src="../../../../assets/image/nocollect.png" alt="" v-show="item.isCollect == '0'" @click.stop="nocollect(item.id, index)">
                    <img src="../../../../assets/image/collect.png" alt="" v-show="item.isCollect == '1'" @click.stop="collect(item.collectId, index)">
                  </div>
              </div>-->
              <!-- <div class="list_right"> -->
              <!-- <h4>{{item.title}}</h4>
                  <div class="list_bot_active list_bot_active01" v-show="item.demand==1">{{item.demandName}}</div>
                  <div class="list_bot_active list_bot_active02" v-show="item.demand==2">{{item.demandName}}</div>
              <div class="list_bot_active list_bot_active03" v-show="!item.demand">求购</div>-->
              <!-- <div class="list_bot_active list_bot_active04">属地认证</div>
                  <div class="list_bot_active list_bot_active04" v-show="item.landType==='personal_land'">{{item.landTypeName}}</div>
                  <div class="list_bot_active list_bot_active05" v-show="item.landType==='enterprise_land'">{{item.landTypeName}}</div>
              <div class="list_bot_active list_bot_active05" v-show="item.sourcetype===3 ">政府单位地源</div>-->
              <!-- <p>地址：<span>{{item.cantonProvinceName}} / {{item.cantonCityName}} / {{item.cantonAreaName}}</span></p>
                  <p>土地面积（平方米）：<span>{{item.area}}</span></p>
                  <p>土地用途：<span>{{item.firstClassUseName}} - {{item.secondClassUseName}}</span></p>
              <div class="list_right_cen">{{item.price?item.price + ' 万元':'面议'}}</div>-->
              <p style="font-weight:bold;font-size:16px;color:#333;">
                <span
                  :class="{
                    landDemandBuy: item.demandName == '求购',
                    landDemandRent: item.demandName == '求租'
                  }"
                  >{{ item.demandName }}</span
                >
                {{ item.title }}
              </p>
              <el-row>
                <el-col
                  :span="10"
                  style="font-size:14px;color:#333;line-height:42px;"
                >
                  <span style="color:#999">地址：</span>
                  {{ item.cantonProvinceName }}/{{ item.cantonCityName }}/{{
                    item.cantonAreaName
                  }}
                </el-col>
                <el-col
                  :span="8"
                  style="font-size:14px;color:#333;line-height:42px;"
                >
                  <span style="color:#999">土地面积（平方米）：</span>
                  {{ item.area }}
                </el-col>
                <el-col :span="5" style="line-height:42px;text-align:right;">
                  <span class="list_right_cen">{{
                    item.price ? "¥" + Division(item.price) + " 万元" : "面议"
                  }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="font-size:14px;color:#333;">
                  <span style="color:#999">土地用途：</span>
                  {{ item.firstClassUseName }}-{{ item.secondClassUseName }}
                </el-col>
              </el-row>
              <!-- </div> -->
              <div style="clear: both;"></div>
            </div>
            <div
              v-if="matchData == [] || matchData == ''"
              style="text-align:center;"
            >
              <img
                style="margin-top:10px;margin-bottom:10px;height:190px;"
                src="../../../../assets/image/dataNone.png"
              />
            </div>
          </div>
          <div class="block">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5, 10, 15]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
              :page-size="pageSize"
              :current-page="pageNo"
            ></el-pagination>
            <div class="pagS"></div>
          </div>
        </div>
        <div class="tdzr_right">
          <div class="tdzr_right_top">
            <div class="tdzr_right_list">
              <router-link to="/mapFindPlace"
                ><div class="tdzr_right_list_pub tdzr_right_list_pub1"></div>
              </router-link>
              <router-link to="/?showland=1"
                ><div class="tdzr_right_list_pub tdzr_right_list_pub2"></div>
              </router-link>
              <router-link to="/?showdemand=1"
                ><div class="tdzr_right_list_pub tdzr_right_list_pub3"></div>
              </router-link>
            </div>
          </div>
          <PopularRecommend
            class="popular_recommend"
            ref="popular"
          ></PopularRecommend>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import PopularRecommend from "@/components/PopularRecommend";
import baseURL1 from "@/util/config.js";
import { mapState, mapActions } from "vuex";
import qs from "qs";
import TMap from "@/components/common/tianditu/init";
export default {
  components: { PopularRecommend },
  data() {
    return {
      switchHeight: "278px",
      twoUser: [],
      cityShow: false,
      areaShow: false,
      isTwo: false,
      baseUrl: "",
      indexcollect: 1,
      location: [
        { path: "/", name: "首页" },
        { path: null, name: "地块需求搜索" }
      ],
      adminArea: [],
      currentPage4: 4,
      searchText: "",
      filterActive: {
        cantonProvince: "",
        firstClassUse: "",
        demand: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      },
      selected: {},
      searchInfo: {},
      matchData: [],
      collectionData: [],
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      //排序激活
      sortActive: "default",
      //排序切换
      timeSort: null,
      areaSort: null,
      yearSort: null,
      loading: true,
      defaultImg:
        'this.src="' +
        require("../../../../assets/image/icon-nodata.png") +
        '"', //默认图地址
      cityDiect: [],
      areaDiect: [],
      cityShow: false,
      areaShow: false,
      flexibleOpen: false,
      geocoder: "",
      T: ""
    };
  },
  computed: {
    ...mapState("index", [
      "regionInfo",
      "landUseInfo",
      "flowModeInfo",
      "plotAreaInfo",
      "yearsUseInfo",
      "landtypeInfo",
      "landNatureInfo"
    ])
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchLandUseInfo",
      "getSearchflowModeInfo",
      "getSearchPlotAreaInfo",
      "getSearchYearsUseInfo",
      "getSearchLandtypeInfo",
      "getSearchlandNatureInfo"
    ]),
    nocollect(id, index) {
      if (!sessionStorage.getItem("login")) {
        this.$message({
          message: "请先登录再进行收藏",
          type: "warning"
        });
        this.collectionData = [];
        return;
      }
      //收藏
      this.$axios.post(
        "/epf-landweb/transwebcollect/addTransWebCollect",
        qs.stringify({
          targetId: id,
          collectType: "tpurchase"
        }),
        res => {
          if (res.code === 0) {
            this.matchData[index].isCollect = "1";
            this.matchData[index].collectId = res.id;
            this.$message.success("收藏成功");
          } else {
            this.$message.error("收藏失败");
          }
        }
      );
    },

    collect(id, index) {
      //取消收藏
      this.$axios.post(
        "/epf-landweb/transwebcollect/deleteTransWebCollect",
        qs.stringify({
          id: id
        }),
        res => {
          if (res.code === 0) {
            this.matchData[index].isCollect = "0";
            this.$message.success("取消收藏成功");
          } else {
            this.$message.error("取消收藏失败");
          }
        }
      );
    },
    filterSelect(data, name, index) {
      console.log("data", data);
      console.log(name, "name", name == "firstClassUse");
      console.log(index, "index", index == -1);
      this.pageNo = 1;
      if (index === -1) {
        this.filterActive[name] = 0;
        this.selected[name] = null;
        this.searchInfo[name] = null;
        if (name == "firstClassUse") {
          this.filterActive["secondClassUse"] = 0;
          this.selected["secondClassUse"] = null;
          this.searchInfo["secondClassUse"] = null;
          this.isTwo = false;
        }
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.getSearchResults(this.searchInfo);
        this.$refs.popular.getPopular(this.searchInfo);
        console.log(this.searchInfo);
        return;
      }
      this.filterActive[name] = index + 1;
      if (
        name == "cantonProvince" ||
        name == "cantonCity" ||
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
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
      this.$refs.popular.getPopular(this.searchInfo);
      console.log(this.searchInfo);
    },
    getSearchResults(params) {
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      //搜索接口
      this.loading = true;
      let url;
      if (sessionStorage.getItem("login")) {
        url = "/epf-landweb/admin/tlandSearch/getListDemandSearch";
      } else {
        url = "/epf-landweb/tlandSearch/getListDemandSearch";
      }
      this.$axios.get(url, params, res => {
        this.loading = false;
        console.log("搜索结果", res);
        this.matchData = res.pager.results;
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
      });
      console.log("1111", params);
      // this.getPopular(params);
    },
    searchBtn() {
      this.pageNo = 1;
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getSearchResults(this.searchInfo);
      this.$refs.popular.getPopular(this.searchInfo);
    },
    clearAll() {
      this.searchInfo = {};
      this.cityShow = false;
      this.areaShow = false;
      this.isTwo = false;
      this.filterActive = {
        cantonProvince: "",
        firstClassUse: "",
        demand: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      };
      this.selected = {};
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getSearchResults(this.searchInfo);
    },
    delSelect(key) {
      (this.selected[key] = null),
        (this.filterActive[key] = 0),
        (this.searchInfo[key] = null),
        this.getSearchResults(this.searchInfo);
    },
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    openDemandDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/supplyDetails",
        query: { supply: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      window.scrollTo(0, 730);
      this.pageSize = val;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getSearchResults(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      window.scrollTo(0, 730);
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getSearchResults(this.searchInfo);
    },
    RightSkip(routerName) {
      this.$router.push({ path: routerName, query: { disabledType: false } });
    },
    //默认排序
    sortDefault() {
      this.searchInfo["page"] = 1;
      this.sortActive = "default";
      this.searchInfo["sortField"] = "";
      this.searchInfo["sortOrder"] = "";
      this.getSearchResults(this.searchInfo);
    },
    //时间排序
    sortTime() {
      this.searchInfo["page"] = 1;
      this.sortActive = "time";
      //清空已有排序值
      if (this.timeSort == null) {
        this.timeSort = false;
      } else {
        this.timeSort = !this.timeSort;
      }
      console.log(this.timeSort);
      this.searchInfo["sortField"] = "insert_time";
      this.searchInfo["sortOrder"] = this.timeSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },
    //面积排序
    sortArea() {
      this.searchInfo["page"] = 1;
      this.sortActive = "area";
      //清空已有排序值
      if (this.areaSort == null) {
        this.areaSort = false;
      } else {
        this.areaSort = !this.areaSort;
      }
      console.log(this.areaSort);
      this.searchInfo["sortField"] = "area";
      this.searchInfo["sortOrder"] = this.areaSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },
    //年限排序
    sortYear() {
      this.searchInfo["page"] = 1;
      this.sortActive = "year";
      //清空已有排序值
      if (this.yearSort == null) {
        this.yearSort = false;
      } else {
        this.yearSort = !this.yearSort;
      }
      console.log(this.yearSort);
      this.searchInfo["sortField"] = "years";
      this.searchInfo["sortOrder"] = this.yearSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },

    //获取二级土地用途
    getsecondClassUse(i, e, landUseInfo) {
      this.isTwo = true;
      this.filterSelect(
        this.landUseInfo.dictionariesEntities,
        "firstClassUse",
        e
      );
      this.$axios.get(
        "/epf-landweb/dictionaries/getDictsByCodeOrParentId",
        {
          code: "land_use",
          parentId: i
        },
        res => {
          if (res.code == "0") {
            this.twoUser = res.dictionariesList;
          }
        }
      );
    },
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? "auto" : "278px";
    },
    // flexSwitch() {
    //   this.flexibleOpen = !this.flexibleOpen;
    //   this.switchHeight = this.flexibleOpen ? "auto" : "278px";
    // }
    //市
    getCityDiect(parentId) {
      this.$axios.get(
        "/epf-cms/regionals/getAreaByCodeOrParentId",
        { parentId: parentId },
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
        { parentId: parentId },
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
    filterSelectProvince(data, name, index, code) {
      //省
      if (code === true) {
        this.search(data[index].regionName, data[index].regionCode, "");
      }
      //点击省级地名时，清空市级和县级地域选项
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
      if (code === true) {
        this.search(
          data[index].regionName,
          data[index].parentId,
          data[index].regionCode
        );
      }
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
    getPosition() {
      //地理编码
      TMap.init()
        .then(T => {
          this.T = T;
          this.geocoder = new T.Geocoder(); //实例地理编码对象
        })
        .catch(error => {
          this.$message({
            center: true,
            message: error,
            type: "error"
          });
        });
    },
    search(cityName, parentId, id) {
      const _this = this;
      this.geocoder.getPoint(cityName, searchResult);
      function searchResult(result) {
        //获取返回方法
        if (result.getStatus() == 0) {
          _this.geocoderData = result.getLocationPoint();
          const addObj = {
            //创建返回地理信息对象
            // creditArea:'',
            creditCity: cityName, //城市名
            creditLatitude: _this.geocoderData.lng, //经度
            creditLongitude: _this.geocoderData.lat, //纬度
            // creditProvince:'',
            // creditStreet:''
            cantonProvince: parentId,
            cantonCity: id
          };
          sessionStorage.setItem("Address", JSON.stringify(addObj)); //保存
          console.log("您选择的城市", addObj);
          this.$bus.$emit("callFun");
          // _this.$router.push({path:`${sessionStorage.getItem('cacheRoute')}`})
        } else {
          this.$message({
            center: true,
            message: "地理编码接口错误",
            type: "error"
          });
        }
      }
    }
  },
  mounted() {
    // console.log(this.regionInfo)
    setTimeout(this.getPosition(), 100); //自动执行
    if (this.searchInfo["cantonCity"]) {
      //1、加载字典
      this.getCityDiect(this.searchInfo["cantonProvince"]);
      this.cityShow = true;
    }
    if (this.searchInfo["cantonArea"]) {
      //1、加载字典
      this.getAreaDiect(this.searchInfo["cantonCity"]);
      this.areaShow = true;
    }
  },
  created() {
    window.scrollTo(0, 120);
    this.getSearchDicRegion("0");
    this.getSearchLandUseInfo("land_use");
    this.getSearchflowModeInfo("purchasr_demand");
    this.getSearchPlotAreaInfo("plot_area");
    this.getSearchYearsUseInfo("years_use");
    this.getSearchLandtypeInfo("land_type");
    this.getSearchlandNatureInfo("land_nature");
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.selected = JSON.parse(localStorage.getItem("selected")) || {
      cantonProvince: "",
      firstClassUse: "",
      demand: "",
      area: "",
      years: "",
      landType: "",
      landChar: ""
    };
    this.filterActive = JSON.parse(localStorage.getItem("filterActive")) || {
      cantonProvince: "",
      firstClassUse: "",
      demand: "",
      area: "",
      years: "",
      landType: "",
      landChar: ""
    };
    this.searchInfo = JSON.parse(localStorage.getItem("searchInfo")) || {
      cantonProvince: "",
      firstClassUse: "",
      demand: "",
      area: "",
      years: "",
      landType: "",
      landChar: ""
    };
    console.log(this.searchInfo)
    console.log(this.filterActive)
    console.log(this.selected)
    this.searchText = this.$route.query.search;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.getSearchResults(this.searchInfo);
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
  background: #f2f1f9;
  .tdzr_top {
    @include size(100%, 85px);
    border-bottom: solid 1px #f3f3f3;
    .search_body {
      box-sizing: border-box;
      padding-top: 20px;
      .input_text {
        @include size(618px, 44px);
        background-color: #f1f5f8;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 17px;
        color: #999999;
        font-size: 14px;
        &::placeholder {
          color: #999;
        }
      }
      .searchS {
        @include size(132px, 44px);
        line-height: 44px;
        font-size: 16px;
        vertical-align: middle;
      }
      .findland_input_new {
        background-color: #fff;
        border: 1px solid var(--lightColor);
        border-radius: 3px;
        font-weight: bold;
        color: var(--lightColor);
        text-align: center;
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
      }
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
          line-height: 50px;
          font-size: 14px;
          border-bottom: 1px solid #eee;
          div {
            color: #555555;
            padding: 0 14px;
            display: inline-block;
            cursor: pointer;
          }
        }
        .td1 {
          width: 80px;
          color: #666;
          font-weight: bold;
          font-size: 14px;
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
.landmain {
  @include size(1200px, auto);
  padding-bottom: 35px;
  .tdzr_main {
    @include size(100%, auto);
    clear: both;
    margin-top: 20px;
    .tdzr_left {
      @include size(864px, auto);
      float: left;
      overflow: hidden;
      background: #fff;
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
      .tdzr_list {
        @include size(100%, auto);
        padding-bottom: 20px;
        .tdzr {
          @include size(100%, 128px);
          border-bottom: 2px solid #f3f3f3;
          box-sizing: border-box;
          padding: 20px 30px 20px 24px;
          cursor: pointer;
          .landDemandBuy {
            display: inline;
            font-size: 14px;
            color: var(--lightColor);
            padding: 4px 15px;
            border-radius: 0px 8px 0px 8px;
            background-color: #f2f5f7;
            // margin-left: 10px;
          }
          .landDemandRent {
            display: inline;
            font-size: 14px;
            color: var(--priceColor);
            padding: 4px 15px;
            border-radius: 0px 8px 0px 8px;
            background-color: #fff1f1;
            // margin-left: 10px;
          }
          .list_right_cen {
            color: var(--priceColor);
            font-size: 18px;
            font-weight: bold;
          }
          .list_img {
            width: 265px;
            height: 179px;
            float: left;
            position: relative;
            .tdzr_right_img {
              width: 100%;
              height: 100%;
            }
            .collect {
              @include size(28px, 28px);
              background: rgba(255, 255, 255, 0.5);
              border-radius: 50%;
              position: absolute;
              right: 8px;
              top: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .list_right {
            width: 500px;
            height: 179px;
            margin-left: 20px;
            float: left;
            position: relative;
            h4 {
              line-height: 34px;
              color: #333;
              font-size: 16px;
              font-weight: bold;
            }
            .list_bot_active {
              display: inline-block;
              color: var(--Colors);
              font-size: 14px;
              background-color: #fef1e1;
              border-top-right-radius: 8px;
              border-bottom-left-radius: 8px;
              padding: 5px 15px;
              margin-bottom: 5px;
              margin-right: 10px;
            }
            .list_bot_active01 {
              color: var(--Colors);
              background: #fff1f1;
            }
            .list_bot_active02 {
              color: #93b52d;
              background: #ecf7c9;
            }
            .list_bot_active03 {
              color: #4875cf;
              background: #e1effe;
            }
            .list_bot_active04 {
              color: var(--Colors);
              background: #fff;
              border: solid 1px #f99c0d;
            }
            .list_bot_active05 {
              color: #4875cf;
              background: #fff;
              border: solid 1px #4875cf;
            }
            p {
              line-height: 28px;
              color: #999999;
              font-size: 14px;
              span {
                color: #666;
              }
            }
          }
        }
      }
      .block {
        text-align: center;
        margin: 20px 0;
      }
    }
    .tdzr_right {
      @include size(316px, auto);
      overflow: hidden;
      float: right;
      .tdzr_right_top {
        box-sizing: border-box;
        padding: 20px 20px 10px 20px;
        margin-bottom: 20px;
        background: #fff;
        .tdzr_right_list_pub {
          @include size(274px, 170px);
          margin-bottom: 20px;
          box-sizing: border-box;
          padding-top: 40px;
          background-blend-mode: normal, normal;
          cursor: pointer;
          &1 {
            background-image: linear-gradient(-30deg, #6febcc 0%, #bff7e9 100%),
              linear-gradient(#000000, #000000);
            background: url("../../../../assets/image/icon-search03.jpg")
              no-repeat center center;
          }
          &2 {
            background-image: linear-gradient(-30deg, #ffe1a6 0%, #fdf7f2 100%),
              linear-gradient(#000000, #000000);
            background: url("../../../../assets/image/icon-search01.jpg")
              no-repeat center center;
          }
          &3 {
            background-image: linear-gradient(-30deg, #a6c7ff 0%, #f2fafd 100%),
              linear-gradient(#000000, #000000);
            background: url("../../../../assets/image/icon-search02.jpg")
              no-repeat center center;
          }
          i {
            display: block;
            width: 48px;
            height: 56px;
            margin: 0 auto;
            background-image: linear-gradient(-30deg, #f9faf5 0%, #fef3ee 100%),
              linear-gradient(#fcfffc, #fcfffc);
          }
          p {
            font-size: 20px;
            color: #ffff;
            line-height: 40px;
            text-align: center;
          }
        }
      }
      .tdzr_right .popular_recommend {
        /deep/ .tdzr_right_list {
          .right_list {
            @include size(275px, auto);
            .right_list_img {
              @include size(275px, 186px);
              img {
                display: block;
                @include size(275px, 186px);
              }
            }
            .mainlist_cont_bot {
              padding: 18px;
              line-height: 30px;
              .mainlist_cont_bot_active {
                color: var(--Colors);
              }
              h5 {
                font-size: 12px;
              }
            }
          }
        }
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
.search_body .el-input__inner {
  height: 44px;
  background: #f1f5f8;
  border: none;
}
</style>
