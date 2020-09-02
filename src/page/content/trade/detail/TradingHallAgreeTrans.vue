<template>
  <div>
    <epf-lePage :location="location"  style="background:#f2f1f9;padding:0"></epf-lePage>
    <div class="search_warp">
      <div class="win1200" style="background:#fff;padding:21px 24px 0;box-sizing: border-box;">
        <div class="tdzr_top">
          <div class="search_body">
            <input
              type="text"
              placeholder="请输入土地位置土地用途土地面积等相关信息"
              class="input_text fl"
              v-model="searchText"
            />
            <div class="epf_btn epf_btn_bg searchS" @click="searchBtn">搜索</div>
            <!-- <div class="epf_btn epf_btn_def searchS" @click="agencypop()">自行交易</div> -->
            <div class="epf_btn epf_btn_def searchS fr" @click="signpop()">合同服务</div>
          </div>
        </div>
        <div class="tdzr_table" :style="{'height':switchHeight,'overflow':'hidden'}">
          <table cellpadding="0" cellspacing="0">
            <tr style="border-top:1px solid #e6e6e6;">
              <td class="td1">行政区域</td>
              <td class="td3" v-if="regionInfo&&regionInfo!==null" style="line-height:34px;padding:10px 0">
                <div
                  class="tddiv"
                  @click="filterSelectProvince(regionInfo.dictionariesList,'cantonProvince',-1)"
                  :class="filterActive.cantonProvince == 0?'filterActive':''"
                >
                  <span>不限</span>
                </div>
                <div
                  class="tddiv"
                  :class="filterActive.cantonProvince == index+1?'filterActive':''"
                  v-for="(item,index) in regionInfo.dictionariesList"
                  @click="filterSelectProvince(regionInfo.dictionariesList,'cantonProvince',index,true)"
                  :key="index"
                >
                  <span>{{item.regionName}}</span>
                </div>
              </td>
            </tr>
            <!-- 市级 -->
            <tr v-if="cityShow">
              <td class="td1"></td>
              <td class="td3" v-if="cityDiect&&cityDiect!==null" style="background-color: #f5f5f5;">
                <div
                  class="tddiv"
                  :class="filterActive.cantonCity == 0?'filterActive':''"
                  @click="filterSelectCity(cityDiect,'cantonCity',-1)"
                >全部</div>
                <div
                  class="tddiv"
                  v-for="(item,index) in cityDiect"
                  :class="filterActive.cantonCity == index+1?'filterActive':''"
                  @click="filterSelectCity(cityDiect,'cantonCity',index,true)"
                  :key="index"
                >{{item.regionName}}</div>
              </td>
            </tr>
            <!-- 县级 -->
            <tr v-if="areaShow">
              <td class="td1"></td>
              <td class="td3" v-if="areaDiect&&areaDiect!==null" style="background-color: #f5f5f5;">
                <div
                  class="tddiv"
                  @click="filterSelect(areaDiect,'cantonArea',-1)"
                  :class="filterActive.cantonArea == 0?'filterActive':''"
                >全部</div>
                <div
                  class="tddiv"
                  v-for="(item,index) in areaDiect"
                  :class="filterActive.cantonArea == index+1?'filterActive':''"
                  @click="filterSelect(areaDiect,'cantonArea',index,true)"
                  :key="index"
                >{{item.regionName}}</div>
              </td>
            </tr>

            <tr>
              <td class="td1">土地用途</td>
              <td class="td3" v-if="landUseInfo&&landUseInfo!==null">
                <div
                  class="tddiv"
                  @click="filterSelect(landUseInfo.dictionariesEntities,'firstClassUse',-1)"
                  :class="filterActive.firstClassUse == 0?'filterActive':''"
                ><span>不限</span></div>
                <div
                  class="tddiv"
                  v-for="(item,index) in landUseInfo.dictionariesEntities"
                  :class="filterActive.firstClassUse == index+1?'filterActive':''"
                  @click="getsecondClassUse(item.id,index)"
                  :key="index"
                >{{item.zhCn}}</div>
              </td>
            </tr>
            <tr v-if="isTwo">
              <td class="td1"></td>
              <td class="td3" style="background-color: #f5f5f5;">
                <div
                  class="tddiv"
                  @click="filterSelect(twoUser,'secondClassUse',-1)"
                  :class="filterActive.secondClassUse == 0?'filterActive':''"
                >全部</div>
                <div
                  class="tddiv"
                  v-for="(item,index) in twoUser"
                  :key="index"
                  :class="filterActive.secondClassUse == index+1?'filterActive':''"
                  @click="filterSelect(twoUser,'secondClassUse',index)"
                >{{item.zhCn}}</div>
              </td>
            </tr>

            <tr>
              <td class="td1">流转方式</td>
              <td class="td3" v-if="flowModeInfo&&flowModeInfo!==null">
                <div
                  class="tddiv"
                  @click="filterSelect(flowModeInfo.dictionariesEntities,'circulation',-1)"
                  :class="filterActive.circulation == 0?'filterActive':''"
                ><span>不限</span></div>
                <div
                  class="tddiv"
                  v-for="(item,index) in flowModeInfo.dictionariesEntities"
                  :class="filterActive.circulation == index+1?'filterActive':''"
                  @click="filterSelect(flowModeInfo.dictionariesEntities,'circulation',index)"
                  :key="index"
                >{{item.zhCn}}</div>
              </td>
            </tr>
            
            <tr>
              <td class="td1">成交时间</td>
              <td class="td3">
                <!-- <el-col :span="11" style="width: 226px;padding:0;">
                  <el-date-picker
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                    v-model="startTransTime"
                    @change="selectDataStart"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="width: 45px;text-align: center;">-</el-col>
                <el-col :span="11" style="width: 226px;">
                  <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束日期"
                    v-model="endTransTime"
                    @change="selectDataEnd"
                  ></el-date-picker>
                </el-col> -->
                <el-col :span="22">
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
              </td>
            </tr>
            <tr>
              <td class="td1">其他</td>
              <td>
                <el-select
                  placeholder="使用年限"
                  v-if="yearsUseInfo&&yearsUseInfo!==null"
                  v-model="filterActive.term"
                  @change="getYears($event)"
                >
                  <el-option
                    v-for="(item,index) in yearsUseInfo.dictionariesEntities"
                    :key="index.id"
                    :label="item.zhCn"
                    :value="index"
                  ></el-option>
                </el-select>
                <el-select
                  placeholder="地块面积"
                  v-if="plotAreaInfo&&plotAreaInfo!==null"
                  v-model="filterActive.acreage"
                  @change="getArea($event)"
                >
                  <el-option
                    v-for="(item,index) in plotAreaInfo.dictionariesEntities"
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
              <p style="width: 90px;color: #333;font-size: 14px;font-weight: bold;">您已选择</p>
              <p
                id="tdzr_xuanze"
                v-for="(val, key, index) in selected"
                @click="delSelect(key)"
                :key="index"
              >
                <span v-show="val" class="tdzr_span">{{val}}</span>
              </p>
              <a href="javascript:void(0)" @click="clearAll()">全部删除</a>
            </div>
            <div class="clear" style="background-color: #eee;"></div>
          </div>
        </div>
        <div style="height: 40px;line-height: 40px;text-align: center;">
          <span class="flexibleSwitchCenter" @click="flexSwitch">
            {{flexibleOpen?"收起筛选项" : "更多筛选项"}}
            <i
              :class="flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"
            ></i>
          </span>
        </div>
      </div>
    </div>
    <div class="landmain win1200">
      <div class="tdzr_main">
        <div class="tdzr_left">
          <ul class="tdzr_listtop">
            <li :class="['sortBox',sortActive=='default'?'sortactive':'']" @click="sortDefault">默认排序</li>
            <li :class="['sortBox',sortActive=='time'?'sortactive':'']" @click="sortTime">
              成交时间
              <span>{{this.timeSort?'↑':'↓'}}</span>
            </li>
          </ul>
          <div class="tdzr_list">
            <div class="serivemain_con">
              <ul class="serivemain_content">
                <li v-for="(item,index) in matchData" :key="index">
                  <div class="serivemain_con_top">
                    <div class="serivemain_con_top_img">
                      <img :src="baseUrl + item.img" alt :onerror="defaultImg" />
                      <span class="imgState">已成交</span>
                    </div>
                    <div class="serivemain_con_top_right">
                      <div class="serivemainR_title">
                        <h4 v-html="item.contractName"></h4>
                        <!-- {{item.businessType}} -->
                        <span
                          class="serivemainR_title_active"
                        >{{item.landTypeName}}</span>
                        <p style="float: right;margin-right: 40%;padding-top:5px;">
                            交易方式：
                            <em>自行交易</em>
                          </p>
                        <p>
                          地址：
                          <span
                          >{{item.provincialCodeName}}/{{item.cityCodeName}}/{{item.cantonCodeName}}</span>
                        </p>
                        <div class="trs_time">
                          <div style="color:#ff6825;">
                            成交价：
                            <span style="color:#ff6825;">{{item.transactionPrice/10000}}万元</span>
                          </div>
                          <div style="color:#ff6825;">
                            成交时间：
                            <span style="color:#ff6825;">{{item.createtime}}</span>
                          </div>
                        </div>
                        <div class="trs_time" v-if="item.landType == 'transfer'">
                          <div>
                            转让方：
                            <span>{{item.firstparty}}</span>
                          </div>
                          <div>
                            受让方：
                            <span>{{item.secondparty}}</span>
                          </div>
                        </div>
                        <div class="trs_time" v-else-if="item.landType == 'rent'">
                          <div>
                            出租方：
                            <span>{{item.firstparty}}</span>
                          </div>
                          <div>
                            承租方：
                            <span>{{item.secondparty}}</span>
                          </div>
                        </div>
                        <div class="trs_time" v-else>
                          <div>
                            抵押人：
                            <span>{{item.firstparty}}</span>
                          </div>
                          <div>
                            抵押权人：
                            <span>{{item.secondparty}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="serivemainR_deta">
                        <span @click="openDetail(item)">查看详情</span>
                      </div>
                      
                    </div>
                    <div style="clear: both;"></div>
                  </div>
                </li>
              </ul>
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
          </div>
          <div class="block">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
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
import qs from "qs";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      switchHeight: "278px",
      flexibleOpen: false,
      switchHeightland: 49,
      flexibleOpenland: false,
      cityDiect: [],
      areaDiect: [],
      twoUser: [],
      cityShow: false,
      areaShow: false,
      isTwo: false,
      baseUrl: "",
      location: [
        { path: "/", name: "首页" },
        { path: null, name: "自行交易信息列表" }
      ],
      endEarnestTime: "",
      amount: "",
      ownerShip: "",
      endApplyTime: "",
      beginLimitTime: "",
      endNoticeTime: "",
      startTransTime: "",
      endTransTime: "",
      startDate:"",
      transType: "",
      beginPrice: null,
      winnerId: null,
      beginApplyTime: "",
      endFocusTime: "",
      targetNo: "",
      transPrice: "",
      transTypeName: "",
      baseUrl: "",
      // indexcollect: 1,
      // adminArea: [],
      // currentPage4: 4,
      searchText: "",
      filterActive: {
        canton: "",
        firstClassUse: "",
        status: "",
        businessType: "",
        acreage: "",
        term: "",
        startTransTime: "",
        endTransTime: ""
      },
      selected: {
        // canton: "",
        // firstClassUse: "",
        // state: "",
        // businessType: "",
        // area: "",
        // years: "",
        // beginFocusTimeStart: "",
        // beginFocusTimeEnd: ""
      },
      searchInfo: {
        // canton: "",
        // firstClassUse: "",
        // state: "",
        // businessType: "",
        // area: "",
        // years: "",
        // beginFocusTimeStart: "",
        // beginFocusTimeEnd: ""
      },
      serivemainData: [],
      matchData: [],
      // popularData: [],
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      //排序激活
      sortActive: "default",
      //排序切换
      timeSort: null,
      // {{item.zhCn}}{{item.dictKey}}
      // status:['公告中','交易中','已成交','未成交(流拍)']
      status: [
        { zhCn: "公告中", dictKey: "ggz" },
        { zhCn: "交易中", dictKey: "jyz" },
        { zhCn: "已成交", dictKey: "ycj" },
        { zhCn: "未成交(流拍)", dictKey: "lp" }
      ],
      defaultImg:
        'this.src="' + require("../../../../assets/image/icon-nodata.png") + '"' //默认图地址
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
    //			展开收起
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? "auto" : "278px";
    },
    // 查看详情
    viewDeail(id, imgState) {
      // this.$router.push({
      //   path: "/TradingDetails",
      //   query: { id: id, selectedTraState: imgState }
      // });
    },
    filterSelect(data, name, index) {
      if (index === -1) {
        this.filterActive[name] = 0;
        this.selected[name] = null;
        this.searchInfo[name] = null;
        this.getSearchResults(this.searchInfo);
        return;
      }
      this.filterActive[name] = index + 1;
      this.selected[name] = data[index].zhCn;
      this.searchInfo[name] = data[index].dictKey;
      this.getSearchResults(this.searchInfo);
    },
    selectDatarange(){
      console.log(this.startDate)
      this.searchInfo.startTransTime = this.startDate!=null?this.startDate[0]:'';
      this.searchInfo.endTransTime = this.startDate!=null?this.startDate[1]:'';
      this.selected['startTransTime'] = this.startDate!=null?this.startDate[0]:'';
      this.selected['endTransTime'] = this.startDate!=null?this.startDate[1]:'';
      this.getSearchResults(this.searchInfo);
    },
    searchBtn() {
      this.searchInfo["search"] = this.searchText;
      this.getSearchResults(this.searchInfo);
    },
    delSelect(key) {
       if(key == "startTransTime" || "endTransTime"){
        this.startDate =  ""
        this.selected['endTransTime'] = ""
        this.selected['startTransTime'] = ""
      }
      this.selected[key] = null
      this.filterActive[key] = 0
      this.searchInfo[key] = null
      this.filterActive.acreage = key=='acreage'?'':this.filterActive.acreage
      this.filterActive.term = key=='term'?'':this.filterActive.term
      
      this.getSearchResults(this.searchInfo);
    },
    openDetail(item) {
      this.$router.push({
        path: "/AgreeTransacteDetails",
        query: {
          id: item.relevanceId,
          transPrice: item.transactionPrice,
          selectedTraState: 0
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      window.scrollTo(0, 730);
      this.getSearchResults(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
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
      this.searchInfo["sortField"] = "insert_time";
      this.searchInfo["sortOrder"] = this.timeSort ? "asc" : "desc";
      console.log(this.searchInfo);
      this.getSearchResults(this.searchInfo);
    },
    // 自行交易
    agencypop() {
      this.open("entrustTransInfo");
      this.$router.push("/");
    },
    // 合同网签备案
    signpop() {
      this.open("SignRecordInfo");
      this.$router.push({path:"/",query:{showcontact:"1"}});
    },
    // 申请竞买
    bidApplicate(id) {
      this.$router.push({ path: "/applyBiddingBook", query: { id: id } });
    },
    // 参与竟价
    centerPrice() {
      this.$router.push("/centerPrice");
    },
    filterSelectProvince(data, name, index, code) {
      //省
      if (code === true) {
        this.search(data[index].zhCn, data[index].dictKey, "");
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
          data[index].zhCn,
          data[index].parentId,
          data[index].dictKey
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
    filterSelectProvince(data, name, index, code) {
      //省
      if (code === true) {
        this.search(data[index].zhCn, data[index].dictKey, "");
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
          data[index].zhCn,
          data[index].parentId,
          data[index].dictKey
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
        //改bug931
        this.circulationType = "使用";
        return;
      }
      //				判断添加样式
      if (name == "term" || name == "acreage") {
        console.log("不添加");
      } else {
        this.filterActive[name] = index + 1;
      }
      //@name: 行政区域
      //@description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
      //@author: swx0916
      //@chageTime:2020-2-27
      if(name == 'cantonCity' || name == 'cantonProvince' || name == 'cantonArea'){
          this.selected[name] = data[index].regionName;
          this.searchInfo[name] = data[index].regionCode;
      }else{
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
      //搜索请求
      this.loading = true;
      this.imageSearch = false;
      console.log("搜索引擎请求的参数", params);
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      //搜索接口
      this.$axios.post(
        "/epf-landsearch/es/esLand/searchContract",
        qs.stringify(params),
        res => {
          console.log("搜索接口返回数据", res);
          if (res.code == "0" && res.pager.results != []) {
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
    },
    searchBtn() {
      this.pageNo = 1;
      this.searchInfo["search"] = this.searchText;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getSearchResults(this.searchInfo);
    },
    clearAll() {
      this.searchInfo = {};
      this.cityShow = false;
      this.areaShow = false;
      this.isTwo = false;
      this.startTransTime = ''
      this.endTransTime = ''
      this.startDate = "";
      this.selected = {};
      this.filterActive = {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        acreage: "",
        term: "",
        landType: "",
        landChar: ""
      };
      this.searchText=''
      this.searchInfo["search"] = this.searchText;
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
    //			获取使用年限
    getYears(e) {
      this.filterSelect(this.yearsUseInfo.dictionariesEntities, "term", e);
    },
    getArea(e) {
      this.filterSelect(this.plotAreaInfo.dictionariesEntities, "acreage", e);
    },
  },
  // mounted() {},
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    window.scrollTo(0, 120);
    this.getSearchDicRegion("0");
    this.getSearchLandUseInfo("land_use");
    this.getSearchflowModeInfo("flow_mode");
    this.getSearchPlotAreaInfo("plot_area");
    this.getSearchYearsUseInfo("years_use");
    this.getSearchLandtypeInfo("land_type");
    this.getSearchlandNatureInfo("land_nature");
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.selected = JSON.parse(localStorage.getItem("selected")) || {
      canton: "",
      firstClassUse: "",
      state: "",
      businessType: "",
      acreage: "",
      term: "",
      startTransTime: "",
      endTransTime: ""
    };
    this.filterActive = JSON.parse(localStorage.getItem("filterActive")) || {
      canton: "",
      firstClassUse: "",
      state: "",
      businessType: "",
      acreage: "",
      term: "",
      startTransTime: "",
      endTransTime: ""
    };
    this.filterActive.acreage=""
    this.filterActive.term=""
    this.searchInfo = JSON.parse(localStorage.getItem("searchInfo")) || {
      canton: "",
      firstClassUse: "",
      state: "",
      businessType: "",
      acreage: "",
      term: "",
      startTransTime: "",
      endTransTime: ""
    };
    this.searchText = this.searchInfo.search || "";
    this.getSearchResults(this.searchInfo);
    console.log(this.landUseInfo);
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
  // background: #fff;

  .tdzr_top {
    @include size(100%, auto);
    padding-bottom:20px;
    // border-bottom: solid 1px #f3f3f3;
    .search_body {
      box-sizing: border-box;
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
      .searchS{
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
          .tddiv {
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
          color: #333;
          font-size: 14px;
          font-weight: bold;
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
        .td2.hover span {
          color: #fff;
          background: #fab510;
          border-radius: 3px;
          padding: 0 5px;
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
      margin-right: 30px;
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
      // .tdzr_del {
      a {
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
  .tdzr_main {
    @include size(100%, auto);
    clear: both;
    margin-top: 20px;
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
              @include size(100%, 251px);
              box-sizing: border-box;
              padding: 25px;
              border-bottom: solid 2px #eeeeee;
              .serivemain_con_top {
                clear: both;
                &_img {
                  @include size(312px, 211px);
                  float: left;
                  position: relative;
                  img {
                    display: block;
                    @include size(100%, 100%);
                  }
                  .imgState {
                    background: var(--Colors);
                    padding: 10px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: 12px;
                    line-height: 16px;
                    color: #ffffff;
                    margin-top: -3px;
                    background: url("../../../../assets/image/icon_landstate1.png")
                      no-repeat left center;
                  }
                }
                &_right {
                  @include size(800px, 203px);
                  float: left;
                  box-sizing: border-box;
                  padding: 16px 0 0 20px;
                  position: relative;
                  .serivemainR_title {
                    @include size(100%, 154px);
                    float: left;
                    box-sizing: border-box;
                    background: #fff;
                    line-height: 30px;
                    h4 {
                      color: #333;
                      font-size: 18px;
                      font-weight: bold;
                      cursor: pointer;
                    }
                    h4:hover {
                      color: var(--priceColor);
                    }
                    .serivemainR_title_active {
                      color: var(--priceColor);
                      font-size: 14px;
                      padding: 6px 12px;
                      margin-right: 10px;
                      line-height: 40px;
                      border-radius: 0px 5px 0px 5px;
                      background: #fdf5ec;
                      font-weight: bold;
                    }
                    .serivemainR_title_active01 {
                      color: var(--Colors);
                      border: solid 1px #f99c0d;
                      font-size: 14px;
                      padding: 5px 10px;
                      margin-right: 10px;
                      line-height: 40px;
                      border-radius: 0px 8px 0px 8px;
                      background: #fff;
                    }
                    .serivemainR_title_active02 {
                      color: #4875cf;
                      border: solid 1px #4875cf;
                      font-size: 14px;
                      padding: 5px 10px;
                      margin-right: 10px;
                      line-height: 40px;
                      border-radius: 0px 8px 0px 8px;
                      background: #fff;
                    }
                    .trs_time {
                      // font-size: 16px;
                      div {
                        display: inline-block;
                        width: 350px;
                        color: #999999;
                        span {
                          color: #666666;
                        }
                      }
                    }
                    p {
                      color: #999999;
                      span {
                        color: #666666;
                      }
                    }
                  }
                  .serivemainR_deta {
                    position: absolute;
                    right: 0;
                    top: 81px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    cursor: pointer;
                    span {
                      width: 80px;
                      height: 36px;
                      display: block;
                      background-color: var(--Colors);
                      color: #fff;
                      margin-bottom: 14px;
                      border: solid 1px var(--Colors);
                      border-radius: 2px;
                    }
                    .subState {
                      background: #fff;
                      color: var(--Colors);
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
                background-color: var(--Colors);
                border: none;
                color: #fff;
              }
            }
          }
        }
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
    color: var(--Colors);
  }
  .sortactive {
    color: var(--Colors);
  }
}
.imgState {
  background: var(--Colors);
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  margin-top: -3px;
  background: url("../../../../assets/image/icon_landstate1.png") no-repeat left
    center;
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

.list_bot_active05 {
  color: #7698b8;
  background: #f2f5f7;
  font-weight: bold;
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
