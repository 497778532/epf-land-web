<template>
<!--  bndexlqk-->
  <div class="landDetails_warp" ref="box" style="background:#efeef6">
    <epf-lePage :location="location"></epf-lePage>
    <div class="landmain" style="background:#efeef6">
      <div class="landshow_top clearfix"  style="background:#fff;">
        <div class="landshow_huandeng">
          <span class="landshow_huandeng_state">{{detailTarget.transTarget.statusName}}</span>
          <div class="bigImg">
            <div class="pic-box" v-if="currentImg&&currentImg!==''">
              <pic-zoom :url="currentImg" :scale="3"></pic-zoom>
            </div>
            <div class="pic-box" v-else>
              <img src="@/assets/image/icon-nodata.png" alt width="100%" height="100%" />
            </div>
          </div>
          <div class="smallImg" v-if="imgUrl&&imgUrl!==[]">
            <div id="imageMenu">
              <div @click="prevImg" class="onlickImg prev-arrow" v-if="imgUrl.length >= 6">
                <img src="@/assets/image/icon-left.png" alt />
              </div>
              <ul>
                <li class="list-img">
                  <div class="list-img-wrap" ref="carouser">


                    <div
                      v-for="(item,index) in imgUrl"
                      @click="getCurImg(item.url, index)"
                      :key="index"
                      class="single-img"
                      :class="{'img-activce': item.url == curCode && imgActive}"
                    >
                      <img :src="item.url" alt="缩略图" />
                    </div>
                  </div>
                </li>
              </ul>
              <div class="onlickImg onlickImg1" @click="nextImg" v-if="imgUrl.length >= 6">
                <img src="@/assets/image/icon-right.png" alt />
              </div>
            </div>
          </div>
        </div>
        <div
          class="landshow_topcent"
          v-if="detailTarget&&detailTarget!==null&&detailTarget.transTarget&&detailTarget.transTarget!==null"
         >
          <div class="landshow_title">
            标的编号：{{detailTarget.transTarget.targetNo}}
          </div>
          <div  style="font-size: 13px;color: #999999;font-weight: normal;position:absolute;right:5px;top:5px">
            <span style="color: #ff6825;margin-right: 8px;">{{detailTarget.transCountDataMap.liulancishu}}</span>次浏览
            <span style="color: #e6e6e6;padding: 0 10px;">|</span>
            <span style="color: #ff6825;margin-right: 8px;">{{detailTarget.transCountDataMap.shoucangcishu}}</span>次收藏
          </div>
          <div class="start_end_price">
            <p>起始价：<span style="font-size:24px;color:rgb(255,104,37);">{{detailTarget.transTarget.beginPrice?detailTarget.transTarget.beginPrice+'万':null}}</span></p>
          </div>
          <div class="landshow_pice">
            <p>竞价阶梯：<span>{{detailTarget.transTarget.priceStep?detailTarget.transTarget.priceStep+'万':null}}</span></p>
            <p v-if="detailTarget.transTarget.status == 'trans_status-007' || detailTarget.transTarget.status == 'trans_status-008'">
              保证金：<span>{{detailTarget.transTarget.amount}}</span>
              成交价：<span>{{detailTarget.transTarget.transPrice?detailTarget.transTarget.transPrice+'万':null}}</span>
            </p>
            <p v-else>
              保证金：<span>{{detailTarget.transTarget.amount}}</span>
            </p>
          </div>
          <div style="overflow: hidden;padding: 10px 0;border-bottom: 1px solid #eaeaea;">
            <div style="float: left;width: 144px;border-right: 2px solid #EAEAEA;">
              <div
                style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{detailLand.circulationName}}</div>
              <div style="font-size: 14px;color: #999999;">流转方式</div>
            </div>
            <div
              style="float: left;width: 220px;border-right: 2px solid #EAEAEA;padding-left: 15px;"
            >
              <div
                style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{detailTarget.transTarget.transTypeName}}</div>
              <div style="font-size: 14px;color: #999999;">交易方式</div>
            </div>
            <div style="float: left;width: 200px;padding-left: 15px;">
                <div
                  style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                >
                {{detailNotice.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(detailNotice.noticeTime)[0]:''}}
                </div>
              <div style="font-size: 14px;color: #999999;">公告日期</div>
            </div>
          </div>
          <div class="input_sub input_buy" v-if="detailTarget.transTarget.status==='trans_status-004'" @click="bidApplicate()">申请竞买</div>
          <div class="input_sub" v-if="detailTarget.transTarget.status==='trans_status-004'" @click="centerPrice()">我要报价</div>
          <div class="input_sub" v-if="detailTarget.transTarget.status!==3 && detailTarget.transTarget.isCollect==0" @click="nocollect">
            <img src="@/assets/image/collect1-1.png" alt width="18" height="18" />
            <span>收藏</span>
          </div>
          <div class="input_sub" v-if="detailTarget.transTarget.status!==3 && detailTarget.transTarget.isCollect==1" @click="collect">
            <img src="@/assets/image/collect-1.png" alt width="18" height="18" />
            <span>取消收藏</span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <!-- 时间轴 -->
      <div class="landshow_middle" style="margin:0 auto;width:1200px;height:185px;border-top:8px solid #f8f8f8;">
        <div class="landshow_state_Proess">
          <ul class="landshow_proess">
            <li>
              <div class="landshow_icon">
                <img src="@/assets/image/landStateTime00_1.png" alt />
              </div>
              <span class="line"></span>
              <p class="landshow_stateTime_one">{{detailTarget.transTarget.beginNoticeTime}}</p>
              <p class="landshow_stateTime">公告开始时间</p>
              <div class="time">
                  <img src="@/assets/image/time.png" alt="">
              </div>
            </li>

            <li>
              <div class="landshow_icon" v-if="!con1">
                <img src="@/assets/image/landStateTime12.png" alt />
              </div>
              <span :class="con1 ? 'line':'line_two'"></span>
              <div class="landshow_icon" v-if="con1">
                <img src="@/assets/image/landStateTime12_1.png" alt />
              </div>
              <p class="landshow_stateTime_one" v-if="detailTarget.transTarget.transTypeMark == 'listing_mode'">{{detailTarget.transTarget.beginFocusTime}}</p>
              <p class="landshow_stateTime landshow_stateTime_two"  v-if="detailTarget.transTarget.transTypeMark == 'listing_mode'">挂牌开始时间</p>

              <p class="landshow_stateTime_one landshow_stateTime_one_top">{{detailTarget.transTarget.beginApplyTime}}</p>
              <p class="landshow_stateTime landshow_stateTime_top">竞买申请开始时间</p>
              <div class="time" v-if="con1">
                  <img src="@/assets/image/time.png" alt="">
              </div>
            </li>

            <li>
              <div class="landshow_icon" v-if="!con2">
                <img src="@/assets/image/landStateTime22.png" alt />
              </div>
              <div class="landshow_icon" v-if="con2">
                <img src="@/assets/image/landStateTime22_1.png" alt />
              </div>
              <span :class="con2 ? 'line':'line_two'"></span>
              <p class="landshow_stateTime_one" v-if="detailTarget.transTarget.transTypeMark == 'listing_mode'">{{detailTarget.transTarget.endFocusTime}}</p>
              <p class="landshow_stateTime"  v-if="detailTarget.transTarget.transTypeMark == 'listing_mode'">挂牌截止时间</p>
              <p class="landshow_stateTime_one landshow_stateTime_one_top">{{detailTarget.transTarget.endEarnestTime}}</p>
              <p class="landshow_stateTime landshow_stateTime_top">保证金截止时间</p>

              <div class="time" v-if="con2">
                  <img src="@/assets/image/time.png" alt="">
              </div>
            </li>

            <li>
              <div class="landshow_icon" v-if="!con3">
                <img src="@/assets/image/landStateTime32.png" alt />
              </div>
              <div class="landshow_icon" v-if="con3">
                <img src="@/assets/image/landStateTime32_1.png" alt />
              </div>
              <span :class="con3 ? 'line':'line_two'"></span>
              <p class="landshow_stateTime_one">{{detailTarget.transTarget.beginLimitTime}}</p>
              <p
                v-if="detailTarget.transTarget.transTypeMark == 'listing_mode'"
                class="landshow_stateTime"
              >限时竞价开始时间</p>
              <p v-else class="landshow_stateTime">拍卖开始时间</p>
              <div class="time" v-if="con3">
                  <img src="@/assets/image/time.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="landshow_main">
        <div class="landshow_main_con">
          <div class="landshow_main_left">
            <div class="landshow_main_listtop">
              <span
                v-for="(item,index) in landshowData"
                :key="index"
                @click="selectSpan(index)"
                :class="{spanActive:spanKey == index}">{{item}}</span>
            </div>
            <div class="landshow_main_listtop_con selectSpanlist0">
              <div class="landshow_lefttop">
                <img src="@/assets/image/icon-13.png" alt />相关附件下载
              </div>
              <div class="landshow_bot">
                <div class="download" style="padding-bottom:30px;">
                  <div>
                    <!-- isBidder	---	  显示竞买申请书 0-是 1-否
                          isHonour	---	显示履约保证金入账申请单 0-是 1-否
                          isQualifuation	---	显示竞买资格确认书 0-是 1-否
                          isGoverns	---	显示竞得人入选通知书 0-是 1-否
                          isBargain	---	显示成交确认书 0-是 1-否
                          isResidue	---	显示剩余成交款缴费通知书 0-是 1-否
                          isServices	---	显示交易服务费缴费通知书 0-是 1-否
                          isFund	---	显示资金托管协议 0-是 1-否 -->
                    <span @click="noticdetail()">公告</span>
                    <span v-if="noticeIds.deputyId != ''"  @click="chagenoticdetail(noticeIds.deputyId)">变更公告</span>
                    </div>
                  </div>
                </div>
            </div>
            <!--标的附件-->
            <div
              class="landshow_main_listtop_con"
              v-if="tableData&&tableData!==null&&tableData.length>0"
             >
              <div class="landshow_lefttop">
                <img src="@/assets/image/icon-13.png" alt />标的附件
              </div>
              <div class="landshow_bot">
                <div class="download" style="padding-bottom:30px;">
                  <div>
                    <ul v-if="tableData&&tableData!==null" style="display:inline-block;">
                      <li
                        v-for="(item,index) in tableData"
                        :key="index"
                        style="display:inline-block;"
                      >
                        <a
                          v-if="item.files&&item.files[0]&&item.files[0].fid"
                          :href="baseUrl + item.files[0].fid"
                        >
                          <span>{{item.files.length== 0?'':item.files[0].fname.substring(0,item.files[0].fname.lastIndexOf("."))}}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- 竞买流程 -->
            <div class="landshow_main_listtop_con selectSpanlist1" v-if="landStatekey!==3">
              <div class="landshow_lefttop">
                <img src="@/assets/image/icon-13.png" alt />竞买流程
              </div>
              <div class="landshow_bot">
                <div class="bidprocess">
                  <img src="@/assets/image/bidprocess.png" alt />
                </div>
              </div>
            </div>
          </div>
          <div class="landshow_main_left">
            <div class="landshow_main_listtop">
              <div class="listtop">
                <span :class="{spanActive:landInfoListTitleKey===0}" @click="landInfoListTitleKey=0">地块信息</span>
                <span :class="{spanActive:landInfoListTitleKey===3}" @click="landInfoListTitleKey=3"
                  v-if="detailTarget.transTarget.status==='trans_status-004'||detailTarget.transTarget.status==='trans_status-007'">竞价记录</span>
                <span :class="{spanActive:landInfoListTitleKey===5}" @click="landInfoListTitleKey=5"
                  v-if="detailTarget.transTarget.status==='trans_status-006'">流拍信息</span>
              </div>
            </div>
            <!-- 地块信息 -->
            <div style="padding:24px 0;"  v-if="landInfoListTitleKey===0">
              <div class="landshow_main_listselect  selectSpanlist2">
                <span
                  v-for="(item,index) in detailData"
                  :key="index"
                  :class="landInfoKey===index?'spanActiveland':''"
                  @click="landInfoKeySelect(index)"
                >{{item.goodsNo}}</span>
              </div>
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop_nobg landshow_lefttop">
                  <strong style="color:var(--lightColor);font-size:16px;marign-bottom:0px">01：基本信息</strong>
                </div>
                <table class="landshow_table" width="1155" cellpadding="0" cellspacing="0" v-if="detailLand&&detailLand!==null">
                  <tr>
                    <td class="td1">土地性质</td>
                    <td class="td2">{{detailLand.landCharName}}</td>
                    <td class="td1">是否连同地上建筑物、其他附着物</td>
                    <td class="td2" v-if="detailLand.isAdjunct==0">是</td>
                    <td class="td2" v-else>否</td>
                  </tr>
                  <tr>
                    <td class="td1">土地类型</td>
                    <td class="td2">{{detailLand.landTypeName}}</td>
                    <td class="td1">建筑面积</td>
                    <td
                      class="td2"
                    >{{detailLand.buildArea?detailLand.buildArea+'平方米':detailLand.buildArea}}</td>
                  </tr>
                  <tr>
                    <td class="td1">所属行政区</td>
                    <td
                      class="td2"
                      v-if="detailLand.cantonProvinceName||detailLand.cantonCityName||detailLand.cantonAreaName"
                    >{{detailLand.cantonProvinceName}}-{{detailLand.cantonCityName}}-{{detailLand.cantonAreaName}}</td>
                    <td class="td2" v-else></td>
                    <td class="td1">建筑结构</td>
                    <td class="td2">{{detailLand.buildingStructureName}}</td>
                  </tr>
                  <tr>
                    <td class="td1">土地用途</td>
                    <td
                      class="td2"
                      v-if="detailLand.firstClassUseName||detailLand.secondClassUseName"
                    >{{detailLand.firstClassUseName}}-{{detailLand.secondClassUseName}}</td>
                    <td class="td2" v-else></td>
                    <td class="td1">绿地率</td>
                    <td
                      class="td2"
                      v-if="detailLand.greenSpaceRate||detailLand.greenSpaceRateSymbol1||detailLand.greenSpaceRate2||detailLand.greenSpaceRateSymbol2"
                    >{{detailLand.greenSpaceRate?detailLand.greenSpaceRate+'%':null}}{{detailLand.greenSpaceRateSymbol1}}绿地率{{detailLand.greenSpaceRateSymbol2}}{{detailLand.greenSpaceRate2?detailLand.greenSpaceRate2+'%':null}}</td>
                    <td class="td2" v-else></td>
                  </tr>
                  <tr>
                    <td class="td1">{{detailLand.circulationName}}面积</td>
                    <td class="td2">{{detailLand.area?detailLand.area+'平方米':detailLand.area}}</td>
                    <td class="td1">建筑密度</td>
                    <td
                      class="td2"
                      v-if="detailLand.buildingDensity||detailLand.buildingDensitySymbol1||detailLand.buildingDensity2||detailLand.buildingDensitySymbol2"
                    >{{detailLand.buildingDensity?detailLand.buildingDensity+'%':null}}{{detailLand.buildingDensitySymbol1}}密度{{detailLand.buildingDensitySymbol2}}{{detailLand.buildingDensity2?detailLand.buildingDensity2+'%':null}}</td>
                    <td class="td2" v-else></td>
                  </tr>
                  <tr>
                    <td class="td1">使用权截止日期</td>
                    <td class="td2">{{detailLand.endDate?/\d{4}-\d{1,2}-\d{1,2}/g.exec(detailLand.endDate)[0]:''}}</td>
                    <td class="td1">建筑限高</td>
                    <td class="td2">{{detailLand.heightLimit?detailLand.heightLimit+'米':null}}</td>
                  </tr>
                  <tr>
                    <!-- <td class="td1">{{detailTarget.transTarget.businessTypeName}}年限</td> -->
                    <el-popover
                      v-if="detailLand.circulationName == '转让'"
                      placement="bottom"
                      width="200"
                      trigger="hover">
                      <div solt="content" style="padding:10px;line-height:20px;color:#666">
                          <p>剩余使用年限为估算值，最终以使用权截止日期为准。</p>
                      </div>
                      <td  slot="reference" class="td1">{{detailLand.circulationName == "转让"?"剩余使用":detailLand.circulationName}}年限<i class="question"></i></td>
                    </el-popover>
                    <td class="td1"  v-else>{{detailLand.circulationName == "转让"?"剩余使用":detailLand.circulationName}}年限</td>
                    <td class="td2">{{detailLand.years?detailLand.years+'年':null}}</td>
                    <td class="td1">容积率</td>
                    <td
                      class="td2"
                      v-if="detailLand.plotRatio||detailLand.plotRatioSymbol1||detailLand.plotRatio2||detailLand.plotRatioSymbol2"
                    >{{detailLand.plotRatio?detailLand.plotRatio:null}}{{detailLand.plotRatioSymbol1}}容积率{{detailLand.plotRatioSymbol2}}{{detailLand.plotRatio2?detailLand.plotRatio2:null}}</td>
                    <td class="td2" v-else></td>
                  </tr>
                  <tr>
                    <td class="td1">土地坐落</td>
                    <td class="td2">{{detailLand.location}}</td>
                    <td class="td1">权证号</td>
                    <td class="td2">{{detailLand.warrantNum}}</td>
                  </tr>
                </table>
                <div class="landshow_explain" v-if="detailLand&&detailLand!==null">
                  <span style="display: inline-block;">补充说明：</span>
                  <div class="landshow_explain_text">{{detailLand.remark?detailLand.remark:'暂无'}}</div>
                </div>
              </div>
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop_nobg landshow_lefttop">
                  <strong style="color:var(--lightColor);font-size:16px;marign-bottom:0px">02：地块照片视频</strong>
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
                    <img src="@/assets/image/dataNone.png" />
                  </div>
                </div>
              </div>

              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop_nobg landshow_lefttop">
                  <strong style="color:var(--lightColor);font-size:16px;marign-bottom:0px">03：地图位置</strong>
                </div>
                <div
                  class="landshow_leftmap"
                  v-loading="MapLoading"
                  element-loading-spinner="el-icon-s-promotion"
                  element-loading-text="未能获取到该地块所在位置"
                  element-loading-background="rgba(0, 0, 0, 0.7)"
                >
                  <Map ref="childItem"></Map>
                </div>
              </div>
            </div>
            <!-- 竞价记录 -->
            <div style="padding-bottom:24px;"
              v-if="landInfoListTitleKey==3&&(detailTarget.transTarget.status=='trans_status-004'||detailTarget.transTarget.status=='trans_status-007')"
             >
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop">
                  <img src="@/assets/image/icon-13.png" alt />竞价记录
                </div>
                <div v-loading="loading" element-loading-text="拼命加载中..." element-loading-background="rgba(251, 251, 251, 0.9)">
                  <table class="landshow_table2" width="1155" cellpadding="0" cellspacing="0">
                    <tr>
                      <th>序号</th>
                      <th>竞买人</th>
                      <th>竞买出价（万元）</th>
                      <th>竞买时间</th>
                    </tr>
                    <tr v-for="(item,index) in landInfomatchData" :key="index" :class="index===0?'trActive':''">
                      <td>{{index+1}}</td>
                      <td>
                          <span v-if="item.confirmUserId == userId">{{item.recorderName}}</span>
                          <span v-else>{{item.licenseNo}}</span>
                      </td>
                      <td>{{item.price}}</td>
                      <td>{{item.offerDate}}</td>
                    </tr>
                  </table>
                  <div style="margin-top:10px;text-align: center;" v-if="landInfomatchDataPage&&landInfomatchDataPage.totalRecord!==0">
                    <el-pagination
                      background
                      layout="prev, pager, next,sizes,jumper"
                      :page-sizes="[5,10, 15, 20]"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :total="landInfomatchDataPage.totalRecord"
                    ></el-pagination>
                  </div>
                  <div v-if="landInfomatchData==[]||landInfomatchData==''" style="text-align: center;">
                    <img src="@/assets/image/dataNone.png" alt />
                  </div>
                </div>
              </div>
            </div>
            <!-- 流拍信息 ---给到实例999-->
            <div style="padding-bottom:24px;" v-if="landInfoListTitleKey===5">
              <div class="landshow_main_listtop_con">
                <div class="landshow_lefttop">
                  <img src="@/assets/image/icon-13.png" alt />流拍原因
                </div>
                <div class="landshow_main_cont">
                  <p
                    style="line-height:30px;text-indent: 2rem;color:#666;font-size:14px;"
                  >{{Racketreason}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 公示信息 -->
          <div class="landshow_main_left">
            <div class="landshow_main_listtop_con">
              <div class="landshow_lefttop">
                <img src="@/assets/image/icon-13.png" alt />成交公示
              </div>
            </div>
            <div v-if="detailTarget.transTarget.status=='trans_status-008'"  class="selectSpanlist3">
              <div class="landshow_main_listtop_con">
                <ResultsPublicityDetails :targetid="this.$route.query.id"></ResultsPublicityDetails>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="false">{{comNewTime}}</div>
    </div>
  </div>
</template>
<script>
import Map from "@/components/common/tianditu/detailsMap";
import ResultsPublicityDetails from "./ResultsPublicityDetails";
import PicZoom from "vue-piczoom";
import baseURL1 from "@/util/config.js";
import applyBiddingPop from "../../trade/competeBuy/applyBiddingPop";
import qs from "qs";
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: { PicZoom, Map, applyBiddingPop,ResultsPublicityDetails },
  data() {
    return {
      tableData: [],
      belongId: "",
      areaCode: "",

      ceshi1: "",
      loading: true,
      // 申请竞买书
      bids_for_books: false,
      included: false,
      // 资格确认书
      qualifications: false,
      // 成交款缴费通知书
      dealtradeService: false,
      dealtradeServiceData: {},
      // 交易服务费缴费通知书
      tradeService: false,
      tradeServiceData: {},
      // applyPopShow:false,
      NewTime: 80,
      proessTime: true,
      landStatekey: "trans_status-003", //土地信息状态(公示、挂牌、成交)
      tableData1: {},
      detailInfo: [],
      collectShow: false,
      totalRecord: 10,
      landInfomatchData: [],
      landInfoListTitleKey: 0,
      landInfoKey: 0,
      landInfoTitle: [],
      landInfoListTitle: [
        "地块信息",
        "公告信息",
        "变更公告",
        "竞价记录",
        "公示信息"
      ],
      baseUrl: "",
      location: [
        { path: "/", name: "首页" },
        { path: "/TradingHall", name: "交易大厅" },
        { path: null, name: "信息详情页" }
      ],
      searchBarFixed: false,
      spanKey: 1,
      tintentionoffer: "", //意向报价价格
      subscribeDialog: false, //预约看地弹窗

      // 标的信息
      detailTarget: {
        transTarget: {},
        transCountDataMap: {
          shoucangcishu: "400",
          liulancishu: "42"
        }
      },
      detailLand: {},
      detailNotice: {},
      detailResults: {},
      noticeContent: "",
      noticeLands: [],
      detailData: {},
      imgUrl: [],
      mp4Url: [],
      noticeIds: {},
      currentImg: "",
      offsetCount: 1,
      curCode: 1,
      imgActive: true,
      indexcollect: 1,
      imgScroll: 0, //计算跳转位置
      // 意向报价
      intentionData: [],
      // 热门推荐
      popularData: [],
      collectionData: [],
      ruleForm: {
        tsellId: "",
        name: "",
        phone: "",
        seeDate: "",
        isSee: "false",
        reservationId: "",
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号格式有误", trigger: "blur" }
        ],
        seeDate: [
          { required: true, message: "请选择预约看地时间", trigger: "change" }
        ]
      },
      Racketreason:`宁乡蓝色港湾房地产开发有限公司于2011年1月25日以出让方式取得了该宗地的土地使用权，
        使用权面积为54244.4平方米，土地用途为商业、住宅，商业用地面积5424平方米，住宅用地
        面积48820.4平方米，
        商业使用权年限至2051年1月25日止，住宅使用年限至2081年1月25日止。土地证其中编号为宁（1）
        国用2011第039号，发证日期为2011年1月26日。根据长沙蓝月
        谷房地产开发有限公司提交的宁乡经济技术开发区国有资产监
        督管理领导小组办公室文件（宁开国资办发[2018]7号）《关于同意转让
        长沙蓝月谷房地产开发有限公司土地的批复》、（宁开国资办发[2018]8号）《
        关于长沙蓝月谷房地产开发有限公司土地评估报告核准的批复》、《长沙顺泰投资管理有限公司
        股东决议》、《长沙蓝月谷房地产开发有限公司执行董事决定》、《宁乡经济技术开发区建设投资
        有限公司股东会决议》，同意转让该宗土地使用权。宁乡蓝色港湾房地产开发有限公司已于2018年1
        月18日在工商部门办理了更名手续，将公司名称变更为长沙蓝月谷房地产开发有限公司，土地使用权
        证暂未变更。`,
      publicity: {
        transGoodsEntityList: []
      },
      filesData: [],
      landInfomatchDataPage: null,
      area: "",
      // lonLatData:'106.67252,26.62221', //经纬度
      MapLoading: true, //地图遮罩
      con1: false,
      con2: false,
      con3: false,
      transEndDetail: {},
      transBook: {},
      title: "",
      licenseSteps: "", //竞买步骤
      isApply: false,
      differ:0,
      now:'',
      serverD:{},
      timer2:{},
      TransCertificateInfo:{},
      searchBarFixed: false,
      spanKey: 0,
      landshowData: ["相关资料下载", "竞买流程", "地块信息","成交公示"],
      loginKey:false,
      userId:localStorage.getItem("userId") ? localStorage.getItem("userId") : "--"
    };
  },
  computed: {
    comNewTime() {
      if (this.landStatekey === "trans_status-003") {
        this.NewTime = 80;
      }
      if (this.landStatekey === "trans_status-004") {
        this.NewTime = 250;
      }
      if (this.landStatekey === "trans_status-007") {
        this.proessTime = false;
      }
      if (this.landStatekey === "trans_status-006") {
        this.proessTime = false;
      }
      return null;
    }
  },
  created() {
    const  _this = this;
    //页面加载时先执行一次
    _this.getServerDate();
    this.serverD = setInterval(function () {
      console.log("同步时间开始")
      _this.getServerDate();
    },1000*10*3)   //30秒同步一次

    let that = this;
    if (this.$route.query.id) {
      localStorage.setItem("gloId", this.$route.query.id);
    } else {
      this.$route.query.id = localStorage.getItem("gloId");
    }
    this.baseUrl =  baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let url = "/epf-landweb/landweb/transtarget/getTargetDetailsVo?targetId=";
    if(localStorage.getItem("userId")){
      url = "/epf-landweb/admin/getTargetDetailsVo?targetId=";
    }
    // （交易服务）查询标的详情、标的的地块详情、标的的公告详情、标的的公示信息、标的的流拍原因、竞得人选人通知、剩余价款
    this.$axios.get(
        url +
        this.$route.query.id,
      {},
      res => {
        if (res.code == 0) {
          let dataJson = res.dataJson;
          if (dataJson) {
            //获取数据解析开始
            // 标的详情  dataJson.transTargetDetails
            if (dataJson.transTargetDetails) {
              //接收数据对象
              let transTargetDetails = dataJson.transTargetDetails;

              this.detailTarget = transTargetDetails;
              this.landStatekey = this.detailTarget.transTarget.status;
              if (this.landStatekey == "trans_status-004") {
                let endNoticeTime = new Date(
                  this.detailTarget.transTarget.endNoticeTime
                ).getTime();
                let now = this.getNowTime().getTime();
                if (now < endNoticeTime) {
                  this.landStatekey = "trans_status-003";
                }
              }
              this.area = transTargetDetails.area;
              this.noticeIds = transTargetDetails.noticeIds;
              //创建定时任务来刷时间点
              this.timer2 = setInterval(function() {
                let detailTarget = that.detailTarget;
                //TODO
                //公告开始时间
                let beginNoticeTime = new Date(
                  detailTarget.transTarget.beginNoticeTime
                ).getTime();
                //竞买申请开始时间
                let beginApplyTime = new Date(
                  detailTarget.transTarget.beginApplyTime
                ).getTime();
                //挂牌开始时间
                let beginFocusTime = new Date(
                  detailTarget.transTarget.beginFocusTime
                ).getTime();
                //保证金截止时间
                let endEarnestTime = new Date(
                  detailTarget.transTarget.endEarnestTime
                ).getTime();
                //挂牌截止时间
                let endFocusTime = new Date(
                  detailTarget.transTarget.endFocusTime
                ).getTime();
                //限时竞价开始时间
                let beginLimitTime = new Date(
                  detailTarget.transTarget.beginLimitTime
                ).getTime();
                // 交易方式
                let transType = detailTarget.transTarget.transTypeMark;

                //当前时间
                let now = that.getNowTime().getTime();
                //当前时间在公告开始时间到竞买申请开始时间之间
                if (now >= beginNoticeTime && now <= beginApplyTime) {
                  that.proessTime = true;
                  that.NewTime = 80;
                }
                //当前时间在挂牌开始时间到保证金截止时间之间 并且是挂牌方式
                if (
                  now >= beginFocusTime &&
                  now <= endEarnestTime &&
                  transType == "listing_mode"
                ) {
                  that.proessTime = true;
                  that.NewTime = 250;
                  //点亮图标
                  that.con1 = true;
                } else if (
                  now >= beginApplyTime &&
                  now <= endEarnestTime &&
                  transType == "auction_mode"
                ) {
                  // 拍卖方式
                  that.proessTime = true;
                  that.NewTime = 250;
                  //点亮图标
                  that.con1 = true;
                }
                //当前时间在挂牌截止时间到限时竞价开始时间之间 并且是挂牌方式
                if (
                  now >= endFocusTime &&
                  now <= beginLimitTime &&
                  transType == "listing_mode"
                ) {
                  that.proessTime = true;
                  that.NewTime = 425;
                  //点亮图标
                  that.con1 = true;
                  that.con2 = true;
                } else if (
                  now >= endEarnestTime &&
                  now <= beginLimitTime &&
                  transType == "auction_mode"
                ) {
                  // 拍卖方式
                  that.proessTime = true;
                  that.NewTime = 425;
                  //点亮图标
                  that.con1 = true;
                  that.con2 = true;
                }
                //当前时间在限时竞价时间之后
                if (now > beginLimitTime) {
                  //影藏小点点
                  that.proessTime = false;
                  //点亮图标
                  that.con1 = true;
                  that.con2 = true;
                  that.con3 = true;
                }
              }, 1000);
            }

            // 标的的地块详情 dataJson.transGoodsEntities
            if (
              dataJson.transGoodsEntities &&
              dataJson.transGoodsEntities.length > 0
            ) {
              //接收数据参数
              let transGoodsEntities = dataJson.transGoodsEntities;

              this.detailData = transGoodsEntities;
              this.detailLand = this.detailData[0];
              if (
                transGoodsEntities[0].coordinate &&
                transGoodsEntities[0].coordinate != null
              ) {
                this.$refs.childItem.getAddressList(
                  transGoodsEntities[0].coordinate
                ); //调用地图组件查询方法
                this.MapLoading = false;
              } else {
                this.MapLoading = true;
                if(transGoodsEntities[0].coordinate){
                this.$refs.childItem.getAddressList(
                  transGoodsEntities[0].coordinate
                ); //调用地图组件查询方法
                }
              }

              //附件图片组信息
              that.$axios.get(
                "/epf-document/document/getOneGroupFilsById?",
                { id: transGoodsEntities[0].img },
                files => {
                  if (files.fileList) {
                    for (let item = 0; item < files.fileList.length; item++) {
                      // @name: 图片不显示问题
                      // @description: 修改图片不显示问题
                      // @author: gaojie
                      // @chageTime:2020-2-20
                       let extName = files.fileList[item].name
                        .toString()
                        .split(".")
                        .slice(-1)[0];
                      if (
                        extName == "png" ||
                        extName == "PNG" ||
                        extName == "jpg" ||
                        extName == "JPG" ||
                        extName == "gif" ||
                        extName == "GIF"
                      ) {
                        this.imgUrl.push({
                          index: this.imgUrl.length + 1,
                          url: this.baseUrl + files.fileList[item].id,
                          extName: extName
                        });
                      } else if (extName == "mp4") {
                        this.mp4Url.push({
                          index: this.mp4Url.length + 1,
                          url: this.baseUrl + files.fileList[item].id,
                          extName: extName
                        });
                      }
                    }

                    this.currentImg = this.imgUrl[0].url;
                    console.log("======this.currentImg=====",this.currentImg)
                    this.imgScroll = Math.ceil(
                      (this.imgUrl.length + this.mp4Url.length) / 2
                    );
                  }
                }
              );
              if (this.detailData.length > 0) {
                this.detailLand = this.detailData[0];

                // （doc服务接口）地块附件
                this.$axios.get(
                  "/epf-document/document/getOneGroupFilsById",
                  { id: this.detailLand.img },
                  files => {
                    this.filesData = files.fileList;
                  }
                );

                this.belong = this.$route.query.id;
                this.areaCode = this.detailLand.cantonArea;
                let _this = this;
                //获取地块的信息
                let transGoodsJson = this.detailLand;
                //赋值地区字符
                let areaCode = "";
                //根据条件拼接
                if (transGoodsJson.cantonArea) {
                  areaCode = areaCode + transGoodsJson.cantonArea + ",";
                }
                if (transGoodsJson.cantonCity) {
                  areaCode = areaCode + transGoodsJson.cantonCity + ",";
                }
                if (transGoodsJson.cantonProvince) {
                  areaCode = areaCode + transGoodsJson.cantonProvince + ",";
                }
                _this.areaCode = areaCode;

                that.$axios.get(
                  `/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${this.belong}&areaCode=${this.areaCode}`,
                  {},
                  res => {
                    console.log(resData)
                    let resData = JSON.parse(res.ztreeJson);
                    for (let i = 0; i < resData.length; i++) {
                      if (resData[i].code.indexOf("TARGET") != -1) {
                        //附件清单
                        this.tableData = resData[i].childData;
                        console.log(this.tableData.length)
                      }
                    }
                  }
                );
              }
            }
            //  标的的公告详情 dataJson.notice
            if (dataJson.notice) {
              //接收数据
              let notice = dataJson.notice;

              this.detailNotice = notice.noticeVo;
              this.noticeContent = notice.noticeVo.content;
              this.noticeLands = notice.goodsVo;
            }

            //  标的的公示信息  dataJson.publicity
            if (dataJson.publicity) {
              this.detailResults = dataJson.publicity;
            }

            // 标的的流拍原因  dataJson.reason
            if (dataJson.reason) {
              this.Racketreason = dataJson.reason;
            }
            //获取数据解析结束

            // 当前登录用户是否已经申请竞买过
            this.isApply = dataJson.isApply;
          }
        }
      }
    );

    // （交易引擎服务）查询标的的竞价记录列表
    this.$axios.get(
      this.$API.EPF_TRADEENGINE.LOG.TRADE_PRICELIST+'?targetId='+this.$route.query.id,
      {},
      res => {
        if (res.code != 0) {
          this.loading = false;
          this.$message.error(res.msg);
          return;
        }
        if (res.code == 0) {
          this.landInfomatchData = res.pager.results;
          this.landInfomatchDataPage = res.pager;
          this.loading = false;
        }
      }
    );

    this.landStatekey = this.$route.query.selectedTraState;

    // window.scrollTo(0, 0);
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let demailId = this.$route.query.id;
    // let demailId = this.$route.query.demand;
    function getChangeDate(date) {
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }
    this.isLogin()
  },
  methods: {
    //得到服务器时间的axios
    getServerDate: function() {
      let _this = this;
      this.$axios.get(
        "/epf-tradeengine/enginenode/getServiceTime",
        {},
        res => {
          if (res.code != 0) {
            return;
          }
          let locTime = new Date().getTime();
          let serviceTime =  new Date(res.time).getTime();
          //设置两个时间点相差值
          let differ = locTime-serviceTime;
          if(differ > 1000 || differ+1000<0){
            _this.differ = Math.round(differ/1000)*1000-900;
          }else{
            _this.differ = 0;
          }
        }
      );
    },
    //获取当前时间
    getNowTime(){
      let now =  new Date().getTime();
      now = now - this.differ;
      this.now = new Date(now);
      return this.now;
    },
    // 地块编号点击事件
    landInfoKeySelect(num) {
      this.landInfoKey = num;
      this.detailLand = this.detailData[num];
    },
    bidApplicate() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let userId = localStorage.getItem("userId");
      let isFlag = false;
      // 判断地块是不是自己的，自己不能竞买自己的地块
      for (let i = 0; i < this.detailData.length; i++) {
        if (this.detailData[i].insertUser == userId) {
          isFlag = true;
          break;
        }
      }
      if (isFlag) {
        this.$message.error("您不能申请自己委托的地块！");
        return;
      }
      // 判断是否已经购买过该标的
      if (this.isApply) {
        //新增判断是否开通竞价资格
        this.$axios.get(
          "/epf-landweb/admin/getLicenseByTargetId?targetId=" +
          this.$route.query.id,
          {},
          res => {
            if (res.code === 0) {
              if (res.license.status !== "license_status-008" ) {
                //未开通竞价资格
                this.$message.error(
                  "您已申请竞买该标的，请到个人中心-我的订单查看申请进度"
                );
                return;
              } else {
                //已开通竞价资格
                this.$message.error(
                  "您已开通竞买资格，可以直接进行报价"
                );
                return;
              }
            }
          }
        );
      }else {
        let now = this.getNowTime(); // 当前时间
        let applyTime = new Date(this.detailTarget.transTarget.beginApplyTime); //竞买申请开始时间
        let endApplyTime = new Date(this.detailTarget.transTarget.endApplyTime); //竞买申请截止时间
        if (now.getTime() < applyTime.getTime()) {
          this.$message.error("还未到申请竞买开始时间，不能申请竞买！");
          return;
        } else if (now.getTime() > endApplyTime.getTime()) {
          this.$message.error("超出申请竞买截止时间，不能申请竞买！");
          return;
        }
        // 动态获取申请步骤-----业务模型中获取---------------start------------------auther:zhusb-----------//
        this.$router.push({
          path: "/applyBiddingBook",
          query: { id: this.$route.query.id, type: "3" }
        });

        // 动态获取申请步骤-----业务模型中获取---------------end------------------auther:zhusb-----------//
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    subscribeDialogClick() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      this.subscribeDialog = true;
    },

    nocollect() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      //收藏
      this.$axios.post(
        "/epf-landweb/admin/addTransCollect",
        qs.stringify({
          targetId: this.$route.query.id
        }),
        res => {
          this.detailTarget.transTarget.isCollect = 1;
          this.$message.success("收藏成功");
        }
      );
    },
    collect() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      //取消收藏
      this.$axios.post(
        "/epf-landweb/admin/deleteTransCollect",
        qs.stringify({
          targetId: this.$route.query.id
        }),
        res => {
          this.detailTarget.transTarget.isCollect = 0;
          this.$message.success("取消收藏");
        }
      );
    },

    centerPrice() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let beginFocusTime = new Date(
        this.detailTarget.transTarget.beginFocusTime
      );
      let now = this.getNowTime();
      if (now.getTime() < beginFocusTime.getTime()) {
        this.$message.error("还未到挂牌开始时间，不能出价！");
        return;
      } else {
        this.$axios.get(
          "/epf-landweb/admin/getLicenseByTargetId?targetId=" +
            this.$route.query.id,
          {},
          res => {
            if (res.code === 0) {
              if (res.license.status !== "license_status-008" ) {
                this.$message.error(
                  "您未开通竞价资格，请申请竞买完成后进行报价！"
                );
                return;
              } else {
                this.$router.push({
                  path: "/centerPrice",
                  query: { userId: res.userId, targetId: this.$route.query.id }
                });
              }
            }
          }
        );
      }
    },
    selectSpan(item) {
      this.spanKey = item;
      var el = document.getElementsByClassName(`selectSpanlist${item}`)[0];
      console.log("=====item======",el)
      this.$nextTick(function() {
        window.scrollTo({ behavior: "smooth", top: el?el.offsetTop - 100:0 });
      });
      if (item == 3) {
        if (!this.isLogin()) {
          this.$message({
            message: "您还未登录，请先登录再查看",
            type: "warning"
          });
          return;
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
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
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
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    isLogin() {
      if (!sessionStorage.getItem("login")) {
        // this.$message({ message: "您还未登录，请先登录", type: "warning"});
        // this.collectionData = [];
        this.loginKey = false
        return false;
      }
      this.loginKey = true
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
    // 成交确认
    notice() {
      if (!this.isLogin()) {
         this.$message({
            message: "您还未登录，请先登录再查看",
            type: "warning"
          });
        return;
      }
      this.$router.push({
        path: "/notice",
        query: { targetId: this.detailTarget.transTarget.id }
      });
    },
    toFundTrusteeship() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: "/fundTrusteeship",
        query: { targetId: this.detailTarget.transTarget.id }
      });
    },
    noticdetail() {
      this.$router.push({
        path: "/TradePublicDetails",
        query: { noticeId: this.noticeIds.mainId }
      });
    },
    chagenoticdetail(id) {
      this.$router.push({
        path: "/TradePublicDetails",
        query: { noticeId: id }
      });
    },

    // 下载竞买申请书
    downApplyBook() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/download?targetId=" +
        this.detailTarget.transTarget.id +
        "&userId=" +
        localStorage.getItem("userId");
      window.open(url);
    },
    // 下载资格确认书
    downConfigBook() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadConfig?targetId=" +
        this.detailTarget.transTarget.id +
        "&userId=" +
        localStorage.getItem("userId");
      window.open(url);
    },
    // 下载竞得人选入通知书
    winnerIntoBook() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadWinnerIntoBook?targetId=" +
        this.detailTarget.transTarget.id +
        "&userId=" +
        localStorage.getItem("userId");
      window.open(url);
    },
    // 下载剩余价款缴费通知
    dealFeeBook() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadDealFeeBook?targetId=" +
        this.detailTarget.transTarget.id +
        "&userId=" +
        localStorage.getItem("userId");
      window.open(url);
    },
    // 下载交易服务缴费通知
    serviceFeeBook() {
      if (!this.isLogin()) {
        this.$message({
          message: "您还未登录，请先登录！",
          type: "warning"
        });
        return;
      }
      let url =
        baseURL1.baseURL1 +
        "/epf-landweb/pdf/downloadServiceFeeBook?targetId=" +
        this.detailTarget.transTarget.id +
        "&userId=" +
        localStorage.getItem("userId");
      window.open(url);
    }
  },
  beforeDestroy: function() {
    if (this.timer2) {
      window.clearInterval(this.timer);
    }
    if(this.serverD){
      window.clearInterval(this.serverD)
    }
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
      @include size(1200px, 395px);
      margin: 0 auto;
      clear: both;
      box-sizing: border-box;
      padding: 24px 25px 0;
      display: flex;
      justify-content: space-between;
      .landshow_huandeng {
        @include size(432px, 352px);
        float: left;
        overflow: hidden;
        position: relative;
          .landshow_huandeng_state {
            position: absolute;
            top:0;
            right:0;
            z-index: 99;
            line-height: 28px;
            width:95px;
            text-align: center;
            color: #fff;
            background: url("../../../../assets/image/icon_landstate.png") no-repeat center center;
            font-size: 14px;
          }
        .bigImg {
          @include size(432px, 293px);
          .pic-box {
            @include size(432px, 293px);
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
          margin-top: 10px;
          @include size(100%, 48px);
          #imageMenu {
            @include size(100%, 48px);
            overflow: hidden;
            box-sizing: border-box;
            margin-top: 15px;
            clear: both;
            .onlickImg {
              @include size(20px, 48px);
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
              @include size(432px, 48px);
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: flex-start;
              float: left;
              .list-img {
                @include size(475px, 48px);
                position: relative; //最外层的宽度，父级定位
                overflow: hidden;
                .list-img-wrap {
                  position: absolute; //子级定位，dom操作偏移
                  left: 0;
                  top: 0;
                  .single-img {
                    @include size(70px, 48px);
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
                      height: 48px;
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
        @include size(700px, 295px);
        box-sizing: border-box;
        margin-left: 35px;
        float: left;
        position:relative;
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
        .start_end_price{
          line-height: 72px;
          color: #999;
          font-size: 14px;
          background: url('../../../../assets/image/DemandLandDetailsBg.png') no-repeat;
          background-size:100%;
          box-sizing: border-box;
          padding-left: 13px;
        }
        .landshow_pice {
          @include size(100%, 90px);
          line-height: 35px;
          color: #999;
          font-size: 13px;
          box-sizing: border-box;
          padding-left: 13px;
          margin-bottom: 15px;
          border-bottom:1px #e6e6e6 dashed;
          border-left:1px #e6e6e6 dashed;
          border-right:1px #e6e6e6 dashed;
          span {
            font-weight: bold;
            color: rgb(255,104,37);
            font-size: 20px;
            font-weight: 500;
            margin-right: 45px;
          }
          p {
            line-height: 40px;
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
          border: 1px solid var(--Colors);
          background: #fff;
          color: var(--Colors);
          margin-top: 40px;
          display: inline-block;
          img {
            margin-top: 10px;
            margin-right: 5px;
          }
        }
        .input_buy {
          background: var(--Colors);
          color: #fff;
        }
      }
    }
    .landshow_middle{
      background: #fff;
        .landshow_state_Proess {
            padding:0 25px;
        .landshow_proess {
          width: 100%;
          li {
            float: left;
            @include size(289px, 155px);
            box-sizing: border-box;
            position: relative;
            &:nth-last-child(1) {
              width:283px;
            }
            p {
              font-size: 12px;
              line-height: 18px;
              color: #999999;
              margin-left:100px;
            }
            .landshow_stateTime_one{
              margin-top:30px;
              font-size:14px;
              color:#333;
              margin-left:80px;
              margin-bottom:3px;
            }
            .landshow_stateTime_one_top{
              position:absolute;
              top:-15px;

            }
            .landshow_stateTime_top{
              position:absolute;
              top:42px;
              left:-8px;
            }
            .landshow_stateTime_two{
              margin-left:89px;
            }
            .line{
                display: inline-block;
                height: 8px;
                width:289px;
                background: #4572d5;
                margin-top:88px;
              }
            .line_two{
                display: inline-block;
                height: 8px;
                width:289px;
                background: #dcecff;
                margin-top:88px;
              }
            .landshow_stateTime {
              color: #999999;
              font-size:14px;
            }
            .landshow_icon {
              @include size(46px, 46px);
              background: #e2efff;
              border-radius: 50px;
              position: absolute;
              top: 70px;
              left: 120px;
            }
            .time{
              @include size(31px, 19px);
              position: absolute;
              top: 57px;
              left: 278px;
            }
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
          @include size(100%, auto);
          margin-top: 24px;
          background: #fff;
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
            }
            .spanActive {
              box-sizing: border-box;
              border-bottom: 2px solidvar(--Colors);
              color: var(--Colors);
              font-weight: bold;
            }
            .listtop {
              display: inline;
            }
          }
          .landshow_main_listselect {
            margin-top: 15px;
            padding-left: 23px;
            span {
              padding: 7px 20px;
              font-size: 16px;
              color: #666666;
              border-radius: 4px;
              border: solid 1px #e0dfdf;
              cursor: pointer;
              margin-right: 16px;
            }
            .spanActiveland {
              background-color: #fff7f1;
              border: solid 1px var(--Colors);
            }
          }
          .landshow_main_listtop_con {
            box-sizing: border-box;
            padding: 0 24px;
            .landshow_text {
              @include size(100%, auto);
              color: #bebebf;
              font-size: 14px;
              line-height: 30px;
              .landshowtext_header {
                text-align: center;
                color: #333333;
                font-size: 20px;
                font-weight: bold;
                line-height: 50px;
              }
              .landshowtext_subheader {
                text-align: center;
                color: #333333;
                font-size: 18px;
                line-height: 50px;
              }
            }
            .landshow_text_dow {
              line-height: 50px;
              color: #666666;
              font-size: 16px;
              span {
                color: #4572d5;
                cursor: pointer;
                margin-left: 10px;
              }
            }
            .landshow_main_cont {
              .applyBidde_text {
                p {
                  font-size: 14px;
                  line-height: 24px;
                  color: #999999;
                  margin: 10px;
                  span {
                    color: #666666;
                  }
                }
              }
            }
            .landshow_lefttop {
              @include size(100%, 45px);
              box-sizing: border-box;
              margin: 20px auto;
              background: url("../../../../assets/image/icon-bg1.png") no-repeat
                center bottom;
              font-size: 18px;
              color: #333333;
              img {
                margin-top: 4px;
                margin-right: 10px;
              }
            }
            .landshow_lefttop_nobg{
              background-image:none;

            }
            .landshow_bot {
              @include size(100%, auto);
              .download {
                div {
                  display: inline;
                  span {
                    border-radius: 3px;
                    border: solid 1px #e0dfdf;
                    padding: 7px 16px;
                    margin-right: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #4572d5;
                  }
                }
              }
              .bidprocess {
                margin: 0 auto;
                margin-left: 50px;
                padding-bottom: 35px;
              }
            }
            .landshow_table {
              border-top: 1px solid #f2f2f2;
              border-left: 1px solid #f2f2f2;
              clear: both;
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
                width: 120px;
                background: #f2f5f7;
                color: #999999;
                text-align: right;
              }
              .td2 {
                width: 460px;
                background: #fff;
                text-align: left;
              }
            }
            .landshow_tableTitle {
              line-height: 62px;
              border: 1px solid #f2f2f2;
              border-bottom: 0px solid #f2f2f2;
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              color: #666666;
            }
            .landshow_table1 {
              border: 1px solid #f2f2f2;
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
              td {
                border-right: 1px solid #f2f2f2;
                border-bottom: 1px solid #f2f2f2;
                text-align: center;
                color: #555555;
                line-height: 50px;
                font-size: 14px;
                border-bottom: 1px solid #eee;
              }
            }
            .landshow_table2 {
              border: 1px solid #f2f2f2;
              tr {
                height: 50px;
              }
              tr:nth-child(1) {
                background-color: #f2f5f7;
                font-weight: bold;
              }
              .trActive {
                td {
                  color: var(--Colors);
                  font-weight: bold;
                }
              }
              td {
                border-right: 1px solid #f2f2f2;
                border-bottom: 1px solid #f2f2f2;
                text-align: center;
                color: #555555;
                line-height: 50px;
                font-size: 14px;
                border-bottom: 1px solid #eee;
              }
            }
            .landshow_explain {
              line-height: 30px;
              margin-top: 30px;
              color: #666666;
              &_text {
                width:93%;
                color: #999999;
                display: inline-block;
                vertical-align: top;
              }
            }
            .landshow_leftpic {
              display: flex;
              flex-wrap: wrap;
              div {
                @include size(566px, 383px);
                margin-bottom: 14px;
                margin-right: 14px;
                img {
                  width: 100%;
                  height: 100%;
                }
                video {
                  width: 100%;
                  height: 100%;
                }
                &:nth-child(2n) {
                  margin-right: 0;
                }
              }
            }
            .landshow_leftmap {
              @include size(1150px, 560px);
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
          .tradePublicDetail_cont {
            .tradePublicTable {
              width: 1155px;
              border: 1px solid rgb(243, 243, 243);
              ul {
                @include size(100%, 100%);
                li {
                  line-height: 48px;
                  box-sizing: border-box;
                  padding: 0 50px;
                  width: 339px;
                  border-bottom: 1px solid rgb(243, 243, 243);
                  border-left: 1px solid rgb(243, 243, 243);
                  float: left;
                  text-align: left;
                  &:nth-child(1) {
                    @include size(100%, 70px);
                    line-height: 70px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                  }
                  &:nth-child(2n) {
                    // width:340px;
                    text-align: right;
                    width: 238px;
                  }
                  .title {
                    line-height: 49px;
                  }
                  p {
                    text-align: left;
                  }
                }
                .explain {
                  @include size(1157px, 100%);
                  div {
                    float: left;
                    &:nth-child(1) {
                      width: 187px;
                      box-sizing: border-box;
                      padding-top: 50px;
                      padding-right: 50px;
                    }
                    &:nth-child(2) {
                      border-left: 1px solid rgb(243, 243, 243);
                      width: 815px;
                      box-sizing: border-box;
                      padding: 20px 50px;
                    }
                  }
                }
              }
            }
          }
          .tradePublic_main_cont {
            table {
              border: 1px solid #f3f3f3;
              tr {
                @include size(100%, 60px);
                border-bottom: 1px solid #f3f3f3;
                &:nth-child(1) {
                  background: #f2f5f7;
                  height: 50px;
                  td {
                    font-weight: bold;
                  }
                }
                td {
                  text-align: center;
                  color: #333333;
                  font-size: 14px;
                  span {
                    margin-right: 10px;
                    cursor: pointer;
                  }
                }
              }
            }
            p {
              margin: 18px 0 18px 0px;
              color: #999999;
            }
            .enclosure {
              p {
                color: #517cd2;
                cursor: pointer;
                margin: 0;
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
  .clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
  .applyPop_bj {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }
  .applyPop {
    position: fixed;
    top: 150px;
    left: calc(50% - 320px);
  }
}

.applyBidde_oper {
  @include size(275px, 36px);
  margin: 0 auto;
  div {
    @include size(70px, 36px);
    background-color: var(--Colors);
    border-radius: 2px;
    text-align: center;
    line-height: 36px;
    display: inline-block;
    margin-right: 25px;
    color: #fff;
    cursor: pointer;
    &:nth-child(2) {
      border: solid 1px var(--Colors);
      background: #fff;
      color: var(--Colors);
    }
    &:nth-last-child(1) {
      margin-right: 0px;
      border: solid 1px #e0dfdf;
      background: #fff;
      color: #666666;
    }
  }
}
.isFixed {
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 2019;
  display: block !important;
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
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.filter_wrap {
  box-sizing: border-box;
  padding: 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.titles {
  padding: 15px;
  font-size: 16px;
  overflow: auto;
  background-color: #f8f8f8;
}
.titles span {
  width: 5px;
  height: 20px;
  float: left;
  background-color: var(--Colors);
}
.titles b {
  margin-left: 10px;
}
.content_right {
  width: 45%;
  float: left;
}
.content_left {
  width: 45%;
  float: right;
}
.content_btns {
  width: 10%;
  padding-top: 3px;
  float: right;
  text-align: right;
}
.contents {
  margin-top: 25px;
  overflow: auto;
}
.content_bottom {
  float: left;
  width: 90%;
}
.text_domain {
  width: 100%;
  overflow: auto;
}
.text_domain span {
  float: right;
  margin: 180px 30px 0 0;
}

.peopleInfoBox {
  padding: 50px 40px;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}
.peopleBorder {
  width: 100%;
  padding: 10px 10px;
  border: 1px solid rgb(206, 206, 206);
}
.companyInfoBorder {
  width: 100%;
  padding: 10px 10px;
  border: 1px solid rgb(206, 206, 206);
  border-top: none;
}
.holdersTop {
  margin: 15px 0px;
  height: 20px;
}
.holdersTop .leftDot {
  display: block;
  width: 5px;
  height: 22px;
  border-radius: 5px;
  background: #fea200;
  float: left;
}
.holdersTop .leftTitle {
  font-size: 16px;
  padding-left: 15px;
}
.bidder_information {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
}
.bidder_information li {
  color: var(--lightColor);
  cursor: pointer;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.tradeServiceTable {
  border-color: rgb(255, 255, 255);
}
.tradeServiceTable tr td {
  padding: 12px 8px;
  border-color: rgb(228, 228, 228);
}
.tradeServiceTable tr td:nth-child(2) {
  padding: 12px 8px;
  border-color: rgb(228, 228, 228);
}
.includedTable {
  margin-top: 20px;
}
.includedTable tr td {
  padding: 14px 12px;
  border: 1px solid rgb(224, 224, 224);
}
.headerBg {
  background: #f7f7f7;
  font-weight: 800;
  text-align: right;
  padding-right: 20px !important;
}
.titleColor {
  color: #9b9b9b;
}
.middleBox {
  width: 85%;
  margin: 30px auto;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
.borderImg {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
}
.peopleInfo .el-dialog .el-dialog__body {
  padding: 0 !important;
  position: relative;
  top: -1px;
}
.companyInfo .el-dialog .el-dialog__body {
  padding: 0 !important;
  position: relative;
  top: -1px;
}
.includedBox .el-dialog .el-dialog__header {
  display: none;
}
.includedBox .el-dialog {
  border-radius: 10px;
  border: 3px solid #cdd3dc;
}
.qualifications_content b {
  color: #ffa100;
}
.account_entry {
  border-color: #dfdfdf;
}
.bids_for_books p {
  line-height: 24px;
}
.bids_for_books span,
.bids_for_books b {
  color: #fea100;
}
.title_h {
  text-align: center;
  font-size: 18px;
}
.surface {
  margin-top: 70px;
  padding: 5px 45px;
}
.btns_box {
  width: 300px;
  margin: 0 auto;
  margin-top: 45px;
}
.surface span {
  color: #205ee4;
}
.surface ul {
  display: flex;
  justify-content: space-around;
  margin-top: 45px;
}
.surface p {
  line-height: 24px;
  letter-spacing: 2px;
}
</style>
