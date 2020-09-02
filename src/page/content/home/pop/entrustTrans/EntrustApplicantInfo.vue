<template>
  <div style="background: #f2f1f9;">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="EntrustTra_wrap">
        <div v-if="!detail" class="epf_proess">
          <span class="epf_proess_title">申请委托交易</span>
          <div class="epf_proess_cont">
            <epf-step :active="2" :data="['委托机构及土地基本信息','申请人基本信息','附件清单']"></epf-step>
          </div>
        </div>
        <div class="EntrustTra_main">
          <epf-switchTitle
            titles_h="申请人信息"
            padding="0px"
            background="#fff"
            height="80px"
            :shutOff="false"
          >
          </epf-switchTitle>
          <div class="EntrustTra_main_cont">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="204px"
              class="demo-ruleForm"
              v-if="dicFinsh"
            >
              <el-form-item label="权属人性质：" prop="ownerShipNature">
                <el-select
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.ownerShipNature"
                  :placeholder="dictionary.tans_owner_type[0].zhCn"
                  style="width:157px;"
                  @change="ownerShipNatureSelect()"
                >
                  <el-option
                    v-for="item in dictionary.tans_owner_type"
                    :label="item.zhCn"
                    :value="item.dictKey"
                    :key="item.zhCn"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称：" prop="ownerShip">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.ownerShip"
                  style="width:491px;"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="证件种类：" prop="identificationType">
                <el-select
                  v-model="ruleForm.identificationType"
                  :placeholder="dictionary.certifiate_type[0].zhCn"
                  style="width:157px;"
                  :disabled="idFlag"
                >
                  <el-option
                    v-for="item in dictionary.certifiate_type"
                    :label="item.zhCn"
                    :value="item.dictKey"
                    :key="item.zhCn"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="证件号：" prop="identificationNum">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.identificationNum"
                  style="width:491px;"
                  placeholder="请输入证件号"
                ></el-input>
              </el-form-item>

              <el-form-item label="地址：" prop="address">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.address"
                  style="width:491px;"
                  placeholder="请输入地址"
                ></el-input>
              </el-form-item>
              <el-form-item label="权属人联系电话：" prop="phone">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.phone"
                  style="width:491px;"
                  placeholder="请输入权属人联系电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人：" prop="contact">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.contact"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人身份证：" prop="contactsID">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.idCard"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人身份证"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人联系电话：" prop="contactPhone">
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.contactPhone"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人联系电话"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="联系人/代理人联系地址："
                prop="contactAddress"
              >
                <el-input
                  :disabled="disabledType == 1 ? true : false"
                  v-model="ruleForm.contactAddress"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人联系地址"
                ></el-input>
              </el-form-item>
              <!-- style="background:#fff;color:#555;border:1px solid #c9c9c9;" -->
              <el-form-item>
                <div
                  class="epf_btn epf_btn_def"
                  
                  @click="back"
                >
                  {{ detail ? "上一页" : "上一步" }}
                </div>
                <div class="epf_btn epf_btn_bg" style="margin-left:50px;" @click="submitForm('ruleForm')">
                  {{ detail ? "下一页" : "下一步" }}
                </div>
              </el-form-item>
              <!-- <el-form-item>
                  <el-button  style="margin-left:100px;" type="warning" @click="submitForm('ruleForm')">下一步</el-button>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let contactsIDFunction = (rule, value, callback) => {
      if (this.ruleForm.idCard) {
        // 15位数验证
        let reg_1 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
        // 18位数验证
        let reg_2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (
          !(
            reg_1.test(this.ruleForm.idCard) || reg_2.test(this.ruleForm.idCard)
          )
        ) {
          callback(new Error("您输入的格式有误，例：140721199111250223"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    let identificationNumFunction = (rule, value, callback) => {
      console.log(this.ruleForm.identificationType);
      if (this.ruleForm.identificationType == "card_id") {
        // 15位数验证
        let reg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
          // 18位数验证
          reg2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!(reg.test(value) || reg2.test(value))) {
          callback(new Error("您输入的格式有误，例：140721199111250223"));
        } else {
          callback();
        }
      } else if (this.ruleForm.identificationType == "business_license") {
        // 15位数或者18位数
        //新需求现在只要18位校验,15位的不要了
        let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
        if (!reg.test(value)) {
          callback(new Error("营业执照号不正确！"));
        } else {
          callback();
        }
      }
    };
    return {
      idFlag: false,
      detail: false,
      location: [
        { path: "/", name: "首页" },
        { path: null, name: "委托交易" }
      ],
      active: 0,
      disabledType: 0, //禁用状态
      ruleForm: {
        id: "",
        trustOrgId: "",
        trustOrgName: "",
        trustTitle: "",
        ownerShipNature: "", //权属人性质
        ownerShip: "", //权属人名字
        identificationType: "", //证件种类
        identificationNum: "", //证件号
        address: "", //地址
        phone: "", //权属人联系电话
        contact: "", //联系人/代理人姓名
        idCard: "", //联系人/代理人身份证号
        contactPhone: "", //联系人/代理人电话
        contactAddress: "" //联系人/代理人地址
      },
      rules: {
        ownerShipNature: [
          { required: true, message: "请选择权属人性质：", trigger: "change" }
        ],
        ownerShip: [
          { required: true, message: "请输入姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
          // { pattern: /^[\u4e00-\u9fa5]{0,}$/,message: '只能输入中文'}
        ],
        identificationNum: [
          //身份证
          { required: true, message: "请输入证件号", trigger: "blur" },
          { validator: identificationNumFunction }
        ],
        contactsID: [
          //身份证
          { required: false, trigger: "blur" },
          { validator: contactsIDFunction }
        ],
        identificationType: [
          { required: true, message: "请选择证件种类", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入联系地址" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        phone: [
          { required: true, message: "请输入电话号码" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            // pattern: /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ],
        contact: [
          { required: true, message: "联系人/代理人姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        idCard: [
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
            message: "您输入的格式有误，例：140721199111250223"
          }
        ],
        contactPhone: [
          { required: true, message: "请输入联系人/代理人联系电话" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            // pattern: /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/,
            message: "您输入的格式有误，例：18569693322或0351-6336221"
          }
        ],
        contactAddress: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ]
      },
      dicRequest: ["tans_owner_type", "certifiate_type"], //字典码请求
      dictionary: {
        //字典码结果
        tans_owner_type: "",
        certifiate_type: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false //接口请求完成
    };
  },
  created() {
    window.scrollTo(0, 120);
    this.$store.state.transTrustInfo = this.ruleForm;
    if (this.$route.query.detail) {
      this.location[1].name = "委托交易详情";
    } else {
      this.location[1].name = "委托交易";
    }
    if (this.$store.state.entrustland) {
      this.ruleForm = this.$store.state.entrustland;
      console.log("已填", this.ruleForm);
    }
    if (this.$route.query.id) {
      this.disabledType = 1;
      this.ruleForm = this.$store.state.entrustland;
      // this.$axios.get("/epf-supply/api/createId", {}, res => {
      //   this.ruleForm.id = res.id;
      // });
    } else if (this.$route.query.tgId) {
      console.log(this.$store.state.entrustland);

      if (
        this.$store.state.entrustland.isUnion == 0 &&
        this.$store.state.entrustland.tSellId
      ) {
        this.disabledType = 1;
      } else {
        this.disabledType = 0;
      }
      if (this.$route.query.detail) {
        this.disabledType = 1;
        this.disabledType1 = true;
      }
      for (let item in this.ruleForm) {
        this.ruleForm[item] = this.$store.state.entrustland[item];
      }
      this.ruleForm.id = this.$store.state.entrustland.transTrustInfoId;
    } else {
      this.disabledType = 0;
    }
    //调用字典码相关接口
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        this.$axios.get(
          `/epf-admin/dictionaries/getDictEbyDictGroup/${item}`,
          {},
          res => {
            resolve(res);
          }
        );
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn
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
    this.ownerShipNatureSelect();
  },
  methods: {
    submitForm(formName) {
      let transTrustInfo = this.$store.state.transTrustInfo;
      for (let item in transTrustInfo) {
        transTrustInfo[item] = this.ruleForm[item];
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let entrustland = Object.assign(
            this.$store.state.entrustland,
            this.ruleForm
          );
          this.$store.state.entrustland = entrustland;
          if (this.$route.query.id) {
            this.$router.push({
              path: "/EntrustAttachmentInfoList",
              query: {
                id: this.$route.query.id,
                publishLandtype: this.$route.query.publishLandtype,
                disabledType: this.disabledType
              }
            });
          } else if (this.$route.query.tgId) {
            if (this.$route.query.detail) {
              this.$router.push({
                path: "/EntrustAttachmentInfoList",
                query: {
                  tgId: this.$route.query.tgId,
                  publishLandtype: this.$route.query.publishLandtype,
                  detail: this.$route.query.detail,
                  disabledType: this.disabledType
                }
              });
            } else {
              this.$router.push({
                path: "/EntrustAttachmentInfoList",
                query: {
                  tgId: this.$route.query.tgId,
                  publishLandtype: this.$route.query.publishLandtype,
                  disabledType: this.disabledType
                }
              });
            }
          } else {
            this.$router.push({
              path: "/EntrustAttachmentInfoList",
              query: {
                publishLandtype: this.$route.query.publishLandtype,
                disabledType: this.disabledType
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      console.log(this.$route.query);
      this.$router.push({path:"/EntrustTransHome",query:this.$route.query})
    },
    ownerShipNatureSelect() {
      if (
        this.ruleForm.ownerShipNature != "" &&
        this.ruleForm.ownerShipNature != null
      ) {
        this.idFlag = true;
        if (this.ruleForm.ownerShipNature == "personage1") {
          this.ruleForm.identificationType = "card_id";
        } else {
          this.ruleForm.identificationType = "business_license";
        }
      } else {
        this.idFlag = false;
      }
    }
  },
  watch: {
    '$route':'back'
    },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.EntrustTra_main {
  @include size(1200px, auto);
  margin-bottom: 25px;
  background: #fff;
  &_cont {
    box-sizing: border-box;
    padding: 0px 120px 30px 120px;
  }
}
</style>
