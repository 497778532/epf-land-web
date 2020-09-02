<template>
  <div style="padding-bottom:30px;">
    <epf-lePage :location="location"></epf-lePage>
    <div class="win1200" :style="{minHeight:boxHeight+'px',background:'#fff'}">
      <el-container>
        <el-aside width="200px">
          <el-menu 
            active-text-color="#2d488d"
            background-color="#ebeef5"
            :default-active="defaulid" mode="vertical">
            <div v-for="(item1,index1) in menuData" :key="index1">
              <div v-for="(item,index) in item1.childInfoMenu" :key="index">
                <el-submenu :index="item.id" v-if="item.childInfoMenu.length>0">
                  <template slot="title">{{item.name}}</template>
                  <el-menu-item-group>
                    <el-menu-item
                      @click="menuInfoClick(child)"
                      :index="child.id"
                      v-for="(child,childIndex) in item.childInfoMenu"
                      :key="childIndex"
                    >{{child.name}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item
                  @click="menuInfoClick(item)"
                  :index="item.id"
                  v-if="item.childInfoMenu.length==0"
                >
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </div>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <template>
            <div class="platformIntroduct_warp">
              <div class="platformIntroduct_title">{{info.title}}</div>
              <div class="platformIntroduct_con">
                <p v-html="info.content"></p>
              </div>
            </div>
          </template>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      defaulid: "",
      location: [
        { path: "/HelpCenter", name: "帮助中心" },
        { path: null, name: "平台介绍" }
      ],
      searchCriteria: "",
      breadcrumbItems: ["导航一"],
      menuData: [],
      boxHeight:null
    };
  },
  created() {
    var that = this;
    this.boxHeight = window.innerHeight - 469
    that.$axios.get(this.$API.EPF_CMS.LIST, { code: "helpcenter" }, res => {
      if (res.code != "0") {
        that.$message.error(res.msg);
        return;
      }
      this.menuData = res.infoMenus;
      var item = {};
      if (res.infoMenus != null && res.infoMenus.length > 0) {
        if (res.infoMenus[0].childInfoMenu.length == 0) {
          return;
        }
        if (res.infoMenus[0].childInfoMenu[0].childInfoMenu.length == 0) {
          item = res.infoMenus[0].childInfoMenu[0];
        } else {
          item = res.infoMenus[0].childInfoMenu[0].childInfoMenu[0];
        }
        that.defaulid = item.id;
        that.menuInfoClick(item);
      }
    });
  },
  methods: {
    menuInfoClick(data) {
      var that = this;
      that.$axios.get(this.$API.EPF_CMS.CODE, { code: data.id }, res => {
        if (res.code != "0") {
          that.$message.error(res.msg);
          return;
        }
        if (!res.info.id) {
          res.info.title = "暂无已发布的数据";
        }
        that.info = res.info;
      });
    },
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/Page1");
          this.breadcrumbItems = ["导航一"];
          break;
        case "2":
          this.$router.push("/Page2");
          this.breadcrumbItems = ["导航二"];
          break;
        case "3":
          this.$router.push("/Page3");
          this.breadcrumbItems = ["导航三"];
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// .el-container {
//   background: #f2f1f9;
//   .el-aside {
//     margin-right: 20px;
//     background: #fff;
//     .el-menu {
//       border: none;
//     }
//     .el-menu-item {
//       padding-left: 25px !important;
//     }
//     .el-menu-item:hover {
//       color: #ff8a00;
//       box-sizing: border-box;
//       border-left: 1px solid #ff8a00;
//     }
//     .el-menu-item.is-active {
//       color: #ff8a00;
//       box-sizing: border-box;
//       border-left: 1px solid #ff8a00;
//     }
//     .el-submenu__title {
//       padding-left: 40px;
//     }
//     .el-submenu__title:hover {
//       color: #ff8a00;
//       box-sizing: border-box;
//       border-left: 1px solid #ff8a00;
//     }
//     .el-submenu__icon-arrow {
//       background: url("../../../assets/image/icon-22.png") no-repeat center
//         center;
//     }
//     .el-menu {
//       .el-submenu {
//         .el-submenu__title:hover {
//           color: #ff8a00;
//           box-sizing: border-box;
//           border-left: 1px solid #ff8a00;
//         }
//       }
//     }
//     .el-menu--inline {
//       .el-menu-item-group {
//         .el-menu-item-group__title {
//           padding: 0 !important;
//         }
//       }
//     }
//   }
//   .el-main {
//     background: #fff;
//   }
// }
.platformIntroduct_warp {
  .platformIntroduct_title {
    border-bottom: solid 1px #eeeeee;
    font-size: 16px;
    color: #666;
    line-height: 56px;
    min-height: 56px;
    text-align: center;
    font-weight: bold;
  }
  .platformIntroduct_con {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
}
.attestationIcon {
  display: block;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  border: 1px solid #333;
}
</style>
