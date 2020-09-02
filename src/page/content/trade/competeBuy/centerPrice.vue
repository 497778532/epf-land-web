<template>
  <div class="limitPrice_warp">
    <div
      class="win1200"
      v-if="dataTab"
      v-loading="loading"
      style="padding-bottom:30px;"
    >
      <epf-lePage :location="location"></epf-lePage>
      <div class="limitPrice_box">
        <div class="limitPrice_top">
          <ul id="moveUl">
              <li
                v-for="(item, index) in dataTab"
                :key="index"
                @click="dataTabSelect(item, index)"
                :class="dataTabkey === index ? 'dataTabActive' : ''"
              >
                <p>{{ item.target_name }}</p>
              </li>
          </ul>
          <div class="switch" v-if="dataTab.length >= 5">
              <div class="switch_left" @click="leftMove">&lt;</div>
              <div class="switch_right" @click="rightMove">&gt;</div>
          </div>
        </div>
        <!-- <div class="limitPrice_middle">
          <div>{{target.name}}</div>
          <span>
            <span class="limitPrice_middle_name">{{ targetName }}</span>
            <span class="limitPrice_middle_time"
              >服务器时间：{{ this.showdate }}</span
            >
          </span>
        </div> -->
     
          <!-- <div class="limitPrice_left_tab">
             <ul>
              <li
                v-for="(item, index) in dataTab"
                :key="index"
                @click="dataTabSelect(item, index)"
                :class="dataTabkey === index ? 'dataTabActive' : ''"
              >
                <p>{{ item.target_name }}</p>
                <p style="text-align:left;" v-if="item.state == 5">已成交</p>
                <p style="text-align:left;" v-else-if="item.state == 4">
                  已流拍
                </p>
                <p style="text-align:left;" v-else>交易中</p>
              </li>
            </ul> -->
          <!-- <div class="limitPrice_left_display">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="仅显示为申请通过"></el-checkbox>
              </el-checkbox-group>
            </div>-->
          <!-- </div>  -->
          <div class="limitPrice_bottom" style="background:#fff;padding-bottom:20px;box-shadow:5px 5px 20px rgba(43,112,194,0.8);">
            <div class="limitPrice_left_time">
              <!-- <div class="limitPrice_left_time_title">
                <span>
                  <img
                    src="../../../../assets/image/icon-15.png"
                    alt
                    style="margin-top:16px;margin-right:10px;"
                  />
                  {{ target.name }}
                </span>
              </div> -->
              <!-- <div
                style="text-align:center"
                class="remaintime"
                v-if="showOrHidden.transactionEnd"
              >
                <div
                  style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                >
                  {{ Division(target.initValue) }} 万元
                </div>
                <div style="font-size: 14px;color: #999999;">起始价</div>
                当前交易已结束,竞得人:{{ transLicenseNo }}
              </div>
              <div
                style="text-align:center"
                class="remaintime"
                v-if="showOrHidden.transactionFailDiv"
              >
                <div
                  style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                >
                  {{ Division(target.step) }} 万元
                </div>
                <div style="font-size: 14px;color: #999999;">竞价阶梯</div>
                当前交易已结束,流拍,无人竞得
              </div> -->
              <div class="limitPrice_middle">
                <div v-if="target.name == '结束节点' && target.state== '4'">已流拍</div>
                <div v-else-if="target.name == '结束节点' && target.state== '5'">已成交</div>
                <div v-else>{{target.name}}</div>
                <span>
                  <el-tooltip class="item" effect="light" :content='targetName' placement="bottom">
                    <el-button>{{ targetName }}</el-button>
                  </el-tooltip>
                  <span class="limitPrice_middle_time"
                    >服务器时间：{{ this.showdate }}</span
                  >
                </span>
              </div>
              <div style="box-shadow:0 0 30px #c5d4f4;">
                <div class="limitPrice_left">
                    <div class="remaintime">
                      <div class="remaintime_right">
                        <div class="remaintime_right_top">
                          <div class="timers"  v-if="target.state=='5'">当前交易已结束</div>
                          <div class="timers"  v-if="target.state=='4'">当前交易已结束，流拍，无人竞得</div>
                          <div class="timers">
                            剩余时间：
                            <span style="margin-left:15px;">{{ time.days }}</span
                            >天 <span>{{ time.hours }}</span
                            >小时 <span>{{ time.minutes }}</span
                            >分 <span>{{ time.seconds }}</span
                            >秒
                          </div>
                          <div class="notes" style="color:#999999;" v-if="target.name=='集中报价期' || target.name=='限时竞价期'">
                            (仅供参考请勿秒抢）
                          </div>
                          <img src="../../../../assets/image/price_right.png" alt="">
                        </div>
                      </div>
                </div>
                <div
                  style="overflow: hidden;padding: 10px 0;border-bottom: 1px solid #eaeaea; text-align: center;margin-top:10px;"
                >
                  <div
                    style="float: left;width: 219px;border-right: 2px solid #EAEAEA;"
                  >
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{ target.initValue }} 万元
                    </div>
                    <div style="font-size: 14px;color: #999999;">起始价</div>
                  </div>
                  <div
                    style="float: left;width: 239px;border-right: 2px solid #EAEAEA;padding-left: 15px;"
                  >
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{ target.step }} 万元
                    </div>
                    <div style="font-size: 14px;color: #999999;">竞价阶梯</div>
                  </div>
                  <div style="float: left;width: 293px;padding-left: 15px;"  v-if="target.name == '结束节点'">
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{  target.endTransTime }}
                    </div>
                    <div style="font-size: 14px;color: #999999;" v-if="target.state == '4'">
                      流拍时间
                    </div>
                    <div style="font-size: 14px;color: #999999;" v-if="target.state == '5'">
                      成交时间
                    </div>
                  </div>
                  <div style="float: left;width: 293px;padding-left: 15px;" v-else>
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{ target.beginTime }}
                    </div>
                    <div style="font-size: 14px;color: #999999;" v-if="target.state != '5' && 'listing_mode' == target.transType && target.name=='集中报价期'">
                      挂牌开始时间
                    </div>
                    <div style="font-size: 14px;color: #999999;" v-if="target.state != '5' && 'listing_mode' == target.transType && target.name=='限时竞价期'">
                      限时竞价开始时间
                    </div>
                    <div style="font-size: 14px;color: #999999;" v-if="target.state != '5' && 'auction_mode' == target.transType">
                      拍卖开始时间
                    </div>
                  </div>
                </div>
                <div
                  style="overflow: hidden;padding: 10px 0;text-align: center;margin-bottom:10px"
                >
                  <div
                    style="float: left;width: 219px;border-right: 2px solid #EAEAEA;"
                  >
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{ target.lblNumber }} 
                    </div>
                    <div style="font-size: 14px;color: #999999;">竞买人数</div>
                  </div>
                  <div
                    style="float: left;width: 239px;border-right: 2px solid #EAEAEA;padding-left: 15px;"
                  >
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{ target.area }} 平方米
                    </div>
                    <div style="font-size: 14px;color: #999999;">面积</div>
                  </div>
                  <div
                    style="float: left;width: 293px;padding-left: 15px;"
                    v-if="showOrHidden.transactionIng && bidding"
                  >
                    <div
                      style="font-size: 16px;color: #333333;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                    >
                      {{ target.endTime }}
                    </div>
                    <div style="font-size: 14px;color: #999999;" v-if="target.state != '5' && 'listing_mode' == target.transType && target.name=='集中报价期'">
                      挂牌截止时间
                    </div>
                  </div>
                </div>
                <!-- <div class="limitPrice_left_price">
                  <ul>
                    <li>
                      <span>起始价：</span>
                      {{ target.initValue }} 万元
                    </li>
                    <li>
                      <span>竞价阶梯：</span>
                      {{ target.step }} 万元
                    </li>
                    <li>
                      <span>面积：</span>
                      {{ target.area }}平方米
                    </li>
                    <li>
                      <span>竞买人数：</span>
                      {{ target.lblNumber }}
                    </li>
                    <li>
                      <span>{{ target.name }}开始时间：</span>
                      {{ target.beginTime }}
                    </li>
                    <li v-if="showOrHidden.transactionIng && bidding">
                      <span>{{ target.name }}结束时间：</span>
                      {{ target.endTime }}
                    </li>
                    <li v-else="showOrHidden.transactionEnd">
                      <span>成交时间：</span>
                      {{target.endTransTime}}
                    </li>
                  </ul>
                </div> -->
                <div class="boxContain" v-if="target.name=='集中报价期' || target.name=='限时竞价期'">
                  <div class="limitPrice_topprice">
                    <span>当前最高报价(万元)：</span><i>{{ target.price }}</i>
                  </div>
                  <div class="limitPrice_subprice">
                    <ul>
                      <li>
                        <span style="font-size: 16px;font-weight: bold;">竞价出价(万元)：</span>
                        <div class="myInput">{{ bidprice }}</div>
                        <div class="subprice" @click="zhiprice()">
                          <img src="../../../../assets/image/zhidi_icon.png" alt />
                        </div>
                        <div class="subprice" @click="addprice()">
                          <img src="../../../../assets/image/add_icon.png" alt />
                        </div>
                        <div class="subprice" @click="delprice()">
                          <img src="../../../../assets/image/del_icon.png" alt />
                        </div>
                      </li>
                      <li>
                        <span style="color:#666666">大写：</span>
                        <i style="color:#333333">{{ NumberToChinese(bidprice) }}</i>
                      </li>
                      <li>
                        <span style="color:#666666">单价：</span>
                        <i style="color:#333333"
                          >{{ unitPrice.toFixed(4) }}万元/㎡</i
                        >
                      </li>
                    </ul>
                    <div
                      v-if="target.isoffer == 0 && target.state != '2'"
                      class="submit"
                      @click="surePrice()"
                    >
                      确认出价
                    </div>
                    <div v-else class="default1">确认出价</div>
                  </div>
                </div>
                 <div class="boxContain" style="position:relative" v-if="target.state=='4'">
                  <img src="../../../../assets/image/deal_fail.png" alt="" style="position:absolute;right:41px;top:75px">
                  <div class="limitPrice_topprice">
                    <span  style="color:#999999;">当前最高报价(万元)：</span><i  style="color:#999999;">--</i>
                  </div>
                  <div class="limitPrice_subprice">
                    <ul>
                      <li>
                        <span  style="font-size: 16px;font-weight: bold; color:#999">竞价出价(万元)：</span>
                        <div  class="myInput" style="color:#999999;background:#f6f6f6;">--</div>
                        <div class="subprice">
                          <img src="../../../../assets/image/zhidi_icon01.png" alt />
                        </div>
                        <div class="subprice">
                          <img src="../../../../assets/image/add_icon01.png" alt />
                        </div>
                        <div class="subprice">
                          <img src="../../../../assets/image/del_icon01.png" alt />
                        </div>
                      </li>
                      <li>
                        <span style="color:#999">大写：</span>
                        <i style="color:#999">{{ NumberToChinese(bidprice) }}</i>
                      </li>
                      <li>
                        <span style="color:#999">单价：</span>
                        <i style="color:#999"
                          >{{ unitPrice.toFixed(2) }}万元/㎡</i
                        >
                      </li>
                    </ul>
                    <div v-if="target.state=='4'" class="default1" style="background:#cac8c5">确认出价</div>
                  </div>
                </div>
                <div class="boxContain boxContainSuccess" v-if="target.state=='5'">
                  <div class="successMain" style="margin-top:76px;">
                    <span>竞得人：</span><p>{{transLicenseNo}}</p>
                  </div>
                  <div class="successMain">
                    <span>成交时间：</span><p>{{target.endTransTime}}</p>
                  </div>
                  <div class="successMain">
                    <span>成交价格：</span><p>{{ transPrice }}</p>
                  </div>
                    <img src="../../../../assets/image/deal_success.png" alt="">
                  </div>
                </div>
          
                <!-- <div class="limitPrice_topprice" v-if="showOrHidden.transactionEnd">
                  成交价:{{ transPrice }}
                </div> -->
              </div>
            </div>
            <div class="limitPrice_right">
              <div class="biddingState_contFr">
                <div class="biddingState_contFr_title">
                  <span>
                    <img
                      src="../../../../assets/image/icon_15.png"
                      alt
                      style="margin-top:13px;margin-right:10px;"
                    />竞价记录
                  </span>
                  <img style="float:right;margin-top:5px;margin-right:16px;" src="../../../../assets/image/price_right.png" alt="">
                  <div class="switch">
                    <div class="switch_left" @click="pre()">&lt;</div>
                    <div class="switch_right" @click="next()">&gt;</div>
                  </div>
                </div>
                <div class="biddingState_contFr_table">
                  <ul class="scroll-wrap">
                    <div class="scroll-content">
                      <!-- <li v-for="(item, index) in priceInfonData" :key="index">
                        <div class="div1">
                          {{ (page - 1) * pageSize + index + 1 }}
                        </div>
                        <div v-if="userId == item.confirmUserId">
                          {{ item.recorderName }}
                        </div>
                        <div v-else>{{ item.licenseNo }}</div>
                        <div>{{ item.price }}</div>
                        <div>
                          {{
                            new Date(item.offerDate).pattern('yyyy-MM-dd hh:mm:ss')
                          }}
                        </div>
                      </li> -->
                      <!-- 最高报价 -->
                      <div :class="page == '1' ? 'high_price':'activeNext'" v-if="priceInfonData[0]">
                        <div class="high_price_top" v-if="page == '1'">
                          <div class="high_price_tag" :class="target.state=='4'?'activeGray':'activeColor'">最高报价</div>
                        </div>
                        <div class="high_money">
                          <i>{{priceInfonData[0].price}}</i>
                          万
                        </div>
                        <div class="userName">
                          <span v-if="userId ==priceInfonData[0].confirmUserId">{{priceInfonData[0].recorderName}}</span>
                          <span  v-else>{{ priceInfonData[0].licenseNo }}</span>
                          <span>{{ new Date(priceInfonData[0].offerDate).pattern('yyyy-MM-dd hh:mm:ss')}}</span>
                        </div>
                      </div>
                      <!-- 我的最高报价 -->
                      <li v-for="(item, index) in priceInfonData.slice(1)" :key="index">
                         <div class="myHighPrice"   v-if="myheightRriceIndex-1 == index">
                          <div class="partOne">
                            <span v-if="myheightRriceIndex-1 == index">我的最高报价</span>
                            <span></span>
                            <span :class="target.state == '1'?'':'partOneActive'">{{item.price }}万</span>
                          </div>
                        </div>
                        <div v-else class="usePrice" style="text-align: right">
                          <i class="activeI">{{
                            item.price
                          }} 万</i>
                        </div>
                        <div class="uesr">
                          <span
                            class="uesr_name"
                            v-if="userId == item.confirmUserId"
                            >{{ item.recorderName }}</span
                          >
                          <span class="uesr_name" v-else>{{ item.licenseNo }}</span>
                          <span class="uesr_time">{{
                            new Date(item.offerDate).pattern('yyyy-MM-dd hh:mm:ss')
                          }}</span>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div style="clear:both;"></div>
          </div>
      </div>
      <!-- <div @click="included=true">等待进入限时竞价</div> -->
    </div>
    <div
      v-if="dataTab.length == 0 || myALLShow == false"
      class="contain"
      id="L00"
      style="display:none;overflow-y: hidden;"
    >
      <div class="i-container">
        <div class="nonebidBox" style="padding-left: 360px;">
          <h1 class="tc mt30 mb20">对不起，暂时您无可竞价标的！</h1>
          <p class="lh22 fb">可能存在的原因:</p>
          <p class="lh22">1.您未参与申请竞买任何标的</p>
          <p class="lh22">2.您申请竞买的标的可能未缴纳、缴足保证金 。</p>
        </div>
      </div>
    </div>
    <!-- 流拍弹框 -->
    <el-dialog
      class="companyInfo includedBox"
      width="800px"
      :visible.sync="showOrHidden.transactionFail"
      top="10px"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="companyInfo_box">
        <div class="close" @click="showOrHidden.transactionFail = false"></div>
        <!-- 流拍 -->
        <div class="companyInfo_con companyInfo_box1">
          <p align="center">通知</p>
          <p align="center">标的 {{ targetName }} 交易已结束，未成交(流拍)</p>
          <p align="center">流拍原因请在个人中心-我的订单中查看</p>
        </div>
      </div>
    </el-dialog>
    <!-- 等待进入限时竞价的弹框 -->
    <el-dialog
      class="companyInfo includedBox"
      width="800px"
      :visible.sync="showOrHidden.awaitEnter"
      top="10px"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="companyInfo_box">
        <div class="close" @click="showOrHidden.awaitEnter = false"></div>

        <!-- 等待进入限时竞价 -->
        <div class="companyInfo_con companyInfo_box1">
          <p align="center">通知</p>
          <p align="center">标的 {{ targetName }} 集中报价期已结束，将于</p>
          <p align="center">
            <span>{{ target.beginTime }}</span
            >开始限时竞价！
          </p>
        </div>
      </div>
    </el-dialog>
    <!-- 竞得人弹框 -->
    <el-dialog
      class="companyInfo includedBox"
      width="800px"
      :visible.sync="showOrHidden.contested"
      top="10px"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="companyInfo_box">
        <div class="close" @click="showOrHidden.contested = false"></div>
        <!-- 竞得成功 竞得人-->
        <div class="companyInfo_con companyInfo_box2">
          <p align="center">
            恭喜你竞得
            <span>{{ targetName }} </span>标的，
          </p>
          <p align="center">
            土地{{circulation}}成交价为
            <span>{{ transPrice }},请于3个工作日内打印《成交确认通知书》</span>
          </p>
          <p align="center">
            <span>并根据相关要求办理后续手续</span>
          </p>
        </div>
      </div>
    </el-dialog>
    <!-- 未竞得人弹框 -->
    <el-dialog
      class="companyInfo includedBox"
      width="800px"
      :visible.sync="showOrHidden.unContested"
      top="10px"
      :append-to-body="true"
      :show-close="false"
    >
      <div class="companyInfo_box">
        <div class="close" @click="showOrHidden.unContested = false"></div>
        <!-- 竞得成功 未竞得人-->
        <div class="companyInfo_con companyInfo_box1">
          <p align="center">告知</p>
          <p align="center">
            {{ targetName }}标的交易结束，土地{{circulation}}成交价为{{ transPrice }}
          </p>
          <p align="center">感谢您的参与和支持</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
// import "../../../../../static/socket.io";

Date.prototype.pattern = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 24 == 0 ? 24 : this.getHours() % 24, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[this.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
export default {
  data() {
    return {
      bidding: false,
      canIaxios: false,
      showOrHidden: {
        serverDateChuo: '',
        awaitEnter: false, //等待进入限时竞价的弹框
        unContested: false, //未竞得人弹框
        contested: false, //竞得人弹框

        transactionFail: false, //流拍的弹框
        transactionFailDiv: false, //流拍需要控制的div

        transactionIng: false, //交易进行中
        transactionEnd: false //交易结束，显示竞得人编号的那个的div
        // unauthorized: false //没有参与的权限
      },
      btn: '',
      heightPrice: '',
      myheightRriceIndex:"",
      myALLShow: false,
      transPrice: '', //成交价
      licenseId: 1123,
      userId: 'f346ef97-bb07-42d7-ba0c-ecfdb715fcca',
      licenseNo: 123,
      loading: false,
      chat1Socket: null,
      transLicenseNo: '',
      state: '1',
      targetName: '',
      netty_hostName: '',
      netty_port: '',
      step: 0,
      totalPage: '',
      page: 1,
      priceInfonData:[
        // {"confirmDate":1586507150000,"confirmUserId":"f8f4b69a-d3e8-4379-bf97-95a575ed14d1","recorderName":"18135122199","createDate":1586507150000,"createUserId":"f8f4b69a-d3e8-4379-bf97-95a575ed14d1","id":"2832a935-5afd-40bd-b2ae-e2e7b7e596d3","isTrust":0,"kind":0,"licenseNo":"2137827923","offerDate":1586507150000,"price":3800,"status":2,"targetId":"6148608c-adc5-423d-a643-74ba959854d7","type":1},
        // {"confirmDate":1586507146000,"confirmUserId":"f346ef97-bb07-42d7-ba0c-ecfdb715fcca","recorderName":"15985186352","createDate":1586507146000,"createUserId":"f346ef97-bb07-42d7-ba0c-ecfdb715fcca","id":"b8c15f13-7f35-4e2b-a1d4-e85e1d51b696","isTrust":0,"kind":0,"licenseNo":"1104195753","offerDate":1586507146000,"price":3600,"status":1,"targetId":"6148608c-adc5-423d-a643-74ba959854d7","type":1},
        // {"confirmDate":1586506969000,"confirmUserId":"f8f4b69a-d3e8-4379-bf97-95a575ed14d1","recorderName":"18135122199","createDate":1586506969000,"createUserId":"f8f4b69a-d3e8-4379-bf97-95a575ed14d1","id":"4a39ecc5-97ff-4cde-98a8-1d57d38404fd","isTrust":0,"kind":0,"licenseNo":"2137827923","offerDate":1586506969000,"price":3400,"status":1,"targetId":"6148608c-adc5-423d-a643-74ba959854d7","type":1},
        // {"confirmDate":1586506955000,"confirmUserId":"f346ef97-bb07-42d7-ba0c-ecfdb715fcca","recorderName":"15985186352","createDate":1586506955000,"createUserId":"f346ef97-bb07-42d7-ba0c-ecfdb715fcca","id":"df0f264a-15bb-4a59-b7f6-421fd5e00260","isTrust":0,"kind":0,"licenseNo":"1104195753","offerDate":1586506955000,"price":3200,"status":1,"targetId":"6148608c-adc5-423d-a643-74ba959854d7","type":1},
        // {"confirmDate":1586506945000,"confirmUserId":"f8f4b69a-d3e8-4379-bf97-95a575ed14d1","recorderName":"18135122199","createDate":1586506945000,"createUserId":"f8f4b69a-d3e8-4379-bf97-95a575ed14d1","id":"42089636-8083-4015-a7fc-cee6ebe4f55c","isTrust":0,"kind":0,"licenseNo":"2137827923","offerDate":1586506945000,"price":3000,"status":1,"targetId":"6148608c-adc5-423d-a643-74ba959854d7","type":1}
        ],
      percentage: 1,
      readTimeStart: '',
      nowTime: '',
      timerTime: '',
      showdate: '',
      serverLoadTimer: 1,
      serverDate: '',
      time: {},
      activeTargetId: '',
      target: {},
      maxOffer: {},
      timer: null,
      timer2: null,
      mumPrice: '',
      included: true,
      dataTabkey: 0,
      dataTab: [],
      news: {},
      initValue: '',
      location: [
        { path: '/', name: '首页' },
        { path: '/TradingHall', name: '交易大厅' },
        { path: null, name: '集中报价' }
      ],
      checkList: '仅显示为申请通过',
      bidprice: 0,
      unit: new Array(
        '仟',
        '佰',
        '拾',
        '',
        '仟',
        '佰',
        '拾',
        '',
        '仟',
        '佰',
        '拾',
        '',
        '角',
        '分'
      ),
      unitPrice: 0,
      minutes: 5,
      seconds: 0,
      targetId: '',
      server_now: '',
      differ: 0, //服务器时间和本地时间的差异
      serverD: {},
      serverD2: {},
      circulation: "" // 流转方式
    }
  },
  created() {
    this.userId = this.$route.query.userId
    this.targetId = this.$route.query.targetId
    console.log(this.userId)
    this.getTablist()
    const _this = this
    //页面加载时先执行一次
    _this.getServerDate()
    this.serverD = setInterval(function() {
      console.log('同步时间开始')
      _this.getServerDate()
    }, 1000 * 10 * 3) //30秒同步一次

    this.serverD2 = setInterval(function() {
      let currrent_now = new Date().getTime()
      let server_now = currrent_now - _this.differ
      _this.server_now = new Date(server_now)
      _this.showdate = _this.formatDate(_this.server_now)
    }, 1000) //时间1秒钟变一次
  },
  computed: {
    comTime() {
      if (this.minutes === 0 && this.seconds === 0) {
        this.successfulPerson = true
      }
      if (this.bidprice > this.mumPrice) {
        this.mumPrice = this.bidprice
      }
    }
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.serverD) {
      clearInterval(this.serverD)
    }
  },
  methods: {
    // 标的tab
    getStyle(element, attr) {
      if(element.currentStyle) {
        return element.currentStyle[attr];
      } else {
        return getComputedStyle(element, false)[attr];
      }
     },
     // 标的tab右移
    rightMove(){
      let moveLeft = document.getElementById('moveUl')
      let ulLeft = parseInt(this.getStyle(moveLeft,'left'))
      let len = this.dataTab.length;
      if((-1*ulLeft) - (len-5)*267 <= 0 ){
         moveLeft.style.left =  (ulLeft - 267) +"px"
      }
    },
    // 标的tab左移
    leftMove(){
      let moveLeft = document.getElementById('moveUl')
      let ulLeft = parseInt(this.getStyle(moveLeft,'left'))
      let len = this.dataTab.length;
       if(ulLeft < 0 ){
         moveLeft.style.left =  (ulLeft + 267) +"px"
      }
    },
    // 初始化netty
    initnetty: function(targetId) {
      const url =
        'http://' +
        this.netty_hostName +
        ':' +
        this.netty_port +
        '/channel' +
        targetId
      console.log('------socket------', url)
      this.chat1Socket = io.connect(url)
      console.log(this.chat1Socket)
      // console.log(this.chat1Socket);
      this.chat1Socket.on('connect', this.connectHandler())
      this.chat1Socket.on('message', this.messageHandler())
    },
    //连接调用
    connectHandler() {
      return function() {}
    },
    //netty监听netty事件
    messageHandler() {
      var that = this
      return function(data) {
        if (data.nettyState == 'refresh') {
          that.initTarget()
          return
        } else if (data.nettyState == 'close') {
          that.$router.go(0)
        } else if (data.nettyState == 'capped_price') {
          alert('封顶价')
        } else if (data.nettyState == 'refresh_price') {
          console.log(1111111)
          that.getTarget(that.activeTargetId)
        } else if (data.nettyState == 'refresh_delay') {
          that.getTarget(that.activeTargetId)
        }
      }
    },
    //左侧tab兰数据的axios
    getTablist: async function() {
      const res = await axios({
        method: 'post',
        url: '/api/epf-tradeengine/tradeengine/getTargetListInfo',
        params: {
          userId: this.userId
        }
      })
      if (res.status == 200) {
        console.log(res)
        this.dataTab = res.data.targetList
        // this.license_no
        for (let i = 0; i < this.dataTab.length; i++) {
          if (this.dataTab[i].targetid === this.targetId) {
            this.activeTargetId = this.dataTab[i].targetid
            this.activeLicenseNo = this.dataTab[i].license_no
            this.dataTabkey = i
            break
          }
        }
        // this.activeTargetId = this.dataTab[0].targetid;
        // this.activeLicenseNo = this.dataTab[0].license_no;
        this.initTarget()
        this.getOfferPriceInfon(this.activeTargetId)
      }
    },
    //标的流程的axios
    initTarget: async function() {
      const params = {}
      this.circulation = "";
      if (this.activeTargetId) {
        params.targetId = this.activeTargetId
      } else {
        params.targetId = this.targetId
      }
      console.log(params)
      const res = await axios.post(
        '/api/epf-tradeengine/tradeengine/findTargetById',
        qs.stringify(params)
      )
      if (res.status == 200) {
        if (res.data.target) {
          this.targetName = res.data.target.targetName
          this.state = res.data.state

          this.getTarget(this.activeTargetId)
          if (this.state == 5 || this.state == 4) {
            this.endTaskNode() //结束展示ajax
          } else {
            this.netty_hostName = res.data.netty_hostName
            this.netty_port = res.data.netty_port
            this.initnetty(this.activeTargetId)
          }
          
          this.$axios.get('/epf-landweb/landweb/transtarget/getTransTargetById', {targetId: this.targetId}, res1 => {
            if (res1.code == 0) {
              this.circulation = res1.map.transTargetObj.circulationName;
            }
          });
        } else {
          this.$message.error('标的不存在，请检查数据')
        }
      }
    },
    //标的的axios，先得到流程，然后判断流程状态是多少，然后再发送axios
    getTarget: async function(targetId) {
      this.canIaxios = false
      const res = await axios({
        method: 'post',
        url: '/api/epf-tradeengine/tradeengine/findTaskNodeInfo',
        params: {
          targetId: targetId
        }
      })
      if (res.status == 200) {
        this.bidding = true
        this.target = res.data.taskNode
        this.maxOffer = res.data.maxOffer
        this.step = Number(this.target.step)
        if (this.target.qtype) {
          this.bidding = false
        }
        if (this.target.price) {
          this.heightPrice = Number(this.target.price) + Number(this.step)
          this.bidprice = Number(this.target.price) + Number(this.step)
          this.unitPrice = Number(this.heightPrice) / Number(this.target.area)
        } else {
          this.heightPrice = Number(this.target.initValue)
          this.bidprice = Number(this.target.initValue)
          this.unitPrice =
            Number(this.target.initValue) / Number(this.target.area)
        }
        this.bidprice = this.bidprice.toFixed(4);
        this.heightPrice = this.heightPrice.toFixed(4);

        if (
          this.target.state == '' ||
          this.target.state == null ||
          this.target.state == '2'
        ) {
          //删除当前倒计时任务
          this.percentage = 0
          this.btn = false
          this.timerTime = null
          this.leftTimer(0)
        } else if (this.target.state == '1') {
          this.btn = true
          var start_time = ''

          if (this.target.memo == 'node_type-003;') {
            if (this.target.priceTime) {
              start_time = this.target.priceTime.replace(/-/g, '/')
            } else {
              start_time = this.target.beginTime.replace(/-/g, '/')
            }
          } else {
            start_time = this.target.beginTime.replace(/-/g, '/')
          }
          if (typeof start_time == 'undefined') {
            start_time = this.target.beginTime.replace(/-/g, '/')
          }
          this.readTimeStart = new Date(start_time).getTime()
          this.timerTime = this.target.endTime
        } else if (this.target.state == '4' || this.target.state == '5') {
          this.btn = false
          this.timerTime = null
          this.leftTimer(0)
        }
        this.countdown(this.timerTime)

        this.getOfferPriceInfon()
        this.license()
      }
    },
    //竞买结束展示的axios
    endTaskNode: async function() {
      console.log('竞买结束axios开始')
      const params = {}
      params.targetId = this.activeTargetId
      const res = await axios.post(
        '/api/epf-tradeengine/tradeengine/findEndTaskNode',
        qs.stringify(params)
      )
      if (res.status == 200) {
        console.log('======状态值==========' + res.data.targetStatus)

        if (res.data.targetStatus == 'end_trans') {
          if (this.activeLicenseNo == res.data.transLicenseNo) {
            this.showOrHidden.awaitEnter = false //等待进入限时竞价的弹框
            this.showOrHidden.unContested = false //未竞得人弹框
            this.showOrHidden.contested = true //竞得人弹框
            this.showOrHidden.transactionFail = false //流拍的弹框
          } else {
            this.showOrHidden.awaitEnter = false //等待进入限时竞价的弹框
            this.showOrHidden.unContested = true //未竞得人弹框
            this.showOrHidden.contested = false //竞得人弹框
            this.showOrHidden.transactionFail = false //流拍的弹框
          }
          this.showOrHidden.transactionFailDiv = false //流派中间部分的div
          this.showOrHidden.transactionIng = false //交易进行中的所有div隐藏
          this.showOrHidden.transactionEnd = true //交易结束后的所有div展示
        } else if (res.data.targetStatus == 'abort') {
          this.showOrHidden.awaitEnter = false //等待进入限时竞价的弹框
          this.showOrHidden.unContested = false //未竞得人弹框
          this.showOrHidden.contested = false //竞得人弹框
          this.showOrHidden.transactionFail = true //流拍的弹框
          this.showOrHidden.transactionFailDiv = true //流派中间部分的div
          this.showOrHidden.transactionIng = false //交易进行中的所有div隐藏
          this.showOrHidden.transactionEnd = true //交易结束后的所有div展示
        }
        this.transLicenseNo = res.data.transLicenseNo
        if (typeof res.data.transPrice != 'undefined') {
          this.transPrice = res.data.transPrice + res.data.unit
        }
      }
      console.log('竞买结束axios结束')
    },
    //竞买权限的axios
    license: async function() {
      const params = {}
      params.targetId = this.activeTargetId
      params.userId = this.userId
      const res = await axios.post(
        '/api/epf-tradeengine/tradeengine/findLicenseInfo',
        qs.stringify(params)
      )
      if (res.status == 200) {
        const wait_confirm = res.data.wait_confirm
        const state = res.data.state
        if (wait_confirm == 1) {
          this.showOrHidden.transactionFailDiv = false //流派中间部分的div
          this.showOrHidden.transactionIng = true //交易进行中的所有div隐藏
          this.showOrHidden.transactionEnd = false //交易结束后的所有div展示
        } else if (wait_confirm == 0 && state == '2') {
          //进入出价权限确认
          // handleConfirm();
        } else if (wait_confirm != 1) {
          this.myALLShow = true
        } else {
          this.myALLShow = true
        }
      }
    },
    //确认报价的axios
    offerPrice: async function() {
      //判断是否能出价了
      if (this.target.isoffer == 0 && this.target.state != '2') {
        const params = {
          targetId: this.activeTargetId,
          userId: this.userId,
          unit: '万元',
          licenseNo: this.activeLicenseNo,
          price: this.bidprice
        }
        const res = await axios.post(
          '/api/epf-tradeengine/tradeengine/offerPrice',
          qs.stringify(params)
        )
        console.log
        if (res.status == 200) {
          this.$message({
            type: 'success',
            message: res.data.result.message
          })
          // this.getOfferPriceInfon(this.activeTargetId);
        }
      } else {
        this.$message({
          type: 'error',
          message: '拍卖时间已结束，本次出价失败，谢谢参与！'
        })
      }
    },
    //得到右侧翻页列表的axios
    getOfferPriceInfon: async function(targetId) {
      const res = await axios({
        method: 'post',
        url: '/api/epf-tradeengine/tradeengine/initOfferPriceInfon',
        data: qs.stringify({
          targetId: this.activeTargetId,
          page: this.page,
          rows: '6'
        })
      })
      if (res.status == 200) {
        var arr = []
        res.data.pager.results.map((item,index)=>{
         if(this.userId == item.confirmUserId){
            arr.push(index)
          }
           this.myheightRriceIndex = arr[0]
        })
        this.priceInfonData = res.data.pager.results
        this.page = res.data.pager.pageNo
        this.pageSize = res.data.pager.pageSize
        this.totalPage = res.data.pager.totalPage
      }
    },
    //设置中间剩余时间的定时器
    countdown(v) {
      console.log(v)
      var that = this
      if (v) {
        v = v.replace(/-/g, '/')
      }
      //删除当前定时器
      if (this.timer2) {
        window.clearInterval(this.timer2)
        this.timer2 = null
      }
      var date1 = this.serverDate,
        data2 = new Date(v)
      this.timer2 = setInterval(function() {
        that.leftTimer(data2)
      }, 1000)
      console.log(this.timer2)
    },
    //得到服务器时间的axios
    getServerDate: function() {
      let _this = this
      this.$axios.get('/epf-tradeengine/enginenode/getServiceTime', {}, res => {
        if (res.code != 0) {
          return
        }
        let locTime = new Date().getTime()
        let serviceTime = new Date(res.time).getTime()
        //设置两个时间点相差值
        let differ = locTime - serviceTime
        if (differ > 1000 || differ + 1000 < 0) {
          _this.differ = Math.round(differ / 1000) * 1000 - 900
        } else {
          _this.differ = 0
        }
        console.log(
          '服务器时间=' +
            this.formatDate(new Date(res.time)) +
            '----本地时间=' +
            this.formatDate(new Date()) +
            '-----服务器时间与本地时间偏移量=' +
            _this.differ
        )
      })
    },
    //右边上一页的点击事件
    pre() {
      if (this.page > 1) {
        this.page--
        this.getOfferPriceInfon(this.activeTargetId)
      }
    },
    //右边下一页的点击事件
    next() {
      if (this.page < this.totalPage) {
        this.page++
        this.getOfferPriceInfon(this.activeTargetId)
      }
    },
    //把1变成01
    checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    //中间剩余多少天多少分多少秒
    leftTimer: function(enddate) {
      console.log('传入结束时间', enddate)
      let current_now = new Date().getTime()
      this.server_now = current_now - this.differ

      var leftTime = new Date(enddate) - this.server_now //计算剩余的毫秒数
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
      var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
      var minutes = parseInt((leftTime / 1000 / 60) % 60, 10) //计算剩余的分钟
      var seconds = parseInt((leftTime / 1000) % 60, 10) //计算剩余的秒数
      if (
        days < 0 ||
        hours < 0 ||
        minutes < 0 ||
        seconds < 0 ||
        (days == 0 && hours == 0 && minutes == 0 && seconds == 0)
      ) {
        console.log('卡卡西')
        this.time.days = '00'
        this.time.hours = '00'
        this.time.minutes = '00'
        this.time.seconds = '00'
        this.time.hours = '00'
        window.clearInterval(this.timer2)
        this.timer2 = null
        return
      }
      this.time.days = this.checkTime(days)
      this.time.hours = this.checkTime(hours)
      this.time.minutes = this.checkTime(minutes)
      this.time.seconds = this.checkTime(seconds)
      console.log(
        '结束时间' +
          enddate.getTime() +
          ',现在时间' +
          this.server_now +
          '下阶段开始时间' +
          this.readTimeStart
      )
      this.percentage =
        ((enddate.getTime() - this.server_now) /
          (enddate.getTime() - this.readTimeStart)) *
        100
    },
    formatDate: function(date, fmt) {
      if (typeof date == 'string' || typeof date == 'number') {
        return date
      }

      if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'

      if (!date || date == null) return null
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
      }
      return fmt
    },
    //tab栏切换的逻辑
    dataTabSelect: function(item, index) {
      console.log("5678678")
      this.canIaxios = false
      this.activeTargetId = item.targetid
      this.activeLicenseNo = item.license_no
      this.transPrice = ''
      this.dataTabkey = index
      this.initTarget()
      this.getOfferPriceInfon(this.activeTargetId)
    },
    toDx(n) {
      //阿拉伯数字转换函数
      switch (n) {
        case '0':
          return '零'
        case '1':
          return '壹'
        case '2':
          return '贰'
        case '3':
          return '叁'
        case '4':
          return '肆'
        case '5':
          return '伍'
        case '6':
          return '陆'
        case '7':
          return '柒'
        case '8':
          return '捌'
        case '9':
          return '玖'
      }
    },
    // 转换为大写
    NumberToChinese(amount) {
      amount = amount*10000;
      // 汉字的数字
      const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      // 基本单位
      const cnIntRadice = ["", "拾", "佰", "仟"];
      // 对应整数部分扩展单位
      const cnIntUnits = ["", "万", "亿", "兆"];
      // 对应小数部分单位
      const cnDecUnits = ["角", "分"];
      // 整数金额时后面跟的字符
      const cnInteger = "整";
      // 整型完以后的单位
      const cnIntLast = "元";
      // 最大处理的数字
      const maxNum = 9999999999999999.99;
      // 金额整数部分
      let integerNum;
      // 金额小数部分
      let decimalNum;
      // 输出的中文金额字符串
      let chineseStr = "";
      // 分离金额后用的数组，预定义
      let parts;
      if (amount === "") {
          return "";
      }
      amount = parseFloat(amount);
      if (amount >= maxNum) {
          // 超出最大处理数字
          return "";
      }
      if (amount === 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
      }
      // 转换为字符串
      amount = amount.toString();
      if (amount.indexOf(".") === -1) {
          integerNum = amount;

          decimalNum = "";
      } else {
          parts = amount.split(".");
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
      }
      // 获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
          let zeroCount = 0;
          const IntLen = integerNum.length;
          for (let i = 0; i < IntLen; i++) {
              const n = integerNum.substr(i, 1);
              const p = IntLen - i - 1;
              const q = p / 4;
              const m = p % 4;
              if (n === "0") {
                  zeroCount++;
              } else {
                  if (zeroCount > 0) {
                      chineseStr += cnNums[0];
                  }
                  // 归零
                  zeroCount = 0;
                  //alert(cnNums[parseInt(n)])
                  chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
              }
              if (m === 0 && zeroCount < 4) {
                  chineseStr += cnIntUnits[q];
              }
          }
          chineseStr += cnIntLast;
      }
      // 小数部分
      if (decimalNum !== "") {
          const decLen = decimalNum.length;
          for (let i = 0; i < decLen; i++) {
              const n = decimalNum.substr(i, 1);
              if (n !== "0") {
                  chineseStr += cnNums[Number(n)] + cnDecUnits[i];
              }
          }
      }
      if (chineseStr === "") {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum === "") {
          chineseStr += cnInteger;
      }
      return chineseStr;
    },
    // 报价增加按钮
    addprice() {
      this.bidprice = Number(this.bidprice) + Number(this.step)
      this.bidprice = this.bidprice.toFixed(4)
    },
    // 报价减少按钮
    delprice() {
      this.bidprice = Number(this.bidprice) - Number(this.step)
      this.bidprice = this.bidprice.toFixed(4)
    },
    // 确认报价提示按钮
    surePrice() {
      if (
        Number(this.bidprice) <= Number(this.target.price) ||
        Number(this.bidprice) < Number(this.target.initValue)
      ) {
        this.$message.error('不能小于当前最高报价')
      } else if (this.maxOffer && this.maxOffer.confirmUserId == this.userId) {
        this.$confirm('当前您已经是最高报价，是否确认出价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.offerPrice()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消出价'
            })
          })
      } else {
        this.$confirm(
          '最近报价为' + this.bidprice + ', 请确认是否出价?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.offerPrice()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消出价'
            })
          })
      }
    },
    zhiprice() {
      this.bidprice = this.heightPrice
      this.unitPrice = Number(this.heightPrice) / Number(this.target.area)
    }
  },
  mounted() {},

  beforeDestroy: function() {
    if (this.timer2) {
      window.clearInterval(this.timer)
      this.timer = null
    }
    if (this.serverD) {
      window.clearInterval(this.serverD)
      this.timer2 = null
    }
    if (this.serverD2) {
      window.clearInterval(this.serverD2)
      this.timer2 = null
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.companyInfo {
  .companyInfo_box {
    @include size(710px, 400px);
    overflow: hidden;
    position: relative;
    .close {
      @include size(24px, 24px);
      text-align: center;
      box-sizing: border-box;
      position: absolute;
      top: 45px;
      right: 50px;
      cursor: pointer;
      background: url('../../../../assets/image/close.png');
    }
    .companyInfo_con {
      width: 100%;
      height: 100%;
      padding-top: 50px;
    }
    .companyInfo_box1 {
      background: url('../../../../assets/image/centerPrice.png') no-repeat
        center center;
      p {
        color: rgb(117, 95, 82);
        font-size: 18px;
        line-height: 30px;
        &:nth-child(1) {
          color: #fb525e;
          font-size: 30px;
          line-height: 80px;
        }
        &:nth-child(2) {
          font-weight: bold;
        }
      }
    }
    .companyInfo_box2 {
      background: url('../../../../assets/image/limitedPrice.png') no-repeat
        center center;
      p {
        color: #d5594c;
        font-size: 18px;
        line-height: 30px;
        &:nth-child(1) {
          margin-top: 85px;
        }
        span {
          font-weight: 700;
        }
      }
    }
  }
}
.limitPrice_warp {
  @include size(100%, 100%);
  background: url('../../../../assets/image/center_pricebg.png') no-repeat;
  background-size:100% 100%;
  .limitPrice_box {
    @include size(100%, auto);
    .limitPrice_top {
      @include size(100%, 63px);
      background: #fff;
      border-bottom:3px solid #f6f6f6;
      position: relative;
        .switch {
            float: right;
            background: #f5f7fc;
            position:absolute;
            top:12px;
            right:0;
            div {
              @include size(28px, 28px);
              display: inline-block;
              color: #333;
              line-height: 28px;
              text-align: center;
              margin-top: 6px;
              border-radius: 3px;
              border: solid 1px #e0dfdf;
              cursor: pointer;
            }
            .switch_left {
              background-image: linear-gradient(#f6f6f6, #f6f6f6),
                linear-gradient(#ffffff, #ffffff);
              background-blend-mode: normal, normal;
            }
            .switch_right {
              background-color: #ffffff;
              margin-left: 10px;
            }
          }
      ul{
        background:#f5f7fc;
        overflow: hidden;
        white-space:nowrap; 
        position: absolute;
        left:0;
        li{
          width:267px;
          box-sizing: border-box;
          padding:0 21px;
          font-size: 20px;
          font-weight: normal;
          line-height: 63px;
          color: #666666;
          display:inline-block;
          background:#f5f7fc;
          border-right:1px solid #dddddd;
          border-bottom:1px solid #dddddd;
          p{
            width:224px;
            text-align: center;
            white-space:nowrap; 
            overflow:hidden; 
            text-overflow:ellipsis
          
          }
        }
        .dataTabActive{
          background:#fff;
          color: var(--lightColor);
          font-weight: bold;
          border-top:2px solid var(--lightColor);
          border-bottom:none;
        }
      }
    }
    .limitPrice_left {
      @include size(820px, 499px);
      background: #ffffff;
      margin-top:14px;
      box-sizing: border-box;
      box-shadow:0 0 25px #c5d4f4;
      padding: 20px 18px 27px 17px;
      float: left;
      margin-right: 15px;
      margin-left:16px;
      .remaintime {
        @include size(100%, 62px);
        background: #f5f5f5;
        box-sizing: border-box;
        line-height: 62px;
        padding: 0 10px;
        color: #666666;
        .timers {
          display: inline-block;
          span {
            color: var(--priceColor);
            font-size: 20px;
            font-weight: bold;
            padding: 0 5px;
            vertical-align: middle;
          }
        }
        .notes {
          display:inline-block;
          margin-left:10px;
          font-size: 12px;
        }
        img{
          float:right;
          margin-top:10px;
        }
      }

      // &_tab {
      //   @include size(127px, 520px);
      //   border-right: 1px solid #f1f5f8;
      //   position: relative;
      //   float: left;
      //   overflow-y: auto;
      //   ul {
      //     li {
      //       @include size(100%, 80px);
      //       border-bottom: 1px solid #f1f5f8;
      //       box-sizing: border-box;
      //       padding-top: 25px;
      //       cursor: pointer;

      //       p {
      //         text-align: center;
      //         color: #999999;
      //         font-size: 14px;
      //       }
      //     }
      //     .dataTabActive {
      //       p {
      //         color: #666666;
      //       }
      //     }
      //   }
      //   .limitPrice_left_display {
      //     position: absolute;
      //     bottom: 20px;
      //     font-size: 10px;
      //     left: 6px;
      //   }
      // }
      &_time {
        width: 835px;
        float: left;
        box-sizing: border-box;
        padding-top: 0px;
         .limitPrice_middle {
          padding-right: 20px;
          background: #fff;
          height: 66px;
          border-bottom: 1px solid #f1f0f5;
          /deep/ .el-button{
            display: inline-block;
            font-size: 22px;
            font-weight: bold;
            line-height: 38px;
            color: #333;
            margin-left: 10px;
            margin-top:17px;
            vertical-align: top;
            width:400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border:none;
            padding:0;
          }
          /deep/ .el-button:hover{
            background:#fff;
          }
          div {
            width: 102px;
            height: 32px;
            display: inline-block;
            background: url('../../../../assets/image/center_price.png') no-repeat;
            color: #fff;
            line-height: 32px;
            text-align: center;
            font-weight: bold;
            margin-top:17px;
          }
          &_time {
            float: right;
            line-height: 40px;
            margin-top:17px;
          }
        }
        &_title {
          height: 50px;
          line-height: 50px;
          color: #333333;
          font-size: 14px;
          font-weight: bold;
        }
        .limitPrice_left_price {
          margin: 16px 0;
          ul {
            @include size(100%, auto);
            display: flex;
            flex-wrap: wrap;
            li {
              @include size(50%, 100%);
              box-sizing: border-box;
              border-bottom: 1px solid #f1f5f8;
              line-height: 30px;
              color: #666666;
              font-size: 12px;
              span {
                display: inline-block;
                text-align: right;
                color: #999999;
                width: 120px;
              }
              &:nth-child(2n + 1) {
                border-right: 1px solid #f1f5f8;
              }
            }
          }
        }
        .boxContain {
          @include size(782px, 252px);
          background: #fff6f6;
          border: 1px dashed var(--priceColor);
        }
        .boxContainFail{
          @include size(782px, 252px);
          background:#f7f7f7;
          border: 1px dashed var(--priceColor);
          position: relative;
          img{
            position: absolute;
            right:71px;
            top:55px;
          }
        }
        .boxContainSuccess{
          position: relative;
          img{
            position: absolute;
            right:71px;
            top:55px;
          }
        }
        .successMain{
          display: flex;
          justify-content: flex-start;
          margin-bottom:20px;
          margin-left:37px;
          span{
            font-size:16px;
            line-height: 16px;
            color:#333;
            font-weight: bold;
            margin-top:2px;
          }
          p{
            color:var(--priceColor);
            font-weight: bold;
            font-size:20px;
            line-height: 20px;
          }
        }
        .limitPrice_topprice {
          // background-color: #ffca74;
          color: #333;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          line-height: 60px;
          box-sizing: border-box;
          margin-left: 10px;
          span {
            width: 130px;
            text-align: right;
            color: #333;
            vertical-align: top;
          }
          i {
            font-size: 20px;
            font-weight: bold;
            color: var(--priceColor);
          }
        }
        .limitPrice_subprice {
          // @include size(100%, 206px);
          // background-image: linear-gradient(#f5f5f5, #f5f5f5),
          //   linear-gradient(#f1f5f8, #f1f5f8);
          background-blend-mode: normal, normal;
          box-sizing: border-box;
          ul {
            li {
              color: #333333;
              font-size: 14px;
              line-height: 40px;
              span {
                display: inline-block;
                width: 158px;
                text-align: right;
                margin-right: 15px;
              }
              .myInput {
                @include size(384px, 46px);
                background-color: #ffffff;
                border: solid 1px #e5e5e5;
                text-indent: 1rem;
                color: #333333;
                font-size: 14px;
                display: inline-block;
                line-height: 46px;
              }
              .subprice {
                display: inline-block;
                @include size(30px, 30px);
                vertical-align: center;
                background-color: var(--lightColor);
                margin-left: 4px;
                text-align: center;
                line-height: 28px;
                font-size: 20px;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
          .submit {
            width: 128px;
            height: 40px;
            background-color: var(--lightColor);
            border-radius: 2px;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            margin: 5px auto;
            cursor: pointer;
          }
          .default1 {
            width: 386px;
            height: 40px;
            background-color: #aaaaaa;
            border-radius: 2px;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            margin: 5px auto;
          }
        }
      }
      .currentBiddingFrame {
        @include size(800px, 500px);
        margin: 0px auto;
        margin-top: 50px;
        border: 1px solid #ccc;
        .currentBiddingtop {
          @include size(100%, 35%);
          border-bottom: 1px solid #ccc;
          .CBLeft {
            @include size(380px, 100%);
            float: left;
            *display: inline-block;
            .CBLeft_title {
              @include size(44px, 100%);
              float: left;
              text-align: center;
              box-sizing: border-box;
              padding: 10px 10px;
              line-height: 30px;
            }
            .CBLeft_content {
              @include size(calc(100% - 50px), 100%);
              display: inline-block;
              box-sizing: border-box;
              text-align: left;
              &1 {
                @include size(100%, 45px);
                line-height: 45px;
                box-sizing: border-box;
                padding-left: 10px;
                margin-top: 3%;
                background: #f6f6f6;
                border-bottom: 1px solid #d4d4d4;
                &:nth-of-type(1) {
                  border-top: 2px solid #2583af;
                }
                &:nth-of-type(2) {
                  height: 50px;
                  line-height: 30px;
                  border-top: 2px solid #41d011;
                  .jdt {
                    @include size(300px, 10px);
                    border: 1px solid #d4d4d4;
                    margin-top: -1px;
                    background: #fff;
                    .jdt1 {
                      @include size(300px, 10px);
                      background: #4ae117;
                    }
                  }
                }
                &:nth-of-type(3) {
                  border-top: 2px solid #d2383d;
                }
              }
            }
          }
          .CBRight {
            @include size(380px, auto);
            float: right;
            padding: 10px;
            text-align: center;
            line-height: 35px;
            .CBRight_title {
              @include size(100%, 35px);
              background: #ebffe4;
              border-bottom: 1px dashed #c9c9c9;
            }
            .CBRight_content {
              @include size(100%, auto);
              text-align: left;
              li {
                @include size(100%, 35px);
                list-style: none;
                border-bottom: 1px dashed #c9c9c9;
                font-size: 12px;
                div {
                  @include size(48%, 100%);
                  box-sizing: border-box;
                  padding-left: 10px;
                  display: inline-block;
                  span {
                    color: red;
                  }
                }
                .zhongzhi {
                  @include size(100px, 30px);
                  background: #3acc3a;
                  border-radius: 5px;
                  text-align: center;
                  line-height: 30px;
                  color: #fff;
                  font-size: 14px;
                  cursor: pointer;
                  padding: 0;
                  margin-left: 30px;
                }
              }
            }
          }
        }
        .currentBiddingbottom {
          @include size(100%, 35%);
          border-bottom: 1px solid #ccc;
          .currentBiddingbottom_title {
            @include size(100%, 30px);
            line-height: 30px;
            box-sizing: border-box;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            background: #f5f5f5;
            font-size: 14px;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            font-weight: bolder;
            span {
              &:nth-child(2) {
                background: #3acc3a;
                color: #fff;
                padding: 0 20px;
              }
            }
          }
          .currentBiddingbottom_content {
            @include size(100%, calc(100% - 30px));
            text-align: center;
            background: #f4ffee;
            box-sizing: border-box;
            padding: 40px 130px;
            margin: 0 auto;
            span {
              box-sizing: border-box;
              border: 1px solid #d9d9d9;
              @include size(300px, 30px);
              // margin-top:60px;
              float: right;
              box-sizing: border-box;
              // border:1px solid red;
              // background: url('../assets/images/price.png') no-repeat center center;
              background-size: 100% 100%;
              display: flex;
              justify-content: space-around;
              input {
                @include size(200px, 30px);
                float: left;
                box-sizing: border-box;
                border: 1px solid #d9d9d9;
                padding-left: 10px;
                margin-top: -1px;
                margin-left: -3px;
              }
              div {
                @include size(30px, 30px);
                text-align: center;
                line-height: 20px;
                font-size: 30px;
                cursor: pointer;
                &:nth-of-type(1) {
                  // background: url('../assets/images/huifu.png') no-repeat center center;
                  background-size: 70% 70%;
                }
                &:nth-of-type(2) {
                  // background: url('../assets/images/jiahao.png') no-repeat center center;
                  background-size: 70% 70%;
                }
                &:nth-of-type(3) {
                  // background: url('../assets/images/jianhao.png') no-repeat center center;
                  background-size: 70% 70%;
                }
              }
            }
            .chujia {
              @include size(100px, 30px);
              // background: url('../assets/images/chujia.png') no-repeat center center;
              background-size: 100% 100%;
              margin-top: 30px;
              margin-left: 250px;
              cursor: pointer;
            }
          }
        }
        .currentBiddingList_title {
          @include size(100%, 30px);
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          background: #f5f5f5;
          padding: 0 20px;
          line-height: 30px;
          font-weight: bolder;
          font-size: 14px;
          span:nth-child(2) {
            cursor: pointer;
          }
        }
        .currentBiddingList {
          @include size(100%, 119px);
          box-sizing: border-box;
          overflow: hidden;
          overflow-y: scroll;
          li {
            @include size(100%, 28px);
            border: 1px solid #ccc;
            display: flex;
            justify-content: space-around;
            font-size: 12px;
            div {
              width: 25%;
              line-height: 28px;
              text-align: center;
            }
            &:nth-child(1) {
              background: #eaeaea;
            }
          }
        }
        .CurrentProChujia {
          width: 300px;
          height: 200px;
          background: #666;
          position: fixed;
          top: 30%;
          left: 35%;
          text-align: center;
          line-height: 200px;
          color: #fff;
          font-size: 24px;
          button {
            @include size(100px, 30px);
            position: absolute;
            bottom: 20px;
            right: 20px;
            border-radius: 5px;
            background: #2583af;
            border: none;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .limitPrice_right {
      @include size(337px, 525px);
      background: #ffffff;
      float: left;
      padding-top:20px;
      margin-left:14px;
      .biddingState_contFr {
        @include size(100%, 100%);
        float: left;
        position: relative;
        &_title {
          height: 47px;
          line-height: 47px;
          color: #333333;
          font-size: 14px;
          box-sizing: border-box;
          padding-left: 20px;
          border-bottom: solid 1px #e6e6e6;
          border-left:solid 1px #eeeeee;
          border-top:solid 1px #eeeeee;
          border-right:solid 1px #eeeeee;
          font-weight: bold;
          .switch {
            float: right;
            position:absolute;
            bottom:-34px;
            right:10px;
            div {
              @include size(28px, 28px);
              display: inline-block;
              color: #666666;
              line-height: 28px;
              text-align: center;
              margin-top: 6px;
              border-radius: 3px;
              border: solid 1px #e0dfdf;
              cursor: pointer;
            }
            .switch_left {
              background-image: linear-gradient(#f6f6f6, #f6f6f6),
                linear-gradient(#ffffff, #ffffff);
              background-blend-mode: normal, normal;
            }
            .switch_right {
              background-color: #ffffff;
              margin-left: 10px;
            }
          }
        }
        &_table {
          overflow: hidden;
          @include size(100%,513px);
          border-left:1px solid #eeeeee;
          border-right:1px solid #eeeeee;
          border-bottom:1px solid #eeeeee;
          box-sizing: border-box;
          padding:13px 12px 0px;
          margin-bottom:27px;
          margin: 0 auto;
          // .contFr_thead {
          //   @include size(100%, 50px);
          //   border-bottom: 1px solid #f1f5f8;
          //   li {
          //     display: inline-block;
          //     font-size: 12px;
          //     color: #666666;
          //     text-align: center;
          //     line-height: 50px;
          //     font-weight: bold;
          //     padding: 0 20px 0 19px;
          //     &:nth-child(1) {
          //       @include size(50px, 100%);
          //       box-sizing: border-box;
          //       padding-left: 20px;
          //     }
          //     &:nth-child(2) {
          //       @include size(150px, 100%);
          //     }
          //     &:nth-child(3) {
          //       @include size(100px, 100%);
          //     }
          //     &:nth-child(4) {
          //       @include size(150px, 100%);
          //     }
          //   }
          // }
          .scroll-wrap {
            @include size(100%, 451px);
            overflow: hidden;
            .scroll-content {
              position: relative;
              transition: top 0.5s;
              .high_price{
                @include size(309px, 75px);
                border:1px dashed var(--priceColor);
                background:#fff6f6;
                &_top{
                  width:100%;
                  margin-bottom:21px;
                   .high_price_tag{
                      width:67px;
                      height:21px;
                      background-size:67px 21px;
                      color:#fff;
                      font-weight: bold;
                      text-align: center;
                      position: absolute;
                      left:-1px;
                    }
                    .activeGray{
                      background: url('../../../../assets/image/center_price01.png') no-repeat;
                      top:0px;
                    }
                    .activeColor{
                       background: url('../../../../assets/image/center_price02.png') no-repeat;
                       top:-1px;
                    }
                }
                .high_money{
                  text-align: center;
                  color:var(--priceColor);
                  font-weight: bold;
                  font-size: 16px;
                  width:309px;
                }
                .userName{
                  padding:0 11px;
                  display: flex;
                  justify-content: space-between;
                  span{
                    font-size:14px;
                    line-height: 38px;
                    color:#666666;
                  }
                }
              }
              .activeNext{
                border-top:none;
                border-left:none;
                border-right:none;
                border-bottom: 1px solid #e6e6e6;
                height: 60px;
                color: #666666;
                .userName{
                  display: flex;
                  justify-content: space-between;
                  span{
                    font-size:14px;
                    line-height: 38px;
                    color:#666666;
                  }
                }
                .high_money{
                  text-align: right;
                  font-weight: normal;
                  font-size: 14px;
                  width:309px;
                }
              }
              .myHighPrice{
                .partOne{
                  display: flex;
                  justify-content: space-between;
                  color:var(--priceColor);
                  font-size:16px;
                  line-height: 36px;
                  .partOneActive{
                    font-size:14px;
                    color:#666666;
                    font-weight: normal;
                  }
                }
                .partTwo{
                  display: flex;
                  justify-content: space-between;
                  font-size:14px;
                  color:#666666;
                  margin-bottom:10px;
                  .userName{
                    width:136px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
              li {
                @include size(312px, 60px);
                border-bottom: 1px solid #e6e6e6;
                padding-top:14px;
                .uesr{
                  display: flex;
                  justify-content: space-between;
                  color: #666666;
                }
                .usePrice {
                  line-height: 34px;
                  color: #666666;
                  i {
                    font-weight: bold;
                    color: #666666;
                    font-size: 16px;
                    margin-left: 15px;
                  }
                  .activeI {
                    font-weight: normal;
                    font-size: 14px;
                  }
                }
                // div {
                //   font-size: 14px;
                //   color: #666666;
                //   float: left;
                //   &:nth-child(1) {
                //     @include size(50px, 100%);
                //     box-sizing: border-box;
                //     padding-left: 20px;
                //   }
                //   &:nth-child(2) {
                //     @include size(150px, 100%);
                //   }
                //   &:nth-child(3) {
                //     @include size(100px, 100%);
                //   }
                //   &:nth-child(4) {
                //     @include size(150px, 100%);
                //   }
                // }
              }
            }
          }
        }
      }
    }
  }
}
.limitPrice_left_tab::-webkit-scrollbar {
  height: 5px !important;
  width: 10px !important;
}

.limitPrice_left_tab::-webkit-scrollbar-thumb {
  border-radius: 5px;
  border-style: dashed;
  background-color: rgba(157, 165, 183, 0.4);
  border-color: #e2242400;
  border-width: 1.5px;
  background-clip: padding-box;
}

.limitPrice_left_tab::-webkit-scrollbar-thumb:hover {
  background: rgba(157, 165, 183, 0.7);
}
</style>
<style>
.el-dialog {
  background: none;
  padding-left: 35px;
}
.el-checkbox__label {
  font-size: 10px;
}
.el-progress-bar__outer {
  background: #fff;
}
.el-progress.is-exception .el-progress-bar__inner {
  background: #ffa300;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ffa300;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ffa300;
  border-color: #ffa300;
}
</style>
