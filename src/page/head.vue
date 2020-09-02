<template>
  <!-- 公共头部模块 -->
  <div class="header_warp" v-if="InformationList">
    <!-- 
    	@name: 实名认证提示
   		@description: 主要是实名认证
   		@author: swx
    	@chageTime:2019-1-7
	  -->
    <div class="isCertification" v-show="isCertification">
      <div class="first">
        <img src="../assets/image/realname.png" alt />
        <span>请优先完成实名认证，便于您完成更多操作。</span>
      </div>
      <div class="next">
        <span :class="isActive == 0 ? 'active' : ''" @click="certification"
          >实名认证</span
        >
        <span :class="isActive == 1 ? 'active' : ''" @click="nextAgain"
          >下次再说</span
        >
      </div>
    </div>
    <div id="commonTopbar" class="commonTopbar" style="min-width: 1190px;">
      <div class="w pos">
        <div class="bar_left">
          <span id="commonTopbar_ipconfig"
            >Hi，{{ InformationList.currenttiem }}好，{{
              InformationList.information.helloWord
            }}来到{{ InformationList.information.name }}</span
          >
        </div>
        <div class="bar_right">
          <div id="commonTopbar_login">
            <div @click="loginOrMine" class="pc_topbar_log_login">
              {{ loginText }}
            </div>
          </div>
          <span class="gap">|</span>
          <div id="commonTopbar_register">
            <router-link
              v-if="!loginType"
              to="/register"
              class="pc_topbar_log_register"
              >注册</router-link
            >
            <div
              v-if="loginType"
              @click="loginOut"
              class="pc_topbar_log_register"
            >
              退出
            </div>
          </div>
          <span class="gap">|</span>
          <div id="commonTopbar_register">
            <router-link
              to="/PersonalCenter/myMessage"
              class="pc_topbar_log_register"
            >
              <el-badge
                class="pc_topbar_log_register"
                v-if="loginType"
                :value="
                  business + notification <= 0 ? '' : business + notification
                "
                :max="99"
              >
                <div>消息</div>
              </el-badge>
              <div v-if="!loginType" class="pc_topbar_log_register">消息</div>
            </router-link>
          </div>
          <span class="gap">|</span>
          <div id="commonTopbar_help-con">
            <span v-for="(fix, fixindex) in Unfixed" :key="fixindex">
              <router-link
                :to="fix.path"
                class="pc_topbar_log_register"
                active-class="pc_topbar_log_login"
                >{{ fix.name }}</router-link
              >
            </span>
          </div>
          <span class="gap">|</span>
          <div id="commonTopbar_sever">
            <div class="pc_topbar_log_register">
              热线服务：
              <span style="font-weight: bold;">{{
                InformationList.information.hotline
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="landheader">
      <div class="landlogo">
        <router-link to="/">
          <div class="head_logo_nei_l fl">
            <!-- <img
              :src="'/api/epf-document/document/downloadById?id='+InformationList.information.logoUrl"
              style="float: left;margin: 15px 15px 0 0;width: 50px;height: 50px;"
            /> -->
            <div class="head_logo_nei_l_r fl">
              <span
                v-if="InformationList.information.nameEn == null"
                style="line-height:106px;"
                >{{ InformationList.information.name }}</span
              >
              <div v-else>
                <span>{{ InformationList.information.name }}</span>
                <br />
                <span class="subtitle">{{
                  InformationList.information.nameEn
                }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="titles" class="findpass">{{ titles }}</div>
      <div v-else>
        <div @click="switchBtn()" class="addressBtn">
          <img src="../assets/image/j_icon.png" />
          <span>{{ Address }}</span>
          <span class="el-icon-loading" v-if="loading"></span>
          <!--<div v-if="stateBox" style="display: inline-block;">
            <span class="el-icon-arrow-down" v-if="stateDown"></span>
            <span class="el-icon-arrow-up" v-if="stateUp"></span>
          </div>-->
        </div>
        <div class="head_search fr">
          <el-select
            size="small"
            v-model="circulatemodeName"
            @change="circulatemodeSelect(flow_mode, circulatemodeName, $event)"
          >
            <el-option
              v-for="item in flow_mode"
              :ref="item.zhCn"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.zhCn"
              :key="item.dictKey"
            ></el-option>
          </el-select>
          <el-input placeholder="请输入搜索内容" v-model="searchText">
          </el-input>
          <i class="el-icon-search" @click="seniorSelect()"></i>
        </div>
      </div>
      <!--      动态路由地址循环结束-->
    </div>
    <div class="landnav">
      <ul v-if="!titles">
        <router-link
          v-for="(item, index) in datatitle"
          :key="index"
          :to="datatitle[index].path"
          tag="li"
          exact
          active-class="is-active"
          >{{ item.name }}</router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import TMap from "@/components/common/tianditu/init";
import baseURL1 from "@/util/config.js";
export default {
  props: {
    titles: String
  },
  data() {
    return {
      timer: null,
      searchText: "",
      isCertification: false, //是否实名
      isActive: 0,
      InfoConfigBase: {},
      map: "",
      subTitle: "LAND SECONDARY MARKET TRADING SERVICE PLATFORM",
      list: 0,
      datatitle: [],
      loginText: "请登录",
      loginType: false,
      position: {},
      levelList: null,
      Address: "定位中",
      loading: true, //定位中 loading
      stateBox: false, // 箭头外盒子
      stateUp: false, //下箭头切换控制变量
      stateDown: true, //上箭头切换控制变量
      stateControl: true, //中间控制变量
      Unfixed: [],
      baseURLclu: "",
      userId: "",
      circulatemodeName: "转让",
      flow_mode: "",
      filterActive: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      },
      selected: {},
      searchInfo: {},
      circulation: "transfer",
      notification: "",
      business: "",
      messageTotal: ""
    };
  },
  created() {
    this.$axios.get(
      `/epf-admin/dictionaries/getDictEbyDictGroup/flow_mode`,
      {},
      res => {
        this.flow_mode = res.dictionariesList;
      }
    );
    this.baseURLclu =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.loginType = sessionStorage.getItem("login") === "yes";
    this.loginText = this.loginType
      ? "欢迎你 " + localStorage.getItem("userRealName")
      : "请登录";
    this.isCertification =
      this.isCertification == this.loginType ? false : true;
    if (this.loginType) {
      this.userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("userId", this.userId);
      this.$axios.post(
        "/epf-cms/admin/user-autheniton/getreuser-authentication",
        formData,
        res => {
          console.log(res);
          if (
            res.code == 0 &&
            res.userAuthentication.realName != null &&
            this.isCertification === this.loginType
          ) {
            this.isCertification = false;
          } else if (res.userAuthentication == null) {
            this.isCertification = true;
          }
        }
      );
      this.$axios.get(
        "/epf-admin/admin/msgmessage/getOwnListSystem",
        {},
        res => {
          if (res.code == 0) {
            this.notification = Number(res.pager["results"].length);
          }
        }
      );
      this.$axios.get(
        "/epf-admin/admin/msgmessage/getOwnListbusiness",
        {},
        res => {
          if (res.code == 0) {
            this.business = Number(res.pager["results"].length);
          }
        }
      );
    }
    this.getInfoMenuJson();
    //获取菜单  1、获取不固定导航 2、头部主导航  3、尾部主导航 4、头尾部主导航
    this.getTopMenu({ type: "2" });
    this.getTopMenu({ type: "1" });
  },
  beforeDestroy() {
    this.$bus.$off("loginOrMine");
  },
  beforeMount() {
    //初始化创建城市信息
    const addObj = {
      creditCity: "全国", //默认全国
      creditLatitude: 109.5996, //经度
      creditLongitude: 33.50475, //纬度
      cantonProvince: "",
      cantonCity: ""
    };
    if (
      sessionStorage.getItem("Address") &&
      sessionStorage.getItem("Address").creditCity == "全国"
    ) {
      sessionStorage.setItem("Address", JSON.stringify(addObj)); //保存
    }
  },
  mounted() {
    console.log(this.InformationList);
    this.$nextTick(() => {
      this.addressFun();
    });
    this.timer = setTimeout(() => {
      this.isCertification = false;
      if (!this.isCertification) {
        clearTimeout(this.timer);
      }
    }, 300000);
    let url = window.location.href.split("#")[1];
    if (url == "/") {
      //防止页面刷新变量初始化
      this.stateUp = false;
      this.stateDown = true;
      this.stateControl = true;
    } else if (url == "/CityList") {
      this.stateUp = true;
      this.stateDown = false;
      this.stateControl = false;
    }
    this.$bus.$on("callFun", val => {
      this.addressFun();
    });
    this.$bus.$on("loginOrMine", val => {
      this.loginType = false;
      this.loginText = "请登录";
      localStorage.clear();
      sessionStorage.removeItem("login");
    });
    this.$bus.$on("addressFun", val => {
      this.addressFun();
    });
  },
  computed: {
    ...mapState("index", ["menuJsonInfo"]),
    ...mapState("webListMsg", ["InformationList"])
  },
  methods: {
    ...mapActions("index", ["getInfoMenuJson"]),
    circulatemodeSelect(dic, circulationName, event) {
      if (circulationName == "转让") {
        this.filterActive["circulation"] = 1;
        this.selected["circulation"] = circulationName;
        this.searchInfo["circulation"] = "transfer";
        this.circulation = "transfer";
      } else if (circulationName == "出租") {
        this.filterActive["circulation"] = 2;
        this.selected["circulation"] = circulationName;
        this.searchInfo["circulation"] = "rent";
        this.circulation = "rent";
      } else if (circulationName == "抵押") {
        this.filterActive["circulation"] = 3;
        this.selected["circulation"] = circulationName;
        this.searchInfo["circulation"] = "mortgage";
        this.circulation = "mortgage";
      }
    },
    seniorSelect() {
      this.searchInfo["search"] = this.searchText;
      if (this.circulation == "transfer") {
        this.filterActive["circulation"] = 1;
        this.selected["circulation"] = "转让";
        this.searchInfo["circulation"] = "transfer";
        this.circulation = "transfer";
      } else if (this.circulation == "rent") {
        this.filterActive["circulation"] = 2;
        this.selected["circulation"] = "出租";
        this.searchInfo["circulation"] = "rent";
        this.circulation = "rent";
      } else if (this.circulation == "mortgage") {
        this.filterActive["circulation"] = 3;
        this.selected["circulation"] = "抵押";
        this.searchInfo["circulation"] = "mortgage";
      }
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      if (this.searchText) {
        this.$router.push({
          path: "/seniorSearch",
          query: { search: this.searchText }
        });
        return;
      }
      // this.$router.push({ path: "/seniorSearch" });
    },
    // 点击实名认证
    certification() {
      this.isActive = 0;
      this.$router.push({ path: "/attestation" });
      this.isCertification = false;
      clearTimeout(this.timer);
    },
    // 点击下次再说
    nextAgain() {
      this.isActive = 1;
      this.isCertification = false;
      clearTimeout(this.timer);
    },
    //请求接口获取顶部导航数据
    getTopMenu(params) {
      var that = this;
      this.$axios.get("/epf-cms/infomenu/getMenuByPosition", params, res => {
        if (res.code != "0") {
          this.$message.error(res.msg);
          return;
        } else {
          //顶部导航
          if (params.type == 2 || params.type == 4) {
            var menuByPosition = res.menuByPosition;
            for (var i = 0; i < menuByPosition.length; i++) {
              var item = {};
              item.path = `${menuByPosition[i].menuUrl}`;
              item.name = menuByPosition[i].name;
              item.code = menuByPosition[i].code;
              that.datatitle.push(item);
            }
          }
          //尾部导航
          //不固定导航
          if (params.type == 1) {
            var Unfixed = res.menuByPosition;
            for (var i = 0; i < Unfixed.length; i++) {
              var item = {};
              item.path = `${Unfixed[i].menuUrl}`;
              item.name = Unfixed[i].name;
              item.code = Unfixed[i].code;
              that.Unfixed.push(item);
            }
          }
        }
      });
    },
    getBreadcrumb(path) {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== "/" + path) {
        matched = [{ path: "/" + path, meta: { title: path } }].concat(matched);
      }
      this.levelList = matched;
      if (this.levelList[1] && this.levelList[1] !== null) {
        return this.levelList[1].name === path;
      }
      return false;
    },
    changeBgc(index) {
      this.list = index;
    },
    nav(name) {
      this.$router.push(name);
    },
    listSwitch(val) {
      val = parseInt(val);
      this.list = val;
      var menuUrl = this.datatitle[val].path;
      var code = this.datatitle[val].code;
      this.$router.push(menuUrl);
    },
    exitFullscreen() {
      document.webkitCancelFullScreen();
    },
    loginOrMine() {
      if (this.loginType) {
        this.$router.push({ path: "/PersonalCenter/myProvide" });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    loginOut() {
      this.loginType = false;
      this.loginText = "请登录";
      localStorage.clear();
      sessionStorage.removeItem("login");
      sessionStorage.setItem("fromRouterPath", "/");
      this.$router.push(sessionStorage.getItem("fromRouterPath"));
      this.$message({
        message: "您已成功退出",
        type: "success"
      });
      this.isCertification = false;
    },
    switchBtn() {
      //城市组件切换
      if (this.stateControl) {
        this.$router.push("/CityList");
      } else {
        let theUrl = sessionStorage.getItem("cacheRoute");
        this.$router.push(`${theUrl}`);
      }
    },
    addressFun() {
      //初始化城市信息
      let sessinos = JSON.stringify(sessionStorage.getItem("Address"));
      if (sessinos == "null") {
        //未存储过定位信息
        this.Address = "全国";
        this.loading = false; //关闭loading
        this.stateBox = true; //打开state盒子
      } else {
        //已经存储过定位信息
        this.Address = JSON.parse(sessionStorage.getItem("Address")).creditCity;
        this.loading = false; //关闭loading
        this.stateBox = true; //打开state盒子
      }
    }
  },
  watch: {
    $route(to, from) {
      sessionStorage.setItem("cacheRoute", from.path);
      this.addressFun();
      if (to.fullPath == "/CityList") {
        this.stateUp = true; //显示上箭头
        this.stateDown = false; //关闭下箭头
        this.stateControl = false; //切换路由变量-下次 '/'
      } else if (to.fullPath !== "/CityList") {
        this.stateUp = false; //关闭上箭头
        this.stateDown = true; //显示下箭头
        this.stateControl = true; ////切换路由变量-下次 'CityList'
      }
      if (this.getBreadcrumb("PersonalCenter")) {
        this.list = 5;
      }
      if (to.name === "Homepage") {
        this.list = 0;
      }
      this.getBreadcrumb("ServiceCentre");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.header_warp {
  background: #fff;
  .isCertification {
    padding: 0 22px 0 16px;
    height: 40px;
    background: #f2f5f7;
    .first {
      float: left;
      img {
        width: 28px;
        height: 28px;
        margin: 5px 10px 0 0;
      }
      span {
        color: #666666;
        line-height: 40px;
      }
    }
    .next {
      float: right;
      margin-top: 7px;
      span {
        display: inline-block;
        border: 1px solid var(--Colors);
        border-radius: 5px;
        height: 25px;
        width: 82px;
        font-size: 16px;
        color: var(--Colors);
        text-align: center;
        line-height: 25px;
        margin-left: 10px;
      }
      .active {
        border: 1px solid var(--Colors);
        border-radius: 5px;
        background: var(--Colors);
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
  .commonTopbar {
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    position: relative;
    width: 100%;
    height: 39px;
    line-height: 39px;
    // height: 38px;
    // line-height: 38px;
    background: #fff;
    color: #999;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    /deep/ .el-badge__content {
      padding: 0;
    }
    /deep/ .el-badge__content.is-fixed {
      top: 9px;
      right: 4px;
    }
    /deep/ .el-button {
      border: none;
    }
    /deep/ .el-button:hover,
    .el-button:focus {
      background: #fff;
      color: #666;
    }
    .w {
      width: 1190px;
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
        #commonTopbar_help-con,
        #commonTopbar_sever {
          padding: 0 10px;
          display: inline-block;
          vertical-align: middle;
          .pc_topbar_log_register {
            // color: #999;
            color: #666;
            cursor: pointer;
          }
          .pc_topbar_log_login {
            color: var(--Colors);
            font-weight: bold;
            cursor: pointer;
          }
        }
        #commonTopbar_sever {
          span {
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
  }
  .landheader {
    width: 1200px;
    // height: 80px;
    // height: 113px;
    height:106px;
    margin: 0 auto;
    .landlogo {
      // height: 80px;
      // height: 113px;
      height:106px;
      float: left;
      overflow: hidden;
      .head_logo_nei_l {
        width: auto;
        padding-right: 16px;
        cursor: pointer;
        .head_logo_nei_l_r {
          span {
            &:nth-child(1) {
              // letter-spacing: 7px;
              // font-size: 24px;
              font-size: 40px;
              color: var(--priceColor);
              text-shadow: #e7caca 0px 4px 1px;
              font-weight: bold;
            }
            &:nth-child(3) {
              font-size: 17px;
              color: var(--priceColor);
              font-weight: bold;
              text-shadow: #e7caca 0px 3px 1px;
            }
          }
        }
      }
    }
  }
}
.landnav {
  width: 100%;
  background: #07438a;
  height: 56px;
  line-height: 56px;
  color: #fff;
  ul {
    width: 1200px;
    margin: 0 auto;
  }
  li {
    display: inline-block;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    width: 200px;
  }
  li:hover {
    font-weight: bolder;
    background: #053977;
    color: #fff;
  }
  .is-active {
    font-weight: bolder;
    background: #053977;
  }
}
.findpass {
  float: left;
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  color: #646463;
  font-weight: bold;
  border-left: solid 1px #cdcdcd;
  padding-left: 16px;
}
.head_search {
  width: 326px;
  margin-top: 35px;
  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: flex-start;
  border: 1px solid #c2c2c2;
  border-radius: 0;
  /deep/ .el-input__inner {
    border: none;
  }
  /deep/ .el-input__icon {
    width: 90px;
  }
  .el-icon-search {
    margin-right: 10px;
    line-height: 40px;
    font-weight: bold;
    font-size: 20px;
    color: #ce1616;
  }
}
</style>
<style>
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu-item.is-active {
  /* color: #ffb82f; */
  color: #ffb82f;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
.addressBtn {
  position: relative;
  padding: 0 12px;
  height: 23px;
  line-height: 23px;
  /* top: 40px; */
  top: 50px;
  left: 0px;
  text-align: center;
  background-color: #f2f1f9;
  border-radius: 10px;
  color: #666;
  float: left;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.addressBtn span {
  padding-left: 12px;
}
.addressBtn span:hover {
  color: var(--lightColor);
}
.addressBtn img {
  position: absolute;
  top: 4px;
  left: 8px;
}
</style>
