<template>
  <!-- 个人中心 -->
  <div class="epf_not_sele">
    <epf-lePage :location="location"></epf-lePage>
    <div class="win1200" style="background:#fff;">
      <el-container>
        <el-aside class="aside" width="200px" style="background:#ebeef5;">
          <!-- 头像及认证情况 -->
          <div class="userBrief">
            <div class="useImg">
              <!-- <img class="useImg" src="@/assets/image/mineCenterHeader.jpg" alt />-->
              <img alt  class="useImg1" ref="useImg1" v-lazy="baseUrl +  Imgid"/>
            </div>
            <span class="userNike">Hi,{{userName}}</span>
            <el-row>
              <el-col :span="6" v-for="(item,index) in tipsArray" :key="index">
                <img class="icons" v-lazy="item.type?item.ok:item.dis" />
              </el-col>
            </el-row>
          </div>
          <!-- #ffa000 -->
          <!-- 左侧导航 -->
          <el-menu
            :default-active="$route.path"
            router
            active-text-color="#2d488d"
            background-color="#ebeef5"
           >
            <div v-for="(item,index) in menuData" :key="index" class="personal">
              <el-submenu
                :index="'/PersonalCenter/'+item.router"
                v-if="item.child"
                :default-active="$route.path"
              >
                <template slot="title">{{item.title}}</template>
                <el-menu-item-group>
                  <el-menu-item
                    :index="'/PersonalCenter/'+child.router"
                    v-for="(child,childIndex) in item.child"
                    :key="childIndex"
                  >{{child.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item :index="'/PersonalCenter/'+item.router" v-if="!item.child">
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 右侧子路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import baseURL1 from '@/util/config'
export default {
  data() {
    return {
      location: [{ path: "/", name: "首页" }, { path: null, name: "个人中心" }],
      test: require("@/assets/image/realName_dis.png"),
      userName: "超级用户",
      defaultImg:require("../../../assets/image/useImg.png"), //默认图地址
      menuData: [
        {
          title: "我的供给",
          router: "1",
          child: [
            {
              title: "供给发布",
              router: "myProvide"
            },
            {
              title: "供给匹配",
              router: "provideMate"
            }
          ]
        },
        {
          title: "我的需求",
          router: "2",
          child: [
            {
              title: "需求登记",
              router: "demandRegister"
            },
            {
              title: "需求匹配",
              router: "demandMate"
            }
          ]
        },
        {
          title: "我的申购",
          router: "4",
          child: [
            {
              title: "意向报价",
              router: "intentionPrice"
            },
            {
              title: "预约看地",
              router: "orderLand"
            },
            {
              title: "我的订单",
              router: "myOrder"
            }
          ]
        },
        {
          title: "委托交易",
          router: "5",
          child: [
            {
              title: "我的委托交易",
              router: "entrustDeal"
            },
            {
              title: "履约保证金",
              router: "performanceBond"
            },

          ]
        },
        {
          title: "我的保证金",
          router: "mydeposit"
        },
        {
          title: "我的合同",
          router: "registerContract"
        },
        {
          title: "账户设置",
          router: "safetySet"
        },
        {
          title: "我的收藏",
          router: "myCollect"
        },
        {
          title: "我的消息",
          router: "myMessage"
        }
      ],
      tipsArray: [
        {
          type: false,
          ok: require("@/assets/image/realName_success.png"),
          dis: require("@/assets/image/realName_dis.png")
        },
        {
          type: true,
          ok: require("@/assets/image/phone_success.png")
        },
        {
          type: false,
          ok: require("@/assets/image/email_success.png"),
          dis: require("@/assets/image/email_dis.png")
        },
        {
          type: false,
          ok: require("@/assets/image/address_success.png"),
          dis: require("@/assets/image/address_dis.png")
        }
      ],
      userId: "",
      baseUrl: '', //地址前缀
      Imgid:null
    };
  },
  created() {
    this.baseUrl = baseURL1.baseURL1 + '/epf-document/document/downloadById?id='
    this.userId = localStorage.getItem("userId");
    const formData = new FormData();
    let that = this;
    formData.append("userId", that.userId);
    this.$axios.post("/epf-cms/admin/user-autheniton/getreuser-authentication",formData,res => {
        if (res.code == 0 || res.code == '0') {
          let userinfo = res.homeUser;
          let userAuthentication = res.userAuthentication;
          this.Imgid = userinfo.idcardBack
          if(this.Imgid !== null||this.Imgid !== ""){
            this.$refs.useImg1.src = require("../../../assets/image/useImg.png")
          }
          // if (userAuthentication == null) {
            if (userinfo.userType === '0') {//个人用户显示
              this.userName = userAuthentication == null?userinfo.realName:userAuthentication.realName;
            } else if (userinfo.userType === '1') {//企业用户显示
              this.userName = userAuthentication == null?userinfo.companyName:userAuthentication.companyName;
            }
          // }
          if (this.userName == "" || this.userName == null) {
            this.userName = localStorage.getItem("userRealName");
          }
        }
      })
  }
};
</script>
<style lang="scss" scoped>
.userBrief {
  width: 100%;
  height: 225px;
  text-align: center;
  padding-top: 30px;
  border-bottom: 1px solid #f3f3f3;
  .useImg {
    width: 100px;
    height: 100px;
    background:#fff;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 12px;
    box-shadow: 0px 6px 10px rgb(236, 236, 236);
    display: flex;
    justify-content:center;
    align-items: center;
    .useImg1{
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  .userNike {
    display: inline-block;
    margin: 0 auto;
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.icons {
  display: block;
  margin: 0 auto;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>
<style>

.tabBox .el-tabs__item{
  height:36px;
  line-height: 20px;
}
.el-submenu.is-active .el-submenu__title{
  border-bottom-color:#e2e2e2;
}
.el-input--small .el-input__inner{
  height: 40px;
  line-height: 40px;
}
.el-range-editor--small.el-input__inner{
  height: 40px;

}.el-range-editor--small .el-range-separator{
  line-height:33px;
}
</style>
