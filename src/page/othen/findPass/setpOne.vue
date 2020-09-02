<template>
  <!-- 找回密码步骤一模块 -->
  <div class="findPassInfo_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="findPassInfo_Pro">
      <epf-step :active="1" :data="step" style="padding:0 130px;"></epf-step>
      <div class="findPassInfo_Pro_con">
        <div class="lginput">
          <img src="@/assets/image/icon-login13.png" width="22" height="22" alt />
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="formData.phone"
            @blur="validateInfo('phone','blur')"
            @focus="validateInfo('phone','focus')"
            style="width:88%;"
          />
        </div>
        <div class="validate">
          <span v-if="formData.phone===''">{{errors.errorsPhone}}</span>
        </div>
        <div class="lginput">
          <img src="@/assets/image/icon-login06.png" width="22" height="22" alt />
          <input
            type="text"
            placeholder="请输入图像验证码"
            v-model="formData.picCode"
            @blur="validateInfo('picCode','blur')"
            @focus="validateInfo('picCode','focus')"
            style="width:65%;"
          />
          <img class="identifycode" :src="identifyCode" @click="refreshIdentifyCode" />
        </div>
        <div class="validate">
          <span v-if="formData.picCode===''">{{errors.errorsPic}}</span>
        </div>
        <div class="lginput">
          <img src="@/assets/image/icon-login12.png" width="22" height="22" alt />
          <input
            type="text"
            placeholder="请输入手机验证码"
            v-model="formData.phoneValidate"
            @blur="validateInfo('phoneValidate','blur')"
            @focus="validateInfo('phoneValidate','focus')"
          />
          <span @click="phoneValidate(formData)" v-if="phoneValidateShow">获取验证码</span>
          <span v-else :class="text==='获取验证码'?'spanblue':'spangray'">{{text}}</span>
        </div>
        <div class="validate">
          <span v-if="formData.phoneValidate===''">{{errors.errorsphoneValidate}}</span>
        </div>
        <div class="epf_loginbut epf_btn epf_btn_bg" @click="next(formData)">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
import apiConfig from "@/util/config.js";
import qs from "qs";
export default {
  name: "findPass",
  data() {
    return {
      location: [{ path: null, name: "找回密码" }],
      identifyCode: "",
      step: ["请输入您要找回密码的账号", "请重置密码", "重置密码成功"],
      random: "",
      formData: {
        phone: "",
        picCode: "",
        phoneValidate: ""
      },
      errors: {
        errorsPhone: "",
        errorsPic: "",
        errorsphoneValidate: ""
      },
      seen: "",
      time: 120,
      phoneValidateShow: true
    };
  },
  computed: {
    text() {
      return this.time > 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  },
  mounted() {
    if (this.random == null || this.random == "") {
      this.random = Math.random();
    }
    this.identifyCode =
      apiConfig.baseURL1 + "/epf-cms/captcha.jpg?random=" + this.random;
  },
  methods: {
    loginOrMine() {
      if (this.loginType) {
        this.$router.push({ path: "/PersonalCenter/myProvide" });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    phoneValidate(e) {
      if (e.phone === "") {
        this.errors.errorsPhone = "*手机号码不能为空";
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(e.phone)) {
        this.$message.error("请输入正确手机号");
        return;
      }
      this.phoneValidateShow = false;
      this.$axios.post(
        "/epf-cms/user/createCode",
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
    refreshIdentifyCode() {
      this.identifyCode =
        apiConfig.baseURL1 +
        "/epf-cms/captcha.jpg?random=" +
        // "/epf-landweb/captcha.jpg?random=" +

        this.random +
        "&i=" +
        Math.random();
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
    next(e) {
      if (e.phone && e.picCode && e.phoneValidate) {
        let that = this;
        //登录接口
        this.$axios.post(          
          "/epf-cms/memberLogin",
          qs.stringify({
            username: e.phone,
            phone: e.phone,
            captcha: e.picCode,
            random: this.random,
            smsCode: e.phoneValidate,
            loginType: "4"
          }),
          res => {
            if (res.code != 0) {
              this.$message.error(res.msg);
              return;
            }
            sessionStorage.setItem("login", "yes");
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.id);
            // localStorage.setItem(
            //   "userRealName", 
            //   res.realname
            // );
            localStorage.setItem("random", that.random);
            localStorage.setItem("picCode", e.picCode);
            localStorage.setItem("phoneValidate", e.phoneValidate);
            //跳转到下一个页面
            this.$router.push("/findPass/setpSecond");
          }
        );
      }
      if (e.phone === "") {
        this.errors.errorsPhone = "*手机号码不能为空";
      }
      if (e.picCode === "") {
        this.errors.errorsPic = "*图片验证不能为空";
      }
      if (e.phoneValidate === "") {
        this.errors.errorsphoneValidate = "*手机号验证不能为空";
      }
    },
    validateInfo(name, type) {
      if (name === "phone") {
        if (type == "blur") {
          if (this.formData.phone.trim().length == 0) {
            this.errors.errorsPhone = "*手机号不能为空";
            return false;
          } else {
            this.errors.errorsPhone = "";
            return true;
          }
        }
      }
      if (name === "picCode") {
        if (type == "blur") {
          if (this.formData.picCode.trim().length == 0) {
            this.errors.errorsPic = "*验证码不能为空";
            return false;
          } else {
            this.errors.errorsPic = "";
            return true;
          }
        }
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
.findPassInfo_Pro {
  @include size(1200px, auto);
  margin: 0 auto;
  background: #fff;
  padding-bottom: 80px;
  &_con {
    @include size(462px, auto);
    margin: 0 auto;
    margin-top: 50px;
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
      .spanblue {
        color: var(--lightColor);
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
</style>
