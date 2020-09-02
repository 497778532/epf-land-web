<template>
  <div class="modeMsg">
    <el-row class="box">
      <el-col :span="10">
        <img alt  v-lazy="baseUrl +  (data.imgId ? data.imgId : data.img)" class="defImage"/>
      </el-col>
      <el-col :span="14" class="content">
        <h5 @click="clickTitle(data)" :style="!showFlag ?'margin-top:30px':''" style="width:192px;display:inline-block;text-overflow: -o-ellipsis-lastline;
        overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;
        line-clamp: 2;-webkit-box-orient: vertical;">
          <span :title="data.trustTitle">{{data.trustTitle}}</span>
          <span :title="data.title">{{data.title}}</span>
          <span :title="data.targetNo" v-if="showLandUseFlag">{{data.targetNo}}</span>
        </h5>
        <p v-if="showFlag"
          :title="
          data.cantonProvinceName?(data.cantonProvinceName+'-'+data.cantonCityName+'-'+data.cantonAreaName):
          (data.goodsList[0].cantonProvinceName+'-'+data.goodsList[0].cantonCityName+'-'+data.goodsList[0].cantonAreaName)
          "
        >
          行政区域：  
          {{data.cantonProvinceName?data.cantonProvinceName:data.goodsList[0].cantonProvinceName}}-
          {{data.cantonCityName?data.cantonCityName:data.goodsList[0].cantonCityName}}-
          {{data.cantonAreaName?data.cantonAreaName:data.goodsList[0].cantonAreaName}}
        </p>
        <p v-if="!showLandUseFlag">
          <span v-if="showFlag">面积：{{data.area}} 平方米</span>
        </p>
        <p v-if="showFlag&&showLandUseFlag" 
          :title="data.firstClassUseName?(data.firstClassUseName+'-'+data.secondClassUseName):(data.goodsList[0].firstClassUseName+'-'+data.goodsList[0].secondClassUseName)">
          土地用途：
          {{data.firstClassUseName?data.firstClassUseName:data.goodsList[0].firstClassUseName}}-
          {{data.secondClassUseName?data.secondClassUseName:data.goodsList[0].secondClassUseName}}
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
export default {
  name: "modeMsg",
  props:['data','showLandUseFlag'],
  // props: {
  //   data: {
  //     type: Array||Object,
  //     default: {}
  //   },
  //   showLandUseFlag:Boolean
  // },
  data() {
    return {
      baseUrl: "",
      showFlag:true,
    };
  },
  created() {
    if (this.$router.currentRoute.path == "/PersonalCenter/intentionPrice"){
      this.showFlag = false
    }
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
  },
  methods: {
    clickTitle(data) {
      this.$emit('clickTitle',data);
    }
  }
};
</script>
<style lang="scss" scoped>
.modeMsg {
  .box {
    width: 100%;
    height: 100%;
    padding: 15px;
    text-align: left;
    .defImage {
      display: block;
      height: 91px;
      width: 122px;
      float: left;
    }
    .content {
      height: 91px;
      h5 {
        width: 100%;
        height: 38px;
        cursor: pointer;
        // white-space:nowrap;
        // overflow:hidden;
        // text-overflow:ellipsis;
      }
      &:hover {
        color: #4472d4;
      }
      p {
        color: #999;
        font-size: 12px;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>