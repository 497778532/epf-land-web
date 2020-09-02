<template>
  <div class="amap-page-container" :style="{width:'100%',height:'100%'}">
    <el-amap-search-box 
      class="search-box" 
      :search-option="searchOption" 
      :on-search-result="onSearchResult"
    >
    </el-amap-search-box>
    <div :style="{width:'100%',height:'100%'}">
      <el-amap 
        vid="amapDemo" 
        class="amap-demo" 
        :center="mapCenter" 
        :zoom="zoom" 
        :events="events"
      >
        <el-amap-marker v-for="(marker,index) in markers"
                        :position="marker" 
                        :key="index"
        ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>
<script>
export default {
  name:'maplngat',
  data(){
    const self = this;
    return {
      zoom:12,
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      address:'',
      obj:{},
      list:[],
      loaded: false,
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.obj=[lng,lat];
          self.$emit('headCallBack', String(self.obj));
        }
      },

      markers: [
        [106.708737,26.593895]
      ],
      searchOption: {
        city: '贵阳',
        citylimit: false
      },
      mapCenter: [106.708737,26.593895]
    }
  },
  methods:{
    getList:function(result){
      //获取列表
      var me = this;
      me.$Geocoder({
          lnglatXY:result,
          success:function(res){
              if(res.regeocode && res.regeocode.pois){
                  me.list = res.regeocode.pois;
              }else{
                  me.list = [];
              }
          },
          error:function(res){
              me.list = [];
          }
      });
    },
    $Geocoder(options){
      //将坐标点转化为，详细地址
      options = options || {};
      if(AMap){
          AMap.plugin(['AMap.Geocoder'], () => {
          const geocoder = new AMap.Geocoder({
              radius: options.radius || 1000,
              extensions: options.extensions || "all"
          })
          var  lnglatXY = options.lnglatXY || [114.397169, 30.50576]; //已知点坐标
          geocoder.getAddress(lnglatXY, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                  options.success && options.success(result);
                  console.log('这是详细地址的返回',result);
              }else{
                  options.error && options.error(status,result);
              }
          });
        });     
      }
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
    addMarker: function() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers.push([lng, lat]);
    },
    
  },
}
</script>
<style>
  .amap-demo {
    height: 200px;
  }
</style>