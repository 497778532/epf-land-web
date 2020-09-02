<template>
  <div class="landDetails_warp" ref="box">
    <epf-lePage :location="location"></epf-lePage>
    <div class="pro-detail-hd-fixed-div" :class="searchBarFixed == true ? 'isFixed' :''">
      <div class="win1200">
        <span v-for="(item,index) in landshowData" :key="index" @click="selectSpan(index)" :class="{spanActive:spanKey == index}">{{item}}</span>
      </div>
    </div>
    <div class="landmain">
      <div class="landshow_top win1200">
        <div class="landshow_huandeng">
          <div class="pic-box" v-if="currentImg && currentImg!==''">
            <pic-zoom :url="currentImg" :scale="3"></pic-zoom>
          </div>
          <div class="pic-box" v-else>
            <img src="@/assets/image/icon-nodata.png" alt="" width="100%" height="100%">
          </div>
          <div class="smallImg">
            <ul>
              <li class="list-img">
                <div class="list-img-wrap" ref="carouser">
                  <div
                    @click="getCurImg(item.url, index)"
                    v-for="(item,index) in imgUrl"
                    :key="index"
                    class="single-img"
                    :class="{'img-activce': item.url == curCode && imgActive}"
                  >
                    <img v-if="item.extName == 'png'" v-lazy="item.url" alt="缩略图" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="landshow_topcent">
          <p class="landshow_title">{{detailData.title}}</p>
          <p class="landshow_titlebot">
            <span style="font-size:12px;">
              <img src="@/assets/image/icon-map.png" alt style="vertical-align: middle;" />
              {{detailData.cantonProvinceName}} / {{detailData.cantonCityName}} / {{detailData.cantonAreaName}}
            </span>
            <span>
              <img src="@/assets/image/icon-time.png" alt style="vertical-align: middle;" />
              {{detailData.insertTime}}
            </span>
            <span>
              <img src="@/assets/image/icon-liulan.png" alt style="vertical-align: middle;" />
              {{detailData.viewsNum}} 次
            </span>
            <span>
              <img src="@/assets/image/nocollect.png" alt style="vertical-align: middle;"/>
              {{detailData.collectionNum}} 次
            </span>
          </p>
          <div class="landshow_pice">
            成交价格：
            <span v-if="detailData.price">
              <span>￥{{detailData.price/10000}}</span>
              <span style="font-size: 20px;">万元</span>
            </span>
            <span v-else>面议</span>
            <div class="landshow_sc landshow_rz" style="color: #ffa000;border: solid 1px #ffa000;" v-if="detailData.publishStatus == 'audit'">未经属地认证</div>
            <div class="landshow_sc landshow_rz" style="color: #ffa000;border: solid 1px #ffa000;" v-else>属地认证</div>
            <div class="landshow_sc landshow_type" style="color: #4875cf;border: solid 1px #4875cf;">{{detailData.landTypeName}}</div>
          </div>
          <p class="landshow_p"><span>交易方式：</span>自行交易</p>
          <p class="landshow_p"><span>流转方式：</span>{{detailData.circulationName}}</p>
          <p class="landshow_p"><span>{{detailData.circulationName}}面积：</span>{{detailData.area?detailData.area+'平方米':detailData.area}}</p>
          <p class="landshow_p"><span>土地用途：</span>{{detailData.firstClassUseName}}-{{detailData.secondClassUseName}}</p>
          <!-- <p class="landshow_p"><span>成交价格：</span>{{seekPrice?Division(seekPrice)+'万元':null}}</p> -->
          <p class="landshow_p"><span>成交时间：</span>{{detailData.insertTime}}</p>
          <div class="landshow_topbot" v-if="detailData.circulationName == '转让'">
            <div>转让方：{{firstParty}}</div>
            <div>受让方：{{secondParty}}</div>
          </div>
          <div class="landshow_topbot" v-if="detailData.circulationName == '出租'">
            <div>出租方：{{firstParty}}</div>
            <div>承租方：{{secondParty}}</div>
          </div>
          <div class="landshow_topbot" v-if="detailData.circulationName == '抵押'">
            <div>抵押人：{{firstParty}}</div>
            <div>抵押权人：{{secondParty}}</div>
          </div>
          <div class="input_sub" v-show="(detailData.isCollect=='0' || !detailData.isCollect)" @click="nocollect(detailData.id)">
            <img src="@/assets/image/collect1-1.png" alt style="vertical-align: middle" width="20" height="20"/>
            <span>收藏</span>
          </div>
          <div class="input_sub" v-show="detailData.isCollect=='1'" @click="collect(detailData.collectId)">
            <img src="@/assets/image/collect-1.png" alt style="vertical-align: middle" width="18" height="18"/>
            <span>取消收藏</span>
          </div>
        </div>
      </div>
      <div class="brick-list win1200">
        <div class="brick-item">
          <div class="landshow_main_listtop">
            <span v-for="(item,index) in landshowData" :key="index" @click="selectSpan(index)" :class="{spanActive:spanKey == index}">{{item}}</span>
          </div>
          <div class="brick-item-list navlist0">
            <div class="brick-item-title"><img src="@/assets/image/icon-13.png" alt />地块信息</div>
           <table width="846" cellpadding="0" cellspacing="0" class="landshow_table">
              <tr>
                <td class="td1">土地性质</td>
                <td class="td2">{{detailData.landCharName}}</td>
                <td class="td1">是否连同地上附属物、建筑物等</td>
                <td class="td2">{{detailData.adjunct==1?'无':'有'}}</td>
              </tr>
              <tr>
                <td class="td1">土地类型</td>
                <td class="td2">{{detailData.landTypeName}}</td>
                <td class="td1">建筑面积</td>
                <td class="td2">{{detailData.buildArea?detailData.buildArea+'平方米':null}}</td>
              </tr>
              <!-- <tr>
                <td class="td1">土地使用权证</td>
                <td class="td2">有</td>
                <td class="td1">土地权属状态</td>
                <td class="td2">已认证</td>
              </tr> -->
              <tr>
                <td class="td1">所属行政区</td>
                <td
                  class="td2"
                >{{detailData.cantonProvinceName}}{{detailData.cantonCityName}}{{detailData.cantonAreaName}}</td>
                <td class="td1">建筑结构</td>
                <td class="td2">{{detailData.buildingStructureName}}</td>
              </tr>
              <tr>
                <td class="td1">土地用途</td>
                <td class="td2">{{detailData.firstClassUseName}}-{{detailData.secondClassUseName}}</td>
                <td class="td1">绿地率</td>
                <td
                  class="td2"
                >{{detailData.greenSpaceRate}}{{detailData.greenSpaceRate?'% ':''}}{{detailData.greenSpaceRateSymbol1}}<span v-if="detailData.greenSpaceRate || detailData.greenSpaceRate2">绿地率</span>{{detailData.greenSpaceRateSymbol2}} {{detailData.greenSpaceRate2}}{{detailData.greenSpaceRate2?'%':''}}</td>
              </tr>
              <tr>
                <td class="td1">{{detailData.circulationName}}面积</td>
                <td class="td2">{{detailData.area?detailData.area+'平方米':null}}</td>
                <td class="td1">建筑密度</td>
                <td
                  class="td2"
                >{{detailData.buildingDensity}}{{detailData.buildingDensity?'%':''}}{{detailData.buildingDensitySymbol1}}<span v-if="detailData.buildingDensity || detailData.buildingDensity2">建筑密度</span>{{detailData.buildingDensitySymbol2}} {{detailData.buildingDensity2}}{{detailData.buildingDensity2?'%':''}}</td>
              </tr>
              <tr>
                <td class="td1">使用权截止日期</td>
                <td class="td2">{{detailData.endDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(detailData.endDate)[0]:''}}</td>
                <td class="td1">建筑限高</td>
                <td class="td2">{{detailData.heightLimit?detailData.heightLimit+' 米':''}}</td>
              </tr>
              <tr>
                <el-popover
                  v-if="detailData.circulationName == '转让'"
                  placement="bottom"
                  width="200"
                  trigger="hover">
                  <div solt="content" style="padding:10px;line-height:20px;color:#666">
                      <p>剩余使用年限为估算值，最终以使用权截止日期为准。</p>
                  </div>
                  <td  slot="reference" class="td1">{{detailData.circulationName == "转让"?"剩余使用":detailData.circulationName}}年限<i class="question"></i></td>
                </el-popover>
                <td class="td1"  v-else>{{detailData.circulationName == "转让"?"剩余使用":detailData.circulationName}}年限</td>

                <td class="td2">{{detailData.years}}</td>
                <td class="td1">容积率</td>
                <td class="td2">{{detailData.plotRatio}}{{detailData.plotRatio?'% ':''}}{{detailData.plotRatioSymbol1}}<span v-if="detailData.plotRatio || detailData.plotRatio2">容积率</span>{{detailData.plotRatioSymbol2}}{{detailData.plotRatio2}}{{detailData.plotRatio2?'%':''}}</td>
              </tr>
              <tr>
                <td class="td1">土地坐落</td>
                <td class="td2">{{detailData.location}}</td>
                <td class="td1">权证号</td>
                <td class="td2">{{detailData.warrantNum}}</td>
              </tr>
            </table>
          </div>
          <div class="brick-item-list navlist1">
            <div class="brick-item-title"><img src="@/assets/image/icon-13.png" alt />地块照片视频</div>
            <div class="landshow_leftpic">
              <div v-for="(item) in mp4Url" :key="item.url">
                <video
                  v-if="item.extName == 'mp4'"
                  loop
                  height="284px"
                  :src="item.url"
                  controls="controls"
                  style="outline:none;"
                >您的浏览器不支持 video 标签。</video>
              </div>
              <div v-for="(item) in imgUrl" :key="item.url">
                <img :src="item.url" alt />
              </div>
              <div
                v-if="(imgUrl == [] || imgUrl == '')&&(mp4Url == [] || mp4Url == '')"
                style="text-align:center;margin:0 auto;"
              >
                <img src="../../../../assets/image/dataNone.png" />
              </div>
            </div>
          </div>
          <div class="brick-item-list navlist2">
            <div class="brick-item-title"><img src="@/assets/image/icon-13.png" alt />地图位置
            </div>
            <div
              class="landshow_leftmap"
              style="margin-top:24px;"
              v-loading="MapLoading"
              element-loading-spinner="el-icon-s-promotion"
              element-loading-text="未能获取到该地块所在位置"
              element-loading-background="rgba(0, 0, 0, 0.7)"
             >
              <Map ref="childItem"></Map>
            </div>
          </div>
          <div class="brick-item-list navlist3">
            <div class="brick-item-title"><img src="@/assets/image/icon-13.png" alt />意向报价排名</div>
            <div class="landshow_leftrank" style="width:847px;">
              <el-table :data="intentionData" style="width: 100%">
                <el-table-column type="index" width="180" label="意向报价排名"></el-table-column>
                <el-table-column prop="REAL_NAME" label="用户名">
                   <template slot-scope="scope">
                    {{scope.row.REAL_NAME?scope.row.REAL_NAME.substr(0,1)+'**':scope.row.REAL_NAME}}
                  </template>
                </el-table-column>
                <el-table-column prop="TEL_PHONE" label="电话">
                  <template slot-scope="scope">
                    {{scope.row.TEL_PHONE.length>10?scope.row.TEL_PHONE.substr(0,3)+'****'+scope.row.TEL_PHONE.substr(7,11):scope.row.TEL_PHONE}}
                  </template>
                </el-table-column>
                <el-table-column prop="NUM" label="报价次数"></el-table-column>
                <el-table-column prop="INSERT_TIME" label="最新报价时间"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="brick-item" style="width:289px;margin-left: 10px;">
          <PopularRecommend class="popular_recommend"></PopularRecommend>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Map from "@/components/common/tianditu/detailsMap";
import PicZoom from "vue-piczoom";
import baseURL1 from "@/util/config.js";
import PopularRecommend from "@/components/PopularRecommend";

import qs from "qs";
import { mapState } from "vuex";
export default {
  components: { PicZoom, Map, PopularRecommend },
  data() {
    return {
      MapLoading: true, //地图遮罩
      landshowData: ["地块信息", "地块照片视频", "地图位置", "意向报价记录"],
      location: [
        { path: "/", name: "首页" },
        { path: "/TradingHall", name: "交易大厅" },
        { path: null, name: "自行交易详情页" }
      ],
      detailData: {},
      baseUrl: "",
      searchBarFixed: false,
      spanKey: 1,
      imgUrl: [], //大图片默认显示第一张
      mp4Url: [],
      currentImg: "",
      offsetCount: 1,
      curCode: 1,
      imgActive: true,
      imgScroll: 0, //计算跳转位置
      // 意向报价
      intentionData: [],
      collectionData: [],
      seekPrice:"",
      insertTime:"",
      firstParty:"",
      secondParty:"",
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let demailId = this.$route.query.id;
    function getChangeDate(date) {
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }
    //收藏显示状态模拟
    if (!sessionStorage.getItem("login")) {
      this.collectionData = [];
    } else if (localStorage.getItem("collectionData")) {
      this.collectionData = JSON.parse(localStorage.getItem("collectionData"));
    } else {
      localStorage.setItem("collectionData", JSON.stringify([]));
      this.collectionData = JSON.parse(localStorage.getItem("collectionData"));
    }
    // 转让方和受让方和成交价和成交时间
    this.$axios.post(
      `/epf-landweb/transContract/transactionPrice?relevanceId=${demailId}&token=${localStorage.getItem('token')}`,
      {},
      res => {
        if (res.code == "0000") {
          var dateTime = "";
          var month = new Array();
          month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6;
          month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
          var str = res.data.createTime.split(" ");
          dateTime = str[5] + "-" + month[str[1]] + "-" + str[2]+ " " + str[3];

          this.seekPrice = res.data.transactionPrice;//成交价格
          this.insertTime = dateTime;//成交时间
          this.firstParty = res.data.firstParty;//甲方姓名-转让方
          this.secondParty = res.data.secondParty;//乙方姓名-受让方
        }
      }
    );
    let url;
    if(sessionStorage.getItem("login")){
      url="/epf-landweb/admin/tsell/getTSellById?id="
    }else{
      url='/epf-landweb/tsell/getTSellById?id='
    }
    this.$axios.get(
      url + demailId,
      // /epf-supply/tlandSearch/getTSellByIds
      {},
      res => {
        if (res.tSell.coordinate && res.tSell.coordinate !== null) {
          this.$refs.childItem.getAddressList(res.tSell.coordinate); //调用地图组件查询方法
          this.MapLoading = false;
        } else {
          this.$refs.childItem.getAddressList(null); //调用地图组件查询方法
          this.MapLoading = true;
        }
        console.log("=====res.tSell.img==",res.tSell.img)
        //附件图片组信息
        this.$axios.get(
          "/epf-document/document/getOneGroupFilsById",
          { id: res.tSell.img },
          files => {
              console.log(files);
              for (let item = 0; item < files.fileList.length; item++) {
                // let extName = files.fileList[item].extName;
                let extName = files.fileList[item].name
                  .toString()
                  .split(".")
                  .slice(-1)[0];
                if (extName == "png" || extName == "PNG" || extName == "jpg") {
                  this.imgUrl.push({
                    index: this.imgUrl.length + 1,
                    url: this.baseUrl + files.fileList[item].id,
                    extName: extName
                  });
                } else if (
                  extName == "mp4" ||
                  extName == "AVI" ||
                  extName == "mov" ||
                  extName == "rmvb" ||
                  extName == "rm" ||
                  extName == "FLV" ||
                  extName == "3GP"
                ) {
                  this.mp4Url.push({
                    index: this.mp4Url.length + 1,
                    url: this.baseUrl + files.fileList[item].id,
                    extName: extName
                  });
                }
              }
            this.currentImg = this.imgUrl[0].url;
            this.imgScroll = Math.ceil(
              (this.imgUrl.length + this.mp4Url.length) / 2
            );
          }
        );
        //发布时间戳转换
        res.tSell.insertTime = res.tSell.insertTime ? getChangeDate(new Date(res.tSell.insertTime)) : "";
        res.tSell.endDate = res.tSell.endDate ? getChangeDate(new Date(res.tSell.endDate)) : "";
        this.detailData = res.tSell;
        //	价格
        this.detailData.price = this.$route.query.transPrice;
        let params = {
          cantonProvince: res.tSell.cantonProvince,
          cantonCity: res.tSell.cantonCity,
          cantonArea: res.tSell.cantonArea,
          firstClassUse: res.tSell.firstClassUse,
          secondClassUse: res.tSell.secondClassUse,
          circulation: res.tSell.circulation,
          area: res.tSell.area
        }; 
        //意向报价列表
        this.$axios.get(
          "/epf-landweb/admin/tintentionoffer/getSellOffer",
          { sellId: res.tSell.id },
          priceList => {
            this.intentionData = priceList.pager.results;
          }
        );
      }
    );
  },
  methods: {
    nocollect(id) {
      if (!this.isLogin()) {
        return;
      }
      this.$axios.post(
        //收藏
        "/epf-landweb/transwebcollect/addTransWebCollect",
        qs.stringify({
          targetId: id,
          collectType: "tsell"
        }),
        res => {
          if (res.code === 0) {
            this.detailData.isCollect = 1;
            this.detailData.collectId = res.id;
            this.$message.success("收藏成功");
          } else {
            this.$message.error("收藏失败");
          }
        }
      );
      if (this.collectionData) {
        this.collectionData.push(id);
      } else {
        this.collectionData = [id];
      }
      localStorage.setItem(
        "collectionData",
        JSON.stringify(this.collectionData)
      );
    },
    collect(id) {
      //取消收藏
      if (!this.isLogin()) {
        return;
      }
      let para = { id: id };
      let that = this;
      this.$axios.post(
        "/epf-landweb/transwebcollect/deleteTransWebCollect",
        qs.stringify(para),
        res => {
          if (res.code == "0") {
            //取消收藏
            if (res.code === 0) {
              this.detailData.isCollect = 0;
              this.$message.success("取消收藏成功");
            } else {
              this.$message.error("取消收藏失败");
            }
          }
        }
      );
      let nowIndex = this.collectionData.findIndex((value, index, arr) => {
        return value == id;
      });
      this.collectionData.splice(nowIndex, 1);
      localStorage.setItem("collectionData");
    },
    selectSpan(item) {
      this.spanKey = item;
      var el = document.getElementsByClassName(`navlist${item}`)[0];
      this.$nextTick(function() {  window.scrollTo({ behavior: "smooth", top: el.offsetTop - 100 }); });
      if (item == 3) {
        if (!sessionStorage.getItem("login")) {
          this.$message({
            message: "您还未登录，请先登录再查看",
            type: "warning"
          });
        }
      }
    },
    getCurImg(imgUrl) {
      this.currentImg = imgUrl;
    },
    prevImg() {
      if (this.imgUrl.length - 6 > 0) {
        if (this.offsetCount > 0) {
          this.offsetCount--;
          this.$refs.carouser.style.left = "-" + 78 * this.offsetCount + "px";
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    nextImg() {
      if (this.imgUrl.length - 6 > 0) {
        if (this.offsetCount < this.imgUrl.length - 6) {
          this.offsetCount++;
          this.$refs.carouser.style.left = "-" + 78 * this.offsetCount + "px";
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    isLogin() {
      if (!sessionStorage.getItem("login")) {
        this.$message({
          message: "您还未登录，请先登录",
          type: "warning"
        });
        this.collectionData = [];
        return false;
      }
      return true;
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 700) {
        this.searchBarFixed = true;
        for (let i = 0; i < this.landshowData.length; i++) {
          this.$nextTick(()=>{
            if ( scrollTop >= document.getElementsByClassName(`navlist${i}`)[0].offsetTop - 100 ) {
              this.spanKey = i;
            }
          })
        }
      } else {
        this.searchBarFixed = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="scss" scoped>
@import url("../../../../assets/css/centerTable.css");
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landDetails_warp {
  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 999;
    display: block !important;
  }
  .pro-detail-hd-fixed-div {
    -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
    display: none;
    background: #fff;
    border: 1px solid red;
    @include size(100%, 50px);
    border-bottom: 1px solid #eeeded;
    span {
      line-height: 50px;
      padding-bottom: 16px;
      margin-left: 50px;
      cursor: pointer;
    }
    .spanActive {
      box-sizing: border-box;
      border-bottom: 2px solidvar(--Colors);
      color: var(--Colors);
      font-weight: bold;
    }
  }
  .landmain {
    @include size(100%, auto);
    padding-bottom: 35px;
    .landshow_top {
      box-sizing: border-box;
      padding: 24px;
      margin-bottom: 24px;
      background: #fff;
      .landshow_huandeng {
        display: inline-block;
        vertical-align: middle;
        .pic-box {
          @include size(525px, 354px);
          overflow: hidden;
          .magnifier-box {
            img {
              width: 100% !important;
              height: 100% !important;
              display: block;
              border: 1px solid red;
            }
          }
        }
        .smallImg {
          @include size(100%, 50px);
          overflow: hidden;
          box-sizing: border-box;
          margin-top: 15px;
          clear: both;
          ul {
            @include size(475px, 50px);
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: flex-start;
            float: left;
            .list-img {
              @include size(475px, 50px);
              position: relative; //最外层的宽度，父级定位
              overflow: hidden;
              .list-img-wrap {
                position: absolute; //子级定位，dom操作偏移
                left: 0;
                top: 0;
                .single-img {
                  @include size(70px, 50px);
                  float: left;
                  margin-right: 8px;
                  text-align: center;
                  line-height: 50px;
                  font-size: 20px;
                  color: #fff;
                  cursor: pointer;
                  img {
                    display: block;
                    width: 70px;
                    height: 50px;
                  }
                }
                .img-activce {
                  border: 1px solid #c12022;
                }
              }
            }
          }
        }
      }
      .landshow_topcent {
        width:50%;
        margin-left: 30px;
        display: inline-block;
        vertical-align: middle;
        .landshow_title {
          line-height: 35px;
          color: #333333;
          font-size: 18px;
          font-weight: bold;
        }
        .landshow_titlebot {
          line-height: 14px;
          color: #999999;
          font-size: 14px;
          margin: 20px 0;
          span {
            padding-right: 40px;
            img {
              margin-right: 5px;
            }
          }
        }
        .landshow_pice {
          @include size(100%, 72px);
          line-height: 72px;
          color: #999;
          font-size: 14px;
          background: #f5f5f5;
          box-sizing: border-box;
          padding-left: 13px;
          margin-bottom: 15px;
          span {
            font-weight: bold;
            color: var(--Colors);
            font-size: 20px;
            font-weight: 500;
          }
          .landshow_sc {
            display: inline;
            font-size: 14px;
            padding: 6px 15px;
            border-radius: 0px 8px 0px 8px;
            margin-left: 11px;
          }
        }
        .landshow_p {
          line-height: 30px;
          color: #333333;
          font-size: 14px;
          display: inline-block;
          width: 49%;
          span {
            color: #999999;
          }
        }
        .landshow_topcent_bot {
          @include size(460px, auto);
          background: #ffffff;
          border: solid 1px #eeeeee;
          line-height: 48px;
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
          .input_text {
            @include size(320px, 48px);
            font-size: 18px;
            color: #333;
            border: none;
            text-indent: 15px;
          }
        }
        .landshow_topbot {
          @include size(100%, 48px);
          display: flex;
          justify-content: space-around;
          color: #999;
          border: solid 1px #eeeeee;
          line-height: 48px;
          font-size: 14px;
          margin-top: 26px;
          span {
            color: var(--Colors);
            cursor: pointer;
          }
        }
        .input_sub {
          @include size(128px, 40px);
          border-radius: 2px;
          line-height: 40px;
          font-size: 14px;
          text-align: center;
          color: var(--Colors);
          border: 1px solid var(--Colors);
          margin-top: 20px;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
    .brick-list {
      .brick-item {
        @include size(894px, auto);
        display: inline-block;
        vertical-align:top;
        background: #fff;
        .landshow_main_listtop {
          @include size(100%, 50px);
          border-bottom: 1px solid #eeeded;
          cursor: pointer;
          span {
            line-height: 50px;
            padding-bottom: 16px;
            margin-left: 50px;
            cursor: pointer;
            font-size: 16px;
          }
          .spanActive {
            box-sizing: border-box;
            border-bottom: 2px solidvar(--Colors);
            color: var(--Colors);
            font-weight: bold;
          }
        }
        .brick-item-list {
          padding-left: 24px;
          .brick-item-title {
            margin: 24px auto;
            line-height: 50px;
            font-size: 18px;
            color: #333333;
            cursor: pointer;
            background: url("../../../../assets/image/icon-bg.png") no-repeat
              center bottom;
            img {
              margin-right: 10px;
              vertical-align: middle;
            }
          }
          .landshow_table {
            width: 846px;
            border-top: 1px solid #f2f2f2;
            border-left: 1px solid #f2f2f2;
            // margin-top:55px ;
            clear: both;
            // margin-left: 24px;
            /deep/ .el-popover__reference .question{
                width:18px;
                height:18px;
                display: inline-block;
                vertical-align: middle;
                background:url("../../../../assets/image/question-01.png") no-repeat
              }
              /deep/ .el-popover__reference:hover .question{
                background:url("../../../../assets/image/question-02.png") no-repeat
              }

            td {
              line-height: 25px;
              color: #333333;
              font-size: 14px;
              padding: 10px 15px;
              border-right: 1px solid #f2f2f2;
              border-bottom: 1px solid #f2f2f2;
              text-align: center;
            }
            .td1 {
              width: 99px;
              background: #f2f5f7;
              color: #999999;
              text-align: right;
            }
            .td2 {
              width: 323px;
              background: #fff;
              text-align: left;
            }
          }
          .landshow_leftpic {
            display: flex;
            flex-wrap: wrap;
            div {
              @include size(420px, 284px);
              margin: 0 10px 10px 0;
              img {
                width: 100%;
                height: 100%;
              }
              video {
                width: 100%;
                height: 100%;
              }
            }
          }
          .landshow_leftmap {
            @include size(847px, 408px);
            .amap-page-container {
              height: 100% !important;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.el-loading-mask{
  z-index: 3;
}
</style>