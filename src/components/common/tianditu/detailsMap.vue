<template>
  <div id="tianMap">
    <div id="mapDiv" class="mapDiv" ref="mapDiv"></div>
  </div>
</template>
<script>
import TMap from "./init";
import Axios from "axios";
export default {
  props: {},
  data() {
    return {
      T: "",
      map: "", //map对象
      zoom: 17, //地图显示级别
      ctrl: "", //地图类型控件
      marker: "", //地图标注对象
      markerInfoWin: "", //信息窗口对象
      // resultData:'', //该点附近信息返回
      datailedAddress: "", //定位详细地址
      addressComponent: "" //返回定位周边信息
    };
  },
  watch: {
    $route: "getPosition"
  },
  methods: {
    getPosition(lng, lat, marker) {
      TMap.init()
        .then(T => {
          this.T = T;
          this.map = new T.Map(this.$refs.mapDiv); //初始化地图
          this.map.centerAndZoom(new T.LngLat(lng, lat), this.zoom); //设置显示中心点和比例
          let lc = new T.LocalCity();
          let me = this;
          let listener = null;
          //创建地图类型对象
          this.ctrl = new T.Control.MapType();
          // 创建标注对象
          this.marker = new T.Marker(new T.LngLat(lng, lat));

          //添加地图类型控件到地图
          this.map.addControl(me.ctrl);
          if (marker) {
            //将标注添加到地图中
            me.map.addOverLay(me.marker);
          }

          //标注对象注册点击事件
          me.marker.addEventListener("click", function(e) {
            // 将信息框添加到地图中
            me.marker.openInfoWindow(me.markerInfoWin);
          });

          this.map.disableInertia(); //禁止鼠标地图惯性拖拽
          this.map.disableDoubleClickZoom(); //禁止双击地图放大
          this.map.disableKeyboard(); //禁止双击地图放大
          this.map.disableKeyboard(); //禁止键盘操作地图
        })
        .catch(error => {
          //失败回调
          console.log(error);
          this.$message({
            center: true,
            message: error,
            type: "error"
          });
        });
    },
    getAddressList(value) {
      //获取地址信息
      if (value == null) {
        this.zoom = 4;
        this.getPosition(109.5996, 33.50475, false);
      } else {
        let str = value.split(",");
        if (value.split(",").length == 2) {
          str = value.split(",");
        }
        if (value.split(" ").length == 2) {
          str = value.split(" ");
        }

        var lng = str[0];
        var lat = str[1];
        const that = this;
        const src = `http://api.tianditu.gov.cn/geocoder?postStr={'lon':${lng},'lat':${lat},'ver':1}&type=geocode&tk=4feda73bb9d29419a603a86d7adf447e`;
        Axios.get(src)
          .then(result => {
            console.log("地理逆编码返回---：", result.data.result);
            that.addressComponent = result.data.result.addressComponent; //周边信息赋值
            that.datailedAddress = result.data.result.formatted_address; //详细地址
            that.markerInfoWin = new T.InfoWindow(
              `<b>地址：</b><span style='color:red'>${that.datailedAddress}</span><br/>
          <b>最近地点：</b><span>${that.addressComponent.address}</span><br/>
          <b>距离最近地点：</b><span>${that.addressComponent.address_distance} <b>米</b></span><br/>
          <b>最近建筑：</b><span>${that.addressComponent.poi}</span><br/>
          <b>距离最近建筑：</b><span>${that.addressComponent.poi_distance} <b>米</b></span><br/>`
            );
            this.getPosition(lng, lat, true);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
#tianMap {
  width: 100%;
  height: 100%;
  /* box-sizing: border-box; */
  /* position: relative; */
}
.mapDiv {
  width: 100%;
  height: 100%;
}
</style>
