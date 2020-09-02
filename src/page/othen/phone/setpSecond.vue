<template>
  <!-- 绑定手机步骤二模块 -->
  <div class="phone">
    <epf-lePage :location="location"></epf-lePage>
    <div class="content">
      <epf-step :active="2" :data="data" style="padding:0 130px;"></epf-step>
      <div class="content_con">
        <div class="lginput">
          <img src="@/assets/image/icon-login13.png" width="22" height="22" alt />
          <input
            type="text"
            placeholder="请输入新绑定的手机号"
            v-model="formData.phone"
            @blur="validateInfo('phone','blur')"
            @focus="validateInfo('phone','focus')"
            style="width:88%;"/>
        </div>
        <div class="validate">
          <span v-if="formData.phone===''">{{errors.errorsPhone}}</span>
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
import qs from "qs";
export default {
  name: "findPass",
  data() {
    return {
      time: 120,
      phoneValidateShow: true,
      data: [
        "身份认证及手机验证码认证",
        "新手机验证码认证",
        "新手机验证码认证"
      ],
      location: [{ path: null, name: "重新绑定手机号" }],
      formData: {
        password: "",
        againpassword: ""
      },
      errors: {
        errorsPassword: "",
        errorsAgainpassword: ""
      },
      userId: ""
    };
  },
  computed: {
    text() {
      return this.time > 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  },
  created() {
    this.userId = localStorage.getItem("userId");
  },
  methods: {
    next(e) {
      debugger
      this.$axios.post(
        "/epf-cms/admin/user/updatephone",
        qs.stringify({phone: e.phone,userId: this.userId}),
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          }
          this.$router.push("/bindPhone/setpThird");
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
        "/epf-cms/user/createCode",
        qs.stringify({ phone: e.phone, smsCodeType: "1" }),
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
.phone {
  @include size(100%, auto);
  background: #f2f1f9;
  .content {
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
          float: right;
          margin-top: 5px;
          margin-right: 14px;
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
