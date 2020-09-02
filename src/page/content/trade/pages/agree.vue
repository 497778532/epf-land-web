<template>
  <div class="agree">
    <epf-tag 
      name="自行交易"
      :data="DataTitle" 
      @more="selectagree">
    </epf-tag>
    <ul>
      <li v-for="(items,index) in tSellByIds" :key="index" @click="agreementDetail(items.id,index)">
        <!-- {{items}} -->
        <div class="box" v-if="items!==null">
          <img class="epf_land_img" v-lazy="baseUrl + items.img" width="122px" />
          <div class="single" v-if="items.landTypeName==='个人用地'">个人地源</div>
          <div class="double" v-if="items.landTypeName==='企业用地'">企业地源</div>
          <div class="double" v-if="items.landTypeName==='政府所属'">政府所属</div>
        </div>
        <div class="minBox" v-if="items!=null">
          <h4 class="epf_ellipsis">{{items.title}}</h4>
          <span>成交价：</span>
          <span class="price">{{items.transactionPrice/10000}}万元</span>
          <p>成交时间：{{items.createTime}}</p>
          <p>
            <img src="@/assets/image/icon-map.png"/>
            {{items.cantonProvinceName}} / {{items.cantonCityName}} / {{items.cantonAreaName}}
          </p>
          <h5>
            <span class="epf_fl">
              <img src="@/assets/image/icon-area.png"/>
              {{items.area}}平方米
            </span>
            <span class="epf_fr">
              <img src="@/assets/image/icon-time.png"/>
              {{items.years}}年
            </span>
          </h5>
        </div>
      </li>
       <div v-if="tSellByIds == [] || tSellByIds == ''" class="epf_row_c" style="text-align:center;margin:0 auto;">
        <img style="margin-top:100px;" src="@/assets/image/dataNone.png" />
      </div>
    </ul>
   
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import baseURL1 from "@/util/config.js";
import qs from "qs";
export default {
  data() {
    return {
      tSellByIds: [],
      selectedTraState: 0,
      prices: [],
      landDataTransacting: [],
      DataTitle: [{ name: "已成交", value: "trans_status-001" }]
    };
  },
  created() {
    // 图片地址
    this.baseUrl =
      baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC
    let token = localStorage.getItem("token");
    this.$axios.post(
      // "/epf-contract/transContract/agreementList",
      this.$API.EPF_TRACT.AGRE,
      qs.stringify({}),
      res => {
        if (res.code == "0000") {
          let array = res.data;
          var idList = "";
          if (array.length > 0) {
            for (let index = 0; index < array.length; index++) {
              const element = array[index];
              idList += element.relevanceId + ",";
              this.prices.push(element.transPrice);
            }
            idList = idList.substring(0, idList.length - 1);
            this.$axios.get(
              "/epf-landweb/tlandSearch/getTSellByIds",
              { page: 1, rows: 4, id: idList },
              res => {
                if (res.code == "0") {
                  this.tSellByIds = res.pager.results;
                }
              }
            );
          }
        }
      }
    );
  },
  methods: {
    selectagree() {
      this.$router.push("/TradingHallAgreeTrans");
    },
    agreementDetail(item, i) {
      this.$router.push({
        path: "/AgreeTransacteDetails",
        query: {
          id: item,
          transPrice: this.prices[i],
          selectedTraState: this.selectedTraState
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.agree {
  @include size(100%, auto);
  ul {
    @include size(100%, auto);
    display: flex;
    flex-wrap: wrap;
    padding-left: 25px;
    box-sizing: border-box;
    li {
      @include size(273px, 338px);
      float: left;
      margin-right: 20px;
      margin-top: 25px;
      box-sizing: border-box;
      border: solid 1px #eeeded;
      cursor: pointer;
      .box {
        @include size(100%, 183px);
        position: relative;
        img {
          display: block;
          @include size(100%, 100%);
        }
        .single {
          border-bottom-right-radius: 8px;
          font-size: 12px;
          text-align: center;
          padding: 6px 12px;
          color: #fff;
          position: absolute;
          left: 0;
          top: 0;
          background-color: var(--lightColor);
        }
        .double {
          border-bottom-right-radius: 8px;
          font-size: 12px;
          text-align: center;
          padding: 6px 12px;
          color: #fff;
          position: absolute;
          left: 0;
          top: 0;
          background-color: var(--lightColor);
        }
      }
      .minBox {
        @include size(100%, 155px);
        box-sizing: border-box;
        padding: 12px 15px;
        line-height: 25px;
        color: #999999;
        font-size: 12px;
        h4 {
          line-height: 32px;
          color: #333;
          font-size: 16px;
          font-weight: bold;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price {
          color: var(--Colors);
          font-size: 14px;
          font-weight: bolder;
          margin-left: 10px;
        }
        h5 {
          font-size: 14px;
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
          font-size: 14px;
          color: #999999;
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
</style>
