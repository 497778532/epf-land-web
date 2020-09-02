<template>
  <!-- 登录模块 -->
  <div class="login_warp">
    <div class="header-bd">
      <div class="login_form">
        <div class="outer_label" v-if="InformationList">
          <div class="icon_warp">
            <img width="74px;"
              height="74px"
              style="margin:13px;"
              v-lazy="'/api/epf-document/document/downloadById?id='
              +InformationList.information.logoUrl"
              :onerror="defaultImg"/>
          </div>
          <p>欢迎登录{{InformationList.information.name}}</p>
        </div>
        <div style="padding:25px 50px 0 50px;">
          <ul class="login_tab">
            <span
              v-for="(item,index) in titleTab"
              :key="index"
              :class="{spanActive:logintabKey == index}"
              @click="logintab(index)"
            >{{item}}</span>
          </ul>
          <div class="login_tab01" v-if="logintabKey==0">
            <el-form
              :model="UseformData"
              :rules="rules"
              ref="UseformData"
              class="demo-ruleForm">
              <el-form-item prop="userName">
                <div class="lginput">
                  <img class="icon"
                    src="../../assets/image/icon-login05.png"
                    width="22"
                    height="22"/>
                  <el-input placeholder="请输入您的用户名"
                    v-model="UseformData.userName"
                    style="width:85%;">
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <div class="lginput">
                  <img class="icon"
                    src="../../assets/image/icon-login03.png"
                    width="22"
                    height="22"/>
                  <el-input
                    v-if="pwdType"
                    type="password"
                    placeholder="请输入您的密码"
                    v-model="UseformData.password"
                    style="width:73%;"
                    auto-complete="off"
                  ></el-input>
                  <el-input
                    v-else
                    placeholder="请输入密码"
                    v-model="UseformData.password"
                    style="width:73%;"
                    auto-complete="off"
                  ></el-input>
                  <img class="eye_img"
                    v-lazy="seen ? seenImg : unseenImg"
                    @click="changeType()"/>
                </div>
              </el-form-item>
              <el-form-item prop="picCode">
                <div class="lginput">
                  <img class="icon"
                    src="@/assets/image/icon-login06.png"
                    width="22"
                    height="22"/>
                  <el-input placeholder="请输入图像验证码"
                    v-model="UseformData.picCode"
                    style="width:64%;">
                  </el-input>
                  <img class="identifycode"
                    v-lazy="identifyCode"
                    @click="refreshIdentifyCode"/>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="epf_loginbut epf_btn epf_btn_bg"
                  style="width:388px;margin-left:0"
                  @click="submitForm('UseformData')">
                  登录
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="login_tab02" v-if="logintabKey==1">
            <el-form
              :model="UseformDataPhone"
              :rules="phoneRules"
              ref="UseformDataPhone"
              class="demo-ruleForm">
              <el-form-item prop="phone">
                <div class="lginput">
                  <img class="icon"
                    src="@/assets/image/icon-login13.png"
                    width="22"
                    height="22"/>
                  <el-input placeholder="请输入手机号码"
                    v-model="UseformDataPhone.phone"
                    style="width:85%;">
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item prop="phoneValidate">
                <div class="lginput">
                  <img class="icon"
                    src="@/assets/image/icon-login12.png"
                    width="22"
                    height="22"/>
                  <el-input
                    placeholder="请输入手机验证码"
                    v-model="UseformDataPhone.phoneValidate"
                    style="width:64%;">
                  </el-input>
                  <span v-if="phoneValidateShow"
                    @click="phoneValidate(UseformDataPhone)">
                    获取验证码
                  </span>
                  <span v-else
                    :class="text==='获取验证码'?'spanblue':'spangray'">
                    {{text}}
                  </span>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="epf_loginbut epf_btn epf_btn_bg"
                style="width:388px;margin-left:0"
                  @click="submitFormPhone('UseformDataPhone')">
                  登录
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="misspass">
            <span @click="missPass()">忘记密码</span>
            <span style @click="register()">立即注册</span>
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
  name: "login",
  data() {
    return {
      seen: "",
      time: 120,
      random: "",
      password: "",
      pwdType: true, //此时文本框隐藏，显示密码框
      logintabKey: 0,
      identifyCode: "",
      phoneValidateShow: true,
      unseenImg: require("../../assets/image/icon-login08.png"), //看不见
      seenImg: require("../../assets/image/icon-login07.png"), //看得见密码
      titleTab: ["账号密码登录", "手机验证码登录"],
      defaultImg: 'this.src="' + require("../../assets/image/logo.png") + '"',
      UseformData: {
        userName: "",
        password: "",
        picCode: ""
      },
      UseformDataPhone: {
        phone: "",
        phoneValidate: ""
      },
      phoneRules: {
        phoneValidate: [
          { required: true, message: "请输入您的手机验证码", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "您输入的手机号有误"
          }
        ]
      },
      rules: {
        userName: [
          { required: true, message: "请输入您的用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" }
        ],
        picCode: [
          { required: true, message: "请输入您的验证码", trigger: "blur" }
        ]
      },
    }
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"]),
    text() {
      return this.time > 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  },
  mounted() {
    this.getInformationList();
    if (this.random == null || this.random == "") {
      this.random = Math.random();
    }
    this.identifyCode =
      apiConfig.baseURL1 + "/epf-cms/captcha.jpg?random=" + this.random;
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    logintab(index) {
      this.logintabKey = index;
      if (this.$refs.UseformData && this.$refs.UseformData != undefined) {
        this.$refs.UseformData.resetFields();
      }
      if (
        this.$refs.UseformDataPhone &&
        this.$refs.UseformDataPhone != undefined
      ) {
        this.$refs.UseformDataPhone.resetFields();
      }
    },
    refreshIdentifyCode() {
      // debugger
      this.identifyCode =
        apiConfig.baseURL1 +
        "/epf-cms/captcha.jpg?random=" +
        this.random +
        "&i=" + 
        Math.random();
    },
    missPass() {
      this.$router.push("/findPass/setpOne");
    },
    phoneValidate(e) {
      if (this.UseformDataPhone.phone === "") {
        this.$message.errors = "手机号码不能为空";
        return;
      }
      this.phoneValidateShow = false;
      this.$axios.post(
       "/epf-cms/user/createCode",
          // "/epf-admin/member/createCode",
        qs.stringify({ phone: e.phone, smsCodeType: "2" }),
        res => {
          if (res.code != "0") {
            this.phoneValidateShow = true;
            this.$message.error(res.msg);
            return;
          } else {
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
        this.time = 120;
      }
    },
    changeType() {
      this.seen = !this.seen;
      this.pwdType = !this.pwdType;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          localStorage.clear();
          this.$axios.post("/epf-cms/memberLogin",
            qs.stringify({
              username: this.UseformData.userName,
              password: this.UseformData.password,
              captcha: this.UseformData.picCode,
              random: this.random,
              loginType: "3"
            }),
            res => {
              if (res.code != "0") {
                this.$message.error(res.msg);
                return;
              }
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
            }
          );
        } else {
          return false;
        }
      });
    },
    submitFormPhone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(
            "/epf-cms/memberLogin",
            qs.stringify({
              phone: this.UseformDataPhone.phone,
              smsCode: this.UseformDataPhone.phoneValidate,
              loginType: "2"
            }),
            res => {
              if (res.code != "0") {
                this.$message.error(res.msg);
                return;
              }
              if (res.code != "0") {
                this.$message.error(res.msg);
                return;
              }
              sessionStorage.setItem("login", "yes");
              localStorage.setItem("token", res.token);
              localStorage.setItem("userId",res.id);
              localStorage.setItem(
                "userRealName",
                res.realname
              );
              this.$message({
                message: "登录成功",
                type: "success"
              });
              if (this.$route.query.next) {
                this.$router.push(this.$route.query.next);
              } else {
                sessionStorage.setItem("fromRouterPath", "/");
                this.$router.push(sessionStorage.getItem("fromRouterPath"));
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    register() {
      sessionStorage.removeItem("fromRouterPath");
      this.$router.push("/register");
    }
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem("fromRouterPath", from.fullPath);
    next();
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
  min-height:100%;
  margin: 0 auto;
  overflow: hidden;
  background: url("../../assets/image/icon-loginbj.jpg") no-repeat;
  background-size: 100%;
  position: relative;
  .header-bd {
    margin-top: 100px;
    .login_form {
      @include size(488px, 544px);
      background: #ffffff;
      margin: 0 auto;
      box-sizing: border-box;
      border-radius: 6px;
      box-shadow: 0px 38px 76px 0px 
		rgba(36, 83, 153, 0.28);
	    border-radius: 6px;
      // background: linear-gradient(#f7f8fa, #fff);
      .outer_label {
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
        // img{
        //   margin:13px;
        // }
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
      }
      .login_tab {
      // padding: 67px 52px 70px 48px;
        padding: 0px 50px;
        @include size(100%, 40px);
        border-bottom: 1px solid #f3f3f3;
        font-size: 20px;
        box-sizing: border-box;
        padding: 0 20px;
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
        span {
          font-weight: bold;
          height: 40px;
          color: #666666;
          cursor: pointer;
          display: inline-block;
        }
        .spanActive {
          box-sizing: border-box;
          border-bottom: 2px solid var(--Colors);
          color: var(--lightColor);
        }
      }
      .lginput {
        @include size(390px, 48px);
        border-radius: 3px;
        border: solid 1px #eeeded;
        overflow: hidden;
        img {
          margin: 13px;
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
        .spanblue {
          color: var(--lightColor);
        }
        .spangray {
          color: #999999;
        }
        .identifycode {
          @include size(80px, 36px);
          // vertical-align: middle;
          margin: 0;
          margin-top: 6px;
        }
        .eye_img {
          vertical-align: middle;
          cursor: pointer;
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
    .misspass {
      color: #999999;
      span {
        cursor: pointer;
        &:nth-child(2) {
          color: var(--lightColor);
          float: right;
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
    margin:50px 0;
    // position: absolute;
    // bottom: 50px;
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
<style>
.login_warp .header-bd .login_form .lginput .el-input__inner{border: none;height: 50px;
    line-height: 50px;}
</style>
