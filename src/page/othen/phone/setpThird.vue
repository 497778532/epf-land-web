<template>
  <!-- 绑定手机步骤三模块 -->
  <div class="phone">
    <epf-lePage :location="location"></epf-lePage>
    <div class="content">
      <epf-step :active="3" :data="data" style="padding:0 130px;"></epf-step>
      <div class="content_con">
        <div class="content_con_img">
          <img src="@/assets/image/savesuccess.png" alt width="72" height="72" />
        </div>
        <p>手机重新绑定成功，登录密码还是原来的密码！</p>
        <p class="Return">
          {{time}}秒后自动返回
          <span @click="login()" class="fontColor">登录</span>页面...
        </p>
        <div class="epf_loginbut epf_btn epf_btn_bg" style="width:128px;margin:15px calc(50% - 64px)" @click="login()">立即登录</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "findPass",
  data() {
    return {
      location: [{ path: null, name: "重新绑定手机号" }],
      formData: {
        phone: "",
        picCode: "",
        phoneValidate: ""
      },
      data: [
        "身份认证及手机验证码认证",
        "新手机验证码认证",
        "新手机验证码认证"
      ],
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
  created() {
    this.timer();
  },
  methods: {
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.phoneValidateShow = true;
        this.time = 120;
        this.$router.push("/login");
      }
    },
    next(e) {
      if (e.phone && e.picCode && e.phoneValidate) {
        this.$router.push("/findPass/setpSecond");
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
    },
    login() {
      this.$router.push("/login");
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
      .content_con_img {
        @include size(72px, auto);
        margin: 0 auto;
        margin-bottom: 44px;
      }
      p {
        line-height: 24px;
        text-align: center;
        font-size: 18px;
        color: #333333;
      }
      .Return {
        font-size: 14px;
        color: #666666;
        span {
          // color: var(--Colors);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
