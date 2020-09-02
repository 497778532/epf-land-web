<template>
  <div>
    <epf-lePage
      :location="location"
      style="background:#f2f1f9;padding:0"
    ></epf-lePage>
    <div class="win1200">
      <div class="search_warp">
        <div class="tdzr_top">
          <div class="search_body">
            <input
              style="margin-left:2px"
              type="text"
              placeholder="请输入关键字"
              class="input_text fl"
              v-model="searchText"
            />
            <div class="epf_btn epf_btn_bg searchS" @click="searchBtn">搜索</div>
            <div class="epf_btn epf_btn_def searchS fr" @click="agencypop()">委托交易</div>
            <div class="epf_btn epf_btn_def searchS fr" @click="signpop()">合同服务</div>
          </div>
        </div>
        <div class="tdzr_table"  :style="{ height: switchHeight, overflow: 'hidden' }">
          <table cellpadding="0" cellspacing="0">
            <tr style="border-top:1px solid #e6e6e6;">
              <!-- style="position:absolute;top:106p;height:150px" -->
              <td class="td1">
                行政区域
              </td>
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
                  <span>{{ item.regionName }}</span>
                </div>
              </td>
            </tr>
            <!--市级-->
            <tr v-if="cityShow">
              <td class="td1"></td>
              <td
                class="td3"
                v-if="cityDiect && cityDiect !== null"
                style="background-color: #f5f5f5;width:1053px;line-height:50px;"
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
                  :class="filterActive.firstClassUse == 0 ? 'filterActive' : ''"
                >
                  <span>不限</span>
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
                <div @click="filterSelect(flowModeInfo.dictionariesEntities,'businessType',-1)"
                  :class="filterActive.businessType == 0?'filterActive':''"
                ><span>不限</span></div>
                <div v-for="(item, index) in flowModeInfo.dictionariesEntities"
                  :class="filterActive.businessType == index + 1 ? 'filterActive' : '' "
                  @click="filterSelect(flowModeInfo.dictionariesEntities,'businessType',index) " :key="index"
                >
                  {{ item.zhCn }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td1">交易方式</td>
              <td class="td3" v-if="transType && transType !== null">
                <div @click="filterSelect(transType,'transType',-1)"
                  :class="filterActive.transType == 0 ? 'filterActive' : ''">不限
                </div>
                <div v-for="(item, index) in transType"
                  :class="filterActive.transType == index + 1 ? 'filterActive' : '' "
                  @click="filterSelect(transType,'transType',index) " :key="index"
                >
                  {{ item.name }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-algin:right">状态</td>
              <td class="td3">
                <div
                  @click="filterSelect(status, 'state', -1)"
                  :class="filterActive.state == 0 ? 'filterActive' : ''"
                >
                  不限
                </div>
                <div
                  v-for="(item, index) in status"
                  :class="filterActive.state == index + 1 ? 'filterActive' : ''"
                  @click="filterSelect(status, 'state', index)"
                  :key="index"
                >
                  {{ item.zhCn }}
                </div>
              </td>
            </tr>
            <tr>

              <td class="td1" v-if="myTransType == 'listing_mode'">
                挂牌开始时间
              </td>
              <td class="td1" v-else-if="myTransType == 'auction_mode'">
                拍卖开始时间
              </td>
              <td class="td1" v-else style="line-height:25px;">竞买申请开始时间</td>
              <td class="td3">
                <!-- <el-col
                  :span="1.1"
                  class="filterActive"
                  :class="
                    beginFocusTime == null && endFocusTime == null
                      ? 'filterActive'
                      : ''
                  "
                  ><span>不限</span></el-col
                > -->
                <el-col :span="8">
                  <el-date-picker
                    v-model="startDate"
                    style="width:360px"
                    type="daterange"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="selectDatarange"
                  ></el-date-picker>
                </el-col>
                <el-col
                  :span="1.1"
                  style="margin-left:30px;text-align:right;font-size:12px;font-weight: bold"
                  >其他</el-col
                 >
                <el-select
                  :span="7"
                  placeholder="使用年限"
                  v-if="yearsUseInfo && yearsUseInfo !== null"
                  v-model="filterActive.years"
                  @change="getYears($event)"
                 >
                  <el-option
                    v-for="(item, index) in yearsUseInfo.dictionariesEntities"
                    :key="index.id"
                    :label="item.zhCn"
                    :value="index"
                  ></el-option>
                </el-select>

                <el-select
                  :span="7"
                  placeholder="地块面积"
                  v-if="plotAreaInfo && plotAreaInfo !== null"
                  v-model="filterActive.area"
                  @change="getTyep($event)"
                >
                  <el-option
                    v-for="(item, index) in plotAreaInfo.dictionariesEntities"
                    :key="index.id"
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
              <p style="font-weight: bold;font-size:12px;color:#666">
                您已选择：
              </p>
              <p
                id="tdzr_xuanze"
                v-for="(val, key, index) in selected"
                @click="delSelect(key)"
                :key="index"
              >
                <span v-show="val" class="tdzr_span">{{ val }}</span>
              </p>
              <a href="javascript:void(0)" class="tdzr_del" @click="clearAll()"
                >全部删除</a
              >
            </div>
            <div class="clear" style="background-color: #eee;"></div>
          </div>
        </div>
<!-- 
        <div style="height: 1px;background-color: #eee;"></div> -->
        <div
          style="height: 40px;line-height: 40px;text-align: center;color:var(--lightColor)"
         >
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
              <span v-if="myTransType == 'listing_mode'">挂牌开始时间</span>
              <span v-else-if="myTransType == 'auction_mode'"
                >拍卖开始时间</span
              >
              <span v-else>竞买申请开始时间</span>
              <span>{{ this.timeSort ? "↑" : "↓" }}</span>
            </li>
          </ul>
          <div class="tdzr_list">
            <div class="serivemain_con">
              <ul class="serivemain_content">
                <li
                  v-for="(item, index) in serivemainData"
                  :key="index"
                  @click="openDetail(item.id, item.status)"
                >
                  <div class="serivemain_con_top">
                    <div class="serivemain_con_top_img">
                      <span v-for="(it, index) in item.canton" :key="index">
                        <img :src="baseUrl + it.img" v-if="it.img !== null" />
                        <img
                          src="../../../../assets/image/icon-nodata.png"
                          v-if="it.img === null"
                        />
                      </span>
                      <span
                        class="imgState dealing"
                        v-if="item.status === 'trans_status-003'"
                        >公告中</span
                      >
                      <span
                        class="imgState dealing"
                        v-if="item.status === 'trans_status-004'"
                        >交易中</span
                      >
                       <span
                        class="imgState dealing"
                        style="right:-6px;"
                        v-if="item.status === 'trans_status-005'"
                        >成交待审核</span
                      >
                      <span
                        class="imgState dealed"
                        v-if="item.status === 'trans_status-007'"
                        >已成交</span
                      >
                      <span
                        class="imgState no_deal"
                        v-if="item.status === 'trans_status-006'"
                        >未成交(流拍)</span
                      >
                      <span
                        class="imgState"
                        v-if="item.status === 'trans_status-008'"
                        >已公示</span
                      >
                    </div>
                    <div class="serivemain_con_top_right">
                      <!-- <div class="serivemainR_title">
                        <h4>标的编号：{{item.targetNo}}</h4>
                        <span class="serivemainR_title_active">{{item.businessTypeName}}</span>
                        <p>
                          地址：
                          <span
                            v-for="(it,index) in item.canton"
                            :key="index"
                          >{{it.cantonProvinceName}}/{{it.cantonCityName}}/{{it.cantonAreaName}}</span>
                          <span style="float: right;margin-right: 31%">
                            交易方式：
                            <span v-if="item.tarType == 'listing_mode'">网上交易（挂牌）</span>
                            <span v-else>网上交易（拍卖）</span>
                          </span>
                        </p>
                        <div class="trs_time" v-if="item.tarType == 'listing_mode'">
                          <div>
                            挂牌开始时间：
                            <span>{{item.beginFocusTime}}</span>
                          </div>
                          <div>
                            挂牌截止时间：
                            <span>{{item.endFocusTime}}</span>
                          </div>
                        </div>
                        <div class="trs_time" v-else>
                          <div>
                            竞买申请开始时间：
                            <span>{{item.beginApplyTime}}</span>
                          </div>
                          <div>
                            拍卖开始时间：
                            <span>{{item.beginLimitTime}}</span>
                          </div>
                        </div>
                        <div class="trs_time">
                          <div>
                            保证金截止时间：
                            <span>{{item.endEarnestTime}}</span>
                          </div>
                          <div>
                            保证金：
                            <span>{{item.amount}}</span>
                          </div>
                        </div>
                        <p>
                          起始价：
                          <span>{{item.beginPrice}}万元</span>
                        </p>
                      </div> -->
                      <div class="entrus_list_middle fl">
                        <h3>标的编号：<font v-html="item.targetNo"></font></h3>
                        <div class="method">
                          <span class="transfer">{{
                            item.businessTypeName
                          }}</span>
                          <!-- <span class="entrus"></span> -->
                          <!-- <span class="company"></span> -->
                          <p style="float: right;margin-right: 40%;padding-top:5px;">
                            交易方式：
                            <em v-if="item.transType == 'listing_mode'">网上交易（挂牌）</em>
                            <em v-else>网上交易（拍卖）</em>
                          </p>
                        </div>
                        <div class="price_add">

                          <div class="price_add_one fl">
                            <span>
                              <em>地址：</em>
                              <span
                                v-for="(it, index) in item.canton"
                                :key="index"
                                >{{ it.cantonProvinceName }}/{{
                                  it.cantonCityName
                                }}/{{ it.cantonAreaName }}</span
                              >
                            </span>
                            <b v-if="(item.status == 'trans_status-007' || item.status == 'trans_status-008') && (item.businessType == 'transfer' || item.businessType == 'rent')">
                              {{ item.ownerShip }}
                            </b>
                            <b v-else-if="item.transType == 'listing_mode'" style="color:var(--priceColor)">{{ item.beginFocusTime }}</b>
                            <b v-else>{{ item.beginApplyTime }}</b>
                            <i v-if="(item.status == 'trans_status-007' || item.status == 'trans_status-008') && item.businessType == 'transfer'">
                              转让方
                            </i>
                             <i v-else-if="(item.status == 'trans_status-007' || item.status == 'trans_status-008') && item.businessType == 'rent'">
                              出租方
                            </i>
                            <i v-else-if="item.transType == 'listing_mode'">挂牌开始时间</i>
                            <i v-else>竞买申请开始时间</i>
                          </div>


                           <img
                            v-if="
                              item.status == 'trans_status-007' ||
                                item.status === 'trans_status-008'
                            "
                            src="../../../../assets/image/entrusList_arrowhead.jpg"
                            alt
                          />
                           <img
                            v-else-if="
                              item.status == 'trans_status-003' ||
                                item.status === 'trans_status-004'
                            "
                            src="../../../../assets/image/grey_point.jpg"
                            alt=""
                          />

                           <div class="price_add_two fl">
                            <span>
                              <em v-if="item.status == 'trans_status-007' || item.status == 'trans_status-008'"
                                >成交价：</em
                              >
                              <em v-else>起始价：</em>
                              <strong
                                v-if="item.status == 'trans_status-008' ||item.status === 'trans_status-007'" class="active"
                                >{{ item.transPrice }}万元</strong
                              >
                              <strong v-else>{{ item.beginPrice }}万元</strong>
                            </span>
                            <b  v-if="(item.status == 'trans_status-007' || item.status == 'trans_status-008') && (item.businessType == 'transfer' || item.businessType == 'rent')">
                              {{ item.winnerId }}
                            </b>
                            <b v-else>
                              <em v-if="item.transType == 'listing_mode'" style="color:var(--priceColor)">{{ item.endFocusTime }}</em>
                              <em v-else>{{ item.beginLimitTime }}</em>
                            </b>
                            <i v-if="(item.status == 'trans_status-007' || item.status == 'trans_status-008') && item.businessType == 'transfer'">
                              受让方
                            </i>
                             <i v-else-if="(item.status == 'trans_status-007' || item.status == 'trans_status-008') && item.businessType == 'rent'">
                              承租方
                            </i>
                            <i v-else>
                              <em v-if="item.transType == 'listing_mode'">挂牌截止时间</em>
                              <em v-else>拍卖开始时间</em>
                            </i>
                          </div>
                          <div class="column fl"></div>



                          <div class="price_add_three fl">
                            <span  v-if="item.status !== 'trans_status-007' && item.status !== 'trans_status-008'">
                              <em>保证金：</em>
                              <strong>{{ item.amount }}</strong>
                            </span>
                            <b v-if="item.status !== 'trans_status-007' && item.status !== 'trans_status-008'"
                              >{{ item.endEarnestTime }}</b
                            >
                            <b class="active_bottom" v-if="item.status == 'trans_status-007' || item.status == 'trans_status-008'">
                              {{ item.endTransTime }}</b>
                            <i v-if="item.status !== 'trans_status-007' && item.status !== 'trans_status-008'"
                              >保证金截止时间</i
                            >
                             <i v-if="item.status == 'trans_status-007' || item.status == 'trans_status-008'"
                              >成交时间</i
                            >
                          </div>
                        </div>
                      </div>

                      <div class="serivemainR_deta">
                        <span
                          v-if="
                            item.status === 'trans_status-003' ||
                            item.status === 'trans_status-007' ||
                            item.status === 'trans_status-006' ||
                            item.status === 'trans_status-008' ||
                            item.status === 'trans_status-005'
                          "
                          @click="
                            viewDeail(item.id, item.status, item.imgStateKey)
                          "
                          >查看详情</span
                        >

                        <div v-if="item.status === 'trans_status-004'">
                          <span @click.stop="bidApplicate(item)">申请竞买</span>
                          <span @click.stop="centerPrice(item)" class="subState"
                            >我要报价</span
                          >
                        </div>
                      </div>
                    </div>
                    <div style="clear: both;"></div>
                  </div>
                </li>
              </ul>
              <div
                v-if="serivemainData == [] || serivemainData == ''"
                style="text-align:center;"
              >
                <img
                  style="margin-top:10px;margin-bottom:10px;height:190px;"
                  src="../../../../assets/image/dataNone.png"
                />
              </div>
            </div>
          </div>
          <div class="block">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5, 10, 15, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
            ></el-pagination>
            <div class="pagS"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isApply: false,
      beginFocusTimeStart:'',
      beginFocusTimeEnd:'',
      startDate:'',
      location: [
        { path: "/", name: "首页" },
        { path: null, name: "交易信息列表" }
      ],
      endEarnestTime: "",
      amount: "",
      flexibleOpen: false,
      switchHeight: "278px",
      ownerShip: "",
      endApplyTime: "",
      beginLimitTime: "",
      endNoticeTime: "",
      endTransTime: "",
      beginNoticeTime: "",
      beginFocusTime: "",
      transType: "",
      beginPrice: null,
      winnerId: null,
      beginApplyTime: "",
      endFocusTime: "",
      targetNo: "",
      transPrice: "",
      transTypeName: "",
      baseUrl: "",
      searchText: "",
      filterActive: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        firstClassUse: 0,
        secondClassUse: "",
        state: 0,
        businessType: 0,
        transType:0,
        area: "",
        years: "",
        beginFocusTimeStart:'',
        beginFocusTimeEnd:'',
      },
      selected: {},
      searchInfo: {
        page: 1,
        rows: 10
      },
      serivemainData: [],
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      //排序激活
      sortActive: "default",
      //排序切换
      timeSort: null,
      status: [
        { zhCn: "公告中", dictKey: "trans_status-003" },
        { zhCn: "交易中", dictKey: "trans_status-004" },
        { zhCn: "已成交", dictKey: "trans_status-007" },
        { zhCn: "未成交(流拍)", dictKey: "trans_status-006" },
        { zhCn: "已公示", dictKey: "trans_status-008" }
      ],
      myTransType: "", //所选择的交易方式
      transTypeList: [], //交易方式缓存集合
      cityDiect: [],
      areaDiect: [],
      twoUser: [],
      cityShow: false,
      areaShow: false,
      isTwo: false
    };
  },
  computed: {
    ...mapState("index", [
      "regionInfo",
      "flowModeInfo",
      "plotAreaInfo",
      "yearsUseInfo",
      "landtypeInfo",
      "landNatureInfo",
      "landUseInfo"
    ])
    // ...mapState("containerStore", ["landUseInfo"])
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchflowModeInfo",
      "getSearchPlotAreaInfo",
      "getSearchYearsUseInfo",
      "getSearchLandtypeInfo",
      "getSearchlandNatureInfo",
      "getSearchLandUseInfo"
    ]),
    ...mapActions("homeland", ["open"]),
    isLogin() {
      if (!sessionStorage.getItem("login")) {
        this.$message({
          message: "您还未登录，请先登录",
          type: "warning"
        });
        this.collectionData = [];
        return false;
      }
      return true;
    },
    //			展开收起
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? "auto" : "278px";
    },
    // 查看详情
    viewDeail(id, status) {
      if (!this.isLogin()) {
        return;
      }
      let routeUrl = this.$router.resolve({
        path: "/TradingDetails",
        query: { id: id, selectedTraState: status }
      });
      window.open(routeUrl.href, "_blank");
    },
    //市
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
    selectDatarange() {
      // myTransType == 'listing_mode'---挂牌开始时间
      // myTransType == 'auction_mode'----竞买申请开始时间
      // if(this.myTransType == 'listing_mode'){//挂牌开始时间
      //   this.beginFocusTimeStart = this.beginFocusTimeStart!=null?this.startDate[0]:'';
      //   this.beginFocusTimeEnd = this.beginFocusTimeEnd!=null?this.startDate[1]:'';
      //   this.beginApplyTimeStart = ''
      //   this.beginApplyTimeEnd = ''
      // }else if(this.myTransType == 'listing_mode'){

      // }
      //选择日期范围后的回调
      // this.selected['noticeTime'] = '';
      // this.searchInfo['noticeTime'] = '';
      // this.filterActive['noticeTime'] = -2;
      this.beginFocusTimeStart = this.startDate!=null?this.startDate[0]:'';
      this.beginFocusTimeEnd = this.startDate!=null?this.startDate[1]:'';
      this.searchInfo.beginFocusTimeStart = this.beginFocusTimeStart
      this.searchInfo.beginFocusTimeEnd = this.beginFocusTimeEnd
      console.log("=======",this.searchInfo)
      this.selected['beginFocusTimeStart'] = this.startDate!=null?this.startDate[0]:'';
      this.selected['beginFocusTimeEnd '] = this.startDate!=null?this.startDate[1]:'';
      this.getSearchResults(this.searchInfo);
      // this.filterSelect(flowModeInfo.dictionariesEntities,'beginFocusTime',-1)
      // this.selected['beginFocusTime'] = this.beginFocusTime
      // this.selected['endFocusTime'] = this.endFocusTime

      // if(this.beginFocusTime == null){
      //   this.filterActive['noticeTime'] = -1;
      // }
      // this.getSearchNotice()
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
      if (index === -1) {
        this.filterActive[name] = 0;
        this.selected[name] = null;
        this.searchInfo[name] = null;
        // this.getSearchResults(this.searchInfo);
        this.searchBtn();
        this.myTransType=null
        //改bug931
        this.circulationType = "使用";
        return;
      }
      if (name == "transType") {
        this.transType = this.transTypeList[0];
        //trans_type   获取交易方式
        this.filterActive[name] = index + 1;
        this.selected[name] = data[index].name;
        this.searchInfo[name] = data[index].id;

        //设置所选择的交易方式
        this.myTransType = data[index].mark;
        //设置通过哪种方式查询
        this.searchInfo["myTransType"] = this.myTransType;

        this.getSearchResults(this.searchInfo);
      }
      //判断添加样式
      if (name == "years" || name == "landType" || name == "landChar" || name=="area") {
        console.log("不添加");
      } else {
        this.filterActive[name] = index + 1;
      }
      if ( name == "cantonCity" || name == "cantonProvince" || name == "cantonArea" ) {
        this.selected[name] = data[index].regionName;
        this.searchInfo[name] = data[index].regionCode;
      } else {
        this.selected[name] = data[index].zhCn;
        this.searchInfo[name] = data[index].dictKey;
      }
      this.circulationType = this.selected.circulation;
      // this.getSearchResults(this.searchInfo);
      this.searchBtn();
      //改bug931
      if (name == "circulation") {
        this.circulationType = data[index].zhCn;
        console.log(this.circulationType, "///////////");
      }
      if(name == "transType"){
        this.selected[name] = data[index].name;
      }
    },
    //			获取二级土地用途
    getsecondClassUse(i, e) {
      this.isTwo = true;
      this.filterSelect(
        this.landUseInfo.dictionariesEntities,
        "firstClassUse",
        e
      );
      this.$axios.get(
        "/epf-admin/dictionaries/getDictsByCodeOrParentId",
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
    },
    getSearchResults(params) {
      //搜索接口
      this.$axios.get(
        "/epf-landsearch/es/esLand/advancedQueryEntrustedList",
        params,
        res => {
          console.log("搜索结果1111111111", res);
          let resul = res.pager.results;
          //交易方式
          // let transType = this.transTypeList[0];
          //设置交易方式标识
          // if (resul && resul.length > 0) {
          //   for (let i = 0; i < resul.length; i++) {
          //     for (let j = 0; j < transType.length; j++) {
          //       let tar = transType[j].id;
          //       if (resul[i].transType == tar) {
          //         resul[i]["tarType"] = transType[j].mark;
          //       }
          //     }
          //   }
          // }
          //设置处理后的结果集
          this.serivemainData = resul;

          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          //还原vuex中搜索相关条件
          // this.transType = this.transTypeList[0];
        }
      );
      // this.getPopular(params);
    },
    searchBtn() {
      this.searchInfo["search"] = this.searchText;
      this.getSearchResults(this.searchInfo);
    },

    getYears(e) {
      this.filterSelect(this.yearsUseInfo.dictionariesEntities, "years", e);
    },
    //获取地块面积
    getTyep(e) {
      console.log(e);
      this.filterSelect(this.plotAreaInfo.dictionariesEntities, "area", e);
    },
    clearAll() {
      this.searchInfo = {};
      this.cityShow = false;
      this.areaShow = false;
      this.isTwo = false;
      let params = {};
      this.transType = this.transTypeList[0];
      this.filterActive.transType = -1;
      this.beginFocusTime = "";
      this.endFocusTime = "";
      this.myTransType = "";
      this.selected = {};
      this.startDate = "";
      this.filterActive = {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        // canton: "",
        firstClassUse: 0,
        secondClassUse: "",
        state: 0,
        businessType: 0,
        area: "",
        years: "",
        beginFocusTimeStart: "",
        beginFocusTimeEnd: "",
        transType: 0
      };
      this.searchInfo["search"] = this.searchText;

      this.getSearchResults(this.searchInfo);
    },
    delSelect(key) {
      if (key == "transType") {
        this.myTransType = "";
        this.filterActive.transType = -1;
      }
      if(key == "beginFocusTimeEnd" || "beginFocusTimeStart"){
        this.startDate =  ""
        this.selected['beginFocusTimeEnd'] = ""
        this.selected['beginFocusTimeStart'] = ""
      }
      (this.selected[key] = null),
        (this.filterActive[key] = 0),
        (this.searchInfo[key] = null),
        this.getSearchResults(this.searchInfo);
    },
    openDetail(id, status) {
      let routeUrl = this.$router.resolve({
        path: "/TradingDetails",
        query: { id: id, selectedTraState: status }
      });
      window.open(routeUrl.href, "_blank");
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.pageSize = val;
      window.scrollTo(0, 730);
      this.getSearchResults(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.pageNo = val;
      this.searchInfo["rows"] = this.pageSize;
      window.scrollTo(0, 730);
      this.getSearchResults(this.searchInfo);
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
      this.searchInfo["sortField"] = "beginFocusTime";
      this.searchInfo["sortOrder"] = this.timeSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },
    // 委托交易
    agencypop() {
      this.open("entrustTransInfo");
      // this.$router.push("/");
      this.$router.push({ path: "/", query: { transaction: "1" } });
    },
    // 合同网签备案
    signpop() {
      this.open("SignRecordInfo");
      // this.$router.push("/");
      this.$router.push({ path: "/", query: { showcontact: "1" } });
    },
    // 申请竞买
    bidApplicate(row) {
      if (!this.isLogin()) {
        return;
      }
      this.$axios.get(
      "/epf-landweb/admin/getTargetDetailsVo?targetId=" + row.id,{},
        res => {
        if (res.code == 0) {
          debugger
            // 当前登录用户是否已经申请竞买过
          this.isApply = res.dataJson.isApply;
          debugger
          // 判断是否已经购买过该标的
          if (this.isApply) {
            //新增判断是否开通竞价资格
            this.$axios.get(
              "/epf-landweb/admin/getLicenseByTargetId?targetId=" +
              row.id,
              {},
              res => {
                if (res.code === 0) {
                  if (res.license.status != "license_status-008" ) {
                    //未开通竞价资格
                    this.$message.error(
                      "您已申请竞买该标的，请到个人中心-我的订单查看申请进度"
                    );
                    return;
                  } else {
                    //已开通竞价资格
                    this.$message.error(
                      "您已开通竞买资格，可以直接进行报价"
                    );
                    return;
                  }
                }
              }
            );
          }else{
               //解析地块新增的用户信息
            let userId = localStorage.getItem("userId");
            let isFlag = false;
            // 判断地块是不是自己的，自己不能竞买自己的地块
            for (let i = 0; i < res.dataJson.transGoodsEntities.length; i++) {
              if (res.dataJson.transGoodsEntities[i].insertUser == userId) {
                isFlag = true;
                break;
              }
            }
            if (isFlag) {
              this.$message.error("您不能申请自己委托的地块！");
              return;
            }
            this.toapplyBiddingBook(row);
          }
          }
        }
      );
    },
    //封装跳转竞买页面的代码
    toapplyBiddingBook(row){
      let now = new Date(); // 当前时间
      let applyTime = new Date(row.beginApplyTime); //竞买申请开始时间
      let endApplyTime = new Date(row.endApplyTime); //竞买申请截止时间
      console.log("now", now.getTime());
      console.log("applyTime", applyTime.getTime());
      console.log("endApplyTime", endApplyTime.getTime());
      if (now.getTime() < applyTime.getTime()) {
        this.$message.error("还未到申请竞买申请开始时间，不能申请竞买！");
        return;
      } else if (now.getTime() > endApplyTime.getTime()) {
        this.$message.error("超出申请竞买截至时间，不能申请竞买！");
        return;
      }

      this.$router.push({
        path: "/applyBiddingBook",
        query: { id: row.id, type: "3" }
      });
    },
    // 参与竟价
    centerPrice(row) {
      if (!this.isLogin()) {
        return;
      }
      let beginFocusTime = new Date(row.beginFocusTime);
      let now = new Date();
      console.log("now", now.getTime());
      console.log("beginFocusTime", beginFocusTime.getTime());
      if (now.getTime() < beginFocusTime.getTime()) {
        this.$message.error("还未到挂牌开始时间，不能出价！");
        return;
      } else {
        this.$axios.get(
          "/epf-landweb/admin/getLicenseByTargetId?targetId=" +
            row.id,
          {},
          res => {
            if (res.code === 0) {
              if (res.license.status !== "license_status-008" ) {
                this.$message.error(
                  "您未开通竞价资格，请申请竞买完成后进行报价！"
                );
                return;
              } else {
                this.$router.push({
                  path: "/centerPrice",
                  query: { userId: res.userId, targetId: row.id }
                });
              }
            }
          }
        );
      }
    }
  },
  mounted() {
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
				if(JSON.parse(localStorage.getItem("searchInfo")) && (JSON.parse(localStorage.getItem("searchInfo"))).cantonProvince != '') {
					_this.search((JSON.parse(localStorage.getItem("selected"))).cantonProvince, (JSON.parse(localStorage.getItem("searchInfo"))).cantonProvince, '')
				}
			}, 500)
			this.$nextTick(()=>{
				if(JSON.parse(localStorage.getItem("searchInfo")) && (JSON.parse(localStorage.getItem("searchInfo"))).cantonProvince != '') {
					_this.search((JSON.parse(localStorage.getItem("selected"))).cantonProvince, (JSON.parse(localStorage.getItem("searchInfo"))).cantonProvince, '')
				}
			})
			this.$nextTick(()=>{
				this.selected = JSON.parse(window.localStorage.getItem("selected")) || {
					cantonProvince: "",
					firstClassUse: "",
					secondClassUse:'',
					circulation: "",
					area: "",
					years: "",
					landType: "",
					landChar: "",
          state: "",
          businessType: "",
          beginFocusTimeStart: "",
          beginFocusTimeEnd: "",
          transType:""
				};
				this.filterActive = JSON.parse(window.localStorage.getItem("filterActive")) || {
					cantonProvince: "",
					firstClassUse: 0,
					secondClassUse:"",
					circulation: "",
					area: "",
					years: "",
					landType: "",
					landChar: "",
          state: 0,
          businessType: 0,
          beginFocusTimeStart: "",
          beginFocusTimeEnd: "",
          transType:0
        };
        this.filterActive.firstClassUse = this.filterActive.firstClassUse?this.filterActive.firstClassUse:0
        this.filterActive.state = this.filterActive.state?this.filterActive.state:0
        this.filterActive.businessType = this.filterActive.businessType?this.filterActive.businessType:0
        this.filterActive.transType = this.filterActive.transType?this.filterActive.transType:0
				this.searchInfo = JSON.parse(window.localStorage.getItem("searchInfo")) || {
					cantonProvince: "",
					firstClassUse: "",
					secondClassUse:'',
					circulation: "",
					area: "",
					years: "",
					landType: "",
          landChar: "",
          state: "",
          businessType: "",
          beginFocusTimeStart: "",
          beginFocusTimeEnd: "",
          transType:""
				};
				this.searchText = this.searchInfo.search || "";
				this.getSearchResults(this.searchInfo);
			}) 
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
    this.getSearchYearsUseInfo("years_use");
    this.getSearchLandtypeInfo("land_type");
    this.getSearchlandNatureInfo("land_nature");
    this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let params = {};
    this.$axios.get(
      "/epf-tradeengine/transtransactiontype/getTransTypeList",//trans_type   获取交易方式
      {},
      res => {
        this.transType = res;
        this.transTypeList.push(res);
        //查询数据
        this.getSearchResults(this.searchInfo);
      }
    );
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
#location {
  padding: 0;
}
.tdzr_top {
  padding-bottom: 20px;
}
.search_body {
  box-sizing: border-box;
}
.input_text {
  width: 546px;
  height: 44px;
  background-color: #f1f5f8;
  border-radius: 3px;
  box-sizing: border-box;
  padding-left: 17px;
  color: #999999;
  font-size: 14px;
}
.searchS{
  @include size(132px, 44px);
  line-height: 44px;
  font-size: 16px;
}
.search_warp {
  @include size(100%, auto);
  margin:0 auto;
  background:#fff;
  padding: 21px 27px 0 19px;
  box-sizing: border-box;
  .tdzr_table {
    clear: both;
    table {
      tr {
        border-bottom: 1px solid #e6e6e6;
        td {
          color: #555555;
          line-height: 50px;
          font-size: 14px;
          // border-bottom: 1px solid #e6e6e6;
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
          width: 78px;
          color: #666;
          font-weight: bold;
          &:nth-last-child(1) {
            width: 96px;
          }
        }
        .td2 {
          width: 55px;
          color: var(--lightColor);
          font-size: 14px;
          text-align: center;
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
      .tdzr_del {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        padding: 0 10px 0 30px;
        color: var(--lightColor);
        display: inline-block;
        margin: 0 10px 0 3px;
        border: none;
        background: url("../../../../assets/image/land_02.png") left no-repeat;
      }
    }
  }
}
.landmain {
  @include size(1200px, auto);
  padding-bottom: 35px;
  margin-top:20px;
  .tdzr_main {
    @include size(100%, auto);
    clear: both;
    .tdzr_left {
      @include size(100%, auto);
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
        .serivemain_con {
          @include size(1200px, auto);
          margin: 0 auto;
          background: #fff;
          overflow: hidden;
          .serivemain_content {
            li {
              // @include size(100%, 251px);
              @include size(100%, 213px);
              box-sizing: border-box;
              padding: 20px 0 0;
              border-bottom: solid 2px #eeeeee;
              cursor: pointer;
              .serivemain_con_top {
                clear: both;
                &_img {
                  @include size(248px, 169px);
                  float: left;
                  position: relative;
                  img {
                    display: block;
                    @include size(100%, 100%);
                  }
                  .imgState {
                    background: var(--lightColor);
                    padding: 10px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: 12px;
                    line-height: 16px;
                    color: #ffffff;
                    margin-top: -3px;
                    background: url("../../../../assets/image/icon_landstate.png")
                      no-repeat left center;
                  }
                  .no_deal,
                  .dealing,
                  .dealed {
                    margin-top: -11px;
                    color: #fff;
                    font-size: 12px;
                    line-height: 30px;
                    height: 40px;
                    text-align: center;
                    background: url("../../../../assets/image/no_deal.png")
                      no-repeat;
                  }
                  .dealing {
                    background: url("../../../../assets/image/dealing.png")
                      no-repeat;

                  }
                  .dealed {
                    background: url("../../../../assets/image/dealedd.png")
                      no-repeat;
                  }
                }
                &_right {
                  @include size(auto, auto);
                  float: left;
                  box-sizing: border-box;
                  padding: 0 0 0 30px;
                  position: relative;
                  .column {
                    // position: absolute;
                    // top: 120px;
                    // right: 265px;
                    margin-top:62px;
                    height: 40px;
                    width: 3px;
                    background: #eaeaea;
                  }
                  .serivemainR_title {
                    @include size(100%, 154px);
                    float: left;
                    box-sizing: border-box;
                    background: #fff;
                    line-height: 30px;
                    h4 {
                      font-size: 18px;
                      line-height: 38px;
                      font-weight: bold;
                      color: #333;
                      margin-bottom: 5px;
                      cursor: pointer;
                    }
                    h4:hover {
                      color: var(--lightColor);
                    }
                    // .serivemainR_title_active {
                    //   color: var(--Colors);
                    //   font-size: 14px;
                    //   padding: 6px 12px;
                    //   margin-right: 10px;
                    //   line-height: 40px;
                    //   border-radius: 0px 5px 0px 5px;
                    //   background: #fef1e1;
                    //   // border: solid 1px var(--Colors);
                    // }
                    // .serivemainR_title_active01 {
                    //   color: var(--Colors);
                    //   border: solid 1px #f99c0d;
                    //   font-size: 14px;
                    //   padding: 5px 10px;
                    //   margin-right: 10px;
                    //   line-height: 40px;
                    //   border-radius: 0px 8px 0px 8px;
                    //   background: #fff;
                    // }
                    // .serivemainR_title_active02 {
                    //   color: #4875cf;
                    //   border: solid 1px #4875cf;
                    //   font-size: 14px;
                    //   padding: 5px 10px;
                    //   margin-right: 10px;
                    //   line-height: 40px;
                    //   border-radius: 0px 8px 0px 8px;
                    //   background: #fff;
                    // }
                    // .trs_time {
                    //   div {
                    //     display: inline-block;
                    //     width: 350px;
                    //     color: #999999;
                    //     span {
                    //       color: #666666;
                    //     }
                    //   }
                    // }
                    p {
                      color: #999999;
                      font-size: 12px;
                      span {
                        color: #666666;
                      }
                    }
                  }
                  .serivemainR_deta {
                    position: absolute;
                    right: -130px;
                    top: 81px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    cursor: pointer;
                    span {
                      width: 80px;
                      height: 36px;
                      display: block;
                      background-color: var(--lightColor);
                      color: #fff;
                      margin-bottom: 14px;
                      border: solid 1px var(--lightColor);
                      border-radius: 2px;
                    }
                    .subState {
                      background: #fff;
                      color: var(--lightColor);
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
          .block {
            margin: 20px;
            float: right;
            ul {
              li {
                border: solid 1px #e0dfdf;
                border-radius: 3px;
                text-align: center;
                line-height: 28px;
                font-size: 12px;
                display: inline-block;
                margin-right: 5px;
                cursor: pointer;
                padding: 0 10px;
              }
              span {
                margin-right: 8px;
              }
              input {
                @include size(35px, 28px);
                border: solid 1px #e0dfdf;
                text-align: center;
                line-height: 28px;
                margin-right: 8px;
                border-radius: 3px;
              }
              .liActive {
                background-color: var(--lightColor);
                border: none;
                color: #fff;
              }
            }
          }
        }
        // .tdzr{
        //   @include size(100%,220px);
        //   border-bottom: 2px solid #f3f3f3;
        //   box-sizing: border-box;
        //   padding:20px 40px 20px 24px;
        //   cursor: pointer;
        //   .list_img{
        //     width: 265px;
        //     height: 179px;
        //     float: left;
        //     position: relative;
        //     .tdzr_right_img{
        //       width:100%;
        //       height:100%;
        //     }
        //     .collect{
        //       @include size(28px,28px);
        //       background: rgba(255,255,255,0.5);
        //       border-radius: 50%;
        //       position: absolute;
        //       right:8px;
        //       top:8px;
        //       display: flex;
        //       justify-content: center;
        //       align-items: center;
        //     }
        //   }
        //   .list_right{
        //     width: 500px;
        //     height: 179px;
        //     margin-left: 20px;
        //     float: left;
        //     position: relative;
        //     h4 {
        //       line-height: 34px;
        //       color: #333;
        //       font-size: 16px;
        //       font-weight: bold;
        //     }
        //     .list_bot_active{
        //       display: inline-block;
        //       color: var(--Colors);
        //       font-size: 14px;
        //       background-color: #FEF1E1;
        //       border-top-right-radius: 8px;
        //       border-bottom-left-radius: 8px;
        //       padding: 5px 15px;
        //       margin-bottom:5px;
        //       margin-right: 10px;
        //     }
        //     .list_bot_active01{
        //       color: var(--Colors);
        //       background: #fef1e1;
        //     }
        //     .list_bot_active02{
        //       color: #93b52d;
        //       background: #ecf7c9;
        //     }
        //     .list_bot_active03{
        //       color: #4875cf;
        //       background: #e1effe;
        //     }
        //     .list_bot_active04{
        //       color: var(--Colors);
        //       background: #fff;
        //       border: solid 1px #f99c0d;
        //     }
        //     .list_bot_active05{
        //       color: #4875cf;
        //       background: #fff;
        //       border: solid 1px #4875cf;
        //     }
        //     p{
        //       line-height: 28px;
        //       color: #999999;
        //       font-size: 14px;
        //       span{
        //         color:#666;
        //       }
        //     }
        //     .list_right_cen{
        //       position: absolute;
        //       right:0;
        //       top:45%;
        //       color: var(--Colors);
        //       font-size: 18px;
        //     }
        //   }
        // }
      }
      .block {
        width: 85%;
        margin: 10px auto 20px;
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
  .entrus_list_middle {
    h3 {
      font-size: 18px;
      line-height: 38px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    .method {
      span {
        display: inline-block;
        border-radius: 0 10px 0 10px;
        font-size: 11px;
        -webkit-text-size-adjust: none;
        margin-right: 10px;
        font-weight: bold;
      }
      .transfer {
        background: #fdf5ec;
        padding: 5px 14px 4px 11px;
        color: var(--priceColor);
      }
      .entrus {
        background: #f2f5f7;
        padding: 5px 9px 4px 11px;
        color: #7698b8;
      }
      .company {
        background: #f2f5f7;
        padding: 5px 10px 4px;
        color: #7698b8;
      }
    }

    .price_add {
      position: relative;
      span {
        display: block;
        color: #666666;
        font-size: 13px;
        line-height: 62px;
        em {
          font-size: 12px;
          font-style: normal;
          color: #999999;
        }
        span {
          display: inline-block;
        }
      }
      b {
        display: block;
        color: #666666;
        font-size: 14px;
        line-height: 14px;
      }
      i {
        display: block;
        color: #999999;
        font-size: 12px;
        line-height: 12px;
        margin-top: 12px;
      }
      img {
        position: absolute;
        top: 63px;
        left: 180px;
      }
      .price_add_one {
        width: 280px;
      }
      .price_add_two {
        width:210px;
        strong{
          color:var(--priceColor)
        }
      }
      .price_add_three {
        width:240px;
        margin-left: 40px;
      }
    }
  }
  .fl {
    float: left;
  }
  .active {
    color: var(--lightColor);
  }
  .active_bottom {
    margin-top: 60px;
  }
}
</style>
<style>
/* .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
    left:100px;
  } */
.el-input__prefix {
  left: 25px;
}
.search_warp
  .tdzr_table
  table
  tr
  td
  div[data-v-d6df3a2a]:hover
  .el-input__inner {
  background: #fab510;
}
.tdzr_table .el-date-editor .el-range-input, .el-date-editor .el-range-separator{
  height: auto;
}
</style>
