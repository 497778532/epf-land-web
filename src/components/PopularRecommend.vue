<template>
  <div>
    <div class="tdzr_right">
      <div class="tdzr_right_bot">
        <div class="tdzr_right_bot_tit">
          <span class="span_img"></span>
          <span class="hot" style="padding-left: 20px;">热门推荐</span>
        </div>
        <div
          class="tdzr_right_list"
          style="min-height:170px;"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          element-loading-background="rgba(251, 251, 251, 0.9)"
          >
          <div
            class="right_list"
            v-for="(item,index) in popularData"
            :key="index"
            @click="openDetail(item.id)"
          >
            <div class="right_list_img">
              <img :src="baseUrl + item.img" alt :onerror="defaultImg" />
              <div :class="item.landType == 'personal_land'?'mainlist_cont_top_personal':''"  class="mainlist_cont_top" v-if="item.landType"
              >{{item.landType == 'personal_land' ?"个人用地":''}}</div>
              <div :class="item.landType == 'enterprise_land'?'mainlist_cont_top_enterprise':''"  class="mainlist_cont_top" v-if="item.landType"
              >{{item.landType == 'enterprise_land' ?"企业用地":''}}</div>
              <div :class="item.landType == 'intermediary_auction_land'?'mainlist_cont_top_enterprise':''"  class="mainlist_cont_top" v-if="item.landType"
              >{{item.landType == 'intermediary_auction_land' ?"中介拍卖土地":''}}</div>
               <div :class="item.landType == 'judicial_disposal_land'?'mainlist_cont_top_enterprise':''"  class="mainlist_cont_top" v-if="item.landType"
              >{{item.landType == 'judicial_disposal_land' ?"司法处置用地":''}}</div>
               <div :class="item.landType == 'national_disposal_land'?'mainlist_cont_top_enterprise':''"  class="mainlist_cont_top" v-if="item.landType"
              >{{item.landType == 'national_disposal_land' ?"国有资产处置国有建设用地":''}}</div>
            </div>
            <div class="mainlist_cont_bot">
              <h4>{{item.title}}</h4>
              <span class="mainlist_cont_bot_active">{{item.price?Division(item.price) + ' 万元':'面议'}}</span>
              <h5>
                <span>
                  <img src="../assets/image/icon-area.png" alt style="margin-left:-2px;" />
                  {{item.area}}平方米
                </span>
                <span class="fr">
                  <img src="../assets/image/icon-time.png" alt />
                  {{item.years}}年
                </span>
              </h5>
              <p v-if="item.cantonProvinceName||item.cantonCityName||item.cantonAreaName">
                <img src="../assets/image/icon-map.png" alt style="margin-left:-5px;" />
                {{item.cantonProvinceName}}-{{item.cantonCityName}}-{{item.cantonAreaName}}
              </p>
              <p v-else></p>
            </div>
          </div>
          <div v-if="popularData == [] || popularData == ''" style="text-align:center;">
            <img
              style="margin-top:10px;margin-bottom:10px;height:190px;"
              src="../assets/image/dataNone.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
export default {
  data() {
    return {
      popularData: [],
      loading: false,
      isPath: false,
      baseUrl: "",
      demailId: "",
      defaultImg:
        'this.src="' + require("../assets/image/icon-nodata.png") + '"' //默认图地址
    };
  },
  created() {
    this.getPopular();
    this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
  },
  methods: {
    getPopular(params) {
      this.loading = true;
      if (this.$router.currentRoute.path == "/demandDetails") {
        params = { id: this.$route.query.demand };
      }
      if (this.$router.currentRoute.path == "/ListTransactDetails") {
        params = { id: this.$route.query.demand };
      }
      if (this.$router.currentRoute.path == "/AgreeTransacteDetails") {
        params = { id: this.$route.query.id };
      }
      this.loading = true;
      //热门推荐
      this.$axios.get("/epf-landweb/tlandSearch/getListPopular", params, res => {
        console.log("热门推荐接口返回数据", res);
        this.loading = false;
        this.popularData = res.pager.results;

        //还原vuex中搜索相关条件
        this.$store.selected = {};
        this.$store.filterActive = {};
        this.$store.searchInfo = {};
      });
    },
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/demandDetails",
        query: {
          demand: id
        }
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.tdzr_right {
  @include size(316px, auto);
  .tdzr_right_bot {
    background: #fff;
    .tdzr_right_bot_tit {
      position: relative;
      height: 50px;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      border-bottom: 2px solid #eeeeee;
      box-sizing: border-box;
      padding-left: 17px;
      padding-top: 15px;
      font-size: 16px;
      .span_img {
        width: 6px;
        height: 21px;
        background-color: var(--lightColor);
        display: inline-block;
        position: absolute;
        top: 16px;
        left: 20px;
      }
    }
    .tdzr_right_list {
      box-sizing: border-box;
      padding: 20px;
      padding-bottom: 1px;
      .right_list {
        @include size(275px, auto);
        margin-bottom: 20px;
        cursor: pointer;
        .right_list_img {
          @include size(275px, 186px);
          position: relative;
          img {
            display: block;
            @include size(275px, 186px);
          }
          .mainlist_cont_top{
            font-size: 12px;
            text-align: center;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #fff;
            position: absolute;
            left: 0;
            top: 0;
            border-bottom-right-radius: 6px;
            padding: 6px 12px;
          }
          .mainlist_cont_top_personal {
            background: var(--lightColor);
          }
          .mainlist_cont_top_enterprise {
            background: var(--lightColor);
          }
        }
        .mainlist_cont_bot {
          line-height: 25px;
          border: solid 1px #eeeded;
          box-sizing: border-box;
          padding: 20px;
          h4 {
            line-height: 32px;
            color: #333;
            font-size: 16px;
            font-weight: bold;
          }
          .mainlist_cont_bot_active {
            color: var(--priceColor);
            font-size: 14px;
            font-weight: bolder;
          }
          h5 {
            font-size: 14px;
            color: #999999;
            span{
              img{
                vertical-align: middle;
              }
            }
          }
          p {
            color: #666;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>