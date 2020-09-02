<template>
  <div class="publicRegulate_warp">
    <!-- <div class="publicRegulate_title">
      <span>结果公示</span>
    </div>
    <div class="publicRegulate_cont">
      <ul v-if="compublicRegulateData && (compublicRegulateData!==[]||compublicRegulateData == '')">
        <li v-for="(item,index) in compublicRegulateData" :key="index" @click="policedetail(item.id, item.targetId)">
          <span class="dian">・</span>{{item.publictTitle}}:{{item.targetNo}}<span class="time">{{item.endTransTime}}</span>
        </li>
        <div class="block" v-if="compublicRegulateData.length!==0">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            :page-size="pageSize"
            :current-page.sync="pageNo"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord">
          </el-pagination>
          <div class="pagS"></div>
        </div>
      </ul> 
      <div v-if="compublicRegulateData==[]||compublicRegulateData == ''" style="text-align: center;">
        <img src="../../../../assets/image/dataNone.png" alt="" style="margin-top:40px;">
      </div> 
    </div> -->
    <div class="tdzr_table">
      <table cellpadding="0" cellspacing="0">
        <tr>
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
          <td class="td1">交易方式</td>
          <td class="td3"   v-if="transTypeInfo && transTypeInfo!==null">
            <div
              class="tddiv"
              @click="filterSelect(transTypeInfo,'transType',-1)"
              :class="filterActive.transType == 0?'filterActive':''"
            ><span>不限</span></div>
            <div
              class="tddiv"
              v-for="(item,index) in transTypeInfo"
              :class="filterActive.transType == index+1?'filterActive':''"
              @click="filterSelect(transTypeInfo,'transType',index,true)"
              :key="index"
            >{{item.zhCn}}</div>
          </td>
        </tr>
        <tr>
          <td class="td1">交易类型</td>
          <td class="td3" v-if="circulationInfo && circulationInfo!==null">
            <div
              class="tddiv"
              @click="filterSelect(circulationInfo,'circulation',-1)"
              :class="filterActive.circulation == 0?'filterActive':''"
            ><span>不限</span></div>
            <div
              class="tddiv"
              v-for="(item,index) in circulationInfo"
              :class="filterActive.circulation == index+1?'filterActive':''"
              @click="filterSelect(circulationInfo,'circulation',index,true)"
              :key="index"
            >{{item.zhCn}}</div>
          </td>
        </tr>
             <tr>
          <td class="td1">成交日期</td>
          <td class="td3"  v-if="noticeTime && noticeTime!==null">
            <div
              class="tddiv"
              style="float:left"
              @click="filterSelect(noticeTime,'noticeTime',-1)"
              :class="filterActive.noticeTime == 0?'filterActive':''"
            ><span>不限</span></div>
            <div
              class="tddiv"
              style="float:left"
              v-for="(item,index) in noticeTime"
              :class="filterActive.noticeTime == index+1?'filterActive':''"
              @click="filterSelect(noticeTime,'noticeTime',index,true)"
              :key="index"
            >{{item.zhCn}}</div>
              <el-col :span="3" style="width: 226px;padding:0;float:left">
                <el-date-picker
                  v-model="startDate"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                  @change="selectDatarange"
                ></el-date-picker>
              </el-col>
          </td>
        </tr>
      </table>
      <div style="height: 1px;background-color: #eee;"></div>
      <div class="tdzr_left_top">
        <div class="tdzr_xuanze">
          <p style="width: 90px;color: #333;font-size: 14px;font-weight: bold;">您已选择</p>
          <p id="tdzr_xuanze" v-for="(val, key, index) in selected" @click="delSelect(key)" :key="index">
            <span v-show="val" class="tdzr_span">{{val}}</span>
          </p>
          <a href="javascript:void(0)" @click="clearAll()">全部删除</a>
        </div>
        <div class="clear" style="background-color: #eee;"></div>
      </div>
    </div>
     <div class="landmain win1200">
      <div class="tdzr_main">
        <div class="tdzr_left" style="position:relative">
          <ul class="tdzr_listtop">
            <li :class="['sortBox',sortActive=='default'?'sortactive':'']" @click="sortDefault">默认排序</li>
            <li :class="['sortBox',sortActive=='time'?'sortactive':'']" @click="sortTime">
              成交时间
              <span>{{this.timeSort?'↑':'↓'}}</span>
            </li>
          </ul>
          <div style="position:absolute;right:25px;top:5px;">
            <el-input v-model="inputSearch" placeholder="请输入关键字" style="width:70%"></el-input>
            <span style="padding:0px 16px 0px 18px;color:#fff;display:inline-block;line-height:32px;background:var(--lightColor);margin-left:10px;" @click="searchBtn">搜索</span>
          </div>
          <div class="tdzr_list">
            <div class="serivemain_con">
              <ul class="serivemain_content" v-if="publicRegulateData && (publicRegulateData!==[]||publicRegulateData == '')">
                <li  v-for="(item,index) in publicRegulateData" :key="index" @click="policedetail(item.id, item.targetId)">
                  <div class="content_top">
                    <p>标的编号：<span>{{item.targetNo}}</span></p>
                  </div>
                  <div class="content_middle">
                    <span class="activeSpan">{{item.circulationName}}</span>
                    <h3><strong style="color:var(--lightColor);font-size:18px;">[{{item.transTypeName}}]</strong><font v-html="item.publictTitle"></font></h3>
                  </div>
                  <div class="content_bottom">
                    <span>
                      <em>公示发布机构：</em>
                      <i>{{item.transOrgName}}</i>
                    </span>
                    <span>
                      <em>所属行政区域：</em>
                      <i>{{item.cantonProvinceName}}/{{item.cantonCityName}}/{{item.cantonAreaName}}</i>
                    </span>
                    <span>
                      <em>成交时间</em>
                      <i>{{item.endTransTime}}</i>
                    </span>
                  </div>
                </li>
              </ul>
              <div
                v-if="publicRegulateData == [] || publicRegulateData == ''"
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
import {mapState,mapActions} from 'vuex';
import qs from "qs";
export default {
  data() {
    return {
      publicRegulateData:[
        
      ],
      cityShow: false,
      areaShow: false,
      loading:true,
      inputSearch:"",
      filterActive: {
        cantonProvince:0,
        noticeTime:0,
        circulation:0,
        transType:0
      },
      //排序激活
      sortActive: "default",
      //排序切换
      timeSort: null,

      selected:{},
      searchInfo: {},
      cityDiect: [],
      areaDiect: [],
      regionInfo:{},
      totalRecord:0,
      pageSize:10,
      pageNo:1,
      type:'results',
      noticeTime:[
        {
          zhCn:'最近3天',
          dictKey:"nearly3Days"
        },
        {
          zhCn:'最近7天',
          dictKey:"nearly7Days"
        },
        {
          zhCn:'最近30天',
          dictKey:"nearly30Days"
        }
      ],
      transTypeInfo:[
          {
            zhCn:'挂牌',
            dictKey:"baee14bf-95cd-42df-aa50-0c3ce01adf58"
          },
          {
            zhCn:'拍卖',
            dictKey:"8192143d-8910-4a4e-a62b-7bfdaed10afd"
          },
          {
            zhCn:'协议交易',
            dictKey:"agree_deal"
          }
        ],
       circulationInfo:[
          {
            zhCn:'转让',
            dictKey:"transfer"
          },
          {
            zhCn:'出租',
            dictKey:"rent"
          }
        ],
      startDate:"",
      searchNotice:{
        // transType:'',
        // circulation:'',
        // cantonProvince:'',       
        // cantonCity:'',       
        // cantonArea:'',       
        // nearly3Days:'',        
        // nearly7Days:'',        
        // nearly30Days:'',
        // startDate:null,      
        // endDate:null,   
        page:1,       
        rows:10
      }
    }
  },
  created(){
    this.getProvinceData()
    this.getSearchNotice()
  },
  mounted() {
    if (this.searchNotice["cantonCity"]) {
      //1、加载字典
      this.getCityDiect(this.searchNotice["cantonProvince"]);
      this.cityShow = true;
    }
    if (this.searchNotice["cantonArea"]) {
      //1、加载字典
      this.getAreaDiect(this.searchNotice["cantonCity"]);
      this.areaShow = true;
    }
  },
  methods:{
    selectDatarange() {
      //选择日期范围后的回调
      this.selected['noticeTime'] = '';
      this.searchInfo['noticeTime'] = '';
      this.filterActive['noticeTime'] = -2;

      this.searchNotice['nearly3Days'] = ''
      this.searchNotice['nearly7Days'] = ''
      this.searchNotice['nearly30Days'] = ''
      this.selected['nearly3Days'] = ''
      this.selected['nearly7Days'] = ''
      this.selected['nearly30Days'] = ''
      this.selected['startDate'] =this.startDate!=null?this.startDate[0]:'';
      this.selected['endDate'] = this.startDate!=null?this.startDate[1]:'';

      this.searchNotice['startDate'] =this.startDate!=null?this.startDate[0]:'';
      this.searchNotice['endDate'] = this.startDate!=null?this.startDate[1]:'';

      if(this.startDate == null){
        this.filterActive['noticeTime'] = -1;
      }
      this.getSearchNotice()
    },
    getSearchNotice(){
      //交易大厅-交易公告-列表

      let prams = this.searchNotice
      console.log("====prams====",prams)
      this.$axios.post(
        "/epf-landsearch/es/esLand/searchPublicity",
        qs.stringify(prams),
        res => {
          if(res.code == "0") {
            this.loading = true;
            this.publicRegulateData = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
          }else{
            this.loading = true
          }
        }
      );
    },
    // fatchData(){
    //   let parmas = {
    //     type:this.type,
    //     page:this.pageNo,
    //     rows:this.pageSize,
    //   }
    //   this.getNoticeOrResultMoreList(parmas)
    // },
    policedetail(id, targetId){
      this.$router.push({path:'/ResultsPublicityDetails',query:{noticeId:id, targetId: targetId}})
    },
    // handleSizeChange(val){
    //   this.pageSize = val
    //   this.fatchData()
    // },
    // handleCurrentChange(val){
    //   this.pageNo = val
    //   this.fatchData()
    // },
    handleSizeChange(val){
      //每页条数改变时触发
			this.pageNo = 1;
			this.pageSize = val;
      this.getSearchNotice()
    },
    handleCurrentChange(val){
     	//获取当前页
      this.pageNo = val;
      this.getSearchNotice()
    },
    sortDefault(){
      this.searchNotice["page"] = 1;
      this.sortActive = "default";
      this.searchNotice["sortField"] = "";
      this.searchNotice["sortOrder"] = "";
      this.getSearchNotice(this.searchNotice)
    },
    //时间排序
    sortTime() {
      this.searchNotice["page"] = 1;
      this.sortActive = "time";
      //清空已有排序值
      if (this.timeSort == null) {
        this.timeSort = false;
      } else {
        this.timeSort = !this.timeSort;
      }
      console.log(this.timeSort);
      this.searchNotice["sortField"] = "insert_time";
      this.searchNotice["sortOrder"] = this.timeSort ? "asc" : "desc";
      console.log(this.searchNotice);
      this.getSearchNotice(this.searchNotice)
    },
    getProvinceData() {
        let that = this;
        that.$axios.get(
          `/epf-cms/regionals/getAreaByCodeOrParentId`,
          { parentId: "000000" },
          res => {
            that.regionInfo = res;
          }
        );
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
      //点击省级地名时，清空市级和县级地域选项
      this.filterActive["cantonCity"] = 0;
      this.selected["cantonCity"] = null;
      this.searchNotice["cantonCity"] = null;
      this.filterActive["cantonArea"] = 0;
      this.selected["cantonArea"] = null;
      this.searchNotice["cantonArea"] = null;
      if (index == -1) {
        this.cityShow = false; //市级城市不显示
        this.cityDiect = ""; //清空市级字典
        this.areaShow = false; //县级城市不显示
        this.areaDiect = ""; //清空县级字典

        this.filterSelect(data, name, index); //清空选中的省级地名
        return;
      }
      this.getCityDiect(data[index].id); //加载市级字典
      this.filterSelect(data, name, index); //设置选中的省级地名
      this.cityShow = true; //市级城市显示
      this.areaShow = false; //县级城市不显示
      this.areaDiect = ""; //清空县级字典
    },

    filterSelectCity(data, name, index, code) {
      //点击市级地名时，清空县级地域选项
      this.filterActive["cantonArea"] = 0;
      this.selected["cantonArea"] = null;
      this.searchNotice["cantonArea"] = null;
      if (index == -1) {
        //不限地名条件
        this.areaShow = false; //市级城市不显示
        this.areaDiect = ""; //清空市级字典

        this.filterSelect(data, name, index); //清空选中的市级地名
        return;
      }
      this.getAreaDiect(data[index].id); //获取县的城市字典
      this.filterSelect(data, name, index); //设置选中的市级地名
    },

    filterSelect(data, name, index, code) {
      // console.log("=========data, name, index, code=====",name, index, code)
      if (index === -1) {
        this.filterActive[name] = 0;
        this.selected[name] = null;
        this.searchNotice[name] = null
        if(name == 'noticeTime'){
          this.selected['noticeTime'] = '';
          this.searchNotice['noticeTime'] = '';
          this.filterActive['noticeTime'] = index + 1;

          this.searchNotice['nearly3Days'] = ''
          this.searchNotice['nearly7Days'] = ''
          this.searchNotice['nearly30Days'] = ''
          this.selected['nearly3Days'] = ''
          this.selected['nearly7Days'] = ''
          this.selected['nearly30Days'] = ''
        }
        console.log(this.searchNotice)
        this.getSearchNotice(this.searchNotice)
        this.inputSearch = ""
        return;
      }
      this.filterActive[name] = index + 1;
      if(name == 'noticeTime'){
        this.startDate=""
        this.searchNotice['startDate'] ='';
        this.searchNotice['endDate'] = '';
        this.selected['startDate'] = "";
        this.selected['endDate'] = "";

        data[index].dictKey=='nearly3Days'?this.searchNotice.nearly3Days = "nearly3Days":this.searchNotice.nearly3Days = ''
        data[index].dictKey=='nearly7Days'?this.searchNotice.nearly7Days = "nearly7Days":this.searchNotice.nearly7Days = ''
        data[index].dictKey=='nearly30Days'?this.searchNotice.nearly30Days = "nearly30Days":this.searchNotice.nearly30Days = ''

        data[index].dictKey=='nearly3Days'?this.selected.nearly3Days = '最近3天':this.selected.nearly3Days = ''
        data[index].dictKey=='nearly7Days'?this.selected.nearly7Days = '最近7天':this.selected.nearly7Days = ''
        data[index].dictKey=='nearly30Days'?this.selected.nearly30Days = '最近30天':this.selected.nearly30Days = ''
        
      }else if(name == 'cantonCity' || name == 'cantonProvince' || name == 'cantonArea'){
        this.selected[name] = data[index].regionName;
        this.searchNotice[name] = data[index].regionCode;

      } else {
        this.selected[name] = data[index].zhCn;
        this.searchNotice[name] = data[index].dictKey;
      } 
      this.selected = Object.assign({},this.selected)
      console.log("===this.searchNotice======",this.searchNotice)
      this.getSearchNotice(this.searchNotice)
      this.inputSearch = ""
    },
    clearAll() {
        this.cityShow = false;
        this.areaShow = false;
        this.searchNotice = {};
        this.filterActive = {
          cantonProvince:0,
          noticeTime:0,
          circulation:0,
          transType:0
        };
        this.selected = {};
        this.startDate="",
        this.inputSearch = ""
        this.getSearchNotice(this.searchNotice)
        this.inputSearch = ""
      },
      delSelect(key) {
        if(key == 'cantonProvince'){
          this.cityShow = false;
        }
        if(key == 'cantonCity'){
          this.areaShow = false;
        }
        if(key == "startDate" || "endDate"){
          this.startDate =  ""
        }
        this.selected[key] = ""
        this.filterActive[key] = ""
        this.searchNotice[key] = ""        
        this.searchNotice["search"] = this.inputSearch
        this.getSearchNotice(this.searchNotice)
        this.inputSearch = ""
      },
      searchBtn(){
        this.searchNotice["search"] = this.inputSearch;
        this.getSearchNotice(this.searchNotice)
      }
    }
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
.publicRegulate_warp{
  @include size(100%,auto);
   background:#f2f1f9;
  .tdzr_table {
      clear: both;
      padding-left:25px;
      margin-bottom:10px;
      background: #fff;
      table {
        tr {
          td {
            color: #555555;
            line-height: 49px;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            .tddiv {
              padding: 0 20px;
              display: inline-block;
              cursor: pointer;
              color:#7a7a7a;
            }
            .filterActive {
              color: var(--lightColor);
              font-weight: bold;
            }
          }
          .td1 {
            width: 80px;
            font-size: 14px;
            font-weight: bold;
            color:#666;
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
      a {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        padding: 0 10px 0 30px;
        color: var(--lightColor);
        font-weight: bold;
        display: inline-block;
        margin: 0 10px 0 3px;
        border: none;
        background: url("../../../../assets/image/land_02.png") left no-repeat;
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
        /deep/ .el-input__inner{
          height:32px;
          line-height: 32px;
          margin-top:4px;
        }
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
              li{
                height:98px;
                padding:16px 23px 18px;
                border-bottom: 1px solid #ebebeb;
              }
              .content_top{
                background:url("../../../../assets/image/nootice_title_bg.png") no-repeat center;
                display: flex;
                justify-content: space-between;
                color:#666;
                height:32px;
                margin-bottom:14px;
                p{
                  font-weight: bold;
                  margin-top:10px;
                  line-height: 12px;
                  padding-left:12px;
                  span{
                    font-weight: normal
                  }
                }
              }
              .content_middle{
                line-height: 18px;
                span{
                  display: inline-block;
                  width: 49px;
                  padding:5px 0 4px 0;
                  border-radius: 0 8px 0 8px;
                  background: pink;
                  text-align: center;
                  font-size:12px;
                  line-height: 12px;
                  font-weight: bold;
                  background: #f2f5f7;
                  color:var(--lightColor);
                  margin-right:10px;
                  vertical-align: top;
                }
                .activeSpan{
                  background:#fff1f1;
                  color:var(--priceColor);
                }
                h3{
                  display: inline-block;
                  font-weight: bold;
                  font-size:18px;
                }
              }
              .content_bottom{
                margin-top:12px;
                display: flex;
                justify-content:space-between;
                span{
                  display: inline-block;
                em{
                  color:#999;
                }
                i{
                  color:#666
                }
                }
              
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
  // .publicRegulate_title{
  //   @include size(100%,40px);
  //   border-bottom: 1px solid #f3f3f3;
  //   color: var(--Colors);
  //   font-size: 16px;
  //   span{
  //     border-bottom: 1px solid var(--Colors);
  //     height: 40px;
  //     display: inline-block;
  //     padding: 0 5px;
  //     font-weight: bold;
  //   }
  // }
  // .publicRegulate_cont{
  //   @include size(100%,auto);
  //   li{
  //     @include size(100%,auto);
  //     line-height: 54px;
  //     font-size: 14px;
  //     color: #666666;
  //     cursor: pointer;
  //     border-bottom:1px solid #f3f3f3;
  //     .time{
  //       float: right;
  //     }
  //     .dian{
  //       color: var(--Colors);
  //     }
  //   }
  //   li:hover{
  //     color: var(--Colors);
  //   }
  //   .block{
  //     width:85%;
  //     margin:10px auto 20px;
  //   }
  // }
}
</style>
