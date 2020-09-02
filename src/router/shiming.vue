<template>
  <!-- 实名认证表单模块 -->
  <!-- 
    @name: 实名认证表单 
    @author: gaojie
  -->
  <div>
    <div class="findPass_warp">
      <!-- <epf-head titles="实名认证"></epf-head> -->
      <div class="findPassInfo_warp">
        <div class="breadcrumbtitle">
          <epf-lePage :location="location"></epf-lePage>
        </div>
        <div class="findPassInfo_Pro">
          <div class="findPassInfo_Pro_con">
            <el-form :model="ruleForm" ref="ruleForm" label-width="140px" :rules="addRules">
              <el-form-item label="真实姓名：" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  :disabled="disabledType==1?true:false"
                  placeholder="你本人的真实姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="证件类型：" prop="certificatesType">
                <el-select
                  v-model="ruleForm.certificatesType"
                  placeholder="请选择..."
                  style="width:100%"
                  :disabled="disabledType==1?true:false"
                >
                  <el-option label="身份证" value="1"></el-option>
                  <!-- <el-option label="户口本" value="2"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="证件号：" prop="id_card_number">
                <el-input
                  v-model="ruleForm.id_card_number"
                  :disabled="disabledType==1?true:false"
                  placeholder="你本人的身份证号码"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="上传免冠照片："
                required
               >
                <el-upload
                  class="avatar-uploader"
                  action="/api/epf-document/document/upload"
                  name="files"
                  :show-file-list="false"
                  :http-request="userFontUploadFile"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="idcardFrontImageUrl" :src="idcardFrontImageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <div class="please">
                <p>现支持PNG、JPG、JPEG、BMP,不支持GIF图片</p>
              </div>
              <div>
                <el-checkbox v-model="ruleForm.checkRadio">
                  <span @click="openAss()">同意《{{InformationList.information.name}}{{title}}》，请填写真实信息，若提供虚假信息，由此带来的后果，将由您全部承担</span>
                </el-checkbox>
              </div>
              <div style="text-align:center;">
                <div
                  class="epf_btn epf_btn_bg"
                  style="margin-top :40px"
                  v-if="disabledType!=1"
                  @click="submitData('ruleForm')"
                >提交</div>
              </div>
              <div class="please" style="margin:20px 0 0 0;">
                <el-alert v-if="yanzheng=='验证通过'" :title="yanzheng" type="success" show-icon></el-alert>
                <el-alert v-if="yanzheng=='验证不通过'" :title="yanzheng"  type="error" show-icon></el-alert>
                <!-- <p v-if="yanzheng=='验证通过'" style="color:">{{yanzheng}}</p> -->
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
        <attestateAgree @Ifagree="showMsg"></attestateAgree>
      </el-dialog>
      <!-- <epf-foot></epf-foot> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import head from "@/page/head";
import foot from "@/page/foot";
import attestateAgree from "../page/othen/verify/attestateAgree";
import qs from "qs";
export default {
  name: "attestation",
  components: {  attestateAgree,
    "epf-head": head,
    "epf-foot": foot },
  data() {
    return {
      title:"",
      yanzheng:'验证通过',
      yanzheng:'验证不通过',
      yanzheng:'',
      authName:'',
      dialogVisible: false,
      disabledType: 0,
      cantonCity: "",
      location: [{ path: null, name: "实名认证" }],
      idcardFrontImageUrl: "",
      idcardBackImageUrl: "",
      userId: "",
      ruleForm: {
        name: "",
        certificatesType: "",
        id_card_number: "",
        // //省
        // cantonProvinceName: "",
        // //市
        // cantonCityName: "",
        // //区
        // cantonAreaName: "",
        locationInfomation:"",
        checkRadio: false
      },
      dictionary: {
        //字典码结果
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicRequest: [
        //字典码请求
        "administrative_regions"
      ],
      addRules: {
        name: [
          { required: true, message: "请输入真实姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        id_card_number: [
          { required: true, message: "证件号不能为空" },
          {
            pattern: /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)$/,
            message: "您输入的格式有误，例：140721199111250223"
          }
        ],
        certificatesType: [
          {
            required: true,
            message: "请选择证件类型"
          }
        ],
        // cantonProvinceName: [
        //   { required: true, message: "请选择所在省" }
        // ],
        // cantonCityName: [
        //   { required: true, message: "请选择所在市" }
        // ],
        // cantonAreaName: [
        //   { required: true, message: "请选择所在区" }
        // ],
        // certificatesLmdate: [
        //   {
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change"
        //   }
        // ],
        locationInfomation: [{ required: true, message: "身份证住址" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }],
      },
      userAuthentication: {},
      beforeRt: ""
    };
  },
  created() {
    let that = this;
    this.disabledType = this.$route.query.disabledType;
    this.authName = this.$route.query.authName;

    that.userId = localStorage.getItem("userId");

    that.getProvinceData();
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    showMsg(dialogVisible, checkRadio) {
      this.dialogVisible = dialogVisible;
      this.ruleForm.checkRadio = checkRadio;
    },
    openAss() {
      this.dialogVisible = true;
    },
    cancel() {
      this.$router.push("/PersonalCenter/safetySet");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isImage = ["image/jpeg","image/png","image/bmp","image/gif","image/pdf"]
      const isJPG = isImage.some((item,index)=>{
          return file.type === item
      })
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpg 、jpeg 、png 、gif、bmp、pdf格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
 
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-2-26

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
    },
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    //  开始上传
    userFontUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$axios.post("/epf-document/document/upload", formData, res => {
        console.log(res);
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.ruleForm.idcardFront = res.data[0].id;
        this.idcardFrontImageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    userBackUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$axios.post("/epf-document/document/upload", formData, res => {
        console.log(res);
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.ruleForm.idcardBack = res.data[0].id;
        this.idcardBackImageUrl = "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    submitData(formName) {
      //提交表单
      if (this.ruleForm.checkRadio == false) {
        this.$message({ message: `请您先阅读并同意《${this.InformationList.information.name}${title}》`, type: "warning" });
      } else if (this.ruleForm.checkRadio == true) {
        // &&this.idcardBackImageUrl!==''
        if(this.idcardFrontImageUrl!==''){
          this.$refs[formName].validate(valid => {
            if (valid) {
              let that = this;
              that.ruleForm.userId = this.userId;
              that.ruleForm.checkRadio = that.ruleForm.checkRadio == true ? "1" : "0";
              const formData = new FormData();
              formData.append(
                "userAuthentication",
                JSON.stringify(that.ruleForm)
              );
              let pram={
                  name:that.ruleForm.name,
                  id_card_number:that.ruleForm.id_card_number,
                  image:that.idcardFrontImageUrl,
              }
              console.log("===that.idcardFrontImageUrl=======",that.idcardFrontImageUrl)
              console.log("=====that.ruleForm=====",that.ruleForm)
              console.log("=====pram=====",pram)
    //   this.$axios.post(
    //     "/epf-landweb/transwebcollect/addTransWebCollect",
    //     qs.stringify({
    //       targetId: id,
    //       collectType: "tpurchase"
    //     }),
              that.$axios.get(
                // "/epf-cms/admin/user-autheniton/todoinguser-authentication",
                "/epf-landweb/admin/getPersonVerify",
                // qs.stringify(pram),
                pram,
                res => {
                  if (res.code == 0) {
                    that.$message.success("提交成功！");
                    if(res.result_msg=='SUCCESS'){
                      that.yanzheng='验证通过'
                    }else{
                      that.yanzheng='验证不通过'
                    }
                    // that.$router.push(that.beforeRt);
                    // this.$router.push("/PersonalCenter/safetySet");
                  }
                }
              );
            } else {
              window.scrollTo(0, 120);
              this.$message.error("请确保信息填写正确");
              return false;
            }
          });
        }else{
           this.$message.warning("请上传免冠照片");
        }
      }
    },
    getAuthonUser() {
      const formData = new FormData();
      let that = this;
      formData.append("userId", that.userId);
      this.$axios.post(
        "/epf-cms/admin/user-autheniton/getreuser-authentication",
        formData,
        res => {
          if (res.code == 0) {
            let userAuthentication = res.userAuthentication;
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
            that.ruleForm = userAuthentication;
            that.ruleForm.checkRadio = userAuthentication.checkRadio == "1" ? true : false;
          }
        }
      );
    }
  },
  mounted(){
    this.getInformationList();
    if(this.authName!=='null'){
    //   this.getAuthonUser();
    }
    //实名认证协议
    this.$axios.get(
      "/epf-cms/admin/info/getInfo?id=f22f78af-b7e9-4186-9144-986b085b7a65",
      {},
      res => {
        console.log(res.info);
        this.title = res.info.title
      }
    )
  },
  watch: {
    $route(to, from) {
      this.beforeRt = to;
      console.log(to);
    }
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"]),
  },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.findPass_warp {
  @include size(100%, auto);
  background: #f2f1f9;
  .findPassInfo_warp {
    .breadcrumbtitle {
      @include size(1200px, 40px);
      line-height: 40px;
      margin: 0 auto;
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
    .findPassInfo_Pro {
      @include size(1200px, auto);
      margin: 0 auto;
      background: #fff;
      padding-bottom: 80px;
      &_con {
        @include size(800px, auto);
        margin: 0 auto;
        padding-top: 50px;
        .please{
          margin:0 0 5% 10%;
          color:#999999;
        }
        .lginput {
          @include size(413px, 48px);
          background-color: #ffffff;
          border-radius: 3px;
          border: solid 1px #eeeded;
          img {
            margin: 10px;
          }
          input {
            @include size(60%, 99%);
            line-height: 48px;
            color: #999999;
            font-size: 14px;
          }
          span {
            color: #4572d6;
            cursor: pointer;
          }
          .spanblue {
            color: #4572d6;
          }
          .spangray {
            color: #999999;
          }
          .identifycode {
            @include size(80px, 36px);
            width: 83px;
            height: 41px;
            float: right;
            margin-top: -44px;
            margin-right: 8px;
          }
          .eye_img {
            margin: 0;
            margin-top: 17px;
          }
        }
        .validate {
          display: block;
          @include size(100%, 24px);
          color: #fe3f44;
          font-size: 12px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
<style>
.el-date-editor.el-input {
  width: 100%;
}
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 130px;
  display: block;
}
.el-icon-plus::before {
  /* content: "请上传身份证正面"; */
  content: "请上传照片";
}
.avatar-uploader.back .el-icon-plus::before {
  content: "请上传身份证正面";
}
</style>
<style>
.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}
</style>
