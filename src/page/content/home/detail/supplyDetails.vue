<template>
  <div class="landDetails_warp">
    <epf-lePage :location="location"></epf-lePage>
    <div class="supplyLand">
      <div class="supplyLand_top win1200" v-if="tPurchase&&tPurchase!==null">
        <div class="supplyLand_top_right">
          <p style="font-weight:800;font-size:18px;color:#333;margin-bottom:26px;">
            <span
              :class="{'landDemandBuy':tPurchase.demandName=='求购','landDemandRent':tPurchase.demandName=='求租'}"
            >{{tPurchase.demandName}}</span>
            {{tPurchase.title}}
          </p>
          <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#eeeeee" style="margin-bottom:30px;">
            <tr height="46px">
              <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">行政区域：</span>
                {{tPurchase.cantonProvinceName}}{{tPurchase.cantonCityName}}{{tPurchase.cantonAreaName}}
              </td>
              <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">使用时间：</span>
                {{tPurchase.useBeginDate}} - {{tPurchase.useEndDate}}
              </td>
              <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">土地用途：</span>
                {{tPurchase.firstClassUseName}} - {{tPurchase.secondClassUseName}}
              </td>
            </tr>
            <tr height="46px">
              <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">意向价格：</span>
                {{tPurchase.price?'¥'+Division(tPurchase.price) + ' 万元':'面议'}}
              </td>
              <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">使用年限：</span>
                {{tPurchase.years?tPurchase.years+'年':''}}
              </td>
              <td colspan="2">
                <span style="font-size:14px;color:#999;margin-left:10px;">土地位置：</span>
                {{tPurchase.location}}
              </td>
            </tr>
            <tr height="46px">
              <td colspan="2">
                <span style="font-size:14px;color:#999;margin-left:10px;line-height:46px;">联系人：</span>
                <span v-if="!isLogin">{{tPurchase.contact}}</span>
                <span v-else>{{tPurchase.contact.substring(0,1)}}***</span>
                <span style="font-size:14px;color:#999;line-height:46px;margin-left:60px;">联系电话:</span>
                <span v-if="!isLogin">{{tPurchase.phone}}</span>
                <span v-else >{{tPurchase.phone.substring(0,3)}}****{{tPurchase.phone.substring(7,11)}}</span>
                <span v-if="isLogin" style="margin-left:60px;" @click="toLogin">
                  <i class="supplyLandP_active">登录</i>后查看完整信息
                </span>
              </td>
              <td colspan="2">
                  <span style="font-size:14px;color:#999;margin-left:10px;">土地面积：</span>
                  {{tPurchase.area?tPurchase.area:''}}&nbsp;-&nbsp;{{tPurchase.areaMax?tPurchase.areaMax:''}}平方米
              </td>
            </tr>
            <tr height="46px">
              <td colspan="4">
                <span style="font-size:14px;color:#999;margin-left:10px;">需求说明：</span>
                {{tPurchase.remark?tPurchase.remark:'暂无'}}
              </td>
            </tr>
          </table>
          <div class="input_sub_collect" v-show="(tPurchase.isCollect=='0' || !tPurchase.isCollect) && tPurchase.insertUser != userId" @click="nocollect(tPurchase.id,'collect')">
            <img src="@/assets/image/collect1-1.png" alt style="margin-top:9px;" width="20" height="20"/>
            <span>收藏</span>
          </div>
          <div class="input_sub_collect" v-show="tPurchase.isCollect=='1' && tPurchase.insertUser != userId" @click="collect(tPurchase.collectId,'collect')">
            <img src="@/assets/image/collect-1.png" alt style="margin-top:9px;" width="18" height="18"/>
            <span>取消收藏</span>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>
      <!-- 相似土地推荐 -->
      <div class="supplyLand_main">
        <div class="supplyLand_main_warp">
          <ContentpageHeader :contpageHeadTitle="contpageHeadTitle"></ContentpageHeader>
          <div class="supplyLand_main_con">
            <ul>
              <li v-for="(items,index) in landData" :key="index" @click="openDetail(items.id)">
                <div class="supplyLand_mainli_top">
                  <img :src="baseUrl + items.img" alt :onerror="defaultImg" />
                  <div class="supplyLand_mainli_top_personal" v-if="items.landType=='personal_land'">{{items.landTypeName}}</div>
                  <div class="supplyLand_mainli_top_enterprise" v-else-if="items.landType=='enterprise_land'">{{items.landTypeName}}</div>
                  <div class="supplyLand_mainli_top_enterprise" v-else>{{items.landTypeName}}</div>
                  <!-- <div class="supplyLand_mainli_top_enterprise" v-if="items.landType==='政府所属'">{{items.landTypeName}}</div> -->
                </div>
                <div class="supplyLand_mainli_bot">
                  <h4>{{items.title}}</h4>
                  <span
                    class="supplyLand_mainli_bot_active"
                  >{{items.price?Division(items.price) + ' 万元':'面议'}}</span>
                  <h5>
                    <span>
                      <img src="../../../../assets/image/icon-area.png" alt style="margin-left:-2px;" />
                      {{items.area}}平方米
                    </span>
                    <span class="fr">
                      <img src="../../../../assets/image/icon-time.png" alt />
                      {{items.years}}年
                    </span>
                  </h5>
                  <p>
                    <img src="../../../../assets/image/icon-map.png" alt style="margin-left:-5px;" />
                    {{items.cantonProvinceName}} / {{items.cantonCityName}} / {{items.cantonAreaName}}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ContentpageHeader from "@/components/ContentpageHeader";
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  components: {  ContentpageHeader },
  data() {
    return {
      userId: "",
      isLogin: false,
      baseUrl: "",
      indexcollect: 1,
      location: [
        { path: "/", name: "首页" },
        { path: "/", name: "找地需求" },
        { path: null, name: "土地需求详情" }
      ],
      spanKey: 4,
      contpageHeadTitle: "相似土地推荐",
      tPurchase: {
        img: "",
        isCollect: 0,
        title: "",
        demand: "",
        phone: "",
        contact: "",
        cantonProvinceName: "",
        cantonCityName: "",
        cantonAreaName: "",
        useBeginDate: "",
        useEndDate: "",
        firstClassUseName: "",
        secondClassUseName: "",
        location: "",
        remark: "",
        location: "",
        area: "",
        price: "",
        years: ""
      },
      landData: [
        // {landType:"个人用地",url:require('../../assets/image/icon-11.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"企业用地",url:require('../../assets/image/icon-12.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"政府所属",url:require('../../assets/image/icon-11.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"个人用地",url:require('../../assets/image/icon-12.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"企业用地",url:require('../../assets/image/icon-11.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"政府所属",url:require('../../assets/image/icon-12.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"个人用地",url:require('../../assets/image/icon-11.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
        // {landType:"企业用地",url:require('../../assets/image/icon-12.jpg'),title:"永州宁远县700亩水田转让",price:"面议",area:500,years:50,location:"永州市-宁远县"},
      ],
      collectionData: [],
      defaultImg:
        'this.src="' + require("../../../../assets/image/icon-nodata.png") + '"' //默认图地址
    };
  },
  created() {
    window.scrollTo(0, 0);
    let supplyId = this.$route.query.supply;
    this.userId = localStorage.getItem("userId");
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    function getChangeDate(date) {
      return (
        // date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
          ? /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0]
          : ""
      );
    }    
    let url;
    if(sessionStorage.getItem("login")){
        url="/epf-landweb/admin/tpurchase/getTPurchase?id="
    }else{
        url='/epf-landweb/tpurchase/getTPurchase?id='
    }
    this.$axios.get(
      url + supplyId,
      {},
      res => {
        // console.log('sffffffffffffff',res);
        //控制日期不要显示1970-1-1
        this.tPurchase = res.tPurchase;
        if (
          res.tPurchase.useBeginDate != null &&
          res.tPurchase.useEndDate != null
        ) {
          this.tPurchase.useBeginDate = getChangeDate(
            (res.tPurchase.useBeginDate)
          );
          this.tPurchase.useEndDate = getChangeDate(
            (res.tPurchase.useEndDate)
          );
        }
        let params = {
          demand: res.tPurchase.demand == 1 ? "求租" : "求购",
          cantonProvince: res.tPurchase.cantonProvince,
          cantonCity: res.tPurchase.cantonCity,
          cantonArea: res.tPurchase.cantonArea,
          firstClassUse: res.tPurchase.firstClassUse,
          secondClassUse: res.tPurchase.secondClassUse
        };

        this.$axios.get(
          "/epf-landweb/tsell/getListDemandSimilarityRecommend",
          params,
          data => {
            // console.log(data);
            this.landData = data.pager.results;
          }
        );
      }
    );
    if (!sessionStorage.getItem("login")) {
      this.isLogin = true;
    }
  },
  methods: {
    selectSpan(item) {
      this.spanKey = item;
    },
    nocollect(id) {
      if (!sessionStorage.getItem("login")) {
        this.$message({
          message: "请先登录再进行收藏",
          type: "warning"
        });
        this.collectionData = [];
        return;
      }
      //收藏
      this.$axios.post(
        "/epf-landweb/transwebcollect/addTransWebCollect",
        qs.stringify({
          targetId: id,
          collectType: "tpurchase"
        }),
        res => {
          if (res.code === 0) {
            this.tPurchase.isCollect = 1;
            this.tPurchase.collectId = res.id;
            this.$message("收藏成功！");
          } else {
            this.$message("收藏失败");
          }
        }
      );
    },

    collect(id) {
      //取消收藏
      this.$axios.post(
        "/epf-landweb/transwebcollect/deleteTransWebCollect",
        qs.stringify({ id: id }),
        res => {
          if (res.code === 0) {
            this.tPurchase.isCollect = 0;
            this.$message("取消收藏成功！");
          } else {
            this.$message("取消收藏失败");
          }
        }
      );
    },
    openDetail(id) {
      console.log(id);
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    toLogin() {
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
.landDetails_warp {
  .supplyLand {
    @include size(100%, auto);
    .supplyLand_top {
      background: #fff;
      &_img {
        @include size(360px, 243px);
        float: left;
        position: relative;
        .iconImg {
          display: block;
          @include size(100%, 100%);
        }
        .collect {
          @include size(28px, 28px);
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          position: absolute;
          right: 8px;
          top: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
      &_right {
        @include size(1200px, auto);
        margin: 0 auto;
        box-sizing: border-box;
        padding: 34px 24px 28px 24px;
        .landDemandBuy {
          display: inline;
          font-size: 14px;
          color: var(--lightColor);
          padding: 4px 15px;
          border-radius: 0px 8px 0px 8px;
          background-color: #f2f5f7;
          margin-left: 10px;
        }
        .landDemandRent {
          display: inline;
          font-size: 14px;
          color:var(--priceColor);
          padding: 4px 15px;
          border-radius: 0px 8px 0px 8px;
          background-color: #fff1f1;
          margin-left: 10px;
        }
        .supplyLandP_active {
          color:var(--lightColor);
          line-height: 46px;
          cursor: pointer;
        }
        .supplyLand_title {
          @include size(250px, 172px);
          float: left;
          box-sizing: border-box;
          background: #fff;
          line-height: 32px;
          border-right: solid 2px #eeeeee;
          h4 {
            color: #333;
            font-size: 16px;
            font-weight: bold;
          }
          .supplyLand_title_active {
            color:var(--lightColor);
            font-size: 14px;
            width: 58px;
            height: 24px;
            background-color: #fef1e1;
            border-radius: 5px;
            padding: 5px 10px;
            margin-right: 10px;
            line-height: 40px;
          }
          .supplyLandP_active {
            color:var(--lightColor);
            line-height: 46px;
            cursor: pointer;
          }
          p {
            color: #999999;
            span {
              color: #666666;
            }
          }
        }
        .supplyLand_content {
          @include size(500px, 100%);
          float: left;
          box-sizing: border-box;
          line-height: 33px;
          margin-left: 55px;
          padding: 10px 0;
          .supplyLand_contentLF {
            @include size(320px, auto);
            float: left;
          }
          .supplyLand_contentFT {
            @include size(180px, auto);
            float: left;
          }
          p {
            color: #999999;
            font-size: 14px;
            span {
              color: #666666;
            }
          }
        }
      }
      // &_right:hover {
      //   -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      //   box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      //   -webkit-transform: translate3d(0, -2px, 0);
      //   transform: translate3d(0, -2px, 0);
      // }
    }
    // 相似土地推荐
    .supplyLand_main {
      background: #f2f1f9;
      overflow: hidden;
      .supplyLand_main_warp {
        width: 1200px;
        margin: 25px auto;
        overflow: hidden;
        padding-bottom: 35px;
        background: #fff;
        .supplyLand_main_con {
          @include size(100%, auto);
          box-sizing: border-box;
          padding-left: 25px;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              @include size(280px, 325px);
              float: left;
              margin-right: 10px;
              margin-top: 25px;
              box-sizing: border-box;
              border: solid 1px #eeeded;
              cursor: pointer;
              .supplyLand_mainli_top {
                @include size(100%, 190px);
                position: relative;
                img {
                  display: block;
                  @include size(100%, 100%);
                }
                .supplyLand_mainli_top_personal {
                  // @include size(38px, 45px);
                  // font-size: 12px;
                  // text-align: center;
                  // box-sizing: border-box;
                  // padding: 1px 2px;
                  // color: #fff;
                  // background: url("../../../../assets/image/icon-landtype01.png")
                  //   no-repeat center center;
                  // position: absolute;
                  // right: 20px;
                  // top: 0;    
                  border-bottom-right-radius: 8px;
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  padding: 7px 20px;
                  color: #fff;
                  background: var(--lightColor);
                }
                .supplyLand_mainli_top_enterprise {
                  // @include size(38px, 45px);
                  // font-size: 12px;
                  // text-align: center;
                  // box-sizing: border-box;
                  // padding: 1px 2px;
                  // color: #fff;
                  // background: url("../../../../assets/image/icon-landtype02.png")
                  //   no-repeat center center;
                  // position: absolute;
                  // right: 20px;
                  // top: 0;
                  border-bottom-right-radius: 8px;
                  position: absolute;
                  top:0px;
                  left: 0px;
                  padding: 7px 20px;
                  color: #fff;
                  background: var(--lightColor);
                }
              }
              .supplyLand_mainli_bot {
                @include size(100%, 135px);
                box-sizing: border-box;
                padding: 12px 20px;
                line-height: 25px;
                h4 {
                  line-height: 32px;
                  color: #333;
                  font-size: 16px;
                  font-weight: bold;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -o-text-overflow: ellipsis;
                  -webkit-text-overflow: ellipsis;
                  -moz-text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .supplyLand_mainli_bot_active {
                  color: var(--priceColor);
                  font-size: 14px;
                  font-weight: bolder;
                }
                h5 {
                  font-size: 12px;
                  color: #999999;
                  span {
                    &:nth-child(1) {
                      img {
                        margin-top: 2px;
                        margin-right: 3px;
                        margin-left: 2px;
                      }
                    }
                    &:nth-child(2) {
                      img {
                        margin-top: -1px;
                        margin-right: 3px;
                      }
                    }
                  }
                }
                p {
                  color: #666;
                  font-size: 12px;
                  color: #999999;
                  // background: url(../images/land_11.jpg) left center no-repeat;
                  // padding-left: 18px;
                }
              }
            }
            li:hover {
              -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
              -webkit-transform: translate3d(0, -2px, 0);
              transform: translate3d(0, -2px, 0);
            }
          }
        }
      }
    }
  }
}
.input_sub_collect {
  display: inline-block;
  @include size(128px, 38px);
  border-radius: 2px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: var(--lightColor);
  border: none;
  text-align: center;
  margin-right: 16px;
  cursor: pointer;
  border: solid 1px var(--lightColor);
}
</style>
