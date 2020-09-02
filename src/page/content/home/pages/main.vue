<template>
  <div class="maintop" id="maintop">
      <div class="land-type"> 
        <i><img src="../../../../assets/image/indexEnter.jpg" alt=""></i>
        <span>快捷入口</span>
      </div>
      <ul>
        <li @click="open('publishLandInfo')">
          <img src="../../../../assets/image/blueIcon_01.jpg" />
          <p>发布地源</p>
        </li>
        <li @click="open('PublishDemandInfo')">
          <img src="../../../../assets/image/blueIcon_02.jpg" />
          <p>发布需求</p>
        </li>
        <!-- <li @click="go()">
          <img src="../../../../assets/image/icon-04.png" />
          <p>土地评估服务</p>
        </li> -->
        <!-- style="margin-right:0px;" -->
        <li @click="openDialog(2)">
          <img src="../../../../assets/image/blueIcon_04.jpg" />
          <p>委托交易</p>
        </li>
        <li @click="openDialog(1)">
          <img src="../../../../assets/image/blueIcon_03.jpg" />
          <p>合同服务</p>
        </li>
      </ul>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      move: false
    };
  },
  mounted() {
    if (this.$route.query.openSign) {
      this.$bus.$emit("contactDialogData", true);
      this.open("SignRecordInfo");
    }
    this.$store.state.publishLand = null
  },
  methods: {
    ...mapMutations("homeland", ["open"]),
    go() {
      this.$router.push({ path: "/serveSearch" });
    },
    openDialog(index) {
      let token = localStorage.getItem("token");
      if (token) {
        if (index === 1) {
          this.$bus.$emit("contactDialogData", true);
          this.open("SignRecordInfo");
        } else {
          this.$bus.$emit("reqDialogData", true);
          this.open("entrustTransInfo");
        }
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
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.maintop {
  @include size(100%, 300px);
    box-sizing: border-box;
    float: left;
    width: 220px;
    height: 300px;
    margin-right: 10px;
    border: 1px solid #d2d2d2;
    background-color: #fff;
    .land-type{
      padding:14px 0 11px 20px;
      border-bottom:1px solid #d2d2d2;
      img{
        width: 20px;
        height:20px;
        margin-right:4px;
      }
    }
  ul {
    padding:31px 15px 0 15px;
    li {
      width: 50%;
      float: left;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      transition: 0.1s;
      img {
        @include size(50px, 50px);
      }
      p {
        line-height: 40px;
        font-size: 14px;
        color: #333;
        text-align: center;
        font-weight: bold;
      }
    }
    li:hover {
      transform: translateY(-5px);
      -ms-transform: translateY(-5px); /* IE 9 */
      -moz-transform: translateY(-5px); /* Firefox */
      -webkit-transform: translateY(-5px); /* Safari 和 Chrome */
      -o-transform: translateY(-5px); /* Opera */
    }
  }
}
</style>