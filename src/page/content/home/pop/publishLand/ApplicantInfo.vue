<template>
  <div style="background: #f2f1f9;">
    <div class="win1200">
      <epf-lePage :location="location"></epf-lePage>
      <div class="publishTra_wrap">
        <div class="epf_proess">
          <span class="epf_proess_title">发布{{ publishLandtype }}地源</span>
          <div class="epf_proess_cont">
            <epf-step :active="2" :data="['土地基本信息','申请人基本信息','附件清单']"></epf-step>
          </div>
        </div>
        <div class="publishTra_main">
          <epf-switchTitle titles_h='申请人信息' 
            padding='0px' 
            background='#fff'
            height='80px'
            :shutOff='false'>
          </epf-switchTitle>
          <div class="publishTra_main_cont">
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
                  v-model="ruleForm.ownerShipNature"
                  placeholder="请选择权属人性质"
                  style="width:170px;"
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
              <el-form-item
                :label="ruleForm.ownerShipNature=='personage1'?'姓名：':'名称：'"
                prop="ownerShip"
              >
                <el-input
                  v-model="ruleForm.ownerShip"
                  style="width:491px;"
                  :placeholder="ruleForm.ownerShipNature=='personage1'?'请输入姓名':'请输入名称'"
                ></el-input>
              </el-form-item>
              <el-form-item label="证件种类：" prop="identificationType">
                <el-select
                  v-model="ruleForm.identificationType"
                  placeholder="请选择证件种类"
                  style="width:170px;"
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
                  v-model="ruleForm.identificationNum"
                  style="width:491px;"
                  placeholder="请输入证件号"
                ></el-input>
              </el-form-item>
              <el-form-item label="地址：" prop="address">
                <el-input v-model="ruleForm.address" style="width:491px;" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="权属人联系电话：" prop="phone">
                <el-input v-model="ruleForm.phone" style="width:491px;" placeholder="请输入权属人联系电话"></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人：" prop="contact">
                <el-input v-model="ruleForm.contact" style="width:491px;" placeholder="请输入联系人/代理人"></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人身份证号：" prop="idCard">
                <el-input
                  v-model="ruleForm.idCard"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人身份证"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人联系电话：" prop="contactPhone">
                <el-input
                  v-model="ruleForm.contactPhone"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人联系电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人/代理人联系地址：" prop="contactAddress">
                <el-input
                  v-model="ruleForm.contactAddress"
                  style="width:491px;"
                  placeholder="请输入联系人/代理人联系地址"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="epf_btn epf_btn_def" style="width:82px;" @click="back">上一步</div>
                <div class="epf_btn epf_btn_bg" style="width:82px;margin-left:50px;" @click="submitForm('ruleForm')">下一步</div>
              </el-form-item>
              <!-- <el-form-item>
                    <el-button  style="margin-left:100px;" type="warning" @click="submitForm('ruleForm')">下一步</el-button>
              </el-form-item>-->
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
    let identificationNumFunction = (rule, value, callback) => {
      console.log(this.ruleForm.identificationType);
      if (this.ruleForm.identificationType == "card_id") {
        // 15位数验证
        // let reg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
        // let reg = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/,
        // 18位数验证
        // let  reg2 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        let  reg2 =/^[1-9]\d{5}(((1[89]|20)\d{2}(((0[13578]|1[0-2])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((((1[89]|20)(0[48]|[2468][048]|[13579][26]))|((19|20)00))0229))\d{3}(\d|X|x)$/
        if (!reg2.test(value)) {
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
      location: [{ path: "/", name: "首页" }, { path: null, name: "发布地源" }],
      active: 0,
      ruleForm: {
        ownerShipNature: "", //权属人性质
        ownerShip: "", //权属人名字
        identificationType: "", //证件种类
        identificationNum: "", //证件号
        address: "", //地址
        phone: "", //权属人联系电话
        contact: "", //联系人/代理人姓名
        idCard: "", //联系人/代理人身份证号
        contactPhone: "", //联系人/代理人电话
        contactAddress: "", //联系人/代理人地址
        circulation: ""
      },
      rules: {
        ownerShipNature: [
          { required: true, message: "请选择权属人性质：", trigger: "change" },
        ],
        ownerShip: [
          { required: true, message: "姓名或名称不能为空" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
          // { pattern: /^[\u4e00-\u9fa5][\u4E00-\u9FA5\·]{0,}$/,message: '只能输入中文'}
        ],
        identificationNum: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { validator: identificationNumFunction }
        ],
        identificationType: [
          { required: true, message: "请选择证件种类", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入联系地址" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message: "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
            // pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
        ],
        phone: [
          { required: true, message: "请输入电话号码" },
          // { pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/},
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,message: "您输入的格式有误，例：18569693322或0351-6336221"},
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
            pattern: /^[1-9]\d{5}(((1[89]|20)\d{2}(((0[13578]|1[0-2])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((((1[89]|20)(0[48]|[2468][048]|[13579][26]))|((19|20)00))0229))\d{3}(\d|X|x)$/,
            message: "您输入的格式有误，例：140721199111250223",
          },
          // { validator: identificationNumFunction }
        ],
        contactPhone: [
          { required: true, message: "请输入联系人/代理人联系电话" },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,message: "您输入的格式有误，例：18569693322或0351-6336221"},
        ],
        contactAddress: [
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message: "可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
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
      dicFinsh: false, //接口请求完成
      publishLandtype: ""
    };
  },
  created() {
    window.scrollTo(120, 0);
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
    if (this.$route.query.landtype) {
      this.pulishType(Number(this.$route.query.landtype));
    } else {
      if (this.$store.state.publishLand.circulation == "transfer") {
        this.pulishType(1);
      } else if (this.$store.state.publishLand.circulation == "rent") {
        this.pulishType(2);
      } else if (this.$store.state.publishLand.circulation == "mortgage") {
        this.pulishType(3);
      }
    }
    if (this.$store.state.publishLand) {
      this.ruleForm = this.$store.state.publishLand;
      console.log("已填", this.ruleForm);
    }
    this.ownerShipNatureSelect()
  },
  methods: {
    pulishType(typeName) {
      if (typeName === 1) {
        this.publishLandtype = "转让";
      } else if (typeName === 2) {
        this.publishLandtype = "出租";
      } else if (typeName === 3) {
        this.publishLandtype = "抵押";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let publishLand = Object.assign(
            this.$store.state.publishLand,
            this.ruleForm
          );
          this.$store.state.publishLand = publishLand;
          if (this.$route.query.id) {
            this.$router.push({
              path: "/AttachmentInfoList",
              query: { id: this.$route.query.id }
            });
          } else {
            this.$router.push({
              path: "/AttachmentInfoList",
              query: { landtype: this.$route.query.landtype }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      // window.history.back(-1);
      if(this.$route.query.landtype){
        this.$router.push({path:"/PublishLandHome",query:{landType:this.$route.query.landtype}})
      }else{
        this.$router.push({path:"/PublishLandHome",query:{id:this.$route.query.id}})
      }
    },
    ownerShipNatureSelect(){
      
      if(this.ruleForm.ownerShipNature != '' && this.ruleForm.ownerShipNature != null){
        this.idFlag = true
        if(this.ruleForm.ownerShipNature == 'personage1'){
          this.ruleForm.identificationType = 'card_id'
        }else{
          this.ruleForm.identificationType = 'business_license'
        }
      }else{
        this.idFlag = false
      }
      
    }
  }
};
</script>
<style lang="scss" scoped>
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
    padding: 0px 120px 30px 120px;
  }
}
</style>
