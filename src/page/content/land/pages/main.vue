<template>
  <div id="landM">
    <div class="landCenter_maintop">
      <div class="landCenter_maintop_bigtab">
        <ul class="landCenter_maintop_bigtab_title">
          <li @click="turnGX" :class="{active:current==0}">
            <input style="display:none;" type="radio" name="tabToggle" value="0" />
            <i class="img_icon1"></i>土地供需数据
          </li>
          <li @click="turnD" :class="{active:current==1}">
            <input style="display:none;" type="radio" name="tabToggle" value="1" />
            <i class="img_icon2"></i>土地交易数据
          </li>
        </ul>
      </div>
    </div>
    <div class="landCenter_maintop_content" v-if="current==0" :style="current==0?'height:684px':''">
      <el-tabs v-model="activeTabs" @tab-click="handleClick">
        <el-tab-pane label="土地供给地域分布" name="supply" lazy>
          <div class="landCenter_maintop_content_title">
            <p class="landCenter_maintop_content_title_icon"></p>
            <p class="landCenter_maintop_content_title_text">土地供给地域分布</p>
            <p class="landCenter_maintop_content_title_search">
              <span
                class="switchHeight_box_search"
                v-if="filterData.time==''||filterData.time=='本月'||filterData.time=='本周'||filterData.time=='本季'||filterData.time=='本年度'"
              >{{start}}～{{end}}：</span>
              <span class="switchHeight_box_search" v-if="filterData.time=='全部'"></span>
              <span class="switchHeight_box_search" v-if="filterData.time=='自定义'">{{inputTime}}：</span>
              <el-select v-model="filterData.time" @change="timeSelect" style="width:150px;">
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </p>
            <el-dialog
              title="请输入自定义日期"
              :visible.sync="customDialogVisible"
              width="20%"
              :modal="false"
              style="font-size:14px;"
             >
              <el-input v-model="inputTime" clearable></el-input>
              <p style="font-size:12px;color:#ff0000;">*请按格式输入，如：2001-02-01～2008-10-11</p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="customDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureTime()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <chinaChart
            :timeStartMessage="start"
            :timeEndMessage="end"
            :currentMessage="current"
            :activeTabsMessage="currentTabs"
            ref="supplyChart"
          ></chinaChart>
        </el-tab-pane>
        <el-tab-pane label="土地需求地域分布" name="demand" lazy>
          <div class="landCenter_maintop_content_title">
            <p class="landCenter_maintop_content_title_icon"></p>
            <p class="landCenter_maintop_content_title_text">土地需求地域分布</p>
            <p class="landCenter_maintop_content_title_search">
              <span
                class="switchHeight_box_search"
                v-if="filterData.time==''||filterData.time=='本月'||filterData.time=='本周'||filterData.time=='本季'||filterData.time=='本年度'"
              >{{start}}～{{end}}：</span>
              <span class="switchHeight_box_search" v-if="filterData.time=='全部'"></span>
              <span class="switchHeight_box_search" v-if="filterData.time=='自定义'">{{inputTime}}：</span>
              <el-select v-model="filterData.time" @change="timeSelect" style="width:150px;">
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </p>
            <el-dialog
              title="请输入自定义日期"
              :visible.sync="customDialogVisible"
              width="20%"
              :modal="false"
              style="font-size:14px;"
            >
              <el-input v-model="inputTime" clearable></el-input>
              <p style="font-size:12px;color:#ff0000;">*请按格式输入，如：2001-02-01～2008-10-11</p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="customDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureTime()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <chinaDemandChart
            :timeStartMessage="start"
            :timeEndMessage="end"
            :currentMessage="current"
            :activeTabsMessage="currentTabs"
            ref="demandChart"
          ></chinaDemandChart>
        </el-tab-pane>

        <el-tab-pane label="土地用途供需对比" name="sandd" lazy>
          <div class="landCenter_maintop_content_title">
            <p class="landCenter_maintop_content_title_icon"></p>
            <p class="landCenter_maintop_content_title_text">土地用途供需对比</p>
            <div class="landCenter_maintop_content_title_search" style="display:flex;">
              <div style="display:flex;align-items:center;">
                <span>所在区域：</span>
                <div style="width:180px;float:left;margin-right:9px;">
                  <el-select
                    v-model="filterData.cantonProvinceName"
                    size="small"
                    placeholder="全国"
                    @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)"
                  >
                    <el-option
                      v-for="(item,index) in dictionary.cantonCity"
                      :ref="item.regionName"
                      :id="item.id"
                      :dictKey="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- <p class="landCenter_maintop_content_title_search" style="margin-left:100px;">
              <span v-if="filterData.time==''||filterData.time=='本年度'">近一年：{{start}}～{{end}}</span>
              <span v-if="filterData.time=='本月'">近一月：{{start}}～{{end}}</span>
              <span v-if="filterData.time=='本周'">近一周：{{start}}～{{end}}</span>
              <span v-if="filterData.time=='本季'">近一季：{{start}}～{{end}}</span>
              <span v-if="filterData.time=='自定义'">自定义时间段：{{start}}～{{end}}</span>
              <span v-if="filterData.time=='全部'">全部时间段</span>
            </p> -->
            <p class="landCenter_maintop_content_title_search">
              <span
                class="switchHeight_box_search"
                v-if="filterData.time==''||filterData.time=='本月'||filterData.time=='本周'||filterData.time=='本季'||filterData.time=='本年度'"
              >{{start}}～{{end}}：</span>
              <span class="switchHeight_box_search" v-if="filterData.time=='全部'"></span>
              <span class="switchHeight_box_search" v-if="filterData.time=='自定义'">{{inputTime}}：</span>
              <el-select v-model="filterData.time" @change="timeSelect" style="width:150px;">
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </p>
            <el-dialog
              title="请输入自定义日期"
              :visible.sync="customDialogVisible"
              width="20%"
              :modal="false"
              style="font-size:14px;"
            >
              <el-input v-model="inputTime" clearable></el-input>
              <p style="font-size:12px;color:#ff0000;">*请按格式输入，如：2001-02-01～2008-10-11</p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="customDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureTime()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div id="useChart" style="width:1140px;height:520px;"></div>
          <div style="padding-left:25px;">【注:此处不含交易方式为抵押的供给数据】</div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="landCenter_maintop_content" v-if="current==1" :style="current==1?'height:629px':''">
      <div class="landCenter_maintop_content_title">
        <p class="landCenter_maintop_content_title_icon"></p>
        <p class="landCenter_maintop_content_title_text">交易热度分布</p>
        <div class="landCenter_maintop_content_title_dealsearch">
          <span style="margin-left:50px;">交易类型：</span>
          <div style="width:150px;">
            <el-select
              size="small"
              v-model="filterDealData.circulationName"
              placeholder="全部"
              @change="circulationDealSelect(dictionary.flow_mode,filterDealData.circulationName,$event)"
            >
              <el-option
                v-for="(item,index) in dictionary.flow_mode"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              ></el-option>
            </el-select>
          </div>
        </div>
        <p class="landCenter_maintop_content_title_search">
          <span
            class="switchHeight_box_search"
            v-if="filterDealData.time==''||filterDealData.time=='本月'||filterDealData.time=='本周'||filterDealData.time=='本季'||filterDealData.time=='本年度'"
          >{{start}}～{{end}}：</span>
          <span class="switchHeight_box_search" v-if="filterDealData.time=='全部'"></span>
          <span class="switchHeight_box_search" v-if="filterDealData.time=='自定义'">{{inputDealTime}}：</span>
          <el-select
            v-model="filterDealData.time"
            @change="timeDealSelect"
            style="width:150px;height:32px;"
          >
            <el-option v-for="item in timeList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </p>
        <el-dialog
          title="请输入自定义日期"
          :visible.sync="customDealDialogVisible"
          width="20%"
          :modal="false"
          style="font-size:14px;"
        >
          <el-input v-model="inputDealTime" clearable></el-input>
          <p style="font-size:12px;color:#ff0000;">*请按格式输入，如：2001-02-01～2008-10-11</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="customDealDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureDealTime()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <chinaDealChart
        :dealMessage="typeName"
        :timeStartMessage="dealStart"
        :timeEndMessage="dealEnd"
        :currentMessage="current"
        ref="dealChart"
        @dealProvinceName="getName"
      ></chinaDealChart>
    </div>
    <div class="landCenter_maintop_chart" v-if="current==1">
      <div class="landCenter_maintop_content_title">
        <p class="landCenter_maintop_content_title_icon"></p>
        <p class="landCenter_maintop_content_title_text">交易趋势统计</p>
        <div class="landCenter_maintop_content_title_dealsearch">
          <span style="margin-left:50px;">交易类型：</span>
          <div style="width:150px;">
            <el-select
              size="small"
              v-model="filterDealData.circulationName"
              placeholder="全部"
              @change="circulationDealSelect(dictionary.flow_mode,filterDealData.circulationName,$event)"
              disabled
            >
              <el-option
                v-for="(item,index) in dictionary.flow_mode"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="landCenter_maintop_content_title_search">
          <span>所在区域：</span>
          <div style="width:120px;float:left;margin-right:9px;">
            <el-select
              v-model="filterDealData.cantonProvinceName"
              size="small"
              placeholder="全国"
              @change="provinceDealSelect(dictionary.administrative_regions,filterDealData.cantonProvinceName,$event)"
            >
              <el-option
                v-for="(item,index) in dictionary.administrative_regions"
                :ref="item.regionName"
                :id="item.id"
                :dictKey="item.regionCode"
                :label="item.regionName"
                :value="item.regionName"
                :key="index"
              ></el-option>
            </el-select>
          </div>
        </div>
        <p class="landCenter_maintop_content_title_search">
          <span
            v-if="filterDealData.time==''||filterDealData.time=='本年度'"
          >近一年：{{dealStart}}～{{dealEnd}}</span>
          <span v-if="filterDealData.time=='本月'">近一月：{{dealStart}}～{{dealEnd}}</span>
          <span v-if="filterDealData.time=='本周'">近一周：{{dealStart}}～{{dealEnd}}</span>
          <span v-if="filterDealData.time=='本季'">近一季：{{dealStart}}～{{dealEnd}}</span>
          <span v-if="filterDealData.time=='自定义'">自定义时间段：{{dealStart}}～{{dealEnd}}</span>
          <span v-if="filterDealData.time=='全部'">全部时间段</span>
        </p>
      </div>
      <div id="cycleChart" style="width:1140px;height:520px;" ref="dealCycleChart"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
import moment from "moment";
import chinaChart from "@/components/chinaChart";
import chinaDemandChart from "@/components/chinaDemandChart";
import chinaDealChart from "@/components/chinaDealChart";
import "../../../../../static/map/js/china";
export default {
  components: { chinaChart, chinaDemandChart, chinaDealChart },
  data() {
    return {
      current: 0,
      isChange: false,
      firstData: "", //获取一级用途数据
      filterData: {
        circulationName: "全部", //交易类型
        time: "本年度" //时间
      },
      filterDealData: {
        circulationName: "全部", //交易类型
        time: "本年度" //时间
      },
      currentTimeName: "",
      dealCurrentTimeName: "",
      typeName: "",
      inputTime: "",
      inputDealTime: "",
      start: moment()
        .year(moment().year())
        .startOf("year")
        .format("YYYY-MM-DD"), //开始日期时间
      end: moment()
        .year(moment().year())
        .endOf("year")
        .format("YYYY-MM-DD"), //结束日期时间
      dealStart: moment()
        .year(moment().year())
        .startOf("year")
        .format("YYYY-MM-DD"), //开始日期时间
      dealEnd: moment()
        .year(moment().year())
        .endOf("year")
        .format("YYYY-MM-DD"), //结束日期时间
      timeList: [
        {
          value: "选项1",
          label: "本月"
        },
        {
          value: "选项2",
          label: "本周"
        },
        {
          value: "选项3",
          label: "本季"
        },
        {
          value: "选项4",
          label: "本年度"
        },
        {
          value: "选项5",
          label: "全部"
        },
        {
          value: "选项6",
          label: "自定义"
        }
      ],
      customDialogVisible: false,
      customDealDialogVisible: false,
      filterData: {
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: "",
        circulation: "",
        circulationName: "",
        time: "本年度"
      },
      filterDealData: {
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: "",
        circulation: "",
        circulationName: "",
        time: "本年度"
      },
      dicRequest: [
        "flow_mode",
        "trans_status",
        "land_nature",
        "land_use",
        "administrative_regions"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        trans_status: "",
        land_nature: "",
        land_use: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: "",
        land_use_second: ""
      },
      dicNum: 0, //字典循环下标

      activeTabs: "supply",
      currentTabs: "supply",

      params: {
        cantonProvince: "",
        startDate: "",
        endDate: ""
      },
      paramsDeal: {
        cantonProvince: "",
        cantonCity: "",
        noticeDateBegin: "",
        noticeDateEnd: "",
        circulation: "",
        firstClassUses: ""
      },
      currentProvince: "",
      dealCurrentProvince: "",
      cycleChart: null
    };
  },
  methods: {
    handleClick(val) {
      if (val.name == this.currentTabs) {
        return;
      }
      this.currentTabs = val.name;
      if (this.activeTabs == "sandd") {
        if (sessionStorage.getItem("sdProvince")) {
          if (sessionStorage.getItem("sdProvince") == "150000") {
            this.filterData.cantonProvinceName = "内蒙古";
          } else if (sessionStorage.getItem("sdProvince") == "120000") {
            this.filterData.cantonProvinceName = "天津";
          } else if (sessionStorage.getItem("sdProvince") == "130000") {
            this.filterData.cantonProvinceName = "河北";
          } else if (sessionStorage.getItem("sdProvince") == "140000") {
            this.filterData.cantonProvinceName = "山西";
          } else if (sessionStorage.getItem("sdProvince") == "320000") {
            this.filterData.cantonProvinceName = "江苏";
          } else if (sessionStorage.getItem("sdProvince") == "330000") {
            this.filterData.cantonProvinceName = "浙江";
          } else if (sessionStorage.getItem("sdProvince") == "370000") {
            this.filterData.cantonProvinceName = "山东";
          } else if (sessionStorage.getItem("sdProvince") == "410000") {
            this.filterData.cantonProvinceName = "河南";
          } else if (sessionStorage.getItem("sdProvince") == "420000") {
            this.filterData.cantonProvinceName = "湖北";
          } else if (sessionStorage.getItem("sdProvince") == "430000") {
            this.filterData.cantonProvinceName = "湖南";
          } else if (sessionStorage.getItem("sdProvince") == "440000") {
            this.filterData.cantonProvinceName = "广东";
          } else if (sessionStorage.getItem("sdProvince") == "500000") {
            this.filterData.cantonProvinceName = "重庆";
          } else if (sessionStorage.getItem("sdProvince") == "510000") {
            this.filterData.cantonProvinceName = "四川";
          } else if (sessionStorage.getItem("sdProvince") == "530000") {
            this.filterData.cantonProvinceName = "云南";
          } else if (sessionStorage.getItem("sdProvince") == "630000") {
            this.filterData.cantonProvinceName = "青海";
          } else if (sessionStorage.getItem("sdProvince") == "650000") {
            this.filterData.cantonProvinceName = "新疆";
          } else if (sessionStorage.getItem("sdProvince") == "710000") {
            this.filterData.cantonProvinceName = "台湾";
          } else if (sessionStorage.getItem("sdProvince") == "810000") {
            this.filterData.cantonProvinceName = "香港";
          } else if (sessionStorage.getItem("sdProvince") == "820000") {
            this.filterData.cantonProvinceName = "澳门";
          } else if (sessionStorage.getItem("sdProvince") == "110000") {
            this.filterData.cantonProvinceName = "北京";
          } else if (sessionStorage.getItem("sdProvince") == "210000") {
            this.filterData.cantonProvinceName = "辽宁";
          } else if (sessionStorage.getItem("sdProvince") == "220000") {
            this.filterData.cantonProvinceName = "吉林";
          } else if (sessionStorage.getItem("sdProvince") == "230000") {
            this.filterData.cantonProvinceName = "黑龙江";
          } else if (sessionStorage.getItem("sdProvince") == "310000") {
            this.filterData.cantonProvinceName = "上海";
          } else if (sessionStorage.getItem("sdProvince") == "340000") {
            this.filterData.cantonProvinceName = "安徽";
          } else if (sessionStorage.getItem("sdProvince") == "350000") {
            this.filterData.cantonProvinceName = "福建";
          } else if (sessionStorage.getItem("sdProvince") == "450000") {
            this.filterData.cantonProvinceName = "广西";
          } else if (sessionStorage.getItem("sdProvince") == "360000") {
            this.filterData.cantonProvinceName = "江西";
          } else if (sessionStorage.getItem("sdProvince") == "460000") {
            this.filterData.cantonProvinceName = "海南";
          } else if (sessionStorage.getItem("sdProvince") == "520000") {
            this.filterData.cantonProvinceName = "贵州";
          } else if (sessionStorage.getItem("sdProvince") == "540000") {
            this.filterData.cantonProvinceName = "西藏";
          } else if (sessionStorage.getItem("sdProvince") == "610000") {
            this.filterData.cantonProvinceName = "陕西";
          } else if (sessionStorage.getItem("sdProvince") == "620000") {
            this.filterData.cantonProvinceName = "甘肃";
          } else if (sessionStorage.getItem("sdProvince") == "640000") {
            this.filterData.cantonProvinceName = "宁夏";
          } 
        } else {
          this.filterData.cantonProvinceName = "全国";
        }
        this.useDrawLine();
      }
    },
    turnGX() {
      this.current = 0;
      this.activeTabs = "supply";
      this.isChange = false;
      this.$emit("messageData", this.isChange);
      sessionStorage.removeItem("dealProvince");
    },
    turnD() {
      this.current = 1;
      this.isChange = true;
      this.$emit("messageData", this.isChange);
      sessionStorage.removeItem("sdProvince");
      this.getFirstData();
      this.cycleDrawLine();
    },
    getName(val) {
      this.filterDealData.cantonProvinceName = val;
    },
    timeSelect(val) {
      this.filterData.time = val.label;

      const startDate = moment().format("YYYY-MM-DD"); //当前时间

      const weekStartDate = moment()
        .week(moment().week())
        .startOf("week")
        .format("YYYY-MM-DD"); //本周开始时间
      const weekEndDate = moment()
        .week(moment().week())
        .endOf("week")
        .format("YYYY-MM-DD"); //本周结束时间

      const monthStartDate = moment()
        .month(moment().month())
        .startOf("month")
        .format("YYYY-MM-DD"); //本月开始时间
      const monthEndDate = moment()
        .month(moment().month())
        .endOf("month")
        .format("YYYY-MM-DD"); //本月结束时间
      const yearStartDate = moment()
        .year(moment().year())
        .startOf("year")
        .format("YYYY-MM-DD"); //本年度开始时间
      const yearEndDate = moment()
        .year(moment().year())
        .endOf("year")
        .format("YYYY-MM-DD"); //本年度结束时间

      //本季时间
      let currentQuarter = moment().quarter(); // 当前是第几季度
      let currentYear = moment().year(); // 当前是第几年
      const quarterStartDate = moment(moment(currentYear + "-01-01").toDate())
        .quarter(currentQuarter)
        .format("YYYY-MM-DD"); //当前季度的开始时间
      let endMonth = 3 * parseInt(currentQuarter); //当前季度最后一个月
      /* 对月数进行格式化 */
      if (endMonth < 10) {
        endMonth = "0" + endMonth;
      } else {
        endMonth += "";
      }
      let endMonthDays = moment(
        new Date(currentYear + "-" + endMonth)
      ).daysInMonth(); // 末尾月天数
      let endDays = currentYear + "-" + endMonth + "-" + endMonthDays; //完整年月日整合
      const quarterEndDate = moment(new Date(endDays)).format("YYYY-MM-DD"); // 当前季度的结束时间

      if (this.filterData.time == "本月") {
        this.start = monthStartDate;
        this.end = monthEndDate;
        this.currentTimeName = "本月";
      } else if (this.filterData.time == "本周") {
        this.start = weekStartDate;
        this.end = weekEndDate;
        this.currentTimeName = "本周";
      } else if (this.filterData.time == "本季") {
        this.start = quarterStartDate;
        this.end = quarterEndDate;
        this.currentTimeName = "本季";
      } else if (this.filterData.time == "本年度") {
        this.start = yearStartDate;
        this.end = yearEndDate;
        this.currentTimeName = "本年度";
      } else if (this.filterData.time == "全部") {
        this.start = "";
        this.end = "";
        this.currentTimeName = "全部";
      } else {
        this.customDialogVisible = true;
        this.currentTimeName = "自定义";
      }
    },
    timeDealSelect(val) {
      this.filterDealData.time = val.label;

      const startDate = moment().format("YYYY-MM-DD"); //当前时间

      const weekStartDate = moment()
        .week(moment().week())
        .startOf("week")
        .format("YYYY-MM-DD"); //本周开始时间
      const weekEndDate = moment()
        .week(moment().week())
        .endOf("week")
        .format("YYYY-MM-DD"); //本周结束时间

      const monthStartDate = moment()
        .month(moment().month())
        .startOf("month")
        .format("YYYY-MM-DD"); //本月开始时间
      const monthEndDate = moment()
        .month(moment().month())
        .endOf("month")
        .format("YYYY-MM-DD"); //本月结束时间
      const yearStartDate = moment()
        .year(moment().year())
        .startOf("year")
        .format("YYYY-MM-DD"); //本年度开始时间
      const yearEndDate = moment()
        .year(moment().year())
        .endOf("year")
        .format("YYYY-MM-DD"); //本年度结束时间

      //本季时间
      let currentQuarter = moment().quarter(); // 当前是第几季度
      let currentYear = moment().year(); // 当前是第几年
      const quarterStartDate = moment(moment(currentYear + "-01-01").toDate())
        .quarter(currentQuarter)
        .format("YYYY-MM-DD"); //当前季度的开始时间
      let endMonth = 3 * parseInt(currentQuarter); //当前季度最后一个月
      /* 对月数进行格式化 */
      if (endMonth < 10) {
        endMonth = "0" + endMonth;
      } else {
        endMonth += "";
      }
      let endMonthDays = moment(
        new Date(currentYear + "-" + endMonth)
      ).daysInMonth(); // 末尾月天数
      let endDays = currentYear + "-" + endMonth + "-" + endMonthDays; //完整年月日整合
      const quarterEndDate = moment(new Date(endDays)).format("YYYY-MM-DD"); // 当前季度的结束时间

      if (this.filterDealData.time == "本月") {
        this.dealStart = monthStartDate;
        this.dealEnd = monthEndDate;
        this.dealCurrentTimeName = "本月";
      } else if (this.filterDealData.time == "本周") {
        this.dealStart = weekStartDate;
        this.dealEnd = weekEndDate;
        this.dealCurrentTimeName = "本周";
      } else if (this.filterDealData.time == "本季") {
        this.dealStart = quarterStartDate;
        this.dealEnd = quarterEndDate;
        this.dealCurrentTimeName = "本季";
      } else if (this.filterDealData.time == "本年度") {
        this.dealStart = yearStartDate;
        this.dealEnd = yearEndDate;
        this.dealCurrentTimeName = "本年度";
      } else if (this.filterDealData.time == "全部") {
        this.dealStart = "";
        this.dealEnd = "";
        this.dealCurrentTimeName = "全部";
      } else {
        this.customDealDialogVisible = true;
        this.dealCurrentTimeName = "自定义";
      }
    },
    sureTime() {
      this.customDialogVisible = false;
      var str = ''
      var data = this.inputTime;
      if(data.indexOf("～") < 0 && data.indexOf("~") < 0 ){
        this.$message.error("请输入正确时间格式!")
        return
      }
      if(data.indexOf("～") > 0){
        str = data.split("～");
        this.start = str[0];
        this.end = str[1];
      }else if(data.indexOf("~") > 0){
        str = data.split("~");
        this.start = str[0];
        this.end = str[1];
      }
    },
    sureDealTime() {
      this.customDealDialogVisible = false;
      var str = ''
      var data = this.inputDealTime;
      if(data.indexOf("～") < 0 && data.indexOf("~") < 0 ){
        this.$message.error("请输入正确时间格式!")
        return
      }
      if(data.indexOf("～") > 0){
        str = data.split("～");
        this.dealStart = str[0];
        this.dealEnd = str[1];
      }else if(data.indexOf("~") > 0){
        str = data.split("~");
        this.dealStart = str[0];
        this.dealEnd = str[1];
      }
    },

    provinceSelect(dic, cantonCode, event) {
      console.log(event)
      this.filterData.cantonAreaName = "";
      this.filterData.cantonArea = "";
      this.cantonArea = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonCity = "";
      this.cantonCity = "";
      // let pId = this.$refs[cantonCode][0].$attrs.id;
      let pId = '000000'
      // this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey;
      this.dictionary.cantonArea = [];
      this.$axios.get(
        this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,
        // `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {parentId:pId},
        res => {
          if (res.dictionariesList.length != 0) {
            let obj = {
              id: "",
              dictKey: "",
              zhCn: "全部",
              enUs: "",
              creatorBy: null,
              createTime: null,
              updatorBy: null,
              updateTime: null,
              version: null,
              dictOrder: null,
              dictDelete: null,
              dictValue: "",
              groupId: null,
              parentId: "",
              abbreviation: null,
              regionLevel: null,
              children: null,
            }
            res.dictionariesList.unshift(obj)
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
        this.dictionary.cantonCity.map((item,index)=>{
          if(event == item.zhCn){
            this.filterData.cantonProvince = item.dictKey;
            this.currentProvince = item.dictKey;
           }
         })
        sessionStorage.setItem("sdProvince", this.filterData.cantonProvince);
    },
    provinceDealSelect(dic, cantonCode, event) {
      this.filterDealData.cantonAreaName = "";
      this.filterDealData.cantonArea = "";
      this.cantonArea = "";
      this.filterDealData.cantonCityName = "";
      this.filterDealData.cantonCity = "";
      this.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterDealData.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey;
      this.dictionary.cantonArea = [];
      this.$axios.get(
        this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,
        // `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {parentId:pId},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
      this.dealCurrentProvince = this.filterDealData.cantonProvince;
      sessionStorage.setItem(
        "dealProvince",
        this.filterDealData.cantonProvince
      );
    },
    circulationDealSelect(dic, circulationName, event) {
      this.filterDealData.circulation = this.$refs[
        circulationName
      ][0].$attrs.dictKey;
      this.typeName = this.filterDealData.circulation;
    },
    useDrawLine() {
      this.$nextTick(() => {
        let useChart = echarts.init(document.getElementById("useChart"));
        // 绘制图表

        //请求数据
        let params = this.params;
        params["startDate"] = this.start;
        params["endDate"] = this.end;
        params["cantonProvince"] = sessionStorage.getItem("sdProvince");
        // params["cantonCity"] = this.currentCity;

        this.$axios.get(
          // `/epf-monitor/monitor/moniSellPurchAnalyse/queryClassUseCompare`,
          '/epf-monitor/monitor/trans/queryUseContrast',
          // this.$API.EPF_SUP.CLASS,
          params,
          mapRes => {
            let chartData = mapRes.list;

            var gjTotalNumberSeriesData = []; //供给宗数图表数据
            var xqTotalNumberSeriesData = []; //需求宗数图表数据

            var sumNumberData = []; //总宗数

            var firstClassUseData = []; //一级用途数据

            for (var key in chartData) {
              gjTotalNumberSeriesData.push(chartData[key].gjCounNumb); //供给宗数
              xqTotalNumberSeriesData.push(chartData[key].xqCounNumb); //需求宗数

              sumNumberData.push(
                chartData[key].gjCounNumb,
                chartData[key].xqCounNumb
              ); //总宗数

              firstClassUseData.push(chartData[key].firstClassUseName); //一级用途数据
            }

            var gjTotalNumberSeriesDataMax = Math.max.apply(
              Math,
              gjTotalNumberSeriesData
            ); //供给宗数最大值
            var xqTotalNumberSeriesDataMax = Math.max.apply(
              Math,
              xqTotalNumberSeriesData
            ); //需求宗数最大值
            var sumNumberDataMax = Math.max.apply(Math, sumNumberData); //总宗数最大值

            useChart.setOption({
              color: ["#3398DB"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                left: "15%",
                top: "5%",
                data: ["供给", "需求"]
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              dataZoom: [
                {
                  type: "inside",
                  show: true,
                  xAxisIndex: [0],
                  start: 0, //默认为1
                  end: 100
                }
              ],
              xAxis: [
                {
                  type: "category",
                  data: firstClassUseData,
                  name: "宗数",
                  nameLocation: "end",
                  axisTick: {
                    alignWithLabel: true,
                    show: false //不要刻度
                  },
                  axisLine: {
                    show: false //不要x轴
                  },
                  axisLabel: {
                    //坐标轴刻度标签的相关设置。
                    formatter: function(params) {
                      var newParamsName = "";
                      var paramsNameNumber = params.length;
                      var provideNumber = 4;
                      var rowNumber = Math.ceil(
                        paramsNameNumber / provideNumber
                      );
                      if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";
                          var start = p * provideNumber;
                          var end = start + provideNumber;
                          if (p == rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber);
                          } else {
                            tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr;
                        }
                      } else {
                        newParamsName = params;
                      }
                      return newParamsName;
                    }
                  }
                }
              ],
              yAxis: [
                {
                  name: "单位：宗",
                  type: "value",
                  interval: Math.ceil(sumNumberDataMax / 4),
                  max: Math.ceil(sumNumberDataMax),
                  splitLine: {
                    //网格线
                    lineStyle: {
                      type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
                    },
                    show: true //隐藏或显示
                  },
                  axisTick: {
                    alignWithLabel: true,
                    show: false //不要刻度
                  },
                  axisLine: {
                    show: false //不要x轴
                  }
                }
              ],
              series: [
                {
                  name: "供给",
                  type: "bar",
                  barWidth: "20px",
                  data: gjTotalNumberSeriesData,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#78b4f6" // 高处的颜色
                          },
                          {
                            offset: 1,
                            color: "#5781e5" // 低处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  name: "需求",
                  type: "bar",
                  barWidth: "20px",
                  data: xqTotalNumberSeriesData,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#ffbd6f" // 高处的颜色
                          },
                          {
                            offset: 1,
                            color: "#ff9f60" // 低处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                }
              ]
            });
          }
        );
      });
    },

    getFirstData() {
      let params = this.params;
      params["analysisType"] = this.typeName;
      params["startDate"] = this.dealStart;
      params["endDate"] = this.dealEnd;
      params["cantonProvince"] = sessionStorage.getItem("dealProvince");

      this.$axios.get(
        this.$API.EPF_SUP.TRAST,
        params,
        res => {
          var firstClassUseData = [];
          for (var key in res.result) {
            firstClassUseData.push(res.result[key].firstClassUse);
          }
          this.firstData = firstClassUseData.join(",");
        }
      );
    },

    cycleDrawLine() {
      this.$nextTick(() => {
        this.cycleChart = echarts.init(this.$refs.dealCycleChart);
        // 绘制图表

        //请求数据
        let params = this.paramsDeal;
        params["noticeDateBegin"] = this.dealStart;
        params["noticeDateEnd"] = this.dealEnd;
        params["circulation"] = this.typeName;
        params["firstClassUses"] = this.firstData;
        params["cantonProvince"] = sessionStorage.getItem("dealProvince");

        this.$axios.get(
          this.$API.EPF_SUP.TIME,
          params,
          mapRes => {
            let chartData = mapRes.result;

            var timeData = [];
            var allNumberData = [];
            var firstClassUseNameData = [];

            for (var key in chartData) {
              timeData.push(chartData[key].yearMonth);
              allNumberData.push(chartData[key].resulCount);
              firstClassUseNameData.push(chartData[key].firstClassUseName);
            }

            var timeOnlyData = Array.from(new Set(timeData));
            var firstClassUseNameOnlyData = Array.from(
              new Set(firstClassUseNameData)
            );
            var allNumberDataMax = Math.max.apply(Math, allNumberData); //出租宗数数据最大值

            function getData(Data, AllData) {
              for (var key in Data) {
                AllData.push({
                  circulation: Data[key].circulation,
                  circulationName: Data[key].circulationName,
                  firstClassUse: Data[key].firstClassUse,
                  firstClassUseName: Data[key].firstClassUseName,
                  secondClassUse: Data[key].secondClassUse,
                  secondClassUseName: Data[key].secondClassUseName,
                  cantonProvinceName: Data[key].cantonProvinceName,
                  cantonProvince: Data[key].cantonProvince,
                  cantonCityName: Data[key].cantonCityName,
                  cantonCity: Data[key].cantonCity,
                  resulCount: Data[key].resulCount,
                  yearMonth: Data[key].yearMonth
                });
              }
            }

            //商服用地
            var shangFuAllData = [];

            var shangFuData = [];
            var shangFuTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("warehousing_land");
            });
            shangFuData = shangFuData.concat(shangFuTemp);

            getData(shangFuData, shangFuAllData);


            var shangFuNumberData = [];
            for (var key in shangFuAllData) {
              shangFuNumberData.push(shangFuAllData[key].resulCount);
            }

            //耕地
            var gengDiAllData = [];
            var gengDiData = [];
            var gengDiTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("arable_land");
            });
            gengDiData = gengDiData.concat(gengDiTemp);
            getData(gengDiData, gengDiAllData);
            var gengDiNumberData = [];
            for (var key in gengDiAllData) {
              gengDiNumberData.push(gengDiAllData[key].resulCount);
            }

            //园地
            var yuanDiAllData = [];
            var yuanDiData = [];
            var yuanDiTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("garden");
            });
            yuanDiData = yuanDiData.concat(yuanDiTemp);
            getData(yuanDiData, yuanDiAllData);
            var yuanDiNumberData = [];
            for (var key in yuanDiAllData) {
              yuanDiNumberData.push(yuanDiAllData[key].resulCount);
            }

            //林地
            var linDiAllData = [];
            var linDiData = [];
            var linDiTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("woodland");
            });
            linDiData = linDiData.concat(linDiTemp);
            getData(linDiData, linDiAllData);
            var linDiNumberData = [];
            for (var key in linDiAllData) {
              linDiNumberData.push(linDiAllData[key].resulCount);
            }

            //其他
            var otherAllData = [];
            var otherData = [];
            var otherTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("other");
            });
            otherData = otherData.concat(otherTemp);
            getData(otherData, otherAllData);
            var otherNumberData = [];
            for (var key in otherAllData) {
              otherNumberData.push(otherAllData[key].resulCount);
            }

            //工矿仓储用地
            var cangChuAllData = [];
            var cangChuData = [];
            var cangChuTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("industrial_mining_storage_land");
            });
            cangChuData = cangChuData.concat(cangChuTemp);
            getData(cangChuData, cangChuAllData);
            var cangChuNumberData = [];
            for (var key in cangChuAllData) {
              cangChuNumberData.push(cangChuAllData[key].resulCount);
            }

            //住宅用地
            var zhuZhaiAllData = [];
            var zhuZhaiData = [];
            var zhuZhaiTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("residential_land");
            });
            zhuZhaiData = zhuZhaiData.concat(zhuZhaiTemp);
            getData(zhuZhaiData, zhuZhaiAllData);
            var zhuZhaiNumberData = [];
            for (var key in zhuZhaiAllData) {
              zhuZhaiNumberData.push(zhuZhaiAllData[key].resulCount);
            }

            //公共管理与公共服务用地
            var gongGongAllData = [];
            var gongGongData = [];
            var gongGongTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes(
                "public_administration_public_service_land"
              );
            });
            gongGongData = gongGongData.concat(gongGongTemp);
            getData(gongGongData, gongGongAllData);
            var gongGongNumberData = [];
            for (var key in gongGongAllData) {
              gongGongNumberData.push(gongGongAllData[key].resulCount);
            }

            //特殊用地
            var specialAllData = [];
            var specialData = [];
            var specialTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("special_land");
            });
            specialData = specialData.concat(specialTemp);
            getData(specialData, specialAllData);
            var specialNumberData = [];
            for (var key in specialAllData) {
              specialNumberData.push(specialAllData[key].resulCount);
            }

            //交通运输用地
            var jiaoTongAllData = [];
            var jiaoTongData = [];
            var jiaoTongTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("transportation_land");
            });
            jiaoTongData = jiaoTongData.concat(jiaoTongTemp);
            getData(jiaoTongData, jiaoTongAllData);
            var jiaoTongNumberData = [];
            for (var key in jiaoTongAllData) {
              jiaoTongNumberData.push(jiaoTongAllData[key].resulCount);
            }

            //特殊用地
            var teShuAllData = [];
            var teShuData = [];
            var teShuTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("land_use-017");
            });
            teShuData = teShuData.concat(teShuTemp);
            getData(teShuData, teShuAllData);
            var teShuNumberData = [];
            for (var key in teShuAllData) {
              teShuNumberData.push(teShuAllData[key].resulCount);
            }

            //其他土地
            var otherLandAllData = [];
            var otherLandData = [];
            var otherLandTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("land_use-032");
            });
            otherLandData = otherLandData.concat(otherLandTemp);
            getData(otherLandData, otherLandAllData);
            var otherLandNumberData = [];
            for (var key in otherLandAllData) {
              otherLandNumberData.push(otherLandAllData[key].resulCount);
            }

            //批发零售用地
            var piFaAllData = [];
            var piFaData = [];
            var piFaTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("land_use-001");
            });
            piFaData = piFaData.concat(piFaTemp);
            getData(piFaData, piFaAllData);
            var piFaNumberData = [];
            for (var key in piFaAllData) {
              piFaNumberData.push(piFaAllData[key].resulCount);
            }

            //商务金融用地
            var shangWuAllData = [];
            var shangWuData = [];
            var shangWuTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("land_use-003");
            });
            shangWuData = shangWuData.concat(shangWuTemp);
            getData(shangWuData, shangWuAllData);
            var shangWuNumberData = [];
            for (var key in shangWuAllData) {
              shangWuNumberData.push(shangWuAllData[key].resulCount);
            }

            //经济适用住房用地
            var jingJiAllData = [];
            var jingJiData = [];
            var jingJiTemp = chartData.filter(function(i) {
              return i.firstClassUse.includes("land_use-013");
            });
            jingJiData = jingJiData.concat(jingJiTemp);
            getData(jingJiData, jingJiAllData);
            var jingJiNumberData = [];
            for (var key in jingJiAllData) {
              jingJiNumberData.push(jingJiAllData[key].resulCount);
            }

            var shangFuNAME = "";
            var shangFuDATA = [];
            var gengDiNAME = "";
            var gengDiDATA = [];
            var yuanDiNAME = "";
            var yuanDiDATA = [];
            var linDiNAME = "";
            var linDiDATA = [];
            var otherNAME = "";
            var otherDATA = [];
            var cangChuNAME = "";
            var cangChuDATA = [];
            var zhuZhaiNAME = "";
            var zhuZhaiDATA = [];
            var gongGongNAME = "";
            var gongGongDATA = [];
            var specialNAME = "";
            var specialDATA = [];
            var teShuNAME = "";
            var teShuDATA = [];
            var jiaoTongNAME = "";
            var jiaoTongDATA = [];
            var otherLandNAME = "";
            var otherLandDATA = [];
            var piFaNAME = "";
            var piFaDATA = [];
            var shangWuNAME = "";
            var shangWuDATA = [];
            var jingJiNAME = "";
            var jingJiDATA = [];

            if (this.firstData.indexOf("warehousing_land") != -1) {
              shangFuNAME = "商服用地";
              shangFuDATA = shangFuNumberData;
            }
            if (this.firstData.indexOf("arable_land") != -1) {
              gengDiNAME = "耕地";
              gengDiDATA = gengDiNumberData;
            }
            if (this.firstData.indexOf("garden") != -1) {
              yuanDiNAME = "园地";
              yuanDiDATA = yuanDiNumberData;
            }
            if (this.firstData.indexOf("woodland") != -1) {
              linDiNAME = "林地";
              linDiDATA = linDiNumberData;
            }
            if (this.firstData.indexOf("other") != -1) {
              otherNAME = "其他";
              otherDATA = otherNumberData;
            }
            if (
              this.firstData.indexOf("industrial_mining_storage_land") != -1
            ) {
              cangChuNAME = "工矿仓储用地";
              cangChuDATA = cangChuNumberData;
            }
            if (this.firstData.indexOf("residential_land") != -1) {
              zhuZhaiNAME = "住宅用地";
              zhuZhaiDATA = zhuZhaiNumberData;
            }
            if (
              this.firstData.indexOf(
                "public_administration_public_service_land"
              ) != -1
            ) {
              gongGongNAME = "公共管理与公共服务用地";
              gongGongDATA = gongGongNumberData;
            }
            if (this.firstData.indexOf("special_land") != -1) {
              specialNAME = "特殊用地";
              specialDATA = specialNumberData;
            }
            if (this.firstData.indexOf("land_use-017") != -1) {
              teShuNAME = "特殊用地";
              teShuDATA = teShuNumberData;
            }
            if (this.firstData.indexOf("transportation_land") != -1) {
              jiaoTongNAME = "交通运输用地";
              jiaoTongDATA = jiaoTongNumberData;
            }
            if (this.firstData.indexOf("land_use-032") != -1) {
              otherLandNAME = "其他土地";
              otherLandDATA = otherLandNumberData;
            }
            if (this.firstData.indexOf("land_use-001") != -1) {
              piFaNAME = "批发零售用地";
              piFaDATA = piFaNumberData;
            }
            if (this.firstData.indexOf("land_use-003") != -1) {
              shangWuNAME = "商务金融用地";
              shangWuDATA = shangWuNumberData;
            }
            if (this.firstData.indexOf("land_use-013") != -1) {
              jingJiNAME = "经济适用住房用地";
              jingJiDATA = jingJiNumberData;
            }

            // 绘制图表
            this.cycleChart.setOption({
              title: {
                textStyle: {
                  align: "center",
                  color: "#333",
                  fontSize: 20
                },
                top: "3%",
                left: "10%"
              },
              backgroundColor: "#fff",
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              tooltip: {
                trigger: "axis"
                // axisPointer: {
                //     type: "shadow",
                //     label: {
                //         show: true
                //     }
                // }
              },
              legend: {
                left: "10%",
                top: "5%",
                data: firstClassUseNameOnlyData
              },
              dataZoom: [
                {
                  type: "inside",
                  show: true,
                  xAxisIndex: [0],
                  start: 0, //默认为1
                  end: 100
                }
              ],
              xAxis: {
                data: timeOnlyData,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#333" //X轴文字颜色
                  }
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#fff"
                  }
                },
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: "#ddd6d0"
                  }
                }
              },
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#ebf8ac"
                    }
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: "#FFFFFF"
                    }
                  }
                },
                {
                  name: "单位：宗",
                  type: "value",
                  interval: Math.ceil(allNumberDataMax / 4),
                  max: Math.ceil(allNumberDataMax),
                  position: "left",
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  axisLabel: {
                    show: true
                  }
                }
              ],
              series: [
                {
                  name: shangFuNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: shangFuDATA
                },
                {
                  name: gengDiNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#07dfcd",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: gengDiDATA
                },
                {
                  name: yuanDiNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#ffa060",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: yuanDiDATA
                },
                {
                  name: linDiNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: linDiDATA
                },
                {
                  name: otherNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: otherDATA
                },
                {
                  name: cangChuNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: cangChuDATA
                },
                {
                  name: zhuZhaiNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: zhuZhaiDATA
                },
                {
                  name: gongGongNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: gongGongDATA
                },
                {
                  name: specialNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: specialDATA
                },
                {
                  name: teShuNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: teShuDATA
                },
                {
                  name: jiaoTongNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: jiaoTongDATA
                },
                {
                  name: otherLandNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: otherLandDATA
                },
                {
                  name: piFaNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: piFaDATA
                },
                {
                  name: shangWuNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: shangWuDATA
                },
                {
                  name: jingJiNAME,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: true, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 3, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                      }
                    }
                  },
                  data: jingJiDATA
                }
              ]
            });
          }
        );
      });
    }
  },
  created() {
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            // `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            this.$API.EPF_SUPPLY.DIC.GET,
            { parentId: '0',code:item },
            res => {
              resolve(res);
            }
          );
        } else if (item == "administrative_regions") {
          this.$axios.get(
            // `/epf-cms/regionals/getAreaByCodeOrParentId`,
            this.$API.EPF_TRADE.ENTRUST.EDIT.AREA_ID,
            { parentId: '000000' },
            res => {
              resolve(res);
            }
          );
        } else {
          this.$axios.get(
            // `/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,
            this.$API.EPF_TRADE.BANK.DICT_GROUP,
            {},
            res => {
              resolve(res);
            }
          );
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id,
            regionCode: item.regionCode,
            regionName: item.regionName
          };
        });
        return dicArr;
      });

      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }
      this.dicFinsh = true;
    });
  },
  mounted() {
    this.$nextTick(function() {
      this.useDrawLine();
      this.cycleDrawLine();
    });
    this.getFirstData();
    this.provinceSelect()
    this.provinceDealSelect()
  },
  watch: {
    current(val) {
      if (this.current == 0) {
        this.useDrawLine();
      } else {
        this.getFirstData();
        this.cycleDrawLine();
      }
    },
    typeName(val) {
      this.getFirstData();
      this.cycleDrawLine();
    },
    start(val) {
      this.useDrawLine();
    },
    end(val) {
      this.useDrawLine();
    },
    dealStart(val) {
      this.getFirstData();
      this.cycleDrawLine();
    },
    dealEnd(val) {
      this.getFirstData();
      this.cycleDrawLine();
    },
    currentProvince(val) {
      this.useDrawLine();
    },
    dealCurrentProvince(val) {
      this.getFirstData();
      this.cycleDrawLine();
      this.$refs.dealChart.changeDealMap();
      this.$refs.dealChart.useMsgDeal();
    },
    "filterDealData.cantonProvinceName": {
      immediate: true,
      deep: true,
      handler(val) {
        this.getFirstData();
        this.cycleDrawLine();
      }
    }
  },
  destroyed() {
    sessionStorage.removeItem("sdProvince");
    sessionStorage.removeItem("dealProvince");
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landCenter_maintop {
  @include size(100%, 55px);
  background: #fff;
  box-sizing: border-box;
  position: relative;
  top: 42px;
  z-index: 10;
  &_bigtab {
    @include size(100%, 55px);
    &_title {
      @include size(100%, 100%);
      display: flex;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: bolder;
        background-color: #e5e7f2;
        &.active {
          background-color: #ffffff;
          color: var(--Colors);
          .img_icon1 {
            background-image: url("../../../../assets/image/3-1.png");
          }
          .img_icon2 {
            background-image: url("../../../../assets/image/4-1.png");
          }
        }
        .img_icon1 {
          width: 20px;
          height: 20px;
          background-image: url("../../../../assets/image/3-1-灰色.png");
          margin-right: 15px;
        }
        .img_icon2 {
          width: 20px;
          height: 20px;
          background-image: url("../../../../assets/image/4-1-灰色.png");
          margin-right: 15px;
        }
      }
    }
  }
}
.landCenter_maintop_content {
  @include size(1140px, 0);
  background-color: #ffffff;
  position: absolute;
  top: 606px;
  padding: 70px 30px 25px 30px;
  &_title {
    @include size(100%, 80px);
    display: flex;
    align-items: center;
    &_icon {
      width: 6px;
      height: 21px;
      background-color: var(--lightColor);
      border-radius: 3px;
    }
    &_text {
      font-size: 18px;
      font-weight: bolder;
      margin-left: 10px;
      margin-right: 50px;
    }
    &_search {
      display: flex;
      align-items: center;
      .switchHeight_box_search {
        font-size: 12px;
        font-weight: bold;
        color: #747474;
        height: 40px;
        word-break: break-all;
        white-space: normal;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 200px;
      }
    }
    &_dealsearch {
      display: flex;
      align-items: center;
      .switchHeight_box_search {
        font-size: 12px;
        font-weight: bold;
        color: #747474;
        height: 40px;
        word-break: break-all;
        white-space: normal;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 300px;
      }
    }
  }
}
.landCenter_maintop_chart {
  @include size(1140px, 600px);
  position: absolute;
  background-color: #ffffff;
  top: 1345px;
  padding: 15px 30px 25px 30px;
  .landCenter_maintop_content_title_search {
    span {
      margin-left: 50px;
    }
  }
}
#landM .el-input__inner {
  height: 32px;
}
.el-input__icon{
	line-height: 32px !important;
}
</style>
