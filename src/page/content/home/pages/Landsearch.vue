<template>
  <div class="land_search" id="land_search">
    <div class="search_body" style="font-size: 0">
      <!-- <input type="text" class="input_text fl" placeholder="请输入土地位置土地用途土地面积等相关信息" v-model="searchText"/> -->
      <div style="position: relative;display: inline-block;vertical-align: top;">
        <img src="@/assets/image/comma.png" alt="" style="position: absolute;top:-11px;left:-9px">
        <select class="textS" v-model="textS">
          <option value= '供给信息' label= '供给信息'></option>
          <option value= '需求信息' label= '需求信息'></option>
        </select>
      </div>
      <div class="form" style="border-bottom:7px solid #ebebeb;display: inline-block;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormOne" class="fl" style="margin-left: 10px;">
          <el-form-item style="display: inline-block;width: 176px;margin-right: 8px;" class="cascaderRegion">
            <!-- <v-region @values="regionChange" class="form-control" type="column" :area="true"></v-region> -->
            <el-cascader
              ref="cascaderRegion"
              v-model="selectedOptionsRegion"
              placeholder="请选择省市区"
              :options="cascaderDataRegion"
              clearable
              @active-item-change="handleItemChangeRegion"
              @change="RegionChange"
              :props="{
                expandTrigger: 'hover',
                value: 'id',
                label: 'name',
                key:'key',
                children: 'cities'
              }"
            ></el-cascader>
          </el-form-item>
          <el-form-item style="display: inline-block;width: 176px;margin-right: 8px;">
            <el-cascader
              ref="cascaderAddr"
              v-model="selectedOptions"
              placeholder="请选择土地用途"
              :options="cascaderData"
              clearable
              @active-item-change="handleItemChange"
              @change="landUseChange"
              :props="{
                expandTrigger: 'hover',
                value: 'id',
                label: 'name',
                key:'key',
                dictKey:'dictKey',
                children: 'cities'
              }"
            ></el-cascader>
          </el-form-item>
          <el-form-item  style="display: inline-block;width: 176px;margin-right: 8px;" v-if="plotAreaInfo&&plotAreaInfo.dictionariesEntities.length">
            <el-select ref="area" placeholder="面积" v-model="ruleForm.area" size="medium" @change="getTyep(plotAreaInfo.dictionariesEntities,ruleForm.area,$event)" >
              <el-option v-for="(item, index) in plotAreaInfo.dictionariesEntities" :ref="item.zhCn" :key="index" :label="item.zhCn" :value="item.zhCn"  :dictKey="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  style="display: inline-block;width: 186px;">
            <el-input v-model="searchText" size="medium" placeholder="请输入土地位置土地用途土地面积等相关信息"></el-input>
          </el-form-item>
        </el-form>
        <div class="epf_btn epf_btn_bg searchS fl " style="background:var(--lightColor)" @click="seniorSelect()">搜索</div>
        <div class="epf_btn epf_btn_bg searchS" @click="Map_Finding">
          <!-- <img src="@/assets/image/icon-local.png" alt /> -->
          <span>地图找地</span>
        </div>
      </div>
      <div class="search_show">
        <ul>
          <li>热门推荐：</li>
          <li v-for="(item,index) in ['转让','出租','土地','二级用地']" :key="index">
            <span>{{item}}</span>
          </li>
        </ul>
        <!-- <span class="search_span" @click="seniorSearchBlock()" v-show="seniorSearch === 1"> 更多筛选项
          <img src="@/assets/image/land_down.png" alt width="20" />
        </span>
        <span class="search_span" @click="seniorSearchNone()" v-show="seniorSearch === 2"> 隐藏
          <img src="@/assets/image/land_up.png" alt width="20" />
        </span> -->
      </div>
    </div>
    <div class="search_main" v-show="searchMainShow">
      <div class="t_myarea mt20 t_zindex1">
        <div id="search_selection">
          <div class="selection_box">
            <div class="selection_con">
              <dl class="clearfix">
                <dt>行政区域</dt>
                <dd>
                  <div class="clearfix t" v-if="regionInfo&&regionInfo!==null">
                    <span
                      :class="filterActive.cantonProvince == 0?'filterActive':''"
                      @click="filterSelect(regionInfo.dictionariesList,'cantonProvince',-1)"
                    >不限</span>
                    <span
                      :class="filterActive.cantonProvince == index+1?'filterActive':''"
                      v-for="(item,index) in regionInfo.dictionariesList?regionInfo.dictionariesList.slice(0,10):null"
                      @click="filterSelect(regionInfo.dictionariesList,'cantonProvince',index,true)"
                      :key="index"
                    >{{item.regionName}}</span>
                    <span
                      v-if="regionInfo.dictionariesList?(regionInfo.dictionariesList.length > 10):0"
                      @click="seniorSelect()"
                    >更多>></span>
                  </div>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>土地用途</dt>
                <dd>
                  <span v-show="false">{{landUseInfo}}</span>
                  <div class="clearfix t" v-if="landUseInfo&&landUseInfo!==null">
                    <span
                      :class="filterActive.firstClassUse == 0?'filterActive':''"
                      @click="filterSelect(landUseInfo.dictionariesEntities,'firstClassUse',-1)"
                    >不限</span>
                    <span
                      v-for="(item,index) in landUseInfo.dictionariesEntities?landUseInfo.dictionariesEntities.slice(0,7):null"
                      :class="filterActive.firstClassUse == index+1?'filterActive':''"
                      @click="filterSelect(landUseInfo.dictionariesEntities,'firstClassUse',index,'land_use',item.id)"
                      :key="index"
                    >{{item.zhCn}}</span>
                    <span
                      v-if="landUseInfo.dictionariesEntities?(landUseInfo.dictionariesEntities.length > 7):0"
                      @click="seniorSelect()"
                    >更多>></span>
                  </div>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>流转方式</dt>
                <dd>
                  <ul class="clearfix filterList">
                    <li>
                      <span
                        :class="filterActive.circulation == 0?'filterActive':''"
                        @click="filterSelect(flowModeInfo.dictionariesEntities,'circulation',-1)"
                      >不限</span>
                      <b></b>
                    </li>
                    <li v-if="flowModeInfo&&flowModeInfo!==null">
                      <span
                        v-for="(item,index) in flowModeInfo.dictionariesEntities"
                        :class="filterActive.circulation == index+1?'filterActive':''"
                        @click="filterSelect(flowModeInfo.dictionariesEntities,'circulation',index)"
                        :key="index"
                      >
                        {{item.zhCn}}
                        <b></b>
                      </span>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>地块面积</dt>
                <dd>
                  <ul class="clearfix filterList">
                    <li>
                      <span
                        :class="filterActive.area == 0?'filterActive':''"
                        @click="filterSelect(plotAreaInfo.dictionariesEntities,'area',-1)"
                      >不限</span>
                      <b></b>
                    </li>
                    <li v-if="plotAreaInfo&&plotAreaInfo!==null">
                      <span
                        v-for="(item,index) in plotAreaInfo.dictionariesEntities"
                        :class="filterActive.area == index+1?'filterActive':''"
                        @click="filterSelect(plotAreaInfo.dictionariesEntities,'area',index)"
                        :key="index"
                      >
                        {{item.zhCn}}
                        <b></b>
                      </span>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>{{cName}}年限</dt>
                <dd>
                  <ul class="clearfix filterList">
                    <li>
                      <span
                        :class="filterActive.years == 0?'filterActive':''"
                        @click="filterSelect(yearsUseInfo.dictionariesEntities,'years',-1)"
                      >不限</span>
                      <b></b>
                    </li>
                    <li v-if="yearsUseInfo&&yearsUseInfo!==null">
                      <span
                        v-for="(item,index) in yearsUseInfo.dictionariesEntities"
                        :class="filterActive.years == index+1?'filterActive':''"
                        @click="filterSelect(yearsUseInfo.dictionariesEntities,'years',index)"
                        :key="index"
                      >
                        {{item.zhCn}}
                        <b></b>
                      </span>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>土地类型</dt>
                <dd>
                  <ul class="clearfix filterList">
                    <li>
                      <span
                        :class="filterActive.landType == 0?'filterActive':''"
                        @click="filterSelect(landtypeInfo.dictionariesEntities,'landType',-1)"
                      >不限</span>
                      <b></b>
                    </li>
                    <li v-if="landtypeInfo&&landtypeInfo!==null">
                      <span
                        v-for="(item,index) in landtypeInfo.dictionariesEntities"
                        :class="filterActive.landType == index+1?'filterActive':''"
                        @click="filterSelect(landtypeInfo.dictionariesEntities,'landType',index)"
                        :key="index"
                      >
                        {{item.zhCn}}
                        <b></b>
                      </span>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl class="clearfix">
                <dt>土地性质</dt>
                <dd>
                  <ul class="clearfix filterList">
                    <li>
                      <span
                        :class="filterActive.landChar == 0?'filterActive':''"
                        @click="filterSelect(landNatureInfo.dictionariesEntities,'landChar',-1)"
                      >不限</span>
                      <b></b>
                    </li>
                    <li v-if="landNatureInfo&&landNatureInfo!==null">
                      <span
                        v-for="(item,index) in landNatureInfo.dictionariesEntities"
                        :class="filterActive.landChar == index+1?'filterActive':''"
                        @click="filterSelect(landNatureInfo.dictionariesEntities,'landChar',index)"
                        :key="index"
                      >
                        {{item.zhCn}}
                        <b></b>
                      </span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TMap from "@/components/common/tianditu/init";
import { mapState, mapActions } from "vuex";
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      textS:'供给信息',
      dicRequest: ["land_use"], //字典码请求
      orgList: "",
      dictionary: {
        //字典码结果
        land_use: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      cName: "转让",
      searchText: "",
      datat: {
        firstClassUseData: []
      },
      ruleForm: {
        inFotype:"",
        cantonProvince: "",
        cantonProvinceName: "",
        firstClassUse: "",
        firstClassUseName: "",
        area: ""
      },
      rules: {},
      geocoderData: "",
      filterActive: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      },
      selected: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      },
      searchInfo: {},
      list: "transfer",
      searchMainShow: false,
      searchMain: "",
      seniorSearch: 1,
      dataCode:[],
      landData:[],
      pId:null,
      pIdData:[],
      landData2:[],
      adlandData:{
        lazy:true,
        value:'',
        label:'',
      },
      departmentOptionsRegion: [],
      cascaderDataRegion: [],
      selectedOptionsRegion: [],
      departmentOptions: [],
      cascaderData: [],
      selectedOptions: [],
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
    ]),
    dataCodeCom(){
      this.dataCode = this.dictionary.administrative_regions
      return this.dataCode
    },
  },
  methods: {
    getNodesRegion (val) {
      let idArea
      let sizeArea
      if (!val) {
        idArea = 0
        sizeArea = 0
      } else if (val.length === 1) {
        idArea = val[0]
        sizeArea = val.length // 3:一级 4:二级 6:三级
      } else if (val.length === 2) {
        idArea = val[1]
        sizeArea = val.length // 3:一级 4:二级 6:三级
      }
      let url =  `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${idArea}`
      this.$axios.get(url, 
      {},
      res => {
        if (res && res.code == 0) {
          let Items = res.dictionariesList
          if (sizeArea === 0) { // 初始化 加载一级 省
            this.cascaderDataRegion= Items.map((value, i) => {
              return {
                id: value.id,
                name: value.regionName,
                key:i,
                cities: []
              }
            })
          } else if (sizeArea === 1) { // 点击一级 加载二级 市
            this.cascaderDataRegion.map((value, i) => {
              if (value.id === val[0]) {
                if (!value.cities.length) {
                  value.cities = Items.map((value, i) => {
                    return {
                      id: value.id,
                      name: value.regionName,
                      key:i,
                      cities: []
                    }
                  })
                }
              }
            })
          } else if (sizeArea === 2) { // 点击二级 加载三级 区
            this.cascaderDataRegion.map((value, i) => {
              if (value.id === val[0]) {
                value.cities.map((value, i) => {
                  if (value.id === val[1]) {
                    if (!value.cities.length) {
                      value.cities = Items.map((value, i) => {
                        return {
                          id: value.id,
                          name: value.regionName,
                          key:i,
                          cities: null
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        } else {
          console.log(res.msg)
        }
      }
      )
    },
    getNodeslandUse (val) {
      let idArea
      let sizeArea
      if (!val) {
        idArea = 0
        sizeArea = 0
      } else if (val.length === 1) {
        idArea = val[0]
        sizeArea = val.length // 3:一级 4:二级 6:三级
      } else if (val.length === 2) {
        idArea = val[1]
        sizeArea = val.length // 3:一级 4:二级 6:三级
      }
      let url=`/epf-admin/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${idArea}`
      this.$axios.get(url, 
      {},
      res => {
        if (res && res.code == 0) {
          let Items = res.dictionariesList
          if (sizeArea === 0) { // 初始化 加载一级 省
            this.cascaderData = Items.map((value, i) => {
              return {
                id: value.id,
                name: value.zhCn,
                dictKey:value.dictKey,
                key:i,
                cities: []
              }
            })
          } else if (sizeArea === 1) { // 点击一级 加载二级 市
            this.cascaderData.map((value, i) => {
              if (value.id === val[0]) {
                if (!value.cities.length) {
                  value.cities = Items.map((value, i) => {
                    return {
                      id: value.id,
                      name: value.zhCn,
                      dictKey:value.dictKey,
                      key:i,
                      cities: sizeArea === 2?[]:null
                    }
                  })
                }
              }
            })
          }else if (sizeArea === 2) { // 点击二级 加载三级 区
            this.cascaderData.map((value, i) => {
              if (value.id === val[0]) {
                value.cities.map((value, i) => {
                  if (value.id === val[1]) {
                    if (!value.cities.length) {
                      value.cities = Items.map((value, i) => {
                        return {
                          id: value.id,
                          name: value.zhCn,
                          dictKey:value.dictKey,
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        } else {
          console.log(res.msg)
        }
      }
      )
    },
    handleItemChange (val) {
      this.getNodeslandUse(val)
    },
    handleItemChangeRegion (val) {
      this.getNodesRegion(val)
    },
    // 土地用途
    landUseChange(item){
      if(item&&item.length==0){
        this.filterActive.firstClassUse = ''
        this.searchInfo.firstClassUse = ''
        this.selected.firstClassUse = ''
        this.searchInfo.firstClassUseId = ''
        this.filterActive.secondClassUse = ''
        this.searchInfo.secondClassUse = ''
        this.selected.secondClassUse = ''
      }else{
        let ItemChage = this.$refs['cascaderAddr'].getCheckedNodes()[0]
        this.cascaderData.map((e,index)=>{
          if(ItemChage.parent.value == e.id){
            this.filterActive.firstClassUse = index + 1
            this.searchInfo.firstClassUse = ItemChage.parent.data.dictKey
            this.selected.firstClassUse = e.name
            this.searchInfo.firstClassUseId = ItemChage.parent.value
          }
          e.cities.map((e1,in1)=>{
            if(ItemChage.value == e1.id){
              this.filterActive.secondClassUse = in1 + 1
              this.searchInfo.secondClassUse = ItemChage.data.dictKey
              this.selected.secondClassUse = e1.name
            }
          })
        })
      }
    },
    RegionChange(item){
      if(item&&item.length==0){
        this.filterActive.cantonProvince = ''
        this.searchInfo.cantonProvince = ''
        this.selected.cantonProvince = ''
        this.filterActive.cantonCity = ''
        this.searchInfo.cantonCity = ''
        this.selected.cantonCity = ''
        this.filterActive.cantonArea = ''
        this.searchInfo.cantonArea = ''
        this.selected.cantonArea = ''
      }else{
        let ItemChage = this.$refs['cascaderRegion'].getCheckedNodes()[0]
        this.filterActive.cantonProvince = ItemChage.pathNodes[0].data.key + 1
        this.searchInfo.cantonProvince = ItemChage.pathNodes[0].value
        this.selected.cantonProvince = ItemChage.pathNodes[0].label
        this.filterActive.cantonCity = ItemChage.pathNodes[1].data.key + 1
        this.searchInfo.cantonCity = ItemChage.pathNodes[1].value
        this.selected.cantonCity = ItemChage.pathNodes[1].label
        this.filterActive.cantonArea = ItemChage.parent.children.length>1?ItemChage.data.key + 1:null
        this.searchInfo.cantonArea = ItemChage.parent.children.length>1?ItemChage.value:null
        this.selected.cantonArea = ItemChage.parent.children.length>1?ItemChage.label:null
      }
    },
    // regionChange(data){
    //   if(data.city&&data.province.key == data.city.key){
    //     this.filterActive.cantonCity = ''
    //     this.searchInfo.cantonCity = ''
    //     this.selected.cantonCity = ''
    //   }
    //   let pId 
    //   if(data.province){pId = 0}
    //   if(data.city){pId = data.province.key}
    //   if(data.area){pId = data.city.key}
    //   this.$axios.get(
    //     `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
    //     {},
    //     res => {
    //       if (res.dictionariesList.length != 0) {
    //         res.dictionariesList.map((e,index)=>{
    //           if(data.province!==null&&e.id == data.province.key){
    //             this.filterActive.cantonProvince = index+1
    //             this.searchInfo.cantonProvince = data.province.key
    //             this.selected.cantonProvince = data.province.value
    //           }
    //           if(data.city!==null&&e.id == data.city.key){
    //             this.filterActive.cantonCity = index+1
    //             this.searchInfo.cantonCity = data.city.key
    //             this.selected.cantonCity = data.city.value
    //           }
    //           if(data.area!==null&&e.id == data.area.key){
    //             this.filterActive.cantonArea = index+1
    //             this.searchInfo.cantonArea = data.area.key
    //             this.selected.cantonArea = data.area.value
    //           }
    //         })
    //         return;
    //       }
    //     }
    //   );
    // },
    getTyep(dic, area, event) {
      this.ruleForm.area = this.$refs[area][0].value;
      let indexArea
      dic.map((e,inde)=>{
        if(e.zhCn == this.ruleForm.area){
          indexArea = inde + 1
        }
      })
      this.filterActive.area = indexArea
      this.searchInfo.area = this.$refs[area][0].$attrs.dictKey
      this.selected.area = this.ruleForm.area
    },
    listSwitchli(name, index) {
      this.list = name;
      this.filterActive["circulation"] = index + 1;
      this.selected["circulation"] = this.flowModeInfo.dictionariesEntities[index].zhCn;
      this.searchInfo["circulation"] = this.flowModeInfo.dictionariesEntities[index].dictKey;
    },
    Map_Finding() {
      //地图找地跳转
      let routeUrl = this.$router.resolve({
        path: "/mapFindPlace"
      });
      window.open(routeUrl.href, "_blank");
    },
    seniorSearchBlock() {
      window.scrollTo(0, 0);
      this.searchMainShow = true;
      this.seniorSearch = 2;
    },
    seniorSearchNone() {
      this.searchMainShow = false;
      this.seniorSearch = 1;
    },
    filterSelect1(data, name, index) {
      this.filterActive[name] = index + 1;
      this.selected[name] = data[index].zhCn;
      this.searchInfo[name] = data[index].dictKey;
    },
    filterSelect(data, name, index, code, id) {
      // if(code===true){
      //   this.search(data[index].zhCn)
      // }
      if (index === -1) {
        this.filterActive[name] = 0;
        this.selected[name] = null;
        this.searchInfo[name] = null;
        //改bug931
        this.cName = "使用";
        return;
      }
      this.filterActive[name] = index + 1;
      this.selected[name] = data[index].zhCn;
      this.searchInfo[name] = data[index].dictKey;
      //改bug931
      if (name == "circulation") {
        this.cName = data[index].zhCn;
      }
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
    search(cityName) {
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
            creditLongitude: _this.geocoderData.lat //纬度
            // creditProvince:'',
            // creditStreet:''
          };
          sessionStorage.setItem("Address", JSON.stringify(addObj)); //保存
          console.log("您选择的城市", addObj);
          this.$bus.$emit("callFun");
        } else {
          this.$message({
            center: true,
            message: "地理编码接口错误",
            type: "error"
          });
        }
      }
    },
    seniorSelect() {
      if(this.selected.cantonCity==''){
        this.selected.cantonCity = this.selected.cantonArea
        this.selected.cantonArea = null
        this.filterActive.cantonCity = this.filterActive.cantonArea
        this.filterActive.cantonArea = 0
        this.searchInfo.cantonCity = this.searchInfo.cantonArea
        this.searchInfo.cantonArea = null
      }
      this.searchInfo["search"] = this.searchText;
      this.$store.searchInfo = this.searchInfo;
      this.$store.selected = this.selected;
      this.$store.filterActive = this.filterActive;

      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      console.log(localStorage.getItem("selected"));
      console.log(localStorage.getItem("filterActive"));
      console.log(localStorage.getItem("searchInfo"));
      console.log(!this.searchText)

      if (this.searchText) {
        let url;
        this.textS=='供给信息'?url='/seniorSearch':url='/demandSearch'
        this.$router.push({path: url,query: { search: this.searchText?this.searchText:'' }});
        return;
      }
      let url;
      this.textS=='供给信息'?url='/seniorSearch':url='/demandSearch'
      this.$router.push({path: url});
    },
  },
  created() {
    this.filterActive["circulation"] = 1;
    this.selected["circulation"] = "转让";
    this.searchInfo["circulation"] = "transfer";
    this.filterActive["circulation"] = 0;
    this.selected["circulation"] = "";
    this.searchInfo["circulation"] = "";
  },
  mounted() {
    this.getNodesRegion()
    this.getNodeslandUse()
    setTimeout(this.getPosition(), 100); //自动执行
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.land_search {
  @include size(100%, 100%);
  padding: 15px 20px;
  background-color: #ffffff;
  .search_top {
    width: 100%;
    ul {
      li {
        display: inline-block;
        margin-right: 40px;
        font-size: 16px;
        color: #666;
        line-height: 30px;
        cursor: pointer;
      }
      .lihover {
        color: var(--Colors);
        border-bottom: 4px solid var(--Colors);
        border-radius: 2px;
        font-weight: 550;
      }
    }
  }
  .search_body {
    .input_text {
      @include size(826px, 44px);
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
      @include size(108px, 44px);
      background-color: var(--Colors);
      line-height: 44px;
      font-size: 16px;
    }
    .search_show {
      @include size(83%, auto);
      font-size: 14px;
      color: #999999;
      overflow: hidden;
      ul {
        margin-top:10px;
        li {
          display: inline-block;
          margin-right: 10px;
        }
      }
      .search_span {
        color: var(--Colors);
        float: right;
        cursor: pointer;
        img {
          display: inline-block;
          @include size(14px, 14px);
          margin-top: 4px;
          margin-left: 5px;
        }
      }
    }
  }
  .search_main {
    #search_selection {
      @include size(1120px, auto);
      position: relative;
      padding: 1px;
      background: #fff;
      .selection_con {
        background: #fff;
        border-radius: 5px;
        position: relative;
        // min-height: 106px;
        // padding: 10px 15px 5px 15px;
        position: relative;
        font-size: 14px;
        border: none;
        dl {
          padding: 4px 0;
          border-top: solid 1px #f3f3f3;
          position: relative;
          dt {
            float: left;
            text-align: center;
            font-weight: bold;
            padding-top: 7px;
            padding: 7px 15px 0 15px;
            font-size: 14px;
            color: #666666;
            font-weight: bold;
          }
          dd {
            float: left;
            width: 1000px;
            position: relative;
            span {
              display: block;
              float: left;
              padding: 0 5px;
              margin-right: 26px;
              color: #333333;
              float: left;
              margin-top: 7px;
              position: relative;
              // z-index: 2;
              cursor: pointer;
            }
            // span:hover {
            //   color: var(--Colors)
            // }
            span.active {
              color: var(--Colors);
              position: relative;
            }
            .filterActive {
              color: #fff;
              background: #fab510;
              border-radius: 3px;
            }
            span.active2 {
              color: #fff;
              // background: var(--Colors);
              border-radius: 5px;
              display: block;
              height: 100%;
              border: 1px solid #fff;
              color: var(--Colors);
            }
            li {
              vertical-align: top;
              .tag {
                position: relative;
                // z-index: 2;
              }
              .filterActive {
                color: #fff;
                background: #fab510;
                border-radius: 3px;
              }
            }
            .con {
              position: absolute;
              left: 60px;
              top: 40px;
              padding: 3px 5px 10px 5px;
              font-size: 12px;
              display: none;
              width: 85%;
              background-color: #f5f5f5;
              border-radius: 2px;
              color: #555555;
              .active2 {
                color: var(--Colors);
                background: #fff;
              }
              // .filterActive{
              //   color: #fff;
              //   background: #fab510;
              //   border-radius: 3px;
              // }
            }
          }
        }
        dl.last {
          border-bottom: solid 1px #f3f3f3;
          padding-bottom: 7px;
          a {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.textS{
  width: 180px;
  font-size:20px;
  display: inline-block;
  font-weight: bold;
  color: var(--lightColor);
  height:56px;
  border:7px solid #ebebeb;
  vertical-align: bottom;
  padding-left: 20px;
}
</style>
<style>
.form .el-form-item{
  margin-bottom: 4px;
}
.form .el-input--medium .el-input__inner {
  height: 44px;
  line-height: 44px;
}
.form .rg-caller-container .rg-default-btn{
  display: inline-block;
  width: 176px;
  margin-right: 3px;
  border: 1px solid #DCDFE6;
  height:44px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color:#c4c3d6;
  color:#606266;
  text-align: left;
  padding-left: 25px;
}
.cascaderRegion .el-input--suffix::after{
  content: '';
  background: url("../../../../assets/image/index_mapIcon.png") no-repeat center;
  display: block;    
  width: 13px; 
  height: 16px;
  position:absolute;
  left:5px;
  top:12px;
  cursor: pointer;
}

.cascaderRegion .el-input--suffix .el-input__inner{
  padding-left:20px;
}
.rg-caret-down{
  float: right;
  vertical-align: middle;
  margin-top:10px;
}
.rg-column::-webkit-scrollbar{
  width:6px;
  /* background-color: #0e487c; */
}
.rg-column::-webkit-scrollbar-thumb{
  background-color: rgba(144,147,153,.3);
  border-radius: inherit;
  background-color: rgba(144,147,153,.3);
  -webkit-transition: .3s background-color;
  transition: .3s background-color;
  /* background-color: #4facfa; */
}
div.rg-column-container .rg-column li.selected{
  color: var(--lightColor);
  background: #F5F7FA;
}
div.rg-column-container .rg-column li:hover {
  background: #F5F7FA;

}

.rg-default-btn:hover{
  color:#c4c3d6;
}
.rg-default-btn:hover {
    border: 1px solid #C0C4CC;
}
.rg-default-btn span.rg-clear-btn{
  display: none;
}
.rg-default-btn.rg-opened:hover,.rg-default-btn.rg-opened{

  border-color: var(--lightColor);
}
</style>
