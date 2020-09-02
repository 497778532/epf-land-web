<template>
  <!-- 公共底部模块 -->
  <div class="landfooter" v-if="InformationList">
    <div class="footer_top">
      <span v-for="(tail,indextail) in TailNavigation" :key="indextail">
        <ul>
          <span class="first">
            <a v-if="tail.model == '4'" :href="tail.path" :target="tail.target">{{tail.name}}</a>
            <router-link :to="tail.path" v-else>{{tail.name}}</router-link>
            <br />
          </span>
          <span v-for="(child,index1) in tail.child" :key="index1">
            <a v-if="child.model == '4'" :href="child.path" :target="child.target">{{child.name}}</a>
            <router-link v-show="child.name != '委托交易'" :to="child.path" v-else>{{child.name}}</router-link>
            <br />
          </span>
        </ul>
      </span>

      <div class="footer_tel">
        <div class="footer_tel_left">
          <img src="../assets/image/icon_tell.png" alt />
        </div>
        <div class="footer_tel_right">
          <h4>{{InformationList.information.hotline}}</h4>
          <p>{{InformationList.information.workTime}}</p>
        </div>
      </div>
    </div>
    <div class="footer_tiao" style="width:100%;height:1px;background: #161616;"></div>
    <div class="footer_p">
      <span>主办：{{InformationList.information.sponsor}}</span>
      <span>承办：{{InformationList.information.undertake}}</span>
      <span>
        <img src="../assets/image/icon_record.png" alt />
        备案号：{{InformationList.information.filingNumber}}
      </span>
      <!-- <span>版权：{{InformationList.information.allRights}}</span> -->
      <!-- <p>建议使用IE9.0以上浏览器或兼容浏览器，分辨率1280*720</p> -->
      <p>建议使用火狐浏览器或360极速浏览器，分辨率1920*1080</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      TailNavigation: []
    };
  },
  mounted() {
    //获取菜单  1、获取不固定导航 2、头部主导航  3、尾部主导航 4、头尾部主导航
    this.getTopMenu({ type: "3" });
  },
  computed: {
    ...mapState("webListMsg", ["InformationList"])
  },
  methods: {
    getTopMenu(params) {
      //
      var that = this;
      this.$axios.get("/epf-cms/infomenu/getMenuByPosition", params, res => {
        if (res.code != "0") {
          this.$message.error(res.msg);
          return;
        } else {
          var TailNavigation = res.menuByPosition;
          //尾部导航
          if (params.type == 3 || params.type == 4) {
            for (let i = 0; i < TailNavigation.length; i++) {
              let item = {};
              item.path = `${TailNavigation[i].menuUrl}`;
              item.name = TailNavigation[i].name;
              item.id = TailNavigation[i].id;
              item.code = TailNavigation[i].code;
              item.model = TailNavigation[i].model;
              item.target =
                TailNavigation[i].openType == 1 ? "_blank" : "_self";
              item.child = [];
              that.TailNavigation.push(item);
            }
            //尾部导航获取完之后，在获取它的子菜单
            for (let i = 0; i < that.TailNavigation.length; i++) {
              //先获取子菜单
              let id = that.TailNavigation[i].id;
              this.$axios.get(
                "/epf-cms/infomenu/getMenuByPenID",
                { id: id },
                res2 => {
                  if (res2.code != "0") {
                    this.$message.error(res2.msg);
                    return;
                  } else {
                    //
                    //子节点集合信息
                    let menuByPenID = res2.menuByPenID;
                    for (let j = 0; j < menuByPenID.length; j++) {
                      //存储当前节点的信息
                      var child = menuByPenID[j];
                      //保存当前节点信息
                      let items = {};
                      items.name = child.name;
                      items.path = `${child.menuUrl}`;
                      items.code = `${child.code}`;
                      items.model = `${child.model}`;
                      items.target = child.openType == 1 ? "_blank" : "_self";
                      //添加数据
                      that.TailNavigation[i].child.push(items);
                    }
                  }
                }
              );
            }
          }
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landfooter {
  position:relative;
  clear: both;
  background: #313131;
  .footer_top {
    @include size(1200px, auto);
    margin: 0 auto;
    overflow: auto;
    box-sizing: border-box;
    padding: 45px 0;
    line-height: 35px;
    ul {
      width: 240px;
      float: left;
      margin-right: 20px;
      li {
        @include size(auto, 30px);
        width: auto;
        height: 30px;
        font-size: 14px;
      }
      .first a {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }
    }
    .footer_tel {
      float: right;
      margin-right: 60px;
      color: #969696;
      .footer_tel_left {
        float: left;
        img {
          margin-right: 20px;
        }
      }
      .footer_tel_right {
        display: inline-block;
        box-sizing: border-box;
        padding-top: 10px;
        color: #969696;
        h4 {
          text-align: center;
          line-height: 25px;
          font-size: 16px;
        }
        p {
          text-align: center;
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
  }
  .footer_top a {
    color: #969696;
  }
  .footer_p {
    @include size(1200px, auto);
    margin: 0 auto;
    clear: both;
    line-height: 30px;
    color: #969696;
    font-size: 14px;
    box-sizing: border-box;
    padding: 25px 0;
    span {
      margin-right: 42px;
    }
    img {
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
</style>
