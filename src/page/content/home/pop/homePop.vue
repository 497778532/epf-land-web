<template>
  <!-- 弹框入口主模块 -->
  <div class="homePop">
    <div class="homebox_pop" :class="[homebox?'homebox_pop-show':'homebox_pop-hide']"></div>
    <!-- 发布地源 -->
    <!-- class="publishLandInfo_pop"
        v-drag
        @mousedown="move=true"
        @mouseup="move=false"
    :style="move?'cursor:move':''"-->
    <div
      class="publishLandInfo_pop"
      :class="[publishLandInfo?'publishLandInfo_pop-show':'publishLandInfo_pop-hide']"
    >
      <pop-up-frame @close="close('publishLandInfo')">
        <landPop></landPop>
      </pop-up-frame>
    </div>

    <!-- 发布需求 -->
    <!-- v-drag
      @mousedown="move=true"
      @mouseup="move=false"
    :style="move?'cursor:move':''"-->
    <div
      class="PublishDemand_pop"
      :class="[PublishDemandInfo?'PublishDemand_pop-show':'PublishDemand_pop-hide']"
    >
      <pop-up-frame @close="close('PublishDemandInfo')">
        <demandPop></demandPop>
      </pop-up-frame>
    </div>
    <!-- 合同网签备案 -->
    <!-- v-drag
      @mousedown="move=true"
      @mouseup="move=false"
    :style="move?'cursor:move':''"-->
    <div
      class="SignRecord_pop"
      :class="[SignRecordInfo?'SignRecord_pop-show':'SignRecord_pop-hide']"
    >
      <pop-up-frame @close="close('SignRecordInfo')">
        <contractPop></contractPop>
      </pop-up-frame>
    </div>
    <!-- 委托交易 -->
    <!-- v-drag
      @mousedown="move=true"
      @mouseup="move=false"
    :style="move?'cursor:move':''"-->
    <div
      class="EntrustTrans_pop"
      :class="[entrustTransInfo?'EntrustTrans_pop-show':'EntrustTrans_pop-hide']"
    >
      <pop-up-frame @close="close('entrustTransInfo')">
        <entrustTransPop></entrustTransPop>
      </pop-up-frame>
    </div>
    <!-- 实名认证 -->
    <!-- <div
      class="attestationPop_pop"
      :class="[attestationPop?'attestationPop_pop-show':'attestationPop_pop-hide']"
    >
      <pop-up-frame @close="close('attestationPop')">
        <attestationAgree></attestationAgree>
      </pop-up-frame>
    </div>-->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import PopUpFrame from "@/components/PopUpFrame";
import landPop from "../pop/landPop";
import demandPop from "../pop/demandPop";
import contractPop from "../pop/contractPop";
import entrustTransPop from "../pop/entrustTransPop";
import attestationAgree from "@/page/othen/verify/attestateAgree";
export default {
  components: {
    PopUpFrame,
    landPop,
    demandPop,
    contractPop,
    entrustTransPop,
    attestationAgree
  },
  data() {
    return {
      move: false
    };
  },
  mounted() {
    this.close("homebox"),
      this.close("publishLandInfo"),
      this.close("PublishDemandInfo"),
      this.close("SignRecordInfo"),
      this.close("entrustTransInfo");
      this.contact();
  },
  computed: {
    ...mapState("homeland", [
      "homebox",
      "publishLandInfo",
      "PublishDemandInfo",
      "SignRecordInfo",
      "entrustTransInfo"
    ])
  },
  methods: {
    ...mapMutations("homeland", ["open", "close"]),
    contact() {
      if (this.$router.currentRoute.query.showland == 1) {
        this.open("publishLandInfo");
        document.documentElement.scrollTop = 300;
      } else if (this.$router.currentRoute.query.showdemand == 1) {
        this.open("PublishDemandInfo");
        document.documentElement.scrollTop = 300;
      } else if (this.$router.currentRoute.query.transaction == 1) {
        this.open("entrustTransInfo");
        document.documentElement.scrollTop = 300;
      } else if (this.$router.currentRoute.query.showcontact == 1) {
        let token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          this.$bus.$emit("contactDialogData", true);
          this.open("SignRecordInfo");
          document.documentElement.scrollTop = 300;
        } else {
          // this.$confirm("需要重新登录，是否前往？", "登录已失效!", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning",
          //   closeOnClickModal: false,
          //   closeOnPressEscape: false
          // })
          //   .then(() => {
              this.$router.push({ path: "/login" });
            // })
            // .catch(() => {
            //   this.$bus.$emit("loginOrMine");
            //   this.$router.push({ path: "/" });
            //   this.$message({
            //     showClose: true,
            //     message: "已取消",
            //     type: "warning"
            //   });
            // });
        }
      }
    }
  },
  watch: {
    $route: {
      handler(newRouter) {
        console.log(newRouter);
        if (newRouter.query.showland == 1) {
          this.open("publishLandInfo");
          document.documentElement.scrollTop = 300;
        } else if (newRouter.query.showdemand == 1) {
          this.open("PublishDemandInfo");
          document.documentElement.scrollTop = 300;
        } else if (newRouter.query.transaction == 1) {
          this.open("entrustTransInfo");
          document.documentElement.scrollTop = 300;
        } else if (newRouter.query.showcontact == 1) {
          let token = localStorage.getItem("token");
          console.log(token);
          if (token) {
            this.$bus.$emit("contactDialogData", true);
            this.open("SignRecordInfo");
            document.documentElement.scrollTop = 300;
          } else {
            // this.$confirm("需要重新登录，是否前往？", "登录已失效!", {
            //   confirmButtonText: "确定",
            //   cancelButtonText: "取消",
            //   type: "warning",
            //   closeOnClickModal: false,
            //   closeOnPressEscape: false
            // })
            //   .then(() => {
                this.$router.push({ path: "/login" });
              // })
              // .catch(() => {
              //   this.$bus.$emit("loginOrMine");
              //   this.$router.push({ path: "/" });
              //   this.$message({
              //     showClose: true,
              //     message: "已取消",
              //     type: "warning"
              //   });
              // });
          }
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scope>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.homePop {
  // position: relative;
  .homebox_pop {
    @include size(100%, 100%);
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    &-show {
      display: block;
    }
    &-hide {
      display: none;
    }
  }
  .publishLandInfo_pop {
    position: fixed !important;
    z-index: 99999;
    // left: 50%;
    // top: 50%;
    top: calc(50% - 141px);
    left: calc(50% - 292px);
    // transform: translate3d(-50%,-50%,0);
    &-show {
      display: block;
    }
    &-hide {
      display: none;
    }
  }
  .PublishDemand_pop {
    position: fixed !important;
    z-index: 99999;
    // top: 50%;
    // left: 50%;
    top: calc(50% - 141px);
    left: calc(50% - 292px);
    // transform: translate(-50%,-50%);
    &-show {
      display: block;
    }
    &-hide {
      display: none;
    }
  }
  .SignRecord_pop {
    position: fixed !important;
    z-index: 99999;
    top: 50%;
    left: 50%;
    // top: calc(50% - 341px);
    // left: calc(50% - 500px);
    transform: translate(-50%, -50%);
    &-show {
      display: block;
    }
    &-hide {
      display: none;
    }
  }
  .EntrustTrans_pop {
    position: fixed !important;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-show {
      display: block;
    }
    &-hide {
      display: none;
    }
  }
  .attestationPop_pop {
    position: fixed !important;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-show {
      display: block;
    }
    &-hide {
      display: none;
    }
  }
}
</style>