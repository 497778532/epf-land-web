<template>
  <!-- 实名认证表单模块 -->
  <!--
    @name: 实名认证表单
    @author: gaojie
  -->
  <div class="findPass_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="findPassInfo_Pro">
      <div class="findPassInfo_Pro_con">
        <el-form :model="ruleForm" ref="ruleForm" label-width="auto" :rules="addRules" >
          <el-form-item label="真实姓名：" prop="realName" v-if="personal_data">
            <el-input
              v-model="ruleForm.realName"
              :disabled="disabledType==1?true:false"
              placeholder="你本人的真实姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型：" prop="certificatesType" v-if="personal_data">
            <el-select
              v-model="ruleForm.certificatesType"
              placeholder="请选择..."
              style="width:100%"
              :disabled="disabledType==1?true:false"
            >
              <el-option label="身份证" value="1"></el-option>
              <el-option label="户口本" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号：" prop="certificatesNo"  v-if="personal_data">
            <el-input
              v-model="ruleForm.certificatesNo"
              :disabled="disabledType==1?true:false"
              placeholder="你本人的身份证号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件有效截止期：" prop="certificatesLmdate"  v-if="personal_data">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.certificatesLmdate"
              :disabled="disabledType==1?true:false"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <div style="display: flex;flex-direction: row;"  v-if="personal_data">
            <el-form-item label="身份证住址："  prop="cantonProvinceName" style="width:310px;">
              <el-select
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.cantonProvinceName"
                placeholder="请选择所在省"
                style="width:157px;"
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
            </el-form-item>
            <el-form-item prop="cantonCityName" class="canton_Regions">
              <el-select
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.cantonCityName"
                placeholder="请选择所在市"
                @change="citySelect(dictionary.cantonCity,ruleForm.cantonCityName,$event)"
                style="width:157px;"
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
            </el-form-item>
            <el-form-item prop="cantonAreaName" class="canton_Regions">
              <el-select
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.cantonAreaName"
                placeholder="请选择所在区/县"
                style="width:157px;"
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
            <el-input v-model="ruleForm.locationInfomation" style="width:500px;margin-left:5px;" placeholder="请输入详细地址"></el-input>
          </div>
          <el-form-item
            label="上传证件照："
            v-if="personal_data"
            required
            class="attest"
            >
            <el-upload title="证件照正面"
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
          <el-form-item  v-if="personal_data" class="attest">
            <el-upload  title="证件照反面"
              class="avatar-uploader"
              action="/api/epf-document/document/upload"
              name="files"
              :show-file-list="false"
              :http-request="userBackUploadFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="idcardBackImageUrl" :src="idcardBackImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>



          <!--企业用户信息-->
          <el-form-item label="企业名称：" prop="companyName"  v-if="enterprise_data">
            <el-input
              v-model="ruleForm.companyName"
              :disabled="disabledType==1?true:false"
              placeholder="请输入企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业性质：" prop="companyNature" v-if="enterprise_data">
            <el-select
              :disabled="disabledType==1?true:false"
              v-model="ruleForm.companyNature"
              placeholder="请选择企业性质"
              style="width:100%"
            >
              <el-option
                v-for="item in companyNatureList"
                :ref="item.zhCn"
                :id="item.id"
                :label="item.zhCn"
                :value="item.dictValue"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型：" prop="certificatesType" v-if="enterprise_data">
            <el-select
              v-model="ruleForm.certificatesType"
              placeholder="请选择..."
              style="width:100%"
              :disabled="disabledType==1?true:false"
            >
              <el-option label="营业执照" value="3" aria-checked="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号：" prop="certificatesNo" v-if="enterprise_data">
            <el-input
              v-model="ruleForm.certificatesNo"
              :disabled="disabledType==1?true:false"
              placeholder="请输入证件号"
            ></el-input>
          </el-form-item>
          <el-form-item label="营业截止日期：" prop="closingTime" v-if="enterprise_data">
            <el-date-picker
              v-model="ruleForm.closingTime"
              :disabled="disabledType==1?true:false"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <div style="display: flex;flex-direction: row;" v-if="enterprise_data">
            <el-form-item label="工商注册所在地区："  prop="cantonProvinceName" style="width:320px;">
              <el-select
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.cantonProvinceName"
                placeholder="请选择所在省"
                style="width:157px;"
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
            </el-form-item>
            <el-form-item prop="cantonCityName" class="canton_Regions">
              <el-select
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.cantonCityName"
                placeholder="请选择所在市"
                @change="citySelect(dictionary.cantonCity,ruleForm.cantonCityName,$event)"
                style="width:157px;"
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
            </el-form-item>
            <el-form-item prop="cantonAreaName" class="canton_Regions">
              <el-select
                :disabled="disabledType==1?true:false"
                v-model="ruleForm.cantonAreaName"
                placeholder="请选择所在区/县"
                style="width:157px;"
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
            <el-input v-model="ruleForm.locationInfomation" style="width:500px;margin-left:5px;" placeholder="请输入详细地址"></el-input>
          </div>
          <el-form-item label="法定代表人：" prop="legalPerson" v-if="enterprise_data">
            <el-input
              v-model="ruleForm.legalPerson"
              :disabled="disabledType==1?true:false"
              placeholder="请输入法定代表人"
            ></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件类型：" prop="legalCertificateType" v-if="enterprise_data">
            <el-select
              v-model="ruleForm.legalCertificateType"
              placeholder="请选择..."
              style="width:100%"
              :disabled="disabledType==1?true:false"
            >
              <el-option label="身份证" value="1"></el-option>
              <el-option label="户口本" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法定代表人证件号：" prop="legalCertificateNo" v-if="enterprise_data">
            <el-input
              v-model="ruleForm.legalCertificateNo"
              :disabled="disabledType==1?true:false"
              placeholder="请输入法定代表人证件号"
            ></el-input>
          </el-form-item>
          <el-form-item label="法定代表人手机号：" prop="legalPhone" v-if="enterprise_data">
            <el-input
              v-model="ruleForm.legalPhone"
              :disabled="disabledType==1?true:false"
              placeholder="请输入法定代表人手机号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上传营业执照："
            v-if="enterprise_data"
            required
          >
            <el-upload title="营业执照"
              class="avatar-uploader"
              action="/api/epf-document/document/upload"
              name="files"
              :show-file-list="false"
              :http-request="businessLicenseUrlUploadFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="businessLicenseImageUrl" :src="businessLicenseImageUrl" class="avatar" />
              <i v-else class="el-icon-plus-yyzz avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="上传法定代表人证件照："
            v-if="enterprise_data"
            required
          >
            <el-upload title="法定代表人证件照正面"
              class="avatar-uploader"
              action="/api/epf-document/document/upload"
              name="files"
              :show-file-list="false"
              :http-request="legalProfileIsUploadFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="legalProfileIsImageUrl" :src="legalProfileIsImageUrl" class="avatar" />
              <i v-else class="el-icon-plus-fdzjzm avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="enterprise_data">
            <el-upload title="法定代表人证件照反面"
              class="avatar-uploader"
              action="/api/epf-document/document/upload"
              name="files"
              :show-file-list="false"
              :http-request="legalProfilTheUploadFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="legalProfileTheImageUrl" :src="legalProfileTheImageUrl" class="avatar" />
              <i v-else class="el-icon-plus-fdzjfm avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>


          <el-form-item
            label="手持身份证照片："
            v-if="enterprise_data"
            required
          >
            <el-upload title="手持身份证照片"
              class="avatar-uploader"
              action="/api/epf-document/document/upload"
              name="files"
              :show-file-list="false"
              :http-request="handPhotoUploadFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="handPhotoImageUrl" :src="handPhotoImageUrl" class="avatar" />
              <i v-else class="el-icon-plus-scsszz avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <div class="please">
            <!-- <p>请您上传清晰、真实的身份证正面、反面照片</p> -->
            <!-- <p>说明：仅支持jpg 、jpeg 、png 、gif、bmp、pdf的图片格式，每张最大10M</p> -->
            <p>图片格式：现支持PNG、JPG、JPEG、BMP,不支持GIF图片</p>
          </div>
          <div>
            <el-checkbox v-model="ruleForm.checkRadio">
              <span @click="openAss()">同意《{{InformationList.information.name}}{{title}}》，请填写真实信息，若提供虚假信息，由此带来的后果，将由您全部承担</span>
            </el-checkbox>
          </div>
          <div style="margin-top:40px;text-align: center;">
            <div class="epf_btn epf_btn_def" @click="cancel">取消</div>
            <div class="epf_btn epf_btn_bg" v-if="disabledType!=1" @click="submitData('ruleForm')">提交</div>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
      <attestateAgree @Ifagree="showMsg"></attestateAgree>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import attestateAgree from "./attestateAgree";
import qs from "qs";
export default {
  name: "attestation",
  components: {  attestateAgree },
  data() {
    return {
      title:"",
      authName:'',
      dialogVisible: false,
      disabledType: 0,
      cantonCity: "",
      location: [{ path: null, name: "实名认证" }],
      idcardFrontImageUrl: "",
      idcardBackImageUrl: "",
      userId: "",
      ruleForm: {
        realName: "",
        certificatesType: "",
        certificatesNo: "",
        //省
        cantonProvinceName: "",
        //市
        cantonCityName: "",
        //区
        cantonAreaName: "",
        locationInfomation:"",
        checkRadio: false,
        companyName: "",
        companyNature: "",
        closingTime: "",
        legalPerson: "",
        legalCertificateType: "",
        legalCertificateNo: "",
        legalPhone: "",
        businessLicense: "",
        legalProfileIs: "",
        legalProfileThe: "",
        handPhoto: ""
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
        realName: [
          { required: true, message: "请输入真实姓名" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        certificatesNo: [
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
        cantonProvinceName: [
          { required: true, message: "请选择所在省" }
        ],
        cantonCityName: [
          { required: true, message: "请选择所在市" }
        ],
        cantonAreaName: [
          { required: true, message: "请选择所在区" }
        ],
        certificatesLmdate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        locationInfomation: [{ required: true, message: "身份证住址" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }],
        legalPhone: [
          {
            required: true,
            pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        companyName: [
          { required: true, message: "请输入企业名称" },
          { validator: (rule, value, callback) =>{this.validateNum(rule, value, callback,0,100,'长度在100字符以内（注意若是汉字，1个汉字是2个字符）')}  },
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,
            message:"可以输入中文、英文、数字及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】"
          }
        ],
        companyNature: [
          {
            required: true,
            message: "请选择企业性质",
            trigger: "blur"
          }
        ],
        closingTime: [
          {
            required: true,
            message: "请选择营业截止时间",
            trigger: "blur"
          }
        ],
        legalCertificateType: [
          {
            required: true,
            message: "请选择法定代表人证件类型",
            trigger: "blur"
          }
        ],
        legalCertificateNo: [
          {
            required: true,
            message: "请输入法定代表人证件号",
            trigger: "blur"
          }
        ],
        legalPerson: [
          {
            required: true,
            message: "请输入法定代表人",
            trigger: "blur"
          }
        ],
      },
      userAuthentication: {},
      beforeRt: "",
      personal_data: false,//个人用户显示
      enterprise_data: false,//企业用户显示
      companyNatureList: [],
      businessLicenseImageUrl: "",
      legalProfileIsImageUrl: "",
      legalProfileTheImageUrl: "",
      handPhotoImageUrl: "",
      edituserType: ""
    };
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"]),
  },
  mounted() {
    this.getInformationList();
  },
  created() {
    let that = this;
    this.disabledType = this.$route.query.disabledType;
    this.authName = this.$route.query.authName;
    that.userId = localStorage.getItem("userId");
    that.loadcompanyNatureList();
    that.getProvinceData();
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    async  loadcompanyNatureList(){
          this.$axios.post(`/epf-admin/admin/dict/getDictEbyDictGroup/enterprise_nature`,{},res => {
          this.companyNatureList = res.dictionariesList;
        });
    },
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
      if (this.judgedataisempty()) {
        //提交表单
        if (this.ruleForm.checkRadio == false) {
          this.$message({ message: `请您先阅读并同意《${this.InformationList.information.name}${title}》`, type: "warning" });
        } else if (this.ruleForm.checkRadio == true) {
          /*this.$refs[formName].validate(valid => {
            if (valid) {*/
          let that = this;
          that.ruleForm.userId = this.userId;
          that.ruleForm.auditStatus = "";
          that.ruleForm.checkRadio = that.ruleForm.checkRadio == true ? "1" : "0";
          const formData = new FormData();
          formData.append(
            "userAuthentication",
            JSON.stringify(that.ruleForm)
          );
          that.$axios.post(
            "/epf-cms/admin/user-autheniton/todoinguser-authentication",
            formData,
            res => {
              if (res.code == 0) {
                that.$message.success("提交成功！");
                that.$router.push(that.beforeRt);
                this.$router.push("/PersonalCenter/safetySet");
              }
            }
          );
          /*} else {
              window.scrollTo(0, 120);
              this.$message.error("请确保信息填写正确");
              return false;
            }
          });*/
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
          if (res.code == 0 || res.code == '0') {
            let userAuthentication = res.userAuthentication;
            let homeUser = res.homeUser;
            this.edituserType = homeUser.userType;
            if (homeUser.userType == '0') {
              this.personal_data = true;//个人用户显示
              this.enterprise_data = false;//企业用户显示
            }
            if (homeUser.userType == '1') {
              this.enterprise_data = true;//企业用户显示
              this.personal_data = false;//个人用户显示
            }
            if(userAuthentication == null){
              return;
            }
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

            if (
              userAuthentication.businessLicense != null &&
              userAuthentication.businessLicense.length > 0
            ) {
              that.businessLicenseImageUrl =
                "/api/epf-document/document/downloadById?id=" +
                userAuthentication.businessLicense;
            }
            if (
              userAuthentication.legalProfileIs != null &&
              userAuthentication.legalProfileIs.length > 0
            ) {
              that.legalProfileIsImageUrl =
                "/api/epf-document/document/downloadById?id=" +
                userAuthentication.legalProfileIs;
            }
            if (
              userAuthentication.legalProfileThe != null &&
              userAuthentication.legalProfileThe.length > 0
            ) {
              that.legalProfileTheImageUrl =
                "/api/epf-document/document/downloadById?id=" +
                userAuthentication.legalProfileThe;
            }
            if (
              userAuthentication.handPhoto != null &&
              userAuthentication.handPhoto.length > 0
            ) {
              that.handPhotoImageUrl =
                "/api/epf-document/document/downloadById?id=" +
                userAuthentication.handPhoto;
            }
            that.ruleForm = userAuthentication;
            that.ruleForm.checkRadio = userAuthentication.checkRadio == "1" ? true : false;
            if (userAuthentication.auditStatus != "1") {
              this.disabledType = 0;
            }
          }else{
            this.personal_data = true;//个人用户显示
            this.$message.error("查询后台方法获取数据异常，请重新登录！");
          }
        }
      );
    },
    //  开始上传 上传营业执照
    businessLicenseUrlUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$axios.post("/epf-document/document/upload", formData, res => {
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.ruleForm.businessLicense = res.data[0].id;
        this.businessLicenseImageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    //  开始上传 上传法定代表人证件照
    legalProfileIsUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$axios.post("/epf-document/document/upload", formData, res => {
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.ruleForm.legalProfileIs = res.data[0].id;
        this.legalProfileIsImageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    //  开始上传 法定代表人证件照反面
    legalProfilTheUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$axios.post("/epf-document/document/upload", formData, res => {
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.ruleForm.legalProfileThe = res.data[0].id;
        this.legalProfileTheImageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    //  开始上传 手持身份证照片
    handPhotoUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$axios.post("/epf-document/document/upload", formData, res => {
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.ruleForm.handPhoto = res.data[0].id;
        this.handPhotoImageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    //进行判断页面的输入为必填才能进行保存实名认证数据
    judgedataisempty(){
      if (this.edituserType == '0') {//判断个人用户数据是否已必填
        if (this.ruleForm.realName == '') {
          this.$message.warning("真实姓名不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.certificatesType == '') {
          this.$message.warning("证件类型不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.certificatesNo == '') {
          this.$message.warning("证件号不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.certificatesLmdate == '') {
          this.$message.warning("证件有效截止期不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.cantonProvinceName == '') {
          this.$message.warning("身份证住址【省】不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.cantonCityName == '') {
          this.$message.warning("身份证住址【市】不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.cantonAreaName == '') {
          this.$message.warning("身份证住址【县】不能空，不能提交数据！");
          return false;
        }
        if (this.idcardFrontImageUrl == '') {
          this.$message.warning("上传证件照正面不能为空，不能提交数据！");
          return false;
        }
        if (this.idcardBackImageUrl == '') {
          this.$message.warning("上传证件照反面不能为空，不能提交数据！");
          return false;
        }

      }else if(this.edituserType == '1'){//判断企业用户数据是否已必填
        if (this.ruleForm.companyName == '') {
          this.$message.warning("企业名称不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.companyNature == '') {
          this.$message.warning("企业性质不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.certificatesType == '') {
          this.$message.warning("证件类型不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.certificatesNo == '') {
          this.$message.warning("证件号不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.closingTime == '') {
          this.$message.warning("营业截止日期不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.cantonProvinceName == '') {
          this.$message.warning("工商注册所在地区【省】不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.cantonCityName == '') {
          this.$message.warning("工商注册所在地区【市】不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.cantonAreaName == '') {
          this.$message.warning("工商注册所在地区【区/县】不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.locationInfomation == '') {
          this.$message.warning("详细地址不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.legalPerson == '') {
          this.$message.warning("法定代表人不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.legalCertificateType == '') {
          this.$message.warning("法定代表人证件类型不能空，不能提交数据！");
          return false;
        }
        if (this.ruleForm.legalCertificateNo == '') {
          this.$message.warning("法定代表人证件号不能空，不能提交数据！");
          return false;
        }
        if (this.businessLicenseImageUrl == '') {
          this.$message.warning("营业执照不能空，不能提交数据！");
          return false;
        }
        if (this.legalProfileIsImageUrl == '') {
          this.$message.warning("法定代表人证件照正面不能空，不能提交数据！");
          return false;
        }
        if (this.legalProfileTheImageUrl == '') {
          this.$message.warning("法定代表人证件照反面不能空，不能提交数据！");
          return false;
        }
        if (this.handPhotoImageUrl == '') {
          this.$message.warning("手持身份证照片不能空，不能提交数据！");
          return false;
        }
      }
      return true;
    },
  },
  mounted(){
    //if(this.authName!=='null'){
      this.getAuthonUser();
    //}
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
          color: var(--lightColor);
          cursor: pointer;
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
  border-color: var(--lightColor);
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
.attest .el-icon-plus::before {
  content: "请上传身份证正面";
}
.attest .avatar-uploader.back .el-icon-plus::before {
  content: "请上传身份证正面";
}
.attest .el-icon-plus-scsszz::before {
  content: "请上传手持身份证照片";
}
.attest .el-icon-plus-fdzjfm::before {
  content: "请上传法定代表人证件照反面";
}
.attest .el-icon-plus-fdzjzm::before {
  content: "请上传法定代表人证件照正面";
}
.attest .el-icon-plus-yyzz::before {
  content: "请上传营业执照";
}
</style>
<style>
.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}
</style>
