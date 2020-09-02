<template>
  <!-- 注册模块 -->
  <div class="login_warp">
    <div class="header-bd">
      <div class="login_form">
        <div class="outer_label" v-if="InformationList">
          <div class="icon_warp">
            <img
              width="74px;"
              height="74px"
              style="margin:13px;"
              v-lazy="'/api/epf-document/document/downloadById?id='
              +InformationList.information.logoUrl"
            />
          </div>
          <p>欢迎注册{{InformationList.information.name}}</p>
        </div>
        <div class="login_tab01" style="padding:25px 50px 0 50px;">
          <form id="app" action="https://vuejs.org/" method="post">
            <div class="roleinfo">
              <label class="type_role">您是：</label>
              <el-radio label="0" v-model="formData.roleinfo">个人用户</el-radio>
              <el-radio label="1" v-model="formData.roleinfo">企业用户</el-radio>
            </div>
            <div class="lginput">
              <img width="20" height="22" src="../../assets/image/icon-login13.png" />
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="formData.phone"
                @blur="validateInfo('phone','blur')"
                @focus="validateInfo('phone','focus')"
                style="width:85%;"
                @blur.prevent="changephone"
              />
            </div>
            <div class="validate">
              <span>{{errors.errorsPhone}}</span>
            </div>
            <div class="lginput">
              <img width="20" height="22" src="../../assets/image/icon-login03.png" />
              <input
                type="text"
                v-if="pwdType"
                v-model="formData.password"
                style="width:77%;"
                @blur="validateInfo('password','blur')"
                @focus="validateInfo('password','focus')"
              />
              <input
                type="password"
                placeholder="请输入6-20位字母，数字和字符"
                v-model="formData.password"
                v-else
                style="width:77%;"
                @blur="validateInfo('password','blur')"
                @focus="validateInfo('password','focus')"
              />
              <img
                class="eye_img"
                v-lazy="seen ? seenImg : unseenImg"
                @click="changeType()"
                width="20"
                height="13"
              />
            </div>
            <div class="validate" style="line-height:15px;">
              <span>{{errors.errorsPassword}}</span>
            </div>
            <div class="lginput">
              <img width="20" height="22" src="../../assets/image/icon-login03.png" />
              <input
                type="text"
                v-if="rePwdType"
                v-model="formData.againpassword"
                style="width:77%;"
                @blur="validateInfo('againpassword','blur')"
                @focus="validateInfo('againpassword','focus')"
              />
              <input
                v-else
                type="password"
                placeholder="请再次输入密码"
                v-model="formData.againpassword"
                style="width:77%;"
                @blur="validateInfo('againpassword','blur')"
                @focus="validateInfo('againpassword','focus')"
              />
              <img
                v-lazy="reSeen ? seenImg : unseenImg"
                @click="reChangeType()"
                class="eye_img"
                width="20"
                height="13"
              />
            </div>
            <div class="validate">
              <span>{{errors.errorsAgainpassword}}</span>
            </div>
            <div class="lginput">
              <img width="20" height="22" src="../../assets/image/icon-login06.png" />
              <input
                type="text"
                placeholder="请输入图像验证码"
                v-model="formData.picCode"
                @blur="validateInfo('picCode','blur')"
                @focus="validateInfo('picCode','focus')"
                style="width:65%;"
              />
              <img class="identifycode" v-lazy="identifyCode" @click="refreshIdentifyCode" />
            </div>
            <div class="validate">
              <span v-if="formData.picCode===''">{{errors.errorsPicCode}}</span>
            </div>
            <div class="lginput">
              <img width="20" height="22" src="../../assets/image/icon-login12.png" />
              <input
                type="text"
                placeholder="请输入手机验证码"
                v-model="formData.phoneValidate"
                @blur="validateInfo('phoneValidate','blur')"
                @focus="validateInfo('phoneValidate','focus')"
              />
              <span class="spanblue" @click="phoneValidate(formData)" v-if="phoneValidateShow">获取验证码</span>
              <span v-else class="spangray">{{time}}s 后重新获取</span>
            </div>
            <div class="validate">
              <span v-if="formData.phoneValidate===''">{{errors.errorsphoneValidate}}</span>
            </div>
            <input
              type="checkbox"
              v-on:click="CheckItem(formData.agree)"
              v-model="formData.agree"
              name="checkbox"
              style="cursor: pointer;"
            />
            我已同意
            <router-link v-if="InformationList" :to="'RegulatoryDocumentagree'" target="_blank" style="color:var(--lightColor)">
              《{{InformationList.information.name}}{{title}}}
            </router-link>
            <div class="validate">
              <span v-if="!formData.agree">{{errors.errorsAgreeValidate}}</span>
            </div>
            <div class="epf_loginbut epf_btn epf_btn_bg" style="left:-20px;" @click="register(formData)">立即注册</div>
          </form>
          <div class="misspass">
            <span></span>
            <span style="color:var(--lightColor);" @click="login()">立即登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bd" v-if="InformationList">
      <p>
        <span>主办：{{InformationList.information.sponsor}}</span>
        <b>|</b>
        <span>承办：{{InformationList.information.undertake}}</span>
      </p>
      <p>建议使用火狐浏览器或360极速浏览器，分辨率1920*1080</p>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
import apiConfig from "@/util/config.js";
import { mapActions, mapState } from "vuex";
export default {
  name: "register",
  data() {
    return {
      // defaultImg: 'this.src="' + require("../../assets/image/logo.png") + '"',
      seen: "",
      time: 120,
      reSeen: "",
      random: "",
      pwdType: false, //此时文本框隐藏，显示密码框
      rePwdType: false, //此时文本框隐藏，显示密码框
      identifyCode: "",
      phoneValidateShow: true,
      unseenImg: require("../../assets/image/icon-login08.png"), //看不见
      seenImg: require("../../assets/image/icon-login07.png"), //看得见密码
      formData: {
        roleinfo: "0",
        phone: "",
        password: "",
        againpassword: "",
        picCode: "",
        phoneValidate: "",
        agree: false
      },
      errors: {
        errorsPhone: "",
        errorsPassword: "",
        errorsAgainpassword: "",
        errorsPicCode: "",
        errorsphoneValidate: "",
        errorsAgreeValidate: ""
      },
      inregion: "110000" ,//区域编码
      title:""//协议名
    };
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"])
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    changephone(){
          var reg=/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/;
          if (this.formData.phone === "") {
            return;
          }
          if (!reg.test(this.formData.phone)) {
            this.errors.errorsPhone = "*请输入正确的手机号!";
            return;
          }
          this.$axios.post(
            "/epf-cms/querygetMemberDataBytelPhone",
            qs.stringify({telPhone: this.formData.phone}),
            res => {
              if (res.code == "0") {
                if (res.member.length > 0) {
                  this.$message.error("该手机号已被注册");
                }
              }
            }
          );
    },
    phoneValidate(e) {
      if (e.phone === "") {
        this.errors.errorsPhone = "*手机号码不能为空";
        return;
      }
      this.phoneValidateShow = false;
      this.$axios.post(
        // "/epf-cms/member/createCode",
        "/epf-cms/user/createCode",
        qs.stringify({ phone: e.phone, smsCodeType: "1" }),
        res => {
          this.timer();
          let result = eval("(" + res.result + ")");
          // if (result.code == '0') {
          //     this.$message.success(result.msg);
          // } else {
          //     this.$message({
          //         message: result.msg,
          //         type: "warning"
          //     });
          // }
          if (res.code == 0) {
            this.$message.success(res.msg);
          } else if (res.code == 500) {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        }
      );
    },
    timer() {
      let timing = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.phoneValidateShow = true;
          this.time = 120;
          clearInterval(timing);
        }
      }, 1000);
    },
    changeType() {
      this.seen = !this.seen;
      this.pwdType = !this.pwdType;
    },
    reChangeType() {
      this.reSeen = !this.reSeen;
      this.rePwdType = !this.rePwdType;
    },
    register(e) {
      sessionStorage.removeItem("fromRouterPath");
      if (e.phone === "") {
        this.errors.errorsPhone = "*手机号不能为空";
        return;
      }
      if (e.password === "") {
        this.errors.errorsPassword = "*密码不能为空";
      }
      var regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (!regPassword.test(e.password)) {
        this.errors.errorsPassword =
          "*密码由数字和字母组成，并且要同时含有数字和字母，且长度要在6-20位之间";
        return;
      }

      if (e.againpassword === "") {
        this.errors.errorsAgainpassword = "*再次密码不能为空";
        return;
      }
      if (e.password != e.againpassword) {
        this.errors.errorsAgainpassword = "*两次密码不一致";
        return;
      }
      if (e.picCode === "") {
        this.errors.errorsPicCode = "*图片验证不能为空";
        return;
      }
      if (e.phoneValidate === "") {
        this.errors.errorsphoneValidate = "*手机号验证不能为空";
        return;
      }
      if (!e.agree) {
        // this.errors.errorsAgreeValidate = "*请同意服务协议";
        this.errors.errorsAgreeValidate =
          `*请先阅读并同意《${this.InformationList.information.name}用户服务协议》`;
        return;
      }

      this.$axios.post(
        "/epf-cms/admin/user/memberRegister",
        //  "/epf-cms/member/userRegister",
        qs.stringify({
          phoneNum: e.phone,
          smsCode: e.phoneValidate,
          username: e.phone,
          password: e.password,
          captcha: e.picCode,
          random: this.random,
          roleinfo: e.roleinfo,
          inregion: e.inregion
        }),
        res => {
          if (res.code != "0") {
            console.log(res.msg);
            this.$message.error(res.msg);
            return;
          } else {
            this.$router.push({ path: "/registerSuccess" });
          }
          if (e.phone && e.password) {
            //登录接口
            this.$axios.post(
              // "/epf-cms/jwt/token",
              // "/epf-cms/member/userlogin",
              "/epf-cms/memberLogin",
              qs.stringify({
                username: e.phone,
                password: e.password,
                captcha: e.picCode,
                random: this.random,
                loginType: "3"
              }),
              res => {
                if (res.code != "0") {
                  this.$message.error(res.msg);
                  return;
                }
                sessionStorage.setItem("login", "yes");
                localStorage.setItem("token", res.token);
                localStorage.setItem("userId", res.id);
                localStorage.setItem("userRealName", res.realname);
                this.$message({message: "登录成功", type: "success"});
                if (this.$route.query.next) {
                  this.$router.push(this.$route.query.next);
                } else {
                  if (
                    sessionStorage.getItem("fromRouterPath") == "/register" ||
                    sessionStorage.getItem("fromRouterPath") =="/findPass/setpThird" ||
                    sessionStorage.getItem("fromRouterPath") == "/findPass/setpSecond" ||
                    sessionStorage.getItem("fromRouterPath") == "/findPass/setpOne"
                  ) {
                    sessionStorage.setItem("fromRouterPath", "/");
                  }
                  this.$router.push(sessionStorage.getItem("fromRouterPath"));
                }
                // this.$axios.post(
                //   //"/epf-supply/user/getUserInfoByToken",
                //   "/epf-admin/member/getUserInfoByToken",
                //   qs.stringify({ token: res.token }),
                //   userInfoData => {
                //     if (res.code != "0") {
                //       this.$message.error(res.msg);
                //       return;
                //     }
                //     sessionStorage.setItem("login", "yes");
                //     localStorage.setItem("token", res.token);

                //     localStorage.setItem("userId", userInfoData.userInfo.id);
                //     localStorage.setItem(
                //       "userRealName",
                //       userInfoData.userInfo.realname
                //     );
                //     if (this.$route.query.next) {
                //       this.$router.push(this.$route.query.next);
                //     }
                //     if (
                //       sessionStorage.getItem("fromRouterPath") == "/register" ||
                //       sessionStorage.getItem("fromRouterPath") ==
                //         "/findPass/setpThird" ||
                //       sessionStorage.getItem("fromRouterPath") ==
                //         "/findPass/setpSecond" ||
                //       sessionStorage.getItem("fromRouterPath") ==
                //         "/findPass/setpOne"
                //     ) {
                //       sessionStorage.setItem("fromRouterPath", "/");
                //     }
                //     this.$router.push(sessionStorage.getItem("fromRouterPath"));
                //   }
                // );
              }
            );
          }
          this.$message.success(res.msg);
        }
      );
    },
    refreshIdentifyCode() {
/*      this.identifyCode =
        apiConfig.baseURL1 +
        "/epf-landweb/captcha.jpg?random=" +
        this.random +
        "&i=" +
        Math.random();*/
      this.identifyCode =
        apiConfig.baseURL1 + "/epf-cms/captcha.jpg?random=" + this.random +
        "&i=" +
        Math.random();
    },
    validateInfo(name, type) {
      if (name === "phone") {
        if (type == "blur") {
          var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
          if (this.formData.phone.trim().length == 0) {
            this.errors.errorsPhone = "*手机号不能为空";
            return false;
          } else if (!reg.test(this.formData.phone.trim())) {
            this.errors.errorsPhone = "*您输入的手机号有误";
            return false;
          } else {
            this.errors.errorsPhone = "";
            return true;
          }
        }
        return false;
      }
      if (name === "password") {
        if (type == "blur") {
          var regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
          if (this.formData.password.trim().length == 0) {
            this.errors.errorsPassword = "*密码不能为空";
            return false;
          } else if (!regPassword.test(this.formData.password.trim())) {
            this.errors.errorsPassword =
              "*密码由数字和字母组成，并且要同时含有数字和字母，且长度要在6-20位之间";
            return false;
          } else {
            this.errors.errorsPassword = "";
            return true;
          }
        }
        return false;
      }
      if (name === "againpassword") {
        if (type == "blur") {
          if (this.formData.againpassword.trim().length == 0) {
            this.errors.errorsAgainpassword = "*再次输入密码不能为空";
            return false;
          } else {
            this.errors.errorsAgainpassword = "";
            return true;
          }
        }
        return false;
      }
      if (name === "picCode") {
        if (type == "blur") {
          if (this.formData.picCode.trim().length == 0) {
            this.errors.errorsPicCode = "*图像验证码不能为空";
            return false;
          } else {
            this.errors.errorsPicCode = "";
            return true;
          }
        }
        return false;
      }
      if (name === "phoneValidate") {
        if (type == "blur") {
          if (this.formData.phoneValidate.trim().length == 0) {
            this.errors.errorsphoneValidate = "*手机验证码不能为空";
            return false;
          } else {
            this.errors.errorsphoneValidate = "";
            return true;
          }
        }
        return false;
      }
      return true;
    },
    login() {
      this.$router.push("/login");
    },
    CheckItem(item) {
      this.formData.agree = !item;
    }
  },
  mounted() {
    //用户协议
    this.$axios.get(
      "/epf-cms/admin/info/getInfo?id=fd0bd420-8a10-41e2-bb86-29d969dd087e",
      {},
      res => {
        console.log(res.info.title );
        this.title = res.info.title
      }
    )
    this.getInformationList();
    if (this.random == null || this.random == "") {
      this.random = Math.random();
    }
    this.identifyCode =
      apiConfig.baseURL1 + "/epf-cms/captcha.jpg?random=" + this.random;
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.login_warp {
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: url("../../assets/image/icon-loginbj.jpg") no-repeat;
  background-size:100%;
  .header-bd {
    margin-top: 100px;
    .login_form {
      // @include size(509px, 582px);
      // background: #ffffff;
      // margin: 0 auto;
      // box-sizing: border-box;
      // padding: 40px 47px 152px 49px;
      // border-radius: 5px;
      @include size(488px, auto);
      background: #ffffff;
      margin: 0 auto;
      box-sizing: border-box;
      border-radius: 6px;
      box-shadow: 0px 38px 76px 0px
		rgba(36, 83, 153, 0.28);
	    border-radius: 6px;
      .outer_label {
        // margin: 0 auto;
        // margin-bottom: 40px;
        // box-sizing: border-box;
        // padding-left: 20px;
        // text-align: center;
        position: relative;
        .icon {
          margin: 13px;
        }
        .icon_warp{
          @include size(100px, 100px);
          background: #f7f8fa;
          border-radius: 50%;
          margin-top:50px;
          position: absolute;
          left:calc(50% - 50px);
          top:- 100px;
        }
        img {
          margin-right: 20px;
        }
        p {
          color: #333333;
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          height:112px;
          background: #f7f8fa;
          line-height: 140px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
        span {
          color: #ffffff;
          font-size: 38px;
        }
      }
      .roleinfo {
        @include size(100%, 40px);
        color: #676767;
        font-size: 14px;
      }
      .login_tab {
        @include size(100%, 40px);
        border-bottom: 1px solid #f3f3f3;
        font-size: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        margin-bottom: 35px;
        span {
          display: inline-block;
          height: 40px;
          font-weight: bold;
          color: #666666;
          cursor: pointer;
          &:nth-child(1) {
            margin-right: 100px;
          }
        }
        .spanActive {
          box-sizing: border-box;
          border-bottom: 1px solid var(--lightColor);
          color: var(--lightColor);
        }
      }
      .lginput {
        @include size(390px, 48px);
        // background-color: #ffffff;
        border-radius: 3px;
        border: solid 1px #eeeded;
        // margin-bottom:24px;
        img {
          margin: 13px;
        }
        input {
          @include size(56%, 99%);
          line-height: 48px;
          color: #999999;
          font-size: 14px;
        }
        .spanblue {
          width: 105px;
          text-align: right;
          cursor: pointer;
          display: inline-block;
          color: var(--lightColor);
        }
        .spanblue:active {
          transform: translateY(1px);
        }
        .spangray {
          width: 105px;
          text-align: right;
          display: inline-block;
          color: #999;
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
        @include size(100%, 30px);
        color: #fe3f44;
        font-size: 12px;
        line-height: 30px;
      }
      .misspass {
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        color: #999999;
        span {
          cursor: pointer;
        }
      }
    }
  }
  .footer-bd {
    color: #969696;
    font-size: 14px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    margin: 50px auto;
    p {
      b {
        display: inline;
        margin: 0 5px;
        font-weight: 400;
      }
    }
  }
}
</style>
