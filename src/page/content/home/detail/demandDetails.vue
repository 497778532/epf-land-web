<template>
  <div
    class="landDetails_warp"
    ref="box"
    style="background-color:#f2f1f9;"
  >
    <!-- <div v-if="!detailData.circulationName" style="height:40px;width:100%;"></div> -->
    <!-- <LevelpageHeader
      v-if="detailData.circulationName"
      :location="location+detailData.circulationName"
      :locationShow="locationShow"
      :locationState="'土地'+detailData.circulationName+'详情'"
    ></LevelpageHeader>-->
    <epf-lePage :location="location"></epf-lePage>
    <div class="pro-detail-hd-fixed-div" :class="searchBarFixed == true ? 'isFixed' :''">
      <div class="win1200">
        <span
          v-for="(item,index) in landshowData"
          :key="index"
          @click="selectSpan(index)"
          :class="{spanActive:spanKey == index}"
        >{{item}}</span>
      </div>
    </div>
    <div class="landmain">
      <div class="landshow_top">
        <!--S 标题-->
        <div style="overflow: hidden;margin-bottom: 24px;">
          <div
            style="font-size: 20px;font-weight: bold;color: #333333;float: left;"
          >{{detailData.title}}</div>
          <div style="float: right;font-size: 16px;color: #999999;">
            <span style="color: #ff6825;margin-right: 8px;">{{detailData.viewsNum}}</span>次浏览
            <span style="color: #e6e6e6;padding: 0 10px;">|</span>
            <span style="color: #ff6825;margin-right: 8px;">{{detailData.collectionNum}}</span>次收藏
          </div>
        </div>
        <!--E 标题-->
        <div class="landshow_huandeng">
          <!-- <div class="collect">
            <img src="../../../../assets/image/nocollect.png" alt="" v-show="indexcollect===1" @click="nocollect()" style="margin-top:1px;">
            <img src="../../../../assets/image/collect.png" alt="" v-show="indexcollect===2" @click="collect()">
          </div>-->
          <!-- <div class="landshow720">720</div> -->

          <div class="bigImg">
            <div class="pic-box" v-if="currentImg && currentImg!==''">
              <pic-zoom :url="currentImg" :scale="3"></pic-zoom>
            </div>
            <div class="pic-box" v-else>
              <img src="../../../../assets/image/icon-nodata.png" alt="" width="100%" height="100%">
            </div>
          </div>
          <div class="smallImg" v-if="imgUrl&&imgUrl!==[]">
            <div id="imageMenu">
              <!-- <div @click="prevImg" class="onlickImg prev-arrow">
                <img src="../../../../assets/image/icon-left.png" alt>
              </div> -->
              <ul>
                <li class="list-img">
                  <div class="list-img-wrap" ref="carouser">
                    <div
                      @click="getCurImg(item.url,index)"
                      v-for="(item,index) in imgUrl"
                      :key="index"
                      class="single-img"
                    >
                      <div :class="{'img-activce': item.url == currentImg && imgActive}">
                        <img :src="item.url" alt="缩略图" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- <div class="onlickImg onlickImg1" @click="nextImg">
                <img src="../../../../assets/image/icon-right.png" alt>
              </div> -->
            </div>
          </div>
        </div>
        <div class="landshow_topcent">
          <!--S 价格-->
          <div class="landshow_pice">
            价格：
            <span v-if="detailData.price">
              <span>￥{{Division(detailData.price)}}</span>
              <span style="font-size: 20px;">万元</span>
            </span>
            <span v-else>面议</span>
            <div class="landshow_sc landshow_type1" v-if="detailData.publishStatus == 'audit'">未经属地认证</div>
            <div class="landshow_sc landshow_type" v-else>属地认证</div>
            <div class="landshow_sc landshow_rz">{{detailData.landTypeName}}</div>
          </div>
          <!--E 价格-->
          <!--S 位置-时间-->
          <p class="landshow_titlebot">
            <span style="display: inline-block;width: 58%;">
              <img src="../../../../assets/image/icon-map.png" alt style="margin-top:-5px;">
              {{detailData.cantonProvinceName}} / {{detailData.cantonCityName}} / {{detailData.cantonAreaName}}
            </span>
            <span>
              <img src="../../../../assets/image/icon-time.png" alt style="margin-top:-7px;">
              发布时间：{{detailData.updateTime}}
            </span>
          </p>
          <!--E 位置-时间-->
          <!--S 土地信息-->
          <div style="overflow: hidden;padding: 10px 0;border-bottom: 1px solid #eaeaea;">
            <div style="float: left;width: 144px;border-right: 2px solid #EAEAEA;">
              <div
                style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{detailData.circulationName}}</div>
              <div style="font-size: 14px;color: #999999;">流转方式</div>
            </div>
            <div
              style="float: left;width: 220px;border-right: 2px solid #EAEAEA;padding-left: 15px;"
            >
              <div
                style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{detailData.years?detailData.years+'年':detailData.years}}</div>
              <el-popover
                v-if="detailData.circulationName == '转让'"
                placement="bottom"
                width="200"
                trigger="hover">
                <div solt="content" style="padding:10px;line-height:20px;color:#666">
                    <p>剩余使用年限为估算值，最终以使用权截止日期为准。</p>
                </div>
                <div slot="reference" style="font-size: 14px;color: #999999;">{{detailData.circulationName == "转让"?"剩余使用":detailData.circulationName}}年限<i  class="question"></i></div>
              </el-popover>
               <div  v-else style="font-size: 14px;color: #999999;">{{detailData.circulationName == "转让"?"剩余使用":detailData.circulationName}}年限</div>

           
            </div>
            <div style="float: left;width: 200px;padding-left: 15px;">
              <el-tooltip
                class="item"
                effect="light"
                :content="j_tip"
                placement="top"
              >
                <!-- :disabled="j_dis" -->
                <div
                  style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;cursor: pointer;"
                >{{detailData.firstClassUseName}}-{{detailData.secondClassUseName}}</div>
              </el-tooltip>
              <div style="font-size: 14px;color: #999999;">土地用途</div>
            </div>
          </div>
          <div style="overflow: hidden;padding: 10px 0;">
            <div style="float: left;width: 144px;border-right: 2px solid #EAEAEA;">
              <el-tooltip
                class="item"
                effect="light"
                :content="detailData.landTypeName"
                placement="top"
              >
                <div
                  style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;cursor: pointer;"
                >{{detailData.landTypeName}}</div>
              </el-tooltip>
              <div style="font-size: 14px;color: #999999;">土地类型</div>
            </div>
            <div
              style="float: left;width: 220px;border-right: 2px solid #EAEAEA;padding-left: 15px;"
            >
              <div
                style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{detailData.area?detailData.area+'平方米':detailData.area}}</div>
              <div style="font-size: 14px;color: #999999;">{{detailData.circulationName}}面积</div>
            </div>
            <div style="float: left;width: 200px;padding-left: 15px;">
              <div
                style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{detailData.landCharName}}</div>
              <div style="font-size: 14px;color: #999999;">土地性质</div>
            </div>
          </div>
          <!--E 土地信息-->
          <!-- 自己发布的地块自己不能进行意向报价和预约看地，以及收藏 -->
          <!--S 意向出价-->
          <div
            class="landshow_topcent_bot"
            v-if="detailData.insertUser != userId"
            style="margin-top: 10px;"
          >
            <div style="width: 368px;border: 1px solid #cecece;">
              <span
                style="display: inline-block;width: 114px;background-color: #f8f8f8;font-size: 16px;color: #000033;text-align: center;font-weight: bold;border-right: 1px solid #cecece;"
              >意向报价：</span>
              <input
                type="text"
                onkeyup="this.value=(this.value.match(/\d+(\.\d{0,2})?/)||[''])[0]"
                class="input_text"
                placeholder="请输入您的意向报价"
                v-model="tintentionoffer"
              />
              万元
            </div>

            <!-- <el-input v-model="tintentionoffer" placeholder="请输入内容"></el-input> -->
            <input
              type="submit"
              class="input_sub"
              @click="addIintentionoffer"
              value="出价"
              style="position: absolute;top: 0;right: 100px;"
            />
          </div>
          <!--E 预约看地-->
          <div
            class="landshow_topcent_bot"
            style="border:none;"
            v-if="detailData.insertUser != userId"
          >
            <input
              type="submit"
              class="input_sub input_sub_active"
              @click="subscribeDialogClick"
              value="预约看地"
              style="height: 40px;font-weight: bold;"
            />
            <!-- 比价 -->
              <!-- v-show="isbettal == false" -->
            <div
              class="input_sub_collect"
              v-show="(detailData.scordbFlag=='0' || !detailData.scordbFlag) && detailData.insertUser != userId"
              @click="nocollect(detailData.id,'scordbFlag')"
            >
              <span>加入比价</span>
            </div>
              <!-- v-show="isbettal == true" -->
            <div
              class="input_sub_collect"
              v-show="detailData.scordbFlag=='1' && detailData.insertUser != userId"
              @click="collect(detailData.scordbFlagId,'scordbFlag')"
            >
              <span>取消对比</span>
            </div>
            <div
              class="input_sub_collect"
              v-show="(detailData.isCollect=='0' || !detailData.isCollect) && detailData.insertUser != userId"
              @click="nocollect(detailData.id)"
            >
              <img
                src="@/assets/image/collect1-1.png"
                alt
                style="margin-top:9px;"
                width="20"
                height="20"
              />
              <span>收藏</span>
            </div>
            <div
              class="input_sub_collect"
              v-show="detailData.isCollect=='1' && detailData.insertUser != userId"
              @click="collect(detailData.collectId)"
            >
              <img
                src="@/assets/image/collect-1.png"
                alt
                style="margin-top:9px;"
                width="18"
                height="18"
              />
              <span>取消收藏</span>
              <!-- <span @click="collect(detailData.id)">取消收藏</span> -->
            </div>
          

            <!-- 预约看地 -->
            <div class="delDialog_box">
              <div v-show="subscribeDialog" class="delDialog" @click.stop="subscribeDialog=false"></div>
              <transition name="el-fade-in">
                <div
                  v-show="subscribeDialog"
                  class="transition-box container_box"
                  style="width:350px;height:auto;top: 30%;transform: translate(-50%,1%);z-index:1000;"
                >
                  <div class="title_box">
                    <h4>预约看地</h4>
                    <span>
                      <i class="el-icon-circle-close-outline" @click="subscribeDialog=false"></i>
                    </span>
                  </div>
                  <div style="padding:10px;">
                    <el-form
                      :model="ruleForm"
                      label-position="right"
                      :rules="rules"
                      ref="ruleForm"
                      label-width="100px"
                      class="subscribe-ruleForm"
                    >
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                      </el-form-item>
                      <el-form-item label="看地时间" required>
                        <el-col :span="20">
                          <el-form-item prop="seeDate">
                            <el-date-picker
                              @change="lessNow"
                              v-model="ruleForm.seeDate"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="datetime"
                              placeholder="选择日期时间"
                              :picker-options="pickerOptions1"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <div class="epf_btn epf_btn_bg" @click="subscribe('ruleForm')">预约</div>
                      <div
                        class="epf_btn epf_btn_def"
                        @click="subscribeDialog=false"
                      >取消</div>
                    </el-form>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div class="landshow_topbot">
            <div v-if="!isLoginShow">
              联系人：
              <i v-if="detailData.contact&&detailData.contact!==null">{{detailData.contact}}</i>
            </div>
            <div v-else>
              联系人：
              <i
                v-if="detailData.contact&&detailData.contact!==null"
              >{{detailData.contact.substring(0,1)}}</i>***
            </div>
            <div v-if="!isLoginShow">
              联系电话：
              <i
                v-if="detailData.contactPhone&&detailData.contactPhone!==null"
              >{{detailData.contactPhone}}</i>
            </div>
            <div v-else>
              联系电话：
              <i
                v-if="detailData.contactPhone&&detailData.contactPhone!==null"
              >{{detailData.contactPhone.substring(0,3)}}</i>***
            </div>
            <div v-if="isLoginShow">
              <span @click="toLogin">登录</span>后可以看查看具体信息
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="landshow_main">
        <div class="landshow_main_con">
          <div class="landshow_main_left">
            <div class="landshow_main_listtop">
              <span
                v-for="(item,index) in landshowData"
                :key="index"
                @click="selectSpan(index)"
                :class="{spanActive:spanKey == index}"
              >{{item}}</span>
            </div>
            <div style="background-color: #FFFFFF;">
              <div class="landshow_main_listtop_con selectSpanlist0">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt />地块信息
                </div>
                <table
                  width="846"
                  cellpadding="0"
                  cellspacing="0"
                  class="landshow_table"
                  v-if="detailData&&detailData!==null"
                >
                  <tr>
                    <td class="td1">土地性质</td>
                    <td class="td2">{{detailData.landCharName}}</td>
                    <td class="td1">是否连同地上建筑物、其他附着物</td>
                    <td class="td2">{{detailData.adjunct==1?'无':'有'}}</td>
                  </tr>
                  <tr>
                    <td class="td1">土地类型</td>
                    <td class="td2">{{detailData.landTypeName}}</td>
                    <td class="td1">{{detailData.circulationName}}建筑面积</td>
                    <td
                      class="td2"
                    >{{detailData.buildArea?detailData.buildArea+'平方米':detailData.buildArea}}</td>
                  </tr>
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
                    <td
                      class="td2"
                      v-if="detailData.firstClassUseName||detailData.secondClassUseName"
                    >{{detailData.firstClassUseName}}-{{detailData.secondClassUseName}}</td>
                    <td class="td2" v-else></td>
                    <td class="td1">绿地率</td>
                    <td
                      class="td2"
                      v-if="detailData.greenSpaceRate||detailData.greenSpaceRateSymbol1||detailData.greenSpaceRate2||detailData.greenSpaceRateSymbol2"
                    >{{detailData.greenSpaceRate?detailData.greenSpaceRate+'%':''}}{{detailData.greenSpaceRateSymbol1}}绿地率{{detailData.greenSpaceRateSymbol2}}{{detailData.greenSpaceRate2?detailData.greenSpaceRate2+'%':''}}</td>
                    <td class="td2" v-else></td>
                  </tr>
                  <tr>
                    <td class="td1">{{detailData.circulationName}}面积</td>
                    <td class="td2">{{detailData.area?detailData.area+'平方米':detailData.area}}</td>
                    <td class="td1">容积率</td>
                    <td
                      class="td2"
                      v-if="detailData.plotRatio||detailData.plotRatioSymbol1||detailData.plotRatio2||detailData.plotRatioSymbol2"
                    >{{detailData.plotRatio}}{{detailData.plotRatioSymbol1}}容积率{{detailData.plotRatioSymbol2}}{{detailData.plotRatio2}}</td>
                    <td class="td2" v-else></td>
                  </tr>
                  <tr>
                    <td class="td1">使用权截止日期</td>
                    <td class="td2">{{detailData.endDate}}</td>
                    <td class="td1">建筑密度</td>
                    <td
                      class="td2"
                      v-if="detailData.buildingDensity||detailData.buildingDensitySymbol1||detailData.buildingDensity2||detailData.buildingDensitySymbol2"
                    >{{detailData.buildingDensity}}{{detailData.buildingDensity?'%':''}}{{detailData.buildingDensitySymbol1}}建筑密度{{detailData.buildingDensitySymbol2}}{{detailData.buildingDensity2}}{{detailData.buildingDensity2?'%':''}}</td>
                    <td class="td2" v-else></td>
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
                    <td class="td2">{{detailData.years?detailData.years+'年':detailData.years}}</td>
                    <td class="td1">建筑限高</td>
                    <td class="td2">{{detailData.heightLimit?detailData.heightLimit+' 米':''}}</td>
                  </tr>
                  <!-- <tr>
                    <td class="td1">土地使用权证</td>
                    <td class="td2">有</td>
                    <td class="td1">土地权属状态</td>
                    <td class="td2">已认证</td>
                  </tr>-->
                  <tr>
                    <td class="td1">土地坐落</td>
                    <td class="td2">{{detailData.location}}</td>
                    <td class="td1">权证号</td>
                    <td class="td2">{{detailData.warrantNum}}</td>
                  </tr>
                  <!-- <tr>
                    <td class="td1">权证号</td>
                    <td class="td2">赣（2017）南昌市不动产权第0018158号</td>
                    <td class="td1">权证号</td>
                    <td class="td2">赣（2017）南昌市不动产权第0018158号</td>
                  </tr>-->
                </table>
              </div>
              <div class="landshow_main_listtop_con selectSpanlist1">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt />
                  地块照片视频
                </div>
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
              <div class="landshow_main_listtop_con selectSpanlist2">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt />
                  地图位置
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
              <div class="landshow_main_listtop_con selectSpanlist3">
                <div class="landshow_lefttop">
                  <img src="../../../../assets/image/icon-13.png" alt />
                  意向报价排名
                </div>
                <div class="landshow_leftrank" v-if="intentionData!==null">
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
                        <td>{{item.REAL_NAME?item.REAL_NAME.substr(0,1)+'**':item.REAL_NAME}}</td>
                        <td>{{item.TEL_PHONE.length>10?item.TEL_PHONE.substr(0,3)+'****'+item.TEL_PHONE.substr(7,11):item.TEL_PHONE}}</td>
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
            <PopularRecommend class="popular_recommend"></PopularRecommend>
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
import qs from "qs";
export default {
  components: { PicZoom, Map, PopularRecommend },
  data() {
    return {
      j_tip: "",
      j_dis: true,
      userId: "",
      landshowData: ["地块信息", "地块照片视频", "地图位置", "意向报价记录"],
      defaultImg:
        'this.src="' + require("../../../../assets/image/icon-nodata.png") + '"', //默认图地址
      isLoginShow: false,
      flag: false,
      baseUrl: "",
      location: [
        { path: "/", name: "首页" },
        { path: null, name: "土地信息详情页" }
      ],
      searchBarFixed: false,
      spanKey: 0,
      detailData: "",
      isbettal:false,
      tintentionoffer: "", //意向报价价格
      subscribeDialog: false, //预约看地弹窗
      imgUrl: [
        // { index: 1, url: require("../../../../assets/image/icon-demand01.jpg") },
        // { index: 2, url: require("../../../../assets/image/icon-demand02.png") },
        // { index: 3, url: require("../../../../assets/image/icon-demand03.png") },
        // { index: 4, url: require("../../../../assets/image/icon-demand04.png") },
        // { index: 5, url: require("../../../../assets/image/icon-demand01.png") },
        // { index: 6, url: require("../../../../assets/image/icon-demand02.png") },
        // { index: 7, url: require("../../../../assets/image/icon-demand03.png") },
        // { index: 8, url: require("../../../../assets/image/icon-demand01.png") },
        // { index: 9, url: require("../../../../assets/image/icon-demand02.png") },
        // { index: 10, url: require("../../../../assets/image/icon-demand03.png") },
        // { index: 11, url: require("../../../../assets/image/icon-demand04.png") }
      ], //大图片默认显示第一张
      mp4Url: [],
      currentImg: "",
      // ImgUrl: require("../../../../assets/image/icon-demand01.jpg"),
      offsetCount: 1,
      curCode: 1,
      imgActive: true,
      indexcollect: 1,
      imgScroll: 0, //计算跳转位置
      // 意向报价
      intentionData: [
        {
          REAL_NAME: "张三",
          TEL_PHONE: "15735806885",
          NUM: "5",
          INSERT_TIME: "122"
        },
        {
          REAL_NAME: "张三",
          TEL_PHONE: "15735806885",
          NUM: "5",
          INSERT_TIME: "122"
        },
        {
          REAL_NAME: "张三",
          TEL_PHONE: "15735806885",
          NUM: "5",
          INSERT_TIME: "122"
        },
        {
          REAL_NAME: "张三",
          TEL_PHONE: "15735806885",
          NUM: "5",
          INSERT_TIME: "122"
        }
      ],
      collectionData: [],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      ruleForm: {
        tsellId: "",
        name: "",
        phone: "",
        seeDate: "",
        isSee: "false",
        reservationId: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "您输入的手机号有误"
          }
        ],
        seeDate: [
          { required: true, message: "请选择预约看地时间", trigger: "change" }
        ]
      },
      MapLoading: true //地图遮罩
    };
  },
  beforeMount() {
    window.scrollTo(0, 0);
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.userId = localStorage.getItem("userId");
    if (this.$route.query.demand) {
      localStorage.setItem("gloDemailId", this.$route.query.demand);
    } else {
      this.$route.query.demand = localStorage.getItem("gloDemailId");
    }
    let demailId = this.$route.query.demand;
    function getChangeDate(date) {
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }

    // if(!this.isLogin()){
    //     this.flag = true;
    // }
    //收藏显示状态模拟
    if (!sessionStorage.getItem("login")) {
      this.collectionData = [];
    } else if (localStorage.getItem("collectionData")) {
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
        if (res.tSell.coordinate && res.tSell.coordinate !== null) {
          this.$refs.childItem.getAddressList(res.tSell.coordinate); //调用地图组件查询方法
          this.MapLoading = false;
        } else {
          this.$refs.childItem.getAddressList(null); //调用地图组件查询方法
          this.MapLoading = true;
        }
        //附件图片组信息
        if (res.tSell.img) {
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
                if (extName == "png" || extName == "PNG" || extName == "jpg" || extName == "JPG" || extName == "gif" || extName == "GIF") {
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
              console.log('this.currentImg',this.imgUrl[0].url)
              this.imgScroll = Math.ceil(
                (this.imgUrl.length + this.mp4Url.length) / 2
              );
            }
          );
        }

        //发布时间戳转换
        res.tSell.insertTime = res.tSell.insertTime
          ? getChangeDate(new Date(res.tSell.insertTime))
          : "";
        res.tSell.endDate = res.tSell.endDate
          ? getChangeDate(new Date(res.tSell.endDate))
          : "";
        this.detailData = res.tSell;
        //			判断工作用途是否显示
        let tip =
          this.detailData.firstClassUseName +
          "-" +
          this.detailData.secondClassUseName;
        this.j_tip = tip;
        if (tip.length > 13) {
          this.j_dis = false;
        }
        let params = {
          cantonProvince: res.tSell.cantonProvince,
          cantonCity: res.tSell.cantonCity,
          cantonArea: res.tSell.cantonArea,
          firstClassUse: res.tSell.firstClassUse,
          secondClassUse: res.tSell.secondClassUse,
          circulation: res.tSell.circulation,
          area: res.tSell.area
        };
        // 意向报价列表
        this.$axios.get(
          "/epf-landweb/admin/tintentionoffer/getSellOffer",
          { sellId: res.tSell.id, page: 1, rows: 10 },
          priceList => {
            console.log("意向报价列表", priceList);
            this.intentionData = priceList.pager.results;
          }
        );
      }
    );
    if (!sessionStorage.getItem("login")) {
      this.isLoginShow = true;
    }
  },
  methods: {
    // getGroupFils(demailId){
    //   this.$axios.get(
    //   "/epf-supply/tsell/getTSellById?id=" + demailId,{}, res => {
    //     //附件图片组信息
    //     this.$axios.get("/epf-document/document/getOneGroupFilsById", {id:res.tSell.img}, files => {
    //       for (let item = 0; item < files.fileList.length; item++) {
    //         let extName = files.fileList[item].extName;
    //         if(extName == 'png' || extName == 'PNG' || extName == 'jpg'){
    //           this.imgUrl.push({index: this.imgUrl.length + 1,url:this.baseUrl + files.fileList[item].id,extName:extName})
    //         }else if(extName == 'mp4'||extName == 'AVI'||extName == 'mov'||extName == 'rmvb'||extName == 'rm'||extName == 'FLV'||extName == '3GP'){
    //           this.mp4Url.push({index: this.mp4Url.length + 1,url:this.baseUrl + files.fileList[item].id,extName:extName})
    //         }
    //       }
    //       this.currentImg = this.imgUrl[0].url;
    //       this.imgScroll = Math.ceil((this.imgUrl.length + this.mp4Url.length) / 2)
    //     });
    //   })
    // },
    subscribeDialogClick() {
      if (!this.getIsLogin()) {
        return;
      }
      this.subscribeDialog = true;
    },
    lessNow() {
      const lessTime = new Date(this.ruleForm.seeDate).getTime();
      // const nowTime = new Date().getTime();
      const m = new Date();
      const nowTime = new Date(m.getTime() - 1000);
      console.log("当前→" + nowTime);
      console.log("选中→" + lessTime);
      if (lessTime < nowTime) {
        this.$message.error("不能小于当前时间!");
        this.ruleForm.seeDate = "";
      }
    },
    subscribe(formName) {
      //预约看地
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate() +
          "  " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
        );
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.tsellId = this.detailData.id;
          this.ruleForm.reservationId = localStorage.getItem("userId");
          this.ruleForm.reservationId = this.ruleForm.reservationId.toString;
          this.ruleForm.isSee = this.ruleForm.isSee.toString;
          //调用新增预约看地接口
          this.$axios.post(
            "/epf-landweb/admin/treservations/addTReservations",
            qs.stringify(this.ruleForm),
            res => {
              if (res.code == "0") {
                this.$message({
                  message: "预约成功",
                  type: "success"
                });
              } else {
                this.$message.error(res.msg);
              }
              this.subscribeDialog = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    nocollect(id,collectT) {
      console.log(collectT)
      if (!this.getIsLogin()) {
        return;
      }
      let params = {}
      if(collectT=='scordbFlag'){
        params['targetId'] = id
        params['type'] = "tsell"
        params['collectType'] = collectT
      }else{
        params['targetId'] = id
        params['collectType'] = "tsell"
      }
      //收藏
      this.$axios.post(
        "/epf-landweb/transwebcollect/addTransWebCollect",
        qs.stringify(params),
        res => {
          if (res.code === 0) {
            if(collectT=='scordbFlag'){
              this.detailData.scordbFlag = 1;
              this.detailData.scordbFlagId =  res.id;
              this.$message.success("加入比价成功");
            }else{
              this.detailData.collectionNum += 1
              this.detailData.isCollect = 1;
              this.detailData.collectId = res.id;
              this.$message.success("收藏成功");
              // this.$axios.get(
              //  "/epf-landweb/admin/tsell/getTSellById?id=" + this.$route.query.demand,
              //   {},
              //   res => {
              //     if (res.tSell.coordinate && res.tSell.coordinate !== null) {
              //       this.detailData = res.tSell;
              //     }
              //   }
              // );
            }
          } else {
            if(collectT=='scordbFlag'){
              this.$message.error("加入比价失败");
            }else{
              this.$message.error("收藏失败");
            }
          }
        }
      );
    },
    collect(id,collectT) {
      if (!this.getIsLogin()) {
        return;
      }
      let para = { id: id };
      let that = this;
      this.$axios.post(
        "/epf-landweb/transwebcollect/deleteTransWebCollect",
        qs.stringify(para),
        res => {
            //取消收藏/比价
            if (res.code === 0) {
              if(collectT=='scordbFlag'){
                this.detailData.scordbFlag = 0;
                this.$message.success("取消比价成功");
              }else{
                this.detailData.collectionNum -= 1
                this.detailData.isCollect = 0;  
                this.$message.success("取消收藏成功");
                // this.$axios.get(
                //   "/epf-landweb/admin/tsell/getTSellById?id=" + this.$route.query.demand,
                //   {},
                //   res => {
                //     if (res.tSell.coordinate && res.tSell.coordinate !== null) {
                //       this.detailData = res.tSell;
                //     }
                //   }
                // )
              }
            } else {
              if(collectT=='scordbFlag'){
                this.$message.error("取消比价失败");
              }else{
                this.$message.error("取消收藏失败");
              }
            }
          }
      );
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 700) {
        this.searchBarFixed = true;
        for (let i = 0; i < this.landshowData.length; i++) {
          if (
            scrollTop >=
            document.getElementsByClassName(`selectSpanlist${i}`)[0].offsetTop -
              150
          ) {
            this.spanKey = i;
          }
        }
      } else {
        this.searchBarFixed = false;
      }
    },
    selectSpan(item) {
      this.spanKey = item;
      var el = document.getElementsByClassName(`selectSpanlist${item}`)[0];
      this.$nextTick(function() {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 100 });
      });
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
    addIintentionoffer() {
      console.log(this.detailData);

      if (!this.getIsLogin()) {
        return;
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
        qs.stringify({
          tsellId: this.detailData.id,
          price: this.tintentionoffer
        }),
        res => {
          if (res.code == 0) {
            this.$message({
              message: "提交报价成功",
              type: "success"
            });
            this.tintentionoffer = "";
            //意向报价列表
            this.$axios.get(
              "/epf-landweb/admin/tintentionoffer/getSellOffer",
              { sellId: this.detailData.id },
              priceList => {
                this.intentionData = priceList.pager.results;
              }
            );
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    getIsLogin() {
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
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    toLogin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    // this.getGroupFils(this.$route.query.demand)
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
  // border-top: 2px solid var(--Colors);

  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 2019;
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
    .landshow_top {
      @include size(1200px, 512px);
      background-color: #ffffff;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 24px 24px 0 24px;
      .landshow_huandeng {
        @include size(484px, auto);
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
          @include size(484px, 328px);
          .pic-box {
            @include size(484px, 328px);
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
          @include size(100%, auto);
          #imageMenu {
            @include size(100%, auto);
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
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: flex-start;
              float: left;
              .list-img {
                @include size(484px, 62px);
                position: relative; //最外层的宽度，父级定位
                overflow: hidden;
                .list-img-wrap {
                  position: absolute; //子级定位，dom操作偏移
                  left: 0;
                  top: 0;
                  .single-img {
                    float: left;
                    margin-right: 8px;
                    margin-left: 1px;
                    cursor: pointer;
                    img {
                      display: block;
                      width: 88px;
                      height: 58px;
                    }
                  }
                  .img-activce {
                    border: 2px solid var(--lightColor);
                    box-sizing: border-box;
                  }
                }
              }
            }
          }
        }
      }
      .landshow_topcent {
        @include size(630px, auto);
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
          border-bottom: 1px dashed #e6e6e6;
          font-size: 14px;
          padding: 11px 0;
          span {
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
          background-image: url('../../../../assets/image/DemandLandDetailsBg.png');
          box-sizing: border-box;
          padding-left: 13px;
          span {
            font-weight: bold;
            color: var(--priceColor);
            font-size: 24px;
          }
          .landshow_sc {
            display: inline;
            font-size: 14px;
            padding: 6px 15px;
            border-radius: 0px 8px 0px 8px;
            margin-left: 11px;
          }
          .landshow_rz {
            color: #ffffff;
            background-color: #ffad89;
            margin-left: 20px;
          }
          .landshow_type {
            color: #ffffff;
            background-color: #88a0d8;
          }
          .landshow_type1 {
            color: #ffffff;
            background-color: #ff839a;
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
          position: relative;
          line-height: 48px;
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
          .input_text {
            @include size(200px, 46px);
            font-size: 18px;
            color: #000033;
            border: none;
            text-indent: 15px;
          }
          .input_sub {
            @include size(128px, 48px);
            background-color: var(--lightColor);
            border-radius: 2px;
            background: var(--lightColor);
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            border: none;
            text-align: center;
            margin-right: 16px;
            cursor: pointer;
            font-weight: bold;
          }
          .input_sub_collect {
            display: inline-block;
            @include size(128px, 38px);
            border-radius: 2px;
            line-height: 40px;
            font-size: 16px;
            font-weight: bold;
            color: var(--lightColor);
            border: none;
            text-align: center;
            margin-right: 16px;
            cursor: pointer;
            border: solid 1px var(--lightColor);
          }
          .input_sub_active {
            border: solid 1px var(--lightColor);
            background: #fff;
            color: var(--lightColor);
          }
        }
        .landshow_topbot {
          @include size(100%, 28px);
          display: flex;
          justify-content: space-around;
          color: #999;
          border: solid 1px #eeeeee;
          background-color: #f8f8f8;
          line-height: 28px;
          font-size: 14px;
          margin-top: 20px;
          span {
            color: var(--lightColor);
            cursor: pointer;
          }
        }
        /deep/ .el-popover__reference .question{
           width:18px;
           height:18px;
           display: inline-block;
           vertical-align: bottom;
           background:url("../../../../assets/image/question-01.png") no-repeat
        }
        /deep/ .el-popover__reference:hover .question{
           background:url("../../../../assets/image/question-02.png") no-repeat
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
          float: left;
          .landshow_main_listtop {
            @include size(100%, 50px);
            border-bottom: 1px solid #eeeded;
            background-color: #f7f7f7;
            span {
              line-height: 50px;
              padding-bottom: 16px;
              margin-left: 50px;
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
              color: #666666;
            }
            .spanActive {
              box-sizing: border-box;
              border-bottom: 2px solidvar(--lightColor);
              color: var(--lightColor);
            }
          }
          .landshow_main_listtop_con {
            padding-bottom: 40px;
            .landshow_lefttop {
              @include size(850px, auto);
              margin: 0 auto;
              padding: 24px 0;
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
              margin-top: 24px;
             /deep/ .el-popover__reference .question{
                width:18px;
                height:18px;
                display: inline-block;
                vertical-align: bottom;
                background:url("../../../../assets/image/question-01.png") no-repeat;
              }
              /deep/ .el-popover__reference:hover .question{
                background:url("../../../../assets/image/question-02.png") no-repeat;
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
                width: 100px;
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
                video {
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
          float: left;
          margin-top: 24px;
          .popular_recommend {
            /deep/ .tdzr_right {
              @include size(289px, auto);
              .tdzr_right_bot_tit {
                background-color: #f7f7f7;
                position: relative;
                .span_img {
                  border-radius: 3px;
                }
              }
              /deep/ .tdzr_right_list {
                .right_list {
                  @include size(243px, auto);
                  .right_list_img {
                    @include size(100%, 160px);
                    img {
                      display: block;
                      @include size(100%, 100%);
                    }
                  }
                  .mainlist_cont_bot {
                    padding: 18px;
                    line-height: 30px;
                    .mainlist_cont_bot_active {
                      font-size: 16px;
                    }
                    h5 {
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
          //   .tdzr_right_bot {
          //     .tdzr_right_bot_tit {
          //       background-color: #f7f7f7;
          //       position: relative;
          //       height: 50px;
          //       font-size: 14px;
          //       color: #333333;
          //       font-weight: bold;
          //       border-bottom: 2px solid #eeeeee;
          //       box-sizing: border-box;
          //       padding-left: 17px;
          //       padding-top: 15px;
          //       font-size: 16px;
          //     }
          //     .tdzr_right_list {
          //       background-color: #ffffff;
          //       box-sizing: border-box;
          //       padding: 20px;
          //       padding-bottom: 1px;
          //       .right_list {
          //         @include size(243px, auto);
          //         margin-bottom: 20px;
          //         cursor: pointer;
          //         .right_list_img {
          //           @include size(100%, 160px);
          //           position: relative;
          //           img {
          //             display: block;
          //             @include size(100%, 100%);
          //           }
          //           .mainlist_cont_top_personal {
          //             font-size: 12px;
          //             text-align: center;
          //             -webkit-box-sizing: border-box;
          //             box-sizing: border-box;
          //             color: #fff;
          //             position: absolute;
          //             left: 0;
          //             top: 0;
          //             background: var(--Colors);
          //             border-bottom-right-radius: 6px;
          //             padding: 6px 12px;
          //           }
          //           .mainlist_cont_top_enterprise {
          //             font-size: 12px;
          //             text-align: center;
          //             -webkit-box-sizing: border-box;
          //             box-sizing: border-box;
          //             color: #fff;
          //             position: absolute;
          //             left: 0;
          //             top: 0;
          //             background: var(--lightColor);
          //             border-bottom-right-radius: 6px;
          //             padding: 6px 12px;
          //           }
          //         }
          //         .mainlist_cont_bot {
          //           line-height: 25px;
          //           border: solid 1px #eeeded;
          //           box-sizing: border-box;
          //           padding: 18px;
          //           line-height: 30px;
          //           h4 {
          //             line-height: 32px;
          //             color: #333;
          //             font-size: 16px;
          //             font-weight: bold;
          //           }
          //           .mainlist_cont_bot_active {
          //             color: var(--priceColor);
          //             font-size: 16px;
          //             font-weight: bolder;
          //           }
          //           h5 {
          //             font-size: 12px;
          //             color: #999999;
          //             span {
          //               &:nth-child(1) {
          //                 img {
          //                   margin-top: 2px;
          //                   margin-right: 3px;
          //                   margin-left: 2px;
          //                 }
          //               }
          //               &:nth-child(2) {
          //                 img {
          //                   margin-top: -1px;
          //                   margin-right: 3px;
          //                 }
          //               }
          //             }
          //           }
          //           p {
          //             color: #666;
          //             font-size: 12px;
          //             color: #999999;
          //             // background: url(../images/land_11.jpg) left center no-repeat;
          //             // padding-left: 18px;
          //           }
          //         }
          //       }
          //     }
          //   }
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
.subscribe-ruleForm .el-form-item__label {
  width: 80px !important;
}
.subscribe-ruleForm .el-form-item__content {
  text-align: right;
}
.subscribe-ruleForm .el-form-item__error {
  width: 130px;
}
.subscribe-ruleForm .el-date-editor.el-input {
  width: 230px;
}
/* .el-tooltip__popper.is-light {
    background: #FFF;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    word-wrap: break-word;
}
.el-tooltip__popper .popper__arrow, .el-tooltip__popper .popper__arrow::after{
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    word-wrap: break-word;
} */
</style>
