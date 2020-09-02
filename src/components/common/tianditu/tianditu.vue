<template>
  <div id="tianMap">
    <div class="mapTools">
      <input class="textIpt" type="text" id="searchVal" v-model="searchLand" placeholder="请输入搜索内容" />
      <span class="epf_btn epf_btn_bg" @click="searchRes">搜索</span>
      <span class="epf_btn epf_btn_bg" id="setMar" @click="setMarker" style="margin-left:20px;">标注</span>
    </div>
    <div id="mapDiv" class="mapDiv" ref="mapDiv"></div>
  </div>
</template>
<script>
import TMap from "./init";
export default {
  props: ["coordinate"],
  data() {
    return {
      T: "",
      map: "", //地图对象
      localsearch: "", //搜索对象
      searchLand: "", //input绑定数据
      markerTool: "", //标注对象
      ctrl: "", //地图类型对象
      scale: "", //比例尺对象
      miniMap: "", //鹰眼对象
      control: "", //缩放对象
      userMar: null,
      marker: null,//标注对象
      longitude: 109.5996, //经度
      latitude: 33.50475, //维度
      zoom: 4, //显示级别
    };
  },
  mounted() {
    this.getPosition();
  },
  watch: {
    $route: "getPosition"
  },
  methods: {
    getPosition() {
      TMap.init()
        .then(T => {
          this.T = T;
          this.map = new T.Map(this.$refs.mapDiv);
          this.map.centerAndZoom(
            new T.LngLat(this.longitude, this.latitude),
            this.zoom
          );
          let lc = new T.LocalCity();
          let _this = this;
          let listener = null;
          let geocode = new T.Geocoder();
          this.map.setMinZoom(4, 15);

          //自定义图标
          var icon = new T.Icon({
            iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
            iconSize: new T.Point(19, 27),
            iconAnchor: new T.Point(10, 25)
          })
          //创建标注对象
          this.marker = new T.Marker(
            new T.LngLat(this.longitude, this.latitude),
            { icon: icon }
          );


          if (this.coordinate !== "") {
            var lnglatArr = this.coordinate.split(",")
            this.longitude = lnglatArr[0];
            this.latitude = lnglatArr[1];
            //创建标注对象
            this.marker = new T.Marker(
              new T.LngLat(this.longitude, this.latitude),
              { icon: icon }
            )
            //向地图上添加标注
            this.map.addOverLay(this.marker)
          }


          //
          //鹰眼控件
          this.miniMap = new T.Control.OverviewMap({
            isOpen: true,
            size: new T.Point(100, 100)
          });
          this.map.addControl(this.miniMap);

          //创建缩放平移控件对象
          this.control = new T.Control.Zoom();
          //添加缩放平移控件
          this.map.addControl(this.control);

          //创建比例尺控件对象
          this.scale = new T.Control.Scale();
          //添加比例尺控件
          this.map.addControl(this.scale);

          //创建对象
          this.ctrl = new T.Control.MapType();
          //添加控件
          this.map.addControl(this.ctrl);
          //

          // 地图拾取器方法
          // let cp = new T.CoordinatePickup(this.map,{callback:getLngLat})
          // _this.map.addEventListener("click", function(e){
          //   geocode.getLocation(e.lnglat,searchResult)
          // })
          // cp.addEvent()

          //创建标注工具对象
          var icon = new T.Icon({
            iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
            iconSize: new T.Point(19, 27),
            iconAnchor: new T.Point(10, 25)
          });
          this.markerTool = new T.MarkTool(this.map, {
            follow: true,
            icon: icon
          });
          this.markerTool.addEventListener("mouseup", function markerDown(e) {
            _this.map.removeOverLay(_this.marker); //移除定位点覆盖物
            if (typeof _this.markerTool.getMarkControlPoint().lat == "number") {
              if (document.getElementById("setMar").innerText == "标注") {
                document.getElementById("setMar").innerText = "重标标注";
              }
              _this.$emit("coordinateMap", {
                lng: _this.markerTool.getMarkControlPoint().lng,
                lat: _this.markerTool.getMarkControlPoint().lat
              });
            }
          });

          //
          let config = {
            pageCapacity: 10, //每页显示的数量
            onSearchComplete: localSearchResult //接收数据的回调函数
          };
          //创建搜索对象
          this.localsearch = new T.LocalSearch(this.map, config);

          function localSearchResult(result) {
            console.log("进入此函数", result);
            //清空地图及搜索列表
            clearAll();
            //根据返回类型解析搜索结果
            switch (parseInt(result.getResultType())) {
              case 1:
                //解析点数据结果
                pois(result.getPois());
                break;
              case 2:
                //解析推荐城市
                statistics(result.getStatistics());
                break;
              case 3:
                //解析行政区划边界
                area(result.getArea());
                break;
              case 4:
                //解析建议词信息
                suggests(result.getSuggests());
                break;
              case 5:
                //解析公交信息
                lineData(result.getLineData());
                break;
            }
          }

          function pois(obj) {
            if (obj) {
              //坐标数组，设置最佳比例尺时会用到
              var zoomArr = [];
              for (var i = 0; i < obj.length; i++) {
                //闭包
                (function(i) {
                  //名称
                  var name = obj[i].name;
                  //地址
                  var address = obj[i].address;
                  //坐标
                  var lnglatArr = obj[i].lonlat.split(" ");
                  var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                  var winHtml = "名称:" + name + "<br/>地址:" + address;
                  //创建标注对象
                  var marker = new T.Marker(lnglat);
                  //地图上添加标注点
                  _this.map.addOverLay(marker);
                  //注册标注点的点击事件
                  var markerInfoWin = new T.InfoWindow(winHtml, {
                    autoPan: true
                  });
                  marker.addEventListener("click", function(e) {
                    _this.$emit("coordinateMap", {
                      lng: e.lnglat.getLng(),
                      lat: e.lnglat.getLat()
                    });
                    marker.openInfoWindow(markerInfoWin);
                  });
                  zoomArr.push(lnglat);
                })(i);
              }
              //显示地图的最佳级别
              _this.map.setViewport(zoomArr);
            }
          }
          //清空地图及搜索列表
          function clearAll() {
            _this.map.clearOverLays();
          }
          //
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchRes() {
      if (this.searchLand !== "") {
        this.localsearch.search(this.searchLand);
      } else {
        this.$message({
          showClose: true,
          message: "搜索内容不能为空",
          type: "warning"
        });
      }
    },
    // //  开启标注地点
    setMarker() {
      console.log("====this.markerTool====",this.markerTool)
      //  删除已标注 保证只有一个标记
      if(this.markerTool){
        this.markerTool.clear();
        this.userMar = this.markerTool.getMarkers();
        for (var i = 0; i < this.userMar.length; i++) {
          this.userMar[i].disableDragging();
        }
        this.markerTool.open();
      }
    }
  }
};
</script>

<style scoped>
#tianMap {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  position: relative;
}
.mapDiv {
  width: 100%;
  height: 100%;
}

.mapTools {
  margin-bottom: 10px;
  height: 40px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
}
.textIpt {
  height: 40px;
  width: 50%;
  color: #979a9a;
  background-color: #f1f6f7;
  padding-left: 15px;
  margin-right: 30px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  vertical-align: top;
}
</style>

