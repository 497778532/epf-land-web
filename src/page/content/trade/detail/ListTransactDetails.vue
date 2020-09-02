<template>
  <div class="landDetails_warp" ref="box">
    <epf-lePage :location="location"></epf-lePage>
    <div class="pro-detail-hd-fixed-div" :class="searchBarFixed == true ? 'isFixed' :''">
      <div class="win1200">
        <span @click="selectSpan(1)" :class="{spanActive:spanKey===1}">地块信息</span>
        <span @click="selectSpan(2)" :class="{spanActive:spanKey===2}">地块照片视频</span>
        <span @click="selectSpan(3)" :class="{spanActive:spanKey===3}">地图位置</span>
        <span @click="selectSpan(4)" :class="{spanActive:spanKey===4}">意向报价记录</span>
      </div>
    </div>
    <div class="landmain">
      <div class="landshow_top">
        <div class="landshow_huandeng">
          <!-- <div class="collect">
            <img src="../../../../assets/image/nocollect.png" alt="" v-show="indexcollect===1" @click="nocollect()" style="margin-top:1px;">
            <img src="../../../../assets/image/collect.png" alt="" v-show="indexcollect===2" @click="collect()">
          </div>-->
          <!-- <div class="landshow720">720</div> -->
          <div class="bigImg">
            <div class="pic-box">
              <pic-zoom  :url="currentImg" :scale="3"></pic-zoom>
            </div>
          </div>
          <div class="smallImg">
            <div id="imageMenu">
              <div @click="prevImg" class="onlickImg prev-arrow">
                <img src="../../../../assets/image/icon-left.png" alt>
              </div>
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
                      <img v-if="item.extName == 'png'" :src="item.url" alt="缩略图">
                    </div>
                  </div>
                </li>
              </ul>
              <div class="onlickImg onlickImg1" @click="nextImg">
                <img src="../../../../assets/image/icon-right.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div class="landshow_topcent">
          <p class="landshow_title">{{detailData.title}}</p>
          <p class="landshow_titlebot">
            <span style="font-size:12px;">
              <img src="../../../../assets/image/icon-map.png" alt style="margin-top:-5px;">
              {{detailData.cantonProvinceName}} / {{detailData.cantonCityName}} / {{detailData.cantonAreaName}}
            </span>
            <span>
              <img src="../../../../assets/image/icon-time.png" alt style="margin-top:-7px;">
              {{detailData.insertTime}}
            </span>
            <span>
              <img src="../../../../assets/image/icon-liulan.png" alt style="margin-top:-3px;">
              {{detailData.viewsNum}} 次
            </span>
            <span>
              <img src="../../../../assets/image/nocollect.png" alt>
              {{detailData.collectionNum}} 次
            </span>
          </p>
          
          <div class="landshow_pice">
            价格：
            <span>{{Division(detailData.price)}} 万元</span>
            <div class="landshow_sc landshow_rz" v-if="detailData.publishStatus == 'audit'">未经属地认证</div>
            <div class="landshow_sc landshow_rz" v-else>属地认证</div>
            <div class="landshow_sc landshow_type">{{detailData.landTypeName}}</div>
          </div>
          <p class="landshow_p"><span>交易方式：</span>自行交易</p>
          <p class="landshow_p"><span>流转方式：</span>转让</p>
          <p class="landshow_p"><span>转让面积：</span>5000平方米</p>
          <p class="landshow_p"><span>剩余使用年限：</span>20年</p>
          <p class="landshow_p"><span>土地用途：</span>商服用地-工业用地</p>
          <p class="landshow_p"><span>土地性质：</span>国有建设用地</p>
          <div class="landshow_topbot">
            <div>转让方：山西星星地产有限公司</div>
            <div>受让方：万达地产有限公司</div>
          </div>
          <div class="input_sub" @click="selectCollect(collectShow=!collectShow)">
            <img src="@/assets/image/collect1-1.png" alt=""  width="18" height="18" v-if="collectShow">
            <img src="@/assets/image/collect-1.png" alt="" width="18" height="18" v-else>
            <span>收藏</span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="landshow_main">
        <div class="landshow_main_con">
          <div class="landshow_main_left">
            <div class="landshow_main_listtop">
              <span @click="selectSpan(1)" :class="{spanActive:spanKey===1}">地块信息</span>
              <span @click="selectSpan(2)" :class="{spanActive:spanKey===2}">地块照片视频</span>
              <span @click="selectSpan(3)" :class="{spanActive:spanKey===3}">地图位置</span>
              <span @click="selectSpan(4)" :class="{spanActive:spanKey===4}">意向报价记录</span>
            </div>
            <div class>
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt>地块信息
                </div>
                <table width="846" cellpadding="0" cellspacing="0" class="landshow_table">
                  <tr>
                    <td class="td1">土地性质</td>
                    <td class="td2">{{detailData.landCharName}}</td>
                    <td class="td1">是否连同地上建筑物、其他附着物</td>
                    <td class="td2">{{detailData.adjunct}}</td>
                  </tr>
                  <tr>
                    <td class="td1">土地类型</td>
                    <td class="td2">{{detailData.landTypeName}}</td>
                    <td class="td1">建筑面积</td>
                    <td class="td2">{{detailData.buildArea}}平方米</td>
                  </tr>
                  <tr>
                    <td class="td1">土地使用权证</td>
                    <td class="td2">有</td>
                    <td class="td1">土地权属状态</td>
                    <td class="td2">已认证</td>
                  </tr>
                  <tr>
                    <td class="td1">所属行政区</td>
                    <td class="td2">{{detailData.cantonProvinceName}}{{detailData.cantonCityName}}{{detailData.cantonAreaName}}</td>
                    <td class="td1">建筑结构</td>
                    <td class="td2">{{detailData.buildingStructureName}}</td>
                  </tr>
                  <tr>
                    <td class="td1">土地用途</td>
                    <td class="td2">{{detailData.firstClassUseName}}-{{detailData.secondClassUseName}}</td>
                    <td class="td1">绿地率</td>
                    <td class="td2">{{detailData.greenSpaceRate}}{{detailData.greenSpaceRate?'% ，':''}}{{detailData.greenSpaceRateSymbol1}}<span v-if="detailData.greenSpaceRate || detailData.greenSpaceRate2">绿地率</span>{{detailData.greenSpaceRateSymbol2}} {{detailData.greenSpaceRate2}}{{detailData.greenSpaceRate2?'%':''}}</td>
                  </tr>
                  <tr>
                    <td class="td1">转让面积</td>
                    <td class="td2">{{detailData.area}}平方米</td>
                    <td class="td1">建筑密度</td>
                    <td class="td2">{{detailData.buildingDensity}}{{detailData.buildingDensity?'%':''}}{{detailData.buildingDensitySymbol1}}<span v-if="detailData.buildingDensity || detailData.buildingDensity2">建筑密度</span>{{detailData.buildingDensitySymbol2}} {{detailData.buildingDensity2}}{{detailData.buildingDensity2?'%':''}}</td>
                  </tr>
                  <tr>
                    <td class="td1">终止日期</td>
                    <td class="td2">{{detailLand.endDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(detailLand.endDate)[0]:''}}</td>
                    <td class="td1">建筑限高</td>
                    <td class="td2">{{detailData.heightLimit?detailData.heightLimit+' 米':''}}</td>
                  </tr>
                  <tr>
                    <td class="td1">土地坐落</td>
                    <td class="td2">{{detailData.location}}</td>
                    <td class="td1">权证号</td>
                    <td class="td2">{{detailData.warrantNum}}</td>
                    <!-- <td class="td1">土地坐落</td>
                    <td class="td2">山西小店区康宁街15号</td> -->
                  </tr>
                  <!-- <tr>
                    <td class="td1">权证号</td>
                    <td class="td2">赣（2017）南昌市不动产权第0018158号</td>
                    <td class="td1">权证号</td>
                    <td class="td2">赣（2017）南昌市不动产权第0018158号</td>
                  </tr> -->
                </table>
              </div>
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt>
                  地块照片视频
                </div>
                <div class="landshow_leftpic">
                  <div v-for="(item) in mp4Url"
                    :key="item.url">
                    <video v-if="item.extName == 'mp4'" loop height="284px"  :src="item.url" controls="controls" style="outline:none;">
                        您的浏览器不支持 video 标签。
                    </video>
                  </div>
                  <div  v-for="(item) in imgUrl"
                    :key="item.url">
                    <img :src="item.url" alt="">
                  </div>
                  <!-- <li><img src="../../assets/image/icon-18.jpg" alt=""></li>
                  <li><img src="../../assets/image/icon-19.jpg" alt=""></li>
                  <li><img src="../../assets/image/icon-17.jpg" alt=""></li> -->
                </div>
              </div>
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt>
                  地图位置
                </div>
                <div class="landshow_leftmap">
                  <Map></Map>
                </div>
              </div>
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt>
                  意向报价排名
                </div>
                <div class="landshow_leftrank">
                  <table width="847" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr>
                        <td>意向报价排名</td>
                        <td>用户名</td>
                        <td>电话</td>
                        <td>报价次数</td>
                        <td>最新报价时间</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in intentionData" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.REAL_NAME}}</td>
                        <td>{{item.TEL_PHONE}}</td>
                        <td>{{item.NUM}}</td>
                        <td>{{item.INSERT_TIME}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="landshow_main_right">
            <PopularRecommend></PopularRecommend>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Map from "@/components/common/tianditu/detailsMap";
import PopularRecommend from "@/components/PopularRecommend";
import PicZoom from "vue-piczoom";
import baseURL1 from "@/util/config.js";
import qs from 'qs';
export default {
  components: {  PicZoom, Map ,PopularRecommend},
  data() {
    return {
      detailData:{
        title:'南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中740亩生态林出租态',
        cantonProvinceName:'山西省',
        cantonCityName:'太原市',
        cantonAreaName:'小店区',
        insertTime:' 2018-08-30',
        viewsNum:'50',
        collectionNum:'200',
        price:'',
      },
      baseUrl: "",
      location:[
        {path:'/',name:'首页'},
        {path:null,name:'土地需求'},
        {path:null,name:'地块需求详情'},
      ],
      searchBarFixed: false,
      spanKey: 1,
      detailData: "",
      tintentionoffer: "", //意向报价价格
      subscribeDialog:false,//预约看地弹窗
      imgUrl: [
        // { index: 1, url: require("../../assets/image/icon-demand01.jpg") }
        // { index: 2, url: require("../../assets/image/icon-demand02.png") },
        // { index: 3, url: require("../../assets/image/icon-demand03.png") },
        // { index: 4, url: require("../../assets/image/icon-demand04.png") },
        // { index: 5, url: require("../../assets/image/icon-demand01.png") },
        // { index: 6, url: require("../../assets/image/icon-demand02.png") },
        // { index: 7, url: require("../../assets/image/icon-demand03.png") },
        // { index: 8, url: require("../../assets/image/icon-demand01.png") },
        // { index: 9, url: require("../../assets/image/icon-demand02.png") },
        // { index: 10, url: require("../../assets/image/icon-demand03.png") },
        // { index: 11, url: require("../../assets/image/icon-demand04.png") }
      ], //大图片默认显示第一张
      mp4Url:[],
      currentImg: "",
      // ImgUrl: require("../../assets/image/icon-demand01.jpg"),
      offsetCount: 1,
      curCode: 1,
      imgActive: true,
      indexcollect: 1,
      imgScroll:0,//计算跳转位置
      // 意向报价
      intentionData: [],
      collectionData: [],
       ruleForm: {
          tsellId: '',
          name: '',
          phone: '',
          seeDate:'',
          isSee:'false',
          reservationId:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入您的手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式有误', trigger: 'blur' }
          ],
          seeDate: [
            {required: true, message: '请选择预约看地时间', trigger: 'change' }
          ],
        }
    };
  },
  created() {
    console.log('sss');
    
    window.scrollTo(0, 0);
    this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let demailId = this.$route.query.demand;
    function getChangeDate(date) {
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }
    //收藏显示状态模拟
    if (!sessionStorage.getItem("login")) {
      this.collectionData = [];
    }else if (localStorage.getItem("collectionData")) {
      this.collectionData = JSON.parse(localStorage.getItem("collectionData"));
    } else {
      localStorage.setItem("collectionData", JSON.stringify([]));
      this.collectionData = JSON.parse(localStorage.getItem("collectionData"));
    }
    let url;
    if(sessionStorage.getItem("login")){
      url="/epf-landweb/admin/tsell/getTSellById?id="
    }else{
        url='/epf-landweb/tsell/getTSellById?id='
    }
    this.$axios.get(
      url + demailId,
      {},
      res => {
        //附件图片组信息
        this.$axios.get("/epf-document/document/getOneGroupFilsById", {id:res.tSell.img}, files => {
          console.log('附件图片组信息',files);
          for (let item = 0; item < files.fileList.length; item++) {
            if(files.fileList[item].extName == 'png' || files.fileList[item].extName == 'PNG'){
              this.imgUrl.push({index: this.imgUrl.length + 1,url:this.baseUrl + files.fileList[item].id,extName:files.fileList[item].extName})
            }else if(files.fileList[item].extName == 'mp4'){
              this.mp4Url.push({index: this.mp4Url.length + 1,url:this.baseUrl + files.fileList[item].id,extName:files.fileList[item].extName})
            }
          }
          this.currentImg = this.imgUrl[0].url;
          this.imgScroll = Math.ceil((this.imgUrl.length + this.mp4Url.length) / 2)
          console.log(this.mp4Url);
          
        });
        console.log("详情数据", res);
        //发布时间戳转换
        res.tSell.insertTime = res.tSell.insertTime
          ? getChangeDate(new Date(res.tSell.insertTime))
          : "";
        res.tSell.endDate = res.tSell.endDate
          ? getChangeDate(new Date(res.tSell.endDate))
          : "";
        this.detailData = res.tSell;
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
        this.$axios.get("/epf-landweb/admin/tintentionoffer/getSellOffer", {sellId:res.tSell.id}, priceList => {
          console.log("意向报价列表", priceList);
          // this.intentionData = priceList.pager.results;
        });
      }
    );
  },
  methods: {
    subscribeDialogClick(){
      if(!this.isLogin()){
        return
      }
      this.subscribeDialog = true;
    },
    subscribe(formName){
      //预约看地
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.tsellId = this.detailData.id;
            this.ruleForm.reservationId = localStorage.getItem('userId');
            this.ruleForm.reservationId = (this.ruleForm.reservationId).toString
            this.ruleForm.isSee = (this.ruleForm.isSee).toString

            //调用新增预约看地接口
            this.$axios.post('/epf-landweb/admin/treservations/addTReservations',qs.stringify(this.ruleForm),res=>{
              if(res.msg == 'success'){
                this.$message({
                  message: '预约成功',
                  type: 'success'
                });
              }else{
                this.$message.error(res.msg);
              }
              this.subscribeDialog = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    nocollect(id) {
      if(!this.isLogin()){
        return
      }
      //收藏
      this.$axios.post(
        "/epf-landweb/transwebcollect/addTransWebCollect",
        qs.stringify({
          targetId: id,
          collectType:'tsell'
        }),
        res => {
          console.log(res);
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
      if(!this.isLogin()){
        return
      }
      //取消收藏
      let nowIndex = this.collectionData.findIndex((value, index, arr) => {
        return value == id;
      });
      this.collectionData.splice(nowIndex, 1);
      localStorage.setItem(
        "collectionData",
        JSON.stringify(this.collectionData)
      );
    },

    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 700) {
        this.searchBarFixed = true;
        if (scrollTop >= 700) {
          this.spanKey = 1;
        }
        if (scrollTop >= 1140) {
          this.spanKey = 2;
        }
        if (scrollTop >= 1140 + (this.imgScroll * 340)) {
          this.spanKey = 3;
        }
        if (scrollTop >= 1140 + (this.imgScroll * 340) + 520) {
          this.spanKey = 4;
        }
      } else {
        this.searchBarFixed = false;
      }
    },
    selectSpan(item) {
      if (item === 1) {
        this.spanKey = 1;
        window.scrollTo(0, 700);
      }
      if (item === 2) {
        this.spanKey = 2;
        window.scrollTo(0, 1180);
      }
      if (item === 3) {
        this.spanKey = 3;
        
        window.scrollTo(0, 1180 + (this.imgScroll * 340));
      }
      if (item === 4) {
        this.spanKey = 4;
        window.scrollTo(0, 1180 + (this.imgScroll * 340) + 520);
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
    addIintentionoffer() {
      console.log(this.detailData);
      
      if(!this.isLogin()){
        return
      }
      if (this.tintentionoffer == "") {
        this.$message({
          message: "请输入您的意向报价",
          type: "warning"
        });
        return;
      }
      this.$axios.post(
        "/epf-landweb/admin/tintentionoffer/addTIntentionOffer",
        qs.stringify({ tsellId: this.detailData.id, price: this.tintentionoffer }),
        res => {
          if (res.code == 0) {
            this.$message({
              message: "提交报价成功",
              type: "success"
            });
            this.tintentionoffer = "";
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    isLogin(){
      if (!sessionStorage.getItem("login")) {
        this.$message({
          message: "您还未登录，请先登录",
          type: "warning"
        });
        this.collectionData = [];
        return false
      }
      return true
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
    // nocollect() {
    //   this.indexcollect = 2;
    // },
    // collect() {
    //   this.indexcollect = 1;
    // },
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    toLogin(){
      this.$router.push('/login');
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
@import url("../../../../assets/css/centerTable.css");
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landDetails_warp {
  // border-top: 2px solid var(--Colors);
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
    // position: fixed;
    // top: 0;
    // z-index: 30;
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
    background: #fff;
    .landshow_top {
      @include size(1200px, 506px);
      margin: 0 auto;
      clear: both;
      box-sizing: border-box;
      padding-top: 24px;
      .landshow_huandeng {
        @include size(525px, 447px);
        float: left;
        // position: relative;
        // .collect{
        //   @include size(28px,28px);
        //   background: rgba(255,255,255,0.5);
        //   border-radius: 50%;
        //   position: absolute;
        //   right:8px;
        //   top:8px;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   cursor: pointer;
        //   z-index: 9;
        // }
        // .landshow720{
        //   @include size(54px,54px);
        //   background: rgba(0,0,0,0.5);
        //   border-radius: 50%;
        //   position: absolute;
        //   top:150px;
        //   left:236px;
        //   z-index: 9;
        //   color:#fff;
        //   font-size: 20px;
        //   text-align: center;
        //   line-height: 54px;
        // }
        .bigImg {
          @include size(525px, 354px);
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
        }
        .smallImg {
          margin-top: 15px;
          @include size(100%, 50px);
          #imageMenu {
            @include size(100%, 50px);
            overflow: hidden;
            box-sizing: border-box;
            margin-top: 15px;
            clear: both;
            .onlickImg {
              @include size(20px, 50px);
              margin-right: 10px;
              text-align: center;
              line-height: 50px;
              font-size: 20px;
              color: #fff;
              cursor: pointer;
              float: left;
              img {
                margin-top: 8px;
              }
            }
            .onlickImg1 {
              margin-left: 0px;
              margin-right: 0px;
            }
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
      }
      .landshow_topcent {
        @include size(640px, 354px);
        box-sizing: border-box;
        float: left;
        margin-left: 35px;
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
          .landshow_rz {
            color: var(--Colors);
            border: solid 1px var(--Colors);
            margin-left: 20px;
          }
          .landshow_type {
            color: #4875cf;
            border: solid 1px #4875cf;
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
          .input_sub {
            @include size(128px, 40px);
            background-color: var(--Colors);
            border-radius: 2px;
            background: var(--Colors);
            line-height: 40px;
            font-size: 14px;
            color: #fff;
            border: none;
            text-align: center;
            margin-right: 16px;
            cursor: pointer;
          }
          .input_sub_active {
            border: solid 1px var(--Colors);
            background: #fff;
            color: var(--Colors);
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
          color: #fff;
          border: none;
          text-align: center;
          margin-right: 10px;
          cursor: pointer;
          border:1px solid var(--Colors);
          background: #fff;
          color:var(--Colors);
          margin-top:40px;
          display: inline-block;
          img{
            margin-top:10px;
            margin-right:5px;
          }
        }
      }
    }
    .landshow_main {
      background: #f2f1f9;
      .landshow_main_con {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        padding-bottom: 35px;
        .landshow_main_left {
          @include size(894px, auto);
          margin-top: 24px;
          background: #fff;
          float: left;
          .landshow_main_listtop {
            @include size(100%, 50px);
            border-bottom: 1px solid #eeeded;
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
          .landshow_main_listtop_con {
            padding-bottom: 40px;
            .landshow_lefttop {
              @include size(850px, 36px);
              box-sizing: border-box;
              margin: 24px auto;
              background: url("../../../../assets/image/icon-bg.png") no-repeat
                center bottom;
              font-size: 18px;
              color: #333333;
              img {
                margin-top: 4px;
                margin-right: 10px;
              }
            }
            .landshow_table {
              width: 846px;
              border-top: 1px solid #f2f2f2;
              border-left: 1px solid #f2f2f2;
              // margin-top:55px ;
              clear: both;
              margin-left: 24px;

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
              padding-left: 10px;
              div {
                @include size(420px, 284px);
                margin: 10px;
                img {
                  width: 100%;
                  height: 100%;
                }
                video{
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .landshow_leftmap {
              @include size(847px, 408px);
              margin-left: 23px;
              .amap-page-container {
                height: 100% !important;
              }
            }
            .landshow_leftrank {
              @include size(847px, auto);
              margin-left: 23px;
              margin-top: 24px;
              table {
                border: solid 1px #f3f3f3;
                tr {
                  text-align: center;
                  height: 50px;
                  border: solid 1px #f3f3f3;
                  color: #666666;
                }
              }
              thead {
                tr {
                  background-color: #f2f5f7;
                  font-size: 14px;
                  color: #333333;
                  font-weight: bold;
                }
              }
            }
          }
        }
        .landshow_main_right {
          @include size(289px, auto);
          margin-left: 13px;
          background: skyblue;
          float: left;
          margin-top: 24px;
        }
      }
    }
  }
}
</style>
<style>
.magnifier-box img {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
.subscribe-ruleForm .el-form-item__label{
  width: 80px !important;
}
.subscribe-ruleForm .el-form-item__content{
  text-align: right;
}
.subscribe-ruleForm .el-form-item__error{
  width: 130px;
}
.subscribe-ruleForm .el-date-editor.el-input{
  width: 230px;
}
</style>
