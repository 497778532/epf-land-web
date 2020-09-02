<template>
  <!-- 找回密码步骤二模块 -->
  <div class="findPassInfo_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="findPassInfo_Pro">
      <epf-step :active="active" :data="step" style="padding:0 130px;"></epf-step>
      <!-- <el-button @click="btn()">下一步</el-button> -->
      <div class="findPassInfo_Pro_con">
        <div class="lginput">
          <img src="@/assets/image/icon-login03.png" width="22" height="22" alt />
          <input
            type="text"
            placeholder="请设置6-20位字母，数字或字符的新密码"
            v-model="formData.password"
            @blur="validateInfo('password','blur')"
            @focus="validateInfo('password','focus')"
            style="width:88%;"
          />
        </div>
        <div class="validate">
          <span>{{errors.errorsPassword}}</span>
        </div>
        <div class="lginput">
          <img src="@/assets/image/icon-login03.png" width="22" height="22" alt />
          <input
            type="text"
            placeholder="请再次确认密码"
            v-model="formData.againpassword"
            @blur="validateInfo('againpassword','blur')"
            @focus="validateInfo('againpassword','focus')"
            style="width:88%;"
          />
        </div>
        <div class="validate">
          <span>{{errors.errorsAgainpassword}}</span>
        </div>
        <div class="epf_loginbut epf_btn epf_btn_bg" @click="next(formData)">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "findPass",
  data() {
    return {
      active: 2,
      location: [{ path: null, name: "找回密码" }],
      formData: {
        password: "",
        againpassword: ""
      },
      step: ["请输入您要找回密码的账号", "请重置密码", "重置密码成功"],
      errors: {
        errorsPassword: "",
        errorsAgainpassword: ""
      },
      seen: "",
      time: 120,
      phoneValidateShow: true
    };
  },
  methods: {
    btn() {
      if (this.active++ > 2) this.active = 1;
    },
    next(e) {
      if (e.password === "") {
        this.errors.errorsPassword = "*密码不能为空";
        return;
      }
      let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
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
        this.errors.errorsAgainpassword = "*两次输入的密码不匹配";
        return;
      }
      let token = localStorage.getItem("token");
      let random = localStorage.getItem("random");
      let picCode = localStorage.getItem("picCode");
      let phoneValidate = localStorage.getItem("phoneValidate");
      const formData = new FormData();
      formData.append("captcha",picCode);
      formData.append("smsCode",phoneValidate);
      formData.append("random",random);
      formData.append("password",e.againpassword);
      formData.append("token",token);
      formData.append("userId",localStorage.getItem("userId"));
      this.$axios.post(
        // "/epf-cms/user/resetPassword",
        "/epf-cms/resetLoginPassword",
        //  qs.stringify({
        //   captcha: picCode,
        //   smsCode: phoneValidate,
        //   random: random,
        //   password: e.againpassword,
        //   token: token
        // }),
        qs.stringify({
          password: e.againpassword,
          token: token
        }),
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          }
          this.$router.push("/findPass/setpThird");
        }
      );
    },
    validateInfo(name, type) {
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
      }
      if (name === "againpassword") {
        if (type == "blur") {
          if (this.formData.againpassword.trim().length == 0) {
            this.errors.errorsAgainpassword = "*再次密码不能为空";
            return false;
          } else {
            this.errors.errorsAgainpassword = "";
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
      .identifycode {
        @include size(80px, 36px);
        float: right;
        margin-top: 5px;
        margin-right: 14px;
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
