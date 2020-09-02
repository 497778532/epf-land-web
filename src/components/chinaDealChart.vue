<template>
  <div class="chart_message">
    <div id="chinaChart" style="width:740px;height:575px;" ref="mapChart"></div>
    <div class="chart_table">
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
          <td colspan="3">土地{{typeDataName}}用途占比分析</td>
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
    "dealMessage",
    "timeStartMessage",
    "timeEndMessage",
    "currentMessage"
  ],
  data() {
    return {
      typeData: "",
      currentNO: "",
      // timeStartData: "",
      // timeEndData: "",

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
        startDate: "",
        endDate: "",
        analysisType: "" //交易类型
      },

      cantonProvinceName: "",
      analyzeType: "ZS",
      typeDataName: "",

      mapAllData: [],
      valueAllDataMax: "",
      mapName: "china",

      useData: [],
      firstClassUseData: [],

      chart: null,
      timeFn: null,
      mapCode: "",
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
    async loadMapDeal(mapCode, name) {
      //请求数据
      let params = this.params;
      params["analysisType"] = this.typeData;
      params["startDate"] = this.timeStartData;
      params["endDate"] = this.timeEndData;
      params["cantonProvince"] = sessionStorage.getItem("dealProvince");

      this.$axios.get(
        `/epf-monitor/monitor/trans/queryMapDistribution`,
        params,
        mapRes => {
          console.log(mapRes);

          let chartData = mapRes.result;
          console.log(chartData);

          var valueAllData = [];
          for (var key in chartData) {
            valueAllData.push(chartData[key].sumNumber);
          }

          var valueAllDataMax = Math.max.apply(Math, valueAllData);
          console.log(valueAllData);
          console.log(valueAllDataMax);

          function getData(Data, typeData, AllData, shengM) {
            console.log(Data);
            console.log(AllData);
            console.log(shengM);
            for (var key in Data) {
              if (typeData === "transfer") {
                AllData.push({
                  name: shengM,
                  value: Data[key].transferNumber,
                  zrData: Data[key].transferNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "转让"
                });
              } else if (typeData === "rent") {
                AllData.push({
                  name: shengM,
                  value: Data[key].rentNumber,
                  czData: Data[key].rentNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "出租"
                });
              } else if (typeData === "mortgage") {
                AllData.push({
                  name: shengM,
                  value: Data[key].mortgageNumber,
                  dyData: Data[key].mortgageNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "抵押"
                });
              } else if (typeData === "") {
                AllData.push({
                  name: shengM,
                  value: Data[key].sumNumber,
                  zrData: Data[key].transferNumber,
                  czData: Data[key].rentNumber,
                  dyData: Data[key].mortgageNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "全部"
                });
              }
            }
          }

          function getCityData(Data, typeData, AllData) {
            console.log(Data);
            console.log(AllData);
            for (var key in Data) {
              if (typeData === "transfer") {
                AllData.push({
                  value: Data[key].transferNumber,
                  zrData: Data[key].transferNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  name: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "转让"
                });
              } else if (typeData === "rent") {
                AllData.push({
                  value: Data[key].rentNumber,
                  czData: Data[key].rentNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  name: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "出租"
                });
              } else if (typeData === "mortgage") {
                AllData.push({
                  value: Data[key].mortgageNumber,
                  dyData: Data[key].mortgageNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  name: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "抵押"
                });
              } else if (typeData === "") {
                AllData.push({
                  value: Data[key].sumNumber,
                  zrData: Data[key].transferNumber,
                  czData: Data[key].rentNumber,
                  dyData: Data[key].mortgageNumber,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  name: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  analysisTypeName: "全部"
                });
              }
            }
          }

          var typeData = this.typeData;

          //山东
          var shanDongAllData = [];
          var shanDongData = [];
          var shanDongTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("370000");
          });
          shanDongData = shanDongData.concat(shanDongTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(shanDongData, typeData, shanDongAllData);
          } else {
            getData(shanDongData, typeData, shanDongAllData, "山东");
          }
          console.log(shanDongAllData);

          //内蒙古
          var neiMengGuAllData = [];
          var neiMengGuData = [];
          var neiMengGuTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("150000");
          });
          neiMengGuData = neiMengGuData.concat(neiMengGuTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(neiMengGuData, typeData, neiMengGuAllData);
          } else {
            getData(neiMengGuData, typeData, neiMengGuAllData, "内蒙古");
          }

          //天津
          var tianJinAllData = [];
          var tianJinData = [];
          var tianJinTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("120000");
          });
          tianJinData = tianJinData.concat(tianJinTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(tianJinData, typeData, tianJinAllData);
          } else {
            getData(tianJinData, typeData, tianJinAllData, "天津");
          }

          //河北
          var heBeiAllData = [];
          var heBeiData = [];
          var heBeiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("130000");
          });
          heBeiData = heBeiData.concat(heBeiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(heBeiData, typeData, heBeiAllData);
          } else {
            getData(heBeiData, typeData, heBeiAllData, "河北");
          }

          //山西
          var shanXiAllData = [];
          var shanXiData = [];
          var shanXiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("140000");
          });
          shanXiData = shanXiData.concat(shanXiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(shanXiData, typeData, shanXiAllData);
          } else {
            getData(shanXiData, typeData, shanXiAllData, "山西");
          }

          //江苏
          var jiangSuAllData = [];
          var jiangSuData = [];
          var jiangSuTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("320000");
          });
          jiangSuData = jiangSuData.concat(jiangSuTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(jiangSuData, typeData, jiangSuAllData);
          } else {
            getData(jiangSuData, typeData, jiangSuAllData, "江苏");
          }

          //浙江
          var zheJiangAllData = [];
          var zheJiangData = [];
          var zheJiangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("330000");
          });
          zheJiangData = zheJiangData.concat(zheJiangTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(zheJiangData, typeData, zheJiangAllData);
          } else {
            getData(zheJiangData, typeData, zheJiangAllData, "浙江");
          }

          //河南
          var heNanAllData = [];
          var heNanData = [];
          var heNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("410000");
          });
          heNanData = heNanData.concat(heNanTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(heNanData, typeData, heNanAllData);
          } else {
            getData(heNanData, typeData, heNanAllData, "河南");
          }

          //湖北
          var huBeiAllData = [];
          var huBeiData = [];
          var huBeiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("420000");
          });
          huBeiData = huBeiData.concat(huBeiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(huBeiData, typeData, huBeiAllData);
          } else {
            getData(huBeiData, typeData, huBeiAllData, "湖北");
          }

          //湖南
          var huNanAllData = [];
          var huNanData = [];
          var huNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("430000");
          });
          huNanData = huNanData.concat(huNanTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(huNanData, typeData, huNanAllData);
          } else {
            getData(huNanData, typeData, huNanAllData, "湖南");
          }

          //广东
          var guangDongAllData = [];
          var guangDongData = [];
          var guangDongTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("440000");
          });
          guangDongData = guangDongData.concat(guangDongTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(guangDongData, typeData, guangDongAllData);
          } else {
            getData(guangDongData, typeData, guangDongAllData, "广东");
          }

          //重庆
          var chongQingAllData = [];
          var chongQingData = [];
          var chongQingTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("500000");
          });
          chongQingData = chongQingData.concat(chongQingTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(chongQingData, typeData, chongQingAllData);
          } else {
            getData(chongQingData, typeData, chongQingAllData, "重庆");
          }

          //四川
          var siChuanAllData = [];
          var siChuanData = [];
          var siChuanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("510000");
          });
          siChuanData = siChuanData.concat(siChuanTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(siChuanData, typeData, siChuanAllData);
          } else {
            getData(siChuanData, typeData, siChuanAllData, "四川");
          }

          //云南
          var yunNanAllData = [];
          var yunNanData = [];
          var yunNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("530000");
          });
          yunNanData = yunNanData.concat(yunNanTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(yunNanData, typeData, yunNanAllData);
          } else {
            getData(yunNanData, typeData, yunNanAllData, "云南");
          }

          //青海
          var qingHaiAllData = [];
          var qingHaiData = [];
          var qingHaiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("630000");
          });
          qingHaiData = qingHaiData.concat(qingHaiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(qingHaiData, typeData, qingHaiAllData);
          } else {
            getData(qingHaiData, typeData, qingHaiAllData, "青海");
          }

          //新疆
          var xinJiangAllData = [];
          var xinJiangData = [];
          var xinJiangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("650000");
          });
          xinJiangData = xinJiangData.concat(xinJiangTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(xinJiangData, typeData, xinJiangAllData);
          } else {
            getData(xinJiangData, typeData, xinJiangAllData, "新疆");
          }

          //台湾
          var taiWanAllData = [];
          var taiWanData = [];
          var taiWanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("710000");
          });
          taiWanData = taiWanData.concat(taiWanTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(taiWanData, typeData, taiWanAllData);
          } else {
            getData(taiWanData, typeData, taiWanAllData, "台湾");
          }

          //香港
          var xiangGangAllData = [];
          var xiangGangData = [];
          var xiangGangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("810000");
          });
          xiangGangData = xiangGangData.concat(xiangGangTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(xiangGangData, typeData, xiangGangAllData);
          } else {
            getData(xiangGangData, typeData, xiangGangAllData, "香港");
          }

          //澳门
          var aoMenAllData = [];
          var aoMenData = [];
          var aoMenTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("820000");
          });
          aoMenData = aoMenData.concat(aoMenTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(aoMenData, typeData, aoMenAllData);
          } else {
            getData(aoMenData, typeData, aoMenAllData, "澳门");
          }

          //北京
          var beiJingAllData = [];
          var beiJingData = [];
          var beiJingTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("110000");
          });
          beiJingData = beiJingData.concat(beiJingTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(beiJingData, typeData, beiJingAllData);
          } else {
            getData(beiJingData, typeData, beiJingAllData, "北京");
          }

          //辽宁
          var liaoNingAllData = [];
          var liaoNingData = [];
          var liaoNingTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("210000");
          });
          liaoNingData = liaoNingData.concat(liaoNingTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(liaoNingData, typeData, liaoNingAllData);
          } else {
            getData(liaoNingData, typeData, liaoNingAllData, "辽宁");
          }

          //吉林
          var jiLinAllData = [];
          var jiLinData = [];
          var jiLinTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("220000");
          });
          jiLinData = jiLinData.concat(jiLinTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(jiLinData, typeData, jiLinAllData);
          } else {
            getData(jiLinData, typeData, jiLinAllData, "吉林");
          }

          //黑龙江
          var heiLongJiangAllData = [];
          var heiLongJiangData = [];
          var heiLongJiangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("230000");
          });
          heiLongJiangData = heiLongJiangData.concat(heiLongJiangTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(heiLongJiangData, typeData, heiLongJiangAllData);
          } else {
            getData(heiLongJiangData, typeData, heiLongJiangAllData, "黑龙江");
          }

          //上海
          var shangHaiAllData = [];
          var shangHaiData = [];
          var shangHaiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("310000");
          });
          shangHaiData = shangHaiData.concat(shangHaiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(shangHaiData, typeData, shangHaiAllData);
          } else {
            getData(shangHaiData, typeData, shangHaiAllData, "上海");
          }

          //安徽
          var anHuiAllData = [];
          var anHuiData = [];
          var anHuiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("340000");
          });
          anHuiData = anHuiData.concat(anHuiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(anHuiData, typeData, anHuiAllData);
          } else {
            getData(anHuiData, typeData, anHuiAllData, "安徽");
          }

          //福建
          var fuJianAllData = [];
          var fuJianData = [];
          var fuJianTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("350000");
          });
          fuJianData = fuJianData.concat(fuJianTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(fuJianData, typeData, fuJianAllData);
          } else {
            getData(fuJianData, typeData, fuJianAllData, "福建");
          }

          //江西
          var jiangXiAllData = [];
          var jiangXiData = [];
          var jiangXiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("360000");
          });
          jiangXiData = jiangXiData.concat(jiangXiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(jiangXiData, typeData, jiangXiAllData);
          } else {
            getData(jiangXiData, typeData, jiangXiAllData, "江西");
          }

          //广西
          var guangXiAllData = [];
          var guangXiData = [];
          var guangXiTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("450000");
          });
          guangXiData = guangXiData.concat(guangXiTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(guangXiData, typeData, guangXiAllData);
          } else {
            getData(guangXiData, typeData, guangXiAllData, "广西");
          }

          //海南
          var haiNanAllData = [];
          var haiNanData = [];
          var haiNanTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("460000");
          });
          haiNanData = haiNanData.concat(haiNanTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(haiNanData, typeData, haiNanAllData);
          } else {
            getData(haiNanData, typeData, haiNanAllData, "海南");
          }

          //贵州
          var guiZhouAllData = [];
          var guiZhouData = [];
          var guiZhouTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("520000");
          });
          guiZhouData = guiZhouData.concat(guiZhouTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(guiZhouData, typeData, guiZhouAllData);
          } else {
            getData(guiZhouData, typeData, guiZhouAllData, "贵州");
          }

          //西藏
          var xiZangAllData = [];
          var xiZangData = [];
          var xiZangTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("540000");
          });
          xiZangData = xiZangData.concat(xiZangTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(xiZangData, typeData, xiZangAllData);
          } else {
            getData(xiZangData, typeData, xiZangAllData, "西藏");
          }

          //陕西
          var shanXIAllData = [];
          var shanXIData = [];
          var shanXITemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("610000");
          });
          shanXIData = shanXIData.concat(shanXITemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(shanXIData, typeData, shanXIAllData);
          } else {
            getData(shanXIData, typeData, shanXIAllData, "陕西");
          }

          //甘肃
          var ganSuAllData = [];
          var ganSuData = [];
          var ganSuTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("620000");
          });
          ganSuData = ganSuData.concat(ganSuTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(ganSuData, typeData, ganSuAllData);
          } else {
            getData(ganSuData, typeData, ganSuAllData, "甘肃");
          }

          //宁夏
          var ningXiaAllData = [];
          var ningXiaData = [];
          var ningXiaTemp = chartData.filter(function(i) {
            return i.cantonProvince.includes("640000");
          });
          ningXiaData = ningXiaData.concat(ningXiaTemp);

          if (sessionStorage.getItem("dealProvince")) {
            getCityData(ningXiaData, typeData, ningXiaAllData);
          } else {
            getData(ningXiaData, typeData, ningXiaAllData, "宁夏");
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

          if (sessionStorage.getItem("dealProvince")) {
            if (sessionStorage.getItem("dealProvince") == "150000") {
              this.mapName = "内蒙古";
            } else if (sessionStorage.getItem("dealProvince") == "120000") {
              this.mapName = "天津";
            } else if (sessionStorage.getItem("dealProvince") == "130000") {
              this.mapName = "河北";
            } else if (sessionStorage.getItem("dealProvince") == "140000") {
              this.mapName = "山西";
            } else if (sessionStorage.getItem("dealProvince") == "320000") {
              this.mapName = "江苏";
            } else if (sessionStorage.getItem("dealProvince") == "330000") {
              this.mapName = "浙江";
            } else if (sessionStorage.getItem("dealProvince") == "370000") {
              this.mapName = "山东";
            } else if (sessionStorage.getItem("dealProvince") == "410000") {
              this.mapName = "河南";
            } else if (sessionStorage.getItem("dealProvince") == "420000") {
              this.mapName = "湖北";
            } else if (sessionStorage.getItem("dealProvince") == "430000") {
              this.mapName = "湖南";
            } else if (sessionStorage.getItem("dealProvince") == "440000") {
              this.mapName = "广东";
            } else if (sessionStorage.getItem("dealProvince") == "500000") {
              this.mapName = "重庆";
            } else if (sessionStorage.getItem("dealProvince") == "510000") {
              this.mapName = "四川";
            } else if (sessionStorage.getItem("dealProvince") == "530000") {
              this.mapName = "云南";
            } else if (sessionStorage.getItem("dealProvince") == "630000") {
              this.mapName = "青海";
            } else if (sessionStorage.getItem("dealProvince") == "650000") {
              this.mapName = "新疆";
            } else if (sessionStorage.getItem("dealProvince") == "710000") {
              this.mapName = "台湾";
            } else if (sessionStorage.getItem("dealProvince") == "810000") {
              this.mapName = "香港";
            } else if (sessionStorage.getItem("dealProvince") == "820000") {
              this.mapName = "澳门";
            } else if (sessionStorage.getItem("dealProvince") == "110000") {
              this.mapName = "北京";
            } else if (sessionStorage.getItem("dealProvince") == "210000") {
              this.mapName = "辽宁";
            } else if (sessionStorage.getItem("dealProvince") == "220000") {
              this.mapName = "吉林";
            } else if (sessionStorage.getItem("dealProvince") == "230000") {
              this.mapName = "黑龙江";
            } else if (sessionStorage.getItem("dealProvince") == "310000") {
              this.mapName = "上海";
            } else if (sessionStorage.getItem("dealProvince") == "340000") {
              this.mapName = "安徽";
            } else if (sessionStorage.getItem("dealProvince") == "350000") {
              this.mapName = "福建";
            } else if (sessionStorage.getItem("dealProvince") == "450000") {
              this.mapName = "广西";
            } else if (sessionStorage.getItem("dealProvince") == "360000") {
              this.mapName = "江西";
            } else if (sessionStorage.getItem("dealProvince") == "460000") {
              this.mapName = "海南";
            } else if (sessionStorage.getItem("dealProvince") == "520000") {
              this.mapName = "贵州";
            } else if (sessionStorage.getItem("dealProvince") == "540000") {
              this.mapName = "西藏";
            } else if (sessionStorage.getItem("dealProvince") == "610000") {
              this.mapName = "陕西";
            } else if (sessionStorage.getItem("dealProvince") == "620000") {
              this.mapName = "甘肃";
            } else if (sessionStorage.getItem("dealProvince") == "640000") {
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
        this.chart = echarts.init(this.$refs.mapChart);
        echarts.registerMap(name, data.data);
        var option = {
          title: {
            text: "交易热度指数",
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
              let zrData, czData, dyData;
              if (params.data) {
                zrData = params.data.zrData;
                czData = params.data.czData;
                dyData = params.data.dyData;
              } else {
                // 为了防止没有定义数据的时候报错写的
                zrData = 0;
                czData = 0;
                dyData = 0;
              }
              //       let htmlStr = `
              //   <div style='font-size:18px;'> ${params.name}</div>
              //   <p style='text-align:left;margin-top:10px;'>
              //     转让宗数：${zrData} 宗<br/>
              //     出租宗数：${czData} 宗<br/>
              //     抵押宗数：${dyData} 宗<br/>
              //   </p>
              // `;
              //       return htmlStr;
              if (params.data) {
                if (params.data.analysisTypeName === "转让") {
                  let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          转让宗数：${zrData} 宗<br/>
          </p>
        `;
                  return htmlStr;
                } else if (params.data.analysisTypeName === "出租") {
                  let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          出租宗数：${czData} 宗<br/>
          </p>
        `;
                  return htmlStr;
                } else if (params.data.analysisTypeName === "抵押") {
                  let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          抵押宗数：${dyData} 宗<br/>
          </p>
        `;
                  return htmlStr;
                } else if (params.data.analysisTypeName === "全部") {
                  let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          转让宗数：${zrData} 宗<br/>
	          出租宗数：${czData} 宗<br/>
	          抵押宗数：${dyData} 宗<br/>
          </p>
        `;
                  return htmlStr;
                }
              }
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
                start: Math.ceil((this.valueAllDataMax / 5) * 4),
                end: Math.ceil((this.valueAllDataMax / 5) * 5),
                color: "#5984e6"
              },
              {
                start: Math.ceil((this.valueAllDataMax / 5) * 3),
                end: Math.ceil((this.valueAllDataMax / 5) * 4),
                color: "#7a9deb"
              },
              {
                start: Math.ceil((this.valueAllDataMax / 5) * 2),
                end: Math.ceil((this.valueAllDataMax / 5) * 3),
                color: "#c7defb"
              },
              {
                start: Math.ceil((this.valueAllDataMax / 5) * 1),
                end: Math.ceil((this.valueAllDataMax / 5) * 2),
                color: "#b9d6f9"
              },
              {
                end: Math.ceil((this.valueAllDataMax / 5) * 1),
                color: "#b9d6f9"
              }
            ],
            //  min: 0,
            //  max: 2500,
            //  calculable : true,//颜色呈条状
            text: ["高", "低"] // 文本，默认为数值文本
          },
          geo: {
            // 这个是重点配置区(阴影设置)
            map: this.mapName, // 表示中国地图
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
                borderColor: "#76aff4", //地图边界线的颜色
                areaColor: null, //地图整体区域的颜色
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
                shadowOffsetX: 10
              },
              emphasis: {
                areaColor: null, //鼠标滑过的颜色

                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
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
              // itemStyle: {
              //   normal: {
              //     borderColor: "var(--Colors)",

              //     borderWidth: 1
              //   }, //正常样式
              //   emphasis: {
              //     areaColor: "#10d4c3",
              //     borderWidth: 2,
              //     borderColor: "#10d4c3"
              //   } //鼠标事件区块样式
              // },
              data: this.mapAllData
            }
          ]
        };
        this.chart.setOption(option);
        this.chart.on("click", function(params) {
          sessionStorage.setItem("dealProvince", params.data.cantonProvince);
          clearTimeout(this.timeFn);
          this.timeFn = setTimeout(function() {
            const name = params.name;
            const mapCode = that.pro[name];
            console.log(mapCode, name);
            if (!mapCode) {
              return;
            }
            that.loadMapDeal(mapCode, name);
            if (sessionStorage.getItem("dealProvince")) {
              if (sessionStorage.getItem("dealProvince") == "150000") {
                that.cantonProvinceName = "内蒙古";
              } else if (sessionStorage.getItem("dealProvince") == "120000") {
                that.cantonProvinceName = "天津";
              } else if (sessionStorage.getItem("dealProvince") == "130000") {
                that.cantonProvinceName = "河北";
              } else if (sessionStorage.getItem("dealProvince") == "140000") {
                that.cantonProvinceName = "山西";
              } else if (sessionStorage.getItem("dealProvince") == "320000") {
                that.cantonProvinceName = "江苏";
              } else if (sessionStorage.getItem("dealProvince") == "330000") {
                that.cantonProvinceName = "浙江";
              } else if (sessionStorage.getItem("dealProvince") == "370000") {
                that.cantonProvinceName = "山东";
              } else if (sessionStorage.getItem("dealProvince") == "410000") {
                that.cantonProvinceName = "河南";
              } else if (sessionStorage.getItem("dealProvince") == "420000") {
                that.cantonProvinceName = "湖北";
              } else if (sessionStorage.getItem("dealProvince") == "430000") {
                that.cantonProvinceName = "湖南";
              } else if (sessionStorage.getItem("dealProvince") == "440000") {
                that.cantonProvinceName = "广东";
              } else if (sessionStorage.getItem("dealProvince") == "500000") {
                that.cantonProvinceName = "重庆";
              } else if (sessionStorage.getItem("dealProvince") == "510000") {
                that.cantonProvinceName = "四川";
              } else if (sessionStorage.getItem("dealProvince") == "530000") {
                that.cantonProvinceName = "云南";
              } else if (sessionStorage.getItem("dealProvince") == "630000") {
                that.cantonProvinceName = "青海";
              } else if (sessionStorage.getItem("dealProvince") == "650000") {
                that.cantonProvinceName = "新疆";
              } else if (sessionStorage.getItem("dealProvince") == "710000") {
                that.cantonProvinceName = "台湾";
              } else if (sessionStorage.getItem("dealProvince") == "810000") {
                that.cantonProvinceName = "香港";
              } else if (sessionStorage.getItem("dealProvince") == "820000") {
                that.cantonProvinceName = "澳门";
              } else if (sessionStorage.getItem("dealProvince") == "110000") {
                that.cantonProvinceName = "北京";
              } else if (sessionStorage.getItem("dealProvince") == "210000") {
                that.cantonProvinceName = "辽宁";
              } else if (sessionStorage.getItem("dealProvince") == "220000") {
                that.cantonProvinceName = "吉林";
              } else if (sessionStorage.getItem("dealProvince") == "230000") {
                that.cantonProvinceName = "黑龙江";
              } else if (sessionStorage.getItem("dealProvince") == "310000") {
                that.cantonProvinceName = "上海";
              } else if (sessionStorage.getItem("dealProvince") == "340000") {
                that.cantonProvinceName = "安徽";
              } else if (sessionStorage.getItem("dealProvince") == "350000") {
                that.cantonProvinceName = "福建";
              } else if (sessionStorage.getItem("dealProvince") == "450000") {
                that.cantonProvinceName = "广西";
              } else if (sessionStorage.getItem("dealProvince") == "360000") {
                that.cantonProvinceName = "江西";
              } else if (sessionStorage.getItem("dealProvince") == "460000") {
                that.cantonProvinceName = "海南";
              } else if (sessionStorage.getItem("dealProvince") == "520000") {
                that.cantonProvinceName = "贵州";
              } else if (sessionStorage.getItem("dealProvince") == "540000") {
                that.cantonProvinceName = "西藏";
              } else if (sessionStorage.getItem("dealProvince") == "610000") {
                that.cantonProvinceName = "陕西";
              } else if (sessionStorage.getItem("dealProvince") == "620000") {
                that.cantonProvinceName = "甘肃";
              } else if (sessionStorage.getItem("dealProvince") == "640000") {
                that.cantonProvinceName = "宁夏";
              }
            } else {
              that.cantonProvinceName = "全国";
            }
            that.$emit("dealProvinceName", that.cantonProvinceName);
          }, 250);
        });
      } else {
        alert("无法加载该地图");
      }
    },
    returnLastStep: function() {
      const that = this;
      this.chart = echarts.init(this.$refs.mapChart);

      // 绑定双击事件，返回全国地图
      this.chart.on("dblclick", function(params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem("dealProvince");
        clearTimeout(this.timeFn);
        that.loadMapDeal("../../static/map/json/china.json", "china");
        if (sessionStorage.getItem("dealProvince")) {
          if (sessionStorage.getItem("dealProvince") == "150000") {
            that.cantonProvinceName = "内蒙古";
          } else if (sessionStorage.getItem("dealProvince") == "120000") {
            that.cantonProvinceName = "天津";
          } else if (sessionStorage.getItem("dealProvince") == "130000") {
            that.cantonProvinceName = "河北";
          } else if (sessionStorage.getItem("dealProvince") == "140000") {
            that.cantonProvinceName = "山西";
          } else if (sessionStorage.getItem("dealProvince") == "320000") {
            that.cantonProvinceName = "江苏";
          } else if (sessionStorage.getItem("dealProvince") == "330000") {
            that.cantonProvinceName = "浙江";
          } else if (sessionStorage.getItem("dealProvince") == "370000") {
            that.cantonProvinceName = "山东";
          } else if (sessionStorage.getItem("dealProvince") == "410000") {
            that.cantonProvinceName = "河南";
          } else if (sessionStorage.getItem("dealProvince") == "420000") {
            that.cantonProvinceName = "湖北";
          } else if (sessionStorage.getItem("dealProvince") == "430000") {
            that.cantonProvinceName = "湖南";
          } else if (sessionStorage.getItem("dealProvince") == "440000") {
            that.cantonProvinceName = "广东";
          } else if (sessionStorage.getItem("dealProvince") == "500000") {
            that.cantonProvinceName = "重庆";
          } else if (sessionStorage.getItem("dealProvince") == "510000") {
            that.cantonProvinceName = "四川";
          } else if (sessionStorage.getItem("dealProvince") == "530000") {
            that.cantonProvinceName = "云南";
          } else if (sessionStorage.getItem("dealProvince") == "630000") {
            that.cantonProvinceName = "青海";
          } else if (sessionStorage.getItem("dealProvince") == "650000") {
            that.cantonProvinceName = "新疆";
          } else if (sessionStorage.getItem("dealProvince") == "710000") {
            that.cantonProvinceName = "台湾";
          } else if (sessionStorage.getItem("dealProvince") == "810000") {
            that.cantonProvinceName = "香港";
          } else if (sessionStorage.getItem("dealProvince") == "820000") {
            that.cantonProvinceName = "澳门";
          } else if (sessionStorage.getItem("dealProvince") == "110000") {
            that.cantonProvinceName = "北京";
          } else if (sessionStorage.getItem("dealProvince") == "210000") {
            that.cantonProvinceName = "辽宁";
          } else if (sessionStorage.getItem("dealProvince") == "220000") {
            that.cantonProvinceName = "吉林";
          } else if (sessionStorage.getItem("dealProvince") == "230000") {
            that.cantonProvinceName = "黑龙江";
          } else if (sessionStorage.getItem("dealProvince") == "310000") {
            that.cantonProvinceName = "上海";
          } else if (sessionStorage.getItem("dealProvince") == "340000") {
            that.cantonProvinceName = "安徽";
          } else if (sessionStorage.getItem("dealProvince") == "350000") {
            that.cantonProvinceName = "福建";
          } else if (sessionStorage.getItem("dealProvince") == "450000") {
            that.cantonProvinceName = "广西";
          } else if (sessionStorage.getItem("dealProvince") == "360000") {
            that.cantonProvinceName = "江西";
          } else if (sessionStorage.getItem("dealProvince") == "460000") {
            that.cantonProvinceName = "海南";
          } else if (sessionStorage.getItem("dealProvince") == "520000") {
            that.cantonProvinceName = "贵州";
          } else if (sessionStorage.getItem("dealProvince") == "540000") {
            that.cantonProvinceName = "西藏";
          } else if (sessionStorage.getItem("dealProvince") == "610000") {
            that.cantonProvinceName = "陕西";
          } else if (sessionStorage.getItem("dealProvince") == "620000") {
            that.cantonProvinceName = "甘肃";
          } else if (sessionStorage.getItem("dealProvince") == "640000") {
            that.cantonProvinceName = "宁夏";
          }
        } else {
          that.cantonProvinceName = "全国";
        }
        that.$emit("dealProvinceName", that.cantonProvinceName);
      });
    },
    useMsgDeal() {
      let params = this.params;
      params["analysisType"] = this.typeData;
      params["startDate"] = this.timeStartData;
      params["endDate"] = this.timeEndData;
      params["cantonProvince"] = sessionStorage.getItem("dealProvince");

      this.$axios.get(
        `/epf-monitor/monitor/trans/queryUseContrast`,
        params,
        res => {
          console.log(res);

          if (res.code == "0") {
            if (this.typeData == "") {
              var allNumberData = []; //所有宗数
              for (var key in res.result) {
                allNumberData.push(
                  res.result[key].transferNumber,
                  res.result[key].rentNumber,
                  res.result[key].mortgageNumber
                ); //所有宗数
              }
              function sum(arr) {
                return eval(arr.join("+"));
              }
              var allNumberSum = sum(allNumberData); //所有宗数总和
              var allData = [];

              var firstClassUseData = [];
              for (var key in res.result) {
                firstClassUseData.push(res.result[key].firstClassUse);
                allData.push({
                  firstClassUse: res.result[key].firstClassUse,
                  firstClassUseName: res.result[key].firstClassUseName,
                  number: res.result[key].sumNumber,
                  proportion: (
                    (res.result[key].sumNumber / allNumberSum) *
                    100
                  ).toFixed(2)
                  // proportion: Math.round(
                  //   (res.result[key].sumNumber / allNumberSum) * 100
                  // )
                });
              }
              console.log(allData);
              this.useData = allData;
              this.firstClassUseData = firstClassUseData;
              console.log(firstClassUseData);
            } else if (this.typeData == "transfer") {
              var transferNumberData = []; //转让宗数
              for (var key in res.result) {
                transferNumberData.push(res.result[key].transferNumber); //转让宗数
              }
              function sum(arr) {
                return eval(arr.join("+"));
              }
              var transferNumberSum = sum(transferNumberData); //转让宗数总和
              var transferData = [];
              var firstClassUseData = [];

              for (var key in res.result) {
                firstClassUseData.push(res.result[key].firstClassUse);
                transferData.push({
                  firstClassUse: res.result[key].firstClassUse,
                  firstClassUseName: res.result[key].firstClassUseName,
                  number: res.result[key].transferNumber,
                  proportion: (
                    (res.result[key].transferNumber / transferNumberSum) *
                    100
                  ).toFixed(2)
                  // proportion: Math.round(
                  //   (res.result[key].transferNumber / transferNumberSum) * 100
                  // )
                });
              }
              console.log(transferData);
              this.useData = transferData;
              this.firstClassUseData = firstClassUseData;
              console.log(firstClassUseData);
            } else if (this.typeData == "rent") {
              var rentNumberData = []; //出租宗数

              for (var key in res.result) {
                rentNumberData.push(res.result[key].rentNumber); //出租宗数
              }

              function sum(arr) {
                return eval(arr.join("+"));
              }
              var rentNumberSum = sum(rentNumberData); //出租宗数总和
              var rentData = [];
              var firstClassUseData = [];

              for (var key in res.result) {
                firstClassUseData.push(res.result[key].firstClassUse);
                rentData.push({
                  firstClassUse: res.result[key].firstClassUse,
                  firstClassUseName: res.result[key].firstClassUseName,
                  number: res.result[key].rentNumber,
                  proportion: (
                    (res.result[key].rentNumber / rentNumberSum) *
                    100
                  ).toFixed(2)
                  // proportion: Math.round(
                  //   (res.result[key].rentNumber / rentNumberSum) * 100
                  // )
                });
              }
              console.log(rentData);
              this.useData = rentData;
              this.firstClassUseData = firstClassUseData;
              console.log(firstClassUseData);
            } else if (this.typeData == "mortgage") {
              var mortgageNumberData = []; //抵押宗数
              for (var key in res.result) {
                mortgageNumberData.push(res.result[key].mortgageNumber); //抵押宗数
              }

              function sum(arr) {
                return eval(arr.join("+"));
              }

              var mortgageNumberSum = sum(mortgageNumberData); //抵押宗数总和
              var mortgageData = [];
              var firstClassUseData = [];

              for (var key in res.result) {
                firstClassUseData.push(res.result[key].firstClassUse);
                mortgageData.push({
                  firstClassUse: res.result[key].firstClassUse,
                  firstClassUseName: res.result[key].firstClassUseName,
                  number: res.result[key].mortgageNumber,
                  proportion: (
                    (res.result[key].mortgageNumber / mortgageNumberSum) *
                    100
                  ).toFixed(2)
                  // proportion: Math.round(
                  //   (res.result[key].mortgageNumber / mortgageNumberSum) * 100
                  // )
                });
              }
              console.log(mortgageData);
              this.useData = mortgageData;
              this.firstClassUseData = firstClassUseData;
              console.log(firstClassUseData);
            }
          } else {
            this.$message.error(res.msg); //失败
            return;
          }
        }
      );
    },
    changeDealMap() {
      if (sessionStorage.getItem("dealProvince")) {
        if (sessionStorage.getItem("dealProvince") == "150000") {
          this.loadMapDeal(
            "../../static/map/json/province/neimenggu.json",
            "内蒙古"
          );
        } else if (sessionStorage.getItem("dealProvince") == "120000") {
          this.loadMapDeal(
            "../../static/map/json/province/tianjin.json",
            "天津"
          );
        } else if (sessionStorage.getItem("dealProvince") == "130000") {
          this.loadMapDeal("../../static/map/json/province/hebei.json", "河北");
        } else if (sessionStorage.getItem("dealProvince") == "140000") {
          this.loadMapDeal(
            "../../static/map/json/province/shanxi.json",
            "山西"
          );
        } else if (sessionStorage.getItem("dealProvince") == "320000") {
          this.loadMapDeal(
            "../../static/map/json/province/jiangsu.json",
            "江苏"
          );
        } else if (sessionStorage.getItem("dealProvince") == "330000") {
          this.loadMapDeal(
            "../../static/map/json/province/zhejiang.json",
            "浙江"
          );
        } else if (sessionStorage.getItem("dealProvince") == "370000") {
          this.loadMapDeal(
            "../../static/map/json/province/shandong.json",
            "山东"
          );
        } else if (sessionStorage.getItem("dealProvince") == "410000") {
          this.loadMapDeal("../../static/map/json/province/henan.json", "河南");
        } else if (sessionStorage.getItem("dealProvince") == "420000") {
          this.loadMapDeal("../../static/map/json/province/hubei.json", "湖北");
        } else if (sessionStorage.getItem("dealProvince") == "430000") {
          this.loadMapDeal("../../static/map/json/province/hunan.json", "湖南");
        } else if (sessionStorage.getItem("dealProvince") == "440000") {
          this.loadMapDeal(
            "../../static/map/json/province/guangdong.json",
            "广东"
          );
        } else if (sessionStorage.getItem("dealProvince") == "500000") {
          this.loadMapDeal(
            "../../static/map/json/province/chongqing.json",
            "重庆"
          );
        } else if (sessionStorage.getItem("dealProvince") == "510000") {
          this.loadMapDeal(
            "../../static/map/json/province/sichuan.json",
            "四川"
          );
        } else if (sessionStorage.getItem("dealProvince") == "530000") {
          this.loadMapDeal(
            "../../static/map/json/province/yunnan.json",
            "云南"
          );
        } else if (sessionStorage.getItem("dealProvince") == "630000") {
          this.loadMapDeal(
            "../../static/map/json/province/qinghai.json",
            "青海"
          );
        } else if (sessionStorage.getItem("dealProvince") == "650000") {
          this.loadMapDeal(
            "../../static/map/json/province/xinjiang.json",
            "新疆"
          );
        } else if (sessionStorage.getItem("dealProvince") == "710000") {
          this.loadMapDeal(
            "../../static/map/json/province/taiwan.json",
            "台湾"
          );
        } else if (sessionStorage.getItem("dealProvince") == "810000") {
          this.loadMapDeal(
            "../../static/map/json/province/xianggang.json",
            "香港"
          );
        } else if (sessionStorage.getItem("dealProvince") == "820000") {
          this.loadMapDeal("../../static/map/json/province/aomen.json", "澳门");
        } else if (sessionStorage.getItem("dealProvince") == "110000") {
          this.loadMapDeal(
            "../../static/map/json/province/beijing.json",
            "北京"
          );
        } else if (sessionStorage.getItem("dealProvince") == "210000") {
          this.loadMapDeal(
            "../../static/map/json/province/liaoning.json",
            "辽宁"
          );
        } else if (sessionStorage.getItem("dealProvince") == "220000") {
          this.loadMapDeal("../../static/map/json/province/jilin.json", "吉林");
        } else if (sessionStorage.getItem("dealProvince") == "230000") {
          this.loadMapDeal(
            "../../static/map/json/province/heilongjiang.json",
            "黑龙江"
          );
        } else if (sessionStorage.getItem("dealProvince") == "310000") {
          this.loadMapDeal(
            "../../static/map/json/province/shanghai.json",
            "上海"
          );
        } else if (sessionStorage.getItem("dealProvince") == "340000") {
          this.loadMapDeal("../../static/map/json/province/anhui.json", "安徽");
        } else if (sessionStorage.getItem("dealProvince") == "350000") {
          this.loadMapDeal(
            "../../static/map/json/province/fujian.json",
            "福建"
          );
        } else if (sessionStorage.getItem("dealProvince") == "450000") {
          this.loadMapDeal(
            "../../static/map/json/province/guangxi.json",
            "广西"
          );
        } else if (sessionStorage.getItem("dealProvince") == "360000") {
          this.loadMapDeal(
            "../../static/map/json/province/jiangxi.json",
            "江西"
          );
        } else if (sessionStorage.getItem("dealProvince") == "460000") {
          this.loadMapDeal(
            "../../static/map/json/province/hainan.json",
            "海南"
          );
        } else if (sessionStorage.getItem("dealProvince") == "520000") {
          this.loadMapDeal(
            "../../static/map/json/province/guizhou.json",
            "贵州"
          );
        } else if (sessionStorage.getItem("dealProvince") == "540000") {
          this.loadMapDeal(
            "../../static/map/json/province/xizang.json",
            "西藏"
          );
        } else if (sessionStorage.getItem("dealProvince") == "610000") {
          this.loadMapDeal(
            "../../static/map/json/province/shanxi.json",
            "陕西"
          );
        } else if (sessionStorage.getItem("dealProvince") == "620000") {
          this.loadMapDeal("../../static/map/json/province/gansu.json", "甘肃");
        } else if (sessionStorage.getItem("dealProvince") == "640000") {
          this.loadMapDeal(
            "../../static/map/json/province/ningxia.json",
            "宁夏"
          );
        }
      } else {
        this.loadMapDeal("../../static/map/json/china.json", "china");
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.changeDealMap();
      this.useMsgDeal();
    });
    this.returnLastStep();
  },
  updated() {
    this.changeDealMap();
  },
  created() {
    this.typeData = this.dealMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
    this.currentNO = this.currentMessage;
    console.log(this.typeData);
    console.log(this.timeStartData);
    console.log(this.timeEndData);
    console.log(this.currentNO);
  },
  watch: {
    typeData(val) {
      this.changeDealMap();
    },
    dealMessage(val) {
      this.typeData = val;
      console.log(this.typeData);
      if (this.typeData == "") {
        this.typeDataName = "";
        this.useMsgDeal();
        this.changeDealMap();
      } else if (this.typeData == "transfer") {
        this.typeDataName = "转让";
        this.useMsgDeal();
        this.changeDealMap();
      } else if (this.typeData == "rent") {
        this.typeDataName = "出租";
        this.useMsgDeal();
        this.changeDealMap();
      } else if (this.typeData == "mortgage") {
        this.typeDataName = "抵押";
        this.useMsgDeal();
        this.changeDealMap();
      }
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.changeDealMap();
      this.useMsgDeal();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.changeDealMap();
      this.useMsgDeal();
    },
    currentMessage(val) {
      this.currentNO = val;
      this.changeDealMap();
      this.useMsgDeal();
    },
    "params.cantonProvince": {
      immediate: true,
      deep: true,
      handler(val) {
        this.changeDealMap();
        this.useMsgDeal();
      }
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
</style>
