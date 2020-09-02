<template>
  <!-- 找回密码步骤三模块 -->
  <div class="findPassInfo_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="findPassInfo_Pro">
      <epf-step :active="3" :data="step" style="padding:0 130px;"></epf-step>
      <div class="findPassInfo_Pro_con">
        <div class="findPassInfo_Pro_con_img">
          <img src="@/assets/image/savesuccess.png" alt width="72" height="72" />
        </div>
        <p>密码已设置成功！</p>
        <p class="Return">
          {{time}}秒后自动返
          <span @click="login()">登录</span>页面...
        </p>
        <div class="epf_loginbut epf_btn epf_btn_bg" style="width:128px;margin:15px calc(50% - 64px);" @click="login()">立即登录</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "findPass",
  data() {
    return {
      location: [{ path: null, name: "找回密码" }],
      formData: {
        phone: "",
        picCode: "",
        phoneValidate: ""
      },
      step: ["请输入您要找回密码的账号", "请重置密码", "重置密码成功"],
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
        // alert("登录成功")
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
.findPassInfo_Pro {
  @include size(1200px, auto);
  margin: 0 auto;
  background: #fff;
  padding-bottom: 80px;
  &_con {
    @include size(462px, auto);
    margin: 0 auto;
    &_img {
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
        color: var(--Colors);
        cursor: pointer;
      }
    }
  }
}
</style>