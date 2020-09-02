<template>
  <div class="header_warp">
    <div id="commonTopbar" class="commonTopbar" style="min-width: 1190px;">
      <div class="w pos">
        <div class="bar_left" v-if="InformationList">
          <span id="commonTopbar_ipconfig">
            Hi，{{ InformationList.currenttiem }}好，{{
              InformationList.information.helloWord
            }}来到{{ InformationList.information.name }}
          </span>
        </div>
        <div class="bar_right">
          <div id="commonTopbar_login">
            <router-link to="/" class="pc_topbar_log_register index"
              >首页</router-link
            >
          </div>
          <span class="gap">|</span>
          <div id="commonTopbar_register">
            <router-link to="/HelpCenter" class="pc_topbar_log_register"
              >帮助中心</router-link
            >
          </div>
          <span class="gap">|</span>
          <div id="commonTopbar_sever">
            <div class="pc_topbar_log_register" v-if="InformationList">
              热线服务：
              <!-- <strong style="color:#666666">400-888-9315</strong> -->
              <strong style="color:#666666">{{
                InformationList.information.hotline
              }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="register_success">
      <div class="w">
        <h2 class="register_success_prompt">注册成功提示 ：</h2>
        <div class="congratulate">
          <img src="@/assets/image/registerSuccecc.gif" alt="" />
          <h2 class="congratulate_msg">恭喜您注册成功</h2>
          <div class="welcome_message">
            <p>欢迎您进入{{ InformationList.information.name }}，我们将为您提供最优质的服务</p>
            <p><span>完成实名</span>认证以后，您可以优享更多功能</p>
            <p>
              <span>{{ num }}</span
              >秒之后自动跳转<span @click="backIndex" style="cursor: pointer"
                >首页...</span
              >
            </p>
          </div>
          <div class="complete">
            <span
              :class="isActive == 0 ? 'active' : 'back_index'"
              @click="certification"
              >实名认证</span
            >
            <span
              :class="isActive == 1 ? 'active' : 'back_index'"
              @click="backIndex"
              >返回首页</span
            >
          </div>
        </div>
      </div>
    </div>
    <epf-foot></epf-foot>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import qs from "qs";
import axios from "axios";
import apiConfig from "@/util/config.js";
import foot from "@/page/foot";
export default {
  components: {
    "epf-foot": foot
  },
  data() {
    return {
      isActive: 0,
      num: 30,
      timer: null
    };
  },
  mounted() {
    this.getInformationList();
    this.countDown();
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"])
  },
  methods: {
    ...mapActions("webListMsg", ["getInformationList"]),
    certification() {
      this.isActive = 0;
      this.$router.push({ path: "/attestation" });
      clearInterval(this.timer);
    },
    //返回首页
    backIndex() {
      this.isActive = 1;
      this.$router.push({ path: "/" });
      clearInterval(this.timer);
    },
    //倒计时跳转首页
    countDown() {
      this.timer = setInterval(() => {
        console.log(this.num);
        this.num--;
        if (this.num <= 0) {
          this.$router.push("/");
          this.num = 30;
          clearInterval(this.timer);
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.header_warp {
  background: #fff;
  .commonTopbar {
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    position: relative;
    width: 100%;
    height: 38px;
    line-height: 38px;
    background: #fff;
    color: #999;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    .w {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .bar_left {
        word-spacing: 1px;
        height: 38px;
        line-height: 38px;
        display: inline-block;
      }
      .bar_right {
        float: right;
        position: relative;
        #commonTopbar_login,
        #commonTopbar_register,
        #commonTopbar_sever {
          padding: 0 10px;
          display: inline-block;
          vertical-align: middle;
          .pc_topbar_log_register {
            color: #999;
            cursor: pointer;
          }
          .pc_topbar_log_login {
            color: var(--Colors);
            font-weight: bold;
            cursor: pointer;
          }
          .index {
            color: var(--Colors);
          }
        }
      }
    }
  }
}
.register_success {
  width: 100%;
  height: 844px;
  background: url("../../../../src/assets/image/registerSuccessBG.png");
  .w {
    width: 1200px;
    margin: 0 auto;
    .register_success_prompt {
      font-size: 30px;
      line-height: 30px;
      padding: 35px 0 42px 0;
      color: #666666;
    }
    .congratulate {
      height: 695px;
      margin: 0 auto;
      background: #fff;
      border-radius: 7px;
      img {
        display: block;
        margin: 0 auto;
      }
      .congratulate_msg {
        font-size: 30px;
        color: #333333;
        text-align: center;
        margin: 10px 0;
        line-height: 30px;
      }
      .welcome_message {
        text-align: center;
        p {
          line-height: 36px;
          font-size: 16px;
          color: #666666;
        }
        span {
          color: #2d62b5;
        }
      }
      .complete {
        text-align: center;
        margin-top: 23px;
        .back_index {
          display: inline-block;
          border: 1px solid var(--Colors);
          border-radius: 5px;
          height: 48px;
          width: 339px;
          font-size: 16px;
          font-weight: bold;
          color: var(--Colors);
          text-align: center;
          line-height: 48px;
          margin-left: 20px;
        }
      }
    }
  }
  .active {
    display: inline-block;
    border: 1px solid var(--Colors);
    border-radius: 5px;
    background: var(--Colors);
    height: 48px;
    width: 339px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
  }
}
</style>
<style></style>
