<template>
  <div class="epf_height_box">
    <slot>
      <div
        class="epf_height_act"
        :style="{ height: switchHeight + 'px', overflow: 'hidden' }"
      >
        <el-row :gutter="4">
          <el-col :span="3" >
            <span class="epf_form_title" v-if="transSelect">标的编号 :</span>
            <span class="epf_form_title" v-else>信息标题 :</span>
          </el-col>
          <el-col :span="5">
            <el-input
              size="small"
              v-model="ruleForm.title"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
          <span v-if="!demandSelect">
            <el-col v-if="dicFinsh" :span="3">
              <span class="epf_form_title">流转方式 :</span>
            </el-col>
            <el-col v-if="dicFinsh" :span="5">
              <el-select
                size="small"
                v-model="ruleForm.circulatemodeName"
                placeholder="请选择流转方式"
                @change="
                  mode(dictionary.flow_mode, ruleForm.circulatemodeName, $event)
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
              <span class="epf_form_title">需求类型 :</span>
            </el-col>
            <el-col v-if="dicFinsh" :span="5">
              <el-select
                size="small"
                v-model="ruleForm.demandName"
                placeholder="请选择需求类型"
                @change="
                  types(dictionary.purchasr_demand, ruleForm.demandName, $event)
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
          <el-col :offset="2" :span="4">
            <div class="epf_btn epf_btn_bg epf_not_margin" @click="searchData">
              查询
            </div>
            <div class="epf_btn epf_btn_def" @click="resetFilterInfo">重置</div>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col v-if="dicFinsh||transSelect" :span="3">
            <span class="epf_form_title">行政区域 :</span>
          </el-col>
          <el-col v-if="dicFinsh||transSelect" :span="12">
            <el-col :span="8">
              <el-select
                size="small"
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
            <el-col :span="8">
              <el-select
                size="small"
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
            <el-col :span="8">
              <el-select
                size="small"
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
            <span class="epf_form_title">状态 :</span>
          </el-col>
          <el-col :span="5" v-if="(isFlag && !closeTypeIpt)">
            <el-select
              v-model="ruleForm.typeName"
              placeholder="请选择状态"
              size="small"
              @change="
                states(dictionary.purchasr_status, ruleForm.typeName, $event)
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
              v-model="ruleForm.typeName"
              placeholder="请选择状态"
              size="small"
              @change="
                states(dictionary.purchasr_status, ruleForm.typeName, $event)
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
        <el-row :gutter="4" v-if="!transSelect">
          <el-col :span="3">
            <span class="epf_form_title">发布时间 :</span>
          </el-col>
          <el-col :span="10">
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
          <el-col :span="2">
            <span class="epf_form_title">面积 :</span>
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
            <span class="epf_form_title epf_row_c">--</span>
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
            <span class="monad">平方米</span>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="4">
        <el-col :span="24">
          <span class="switch" @click="flexSwitch">
            {{ flexibleOpen ? "收起搜索" : "高级搜索" }}
            <i
              :class="
                flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "
            ></i>
          </span>
        </el-col>
      </el-row>
    </slot>
  </div>
</template>

<script>
import baseURL1 from "@/util/config.js";
export default {
  props: {
    closeTypeIpt: Boolean,
    demandSelect: Boolean,
    isFlag: Boolean,
    transSelect: Boolean,
  },
  data() {
    return {
      switchHeight: 40,
      flexibleOpen: false,
      useDate: "", //日期范围
      ruleForm: {
        title: "",
        targetNo:"",
        circulation: "", //流转方式：
        circulatemodeName: "",
        demand: "", //需求类型
        demandName: "",
        cantonProvince: "", //省
        cantonProvinceName: "",
        cantonCity: "", //市
        cantonCityName: "",
        cantonArea: "", //区
        cantonAreaName: "",
        publishStatus: "", //状态
        typeName: "",
        issueBeginDate: "",
        issueEndDate: "",
        areaMost: "",
        areaLast: ""
      },
      dicRequest: [
        //字典码请求
        "flow_mode",
        "purchasr_demand",
        "purchasr_status",
        "administrative_regions"
      ],
      dictionary: {
        //字典码结果
        flow_mode: "",
        purchasr_demand: "",
        purchasr_status: [],
        administrative_regions: [],
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
        if (item == "administrative_regions") {
          this.$axios.get(
            `/epf-cms/regionals/getAreaByCodeOrParentId`,
            {
              parentId: "000000"
            },
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
    });
  },
  methods: {
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 161 : 41;
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
      this.cantonArea = "";
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
    mode(dic, circulatemodeName, event) {
      this.ruleForm.circulation = this.$refs[
        circulatemodeName
      ][0].$attrs.dictKey;
    },
    types(dic, demandName, event) {
      this.ruleForm.demand = this.$refs[demandName][0].$attrs.dictKey;
    },
    states(dic, purchasr_status, event) {
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
.monad {
  display: block;
  width: 48px;
  height: 34px;
  line-height: 36px;
  padding: 0 0 0 5px;
}
.switch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}
</style>
