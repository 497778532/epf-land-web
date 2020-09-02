<template>
  <div class="publicRegulate_warp">
    <!-- <div class="publicRegulate_title">
      <span>交易公告</span>
    </div> -->
    <!-- <div class="publicRegulate_cont">
      <ul
          v-if="compublicRegulateData && (compublicRegulateData!==[]||compublicRegulateData == '')"> -->
          <!-- v-loading="loading"
          element-loading-text="拼命加载中..."
          element-loading-background="rgba(251, 251, 251, 0.9)" -->
        <!-- <li v-for="(item,index) in compublicRegulateData" :key="index" @click="policedetail(item.id)">
          <span class="dian">・</span>{{item.noticeNo}}<span class="time">{{item.releaseTime}}</span>
        </li>
        <div class="block">
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
              class="tddiv unlimite"
              @click="filterSelectProvince('cantonProvince',-1)"
              :class="!searchInfo.cantonProvince?'filterActive':''"
            >
              <span>不限</span>
            </div>
            <div
              class="tddiv"
              :class="(searchInfo.cantonProvince && searchInfo.cantonProvince.id == item.regionCode)?'filterActive':''"
              v-for="(item,index) in regionInfo.dictionariesList"
              @click="filterSelectProvince('cantonProvince',index)"
              :key="index"
            >
              <span>{{item.regionName}}</span>
            </div>
          </td>
        </tr>
        <!-- 市级 -->
        <tr v-if="cityDiect&&cityDiect.length>0">
          <td class="td1"></td>
          <td class="td3" v-if="cityDiect&&cityDiect!==null" style="background-color: #f5f5f5;">
            <div
              class="tddiv"
             :class="!searchInfo.cantonCity?'filterActive':''"
              @click="filterSelectCity('cantonCity',-1)"
            >全部</div>
            <div
              class="tddiv"
              v-for="(item,index) in cityDiect"
              :class="(searchInfo.cantonCity && searchInfo.cantonCity.id == item.regionCode)?'filterActive':''"
              @click="filterSelectCity('cantonCity',index)"
              :key="index"
            >{{item.regionName}}</div>
          </td>
        </tr>
        <!-- 县级 -->
        <tr v-if="areaDiect&&areaDiect.length>0 && areaDiect[0].id.length < 10">
          <td class="td1"></td>
          <td class="td3" v-if="areaDiect&&areaDiect!==null" style="background-color: #f5f5f5;">
            <div
              class="tddiv"
              @click="filterSelect('cantonArea',-1)"
              :class="!searchInfo.cantonArea?'filterActive':''"
            >全部</div>
            <div
              class="tddiv"
              v-for="(item,index) in areaDiect"
              :class="(searchInfo.cantonArea && searchInfo.cantonArea.id == item.regionCode)?'filterActive':''"
              @click="filterSelect('cantonArea',index)"
              :key="index"
            >{{item.regionName}}</div>
          </td>
        </tr>
        <tr>
          <td class="td1">公告类型</td>
          <td class="td3">
            <div
              class="tddiv"
              @click="filterSelect('noticeType',-1)"
              :class="!searchInfo.noticeType ||searchInfo.noticeType == {} ?'filterActive':''"
            ><span>不限</span></div>
            <div
              class="tddiv"
               v-for="(item,index) in noticeType.dictionariesList"
               :class="(searchInfo.noticeType && searchInfo.noticeType.id == item.dictKey)?'filterActive':''"
              @click="filterSelect('noticeType',index)"
              :key="index"
            >{{item.zhCn}}</div>
          </td>
        </tr>
        <tr>
          <td class="td1">公告日期</td>
          <td class="td3">
            <div
              class="tddiv"
              style="float:left"
              @click="filterSelect('noticeTime',-1)"
              :class="!searchInfo.noticeTime?'filterActive':''"
            ><span>不限</span></div>
            <div
              class="tddiv"
              style="float:left"
              v-for="(item,index) in noticeTime"
               :class="(searchInfo.noticeTime && searchInfo.noticeTime.id == item.dictKey)?'filterActive':''"
              @click="filterSelect('noticeTime',index)"
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
                  @change="filterSelect('startTime',3)"
                ></el-date-picker>
              </el-col>
          </td>
        </tr>
      </table>
      <div style="height: 1px;background-color: #eee;"></div>
      <div class="tdzr_left_top">
        <div class="tdzr_xuanze">
          
          <p style="width: 90px;color: #333;font-size: 14px;font-weight: bold;">您已选择</p>
          <p
            id="tdzr_xuanze"
            v-for="(val,key,index) in searchInfo"
            @click="delSelect(key)"
            :key="index"
          >
            <span class="tdzr_span" v-if="val.name">{{val.name}}</span>
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
              <li :class="['sortBox',sortActive=='default'?'sortactive':'']" @click="sort('default')">默认排序</li>
              <li :class="['sortBox',sortActive=='time'?'sortactive':'']" @click="sort('time')">
                公告日期
                <span>{{this.sortOrder == "asc"?'↑':'↓'}}</span>
              </li>
            </ul>
            <div style="position:absolute;right:25px;top:5px;">
              <el-input v-model="searchText" placeholder="请输入关键字" style="width:70%;"></el-input>
              <span style="padding:0px 16px 0px 18px;color:#fff;display:inline-block;line-height:32px;background:var(--lightColor);margin-left:10px;" @click="searchBtn">搜索</span>
            </div>
          <div class="tdzr_list">
            <div class="serivemain_con">
              <ul class="serivemain_content" v-if="publicRegulateData && (publicRegulateData!==[]||publicRegulateData == '')">
                <li v-for="(item,index) in publicRegulateData" :key="index" @click="policedetail(item.id)">
              <!-- <ul class="serivemain_content" v-if="compublicRegulateData && (compublicRegulateData!==[]||compublicRegulateData == '')">
                <li v-for="(item,index) in compublicRegulateData" :key="index" @click="policedetail(item.id)"> -->

                  <div class="content_top">
                    <p>公告编号：<span>{{item.noticeNo}}</span></p>
                  </div>
                  <div class="content_middle">
                    <span v-if="item.noticeType == 'change_notice'" class="activeSpan">变更</span>
                    <span v-if="item.noticeType == 'common_notice'">普通</span>
                    <h3 v-html="item.noticeTitle"></h3>
                  </div>
                  <div class="content_bottom">
                    <span>
                      <em>交易中心：</em>
                      <i>{{item.transOrgName}}</i>
                    </span>
                    <span>
                      <em>地址：</em>
                      <i>{{item.cantonProvinceName}}/{{item.cantonCityName}}/{{item.cantonAreaName}}</i>
                    </span>
                    <span>
                      <em>公告日期：</em>
                      <i>{{item.noticeTime}}</i>
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
      searchText:"",
      loading:true,
      cityDiect: [],
      areaDiect: [],
      regionInfo:{},
      noticeType:{},
      startDate:"",
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
      publicRegulateData:[],
      totalRecord:0,
      pageSize:10,
      pageNo:1,
      //排序激活
      sortActive: "default",
      type:'notice',
      sortField:"",
      sortOrder:"",
      searchInfo: {
        startDate:{id:"begintime",name:""},
        endDate:{id:"endtime",name:""}
      },
    }
  },
  created(){
    this.searchBtn()
    this.getProvinceData()
    this.getNoticeType()
  },

  methods:{
    policedetail(noticeId){
      this.$router.push({path:'/TradePublicDetails',query:{noticeId:noticeId}})
    },
    handleSizeChange(val){
      //每页条数改变时触发
			this.pageNo = 1;
			this.pageSize = val;
      this.searchBtn()
    },
    handleCurrentChange(val){
     	//获取当前页
      this.pageNo = val;
      this.searchBtn()
    },
    // 排序根据传参判断时默认还是时间排序
    sort(typesort){
      this.sortActive = typesort
      if(this.sortActive== "time"){
        this.sortField = "insert_time";
        this.sortOrder = this.sortOrder == "asc" ?'desc': "asc"
      }else{
        this.sortField = "default";
        this.sortOrder = "";
      }
       this.searchBtn()
    },
    // 清除全部
    clearAll() {
      this.searchInfo = {};
      this.cityDiect = [];
      this.areaDiect = [];
      this.startDate = "";
      this.searchText = "";
      this.searchBtn()
    },
    // 单度删除
    delSelect(key) {
      this.$delete(this.searchInfo, key)
			this.searchBtn();
    },
    // 获取状态
    getNoticeType(){
      let that = this;
      that.$axios.get(
          `/epf-admin/dictionaries/getDictEbyDictGroup/notice_type`,
          {},
          res => {
            that.noticeType = res
          }
        );
    },
    // 省
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
          }
        }
      );
    },
    // 选择省分
    filterSelectProvince(name, index){
      //点击省级地名时，清空市级和县级地域选项
      delete this.searchInfo["cantonCity"];
      this.areaDiect = []
      if (index == -1) {
        delete this.searchInfo["cantonProvince"];
        this.cityDiect = [],
        this.areaDiect = []
        this.searchBtn()
        return;
      }
      this.searchInfo[name] = {
        id:this.regionInfo.dictionariesList[index].regionCode,
        name:this.regionInfo.dictionariesList[index].regionName,
      };
      this.getCityDiect(this.regionInfo.dictionariesList[index].regionCode)
      this.searchBtn()
    },
    // 选择城市
    filterSelectCity( name, index) {
      //点击市级地名时，清空县级地域选项
      delete this.searchInfo["cantonArea"];
      if (index == -1) {
        delete this.searchInfo["cantonCity"]
        this.cityDiect = [],
        this.areaDiect = []
        this.searchBtn()
        return;
      }
      this.searchInfo[name] = {
        id:this.cityDiect[index].regionCode,
        name:this.cityDiect[index].regionName,
      };
      this.getAreaDiect(this.cityDiect[index].id)
      this.searchBtn()
    },
    // 其他选择
    filterSelect(name, index) {
      console.log(name,index)
      if (index == -1) {
        this.areaDiect = []
        delete this.searchInfo[name]
        this.searchBtn()
        return;
      }
      if(name == 'startTime'){
        this.searchInfo.startDate = this.startDate[0]
        this.searchInfo.endDate = this.startDate[1]
      }else if(name == "noticeType"){
        this.searchInfo[name] = {id:this.noticeType.dictionariesList[index].dictKey,name:this.noticeType.dictionariesList[index].zhCn}
      }else if(name == "cantonArea"){
        this.searchInfo[name] = {id:this.areaDiect[index].regionCode,name:this.areaDiect[index].regionName}
      }else if(name == "noticeTime"){
        this.searchInfo[name] =   {id:this.noticeTime[index].dictKey,name:this.noticeTime[index].zhCn}
      }
      this.searchInfo = Object.assign({},this.searchInfo)
      this.searchBtn()
    },
    // 搜索var res = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    searchBtn() {
      let params = {
        noticeType:this.searchInfo.noticeType ? this.searchInfo.noticeType.id : '',
        cantonProvince:this.searchInfo.cantonProvince ? this.searchInfo.cantonProvince.id:'',
        cantonCity:this.searchInfo.cantonCity ? this.searchInfo.cantonCity.id:'',
        cantonArea:this.searchInfo.cantonArea ? this.searchInfo.cantonArea.id:'',
        startDate: this.startDate[0],
        endDate: this.startDate[1],
        page:this.pageNo,
        rows:this.pageSize,
        search:this.searchText,
        sortField:this.sortField,
        sortOrder:this.sortOrder,
      }
      console.log("请求参数111", params)
      if(this.searchInfo.noticeTime){
        if(this.searchInfo.noticeTime.id == "nearly30Days"){
          params.nearly30Days = 'nearly30Days'
        }else if(this.searchInfo.noticeTime.id == "nearly3Days"){
          params.nearly3Days = 'nearly3Days'
        }else{
          params.nearly7Days = 'nearly7Days'
        }
      }
      console.log(this.searchInfo)
      //搜索接口
      this.$axios.post(
        "/epf-landsearch/es/esLand/searchNotice",
       qs.stringify(params),
        res => {
          console.log("返回公示数据", res);
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
      )
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
                height:32px;
                display: flex;
                justify-content: space-between;
                color:#666;
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
                padding-right:178px;
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
}
</style>
<style>
  .el-menu-item-group__title{
    padding: 0;
  }
</style>
