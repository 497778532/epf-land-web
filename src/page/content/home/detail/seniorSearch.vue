<template>
  <div style="background-color:#f2f1f9;">
    <div v-show="false">{{ lcom }}</div>
    <epf-lePage :location="location"></epf-lePage>
    <div class="search_warp">
      <div class="win1200" style="background-color: #FFFFFF;">
        <div style="padding: 0 24px;">
          <div class="tdzr_top">
            <div class="search_body" style="position: relative;">
              <input
                type="text"
                placeholder="请输入关键字"
                class="input_text fl"
                v-model="searchText"
              />
              <div class="epf_btn epf_btn_bg searchS fl " @click="searchBtn">
                搜索
              </div>
              <router-link to="/mapFindPlace">
                <div
                  class="epf_btn epf_btn_bg searchS"
                  style="background-color: var(--Colors);"
                >
                  <img
                    src="@/assets/image/icon-local.png"
                    alt
                    style="vertical-align: middle;"
                  />
                  <span>地图找地</span>
                </div>
              </router-link>
              <div style="position: absolute;top: 10px;right: 0;">
                <img src="@/assets/image/searchPic.png" />
              </div>
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
                <td class="td1">流转方式</td>
                <td class="td3" v-if="flowModeInfo && flowModeInfo !== null">
                  <div
                    @click="
                      filterSelect(
                        flowModeInfo.dictionariesEntities,
                        'circulation',
                        -1
                      )
                    "
                    :class="filterActive.circulation == 0 ? 'filterActive' : ''"
                  >
                    不限
                  </div>
                  <div
                    v-for="(item, index) in flowModeInfo.dictionariesEntities"
                    :class="
                      filterActive.circulation == index + 1
                        ? 'filterActive'
                        : ''
                    "
                    @click="
                      filterSelect(
                        flowModeInfo.dictionariesEntities,
                        'circulation',
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
                <td class="td1">其他</td>
                <td>
                  <el-select
                    placeholder="使用年限"
                    ref="years"
                    v-if="yearsUseInfo && yearsUseInfo !== null"
                    v-model="filterActive.years"
                    @change="getYears($event)"
                  >
                    <el-option
                      v-for="(item, index) in yearsUseInfo.dictionariesEntities"
                      :key="index"
                      :label="item.zhCn"
                      :value="index"
                    ></el-option>
                  </el-select>

                  <el-select
                    placeholder="土地类型"
                    v-if="landtypeInfo && landtypeInfo !== null"
                    v-model="filterActive.landType"
                    @change="getTyep($event)"
                  >
                    <el-option
                      v-for="(item, index) in landtypeInfo.dictionariesEntities"
                      :key="index"
                      :label="item.zhCn"
                      :value="index"
                    ></el-option>
                  </el-select>

                  <el-select
                    placeholder="土地性质"
                    v-if="landNatureInfo && landNatureInfo !== null"
                    v-model="filterActive.landChar"
                    @change="getChar($event)"
                  >
                    <el-option
                      v-for="(item,
                      index) in landNatureInfo.dictionariesEntities"
                      :key="index"
                      :label="item.zhCn"
                      :value="index"
                    ></el-option>
                  </el-select>
                  <el-select
                    placeholder="土地认证"
                    v-model="filterActive.status"
                    @change="getStatus($event)"
                  >
                    <el-option
                      v-for="(item,
                      index) in statusInfo.dictionariesEntities"
                      :key="index"
                      :label="item.zhCn"
                      :value="index"
                    ></el-option>
                  </el-select>
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
              {{ flexibleOpen ? "收起筛选项" : "更多筛选项" }}
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
    <div class="win1200" style="padding-bottom: 35px;margin-top: 20px;">
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
          <li
            :class="['sortBox', sortActive == 'price' ? 'sortactive' : '']"
            @click="sortPrice"
          >
            金额
            <span>{{ this.priceSort ? "↑" : "↓" }}</span>
          </li>
          <li
            :class="['sortBox', sortActive == 'viewsNum' ? 'sortactive' : '']"
            @click="sortClick"
          >
            点击率
            <span>{{ this.clickSort ? "↑" : "↓" }}</span>
          </li>
        </ul>
        <div class="tdzr_list">
          <!-- style="min-height:250px;"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255, 0.9)" -->
          <!-- <div style="text-align:center" v-if="imageSearch">
              <img
                src="@/assets/image/searchNull.png"
                alt
                width="270px"
                style="margin-top:50px;"
              />
            </div> -->
          <!-- 渲染列表 -->
          <div
            class="tdzr"
            v-for="(item, index) in matchData"
            :key="index"
            @click="openDetail(item.id)"
          >
            <div class="list_right">
              <el-row>
                <el-col :span="8" style="margin-right:16px;">
                  <div class="list_img">
                    <img
                      class="tdzr_right_img"
                      :src="baseUrl + item.img"
                      alt
                      :onerror="defaultImg"
                    />
                    <!-- <div class="collect">
                        <img src="@/assets/image/nocollect.png" alt="" v-show="item.isCollect == '0' || !tPurchase.isCollect" @click.stop="nocollect(item.id, index)">
                        <img src="@/assets/image/collect.png" alt="" v-show="item.isCollect == '1'" @click.stop="collect(item.collectId, index)">
                      </div> -->
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <h4 v-html="item.title"></h4>
                    </el-col>
                    <el-col :span="24" style="margin-top:12px;">
                      <div
                        class="list_bot_active list_bot_active01"
                        v-show="
                          item.circulation == 'transfer' || 'rent' || 'mortgage'
                        "
                      >
                        {{ item.circulationName }}
                      </div>
                      <div class="list_bot_active list_bot_active06" v-if="item.status == 'audit'">
                        未经属地认证
                      </div>
                      <div class="list_bot_active list_bot_active00" v-else>
                        属地认证
                      </div>
                      <div
                        class="list_bot_active list_bot_active05"
                        v-show="
                          item.landType === 'personal_land' ||
                            'enterprise_land' ||
                            'intermediary_auction_land' ||
                            'judicial_disposal_land' ||
                            'national_disposal_land'
                        "
                      >
                        {{ item.landTypeName }}
                      </div>
                      <div
                        class="list_bot_active list_bot_active05"
                        v-show="item.sourcetype === 3"
                      >
                        政府单位地源
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24" style="margin-top:7px;">
                      <p>
                        地址：
                        <span
                          >{{ item.cantonProvinceName }} /
                          {{ item.cantonCityName }} /
                          {{ item.cantonAreaName }}</span
                        >
                      </p>
                    </el-col>
                    <el-col :span="24" style="margin-top:6px;">
                      <p>
                        土地面积（平方米）：
                        <span>{{ item.area }}</span>
                      </p>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24" style="margin-top:8px;">
                      <p>
                        土地用途：
                        <span
                          >{{ item.firstClassUseName }} -
                          {{ item.secondClassUseName }}</span
                        >
                      </p>
                    </el-col>
                    <el-col :span="24" style="margin-top:8px;">
                      <p>
                        {{ circulationType }}年限：
                        <span>{{ item.years }}年</span>
                      </p>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <div class="list_right_cen">
                    <span v-show="item.price ? true : false">￥</span>
                    <!--{{item.price?item.price + ' 万元':'面议'}}-->
                    <span v-if="item.price">
                      <span style="font-size: 24px;">{{
                        Division(item.price)
                      }}</span>
                      <span style="font-size: 22px;">万元</span>
                    </span>
                    <span v-else style="font-size: 24px;">面议</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="clear: both;"></div>
          </div>
          <div
            v-if="matchData == [] || matchData == ''"
            style="text-align:center;"
          >
            <img
              style="margin-top:10px;margin-bottom:10px;height:190px;"
              src="@/assets/image/dataNone.png"
            />
          </div>
        </div>
        <el-pagination
          class="block"
          background
          layout="prev,pager, next,sizes,jumper"
          :page-sizes="[5, 10, 15, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="totalRecord"
          :current-page="pageNo"
          :page-size="pageSize"
        ></el-pagination>
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
        <PopularRecommend ref="popular"></PopularRecommend>
      </div>
    </div>
  </div>
</template>
<script>
import PopularRecommend from "@/components/PopularRecommend";
import baseURL1 from "@/util/config.js";
import { mapState, mapMutations, mapActions } from "vuex";
import qs from "qs";
import TMap from "@/components/common/tianditu/init";
export default {
  components: {
    PopularRecommend
  },
  data() {
    return {
      switchHeight: "278px",
      flexibleOpen: false,
      switchHeightland: 49,
      flexibleOpenland: false,
      baseUrl: "",
      indexcollect: 1,
      location: [
        {
          path: "/",
          name: "首页"
        },
        {
          path: null,
          name: "地块搜索"
        }
      ],
      yearsUseInfo: {},
      landtypeInfo: {},
      landNatureInfo: {},
      statusInfo: {},
      adminArea: [],
      currentPage4: 4,
      searchText: "",
      filterActive: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: "",
        status: ""
      },
      selected: {},
      searchInfo: {},
      matchData: [],
      loading: false,
      imageSearch: false,
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
      priceSort: null,
      clickSort: null,
      circulationType: "使用",
      defaultImg:
        'this.src="' +
        require("../../../../assets/image/icon-nodata.png") +
        '"', //默认图地址
      cityDiect: [],
      areaDiect: [],
      twoUser: [],
      cityShow: false,
      areaShow: false,
      isTwo: false,
      Resetdata: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: "",
        status: "",
      },
      selectedCom: "",
      filterActiveCom: "",
      searchInfoCom: ""
    };
  },
  computed: {
    ...mapState("index", [
      "regionInfo",
      "landUseInfo",
      "flowModeInfo",
      "plotAreaInfo"
    ]),
    ...mapState("region", ["filterActiveS"]),
    lcom() {
      this.selected = JSON.parse(window.localStorage.getItem("selected"));
      this.filterActive = JSON.parse(
        window.localStorage.getItem("filterActive")
      );
      this.searchInfo = JSON.parse(window.localStorage.getItem("searchInfo"));
      return this.selected;
    }
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchLandUseInfo",
      "getSearchflowModeInfo",
      "getSearchPlotAreaInfo"
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
          collectType: "tsell"
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
            this.$message("取消收藏成功");
          } else {
            this.$message("取消收藏失败");
          }
        }
      );
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
    filterSelectProvince(data, name, index, code) {
      //省
      if (code === true) {
        //@name: 行政区域
        //@description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
        //@author: swx0916
        //@chageTime:2020-2-26
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

    filterSelect(data, name, index, code) {
      console.log(data, name, index);
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
        // this.getSearchResults(this.searchInfo);
        this.searchBtn();
        //改bug931
        this.circulationType = "使用";
        return;
      }
      //判断添加样式
      if (name == "years" || name == "landType" || name == "landChar" || name == "status") {
        console.log("不添加");
        this.selected[name] = "";
      } else {
        this.filterActive[name] = index + 1;
      }
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
        if (data[index].zhCn == "全部") {
          this.selected[name] = "";
          if (name == "years") {
            this.filterActive.years = "使用年限";
          }
          if (name == "landType") {
            this.filterActive.landType = "土地类型";
          }
          if (name == "landChar") {
            this.filterActive.landChar = "土地性质";
          }
          if (name == "status") {
            this.filterActive.status = "属地认证";
          }
        }
      }
      this.circulationType = this.selected.circulation;
      // this.getSearchResults(this.searchInfo);
      this.searchBtn();
      //改bug931
      if (name == "circulation") {
        this.circulationType = data[index].zhCn;
        console.log(this.circulationType, "///////////");
      } else {
        this.circulationType = "使用";
      }
    },
    // getPosition() {
    //   //地理编码
    //   TMap.init()
    //     .then(T => {
    //       this.T = T;
    //       this.geocoder = new T.Geocoder(); //实例地理编码对象
    //     })
    //     .catch(error => {
    //       this.$message({
    //         center: true,
    //         message: error,
    //         type: "error"
    //       });
    //     });
    // },
    search(cityName, parentId, id) {
      const _this = this;
      // _this.geocoder.getPoint(cityName, searchResult);

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
          // this.$bus.$emit('callFun')
          // _this.$router.push({path:`${sessionStorage.getItem('cacheRoute')}`})
        } else {
          _this.$message({
            center: true,
            message: "地理编码接口错误",
            type: "error"
          });
        }
      }
    },
    getSearchResults(params) {
      //搜索请求
      this.loading = true;
      this.imageSearch = false;
      console.log("搜索引擎请求的参数", params);
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      //搜索接口
      this.$axios.post(
        "/epf-landsearch/es/esLand/searchLand",
        qs.stringify(params),
        res => {
          console.log("搜索接口返回数据", res);
          if (res.code == "0" && res.results != []) {
            this.loading = false;
            this.matchData = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
          } else {
            this.loading = false;
            this.imageSearch = true;
          }
        }
      );
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
        cantonCity: "",
        cantonArea: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: "",
        price: "",
        viewsNum: "",
        status: "",
      };
      this.selected = {};
      this.searchInfo["search"] = this.searchText;
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
        query: {
          demand: id
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      window.scrollTo(0, 730);
      // console.log('页码:',this.searchInfo.page,'条数:',this.searchInfo.rows);
      this.getSearchResults(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      window.scrollTo(0, 730);
      // console.log('页码:',this.searchInfo.page,'条数:',this.searchInfo.rows);
      this.getSearchResults(this.searchInfo);
    },
    RightSkip(routerName) {
      this.$router.push({
        path: routerName,
        query: {
          disabledType: false
        }
      });
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
    //金额排序
    sortPrice() {
      this.searchInfo["page"] = 1;
      this.sortActive = "price";
      //清空已有排序值
      if (this.priceSort == null) {
        this.priceSort = false;
      } else {
        this.priceSort = !this.priceSort;
      }
      console.log(this.priceSort);
      this.searchInfo["sortField"] = "price";
      this.searchInfo["sortOrder"] = this.priceSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },
    sortClick() {
      this.searchInfo["page"] = 1;
      this.sortActive = "viewsNum";
      //清空已有排序值
      if (this.clickSort == null) {
        this.clickSort = false;
      } else {
        this.clickSort = !this.clickSort;
      }
      console.log(this.clickSort);
      this.searchInfo["sortField"] = "viewsNum";
      this.searchInfo["sortOrder"] = this.clickSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },
    //获取二级土地用途
    getsecondClassUse(i, e, landUseInfo) {
      this.isTwo = true;
      if (this.landUseInfo !== null) {
        this.filterSelect(
          this.landUseInfo.dictionariesEntities,
          "firstClassUse",
          e
        );
      }
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
    //获取使用年限
    getYears(e) {
      this.filterSelect(this.yearsUseInfo.dictionariesEntities, "years", e);
    },
    //获取土地类型
    getTyep(e) {
      this.filterSelect(this.landtypeInfo.dictionariesEntities, "landType", e);
    },
    //获取土地性质
    getChar(e) {
      this.filterSelect(
        this.landNatureInfo.dictionariesEntities,
        "landChar",
        e
      );
    },
    //获取属地认证
    getStatus(e) {
      this.filterSelect(
        this.statusInfo.dictionariesEntities,
        "status",
        e
      );
    },
    //展开收起
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? "auto" : "278px";
    }
  },
  mounted() {
    // setTimeout(this.getPosition(), 100); //自动执行
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
    //解决BUG1526
    let _this = this;
    setTimeout(function() {
      if (
        JSON.parse(localStorage.getItem("searchInfo")) &&
        JSON.parse(localStorage.getItem("searchInfo")).cantonProvince != ""
      ) {
        _this.search(
          JSON.parse(localStorage.getItem("selected")).cantonProvince,
          JSON.parse(localStorage.getItem("searchInfo")).cantonProvince,
          ""
        );
      }
    }, 500);
    this.$nextTick(() => {
      if (
        JSON.parse(localStorage.getItem("searchInfo")) &&
        JSON.parse(localStorage.getItem("searchInfo")).cantonProvince != ""
      ) {
        _this.search(
          JSON.parse(localStorage.getItem("selected")).cantonProvince,
          JSON.parse(localStorage.getItem("searchInfo")).cantonProvince,
          ""
        );
      }
    });
    this.$nextTick(() => {
      this.selected =
        JSON.parse(window.localStorage.getItem("selected")) || this.Resetdata;
      this.filterActive =
        JSON.parse(window.localStorage.getItem("filterActive")) ||
        this.Resetdata;
        if(this.filterActive.years == "0"){
          this.filterActive.years =""
        }
        if(this.filterActive.landType == "0"){
          this.filterActive.landType =""
        }
        if(this.filterActive.landChar == "0"){
          this.filterActive.landChar =""
        }
        if(this.filterActive.status == "0"){
          this.filterActive.status =""
        }
      this.searchInfo =
        JSON.parse(window.localStorage.getItem("searchInfo")) || this.Resetdata;
      this.searchText = this.searchInfo.search || "";
      this.getSearchResults(this.searchInfo);
      if (this.searchInfo["secondClassUse"]) {
        this.getsecondClassUse(this.searchInfo["firstClassUseId"]);
        this.isTwo = true;
        this.filterActive["secondClassUse"] = this.filterActive[
          "secondClassUse"
        ];
      }
    });
    if (this.regionInfo !== null) {
      let code = JSON.parse(sessionStorage.getItem("Address"));
      this.regionInfo.dictionariesList.map((e, index) => {
        if (code.cantonProvince == e.id) {
          this.filterActive["cantonProvince"] = index + 1;
          return index;
        }
      });
      this.filterSelectProvince(
        regionInfo.dictionariesList,
        "cantonProvince",
        this.filterActive["cantonProvince"]
      );
    }
  },
  created() {
    window.scrollTo(0, 120);
    this.getSearchDicRegion("0");
    this.getSearchLandUseInfo("land_use");
    this.getSearchflowModeInfo("flow_mode");
    this.getSearchPlotAreaInfo("plot_area");
    //获取使用年限
    this.$axios.get(
      "/epf-landweb/tsell/getSearchDic?code=years_use",
      {},
      res => {
        if (res.code == "0") {
          this.yearsUseInfo = res;
          let obj = {
            zhCn: "全部"
          };
          this.yearsUseInfo.dictionariesEntities.unshift(obj);
        }
      }
    );
    this.statusInfo.dictionariesEntities = [
      {dictKey: '', zhCn: '全部'},
      {dictKey: 'audit', zhCn: '未经属地认证'},
      {dictKey: 'published2', zhCn: '属地认证'}
    ]
    //获取土地类型
    this.$axios.get(
      "/epf-landweb/tsell/getSearchDic?code=land_type",
      {},
      res => {
        console.log(res);
        if (res.code == "0") {
          this.landtypeInfo = res;
          let obj = {
            zhCn: "全部"
          };
          this.landtypeInfo.dictionariesEntities.unshift(obj);
        }
      }
    );
    //获取土地性质
    this.$axios.get(
      "/epf-landweb/tsell/getSearchDic?code=land_nature",
      {},
      res => {
        if (res.code == "0") {
          this.landNatureInfo = res;
          let obj = {
            zhCn: "全部"
          };
          this.landNatureInfo.dictionariesEntities.unshift(obj);
        }
      }
    );
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    //收藏显示状态模拟
    if (!sessionStorage.getItem("login")) {
      this.collectionData = [];
      return;
    }
    if (localStorage.getItem("collectionData")) {
      this.collectionData = JSON.parse(localStorage.getItem("collectionData"));
    } else {
      localStorage.setItem("collectionData", JSON.stringify([]));
      this.collectionData = JSON.parse(localStorage.getItem("collectionData"));
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
  .tdzr_top {
    @include size(100%, auto);
    border-bottom: solid 1px #f3f3f3;
    .search_body {
      box-sizing: border-box;
      padding-top: 20px;
      padding-bottom: 20px;
      .input_text {
        @include size(552px, 44px);
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
      }
    }
  }
  .tdzr_table {
    clear: both;
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
          .filterActive {
            color: var(--lightColor);
            font-weight: bold;
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
      @include size(100%, auto);
      border-bottom: 2px solid #f3f3f3;
      box-sizing: border-box;
      padding: 24px 34px 24px 26px;
      cursor: pointer;
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
      .list_bot_active {
        display: inline-block;
        color: var(--Colors);
        font-size: 12px;
        background-color: #fef1e1;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        padding: 5px 15px;
        margin-bottom: 5px;
        margin-right: 10px;
      }

      .list_bot_active01 {
        color: var(--priceColor);
        background: #fff1f1;
        font-weight: bold;
      }

      .list_bot_active02 {
        color: #93b72e;
        background: #f1f8e1;
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

      .list_bot_active00 {
        color: var(--lightColor);
        background: #f2f5f7;
        font-weight: bold;
      }
      .list_bot_active06 {
        color: #e8748b;
        background: #fff1f1;
        font-weight: bold;
      }
      .list_bot_active05 {
        color: #7698b8;
        background: #f2f5f7;
        font-weight: bold;
      }
    }
  }
  .block {
    text-align: center;
    margin-bottom: 20px;
  }
}
.tdzr_right {
  // @include size(316px, auto);
  flex: 1;
  display: inline-block;
  margin-left: 20px;
  .tdzr_right_top {
    box-sizing: border-box;
    padding: 20px 20px 10px 20px;
    margin-bottom: 20px;
    background: #fff;
    .tdzr_right_list_pub {
      @include size(274px, 170px);
      margin-bottom: 20px;
      background-blend-mode: normal, normal;
      cursor: pointer;
      &1 {
        background-image: linear-gradient(-30deg, #6febcc 0%, #bff7e9 100%),
          linear-gradient(#000000, #000000);
        background: url("../../../../assets/image/icon-search03.jpg") no-repeat
          center center;
      }
      &2 {
        background-image: linear-gradient(-30deg, #ffe1a6 0%, #fdf7f2 100%),
          linear-gradient(#000000, #000000);
        background: url("../../../../assets/image/icon-search01.jpg") no-repeat
          center center;
      }
      &3 {
        background-image: linear-gradient(-30deg, #a6c7ff 0%, #f2fafd 100%),
          linear-gradient(#000000, #000000);
        background: url("../../../../assets/image/icon-search02.jpg") no-repeat
          center center;
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
}
.sortBox {
  cursor: pointer;
  transition: 0.2s;
}
.sortBox:hover {
  color: var(--lightColor);
}
.sortactive {
  color: var(--lightColor);
}
</style>
<style>
.tdzr h4 {
  color: #333;
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  margin-right: 15px;
}


.tdzr p {
  color: #999;
  font-size: 14px;
}

.tdzr p span {
  color: #666;
  font-size: 14px;
}

.list_right_cen {
  position: absolute;
  right: 0;
  top: 45%;
  color: var(--priceColor);
  font-size: 18px;
  font-weight: bold;
}


</style>
