<template>
  <div id="tianMap">
    <div id="mapDiv" class="mapDiv" ref="mapDiv"></div>
  </div>
</template>
<script>
import TMap from "./init";
import Axios from "axios";
export default {
  props: {
    position:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      T: "",
      map: "", //map对象
      zoom: 8, //地图显示级别
      ctrl: "", //地图类型控件
      marker: "", //地图标注对象
    }
  },
  created(){
    let lng = this.position.split(",")[0]
    let lat = this.position.split(",")[1]
    this.getPosition(lng,lat)
  },
  methods: {
    getPosition(lng, lat) {
      TMap.init()
        .then(T => {
          this.T = T;
          this.map = new T.Map(this.$refs.mapDiv); //初始化地图
          this.map.centerAndZoom(new T.LngLat(lng, lat), this.zoom); //设置显示中心点和比例
          let lc = new T.LocalCity();
          let _this = this;

          var icon = new T.Icon({ //自定义图标
            iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
            iconSize: new T.Point(19, 27),
            iconAnchor: new T.Point(10, 25)
          })
          //创建标注对象
          this.marker = new T.Marker(new T.LngLat(lng,lat),{icon:icon})
          //创建地图类型对象
          this.ctrl = new T.Control.MapType()
    
          this.map.addControl(_this.ctrl)
          this.map.addOverLay(_this.marker)


          this.map.disableInertia(); //禁止鼠标地图惯性拖拽
          this.map.disableDoubleClickZoom(); //禁止双击地图放大
          this.map.disableKeyboard(); //禁止双击地图放大
          this.map.disableKeyboard(); //禁止键盘操作地图
        })
        .catch(error => { //失败回调
          console.log(error);
          this.$message({
            center: true,
            message: error,
            type: "error"
          });
        });
    },
   
  }
};
</script>
<style scoped>
#tianMap {
  width: 100%;
  height: 100%;
}
.mapDiv {
  width: 100%;
  height: 100%;
}
</style>
