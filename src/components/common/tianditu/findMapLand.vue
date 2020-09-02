<template>
  <div id="tianMap" :style="{height:contentHeight}">
    <div id="mapDiv" class="mapDiv" ref="mapDiv" :style="{height:contentHeight}" v-if="forceRefresh"></div>
  </div>
</template>
<script>
import TMap from "./init";
import Axios from "axios";
import qs from "qs";
export default {
  props: {
    queryRadius: String,
  },
  data() {
    return {
      zhCn: [],
      numList: "",
      areaList: "",
      
      T: "", //T对象
      map: "", //map对象
      zoom: 5, //地图显示级别
      ctrl: "", //地图类型控件
      miniMap: "", //鹰眼对象
      marker: "", //标注对象
      menu: "", //右键菜单对象
      menuItem: "", //菜单选项对象
      administrative: "", //行政区划对象
      labelFrame: "", //圆文本对象集合
      range: "", //范围搜索对象
      queryMarker: "", //Select标注对象
      scale: "", //比例尺控件对象
      control: "", //缩放平移控件对象
      textInfoWindow: "", //标注信息框对象
      Province: "", //省份划分对象
      //******************* 参数数据 ***/
      city: "", //定位城市
      longitude: 108.59765, //经度
      latitude: 30.84187, //维度
      lntLatList: [], //各区经纬度
      positionData: "", //定位标注点信息
      positionX: "", //定位点经度
      positionY: "", //定位点纬度
      zoomSize: "", //当前缩放级别
      forceRefresh: true, //虚拟DOM刷新
      queryList: [],
    };
  },
  // beforeMount(height) {
  //   let screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //   console.log(screenHeight)
  //   this.contentHeight = screenHeight - 82 + "px";
  //   console.log(this.contentHeight)
  // },
  computed: {
    contentHeight: function() {
      let screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
      return (screenHeight - 85) + 'px';
    }
  },
  mounted() {
    this.$bus.$on("censusData", res => {
      //初始化各省统计数据
      this.zhCn = res.data.zhCn;
      this.numList = res.data.numList;
      this.areaList = res.data.areaList;
      this.getProvince()
    })
    this.$emit("addMapLoding") //调用父组件添加loading方法
    this.getLatitude()
  },
  watch: {
    $route: "getLatitude",
  },
  methods: {
    getLatitude() {
      // //获取定位城市经纬度显示地图
      // const AddressObj = JSON.parse(sessionStorage.getItem("Address"));
      // if (AddressObj !== null && AddressObj.creditCity !== "全国") {
      //   //定位成功显示当前城市
      //   this.longitude = AddressObj.creditLatitude;
      //   this.latitude = AddressObj.creditLongitude;
      //   this.city = AddressObj.creditCity;
      //   this.zoom = 8;
      //   this.getPosition("success");
      // } else {
      //   //默认全国
      //   Object.assign(this.$data, this.$options.data()); //初始化data所有数据
      //   this.getPosition("error");
      // }
      Object.assign(this.$data, this.$options.data()) //初始化data数据
      this.getPosition("error");
    },
    getPosition(state) {
      //载入地图
      TMap.init()
        .then(T => {
          this.T = T;
          this.map = new T.Map(this.$refs.mapDiv); //初始化地图
          this.map.centerAndZoom(
            new T.LngLat(this.longitude, this.latitude),
            this.zoom
          ); //设置显示中心点和比例
          let lc = new T.LocalCity();
          let _this = this;
          this.map.disableKeyboard(); //禁止键盘操作地图
          this.map.disableInertia(); //禁止鼠标地图惯性拖拽

          //创建缩放平移控件对象
          this.control = new T.Control.Zoom();
          //添加缩放平移控件
          this.map.addControl(this.control);

          //创建比例尺控件对象
          this.scale = new T.Control.Scale();
          //添加比例尺控件
          this.map.addControl(this.scale);

          //创建地图类型对象
          this.ctrl = new T.Control.MapType();
          //添加地图类型控件到地图
          this.map.addControl(_this.ctrl);

          //创建鹰眼实例
          this.miniMap = new T.Control.OverviewMap({
            isOpen: true,
            size: new T.Point(150, 150)
          });
          this.map.addControl(this.miniMap); //向地图添加鹰眼控件

          //创建右键菜单对象
          this.menu = new T.ContextMenu({ width: 100 });
          var txtMenuItem = [
            {
              text: "放大",
              callback: function() {
                _this.map.zoomIn();
              }
            },
            {
              text: "缩小",
              callback: function() {
                _this.map.zoomOut();
              }
            },
            {
              text: "放置到最大级",
              callback: function() {
                _this.map.setZoom(18);
              }
            },
            {
              text: "查看全国",
              callback: function() {
                _this.map.setZoom(4);
              }
            }
          ];
          //添加菜单项对象
          for (var i = 0; i < txtMenuItem.length; i++) {
            this.menuItem = new T.MenuItem(
              txtMenuItem[i].text,
              txtMenuItem[i].callback
            );
            this.menu.addItem(this.menuItem);
            if (i == 1) {
              //添加分割线
              this.menu.addSeparator();
            }
          } //添加右键菜单
          this.map.addContextMenu(this.menu);

          //注册缩放级别事件
          this.map.addEventListener("zoomend", this.zoomEnd);

          //设置最大显示级别
          this.map.setMinZoom(5) 

          if (state === "success") {
            //调用行政区统计方法
            _this.getTrative();
          } else if (state === "error") {
            _this.getProvince();
            _this.$emit("cleanMapLoading"); //调用父组件清除方法
            return;
          }
        })
        .catch(error => {
          this.$message({
            center: true,
            message: error,
            type: "error"
          });
        });
    },
    // zoomStart() {
    //   //地图缩放级别事件
    //   this.zoomSize = this.map.getZoom();
    // },
    zoomEnd() {
      //地图缩放级别事件
      this.zoomSize = this.map.getZoom();
    },
    getProvince() {
      //省份统计
      let _this = this;
      this.Province = new T.AdministrativeDivision();
      var AddList = {
        needSubInfo: true,
        needAll: false,
        needPolygon: true,
        needPre: false,
        searchType: 1,
        searchWord: "中国"
      };
      this.Province.search(AddList, searchResult);
      function searchResult(result) {
        if (result.getStatus() == 100) {
          var data = result.getData();
          showMsg(data);
        } else {
          result.getMsg();
        }
      }
      function showMsg(data) {
        let childArr = data[0].child;
        let newArr = []
         childArr.map((item,index)=>{
          _this.zhCn.map((val,ind)=>{
            if(item.cityCode.substr(3,6) == val.code){
              val.area = _this.areaList[ind]
              val.num = _this.numList[ind]
              newArr.push(val)
            }
          })
        })
        _this.lntLatList = childArr;
        //绘制圆
        _this.labelFrame = new Map(); //创建ES6-Map对象
        setTimeout(function() {
          for (let i = 0; i < childArr.length; i++) {

            let LngLat = new T.LngLat(
              childArr[i].lnt - 1.9,
              childArr[i].lat + 0.1
            );
            //创建地图文本对象
            let lableText = new T.Label({
              text: `<div class="epf_square" style="width:${childArr[i].name.length<=3? '65px' :''}">
                      <p class="epf_mapP">${childArr[i].name}<p>
                      <p>${newArr[i].num}块</p>
                      <p>${newArr[i].area}亩</p>
                    </div>`,
              position: LngLat,
              offset: new T.Point(-1, 0)
            });
            _this.labelFrame.set(childArr[i].cityCode, lableText); //将文本实例对象保存在Map对象中
            //设置文本框样式
            lableText.setFontColor("#fff");
            lableText.setBackgroundColor("rgba(95,174,235,0.8)");
            lableText.setBorderLine(0);
            lableText.setZindex(999);
            lableText.setTitle(childArr[i].name);
            //向地图创建地图文本
            _this.map.addOverLay(lableText);
            document.getElementsByClassName("tdt-clickable")[i].onclick = function(){
              _this.$emit('selectFun',{regionName:childArr[i].name,regionCode:childArr[i].cityCode.substr(3,6)})
            }
            _this.$emit("cleanMapLoading"); //调用父组件清除方法
          }
        }, 500);
      }
    },
    getTrative() {
      this.$bus.$on("censusData", res => {
        //初始化各城市统计数据
        this.zhCn = res.data.zhCn;
        this.numList = res.data.numList;
        this.areaList = res.data.areaList
      })
      //行政区统计
      const _this = this;
      //创建行政区划对象
      this.administrative = new T.AdministrativeDivision();
      var AddList = {
        needSubInfo: false,
        needAll: true,
        needPolygon: true,
        needPre: true,
        searchType: 1,
        searchWord: _this.city
      };
      this.administrative.search(AddList, searchResult);
      function searchResult(result) {
        if (result.getStatus() == 100) {
          var data = result.getData();
          const bounds = data[0].bound.split(",");
          //设置地图显示级别
          // _this.map.setMinZoom(8, 18);
          //设置地图显示范围
          // _this.map.setMaxBounds(new T.LngLatBounds(new T.LngLat(bounds[0],bounds[1]),
          // new T.LngLat(bounds[2],bounds[3])))
          showMsg(data);
        } else {
          result.getMsg();
        }
      }
      function showMsg(data) {
        let childArr = data[0].child;
        let newArr = []
         childArr.map((item,index)=>{
          _this.zhCn.map((val,ind)=>{
            if(item.cityCode.substr(3,6) == val.code){
              val.area = _this.areaList[ind]
              val.num = _this.numList[ind]
              newArr.push(val)
            }
          })
        })
        //获取各区经纬度
        _this.lntLatList = childArr;
        //绘制圆
        _this.labelFrame = new Map(); //创建ES6-Map对象
        setTimeout(function() {
          for (let a = 0; a < newArr.length; a++) {
            for (let n = 0; n < childArr.length; n++) {
              if (newArr[a].name == childArr[n].name) {

                //创建地图文本对象
                let latlng = new T.LngLat(
                  childArr[n].lnt - 0.09,
                  childArr[n].lat + 0.01
                );
                let lableText = new T.Label({
                  text: `<div class="epf_square" style="width:${childArr[a].name.length<=4 ? '65px' :''}">
                          <p class="epf_mapP">${childArr[a].name}<p>
                          <p>${newArr[a].num}块</p>
                          <p>${newArr[a].area}亩</p>
                        </div>`,
                  position: latlng,
                  offset: new T.Point(-1, 0)
                });

                _this.labelFrame.set(childArr[n].cityCode, lableText); //将文本实例对象保存在Map对象中
                //设置文本框样式
                lableText.setFontColor("#fff");
                lableText.setBackgroundColor("rgba(91,173,226,0.8)");
                lableText.setBorderLine(0);
                lableText.setTitle(childArr[n].name);
                //向地图创建地图文本
                _this.map.addOverLay(lableText);
                document.getElementsByClassName(
                  "tdt-clickable"
                )[0].style.lineHeight = "18px";
                // document.getElementsByClassName('tdt-clickable')[1].style.lineHeight= '18px'
                // document.getElementsByClassName('tdt-clickable')[2].style.lineHeight= '18px'
                // document.getElementsByClassName('tdt-clickable')[3].style.lineHeight= '18px'
                _this.$emit("cleanMapLoading"); //调用父组件清除方法
              }
            }
          }
        }, 500);
      }
    },
    selectFun(list) {
      // 父组件选择器触发--显示添加标识
      // let data = list[0].concat(list[1],list[2])
      // console.log(data.length,data)
      if (this.marker != "" && list !== "") {
        this.peripheralSearch(list);
      } else if (this.marker == "") {
        this.$emit("cleanLiving");
        this.$message({
          showClose: true,
          message: "请选择一个地点进行查询",
          type: "warning"
        });
      }else if(list == ""){
        this.$emit("cleanLiving");
        this.$message.error("请同时选择距离和配套设施进行查询")
      }
    },
    locationFun(value, data,queryRadius) {
      // 父组件定位按钮触发--定位添加标注
      this.positionData = value;
      let str = value.split(",");

      this.map.removeOverLay(this.marker); //移除定位点覆盖物
      this.map.removeOverLay(this.range); //移除定位返回覆盖物
      if (this.queryList !== []) {
        //移除POI定位点覆盖物
        for (let i = 0; i < this.queryList.length; i++) {
          this.map.removeOverLay(this.queryList[i]);
        }
      }
      //设置地图显示中心点-和比例-
      this.map.centerAndZoom(new T.LngLat(str[0], str[1]), 14);

      var icon = new T.Icon({
        //自定义图标
        iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
        iconSize: new T.Point(19, 27),
        iconAnchor: new T.Point(10, 25)
      });
      //向地图上添加自定义标注
      this.marker = new T.Marker(new T.LngLat(str[0], str[1]), { icon: icon });
      this.map.addOverLay(this.marker);
      //创建信息框
      this.textInfoWindow = new T.InfoWindow(`<b>标题：</b><span>${data.title}</span><br/>
        <b>地址：</b><span>${data.cantonAreaName}</span><br/>
        <b>面积：</b><span>${data.area}</span> 平方米<br/>
        <b>土地用途：</b><span>${data.firstClassUseName}-${data.secondClassUseName}</span><br/>`);
      //定位中心点赋值
      this.positionX = str[0];
      this.positionY = str[1];

      //范围样式设置
      let config = {
        color: "blue", //折线颜色
        fillColor: "#fff", //填充颜色。当参数为空时，折线覆盖物将没有填充效果
        weight: "1", //折线的宽度，以像素为单位
        opacity: 0.5, //折线的透明度，取值范围0 - 1
        fillOpacity: 0.4,
        lineStyle: "dashed" //折线的样式，solid或dashed
      };
      //定义该矩形的显示区域
      this.range = new T.Circle(new T.LngLat(str[0], str[1]), Number(this.queryRadius), config);
      this.map.addOverLay(this.range);
      this.marker.openInfoWindow(this.textInfoWindow);
      //移除标注的点击事件，防止多次注册
      removeEventListener("click", this.MarkerClick);
      //注册标注的点击事件
      this.marker.addEventListener("click", this.MarkerClick);
    },
    MarkerClick() {
      //添加标注注册的点击事件
      this.marker.openInfoWindow(this.textInfoWindow);
    },
    peripheralSearch(value) {
      //POI搜索请求
      const _this = this;
      let Numer = `postStr={"keyWord":"${value}","level":"15",
      "mapBound":"${this.positionX},${this.positionY},${this.positionX -
        0.05},${this.positionY - 0.05}",
      "queryRadius":"${this.queryRadius}","queryType":"3","pointLonlat":"${this.positionX},${
        this.positionY
      }",
      "count":"50","start":"0"}`;
      const urls = `http://api.tianditu.gov.cn/search?${Numer}&type=query&tk=4feda73bb9d29419a603a86d7adf447e`;
      //keyWord: 搜索关键词 、level：查询级别、mapBound：查询范围、queryType：查询类型
      //queryRadius：查询半径、pointLonlat：点坐标、count：返回条目、start：返回结果起始位置

      Axios.get(urls)
        .then(result => {
          let resData = result.data.pois;
          var icon = new T.Icon({
            iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
            iconSize: new T.Point(19, 27),
            iconAnchor: new T.Point(10, 25)
          });
          if (resData !== undefined) {
            if (_this.queryList !== []) {
              //移除POI定位点覆盖物
              for (let i = 0; i < _this.queryList.length; i++) {
                _this.map.removeOverLay(_this.queryList[i]);
              }
            }
            for (let l = 0; l < resData.length; l++) {
              var point = new T.LngLat(
                Number(resData[l].lonlat.split(" ")[0]),
                Number(resData[l].lonlat.split(" ")[1])
              );
              _this.queryMarker = new T.Marker(point); // 创建标注
              _this.queryList.push(_this.queryMarker); //将每个标注保存下来
              _this.map.addOverLay(_this.queryMarker); //添加进地图
              var markerInfoWin = `<b>${value}：</b><span>${resData[l].name}</span><br/>
            <b>地址：</b><span>${resData[l].address}</span><br/>`; //设置信息框内容
              _this.addClickHandler(markerInfoWin, _this.queryMarker); //调用注册事件方法
            }
          } else {
            if (_this.queryList !== []) {
              //移除POI定位点覆盖物
              _this.$message({
                message: `这附近没有${value}`,
                type: "warning"
              });
              for (let i = 0; i < _this.queryList.length; i++) {
                _this.map.removeOverLay(_this.queryList[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addClickHandler(content, marker) {
      //为标注注册点击事件
      const _this = this;
      _this.queryMarker.addEventListener("click", function(e) {
        _this.openInfo(content, e);
      });
    },
    openInfo(content, e) {
      //查询标注点击事件
      var point = e.lnglat;
      this.queryMarker = new T.Marker(point); // 创建标注
      var markerInfoWin = new T.InfoWindow(content, {
        offset: new T.Point(0, -30)
      }); // 创建信息窗口对象
      this.map.openInfoWindow(markerInfoWin, point); //开启信息窗口
    },
    positionMap(location, param, code) {
      console.log(location, param, code)
      //土地位置定位
      this.$emit("addMapLoding"); //调用父组件添加loading方法
      this.forceRefresh = false; //删除虚拟DOM
      if (code) {
        const src = `http://api.tianditu.gov.cn/geocoder?ds={"keyWord":"${location}"}&tk=4feda73bb9d29419a603a86d7adf447e`;
        Axios.get(src).then(result => {
          Object.assign(this.$data, this.$options.data()); //初始化data所有数据
          console.log(result.data)
          const cityName = result.data.location;
          this.longitude = cityName.lon;
          this.latitude = cityName.lat;
          this.city = location;
          this.zoom = 8;
          this.$axios.get("/epf-cms/regionals/getAreaByCodeOrParentId?parentId="+code, {}, res => {
            if (res.code == 0) {
              let arr = [];
              let newZhcn = [];
              this.capitalContainer = res.dictionariesList;
              this.$axios.get("/epf-landweb/tlandSearch/mapLocationStatistics?cantonProvince=" +code,qs.stringify(param), res => {
                  this.capitalContainer.map((item,index)=>{
                    res.data.zhCn.map((val,ind)=>{
                        if(item.regionName == val){
                            val = {'name':val,'code':item.regionCode}
                            newZhcn.push(val)
                      }
                    })
                  })
                  res.data.zhCn = newZhcn
                  this.$bus.$emit("censusData", res);
                  this.getPosition("success");
              });
            }
          });
        });
      } else {
        this.$axios.get(
          "/epf-landweb/tlandSearch/mapLocationStatistics",
          qs.stringify(param),
          res => {
            this.zhCn= {name:"北京市",code:"110000"},
            this.numList = res.data.numList;
            this.areaList = res.data.areaList;
          }
        );
        this.getPosition("error");
      }
    },
    cleaOptions(param) {
      //父组件点击清除选项
      this.forceRefresh = false; //删除虚拟DOM
      this.$emit("addMapLoding"); //调用父组件添加loading方法
      // this.getLatitude();

         this.$axios.get("/epf-cms/regionals/getRegionalTree", {}, res => {
        if (res.code == 0) {
          let newZhcn = [];
          for (let i = 0; i < res.dataTree.length; i++) {
            for (let j = 0; j < res.dataTree[i].children.length; j++) {
              delete res.dataTree[i].children[j].children;
            }
          }
          this.capitalContainer = res.dataTree;
          this.$axios.get("/epf-landweb/tlandSearch/mapLocationStatistics",qs.stringify(param), res => {
            Object.assign(this.$data, this.$options.data()) //初始化data数据
            this.capitalContainer.map((item,index)=>{
                res.data.zhCn.map((val,ind)=>{
                    if(item.regionName == val){
                        val = {'name':val,'code':item.regionCode}
                        newZhcn.push(val)
                  }
                })
              })
              res.data.zhCn = newZhcn;
              this.zhCn = res.data.zhCn;
              this.numList = res.data.numList;
              this.areaList = res.data.areaList;
              this.getPosition("error");
          });
        }
      });
    },
  },
  watch: {
    zoomSize(now, old) {
      console.log('缩放级别',now)
      //监听地图缩放级别
      let _this = this;
      if (now >= 12) {
        //固定值减少执行次数
        for (let n = 0; n < _this.lntLatList.length; n++) {
          _this.labelFrame.get(_this.lntLatList[n].cityCode).hide(); //获取文本对象执行隐藏方法
        }
        if (_this.queryList !== []) {
          //显示POI定位点覆盖物
          // _this.marker.show();
          // _this.range.show();
          for (let i = 0; i < _this.queryList.length; i++) {
            _this.queryList[i].show();
          }
        }
      } else if (now <= 12) {
        for (let n = 0; n < _this.lntLatList.length; n++) {
          _this.labelFrame.get(_this.lntLatList[n].cityCode).show(); //显示
        }
        if (_this.queryList !== []) {
          //隐藏POI定位点覆盖物
          // _this.marker.hide();
          // _this.range.hide();
          for (let i = 0; i < _this.queryList.length; i++) {
            _this.queryList[i].hide();
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#tianMap {
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
  position: relative;
  .mapDiv {
    width: 100%;
    // height: 100%;
  }
  .tdt-label {
    line-height: 18px;
  }
}
</style>