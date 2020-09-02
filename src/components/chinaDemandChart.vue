<template>
  <div class="chart_message" :class="this.$route.path == '/'?'active':''">
    <div id="chinaDemandChart" style="width:740px;height:575px;" ref="mapDemandChart"></div>
    <div class="chart_table" v-if="this.$route.path == '/'">
      <table
        width="100%"
        max-width="100%"
        border="1"
        cellpadding="4"
        cellspacing="0"
        bordercolor="#c5defb"
        style="table-layout:fixed;text-align:center;"
        bgcolor="#edf8ff"
      >
        <tr height="40px" style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
          <td colspan="3">建设用地统计表（近一个月）</td>
        </tr>
        <tr height="40px" style="color:#999;">
          <td>土地用途</td>
          <td>求租</td>
          <td>求购</td>
        </tr>
        <tr height="40px" v-for="(item,index) in useData" :key="index">
          <td>{{item.firstClassUseName}}</td>
          <td>{{item.qzNum?item.qzNum:0}}</td>
          <td>{{item.qgNum?item.qgNum:0}}</td>
        </tr>
      </table>
    </div>
    <div class="chart_table"  v-if="this.$route.path == '/landData'">
      <table
        width="100%"
        max-width="100%"
        border="1"
        cellpadding="4"
        cellspacing="0"
        bordercolor="#c5defb"
        style="table-layout:fixed;text-align:center;"
        bgcolor="#edf8ff"
      >
        <tr height="40px" style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
          <td colspan="3">土地需求用途占比分析</td>
        </tr>
        <tr height="40px" style="color:#999;">
          <td>土地用途</td>
          <td>宗数</td>
          <td>占比（宗数）</td>
        </tr>
        <tr height="40px" v-for="(item,index) in useData" :key="index">
          <td>{{item.firstClassUseName}}</td>
          <td>{{item.number}}</td>
          <td>{{item.proportion}}%</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import moment from "moment";
import "../../static/map/js/china";
export default {
  props: [
    "timeStartMessage",
    "timeEndMessage",
    "currentMessage",
    "activeTabsMessage"
  ],
  data() {
    return {
      typeData:"",
      currentNO: 0,
      activeTabsName: "demand",
      // timeStartData: "",
      // timeEndData: "",
      // start:moment().month(moment().month()).startOf("month").format("YYYY-MM-DD"), //本月开始时间,
      // end:moment().month(moment().month()).endOf("month").format("YYYY-MM-DD"), //本月结束时间,
      start:"",
      end:"", //本月结束时间,
      
      timeStartData: moment()
        .year(moment().year())
        .startOf("year")
        .format("YYYY-MM-DD"), //开始日期时间
      timeEndData: moment()
        .year(moment().year())
        .endOf("year")
        .format("YYYY-MM-DD"), //结束日期时间

      params: {
        cantonProvince: "",
        // publishTimeBegin: "",
        startDate:"",
        // publishTimeEnd: ""
        endDate:""
      },

      mapAllData: [],
      valueAllDataMax: "",
      mapName: "china",

      useData: [],

      chart: null,
      timeFn: null,
      mapCode: "",
      endDate:"",
      pro: {
        上海: "../../static/map/json/province/shanghai.json",
        河北: "../../static/map/json/province/hebei.json",
        山西: "../../static/map/json/province/shanxi.json",
        内蒙古: "../../static/map/json/province/neimenggu.json",
        辽宁: "../../static/map/json/province/liaoning.json",
        吉林: "../../static/map/json/province/jilin.json",
        黑龙江: "../../static/map/json/province/heilongjiang.json",
        江苏: "../../static/map/json/province/jiangsu.json",
        浙江: "../../static/map/json/province/zhejiang.json",
        安徽: "../../static/map/json/province/anhui.json",
        福建: "../../static/map/json/province/fujian.json",
        江西: "../../static/map/json/province/jiangxi.json",
        山东: "../../static/map/json/province/shandong.json",
        河南: "../../static/map/json/province/henan.json",
        湖北: "../../static/map/json/province/hubei.json",
        湖南: "../../static/map/json/province/hunan.json",
        广东: "../../static/map/json/province/guangdong.json",
        广西: "../../static/map/json/province/guangxi.json",
        海南: "../../static/map/json/province/hainan.json",
        四川: "../../static/map/json/province/sichuan.json",
        贵州: "../../static/map/json/province/guizhou.json",
        云南: "../../static/map/json/province/yunnan.json",
        西藏: "../../static/map/json/province/xizang.json",
        陕西: "../../static/map/json/province/shanxi.json",
        甘肃: "../../static/map/json/province/gansu.json",
        青海: "../../static/map/json/province/qinghai.json",
        宁夏: "../../static/map/json/province/ningxia.json",
        新疆: "../../static/map/json/province/xinjiang.json",
        北京: "../../static/map/json/province/beijing.json",
        天津: "../../static/map/json/province/tianjin.json",
        重庆: "../../static/map/json/province/chongqing.json",
        香港: "../../static/map/json/province/xianggang.json",
        澳门: "../../static/map/json/province/aomen.json",
        台湾: "../../static/map/json/province/taiwan.json"
      }
    };
  },
  methods: {
    // 获取时间
    getLastMonth() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;//0-11表示1-12月
        var day = now.getDate();
        this.end = year + '-' + month + '-' + day; 
        var nowMonthDay = new Date(year, month, 0).getDate();    //当前月的总天数
        if(month - 1 <= 0){ //如果是1月，年数往前推一年<br>　　　　 
            this.start = (year - 1) + '-' + 12 + '-' + day;
        }else{
            var lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();  
            if(lastMonthDay < day){    //1个月前所在月的总天数小于现在的天日期
                if(day < nowMonthDay){        //当前天日期小于当前月总天数
                    this.start = year + '-' + (month - 1) + '-' + (lastMonthDay - (nowMonthDay - day));
                }else{
                    this.start = year + '-' + (month - 1) + '-' + lastMonthDay;
                }
            }else{
                this.start = year + '-' + (month - 1) + '-' + day;
            }
        }
        console.log(this.end,"---",this.start)
    },

    async loadMapDemand(mapCode, name) {
      //请求数据
      let params = this.params;
      params["startDate"] = this.$route.path=="/" ? this.start : this.timeStartData;
      params["endDate"] = this.$route.path=="/" ? this.end : this.timeEndData;
      params["cantonProvince"] = sessionStorage.getItem("sdProvince");

      this.$axios.get(
        // `/epf-monitor/purchase/queryGroupByCanton`,
        
        // `/epf-monitor/statistics/trans/queryGroupByCanton`,
        `/epf-landweb/tpurchase/purchaseClassUseAnalys`,//新接口
        params,
        mapRes => {
          console.log(mapRes.hotRes);

          // let chartData = mapRes.pager.results;
          let chartData = mapRes.hotRes;
          console.log(chartData);

          var valueAllData = [];
          for (var key in chartData) {
            // valueAllData.push(chartData[key].counNumb);
            ///////////////////////////////////
            valueAllData.push(chartData[key].pureCount);
          }

          var valueAllDataMax = Math.max.apply(Math, valueAllData);
          console.log(valueAllData);
          console.log(valueAllDataMax);

          function getData(Data, AllData, shengM) {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                // value: Data[key].counNumb,
                // xqData: Data[key].counNumb,
                ///////////////////
                value: Data[key].pureCount,
                xqData: Data[key].pureCount,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity
              });
            }
          }

          function getCityData(Data, AllData) {
            for (var key in Data) {
              AllData.push({
                // value: Data[key].counNumb,
                // xqData: Data[key].counNumb,
                ///////////////////
                value: Data[key].pureCount,
                xqData: Data[key].pureCount,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity
              });
            }
          }

          //北京数据
          var beiJingAllData = [];

          var beiJingData = [];
          var beiJingTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("110000");
          });
          beiJingData = beiJingData.concat(beiJingTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(beiJingData, beiJingAllData);
          } else {
            getData(beiJingData, beiJingAllData, "北京");
          }
          console.log(beiJingAllData);

          //山东数据
          var shanDongAllData = [];

          var shanDongData = [];
          var shanDongTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("370000");
          });
          shanDongData = shanDongData.concat(shanDongTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(shanDongData, shanDongAllData);
          } else {
            getData(shanDongData, shanDongAllData, "山东");
          }

          //河北数据
          var heBeiAllData = [];

          var heBeiData = [];
          var heBeiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("130000");
          });
          heBeiData = heBeiData.concat(heBeiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(heBeiData, heBeiAllData);
          } else {
            getData(heBeiData, heBeiAllData, "河北");
          }

          //贵州数据
          var guiZhouAllData = [];

          var guiZhouData = [];
          var guiZhouTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("520000");
          });
          guiZhouData = guiZhouData.concat(guiZhouTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(guiZhouData, guiZhouAllData);
          } else {
            getData(guiZhouData, guiZhouAllData, "贵州");
          }

          //内蒙古数据
          var neiMengGuAllData = [];

          var neiMengGuData = [];
          var neiMengGuTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("150000");
          });
          neiMengGuData = neiMengGuData.concat(neiMengGuTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(neiMengGuData, neiMengGuAllData);
          } else {
            getData(neiMengGuData, neiMengGuAllData, "内蒙古");
          }

          //天津数据
          var tianJinAllData = [];

          var tianJinData = [];
          var tianJinTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("120000");
          });
          tianJinData = tianJinData.concat(tianJinTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(tianJinData, tianJinAllData);
          } else {
            getData(tianJinData, tianJinAllData, "天津");
          }

          //山西数据
          var shanXiAllData = [];

          var shanXiData = [];
          var shanXiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("140000");
          });
          shanXiData = shanXiData.concat(shanXiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(shanXiData, shanXiAllData);
          } else {
            getData(shanXiData, shanXiAllData, "山西");
          }

          //江苏数据
          var jiangSuAllData = [];

          var jiangSuData = [];
          var jiangSuTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("320000");
          });
          jiangSuData = jiangSuData.concat(jiangSuTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(jiangSuData, jiangSuAllData);
          } else {
            getData(jiangSuData, jiangSuAllData, "江苏");
          }

          //浙江数据
          var zheJiangAllData = [];

          var zheJiangData = [];
          var zheJiangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("330000");
          });
          zheJiangData = zheJiangData.concat(zheJiangTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(zheJiangData, zheJiangAllData);
          } else {
            getData(zheJiangData, zheJiangAllData, "浙江");
          }

          //河南数据
          var heNanAllData = [];

          var heNanData = [];
          var heNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("410000");
          });
          heNanData = heNanData.concat(heNanTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(heNanData, heNanAllData);
          } else {
            getData(heNanData, heNanAllData, "河南");
          }

          //湖北数据
          var huBeiAllData = [];

          var huBeiData = [];
          var huBeiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("420000");
          });
          huBeiData = huBeiData.concat(huBeiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(huBeiData, huBeiAllData);
          } else {
            getData(huBeiData, huBeiAllData, "湖北");
          }

          //湖南数据
          var huNanAllData = [];

          var huNanData = [];
          var huNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("430000");
          });
          huNanData = huNanData.concat(huNanTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(huNanData, huNanAllData);
          } else {
            getData(huNanData, huNanAllData, "湖南");
          }

          //广东数据
          var guangDongAllData = [];

          var guangDongData = [];
          var guangDongTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("440000");
          });
          guangDongData = guangDongData.concat(guangDongTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(guangDongData, guangDongAllData);
          } else {
            getData(guangDongData, guangDongAllData, "广东");
          }

          //重庆数据
          var chongQingAllData = [];

          var chongQingData = [];
          var chongQingTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("500000");
          });
          chongQingData = chongQingData.concat(chongQingTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(chongQingData, chongQingAllData);
          } else {
            getData(chongQingData, chongQingAllData, "重庆");
          }

          //四川数据
          var siChuanAllData = [];

          var siChuanData = [];
          var siChuanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("510000");
          });
          siChuanData = siChuanData.concat(siChuanTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(siChuanData, siChuanAllData);
          } else {
            getData(siChuanData, siChuanAllData, "四川");
          }

          //云南数据
          var yunNanAllData = [];

          var yunNanData = [];
          var yunNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("530000");
          });
          yunNanData = yunNanData.concat(yunNanTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(yunNanData, yunNanAllData);
          } else {
            getData(yunNanData, yunNanAllData, "云南");
          }

          //青海数据
          var qingHaiAllData = [];

          var qingHaiData = [];
          var qingHaiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("630000");
          });
          qingHaiData = qingHaiData.concat(qingHaiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(qingHaiData, qingHaiAllData);
          } else {
            getData(qingHaiData, qingHaiAllData, "青海");
          }

          //新疆数据
          var xinJiangAllData = [];

          var xinJiangData = [];
          var xinJiangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("650000");
          });
          xinJiangData = xinJiangData.concat(xinJiangTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(xinJiangData, xinJiangAllData);
          } else {
            getData(xinJiangData, xinJiangAllData, "新疆");
          }

          //台湾数据
          var taiWanAllData = [];

          var taiWanData = [];
          var taiWanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("710000");
          });
          taiWanData = taiWanData.concat(taiWanTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(taiWanData, taiWanAllData);
          } else {
            getData(taiWanData, taiWanAllData, "台湾");
          }

          //香港数据
          var xiangGangAllData = [];

          var xiangGangData = [];
          var xiangGangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("810000");
          });
          xiangGangData = xiangGangData.concat(xiangGangTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(xiangGangData, xiangGangAllData);
          } else {
            getData(xiangGangData, xiangGangAllData, "香港");
          }

          //澳门数据
          var aoMenAllData = [];

          var aoMenData = [];
          var aoMenTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("820000");
          });
          aoMenData = aoMenData.concat(aoMenTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(aoMenData, aoMenAllData);
          } else {
            getData(aoMenData, aoMenAllData, "澳门");
          }

          //辽宁数据
          var liaoNingAllData = [];

          var liaoNingData = [];
          var liaoNingTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("210000");
          });
          liaoNingData = liaoNingData.concat(liaoNingTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(liaoNingData, liaoNingAllData);
          } else {
            getData(liaoNingData, liaoNingAllData, "辽宁");
          }

          //吉林数据
          var jiLinAllData = [];

          var jiLinData = [];
          var jiLinTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("220000");
          });
          jiLinData = jiLinData.concat(jiLinTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(jiLinData, jiLinAllData);
          } else {
            getData(jiLinData, jiLinAllData, "吉林");
          }

          //黑龙江数据
          var heiLongJiangAllData = [];

          var heiLongJiangData = [];
          var heiLongJiangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("230000");
          });
          heiLongJiangData = heiLongJiangData.concat(heiLongJiangTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(heiLongJiangData, heiLongJiangAllData);
          } else {
            getData(heiLongJiangData, heiLongJiangAllData, "黑龙江");
          }

          //上海数据
          var shangHaiAllData = [];

          var shangHaiData = [];
          var shangHaiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("310000");
          });
          shangHaiData = shangHaiData.concat(shangHaiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(shangHaiData, shangHaiAllData);
          } else {
            getData(shangHaiData, shangHaiAllData, "上海");
          }

          //安徽数据
          var anHuiAllData = [];

          var anHuiData = [];
          var anHuiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("340000");
          });
          anHuiData = anHuiData.concat(anHuiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(anHuiData, anHuiAllData);
          } else {
            getData(anHuiData, anHuiAllData, "安徽");
          }

          //福建数据
          var fuJianAllData = [];

          var fuJianData = [];
          var fuJianTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("350000");
          });
          fuJianData = fuJianData.concat(fuJianTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(fuJianData, fuJianAllData);
          } else {
            getData(fuJianData, fuJianAllData, "福建");
          }

          //江西数据
          var jiangXiAllData = [];

          var jiangXiData = [];
          var jiangXiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("360000");
          });
          jiangXiData = jiangXiData.concat(jiangXiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(jiangXiData, jiangXiAllData);
          } else {
            getData(jiangXiData, jiangXiAllData, "江西");
          }

          //广西数据
          var guangXiAllData = [];

          var guangXiData = [];
          var guangXiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("450000");
          });
          guangXiData = guangXiData.concat(guangXiTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(guangXiData, guangXiAllData);
          } else {
            getData(guangXiData, guangXiAllData, "广西");
          }

          //海南数据
          var haiNanAllData = [];

          var haiNanData = [];
          var haiNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("460000");
          });
          haiNanData = haiNanData.concat(haiNanTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(haiNanData, haiNanAllData);
          } else {
            getData(haiNanData, haiNanAllData, "海南");
          }

          //西藏数据
          var xiZangAllData = [];

          var xiZangData = [];
          var xiZangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("540000");
          });
          xiZangData = xiZangData.concat(xiZangTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(xiZangData, xiZangAllData);
          } else {
            getData(xiZangData, xiZangAllData, "西藏");
          }

          //陕西数据
          var shanXIAllData = [];

          var shanXIData = [];
          var shanXITemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("610000");
          });
          shanXIData = shanXIData.concat(shanXITemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(shanXIData, shanXIAllData);
          } else {
            getData(shanXIData, shanXIAllData, "陕西");
          }

          //甘肃数据
          var ganSuAllData = [];

          var ganSuData = [];
          var ganSuTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("620000");
          });
          ganSuData = ganSuData.concat(ganSuTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(ganSuData, ganSuAllData);
          } else {
            getData(ganSuData, ganSuAllData, "甘肃");
          }

          //宁夏数据
          var ningXiaAllData = [];

          var ningXiaData = [];
          var ningXiaTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("640000");
          });
          ningXiaData = ningXiaData.concat(ningXiaTemp);

          if (sessionStorage.getItem("sdProvince")) {
            getCityData(ningXiaData, ningXiaAllData);
          } else {
            getData(ningXiaData, ningXiaAllData, "宁夏");
          }

          var mapAllData = [];
          var kongData = [];
          for (var i = 0; i < beiJingAllData.length; i++) {
            mapAllData.push(beiJingAllData[i]);
          }
          for (var i = 0; i < shanDongAllData.length; i++) {
            mapAllData.push(shanDongAllData[i]);
          }
          for (var i = 0; i < heBeiAllData.length; i++) {
            mapAllData.push(heBeiAllData[i]);
          }
          for (var i = 0; i < guiZhouAllData.length; i++) {
            mapAllData.push(guiZhouAllData[i]);
          }
          for (var i = 0; i < neiMengGuAllData.length; i++) {
            mapAllData.push(neiMengGuAllData[i]);
          }
          for (var i = 0; i < tianJinAllData.length; i++) {
            mapAllData.push(tianJinAllData[i]);
          }
          for (var i = 0; i < shanXiAllData.length; i++) {
            mapAllData.push(shanXiAllData[i]);
          }
          for (var i = 0; i < jiangSuAllData.length; i++) {
            mapAllData.push(jiangSuAllData[i]);
          }
          for (var i = 0; i < zheJiangAllData.length; i++) {
            mapAllData.push(zheJiangAllData[i]);
          }
          for (var i = 0; i < heNanAllData.length; i++) {
            mapAllData.push(heNanAllData[i]);
          }
          for (var i = 0; i < huBeiAllData.length; i++) {
            mapAllData.push(huBeiAllData[i]);
          }
          for (var i = 0; i < huNanAllData.length; i++) {
            mapAllData.push(huNanAllData[i]);
          }
          for (var i = 0; i < guangDongAllData.length; i++) {
            mapAllData.push(guangDongAllData[i]);
          }
          for (var i = 0; i < chongQingAllData.length; i++) {
            mapAllData.push(chongQingAllData[i]);
          }
          for (var i = 0; i < siChuanAllData.length; i++) {
            mapAllData.push(siChuanAllData[i]);
          }
          for (var i = 0; i < yunNanAllData.length; i++) {
            mapAllData.push(yunNanAllData[i]);
          }
          for (var i = 0; i < qingHaiAllData.length; i++) {
            mapAllData.push(qingHaiAllData[i]);
          }
          for (var i = 0; i < xinJiangAllData.length; i++) {
            mapAllData.push(xinJiangAllData[i]);
          }
          for (var i = 0; i < taiWanAllData.length; i++) {
            mapAllData.push(taiWanAllData[i]);
          }
          for (var i = 0; i < xiangGangAllData.length; i++) {
            mapAllData.push(xiangGangAllData[i]);
          }
          for (var i = 0; i < aoMenAllData.length; i++) {
            mapAllData.push(aoMenAllData[i]);
          }
          for (var i = 0; i < liaoNingAllData.length; i++) {
            mapAllData.push(liaoNingAllData[i]);
          }
          for (var i = 0; i < jiLinAllData.length; i++) {
            mapAllData.push(jiLinAllData[i]);
          }
          for (var i = 0; i < heiLongJiangAllData.length; i++) {
            mapAllData.push(heiLongJiangAllData[i]);
          }
          for (var i = 0; i < shangHaiAllData.length; i++) {
            mapAllData.push(shangHaiAllData[i]);
          }
          for (var i = 0; i < anHuiAllData.length; i++) {
            mapAllData.push(anHuiAllData[i]);
          }
          for (var i = 0; i < fuJianAllData.length; i++) {
            mapAllData.push(fuJianAllData[i]);
          }
          for (var i = 0; i < jiangXiAllData.length; i++) {
            mapAllData.push(jiangXiAllData[i]);
          }
          for (var i = 0; i < guangXiAllData.length; i++) {
            mapAllData.push(guangXiAllData[i]);
          }
          for (var i = 0; i < haiNanAllData.length; i++) {
            mapAllData.push(haiNanAllData[i]);
          }
          for (var i = 0; i < xiZangAllData.length; i++) {
            mapAllData.push(xiZangAllData[i]);
          }
          for (var i = 0; i < shanXIAllData.length; i++) {
            mapAllData.push(shanXIAllData[i]);
          }
          for (var i = 0; i < ganSuAllData.length; i++) {
            mapAllData.push(ganSuAllData[i]);
          }
          for (var i = 0; i < ningXiaAllData.length; i++) {
            mapAllData.push(ningXiaAllData[i]);
          }

          var mapAllData = kongData.concat(
            neiMengGuAllData,
            tianJinAllData,
            heBeiAllData,
            shanXiAllData,
            jiangSuAllData,
            zheJiangAllData,
            shanDongAllData,
            heNanAllData,
            huBeiAllData,
            huNanAllData,
            guangDongAllData,
            chongQingAllData,
            siChuanAllData,
            yunNanAllData,
            qingHaiAllData,
            xinJiangAllData,
            taiWanAllData,
            xiangGangAllData,
            aoMenAllData,
            beiJingAllData,
            liaoNingAllData,
            jiLinAllData,
            heiLongJiangAllData,
            shangHaiAllData,
            anHuiAllData,
            fuJianAllData,
            jiangXiAllData,
            guangXiAllData,
            haiNanAllData,
            guiZhouAllData,
            xiZangAllData,
            shanXIAllData,
            ganSuAllData,
            ningXiaAllData
          );
          console.log(mapAllData);

          this.mapAllData = mapAllData;
          this.valueAllDataMax = valueAllDataMax;

          if (sessionStorage.getItem("sdProvince")) {
            if (sessionStorage.getItem("sdProvince") == "150000") {
              this.mapName = "内蒙古";
            } else if (sessionStorage.getItem("sdProvince") == "120000") {
              this.mapName = "天津";
            } else if (sessionStorage.getItem("sdProvince") == "130000") {
              this.mapName = "河北";
            } else if (sessionStorage.getItem("sdProvince") == "140000") {
              this.mapName = "山西";
            } else if (sessionStorage.getItem("sdProvince") == "320000") {
              this.mapName = "江苏";
            } else if (sessionStorage.getItem("sdProvince") == "330000") {
              this.mapName = "浙江";
            } else if (sessionStorage.getItem("sdProvince") == "370000") {
              this.mapName = "山东";
            } else if (sessionStorage.getItem("sdProvince") == "410000") {
              this.mapName = "河南";
            } else if (sessionStorage.getItem("sdProvince") == "420000") {
              this.mapName = "湖北";
            } else if (sessionStorage.getItem("sdProvince") == "430000") {
              this.mapName = "湖南";
            } else if (sessionStorage.getItem("sdProvince") == "440000") {
              this.mapName = "广东";
            } else if (sessionStorage.getItem("sdProvince") == "500000") {
              this.mapName = "重庆";
            } else if (sessionStorage.getItem("sdProvince") == "510000") {
              this.mapName = "四川";
            } else if (sessionStorage.getItem("sdProvince") == "530000") {
              this.mapName = "云南";
            } else if (sessionStorage.getItem("sdProvince") == "630000") {
              this.mapName = "青海";
            } else if (sessionStorage.getItem("sdProvince") == "650000") {
              this.mapName = "新疆";
            } else if (sessionStorage.getItem("sdProvince") == "710000") {
              this.mapName = "台湾";
            } else if (sessionStorage.getItem("sdProvince") == "810000") {
              this.mapName = "香港";
            } else if (sessionStorage.getItem("sdProvince") == "820000") {
              this.mapName = "澳门";
            } else if (sessionStorage.getItem("sdProvince") == "110000") {
              this.mapName = "北京";
            } else if (sessionStorage.getItem("sdProvince") == "210000") {
              this.mapName = "辽宁";
            } else if (sessionStorage.getItem("sdProvince") == "220000") {
              this.mapName = "吉林";
            } else if (sessionStorage.getItem("sdProvince") == "230000") {
              this.mapName = "黑龙江";
            } else if (sessionStorage.getItem("sdProvince") == "310000") {
              this.mapName = "上海";
            } else if (sessionStorage.getItem("sdProvince") == "340000") {
              this.mapName = "安徽";
            } else if (sessionStorage.getItem("sdProvince") == "350000") {
              this.mapName = "福建";
            } else if (sessionStorage.getItem("sdProvince") == "450000") {
              this.mapName = "广西";
            } else if (sessionStorage.getItem("sdProvince") == "360000") {
              this.mapName = "江西";
            } else if (sessionStorage.getItem("sdProvince") == "460000") {
              this.mapName = "海南";
            } else if (sessionStorage.getItem("sdProvince") == "520000") {
              this.mapName = "贵州";
            } else if (sessionStorage.getItem("sdProvince") == "540000") {
              this.mapName = "西藏";
            } else if (sessionStorage.getItem("sdProvince") == "610000") {
              this.mapName = "陕西";
            } else if (sessionStorage.getItem("sdProvince") == "620000") {
              this.mapName = "甘肃";
            } else if (sessionStorage.getItem("sdProvince") == "640000") {
              this.mapName = "宁夏";
            }
          } else {
            this.mapName = "china";
          }
        }
      );

      const that = this;
      const data = await axios.get(mapCode);

      if (data) {
        this.chart = echarts.init(this.$refs.mapDemandChart);
        echarts.registerMap(name, data.data);
        var option = {
          title: {
            text: "热度指数",
            bottom: 80,
            left: 10,
            textStyle: {
              color: "#666",
              fontSize: 14
            }
          },
          tooltip: {
            // 鼠标移到图里面的浮动提示框
            formatter: function(params, ticket, callback) {
              // params.data 就是series配置项中的data数据遍历
              console.log(params.data);
              let xqData;
              if (params.data) {
                xqData = params.data.xqData;
              } else {
                // 为了防止没有定义数据的时候报错写的
                xqData = 0;
              }
              let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          需求宗数：${xqData} 宗<br/>
          </p>
        `;
              return htmlStr;
            }
            // backgroundColor:"#ff7f50",//提示标签背景颜色
            // textStyle:{color:"#fff"} //提示标签字体颜色
          },

          visualMap: {
            //颜色的设置  dataRange

            itemWidth: 14,
            itemHeight: 14,
            bottom: 60,
            left: 10,
            inverse: "true", //控制高低的位置
            orient: "horizontal", //控制导航的方向
            splitList: [
              {
                start: Math.ceil((that.valueAllDataMax / 5) * 4),
                end: Math.ceil((that.valueAllDataMax / 5) * 5),
                color: "#2b70c2"
              },
              {
                start: Math.ceil((that.valueAllDataMax / 5) * 3),
                end: Math.ceil((that.valueAllDataMax / 5) * 4),
                color: "#5f92cf"
              },
              {
                start: Math.ceil((that.valueAllDataMax / 5) * 2),
                end: Math.ceil((that.valueAllDataMax / 5) * 3),
                color: "#a1c1e6"
              },
              {
                start: Math.ceil((that.valueAllDataMax / 5) * 1),
                end: Math.ceil((that.valueAllDataMax / 5) * 2),
                color: "#d0dff0"
              },
              {
                end: Math.ceil((that.valueAllDataMax / 5) * 1),
                color: "#e3eefd"
              }
            ],
            //  min: 0,
            //  max: 2500,
            //  calculable : true,//颜色呈条状
            min: 0,
            max: that.valueAllDataMax,
            inRange: {
              color: ['#2b70c2', '#e3eefd'] // 蓝绿
            },
            text: ["高", "低"] // 文本，默认为数值文本
          },
          geo: {
            // 这个是重点配置区(阴影设置)
            map: that.mapName, // 表示中国地图
            roam: false, //禁止缩放
            show: true, //是否显示阴影
            zoom: 1,
            label: {
              normal: {
                show: false, // 是否显示对应地名
                textStyle: {
                  color: "rgba(0,0,0,0.4)"
                }
              }
            },
            itemStyle: {
              normal: {
                // borderColor: "#76aff4", //地图边界线的颜色
                // areaColor: null, //地图整体区域的颜色
                // shadowColor: "rgba(0, 0, 0, 0.2)",
                // shadowBlur: 10,
                // shadowOffsetX: 10,
                borderColor:'#fff',//地图最外边框
                shadowOffsetX: 10,//偏移量
                shadowOffsetY: 10,//偏移量
                borderWidth: 2,//设置外层边框
                shadowColor: 'rgba(101,103,144, 0.25)',
                shadowBlur: 10
              },
              emphasis: {
                // areaColor: null, //鼠标滑过的颜色

                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
                // shadowBlur: 20,
                // borderWidth: 0,
                // shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowColor:'#fff'
              }
            }
          },
          series: [
            {
              name: "MAP",
              type: "map",
              mapType: name,
              // selectedMode: false, //是否允许选中多个区域 
              selectedMode : 'single',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  borderColor: "var(--Colors)",
                  borderColor: "#fff",

                  borderWidth: 1
                }, //正常样式
                emphasis: {
                  // areaColor: "#10d4c3",
                  // borderWidth: 2,
                  // borderColor: "#10d4c3",
                  areaColor:'#fae0bf',
                } //鼠标事件区块样式
              },
              data: that.mapAllData
            }
          ]
        };
        this.chart.setOption(option);
        this.chart.on("click", function(params) {
         let mapC = ""
          if(params.name != 'china' && data.data.features ){
            data.data.features.map(item=>{
              if(item.properties.name == params.name ) { 
                mapC = item.id
              }
            })
            sessionStorage.setItem("sdProvince", mapC?mapC:'');
          }
          clearTimeout(this.timeFn);
          this.timeFn = setTimeout(function() {
            const name = params.name;
            const mapCode = that.pro[name];
            console.log(mapCode, name);
            if (!mapCode) {
              return;
            }
            that.loadMapDemand(mapCode, name);
          }, 250);
        });
      } else {
        alert("无法加载该地图");
      }
    },
    returnLastStep: function() {
      const that = this;
      this.chart = echarts.init(this.$refs.mapDemandChart);

      // 绑定双击事件，返回全国地图
      this.chart.on("dblclick", function(params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem("sdProvince");
        clearTimeout(this.timeFn);
        that.loadMapDemand("../../static/map/json/china.json", "china");
      });
    },
    useMsgDemand() {
      let params = this.params;
      params["startDate"] = this.$route.path=="/" ? this.start : this.timeStartData;
      params["endDate"] = this.$route.path=="/" ? this.end : this.timeEndData;
      params["cantonProvince"] = sessionStorage.getItem("sdProvince");

      this.$axios.get(
        // `/epf-monitor/purchase/queryGroupByFirstClassUse`,
        // `/epf-monitor/monipurchase/queryGroupByFirstClassUse`,
        `/epf-landweb/tpurchase/purchaseClassUseAnalys`,
        params,
        res => {
          console.log(res);
           if(this.$route.path=="/"){
            if(res.res && res.res.length <= 1){
              if(res.res.length == 0){
                this.useData = res.res
                return;
              }
              res.res[0].demand ==  "need_buy" && res.res[0].counNumb ? res.res[0]['qgNum'] = res.res[0].counNumb  :  ''
              res.res[0].demand ==  "need_rent" && res.res[0].counNumb ?  res.res[0]['qzNum'] = res.res[0].counNumb : ''
              this.useData = res.res
              return;
            }else if(res.res && res.res.length >1){
              let typeFun = function(typeName){
                var typeData = res.res.filter((item,index,arr)=>{
                  if(item.demand == typeName ){
                    return item
                  }
                })
                var numData = [];
                for (var key in typeData) {
                  let obj = {
                    firstClassUse: typeData[key].firstClassUse,
                    firstClassUseName: typeData[key].firstClassUseName
                  };
                  if(typeName == 'need_rent'){
                    obj['qzNum'] = typeData[key].counNumb 
                  }else if(typeName == 'need_buy'){
                    obj['qgNum'] = typeData[key].counNumb
                  }
                  numData.push(obj);
                }
                var result=[];
                var flag=true;
                for(var i=0;i<numData.length;i++){
                  flag=true;
                  for(var j=0;j<result.length;j++){
                    if(numData[i].firstClassUse==result[j].firstClassUse){
                      flag=false;
                      if(typeName == 'need_rent'){
                        result[j].qzNum=numData[i].czNum+result[j].qzNum;
                      }else if(typeName == 'need_buy'){
                        result[j].qgNum=numData[i].zrNum+result[j].qgNum;
                      }
                    }
                  }
                if(flag==true)
                  result.push(numData[i]);
                }
                return result;
              }
              let qzData = typeFun('need_rent')
              let qgData = typeFun('need_buy')
              var newArr = qzData.concat(qgData)
              newArr =  newArr.filter(function(item,index,arr){
                const i =  arr.find(_item=> item.firstClassUse === _item.firstClassUse);
                  if(i!==item){
                      i.qzNum = i.qzNum == undefined ? item.qzNum:i.qzNum;
                      i.qgNum = i.qgNum == undefined ? item.qgNum:i.qgNum;
                      return undefined;
                  }else{
                      i.qzNum=item.qzNum;
                      i.qgNum=item.qgNum;
                      return i;
                  }
              }).filter(item=>item!==undefined);
                this.useData = newArr;
            }
          }else{
              var allNumberData = []; //所有宗数
              for (var key in res.pager.results) {
                allNumberData.push(res.pager.results[key].counNumb); //所有宗数
              }
              function sum(arr) {
                return eval(arr.join("+"));
              }
              var allNumberSum = sum(allNumberData); //所有宗数总和

              var allData = [];

              for (var key in res.pager.results) {
                allData.push({
                  firstClassUse: res.pager.results[key].firstClassUse,
                  firstClassUseName: res.pager.results[key].firstClassUseName,
                  number: res.pager.results[key].counNumb,
                  proportion: (
                    (res.pager.results[key].counNumb / allNumberSum) *
                    100
                  ).toFixed(2)
                  // proportion: Math.round(
                  //   (res.pager.results[key].counNumb / allNumberSum) * 100
                  // )
                });
              }
              this.useData = allData;
          }
        }
      );
    },
    changeDemandMap() {
      if (sessionStorage.getItem("sdProvince")) {
        if (sessionStorage.getItem("sdProvince") == "150000") {
          this.loadMapDemand(
            "../../static/map/json/province/neimenggu.json",
            "内蒙古"
          );
        } else if (sessionStorage.getItem("sdProvince") == "120000") {
          this.loadMapDemand(
            "../../static/map/json/province/tianjin.json",
            "天津"
          );
        } else if (sessionStorage.getItem("sdProvince") == "130000") {
          this.loadMapDemand(
            "../../static/map/json/province/hebei.json",
            "河北"
          );
        } else if (sessionStorage.getItem("sdProvince") == "140000") {
          this.loadMapDemand(
            "../../static/map/json/province/shanxi.json",
            "山西"
          );
        } else if (sessionStorage.getItem("sdProvince") == "320000") {
          this.loadMapDemand(
            "../../static/map/json/province/jiangsu.json",
            "江苏"
          );
        } else if (sessionStorage.getItem("sdProvince") == "330000") {
          this.loadMapDemand(
            "../../static/map/json/province/zhejiang.json",
            "浙江"
          );
        } else if (sessionStorage.getItem("sdProvince") == "370000") {
          this.loadMapDemand(
            "../../static/map/json/province/shandong.json",
            "山东"
          );
        } else if (sessionStorage.getItem("sdProvince") == "410000") {
          this.loadMapDemand(
            "../../static/map/json/province/henan.json",
            "河南"
          );
        } else if (sessionStorage.getItem("sdProvince") == "420000") {
          this.loadMapDemand(
            "../../static/map/json/province/hubei.json",
            "湖北"
          );
        } else if (sessionStorage.getItem("sdProvince") == "430000") {
          this.loadMapDemand(
            "../../static/map/json/province/hunan.json",
            "湖南"
          );
        } else if (sessionStorage.getItem("sdProvince") == "440000") {
          this.loadMapDemand(
            "../../static/map/json/province/guangdong.json",
            "广东"
          );
        } else if (sessionStorage.getItem("sdProvince") == "500000") {
          this.loadMapDemand(
            "../../static/map/json/province/chongqing.json",
            "重庆"
          );
        } else if (sessionStorage.getItem("sdProvince") == "510000") {
          this.loadMapDemand(
            "../../static/map/json/province/sichuan.json",
            "四川"
          );
        } else if (sessionStorage.getItem("sdProvince") == "530000") {
          this.loadMapDemand(
            "../../static/map/json/province/yunnan.json",
            "云南"
          );
        } else if (sessionStorage.getItem("sdProvince") == "630000") {
          this.loadMapDemand(
            "../../static/map/json/province/qinghai.json",
            "青海"
          );
        } else if (sessionStorage.getItem("sdProvince") == "650000") {
          this.loadMapDemand(
            "../../static/map/json/province/xinjiang.json",
            "新疆"
          );
        } else if (sessionStorage.getItem("sdProvince") == "710000") {
          this.loadMapDemand(
            "../../static/map/json/province/taiwan.json",
            "台湾"
          );
        } else if (sessionStorage.getItem("sdProvince") == "810000") {
          this.loadMapDemand(
            "../../static/map/json/province/xianggang.json",
            "香港"
          );
        } else if (sessionStorage.getItem("sdProvince") == "820000") {
          this.loadMapDemand(
            "../../static/map/json/province/aomen.json",
            "澳门"
          );
        } else if (sessionStorage.getItem("sdProvince") == "110000") {
          this.loadMapDemand(
            "../../static/map/json/province/beijing.json",
            "北京"
          );
        } else if (sessionStorage.getItem("sdProvince") == "210000") {
          this.loadMapDemand(
            "../../static/map/json/province/liaoning.json",
            "辽宁"
          );
        } else if (sessionStorage.getItem("sdProvince") == "220000") {
          this.loadMapDemand(
            "../../static/map/json/province/jilin.json",
            "吉林"
          );
        } else if (sessionStorage.getItem("sdProvince") == "230000") {
          this.loadMapDemand(
            "../../static/map/json/province/heilongjiang.json",
            "黑龙江"
          );
        } else if (sessionStorage.getItem("sdProvince") == "310000") {
          this.loadMapDemand(
            "../../static/map/json/province/shanghai.json",
            "上海"
          );
        } else if (sessionStorage.getItem("sdProvince") == "340000") {
          this.loadMapDemand(
            "../../static/map/json/province/anhui.json",
            "安徽"
          );
        } else if (sessionStorage.getItem("sdProvince") == "350000") {
          this.loadMapDemand(
            "../../static/map/json/province/fujian.json",
            "福建"
          );
        } else if (sessionStorage.getItem("sdProvince") == "450000") {
          this.loadMapDemand(
            "../../static/map/json/province/guangxi.json",
            "广西"
          );
        } else if (sessionStorage.getItem("sdProvince") == "360000") {
          this.loadMapDemand(
            "../../static/map/json/province/jiangxi.json",
            "江西"
          );
        } else if (sessionStorage.getItem("sdProvince") == "460000") {
          this.loadMapDemand(
            "../../static/map/json/province/hainan.json",
            "海南"
          );
        } else if (sessionStorage.getItem("sdProvince") == "520000") {
          this.loadMapDemand(
            "../../static/map/json/province/guizhou.json",
            "贵州"
          );
        } else if (sessionStorage.getItem("sdProvince") == "540000") {
          this.loadMapDemand(
            "../../static/map/json/province/xizang.json",
            "西藏"
          );
        } else if (sessionStorage.getItem("sdProvince") == "610000") {
          this.loadMapDemand(
            "../../static/map/json/province/shanxi.json",
            "陕西"
          );
        } else if (sessionStorage.getItem("sdProvince") == "620000") {
          this.loadMapDemand(
            "../../static/map/json/province/gansu.json",
            "甘肃"
          );
        } else if (sessionStorage.getItem("sdProvince") == "640000") {
          this.loadMapDemand(
            "../../static/map/json/province/ningxia.json",
            "宁夏"
          );
        }
      } else {
        this.loadMapDemand("../../static/map/json/china.json", "china");
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.changeDemandMap();
      this.useMsgDemand();
    });
    this.returnLastStep();
    this.getLastMonth()
  },
  updated() {
    this.changeDemandMap();
  },
  created() {
    if(this.$route.path  == '/'){
      this.timeStartData = this.start
      this.timeEndData = this.end;
    }else{
      this.timeStartData = this.timeStartMessage;
      this.timeEndData = this.timeEndMessage;
    }
    this.currentNO = this.currentMessage;
    this.activeTabsName = this.activeTabsMessage;
    console.log('this.timeStartData',this.timeStartData);
    console.log('this.timeEndData',this.timeEndData);
    console.log('this.currentNO',this.currentNO);
    console.log('this.activeTabsName',this.activeTabsName);
  },
  watch: {
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.changeDemandMap();
      this.useMsgDemand();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.changeDemandMap();
      this.useMsgDemand();
    },
    // currentMessage: {
    //   immediate: true,
    //   handler(val) {
    //     this.currentNO = val;
    //     if (this.currentNO == 0) {
    //       if (this.activeTabsName == "demand") {
    //          this.changeDemandMap();
    //       this.useMsgDemand();
    //       }
    //     }
    //   }
    // },
    currentMessage(val) {
      this.currentNO = val;
      this.changeDemandMap();
      this.useMsgDemand();
    },
    activeTabsMessage(val) {
      this.activeTabsName = val;
      if (this.activeTabsName == "demand") {
        this.changeDemandMap();
        this.useMsgDemand();
      }
    },
    "params.cantonProvince"(val) {
      this.changeDemandMap();
      this.useMsgDemand();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.chart_message {
  @include size(100%, 575px);
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .chart_table {
    width: 310px;
    height: auto;
    margin-left: 20px;
    tr {
      font-size: 12px;
      color: #666;
    }
  }
}
.active{
  background:url("../assets/image/home_map_bg.jpg") no-repeat;
}
</style>
