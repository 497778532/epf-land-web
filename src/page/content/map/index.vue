<template>
  <div>
    <el-container :style="{height:containerHeight}" style="min-width:1660px">
      <el-header 
        style="background:#fff;height:82px;"
       >
        <div class="headerLeft">
          <div class="landlogo">
            <div class="head_logo_nei_l fl" @click="goHome()">
              
            <div class="head_logo_nei_l_r fl">
              <span
                v-if="InfoConfigBase.nameEn == null"
                style="line-height:46px;"
                >{{ InfoConfigBase.name }}</span
              >
              <div v-else>
                <span>{{ InfoConfigBase.name }}</span>
                <br />
                <span class="subtitle">{{
                  InfoConfigBase.nameEn
                }}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
        
        <div class="headerRight">
          <div class="addressBtn" @click="switchBtn()">
            <img src="../../../assets/image/j_icon.png" />
            <span>{{Address}}</span>
          </div>
           <!-- <div class="search_body">
              <input
                type="text"
                placeholder="请输入土地位置土地用途土地面积等相关信息"
                class="input_text fl"
                v-model="search"
              />
              <div class="epf_btn epf_btn_bg" @click="landRetrieval()" style="margin-left:0">搜索</div>
            </div> -->
            <div style="float:left;margin-top:22px;margin-left:31px;">
                <el-select
                  v-show="provinceShow"
                  v-model="selectDataList.cantonProvince"
                  value-key="dicKey"
                  placeholder="土地位置"
                  v-if="regionInfo&&regionInfo!=null"
                >
                  <el-option 
                    v-show="Address == '全国'"
                    label="" 
                    value="" 
                    @click.native="allSelect(false)">
                    全国
                  </el-option>
                  <el-option
                    @click.native="filterSelect(item,'cantonProvince')"
                    :label="item.regionName"
                    :value="item.regionCode"
                    v-for="(item,index) in regionInfo.dictionariesList"
                    :key="index"
                  >{{item.regionName}}</el-option>
                </el-select>
                <el-select
                  v-show="cityShow"
                  value-key="dicKey"
                  v-model="selectDataList.cantonCity"
                  placeholder="土地位置"
                  v-if="cityDiect&&cityDiect!=null"
                >
                  <el-option
                    @click.native="filterSelect(item,'cantonCity')"
                    :label="item.regionName"
                    :value="item.regionCode"
                    v-for="(item,index) in cityDiect"
                    :key="index"
                  >{{item.regionName}}</el-option>
                </el-select>
                <el-select
                  v-show="areaShow"
                  v-model="selectDataList.cantonArea"
                  value-key="dicKey"
                  placeholder="土地位置"
                  v-if="areaDiect&&areaDiect!=null"
                >
                  <el-option
                    @click.native="filterSelect(item,'cantonArea')"
                    :label="item.regionName"
                    :value="item.regionCode"
                    v-for="(item,index) in areaDiect"
                    :key="index"
                  >{{item.regionName}}</el-option>
                </el-select>
                 <el-select
                  v-model="selectDataList.firstClassUse"
                  placeholder="土地用途"
                  v-if="landUseInfo&&landUseInfo!=null"
                >
                  <el-option 
                    v-show="Address == '全国'"
                    label="" 
                    value="" 
                    @click.native="allSelect('firstClassUse')">
                    全部
                  </el-option>
                  <el-option
                    @click.native="filterSelect(item,'firstClassUse')"
                    :label="item.zhCn"
                    :value="item.dictKey"
                    v-for="(item,index) in landUseInfo.dictionariesEntities"
                    :key="index"
                  >{{item.zhCn}}</el-option>
                </el-select>
                <el-select
                  v-model="selectDataList.circulation"
                  placeholder="流转方式"
                  v-if="flowModeInfo&&flowModeInfo!=null"
                >
                  <el-option 
                    v-show="Address == '全国'"
                    label="" 
                    value="" 
                    @click.native="allSelect('circulation')">
                    全部
                  </el-option>
                  <el-option
                    :label="item.zhCn"
                    @click.native="filterSelect(item,'circulation')"
                    :value="item.dictKey"
                    v-for="(item,index) in flowModeInfo.dictionariesEntities"
                    :key="index"
                  >{{item.zhCn}}</el-option>
                </el-select>
                 <el-select
                  v-model="selectDataList.years"
                  placeholder="使用年限"
                  v-if="yearsUseInfo&&yearsUseInfo!=null"
                >
                  <el-option 
                    v-show="Address == '全国'"
                    label="" 
                    value="" 
                    @click.native="allSelect('years')">
                    全部
                  </el-option>
                  <el-option
                    :label="item.zhCn"
                    @click.native="filterSelect(item,'years')"
                    :value="item.dictKey"
                    v-for="(item,index) in yearsUseInfo.dictionariesEntities"
                    :key="index"
                  >{{item.zhCn}}</el-option>
                </el-select>
                <!-- <el-select
                  v-model="selectDataList.landChar"
                  placeholder="土地性质"
                  v-if="landNatureInfo&&landNatureInfo!=null"
                > 
                  <el-option 
                    v-show="Address == '全国'"
                    label="" 
                    value="" 
                    @click.native="allSelect('landChar')">
                    全部
                  </el-option>
                  <el-option
                    :label="item.zhCn"
                    @click.native="filterSelect(item,'landChar')"
                    :value="item.dictKey"
                    v-for="(item,index) in landNatureInfo.dictionariesEntities"
                    :key="index"
                  >{{item.zhCn}}</el-option>
                </el-select>
                 <el-select
                  v-model="selectDataList.landType"
                  @change="filterSelect"
                  placeholder="土地类型"
                  v-if="landtypeInfo&&landtypeInfo!=null"
                >
                  <el-option 
                    v-show="Address == '全国'"
                    label="" 
                    value="" 
                    @click.native="allSelect('landType')">
                    全部
                  </el-option>
                  <el-option
                    :label="item.zhCn"
                    @click.native="filterSelect(item,'landType')"
                    :value="item.dictKey"
                    v-for="(item,index) in landtypeInfo.dictionariesEntities"
                    :key="index"
                  >{{item.zhCn}}</el-option>
                </el-select> -->
                <i class="el-icon-delete" @click="cleanUp">清空</i>
                <!-- <i class="el-icon-caret-bottom"></i> -->
            </div> 
          </div>
      </el-header>
      <el-container style="background:#fff;">
        <el-aside class="aside" width="360px" style="background:#fff;border-top: 1px solid #07438a;" v-show="!hideSide"  :style="{height:listHeight,overflowY:'scroll',overflowx:'none'}">
          <div class="search_warp">
            <div class="win1200" style="width:100%">
              <div class="tdzr_top">
                <div class="search_body">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    class="input_text fl"
                    v-model="search"
                  />
                  <div class="epf_btn epf_btn_bg" @click="landRetrieval()" style="margin-left:0;height:32px;line-height:32px;">搜索</div>
                </div>
              </div>
            </div>
          </div>
          <div class="find_for_you">
            <span style="float:left">为您找到<i style="color:var(--lightColor)">{{matchData.length}}</i>个供给地块</span>
            <span style="float:right;">
              <span  style="margin-right:5px;">
                <span :class="['sortBox',sortActive=='price'?'sortactive':'']" @click="sortPrice">价格
                  <span>{{this.priceSort?'↑':'↓'}}</span>
                </span>
              </span>
              <span>
                <span :class="['sortBox',sortActive=='area'?'sortactive':'']" @click="sortArea">面积
                  <span>{{this.areaSort?'↑':'↓'}}</span>
                </span>
              </span>
            </span>
          </div>
          <div class="list_warp">
            <div
              class="tdzr_list"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255, 0.9)"
              style="min-height:86%"
            >
              <div v-if="matchData.length==0" class="noTime">暂无数据</div>
              <ul class="list_main">
                <li v-for="(item,index) in matchData" :key="index" @click="openDetail(item.id)">
                  <div class="list_top"> 
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top-start">
                      <h5 v-html="item.title">{{item.title}}</h5>
                    </el-tooltip>
                  </div>
                  <div class="list_bottom"> 
                    <a href="#">
                      <img :src="baseUrl + item.img" alt :onerror="defaultImg" />
                    </a>
                    <span>
                      <div>
                        <span>
                          <span v-show="item.price?true:false">￥</span>
                          <span>{{item.price?item.price + ' 万元':'面议'}}</span>
                        </span>
                      </div>
                      <p><span>地址：</span>{{item.cantonProvinceName}}-{{item.cantonCityName}}-{{item.cantonAreaName}}</p>
                      <el-tooltip class="item" effect="dark" :content="`${item.firstClassUseName} - ${item.secondClassUseName}`" placement="bottom-end">
                        <p class="landUse"><span>土地用途：</span>{{item.firstClassUseName}} - {{item.secondClassUseName}}</p>
                      </el-tooltip>
                    </span>
                  </div>
                  <div class="list_down">
                    <em>{{item.circulationName}}</em>
                    <i>{{item.area}}㎡</i>
                    <strong>{{item.years}}年</strong>
                    <span clsss="localImg" style="width:26px;height:26px;float:right;margin-right:-8px;">
                      <img v-if="indexLocation == index" src="../../../assets/image/findPlace-1.png" alt="">
                      <img v-else src="../../../assets/image/findPlace-0.png"  @click.stop="locaTion(item.coordinate,item,index)" alt="">
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="pagingBox">
              <!-- small -->
              <el-pagination
                background
                layout="sizes,prev,pager,next"
                :page-sizes="[15,20,25,30]"
                @size-change="sizeChangeFun"
                @current-change="currentChangeFun"
                :total="totalRecord"
                :current-page="pageNo"
                :page-size="pageSize"
              ></el-pagination>
            </div>
          </div>
        </el-aside>
        <el-main style="padding:0px;border-top: 2px solid var(--lightColor)" v-loading="mapLoading">
          <!-- 地图子组件 -->
          <Map
            ref="childItem"
            @cleanMapLoading="cleanMapLoading"
            @addMapLoding="addMapLoding"
            @cleanLiving="cleanLiving"
            @selectFun="filterSelect"
            :queryRadius="queryRadius"
            
          ></Map>
           <div @click="asideHide" v-if="!hideSide" style="position:absolute;left:360px;top:300px;padding:40px 0px;background:#fff;;z-index:999;border-radius:0 5px 5px 0">
             <i class="el-icon-arrow-right"  style="font-size:20px;"></i>
             
          </div>
          <div  @click="asideHide" v-if="hideSide" style="position:absolute;left:0px;top:300px;padding:40px 0px;background:#fff;;z-index:999;border-radius:0 5px 5px 0">
            <i class="el-icon-arrow-left" style="font-size:20px;"></i>
          </div>
          <div class="facilitiesBox">
            <div class="facilities" @click="openBox">
              <span>配套设施</span>
              <i v-if="!facilitiesFlag" class="el-icon-caret-bottom"></i>
              <i v-if="facilitiesFlag" class="el-icon-caret-top"></i>
            </div>
            <div class="facilities_content" v-if="facilitiesFlag">
              <p>周边配套分析</p>
              <div class="facilities_main">
                <ul class="line">
                  <li v-for="(item,index) in radius" :key="index" :class="(index == '1' || index == '2')?'line_active':''">
                    <div><span @click="radiusFun(item,index)" :class="index == radiusIndex?'active':''"></span><em v-if="index!='2'"></em></div>
                    <i v-if="item == '500'">{{item}}m</i>
                    <i v-else-if="item == '1000'">1km</i>
                    <i v-else-if="item == '5000'">5km</i>
                  </li>
                </ul>
                <ul class="checkBox">
                  <li v-for="(item,index) in lifeData" :key="index">
                    <h5>{{item.title}}：</h5>
                    <div>
                      <el-checkbox-group  v-model="item.value" :max='1'>
                        <el-checkbox @change="livingFacilities(index)" class="check_val" v-for="(val,ind) in item.content" :label="val.name" :key="ind">{{val.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="button_bottom">
                <span class="reset" @click="reset">重置</span>
                <span class="sure" @click="sure">确定</span>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <ReceptionFooter></ReceptionFooter>
  </div>
</template>

<script>
import ReceptionFooter from "@/page/foot";
import Map from "@/components/common/tianditu/findMapLand.vue";
import baseURL1 from "@/util/config.js";
import { mapState, mapActions } from "vuex";
import qs from "qs";
export default {
  components: { ReceptionFooter, Map },
  data() {
    return {
      cityDiect: [],
      areaDiect: [],
      provinceShow:true,
      cityShow: false,
      areaShow: false,
      indexLocation:-1,
      Address: "全国",
      hideSide:false,
      facilitiesFlag:false,
      radius:['500','1000','5000'],
      radiusIndex:1,
      queryRadius:"1000",
      defaultImg: 'this.src="' + require("../../../assets/image/logo.png") + '"',
      InfoConfigBase: {},
      baseUrl: "", //地址前缀
      defaultImg:
        'this.src="' + require("../../../assets/image/icon-nodata.png") + '"', //默认图地址
      subTitle: "LAND SECONDARY MARKET TRADING SERVICE PLATFORM",
      lifeData: [
        //选项条件
        {
          title: "道路设施",
          value: [],
          content: [
            { name: "交通配套", values: "交通配套" },
            { name: "主干道", values: "主干道" },
            { name: "地铁", values: "地铁" },
            { name: "地铁站", values: "地铁站" },
            { name: "公交站", values: "公交站" },
            { name: "铁路", values: "铁路" },
            { name: "火车站", values: "火车站" }
          ]
        },
        {
          title: "公共配套",
          value: [],
          content: [
            { name: "学校", values: "学校" },
            { name: "医院", values: "医院" },
            { name: "幼儿园", values: "幼儿园" },
            { name: "公园", values: "公园" }
          ]
        },
        {
          title: "生活配套",
          value: [],
          content: [
            { name: "餐饮", values: "餐饮" },
            { name: "银行", values: "银行" },
            { name: "住宅", values: "住宅" },
            { name: "超市", values: "超市" }
          ]
        }
      ],
      addressFlag:"",
      selectDataList: { //搜索筛选条件
        cantonProvince: "", //土地位置
        cantonCity: "", //土地位置
        cantonArea: "", //土地位置
        firstClassUse: "", //土地用途
        circulation: "", //流转方式
        years: "", //使用年限
        landChar: "", //土地性质
        landType: "", //土地类型
      },
      search: "", //土地检索-输入内容
      mapLoading: true, //地图加载loading
      circulationType: "转让",
      containerHeight: "",
      listHeight: "",
      enclosureList: [], //条件选择器
      loading: false, //加载loading
      matchData: [],//数据列表
      pageNo: 1, //当前页码
      pageSize: 15, //每页显示条数
      totalPage: 1, // 总页数
      totalRecord: 1, //分页总条数
      params: {
        page: "",
        rows: ""
      }, // 请求参数集合
      selected: "",
      filterActive: "",
      searchInfo: "",
      searchText: "",
      capitalContainer: "", //城市列表
      specialCityArray: [0, 1, 8, 21, 31, 32, 33], //特殊城市index
      selectTab: false, //清除条件标识,
      //排序激活
      sortActive: "default",
      //排序切换
      priceSort: null,
      areaSort: null,
    };
  },
  beforeMount() {
    //初始化创建城市信息
    const addObj = {
      creditCity: "全国", //默认全国
      creditLatitude: 109.5996, //经度
      creditLongitude: 33.50475, //纬度
      cantonProvince: "",
      cantonCity: ""
    };
    if (
      sessionStorage.getItem("Address") &&
      sessionStorage.getItem("Address").creditCity == "全国"
    ) {
      sessionStorage.setItem("Address", JSON.stringify(addObj)); //保存
    }
  },
  created() {
    this.getSearchDicRegion("0");
    this.getSearchLandUseInfo("land_use");
    this.getSearchflowModeInfo("flow_mode");
    this.getSearchPlotAreaInfo("plot_area");
    this.getSearchYearsUseInfo("years_use");
    this.getSearchLandtypeInfo("land_type");
    this.getSearchlandNatureInfo("land_nature");
    let parentId = ""
    if(JSON.parse(sessionStorage.getItem("Address"))){
      this.Address = JSON.parse(sessionStorage.getItem("Address")).creditCity
      if(JSON.parse(sessionStorage.getItem("Address")).cantonCity){
        parentId = JSON.parse(sessionStorage.getItem("Address")).cantonCity
        this.getAreaDiect(parentId)
      }else if(JSON.parse(sessionStorage.getItem("Address")).cantonCity == "" && JSON.parse(sessionStorage.getItem("Address")).cantonProvince!= ""){
        parentId = JSON.parse(sessionStorage.getItem("Address")).cantonProvince
        this.getCityDiect(parentId)
      }
    }
    if(this.Address == "全国"){ 

      // this.regionInfo.dictionariesList = this.capitalContainer
      // console.log(this.regionInfo.dictionariesList)
      this.provinceShow = true
    }
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.selected = JSON.parse(localStorage.getItem("selected")) || {
      cantonProvince: "",
      firstClassUse: "",
      circulation: "",
      area: "",
      years: "",
      landType: "",
      landChar: ""
    };
    this.filterActive = JSON.parse(localStorage.getItem("filterActive")) || {
      cantonProvince: "",
      firstClassUse: "",
      circulation: "",
      area: "",
      years: "",
      landType: "",
      landChar: ""
    };
    this.searchInfo = JSON.parse(localStorage.getItem("searchInfo")) || {
      cantonProvince: "",
      firstClassUse: "",
      circulation: "",
      area: "",
      years: "",
      landType: "",
      landChar: ""
    };
    this.searchText = this.search || "";
  },
  beforeMount(height) {
    let screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.containerHeight = screenHeight + "px";
    this.listHeight = screenHeight - 82 + "px";
    // this.listHeight = screenHeight -150 + "px";
    this.$bus.$emit("censusData", '123');
  },
  mounted() {
    let parentId = ""
    if(JSON.parse(sessionStorage.getItem("Address"))){
      this.params["cantonProvince"] = JSON.parse(sessionStorage.getItem("Address")).cantonProvince;
      this.params["cantonCity"] = JSON.parse(sessionStorage.getItem("Address")).cantonCity;
      this.Address = JSON.parse(sessionStorage.getItem("Address")).creditCity
      if(JSON.parse(sessionStorage.getItem("Address")).cantonCity){
        parentId = JSON.parse(sessionStorage.getItem("Address")).cantonCity
        this.getAreaDiect(parentId)
      }else if(JSON.parse(sessionStorage.getItem("Address")).cantonCity == "" && JSON.parse(sessionStorage.getItem("Address")).cantonProvince!= ""){
        parentId = JSON.parse(sessionStorage.getItem("Address")).cantonProvince
        this.getCityDiect(parentId)
      }
    }
    this.params["page"] = this.pageNo;
    this.params["rows"] = this.pageSize;
    this.params["search"] = this.search;
    this.getListData(this.params);
    this.$axios.get("/epf-cms/cms/basics/getInformationList", {}, res => {
      if (res.code != "0") {
        this.$message.error(res.msg); //失败
        return;
      }
      this.InfoConfigBase = res.information;
    });
    this.$axios.get("/epf-cms/regionals/getRegionalTree", {}, res => {
      if (res.code == 0) {
        let arr = [];
        let newZhcn = [];
        for (let i = 0; i < res.dataTree.length; i++) {
          for (let j = 0; j < res.dataTree[i].children.length; j++) {
            delete res.dataTree[i].children[j].children;
          }
        }
        for (let i = 0; i < this.specialCityArray.length; i++) {
          delete res.dataTree[this.specialCityArray[i]].children;
        }
        this.capitalContainer = res.dataTree;
        if(this.Address == "全国"){ 
          this.regionInfo.dictionariesList = this.capitalContainer ;
          this.provinceShow = true
          this.cityShow = false
          this.areaShow = false
          console.log(this.regionInfo.dictionariesList)
        }
        this.$axios.get("/epf-landweb/tlandSearch/mapLocationStatistics",{}, res => {
            this.capitalContainer.map((item,index)=>{
              res.data.zhCn.map((val,ind)=>{
                  if(item.regionName == val){
                      val = {'name':val,'code':item.regionCode}
                      newZhcn.push(val)
                }
              })
            })
            res.data.zhCn = newZhcn
            if(JSON.parse(sessionStorage.getItem("Address"))){
              let value = JSON.parse(sessionStorage.getItem("Address")).creditCity
              let pId = JSON.parse(sessionStorage.getItem("Address")).cantonCity ? JSON.parse(sessionStorage.getItem("Address")).cantonCity:JSON.parse(sessionStorage.getItem("Address")).cantonProvince
              if(pId && pId != ''){
                let indexPId = ''
                res.data.dictList.map((item,index)=>{
                  if(pId ==  item){
                    indexPId = index
                  }
                })
                let arr = {zhCn:[],numList:[],areaList:[]}
                arr.zhCn.push(res.data.zhCn[indexPId])
                arr.numList.push(res.data.numList[indexPId])
                arr.areaList.push(res.data.areaList[indexPId])
                res.data = arr
                this.$refs.childItem.positionMap(value,this.selectDataList,pId)
              }
            }
            this.$bus.$emit("censusData", res);
        });
      }
    });
  },
  computed: {
    ...mapState("index", [
      "regionInfo",
      "landUseInfo",
      "flowModeInfo",
      "plotAreaInfo",
      "yearsUseInfo",
      "landtypeInfo",
      "landNatureInfo",
    ]),
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    next()
  },
  methods: {
    ...mapActions("index", [
      "getSearchDicRegion",
      "getSearchLandUseInfo",
      "getSearchflowModeInfo",
      "getSearchPlotAreaInfo",
      "getSearchYearsUseInfo",
      "getSearchLandtypeInfo",
      "getSearchlandNatureInfo",
    ]),
    switchBtn() {
      //城市组件切换
      this.$router.push("/CityList");
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
            if(this.cityDiect && this.cityDiect.length !=0){
              this.cityShow = true
              this.areaShow = false
              this.provinceShow = false
            }
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
              this.cityShow = false;
              this.provinceShow = false
            }
          }
        }
      );
    },
    // 左侧列表抽屉
    asideHide(){
      this.hideSide = !this.hideSide
    },
    // 面积排序
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
      this.getListData(this.searchInfo);
    },
    //价格排序
    sortPrice() {
      this.searchInfo["page"] = 1;
      this.sortActive = "price";
      //清空已有排序值
      if (this.priceSort == null) {
        this.priceSort = false;
      } else {
        this.priceSort = !this.priceSort;
      }
      this.searchInfo["sortField"] = "price";
      this.searchInfo["sortOrder"] = this.priceSort ? "asc" : "desc";
      console.log(this.priceSort)
      this.getListData(this.searchInfo);
    },
    // 打开配置设施
    openBox(){
      this.facilitiesFlag = !this.facilitiesFlag
    },
    // 传半径
    radiusFun(item,index){
      this.radiusIndex = index;
      this.queryRadius = item
    },
    getListData(params) {
      //获取列表数据&搜索接口
      this.matchData = [];
      this.loading = true;
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      this.$axios.post(
        "/epf-landsearch/es/esLand/searchLand",
        qs.stringify(params),
        res => {
          if (res.code == "0" && res.results != []) {
            this.loading = false;
            this.matchData = res.pager.results;
            console.log(this.matchData)
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
          } else {
            this.loading = false;
          }
        }
      );
    },
    landRetrieval() {
      //搜索按钮
      if (this.search !== "") {
        this.pageNo = 1;
        this.params["page"] = this.pageNo;
        this.params["rows"] = this.pageSize;
        this.params["search"] = this.search;
        this.getListData(this.params);
      } else {
        this.$message.warning("请输入搜索内容");
      }
    },
    cleanUp() {
      //清除所选项
      if (this.selectTab == true || this.search !== "") {
        this.search = "";
        this.selectDataList.cantonProvince = "";

        Object.assign(
          this.$data.selectDataList,
          this.$options.data().selectDataList
        ); //初始化筛选条件
        // Object.assign(this.$data.lifeData, this.$options.data().lifeData); //设施信息筛选初始化
        this.lifeData[0].value = "";
        this.lifeData[1].value = "";
        this.lifeData[2].value = "";
        this.selectTab = !this.selectTab;
        this.params["page"] = 1;
        this.params["rows"] = 15;
        this.params["search"] = this.search;
        
        this.$refs.childItem.cleaOptions({});
        this.getListData(this.params);
      } else {
        this.$message.warning("选项已经为空");
        return;
      }
    },
    allSelect(item){ //optin全部选项
      if(item){
        switch(item){
          case item = 'firstClassUse':
            this.selectDataList.firstClassUse = ''
            this.allFunction()
          break;
          case item = 'circulation':
            this.selectDataList.circulation = ''
            this.allFunction()
          break;
          case item = 'years':
            this.selectDataList.years = ''
            this.allFunction()
          break;
          case item = 'landChar':
            this.selectDataList.landChar = ''
            this.allFunction()
          break;
          case item = 'landType':
            this.selectDataList.landType = ''
            this.allFunction()
          break;
        }
      }else{
        this.allFunction()
      }
    },
    allFunction(){
      this.$refs.childItem.cleaOptions(this.selectDataList)
      this.getListData(this.selectDataList)
    },
    filterSelect(item,tag) { //option其他选项
      //筛选条件土地信息请求
      this.selectTab = true;
      if(this.cityDiect&&this.cityDiect!=null&&this.cityShow){
        this.selectDataList.cantonCity = item.regionCode
        this.selectDataList.cantonProvince = JSON.parse(sessionStorage.getItem("Address"))?JSON.parse(sessionStorage.getItem("Address")).cantonProvince:""
      }else if(this.areaDiect&&this.areaDiect!=null&&this.areaShow){
        this.selectDataList.cantonArea = item.regionCode
        this.selectDataList.cantonProvince = JSON.parse(sessionStorage.getItem("Address"))?JSON.parse(sessionStorage.getItem("Address")).cantonProvince:""
        this.selectDataList.cantonCity = JSON.parse(sessionStorage.getItem("Address"))?JSON.parse(sessionStorage.getItem("Address")).cantonCity:""
     }else if(this.provinceShow){
        this.selectDataList.cantonProvince = item.regionCode
      }
      let key = ""
      let value = ""
      if(tag == 'cantonProvince' || 'cantonCity' || 'cantonArea'){
        if(item.regionName){
          this.selectDataList[tag] = item.regionCode
          localStorage.setItem("addressFlag", JSON.stringify( this.selectDataList)); //保存
        }
        key = item.regionName;
        value = item.regionCode
      }
      this.selectDataList.search = this.search
      let data = this.selectDataList
      if (key) {
        //调用地图组件定位土地位置
        this.$refs.childItem.positionMap(key,data,value)
        this.getListData(data)
      }else{
        // this.$message.warning('请选择土地位置')
        let addressFlagC = JSON.parse(localStorage.getItem("addressFlag"))
        if(addressFlagC){
            this.selectDataList['cantonProvince'] = addressFlagC.cantonProvince
            this.selectDataList['cantonCity'] = addressFlagC.cantonCity
        }
        this.selectDataList.search = this.search
        this.allFunction()
      }
    },
    reset(){
      this.lifeData.map(item=>{item.value = []})
    },
    sure(){
      console.log(this.queryRadius)
      this.$refs.childItem.locationFun(this.matchData[this.indexLocation].coordinate, this.matchData[this.indexLocation] ,this.queryRadius)
      //调用地图设施标注方法
      this.$refs.childItem.selectFun(this.enclosureList);
      this.facilitiesFlag = false
    },
    livingFacilities(index) {
      // 周边设施筛选条件
      // this.selectTab = true;
      this.enclosureList = this.lifeData[index].value;
      if(index == 0){
        this.lifeData[1].value = []
        this.lifeData[2].value = []
      }else  if(index == 1){
        this.lifeData[0].value = []
        this.lifeData[2].value = []
      }else  if(index == 2){
        this.lifeData[0].value = []
        this.lifeData[1].value = []
      }
    },
    cleanLiving() {
      //地图组件调用的方法
      this.selectTab = false;
      this.lifeData[0].value = "";
      this.lifeData[1].value = "";
      this.lifeData[2].value = "";
    },
    cleanMapLoading() {
      //子组件调用消除loading
      this.mapLoading = false;
    },
    addMapLoding() {
      //子组件调用添加loading
      this.mapLoading = true;
    },
    locaTion(val,item,index) {
      //定位按钮
      // this.$refs.childItem.positionMap(val,item)
      this.$refs.childItem.locationFun(val,item,this.queryRadius)
      this.indexLocation = index
      // if (lngLat != "") {
      //   this.selectTab = true;
      //   let locations = { lng_lat: lngLat };
      //   this.lifeData[0].value = "";
      //   this.lifeData[1].value = "";
      //   this.lifeData[2].value = "";
      //   this.$refs.childItem.locationFun(locations, data); //调用地图组件定位方法
      // } else {
      //   this.$message({
      //     message: "该土地没有定位数据",
      //     type: "warning"
      //   });
      // }
    },
    sizeChangeFun(value) {
      //显示条数变化
      this.pageNo = 1;
      this.params["page"] = this.pageNo;
      this.params["rows"] = value;
      this.params["search"] = this.search;
      this.getListData(this.params);
    },
    currentChangeFun(value) {
      
      console.log(value)
      //页码变化
      this.params["page"] = value;
      this.params["rows"] = this.pageSize;
      this.params["search"] = this.search;
      console.log(this.params)
      this.getListData(this.params);
      
    },
    goHome() {
      //返回首页
      this.$router.push("/");
    },
    openDetail(id) {
      console.log(id)
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
  }
};
</script>
<style lang="scss" scoped>
.facilitiesBox{
  .facilities{
    position:fixed;
    top:180px;
    right:28px;
    width:113px;
    height:36px;
    background:var(--lightColor);
    text-align: center;
    color:#fff;
    line-height: 36px;
    z-index: 999;
  }
  .facilities_content{
    position:fixed;
    top:216px;
    right:28px;
    z-index: 999;
    width:255px;
    height:441px;
    border:1px solid #e0dfdf;
    background:#fff;
    p{
      font-weight: bold;
      padding:16px 0 13px 12px;
      font-size:12px;
      border-bottom:1px solid #e0dfdf;
    }
    .facilities_main{
      .line{
        padding:26px 9px 20px ;
        li,span,em{
          display:inline-block;
          vertical-align: middle;
        }
        span{
          width:14px;
          height: 14px;
          border:1px solid #cfd1db;
          border-radius: 50%;
          margin-bottom:3px;
        }
        .line_active{
          margin-left:-2px;
        }
        i{
          display:block;
          color:#666666;
        }
        .active{
          border:1px solid var(--lightColor);
          background:var(--lightColor);
        }
        em{
          width:90px;
          height:2px;
          background:var(--lightColor);
        }
      }
      .checkBox{
        padding-left:10px;
        li{
          margin-bottom:8px;
          h5,div{
            color:#666;
            display: table-cell;
          }
          /deep/ .el-checkbox__label{
            color:#666;
            padding-left:5px;
            line-height: 27px;
          }
          h5{
            width:87px;
          }
          div{
            width:200px;
          }
          .check_val{
            color:#333;
          }
        }
      }
    }
    #button_bottom{
        border-top:1px solid #e0dfdf;
        padding:14px 10px 11px 127px;
        .reset{
          padding:6px 11px 7px 12px;
          border:1px solid #e0dfdf;
          border-radius: 2px;
          margin-right:7px;
          font-size:13px;
          color:#666666;
        }
        .sure{
          background:var(--lightColor);
          color:#fff;
          border-radius: 2px;
          font-size:12px;
          padding:8px 13px;
        }
      }
  }
}
.landlogo {
  height: 80px;
  float: left;
  overflow: hidden;
  .head_logo_nei_l {
    width: auto;
    padding-right: 16px;
    cursor: pointer;
    .head_logo_nei_l_r {
      margin-top:14px;
      span {
        &:nth-child(1) {
          // letter-spacing: 5px;
          font-size: 28px;
          color: var(--priceColor);
          font-weight: bold;
        }
        &:nth-child(3) {
          font-size: 12px;
          font-weight: bold;
          color:var(--priceColor);
        }
      }
    }
  }
}
.landnav {
  height: 45px;
  float: right;
  margin-top: 18px;
  li {
    height: 45px;
    float: left;
    line-height: 45px;
    font-size: 16px;
    color: #333;
    text-align: center;
    cursor: pointer;
    margin-left: 32px;
    padding: 0 5px;
  }
  li:hover {
    color: var(--Colors);
    font-weight: bolder;
  }
  li.bgactive {
    color: var(--Colors);
    font-weight: bolder;
    box-sizing: border-box;
    border-bottom: 2px solid var(--Colors);
  }
}
.el-select .el-input__inner {
  height: 30px;
}
.headerLeft {
  float: left;
}
.list_main{
  li{
    padding:3px 15px 17px 20px;
    border-bottom:1px solid #d8d8d8;
  }
  .list_top{
    // display: flex;
    // justify-content: space-between;
    h5{
      width:320px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-weight: bold;
      font-size:14px;
      line-height: 38px;
    }
  }
  .list_bottom{
    position: relative;
    display: flex;
    justify-content: start;
    a{
      display: inline;
      margin-right:9px;
      img{
         width:95px;
         height:65px;
      }
    }
    span{
      margin-top:3px;
      div{
        margin-bottom:8px;
        
        span{
          span{
            color:var(--priceColor);
            font-weight: bold;
            font-size:14px;
            line-height: 14px;
          }
        }
      }
      p{
        line-height: 22px;
        color:#666666;
        font-size:12px;
        span{
          color:#a9a9a9;
        }
      }
      .landUse{
        width:210px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
  .list_down{
    margin-top:8px;
    em{
      color:var(--priceColor);
      padding:5px 14px 4px 11px;
      background: #fff1f1;
    }
    em,i,strong{
      display: inline-block;
      font-size:12px;
      font-weight: bold;
      margin-right:10px;
      border-radius:0 10px 0 10px;
    }
    i,strong{
      padding:5px 9px 5px 12px;
      color:#7698b8;
      background:#f2f5f7;
    }
  }
}

.headerRight {
  float: left;
  margin-right: 30px;
  position: relative;
  z-index: 10;
  /deep/ .el-select{margin-left:9px;}
  /deep/ .el-select .el-input__inner{
    width:109px;
    height: 36px;
    line-height: 36px;
    padding:0 10px;
    border-radius: 2px;
  }
  .el-icon-delete{
    margin-left:19px;
  }
  .addressBtn {
    position: relative;
    padding: 0 12px;
    height: 23px;
    line-height: 23px;
    top: 28px;
    left: 0px;
    text-align: center;
    background-color: #f2f1f9;
    border-radius: 10px;
    color: #666;
    float: left;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  .addressBtn span {
    padding-left: 12px;
  }
  .addressBtn span:hover {
    color: var(--lightColor);
  }
  .addressBtn img {
    position: absolute;
    top: 4px;
    left: 8px;
  } 
}
.headerRight .selectBox {
  float: left;
  position: relative;
  z-index: 999;
}
.findPlaceTitle {
  color: rgb(201, 201, 201);
  float: left;
  font-size: 18px;
  line-height: 60px;
}
.filtrate_warp {
  width: 90%;
  margin-left: 5%;
}
.tdzr_list {
  padding-bottom: 20px;
  // margin-top: 10px;
  .tdzr {
    border-top: 1px solid #f3f3f3;
    box-sizing: border-box;
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 20px;
    padding-top: 20px;
    .list_img {
      width: 30%;
      height: auto;
      float: left;
      position: relative;
      cursor: pointer;
      .tdzr_right_img {
        width: 100%;
        height: 157px;
      }
      .tags {
        width: 50%;
        position: absolute;
        background: var(--lightColor);
        color: #fff;
        top: 0;
        right: 0;
        text-align: center;
        padding: 0px 3px;
      }
    }
    .list_center {
      width: 50%;
      margin-left: 1%;
      float: left;
      h4 {
        line-height: 34px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
      p {
        line-height: 24px;
        color: #999999;
        font-size: 14px;
        span {
          color: #666;
        }
      }
    }
    .list_right {
      width: 19%;
      height: 157px;
      float: left;
      position: relative;
      .list_right_cen {
        position: absolute;
        right: 10px;
        top: 45%;
        color: var(--lightColor);
        font-size: 18px;
      }
    }
  }
}
.search_warp{
  .tdzr_top{
    height:74px;
    border-bottom:1px solid #d8d8d8;
    background:#f3f7fc;
    .search_body {
      box-sizing: border-box;
      margin:20px 0 0 20px;
      float: left;
      .input_text {
        display: inline-block;
        width:260px;
        height:32px;
        border-top:1px solid #d8d8d8;
        border-bottom:1px solid #d8d8d8;
        border-left:1px solid #d8d8d8;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 2px 0 0 2px;
        padding-left: 11px;
        color: #999999;
        font-size: 12px;
        &::placeholder {
          color: #999;
          font-size: 12px;
        }
      }
      i{
        color:#e4e4e5;
      }
    }
  }

}
.find_for_you{
  padding:11px 20px 11px 20px;
  font-size:12px;
  height:12px;
  line-height: 12px;
  color:#333;
  border-bottom:1px solid #d8d8d8;
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
}
</style>
<style>
.filtrate_warp .el-input__inner {
  height: 30px;
  line-height: 30px;
}
.filtrate_warp .el-select__caret {
  line-height: 32px;
}
.aside::-webkit-scrollbar {
  width: 5px; /*滚动条宽度*/
  height: 10px; /*滚动条高度*/
}
.pagingBox {
  text-align: center;
  /* padding: 0 0 30px 0; */
  padding:0;
}
.noTime {
  text-align: center;
  line-height: 440px;
  font-size: 16px;
  color: #858585;
}
/*定义滚动条轨道 内阴影+圆角*/
.aside::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: rgb(255, 255, 255); /*滚动条的背景颜色*/
}
/*定义滑块 内阴影+圆角*/
.aside::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(201, 201, 201); /*滚动条的背景颜色*/
}
</style>