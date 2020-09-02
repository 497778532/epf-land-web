<template>
  <div class="PartybasicInfo_wrap">
    <slot name="PartybasicInfo">
      <div class="epf_proess">
        <span class="epf_proess_title">{{ signRecordtype }}合同服务</span>
        <div class="epf_proess_cont">
          <epf-step :active="1" :data="['甲乙双方基本信息','地块基本信息','完成']"></epf-step>
        </div>
      </div>
      <div class="publishTra_main">
        <div v-if="signRecordtype !== null">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <!-- 甲方基本信息 -->
            <epf-switchTitle
              titles_h="甲方基本信息"
              padding="0px"
              background="#fff"
              height="80px"
              :shutOff="false"
            ></epf-switchTitle>
            <div
              class="publishTra_main_cont publish_mainUl"
              v-if="signRecordtype !== null"
            >
              <el-form-item
                :label="'甲方（' + signRecordtype + '方）：'"
                prop="firstParty"
                style="width:96%"
              >
                <el-input
                  v-model="ruleForm.firstParty"
                  placeholder="请输入甲方名称"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="甲方证件类型："
                :style="{ width: formLabelWidth }"
                prop="firstIdentificationType"
              >
                <el-select
                  v-model="ruleForm.firstIdentificationTypeName"
                  @change="
                    firstClassUseSelect(
                      issueSell,
                      ruleForm.firstIdentificationTypeName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in issueSell"
                    :ref="item.zhCn"
                    :dictKey="item.dictKey"
                    :id="item.id"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="甲方证件号："
                prop="firstIdentificationNum"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.firstIdentificationNum"
                  :placeholder="
                    ruleForm.firstIdentificationTypeName &&
                    ruleForm.firstIdentificationTypeName == '身份证'
                      ? '请输入甲方身份证号'
                      : '请输入甲方统一社会信用代码'
                  "
                ></el-input>
              </el-form-item>
              <!-- prop="firstLegalPerson" -->
              <el-form-item
                label="法定代表人："
                prop="firstLegalPerson"
                :style="{ width: formLabelWidth }"
                v-if="ruleForm.firstIdentificationType == 'business_license'"
              >
                <el-input
                  v-model="ruleForm.firstLegalPerson"
                  placeholder="请输入法定代表人"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="法人身份证号："
                prop="firstLegalPersonIdNum"
                :style="{ width: formLabelWidth }"
                v-if="ruleForm.firstIdentificationType == 'business_license'"
              >
                <el-input
                  v-model="ruleForm.firstLegalPersonIdNum"
                  placeholder="请输入法人身份证号"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="委托代理人："
                prop="firstAgentPerson"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.firstAgentPerson"
                  placeholder="请输入委托代理人"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="身份证号："
                prop="firstAgentPersonIdNum"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.firstAgentPersonIdNum"
                  placeholder="请输入委托代理人身份证号"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="甲方联系电话："
                prop="firstPhone"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.firstPhone"
                  placeholder="请输入甲方联系电话"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="甲方联系地址："
                prop="firstAddress"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.firstAddress"
                  placeholder="请输入甲方联系地址"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 乙方基本信息 -->
            <epf-switchTitle
              titles_h="乙方基本信息"
              padding="0px"
              background="#fff"
              height="80px"
              :shutOff="false"
            ></epf-switchTitle>
            <div
              class="publishTra_main_cont"
              v-if="secondsignRecordtype !== null"
            >
              <el-form-item
                :label="'乙方（' + secondsignRecordtype + '）：'"
                prop="secondParty"
                style="width:96%"
              >
                <el-input
                  v-model="ruleForm.secondParty"
                  placeholder="请输入乙方名称"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="乙方证件类型："
                prop="secondIdentificationType"
                :style="{ width: formLabelWidth }"
              >
                <el-select
                  v-model="ruleForm.secondIdentificationTypeName"
                  @change="
                    secondClassUseSelect(
                      issueSell,
                      ruleForm.secondIdentificationTypeName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="item in issueSell"
                    :ref="item.zhCn"
                    :dictKey="item.dictKey"
                    :id="item.id"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="乙方证件号："
                prop="secondIdentificationNum"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondIdentificationNum"
                  :placeholder="
                    ruleForm.secondIdentificationTypeName &&
                    ruleForm.secondIdentificationTypeName == '身份证'
                      ? '请输入乙方身份证号'
                      : '请输入乙方统一社会信用代码'
                  "
                ></el-input>
              </el-form-item>

              <el-form-item
                label="法定代表人："
                prop="secondLegalPerson"
                v-if="ruleForm.secondIdentificationType == 'business_license'"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondLegalPerson"
                  placeholder="请输入法定代表人"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="法人身份证号："
                prop="secondLegalPersonIdNum"
                v-if="ruleForm.secondIdentificationType == 'business_license'"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondLegalPersonIdNum"
                  placeholder="请输入法人身份证号"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="委托代理人："
                prop="secondAgentPerson"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondAgentPerson"
                  placeholder="请输入委托代理人"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="身份证号："
                prop="secondAgentPersonIdNum"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondAgentPersonIdNum"
                  placeholder="请输入委托代理人身份证号"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="乙方联系电话："
                prop="secondPhone"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondPhone"
                  placeholder="请输入乙方联系电话"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="乙方联系地址："
                prop="secondAddress"
                :style="{ width: formLabelWidth }"
              >
                <el-input
                  v-model="ruleForm.secondAddress"
                  placeholder="请输入乙方联系地址"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="operation">
          <div class="epf_btn epf_btn_bg" style="width:82px;" @click="next('ruleForm')">下一步</div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapState, mapActions } from "vuex";
import Axios from "axios";
export default {
  data() {
    let j_num = (rule, value, callback) => {
      console.log(rule);
      console.log(value);
      console.log(callback);
      let reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      // let reg1 = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/;
      //				let reg2 = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/
      let reg2 = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
      if (!this.ruleForm.firstIdentificationTypeName) {
        callback(new Error("请选择证件类型"));
      } else if (this.ruleForm.firstIdentificationTypeName == "营业执照") {
        if (!reg2.test(value)) {
          console.log("营业执照");
          callback(new Error("您输入的证件号有误"));
        } else {
          callback();
        }
      } else if (this.ruleForm.firstIdentificationTypeName == "身份证") {
        if (
          !reg1.test(value) ||
          (value.substr(10, 2) == "02" && value.substr(12, 2) >= "30") ||
          (value.substr(10, 2) == "04" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "06" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "08" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "09" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "11" && value.substr(12, 2) > "30")
        ) {
          console.log("身份证");
          callback(new Error("您输入的格式有误，例：140721199111250223"));
        } else {
          callback();
        }
      }
    };
    let j_num2 = (rule, value, callback) => {
      let reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      // let reg1 = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/;
      //				let reg2 = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/
      let reg2 = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
      if (!this.ruleForm.secondIdentificationTypeName) {
        callback(new Error("请选择证件类型"));
      } else if (this.ruleForm.secondIdentificationTypeName == "营业执照") {
        if (!reg2.test(value)) {
          console.log("营业执照");
          callback(new Error("您输入的证件号有误"));
        } else {
          callback();
        }
      } else if (this.ruleForm.secondIdentificationTypeName == "身份证") {
        if (
          !reg1.test(value) ||
          (value.substr(10, 2) == "02" && value.substr(12, 2) >= "30") ||
          (value.substr(10, 2) == "04" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "06" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "08" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "09" && value.substr(12, 2) > "30") ||
          (value.substr(10, 2) == "11" && value.substr(12, 2) > "30")
        ) {
          console.log("身份证");
          callback(new Error("您输入的格式有误，例：140721199111250223"));
        } else {
          callback();
        }
      }
    };
    let j_num3 = (rule, value, callback) => {
      let reg1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      // let reg1 = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/;
      if (
        !reg1.test(value) ||
        (value.substr(10, 2) == "02" && value.substr(12, 2) >= "30") ||
        (value.substr(10, 2) == "04" && value.substr(12, 2) > "30") ||
        (value.substr(10, 2) == "06" && value.substr(12, 2) > "30") ||
        (value.substr(10, 2) == "08" && value.substr(12, 2) > "30") ||
        (value.substr(10, 2) == "09" && value.substr(12, 2) > "30") ||
        (value.substr(10, 2) == "11" && value.substr(12, 2) > "30")
      ) {
        callback(new Error("您输入的证件号有误"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "48%",
      disabled: false,
      signRecordtype: "出租",
      secondsignRecordtype: "承租方",
      issueSell: [],
      disabledType: 0, //禁用状态
      contractStatus: "",
      ruleForm: {
        fileId: "",
        relevanceCode: "",
        firstIdentificationTypeName: "",
        secondIdentificationTypeName: "",
        contractTypeState: "出租合同",
        contractType: "transfer",
        // 签订方式：
        signTypeState: "在线签订",
        signType: "online",
        // 甲方
        firstParty: "",
        // 甲方证件类型
        firstIdentificationType: "",
        // 甲方证件号
        firstIdentificationNum: "",
        // 法定代表人:
        firstLegalPerson: "",
        // 法人身份证号
        firstLegalPersonIdNum: "",
        // 委托代理人
        firstAgentPerson: "",
        // 委托代理人身份证号
        firstAgentPersonIdNum: "",
        // 甲方联系电话:
        firstPhone: "",
        // 甲方联系地址：
        firstAddress: "",
        // 乙方
        secondParty: "",
        // 乙方证件类型
        secondIdentificationType: "",
        // 乙方证件号
        secondIdentificationNum: "",
        // 法定代表人:
        secondLegalPerson: "",
        // 法人身份证号
        secondLegalPersonIdNum: "",
        // 委托代理人
        secondAgentPerson: "",
        // 委托代理人身份证号
        secondAgentPersonIdNum: "",
        // 乙方联系电话:
        secondPhone: "",
        // 乙方联系地址：
        secondAddress: ""
      },
      rules: {
        firstParty: [
          {
            required: true,
            message: "请输入甲方名称",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        firstIdentificationType: [
          {
            required: true,
            message: "请选择甲方证件类型"
          }
        ],
        firstIdentificationNum: [
          {
            required: true,
            message: "请输入甲方证件号",
            trigger: "blur"
          },
          {
            validator: j_num
          }
        ],
        firstLegalPerson: [
          {
            required: true,
            message: "请输入法定代表人",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        firstLegalPersonIdNum: [
          {
            required: true,
            message: "请输入法人身份证号",
            trigger: "blur"
          },
          // {
          //   pattern: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
          //   message: "您输入的证件号有误"
          // },
          {
            validator: j_num3
          }
        ],
        firstAgentPerson: [
          {
            message: "请输入委托代理人",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        firstAgentPersonIdNum: [
          {
            pattern: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
            message: "您输入的证件号有误"
          }
        ],
        firstPhone: [
          {
            required: true,
            message: "请输入甲方联系电话",
            trigger: "blur"
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ],
        firstAddress: [
          {
            required: true,
            message: "请输入甲方联系地址",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        secondParty: [
          {
            required: true,
            message: "请输入乙方名称",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        secondIdentificationType: [
          {
            required: true,
            message: "请选择乙方证件类型"
          }
        ],
        secondIdentificationNum: [
          {
            required: true,
            message: "请输入乙方证件号",
            trigger: "blur"
          },
          {
            validator: j_num2
          }
        ],
        secondLegalPerson: [
          {
            required: true,
            message: "请输入法定代表人",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        secondLegalPersonIdNum: [
          {
            required: true,
            message: "请输入法人身份证号",
            trigger: "blur"
          },
          // {
          //   pattern: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
          //   message: "您输入的证件号有误"
          // },
          {
            validator: j_num3
          }
        ],
        secondAgentPerson: [
          {
            message: "请输入委托代理人",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        secondAgentPersonIdNum: [
          {
            pattern: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
            message: "您输入的证件号有误"
          }
        ],
        secondPhone: [
          {
            required: true,
            message: "请输入乙方联系电话",
            trigger: "blur"
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ],
        secondAddress: [
          {
            required: true,
            message: "请输入乙方联系地址",
            trigger: "blur"
          },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ]
      }
    };
  },
  created() {
    this.ruleForm.relevanceCode = this.$route.query.relevanceCode;
    this.signRecordtype = this.$route.query.signRecordtype;
    this.ruleForm.contractType = this.$route.query.signRecord;

    if (this.$route.query.transactype == "自行交易") {
      this.ruleForm.signType = "transaction_mode-002";
    } else {
      this.ruleForm.signType = "transaction_mode-001";
    }
    if (this.$route.query.signRecordtype === "转让") {
      this.secondsignRecordtype = "受让方";
      this.ruleForm.contractTypeState = "转让合同";
    } else if (this.$route.query.signRecordtype === "出租") {
      this.secondsignRecordtype = "承租方";
      this.ruleForm.contractTypeState = "出租合同";
    } else if (this.$route.query.signRecordtype === "抵押") {
      this.secondsignRecordtype = "抵押权人";
      this.ruleForm.contractTypeState = "抵押合同";
    }

    let token = localStorage.getItem("token");
    axios
      .get(
        "/api/epf-admin/admin/dict/getDictEbyDictGroup/certifiate_type",
        qs.stringify({
          token: token
        })
      )
      .then(res => {
        if (res.data.code == "0") {
          this.issueSell = res.data.dictionariesList;
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    if (this.$store.state.contract && this.$store.state.contract != {}) {
      this.ruleForm = this.$store.state.contract;
      if (this.ruleForm.isUnion == 0 && this.ruleForm.tSellId) {
        this.disabledType = 1;
      } else {
        this.disabledType = 0;
      }
    } else if (this.$route.query.contractId) {
      //合同编辑修改ID
      // this.ruleForm = {};
      // this.$store.state.LandbasicInfo = null;
      console.log("======this.ruleForm========", this.ruleForm);
      this.disabledType = 0;
      let parmas = {
        token: token,
        contractId: this.$route.query.contractId
      };
      this.init(parmas);
    } else if (this.$route.query.landId) {
      //选择了关联的地块
      this.disabledType = 1;
      let parmas = {
        token: token,
        id: this.$route.query.landId
      };
      if (this.$route.query.transactype === "自行交易") {
        this.getTSellByContractAndById(parmas);
      }
      if (this.$route.query.transactype === "委托交易") {
        this.getTransGoodsByCirculationAndById(parmas);
      }
    } else {
      //未选择关联的地块
      this.disabledType = 0;
      if (this.ruleForm.fileId && this.ruleForm.fileId !== "") {
        this.ruleForm.fileId = this.ruleForm.fileId;
      } else {
        this.$axios.get("/epf-landweb/api/createId", {}, res => {
          this.ruleForm.fileId = res.id;
        });
      }
    }
  },
  methods: {
    // 编辑
    init(parmas) {
      // this.ruleForm = {};
      this.$axios.post(
        // "/epf-contract/transContract/selectOne",
        "/epf-landweb/transContract/selectOne",
        qs.stringify(parmas),
        res => {
          if (res.code == "0000") {
            // this.ruleForm = res.data.list[0];
            // this.$store.state.LandbasicInfo = res.data.list[0];
            for (let item in this.ruleForm) {
              this.ruleForm[item] = res.data.list[0][item];
            }

            //							去除乙方地址空格和/
            this.ruleForm.secondAddress = this.ruleForm.secondAddress.replace(
              /\s+/g,
              ""
            );
            this.ruleForm.secondAddress = this.ruleForm.secondAddress.replace(/\//g,'');

            this.contractStatus = res.data.list[0].contractStatus;
            if (this.ruleForm.fileId && this.ruleForm.fileId !== "") {
              this.ruleForm.fileId = this.ruleForm.fileId;
            } else {
              this.$axios.get("/epf-landweb/api/createId", {}, res => {
                this.ruleForm.fileId = res.id;
              });
            }
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 自行交易----选择了关联的地块
    getTSellByContractAndById(parmas) {
      this.$axios.get(
        "/epf-landweb/admin/tsell/getTSellByContractAndById",
        parmas,
        res => {
          this.ruleForm = Object.assign(this.ruleForm, res.data);
          if (this.ruleForm.fileId && this.ruleForm.fileId !== "") {
            this.ruleForm.fileId = this.ruleForm.fileId;
          } else {
            this.$axios.get("/epf-landweb/api/createId", {}, res => {
              this.ruleForm.fileId = res.id;
            });
          }
        }
      );
    },
    // 委托交易----选择了关联的地块
    getTransGoodsByCirculationAndById(parmas) {
      this.$axios.get(
        "/epf-landweb/landweb/transgoods/getTransGoodsByCirculationAndById",
        parmas,
        res => {
          this.ruleForm = Object.assign(this.ruleForm, res.data);
          this.ruleForm.secondAddress = this.ruleForm.secondAddress.replace(
            /\s+/g,
            ""
          );
          this.ruleForm.secondAddress = this.ruleForm.secondAddress.replace(/\//g,'');
          if (this.ruleForm.fileId && this.ruleForm.fileId !== "") {
            this.ruleForm.fileId = this.ruleForm.fileId;
          } else {
            this.$axios.get("/epf-landweb/api/createId", {}, res => {
              this.ruleForm.fileId = res.id;
            });
          }
        }
      );
    },
    // 甲方证件类型
    firstClassUseSelect(dic, value, event) {
      this.ruleForm.firstIdentificationType = this.$refs[
        value
      ][0].$attrs.dictKey;
    },
    // 乙方证件类型
    secondClassUseSelect(dic, value, event) {
      this.ruleForm.secondIdentificationType = this.$refs[
        value
      ][0].$attrs.dictKey;
    },
    // 下一步
    next(formName) {
      let contact = this.ruleForm;
      if (this.$route.query.landId) {
        //选择了关联的地块
        contact["isUnion"] = 0;
        contact["tSellId"] = this.$route.query.landId;
      } else if (this.$route.query.contractId) {
        //修改
      } else {
        contact["isUnion"] = 1;
        contact["channel"] = "deal";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.contract = this.ruleForm;
          console.log(this.ruleForm);
          if (this.$route.query.contractId) {
            this.$router.push({
              path: "/OnlineContractHome/LandbasicInfo",
              query: {
                signRecord: this.$route.query.signRecord,
                contractId: this.$route.query.contractId,
                signRecordtype: this.$route.query.signRecordtype,
                fileId: this.ruleForm.fileId,
                contractStatus: this.contractStatus,
                //									甲方信息
                firstParty: this.ruleForm.firstParty,
                firstIdentificationNum: this.ruleForm.firstIdentificationNum,
                firstIdentificationType: this.ruleForm.firstIdentificationType,
                firstLegalPerson: this.ruleForm.firstLegalPerson,
                firstLegalPersonIdNum: this.ruleForm.firstLegalPersonIdNum,
                firstAgentPerson: this.ruleForm.firstAgentPerson,
                firstAgentPersonIdNum: this.ruleForm.firstAgentPersonIdNum,
                firstPhone: this.ruleForm.firstPhone,
                firstAddress: this.ruleForm.firstAddress,

                //									乙方信息
                secondParty: this.ruleForm.secondParty,
                secondIdentificationNum: this.ruleForm.secondIdentificationNum,
                secondIdentificationType: this.ruleForm
                  .secondIdentificationType,
                secondLegalPerson: this.ruleForm.secondLegalPerson,
                secondLegalPersonIdNum: this.ruleForm.secondLegalPersonIdNum,
                secondAgentPerson: this.ruleForm.secondAgentPerson,
                secondAgentPersonIdNum: this.ruleForm.secondAgentPersonIdNum,
                secondPhone: this.ruleForm.secondPhone,
                secondAddress: this.ruleForm.secondAddress
              }
            });
          } else if (this.$route.query.landId) {
            this.$router.push({
              path: "/OnlineContractHome/LandbasicInfo",
              query: {
                landId: this.$route.query.landId,
                signRecord: this.$route.query.signRecord,
                signRecordtype: this.$route.query.signRecordtype,
                transactype: this.$route.query.transactype,
                fileId: this.ruleForm.fileId,
                contractStatus: this.contractStatus,
                //									甲方信息
                firstParty: this.ruleForm.firstParty,
                firstIdentificationNum: this.ruleForm.firstIdentificationNum,
                firstIdentificationType: this.ruleForm.firstIdentificationType,
                firstLegalPerson: this.ruleForm.firstLegalPerson,
                firstLegalPersonIdNum: this.ruleForm.firstLegalPersonIdNum,
                firstAgentPerson: this.ruleForm.firstAgentPerson,
                firstAgentPersonIdNum: this.ruleForm.firstAgentPersonIdNum,
                firstPhone: this.ruleForm.firstPhone,
                firstAddress: this.ruleForm.firstAddress,
                //									乙方信息
                secondParty: this.ruleForm.secondParty,
                secondIdentificationNum: this.ruleForm.secondIdentificationNum,
                secondIdentificationType: this.ruleForm.secondIdentificationType,
                secondLegalPerson: this.ruleForm.secondLegalPerson,
                secondLegalPersonIdNum: this.ruleForm.secondLegalPersonIdNum,
                secondAgentPerson: this.ruleForm.secondAgentPerson,
                secondAgentPersonIdNum: this.ruleForm.secondAgentPersonIdNum,
                secondPhone: this.ruleForm.secondPhone,
                secondAddress: this.ruleForm.secondAddress
              }
            });
          } else {
            this.$router.push({
              path: "/OnlineContractHome/LandbasicInfo",
              query: {
                landId: this.$route.query.landId,
                signRecord: this.$route.query.signRecord,
                signRecordtype: this.$route.query.signRecordtype,
                transactype: this.$route.query.transactype,
                fileId: this.ruleForm.fileId,
                contractStatus: this.contractStatus,
                //									甲方信息
                firstParty: this.ruleForm.firstParty,
                firstIdentificationNum: this.ruleForm.firstIdentificationNum,
                firstIdentificationType: this.ruleForm.firstIdentificationType,
                firstLegalPerson: this.ruleForm.firstLegalPerson,
                firstLegalPersonIdNum: this.ruleForm.firstLegalPersonIdNum,
                firstAgentPerson: this.ruleForm.firstAgentPerson,
                firstAgentPersonIdNum: this.ruleForm.firstAgentPersonIdNum,
                firstPhone: this.ruleForm.firstPhone,
                firstAddress: this.ruleForm.firstAddress,
                //									乙方信息
                secondParty: this.ruleForm.secondParty,
                secondIdentificationNum: this.ruleForm.secondIdentificationNum,
                secondIdentificationType: this.ruleForm
                  .secondIdentificationType,
                secondLegalPerson: this.ruleForm.secondLegalPerson,
                secondLegalPersonIdNum: this.ruleForm.secondLegalPersonIdNum,
                secondAgentPerson: this.ruleForm.secondAgentPerson,
                secondAgentPersonIdNum: this.ruleForm.secondAgentPersonIdNum,
                secondPhone: this.ruleForm.secondPhone,
                secondAddress: this.ruleForm.secondAddress
              }
            });
          }
        } else {
          this.$message.error("请检查您的信息是否填写完整");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul .el-input {
  // margin-left: -114px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.publishTra_main {
  @include size(1200px, auto);
  margin-bottom: 25px;
  background: #fff;
  &_cont {
    box-sizing: border-box;
    @include size(100%, auto);
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;
    .publish_mainUl {
      li {
        @include size(46%, auto);
        line-height: 50px;
        min-height: 50px;
        margin-left: 2%;
      }
    }
  }
  .operation {
    margin-top: 20px;
    margin-left: 206px;
    padding-bottom: 30px;
  }
}
</style>
