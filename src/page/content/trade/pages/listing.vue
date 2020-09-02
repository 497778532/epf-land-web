<template>
  <!-- 交易大厅-委托交易模块 -->
  <div class="listing">
    <epf-tag
      name="委托交易"
      :data="DataTitle"
      @switch="selectTabTra"
      @more="selectList">
    </epf-tag>
    <ul class="list" 
      v-loading="loading"
      element-loading-text="拼命加载中">
      <li v-for="(items,index) in landData" :key="index" 
        @click="ListranstDetail(items.id)">
        <div class="supply_top">
          <img class="epf_land_img" v-lazy="baseUrl + items.img"/>
          <div class="personLand"
            v-if="items.landType==='personal_land'">
            个人地源
          </div>
          <div class="enterpriseLand"
            v-if="items.landType==='enterprise_land'">
            企业地源
          </div>
          <div class="enterpriseLand"
            v-else>
            政府所属
          </div>
        </div>
        <!-- v-else -->
         <div class="supplyLand_mainli_bot" v-if="status=='trans_status-007'">
          <h4>标的编号：{{items.targetNo}}</h4>成交价
          <span class="supplyLand_mainli_bot_active">
            {{items.transPrice}}{{items.unit}}
          </span>
          <p>成交日期：{{items.endTransTime}}</p>
          <p>
            <img src="@/assets/image/icon-map.png" alt />
            {{items.cantonCityName}}-{{items.cantonAreaName}}
          </p>
          <h5>
            <span>
              <img src="@/assets/image/icon-area.png" alt />
              {{items.area?items.area+'平方米':''}}
            </span>
          </h5>
          <!--  @name: transTypeName
                @description: 主要是transTypeName换行
                @author: gaojie
                @chageTime:2020-3-2 -->
          <p>
            <span>
              <img
                src="@/assets/image/icon-label.png"
                alt
                style="margin-top: 4px;margin-right: 4px;margin-left: 7px;"
              />
              {{items.transTypeName}}
            </span>
          </p>
        </div>
         <!-- v-if="selectedTraState!=2" -->
        <div class="supplyLand_mainli_bot" v-else>
          <h4>标的编号：{{items.targetNo}}</h4>起始价
          <span class="supplyLand_mainli_bot_active">{{items.beginPrice}}{{items.unit}}</span>
          <p v-if="items.transType == 'listing_mode'">挂牌截止日期：{{items.endFocusTime}}</p>
          <p v-else>申请截止日期：{{items.endApplyTime}}</p>
          <p>
            <img src="@/assets/image/icon-map.png" alt style="margin-left: -5px;" />
            {{items.cantonCityName}}-{{items.cantonAreaName}}
          </p>
          <h5>
            <span>
              <img src="@/assets/image/icon-area.png" alt style="margin-left: -2px;" />
              {{items.area?items.area+'平方米':''}}
            </span>
          </h5>
          <p>
            <span>
              <img src="@/assets/image/icon-label.png"
                style="margin-top: 4px;margin-right: 4px;"/>
              {{items.transTypeName}}
            </span>
          </p>
        </div>
      </li>
      <div v-if="landData == [] || landData == ''" style="text-align:center;margin:0 auto;">
        <img style="margin-top:100px;" src="@/assets/image/dataNone.png" />
      </div>
    </ul>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
export default {
  components: {},
  data() {
    return {
      baseUrl: "",
      DataTitle: [
        { name: "公告中", value: "trans_status-003" },
        { name: "交易中", value: "trans_status-004" },
        { name: "已成交", value: "trans_status-007" }
      ],
      loading:false,
      selectedTraState: 0,
      landData: [],
      status: "trans_status-003",
      page: 1,
      rows: 4
    };
  },
  created() {
    // 图片地址
    this.baseUrl =
      baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC
    // 初始化请求数据
    let param = {
      page: this.page,
      rows: this.rows,
      status: this.status
    };
    this.initTransData(param);
  },
  methods: {
    initTransData(param) { // 委托交易数据
      this.loading = true
      this.$axios.get(
        // "/epf-landweb/landweb/transtarget/transTargetList",
        this.$API.EPF_TRADE.LADNWEB.TARNS,
        param, res => {
        if (res.code === 0) {
          this.landData = res.pager.results;
        }
        this.loading = false
      });
    },
    fetchData() {
      let param = {
        page: this.page,
        rows: this.rows,
        status: this.status
      };
      this.initTransData(param);
    },
    selectTabTra(item) {
      this.status = item.value;
      this.fetchData();
    },
    selectList() {
      this.$router.push("/TradingHallListTrans");
    },
    ListranstDetail(id) {
      this.$router.push({
        path: "/TradingDetails",
        query: { id: id, selectedTraState: this.status }
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
.listing {
  @include size(100%, auto);
  .list {
    @include size(100%, auto);
    box-sizing: border-box;
    padding-left: 25px;
    display: flex;
    flex-wrap: wrap;
    li {
      @include size(273px, 360px);
      float: left;
      margin-right: 20px;
      margin-top: 25px;
      box-sizing: border-box;
      border: solid 1px #eeeded;
      cursor: pointer;
      .supply_top {
        @include size(100%, 183px);
        position: relative;
        img {
          display: block;
          @include size(100%, 100%);
        }
        .personLand {
          border-bottom-right-radius: 8px;
          font-size: 12px;
          text-align: center;
          padding: 6px 12px;
          color: #fff;
          position: absolute;
          left: 0;
          top: 0;
          background-color: var(--Colors);
        }
        .enterpriseLand {
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
      .supplyLand_mainli_bot {
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .supplyLand_mainli_bot_active {
          color: var(--priceColor);
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
