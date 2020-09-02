<template>
  <div class="filter_wrap">
    <div
      class="switchHeight_box"
      :style="{ height: switchHeight + 'px', overflow: 'hidden' }"
    >
      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">信息标题 :</span>
        </el-col>
        <el-col :span="12">
          <el-input
            size="small"
            v-model="ruleForm.title"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
        <span v-if="!demandSelect">
          <el-col v-if="dicFinsh" :span="2">
            <span class="filter_title">流转方式 :</span>
          </el-col>
          <el-col v-if="dicFinsh" :span="5">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="ruleForm.circulatemodeName"
              placeholder="请选择流转方式"
              @change="
                circulatemodeSelect(
                  dictionary.flow_mode,
                  ruleForm.circulatemodeName,
                  $event
                )
              "
            >
              <el-option
                v-for="item in dictionary.flow_mode"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="item.dictKey"
              ></el-option>
            </el-select>
          </el-col>
        </span>
        <span v-if="demandSelect">
          <el-col v-if="dicFinsh" :span="3">
            <span class="filter_title">需求类型 :</span>
          </el-col>
          <el-col v-if="dicFinsh" :span="5">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="ruleForm.demandName"
              placeholder="请选择需求类型"
              @change="
                demandTypeSelect(
                  dictionary.purchasr_demand,
                  ruleForm.demandName,
                  $event
                )
              "
            >
              <el-option
                v-for="item in dictionary.purchasr_demand"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="item.dictKey"
              ></el-option>
            </el-select>
          </el-col>
        </span>
      </el-row>

      <el-row :gutter="2">
        <el-col v-if="dicFinsh" :span="2">
          <span class="filter_title">行政区域 :</span>
        </el-col>
        <el-col v-if="dicFinsh" :span="12">
          <el-col :span="8" class="regionSelectIcon">
            <el-select
              size="small"
              class="filterRegion"
              v-model="ruleForm.cantonProvinceName"
              placeholder="请选择省"
              @change="
                provinceSelect(
                  dictionary.administrative_regions,
                  ruleForm.cantonProvinceName,
                  $event
                )
              "
            >
              <el-option
                v-for="item in dictionary.administrative_regions"
                :ref="item.regionName"
                :id="item.id"
                :regionCode="item.regionCode"
                :label="item.regionName"
                :value="item.regionName"
                :key="item.regionCode"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="regionSelectIcon">
            <el-select
              size="small"
              class="filterRegion"
              v-model="ruleForm.cantonCityName"
              placeholder="请选择市"
              @change="
                citySelect(
                  dictionary.cantonCity,
                  ruleForm.cantonCityName,
                  $event
                )
              "
            >
              <el-option
                v-for="item in dictionary.cantonCity"
                :ref="item.regionName"
                :id="item.id"
                :regionCode="item.regionCode"
                :label="item.regionName"
                :value="item.regionName"
                :key="item.regionCode"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="regionSelectIcon">
            <el-select
              size="small"
              class="filterRegion"
              v-model="ruleForm.cantonAreaName"
              placeholder="请选择区/县"
              @change="
                areaSelect(
                  dictionary.cantonAreaName,
                  ruleForm.cantonAreaName,
                  $event
                )
              "
            >
              <el-option
                v-for="item in dictionary.cantonArea"
                :ref="item.regionName"
                :id="item.id"
                :regionCode="item.regionCode"
                :label="item.regionName"
                :value="item.regionName"
                :key="item.regionCode"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="2" v-if="!closeTypeIpt">
          <span class="filter_title">状态 :</span>
        </el-col>
        <el-col :span="5" v-if="isFlag && !closeTypeIpt">
          <el-select
            class="filterCirculatemode"
            v-model="ruleForm.typeName"
            placeholder="请选择状态"
            size="small"
            @change="
              typeSelect(dictionary.purchasr_status, ruleForm.typeName, $event)
            "
          >
            <el-option
              v-for="item in issueSell"
              :ref="item.zhCn"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.zhCn"
              :key="item.dictKey"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" v-if="!isFlag && !closeTypeIpt">
          <el-select
            class="filterCirculatemode"
            v-model="ruleForm.typeName"
            placeholder="请选择状态"
            size="small"
            @change="
              typeSelect(dictionary.purchasr_status, ruleForm.typeName, $event)
            "
          >
            <el-option
              v-for="item in issueSell2"
              :ref="item.zhCn"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.zhCn"
              :key="item.dictKey"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">发布时间 :</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="useDate"
            type="daterange"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
            size="small"
            @change="selectDatarange"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <!-- <el-col :span="5">
        <el-date-picker
          class="filterDateSelecet"
          v-model="ruleForm.issueBeginDate"
          clearable
          size="small"
          type="date"
          placeholder="请选择开始时间">
        </el-date-picker>
      </el-col>
      <el-col :span="1">
        <span class="filter_title" style="padding:0px;text-align:center;">--</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          class="filterDateSelecet"
          v-model="ruleForm.issueEndDate"
          clearable
          size="small"
          type="date"
          placeholder="请选择结束时间">
        </el-date-picker>
        </el-col>-->
        <el-col :span="2">
          <span class="filter_title">面积 :</span>
        </el-col>
        <el-col :span="3">
          <el-input
            size="small"
            v-model="ruleForm.areaLast"
            placeholder="最小面积"
            @input="handleInput('areaLast')"
          ></el-input>
        </el-col>
        <el-col :span="1">
          <span class="filter_title" style="padding:0px;text-align:center;"
            >--</span
          >
        </el-col>
        <el-col :span="3">
          <el-input
            size="small"
            v-model="ruleForm.areaMost"
            placeholder="最大面积"
            @input="handleInput('areaMost')"
          ></el-input>
        </el-col>
        <el-col :span="1">
          <span style="position: relative;">
            <span class="monad">平方米</span>
          </span>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20" style="margin-bottom:0px;">
      <el-col :span="2" :offset="2">
        <div class="epf_btn epf_btn_bg" @click="searchData">查询</div>
      </el-col>
      <el-col :span="2" :offset="0">
        <div class="epf_btn epf_btn_def" @click="resetFilterInfo">重置</div>
      </el-col>
    </el-row>

    <div style="height:20px;">
      <span class="flexibleSwitch" @click="flexSwitch">
        {{ flexibleOpen ? "收起搜索" : "高级搜索" }}
        <i
          :class="flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
        ></i>
      </span>
    </div>
  </div>
</template>

<script>
import baseURL1 from "../util/config.js";
export default {
  props: {
    closeTypeIpt: Boolean,
    demandSelect: Boolean,
    isFlag: Boolean
  },
  data() {
    return {
      filter: [
        {
          inputType: "input",
          title: "信息标题",
          titleSpan: 2,
          inputSpan: 12
        },
        {
          inputType: "select",
          title: "流转方式",
          titleSpan: 3,
          inputSpan: 5,
          option: [
            {
              title: "全部"
            },
            {
              title: "转让"
            },
            {
              title: "出租"
            },
            {
              title: "抵押"
            }
          ]
        },
        {
          inputType: "region"
        },
        {
          inputType: "select",
          title: "状态",
          titleSpan: 3,
          spanSpan: 5
        }
      ],
      ruleForm: {
        title: "",
        //流转方式：
        circulation: "",
        circulatemodeName: "",
        //需求类型
        demand: "",
        demandName: "",
        //省
        cantonProvince: "",
        cantonProvinceName: "",
        //市
        cantonCity: "",
        cantonCityName: "",
        //区
        cantonArea: "",
        cantonAreaName: "",
        //状态
        publishStatus: "",
        typeName: "",
        issueBeginDate: "",
        issueEndDate: "",
        areaMost: "",
        areaLast: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      switchHeight: 40,
      flexibleOpen: false,
      dicRequest: [
        "flow_mode",
        "administrative_regions",
        "purchasr_demand",
        "purchasr_status"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        administrative_regions: "",
        purchasr_demand: "",
        purchasr_status: [],
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //接口请求完成
      pickerOptions: {
        //日期范围快速选择配置
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      useDate: "", //日期范围
      issueSell: [
        { dictKey: "draft2", zhCn: "草稿" },
        { dictKey: "audit", zhCn: "待审核" },
        { dictKey: "audit_failure", zhCn: "审核失败" }
      ],
      issueSell2: [
        { dictKey: "published2", zhCn: "已发布" },
        { dictKey: "down_mytsell", zhCn: "下架" }
      ]
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$axios.get(
            `/epf-admin/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: "0" },
            res => {
              resolve(res);
            }
          );
        } else if (item == "administrative_regions") {
          this.$axios.get(
            `/epf-cms/regionals/getAreaByCodeOrParentId`,
            { parentId: "000000" },
            res => {
              resolve(res);
            }
          );
        } else {
          this.$axios.get(
            `/epf-admin/dictionaries/getDictEbyDictGroup/${item}`,
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
          if (item.regionName) {
            return {
              regionCode: item.regionCode,
              regionName: item.regionName,
              id: item.id
            };
          } else {
            return {
              dictKey: item.dictKey,
              zhCn: item.zhCn,
              id: item.id
            };
          }
        });
        return dicArr;
      });

      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }

      this.dicFinsh = true;
      // console.log(this.dictionary);
    });
  },
  methods: {
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 147 : 40;
    },
    searchData() {
      this.$emit("filterInfo", this.ruleForm);
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.ruleForm.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;

      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
    },
    citySelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonAreaName = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList;
            return;
          }
          this.dictionary.cantonArea = "";
        }
      );
    },
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
      console.log(this.ruleForm);
    },
    circulatemodeSelect(dic, circulatemodeName, event) {
      this.ruleForm.circulation = this.$refs[
        circulatemodeName
      ][0].$attrs.dictKey;
    },
    demandTypeSelect(dic, demandName, event) {
      this.ruleForm.demand = this.$refs[demandName][0].$attrs.dictKey;
    },
    typeSelect(dic, purchasr_status, event) {
      this.ruleForm.publishStatus = this.$refs[
        purchasr_status
      ][0].$attrs.dictKey;
    },
    resetFilterInfo() {
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
      }
      this.dictionary.cantonCity = "";
      this.dictionary.cantonArea = "";
      this.useDate = "";
      this.$emit("filterInfo", this.ruleForm);
    },
    selectDatarange() {
      //选择日期范围后的回调
      console.log("===this.useDate==", this.useDate);
      if (this.useDate == null) {
        this.ruleForm.issueBeginDate = "";
        this.ruleForm.issueEndDate = "";
      } else {
        this.ruleForm.issueBeginDate = this.useDate[0];
        this.ruleForm.issueEndDate = this.useDate[1];
      }
    },
    clearText() {
      for (let item in this.ruleForm) {
        this.ruleForm[item] = "";
      }
    },
    //原来的判断只能输入数字的方法没有排除汉字,导致汉字可以输入进去
    handleInput(param) {
      if (param == "areaLast") {
        this.ruleForm.areaLast = this.ruleForm.areaLast.replace(/[^\d]/g, "");
      } else if (param == "areaMost") {
        this.ruleForm.areaMost = this.ruleForm.areaMost.replace(/[^\d]/g, "");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.filter_wrap {
  border: 1px solid #e2e2e2;
  padding: 25px;
  padding-bottom: 10px;
  transition: all 0.1s;
}
.switchHeight_box {
  transition: 0.5s;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
.monad {
  display: block;
  width: 48px;
  height: 34px;
  line-height: 36px;
}
.filter_wrap:hover {
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
</style>
<style>
.filter_wrap .el-row {
  margin-bottom: 15px;
}
.el-date-editor.filterDateSelecet {
  width: 100%;
}
.el-date-editor.filterDateSelecet .el-input__prefix .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.el-date-editor.filterDateSelecet .el-input__prefix {
  left: 150px;
}
.el-select.filterRegion .el-input__suffix {
  width: 25px;
  font-size: 16px;
  left: 120px;
  top: 1px;
}
.el-select.filterCirculatemode .el-input__suffix {
  width: 25px;
  font-size: 16px;
  left: 155px;
  top: 1px;
}
.switchHeight_box input {
  /* WebKit browsers */
  color: #666;
}
.switchHeight_box input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999 !important;
}
</style>
