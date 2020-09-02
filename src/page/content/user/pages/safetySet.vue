<template>
  <div>
    <el-tabs class="tabBox" v-model="activeName">
      <el-tab-pane label="安全设置" name="first">
        <div class="tips" v-if="msg!=='实名认证成功'">
          <span style="color:#ffa100;">提示 :</span>
          <span style="color:#9a9a9a;">{{msg}}</span>
        </div>
        <div  v-for="(item,index) in safetySetData" :key="index">
          <div class="setList" v-if="item.isshow">
              <el-row :gutter="20">
                <el-col :span="1">
                  <i :class="item.type?'setTipsIcon el-icon-success':'setTipsIcon el-icon-warning'"></i>
                </el-col>
                <el-col :span="4">
                  <div class="setTitle">{{item.title}}</div>
                </el-col>
                <el-col :span="15">
                  <div class="setType">{{item.tips}}</div>
                </el-col>
                <el-col :span="4">
                  <div
                    :class="item.type?'epf_btn_bg epf_btn':'epf_btn_def epf_btn'"
                    @click="goInTo(item.title,item.type,index)"
                    v-if="item.buttonShow"
                  >{{item.btnText}}</div>
                </el-col>
              </el-row>
          </div>
          <div style="padding-top:25px;" v-if="emaliShow&&index==2" class="formData">
            <el-form
              :model="userinfo"
              :rules="userRules"
              ref="emaliData"
              label-width="81px"
              class="demo-ruleForm"
              style="padding-left:153px;"
            >
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userinfo.email" style="width:450px;" placeholder="请输入正确的邮箱格式"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input
                  type="text"
                  placeholder="请输入邮箱验证码"
                  style="width:200px;"
                  v-model="userinfo.code"
                ></el-input>
                <span @click="emailValidate(userinfo)" v-if="phoneValidateShow">{{sendText}}</span>
                <span v-else :class="text==='获取验证码'?'spanblue':'spangray'">{{text}}</span>
              </el-form-item>

              <el-form-item>
                <div class="epf_btn epf_btn_bg" @click="submitEmail()">完成</div>
                <div
                  class="epf_btn epf_btn_def"
                  @click="cancel(index)"
                >取消</div>
              </el-form-item>
            </el-form>
          </div>

          <div style="padding-top:25px;" v-if="addressShow&&index==3" class="formData">
            <el-form
              :rules="addRules"
              :model="ruleForm"
              ref="ruleForm"
              label-width="78px"
              style="margin-left:126px;"
            >
              <div style="display: flex;flex-direction: row;">
                <el-form-item label="所在地区" prop="cantonProvinceName">
                  <el-select
                    style="width:157px;"
                    v-model="ruleForm.cantonProvinceName"
                    placeholder="请选择所在省"
                    @change="provinceSelect(dictionary.administrative_regions,ruleForm.cantonProvinceName,$event)"
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
                  <el-select
                    style="width:157px;"
                    v-model="ruleForm.cantonCityName"
                    placeholder="请选择所在市"
                    @change="citySelect(dictionary.cantonCity,ruleForm.cantonCityName,$event)"
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
                  <el-select
                    style="width:157px;"
                    v-model="ruleForm.cantonAreaName"
                    placeholder="请选择所在区/县"
                    @change="areaSelect(dictionary.cantonAreaName,ruleForm.cantonAreaName,$event)"
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
                </el-form-item>
              </div>
              <el-form-item label="详细地址" prop="addDetailed">
                <el-input placeholder="请输入详细地址" style="width:480px;" v-model="ruleForm.addDetailed"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="epf_btn epf_btn_bg" @click="submitAddress()">完成</div>
                <div
                  class="epf_btn epf_btn_def"
                  @click="cancel(index)"
                >取消</div>
              </el-form-item>
            </el-form>
          </div>


          <!-- 绑定企业联系人 -->
          <div style="padding-top:25px;" v-if="firmContactShow&&index==5" class="formData">
            <el-form
              :rules="rulesfirmContact"
              :model="ruleForm"
              ref="ruleForm"
              label-width="78px"
              style="margin-left:126px;"
            >
              <el-form-item label="详细地址" prop="firmContact">
                <el-input placeholder="请输入企业联系人" style="width:480px;" v-model="ruleForm.firmContact"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="epf_btn epf_btn_bg" @click="editcontactdatabyid('lxr')">完成</div>
                <div
                  class="epf_btn epf_btn_def"
                  @click="cancel(index)"
                >取消</div>
              </el-form-item>
            </el-form>
          </div>

          <!-- 绑定企业联系人手机号 -->
          <div style="padding-top:25px;" v-if="firmPhoneShow&&index==6" class="formData">
            <el-form
              :rules="rulesphone"
              :model="ruleForm"
              ref="ruleForm"
              label-width="78px"
              style="margin-left:126px;"
            >
              <el-form-item label="手机号" prop="firmPhone">
                <el-input placeholder="请输入企业联系人手机号" style="width:480px;" v-model="ruleForm.firmPhone"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="epf_btn epf_btn_bg" @click="editcontactdatabyid('lxrdh')">完成</div>
                <div
                  class="epf_btn epf_btn_def"
                  @click="cancel(index)"
                >取消</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      emaliShow: false,
      addressShow: false,
      msg:'您还没完成实名认证，无法发布信息',
      rules: {
        emali: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            message: "格式有误，请重新输入",
            trigger: "change"
          }
        ]
      },
      userRules:{
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            message: "格式有误，请重新输入",
            trigger: "change"
          }
        ],
        code:[
          { required: true, message: "请输入验证码", trigger: "blur" },
        ]
      },
      addRules: {
        cantonProvinceName: [
          { required: true, message: "必选项", trigger: "change" }
        ],
        addDetailed: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ]
      },
      activeName: "first",
      safetySetData: [
        {
          type: true,
          title: "真实姓名",
          tips: "未进行实名认证",
          btnText: "实名认证",
          buttonShow: true,
          isshow: true
        },
        {
          type: true,
          title: "手机绑定",
          tips: "",
          btnText: "修改",
          buttonShow: true,
          isshow: true
        },
        {
          type: false,
          title: "邮箱",
          tips: "未绑定邮箱",
          btnText: "去绑定",
          buttonShow: true,
          isshow: true
        },
        {
          type: false,
          title: "联系地址",
          tips: "未添加联系地址",
          btnText: "去添加",
          buttonShow: true,
          isshow: true
        },
        {
          type: false,
          title: "登录密码",
          tips: "登录平台时需要输入的密码",
          btnText: "重置",
          buttonShow: true,
          isshow: true
        },
        {
          type: false,
          title: "企业联系人",
          tips: "",
          btnText: "绑定",
          buttonShow: true,
          isshow: true
        },
        {
          type: false,
          title: "企业联系人手机号",
          tips: "",
          btnText: "绑定",
          buttonShow: true,
          isshow: true
        }
      ],
      ruleForm: {
        cantonProvinceName: "",
        cantonCityName: "",
        cantonAreaName: "",
        cantonProvince: "",
        addDetailed: "",
        firmPhone: "",
        firmContact: ""
      },
      dicRequest: [
        //字典码请求
        "administrative_regions"
      ],
      dictionary: {
        //字典码结果
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0,
      userId: "",
      emailvalid: "",
      userinfo: {},
      time: 120,
      phoneValidateShow: true,
      sendText: '获取验证码',
      firmContactShow: false,
      firmPhoneShow: false,
    };
  },
  computed: {
    text() {
      return this.time > 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  },
  created() {
    this.userId = localStorage.getItem("userId");
    this.getAuthonUser();
    this.getProvinceData();
  },
  methods: {
    emailValidate(e) {
      if (e.email === ""||e.email === null) {
        // this.errors.errorsPhone = "*邮箱不能为空";
        this.$message.error("邮箱不能为空");
        return;
      }
      this.phoneValidateShow = false;
      const formData = new FormData();
      formData.append("emailAddress", e.email);
      this.$axios.post(
        "/epf-cms/admin/user/emailcode",formData,
        res => {
          if (res.code != "0") {
            this.phoneValidateShow = true;
            this.$message.error(res.msg);
            return;
          } else {
            this.emailvalid = res.emailvalid;
            this.sendText=res.sendText;
            this.timer();
          }
        }
      );
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.phoneValidateShow = true;
        this.time = 10;
      }
    },
    getAuthonUser: function() {
      const formData = new FormData();
      let that = this;
      formData.append("userId", that.userId);
      this.$axios.post(
        "/epf-cms/admin/user-autheniton/getreuser-authentication",
        formData,
        res => {
          if (res.code == 0 || res.code == '0') {
            let userAuthentication = res.userAuthentication;
            if(userAuthentication != null){

              if (
                userAuthentication.idcardFront != null &&
                userAuthentication.idcardFront.length > 0
              ) {
                that.idcardFrontImageUrl =
                  "/api/epf-document/document/downloadById?id=" +
                  userAuthentication.idcardFront;
              }
              if (
                userAuthentication.idcardBack != null &&
                userAuthentication.idcardBack.length > 0
              ) {
                that.idcardBackImageUrl =
                  "/api/epf-document/document/downloadById?id=" +
                  userAuthentication.idcardBack;
              }
               that.safetySetData[0].tips = userAuthentication.realName + ' | ' + userAuthentication.certificatesNo.replace(/^(.{3})(?:\d+)(.{4})$/, "$1***********$2")
              if(userAuthentication.auditStatus==null||userAuthentication.auditStatus==-1){
                that.safetySetData[0].btnText = "审核中";
                that.msg = '实名认证审核中，无法发布信息'
              }else if(userAuthentication.auditStatus=='0'){
                that.safetySetData[0].btnText = "认证失败";
                that.msg = '实名认证失败'
              }else if(userAuthentication.auditStatus=='1'){
                that.safetySetData[0].type = true;
                that.safetySetData[0].buttonShow = false;
                that.msg = '实名认证成功'
              }
              if(userAuthentication.auditStatus == "1"){
                  that.safetySetData[0].btnText = "已认证";
                  that.safetySetData[0].buttonShow = true;
              }
              that.ruleForm.cantonProvinceName = userAuthentication.cantonProvinceName;
              that.ruleForm.cantonCityName = userAuthentication.cantonCityName;
              that.ruleForm.cantonAreaName = userAuthentication.cantonAreaName;
              that.ruleForm.addDetailed = userAuthentication.locationInfomation;
              that.ruleForm.firmPhone = userAuthentication.firmPhone;
              that.ruleForm.firmContact = userAuthentication.firmContact;

              if (userAuthentication.locationInfomation != null && userAuthentication.locationInfomation != "") {
                this.safetySetData[3].type = true;
                this.safetySetData[3].tips = userAuthentication.cantonProvinceName + userAuthentication.cantonCityName + userAuthentication.cantonAreaName + userAuthentication.locationInfomation;
                this.safetySetData[3].btnText = "修改";
              }

            }



            this.userinfo = res.homeUser;
            if (this.userinfo.telPhone != null && this.userinfo.telPhone != "") {
              this.safetySetData[1].tips =this.userinfo.telPhone;
            } else {
              this.safetySetData[1].type = false;
              this.safetySetData[1].tips = "为绑定手机";
              this.safetySetData[1].btnText = "去绑定";
            }

            if (this.userinfo.email != null && this.userinfo.email != "") {
              this.safetySetData[2].type = true;
              this.safetySetData[2].tips = this.userinfo.email;
              this.safetySetData[2].btnText = "修改";
            }




            if (res.homeUser.userType === '0') {//个人用户显示
               //delete that.safetySetData[5];
               //delete that.safetySetData[6];
              this.safetySetData[5].isshow = false;
              this.safetySetData[6].isshow = false;
            } else if (res.homeUser.userType === '1') {//企业用户显示
              that.safetySetData[0].title = "企业名称";
              that.safetySetData[0].tips = userAuthentication != null ? userAuthentication.companyName : "";
              that.safetySetData[1].title = "账号（手机号）";
              if ( userAuthentication != null && userAuthentication.firmContact != null && userAuthentication.firmContact != "") {
                this.safetySetData[5].type = true;
                this.safetySetData[5].tips =  userAuthentication != null ? userAuthentication.firmContact : "";
                this.safetySetData[5].btnText = "修改";
              }
              if ( userAuthentication != null && userAuthentication.firmPhone != null && userAuthentication.firmPhone != "") {
                this.safetySetData[6].type = true;
                this.safetySetData[6].tips =  userAuthentication != null ? userAuthentication.firmPhone : "";
                this.safetySetData[6].btnText = "修改";
              }
            }
            this.safetySetData[4].tips = "*********";
            this.safetySetData[4].type = true;
          }else{
            this.$message.error("查询后台方法获取数据异常，请重新登录！");
          }
        }
      );
    },
    editcontactdatabyid(edittype){
      var params = { id: this.userId, firmContact: this.ruleForm.firmContact   , firmPhone: this.ruleForm.firmPhone};
      this.$axios.post(
        "/epf-cms/admin/user-autheniton/updateuserauthcontactByid",
        qs.stringify(params),
        res => {
          if (res.code != 0) {
            this.$message({
              message: res.msg,
              type: "warning"
            });
            return;
          }
          if(edittype == 'lxr'){
            this.firmContactShow = false;
            this.safetySetData[5].buttonShow = true;
            this.safetySetData[5].btnText = "修改";
            this.safetySetData[5].type = true;
            this.safetySetData[5].tips = this.ruleForm.firmContact;
          }
          if(edittype == 'lxrdh'){
            this.firmPhoneShow = false;
            this.safetySetData[6].buttonShow = true;
            this.safetySetData[6].btnText = "修改";
            this.safetySetData[6].type = true;
            this.safetySetData[6].tips = this.ruleForm.firmPhone;
          }

        }
      );
    },
    goInTo(data, type, index) {
      //进入按钮
      if (index == 0) {
        let disabledType = 0,authName;
        if(this.safetySetData[0].btnText == "实名认证"){
          disabledType = 0
          authName='null'
        }else if(this.safetySetData[0].btnText == "审核中"){
          disabledType = 1
          authName='audit'
        }else if(this.safetySetData[0].btnText == "认证失败"){
          disabledType = 0
          authName='fail'
        }else if(this.safetySetData[0].btnText == "已认证"){
          disabledType = 1
          authName='success'
        }
        this.$router.push({path:"/attestation",query:{disabledType:disabledType,authName:authName}});
      } else if (index == 1) {
        this.$router.push("/bindPhone/setpOne");
      } else if (index == 2) {
        this.emaliShow = true;
        this.safetySetData[index].buttonShow = false;
      } else if (index == 3) {
        this.addressShow = true;
        this.safetySetData[index].buttonShow = false;
      } else if (index == 4) {
        this.$router.push("/findPass/setpOne");
      }else if (index == 5) {
        this.firmContactShow = true;
        this.safetySetData[index].buttonShow = false;
      }else if (index == 6) {
        this.firmPhoneShow = true;
        this.safetySetData[index].buttonShow = false;
      }
    },
    cancel(index) {
      //取消按钮
      if (index == 2) {
        this.emaliShow = false;
        this.safetySetData[index].buttonShow = true;
      } else if (index == 3) {
        this.addressShow = false;
        this.safetySetData[index].buttonShow = true;
      } else if (index == 5) {
        this.firmContactShow = false;
        this.safetySetData[index].buttonShow = true;
      }else if (index == 6) {
        this.firmPhoneShow = false;
        this.safetySetData[index].buttonShow = true;
      }
    },
    submitAddress() {
      //完成
      if (this.ruleForm.addDetailed != "" && this.ruleForm.addDetailed != null) {
        var params = { id: this.userId, cantonProvinceName: this.ruleForm.cantonProvinceName, cantonCityName: this.ruleForm.cantonCityName
          , cantonAreaName: this.ruleForm.cantonAreaName, addDetailed: this.ruleForm.addDetailed };
        this.$axios.post(
          "/epf-cms/admin/user/updateinfo",
          qs.stringify(params),
          res => {
            if (res.code != 0) {
              this.$message({
                message: res.msg,
                type: "warning"
              });
              return;
            }
            this.addressShow = false;
            this.safetySetData[3].buttonShow = true;
            this.safetySetData[3].btnText = "修改";
            this.safetySetData[3].type = true;
            this.safetySetData[3].tips = this.ruleForm.cantonProvinceName+this.ruleForm.cantonCityName+this.ruleForm.cantonAreaName+this.ruleForm.addDetailed;
          }
        );
      } else {
        this.$message({
          message: "请确认信息填写完整",
          type: "warning"
        });
        return false;
      }
    },
    submitEmail() {
      let that = this;
      if (that.userinfo.email === ""||that.userinfo.email === null) {
        // this.errors.errorsPhone = "*邮箱不能为空";
        this.$message.error("邮箱不能为空");
        return;
      }
      // if (that.userinfo.code === ""||that.userinfo.code === null) {
      //   // this.errors.errorsPhone = "*邮箱不能为空";
      //   this.$message.error("验证码不能为空");
      //   return;
      // }
      //完成
      if (that.userinfo.email != ""||that.userinfo.email != null) {
        const formData = new FormData();
        formData.append("userId", this.userId);
        formData.append("code",this.userinfo.code);
        formData.append("email", this.userinfo.email);
        that.$axios.post("/epf-cms/admin/user/updatemail",formData,res => {
            if (res.code != 0) {
              that.$message({
                message: res.msg,
                type: "warning"
              });
              return false;
            }
          that.emaliShow = false;
          that.safetySetData[2].buttonShow = true;
          that.safetySetData[2].btnText = "修改";
          that.safetySetData[2].type = true;
          that.safetySetData[2].tips = this.userinfo.email;
          }
        );
      } else {
        this.$message({
          message: "请确认信息填写完整",
          type: "warning"
        });
        return false;
      }
    },
    getProvinceData() {
      let that = this;
      that.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId`,
        { parentId: "000000" },
        res => {
          that.dictionary.administrative_regions = res.dictionariesList;
        }
      );
    },
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      this.cantonCity = "";
      this.ruleForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.dictionary.cantonArea = [];
      this.$axios.get(
        `/epf-cms/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {},
        res => {
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        }
      );
      this.orgselect();
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
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList;
            return;
          }
          this.dictionary.cantonArea = "";
        }
      );
      this.orgselect();
    },
    orgselect() {
      var cantonProvince = this.ruleForm.cantonProvince;
      var cantonCity = this.ruleForm.cantonCity;
      var cantonArea = this.ruleForm.cantonArea;
      this.ruleForm.trustOrgName = "";
      this.$axios.get(
        // `/epf-admin/admin/org/getOrgsByareas`,
        `/epf-landweb/landweb/sysenterprise/listSysEnterpriseByArea`,
        {
          cantonProvince: cantonProvince,
          cantonCity: cantonCity,
          cantonArea: cantonArea
        },
        res => {
          if (res.code == 0) {
            // sessionStorage.setItem("orgsDataList", JSON.stringify(res.orgs));
            sessionStorage.setItem("orgsDataList", JSON.stringify(res.enterprises));
            if (this.ruleForm.cantonAreaName !== "") {
              this.getSessionOrgs();
            } else {
              // this.orgList = res.orgs;
              this.orgList = res.enterprises;
              return;
            }
          }
        }
      );
    },
    areaSelect(dic, cantonCity, event) {
      console.log(dic, cantonCity, event);
    }
  }
};
</script>

<style scoped>
.tips {
  box-sizing: border-box;
  border: 1px dashed #d4d4d4;
  padding: 20px;
  margin-bottom: 60px;
  margin-top: 17px;
}
.setList {
  padding-bottom: 20px;
  margin-top: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.setTipsIcon {
  margin-left: 1px;
  font-size: 25px;
  line-height: 34px;
}
.el-icon-warning {
  color: #ffa100;
}
.el-icon-success {
  color: #93b52b;
}
.setTitle {
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  padding-left: 15px;
}
.setType {
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  color: #999999;
}
.spanblue {
  color: var(--lightColor);
}
.spangray {
  color: #999999;
}
</style>
