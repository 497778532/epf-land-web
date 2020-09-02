<template>
  <div class="demand">
    <div class="mainlist_title">
      <h2 class="title fl">需求信息</h2>
      <ul class="subTitle">
        <li
          v-for="(item, index) in ['求租', '求购']"
          :key="index"
          :style="{ color: index == Trakey ? 'var(--lightColor)' : '' }"
          @click="(Trakey = index), (demandType = item)"
          class="fl"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
      <div v-if="landUseInfo" class="J_brickNav">
        <ul
          class="tab-list J_brickTabSwitch"
          data-tab-target="homeelec-content"
        >
          <li
            @mouseenter="selectTabTra(null, -1)"
            :class="{ tabActive: selectedTra === -1 }"
          >
            全部
          </li>
          <li
            @mouseenter="selectTabTra(items, index)"
            :class="{ tabActive: selectedTra === index }"
            v-for="(items, index) in landUseInfo.dictionariesEntities
              ? landUseInfo.dictionariesEntities.slice(0, 5)
              : []"
            :key="index"
          >
            {{ items.zhCn }}
          </li>
          <li @click="demandSelect()">更多<span>&gt;</span></li>
        </ul>
      </div>
    </div>
    <div class="land">
      <!-- 土地求租 -->
      <ul
        class="rent"
        v-if="landRentData && landRentData !== null && demandType == '求租'"
      >
        <epf-tag
          name="土地求租"
          @more="demandSelect('need_rent', 1, '求租')"
          style="border-bottom: solid 1px #d2d2d2;"
        ></epf-tag>
        <li
          v-for="(item, index) in landRentData.slice(0, 4)"
          :key="index + '1'"
          @mouseleave="stateNum = 0"
          class="content fl"
          @click="landDemandSelect(item.id)"
          @mouseenter="moveEffectFun(index)"
          style="width:50%;margin:0 20px;"
        >
          <h2 class="title" v-if="index == stateNum">{{ item.title }}</h2>
          <el-row
            style="padding-bottom:16px;color:#999;"
            v-if="index == stateNum"
          >
            <el-col :span="11" style="line-height: 21px;">
              <img
                src="../../../../assets/image/icon-map.png"
                alt
                width="25px"
              />
              {{ item.cantonProvinceName }}-{{ item.cantonCityName }}-{{
                item.cantonAreaName
              }}
            </el-col>
            <el-col :span="13" style="text-align:right;line-height: 21px;">
              <img
                src="../../../../assets/image/icon-area.png"
                alt
                width="25px"
              />
              {{ item.area }} 平方米
            </el-col>
          </el-row>
          <el-row v-if="index == stateNum" style="color:#999;">
            <el-col>
              <span
                class="el-icon-menu"
                style="font-size:18px;margin:0 4px;"
              ></span>
              {{ item.firstClassUseName }}-{{ item.secondClassUseName }}
            </el-col>
          </el-row>
          <el-row v-if="index != stateNum">
            <el-col :span="14">
              <h4>
                <span>•</span>
                {{ item.title }}
              </h4>
            </el-col>
            <el-col :span="10">
              <h3 style="color:#a9a9a9;text-align:right;">
                {{ item.updateTime }}
              </h3>
            </el-col>
          </el-row>
        </li>
        <li
          v-for="(item1, index1) in landRentData.slice(4, 8)"
          @mouseleave="stateNum1 = 0"
          :key="index1"
          class="content"
          @click="landDemandSelect(item1.id)"
          @mouseenter="moveEffectFun1(index1)"
        >
          <h2 class="title" v-if="index1 == stateNum1">{{ item1.title }}</h2>
          <el-row
            style="padding-bottom:16px;color:#999;"
            v-if="index1 == stateNum1"
          >
            <el-col :span="11" style="line-height: 21px;">
              <img
                src="../../../../assets/image/icon-map.png"
                alt
                width="25px"
              />
              {{ item1.cantonProvinceName }}-{{ item1.cantonCityName }}-{{
                item1.cantonAreaName
              }}
            </el-col>
            <el-col :span="13" style="text-align:right;line-height: 21px;">
              <img
                src="../../../../assets/image/icon-area.png"
                alt
                width="25px"
              />
              {{ item1.area }} 平方米
            </el-col>
          </el-row>
          <el-row v-if="index1 == stateNum1" style="color:#999;">
            <el-col>
              <span
                class="el-icon-menu"
                style="font-size:18px;margin:0 4px;"
              ></span>
              {{ item1.firstClassUseName }}-{{ item1.secondClassUseName }}
            </el-col>
          </el-row>
          <el-row v-if="index1 != stateNum1">
            <el-col :span="14">
              <h4>
                <span>•</span>
                {{ item1.title }}
              </h4>
            </el-col>
            <el-col :span="10">
              <h3 style="color:#a9a9a9;text-align:right;">
                {{ item1.updateTime }}
              </h3>
            </el-col>
          </el-row>
        </li>
      </ul>
      <!-- 土地求购 -->
      <ul
        class="want"
        v-if="
          landPurchaseData && landPurchaseData !== null && demandType == '求购'
        "
      >
        <epf-tag
          name="土地求购"
          @more="demandSelect('need_buy', 2, '求购')"
          style="border-bottom: solid 1px #d2d2d2;"
        ></epf-tag>
        <li
          v-for="(item, index) in landPurchaseData.slice(0, 4)"
          @mouseleave="statusNum = 0"
          :key="index"
          class="content"
          @click="landDemandSelect(item.id)"
          style="width:50%;margin:0 20px;"
          @mouseenter="moveEffectWay(index)"
        >
          <h2 class="title" v-if="index == statusNum">{{ item.title }}</h2>
          <el-row
            style="padding-bottom:16px;color:#999;"
            v-if="index == statusNum"
          >
            <el-col :span="11" style="line-height: 21px;">
              <img
                src="../../../../assets/image/icon-map.png"
                alt
                width="25px"
              />
              {{ item.cantonProvinceName }}-{{ item.cantonCityName }}-{{
                item.cantonAreaName
              }}
            </el-col>
            <el-col :span="13" style="text-align:right;line-height:21px;">
              <img
                src="../../../../assets/image/icon-area.png"
                alt
                width="25px"
              />
              {{ item.area }} 平方米
            </el-col>
          </el-row>
          <el-row v-if="index == statusNum" style="color:#999;">
            <el-col>
              <span
                class="el-icon-menu"
                style="font-size:18px;margin:0 4px;"
              ></span>
              {{ item.firstClassUseName }}-{{ item.secondClassUseName }}
            </el-col>
          </el-row>
          <el-row v-if="index != statusNum">
            <el-col :span="14">
              <h4>
                <span>•</span>
                {{ item.title }}
              </h4>
            </el-col>
            <el-col :span="10">
              <h3 style="color:#a9a9a9;text-align:right;">
                {{ item.updateTime }}
              </h3>
            </el-col>
          </el-row>
        </li>
        <li
          v-for="(item1, index1) in landPurchaseData.slice(4, 8)"
          @mouseleave="statusNum1 = 0"
          :key="index1"
          class="content"
          @click="landDemandSelect(item1.id)"
          @mouseenter="moveEffectWay1(index1)"
        >
          <h2 class="title" v-if="index1 == statusNum1">{{ item.title }}</h2>
          <el-row
            style="padding-bottom:16px;color:#999;"
            v-if="index1 == statusNum1"
          >
            <el-col :span="11" style="line-height: 21px;">
              <img
                src="../../../../assets/image/icon-map.png"
                alt
                width="25px"
              />
              {{ item.cantonProvinceName }}-{{ item.cantonCityName }}-{{
                item.cantonAreaName
              }}
            </el-col>
            <el-col :span="13" style="text-align:right;line-height:21px;">
              <img
                src="../../../../assets/image/icon-area.png"
                alt
                width="25px"
              />
              {{ item.area }} 平方米
            </el-col>
          </el-row>
          <el-row v-if="index1 == statusNum1" style="color:#999;">
            <el-col>
              <span
                class="el-icon-menu"
                style="font-size:18px;margin:0 4px;"
              ></span>
              {{ item.firstClassUseName }}-{{ item.secondClassUseName }}
            </el-col>
          </el-row>
          <el-row v-if="index1 != statusNum1">
            <el-col :span="14">
              <h4>
                <span>•</span>
                {{ item.title }}
              </h4>
            </el-col>
            <el-col :span="10">
              <h3 style="color:#a9a9a9;text-align:right;">
                {{ item.updateTime }}
              </h3>
            </el-col>
          </el-row>
        </li>
      </ul>
      <!-- 发布需求 -->
      <div class="need">
        <h2 style="color:#fff">发布需求</h2>
        <p>快速发布，轻松找到</p>
        <button @click="RightSkip('/demandForm')">发布需求 ></button>
      </div>
    </div>
    <!-- <ul class="show">
      <li v-for="(item,index) in showTitle" :key="index">
        <div class="btn">
          <img :src="require('../../../../assets/image/icon-0'+(index+6)+'.png')" alt />
        </div>
        <span>{{item}}</span>
      </li>
    </ul> -->
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      Trakey: 0,
      // showTitle:['产品明晰','市场定价','交易安全','多维保障'],
      stateNum: 0,
      stateNum1: 0,
      statusNum: 0,
      statusNum1: 0,
      baseURLclu: "",
      demandType: "求租",
      selectedTra: -1,
      filterActive: {
        cantonProvince: 0,
        firstClassUse: 0,
        secondClassUse: 0,
        demand: 0,
        area: 0,
        years: 0,
        demandType: 0,
        landChar: 0
      },
      selected: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        demand: "",
        area: "",
        years: "",
        demandType: "",
        landChar: ""
      },
      searchInfo: {},
      landDemandNeedRent: {
        //   需求类型：
        demand: "need_rent",
        firstClassUse: "",
        cantonProvince: "",
        cantonCity: "",
        //标题：
        rows: 4,
        //省
        page: 1
      },
      landDemandNeedBuy: {
        //   需求类型：
        demand: "need_buy",
        firstClassUse: "",
        cantonProvince: "",
        cantonCity: "",
        //标题：
        rows: 4,
        //省
        page: 1
      },
      landRentData: null,
      landPurchaseData: null,
      testdata: [
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方1",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方2",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方3",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方4",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方5",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方6",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方7",
          updateTime: "2020-04-23 10:13:45"
        },
        {
          cantonAreaName: "朝阳区",
          cantonCityName: "朝阳区",
          cantonProvinceName: "北京市",
          area: 3253425,
          firstClassUseName: "工矿仓储用地",
          secondClassUseName: "采矿用地",
          address: "分工会发给",
          title: "大分公司第三方第三方8",
          updateTime: "2020-04-23 10:13:45"
        }
      ]
    };
  },
  computed: {
    ...mapState("index", ["tpurchase", "personTSell", "landUseInfo"])
  },
  created() {
    this.baseURLclu = baseURL1.baseURL1 + this.$API.EPF_DOCUMENT.IMAGESRC;
    this.selectRend();
    this.selectPurchase();
  },
  methods: {
    ...mapActions("index", ["getTpurchase"]),
    selectRend(item, index, code) {
      this.searchInfo["firstClassUse"] = item ? item.dictKey : null;
      this.selected["firstClassUse"] = item ? item.zhCn : null;
      this.filterActive["firstClassUse"] = item == null ? 0 : index+1;
      this.landDemandNeedRent.firstClassUse = item ? item.dictKey : null;
      this.landDemandNeedRent.cantonProvince = code
        ? code.cantonProvince
        : null;
      this.landDemandNeedRent.cantonCity = code ? code.cantonCity : null;
      this.$axios.get(
        this.$API.EPF_SUPPLY.INDEX, ///tpurchase/getIndexTPurchaseList
        this.landDemandNeedRent,
        res => {
          if (res.code == "0") {
            this.landRentData = res.pager.results;
          }
        }
      );
    },
    selectPurchase(item, index, code) {
      this.searchInfo["firstClassUse"] = item ? item.dictKey : null;
      this.selected["firstClassUse"] = item ? item.zhCn : null;
      this.filterActive["firstClassUse"] = item == null ? 0 : index+1;
      this.landDemandNeedBuy.firstClassUse = item ? item.dictKey : null;
      this.landDemandNeedBuy.cantonProvince = code ? code.cantonProvince : null;
      this.landDemandNeedBuy.cantonCity = code ? code.cantonCity : null;
      this.$axios.get(
        this.$API.EPF_SUPPLY.INDEX,
        this.landDemandNeedBuy,
        res => {
          if (res.code == "0") {
            this.landPurchaseData = res.pager.results;
          }
        }
      );
    },
    landDemandSelect(id) {
      let routeUrl = this.$router.resolve({
        path: "/supplyDetails",
        query: { supply: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    demandSelect(name, index, zhCn) {
      if (this.demandType == "求租") {
        this.filterActive["demand"] = 1;
        this.selected["demand"] = "求租";
        this.searchInfo["demand"] = "need_rent";
      } else if (this.demandType == "求购") {
        this.filterActive["demand"] = 2;
        this.selected["demand"] = "求购";
        this.searchInfo["demand"] = "need_buy";
      }
      //传值初始化
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      this.$router.push("/demandSearch");
    },
    selectTabTra(item, index) {
      //获取选择城市的缓存,不存在将其内容置空
      let code = JSON.parse(sessionStorage.getItem("Address"));
      if (code == "" || code == null) {
        code = {};
        code.cantonProvince = "";
        code.cantonCity = "";
      }
      this.loadingtra = true;
      this.selectedTra = index;
      console.log("========");
      if (this.demandType == "求租") {
        this.selectRend(item, index, code);
      } else if (this.demandType == "求购") {
        this.selectPurchase(item, index, code);
      }
    },
    moveEffectFun(index) {
      this.stateNum = index;
    },
    moveEffectFun1(index) {
      this.stateNum1 = index;
    },
    moveEffectWay(index) {
      this.statusNum = index;
    },
    moveEffectWay1(index) {
      this.statusNum1 = index;
    },
    RightSkip(routerName) {
      this.$router.push({ path: routerName, query: { disabledType: false } });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.demand {
  @include size(1200px, 100%);
  margin: 0 auto;
  padding: 20px 0;
  .mainlist_title {
    @include size(100%, 44px);
    border-bottom: 3px solid #e5e5e5;
    box-sizing: border-box;
    line-height: 44px;
    .title {
      font-size: 20px;
      color: #333333;
      font-weight: bold;
      color: #fff;
      width: 150px;
      text-align: center;
      background: url("../../../../assets/image/index_icon01.png") no-repeat
        center bottom;
    }
    .subTitle {
      li {
        color: #666666;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        span {
          padding: 0 20px;
          border-right: 1px solid #ebebeb;
          &:nth-child(2) {
            border-right: none;
          }
        }
      }
      li:hover {
        color: var(--lightColor);
      }
    }
    .J_brickNav {
      float: right;
      margin-top: 6px;
      ul.J_brickTabSwitch {
        li {
          cursor: pointer;
          color: #666666;
          font-size: 14px;
          transition: border-color 0.5s;
          float: left;
          padding: 0px 10px;
          line-height: 28px;
        }
        .tabActive,
        li:hover {
          background-color: var(--lightColor);
          color: #fff;
          border-radius: 2px;
        }
      }
    }
  }
  .land {
    margin-top: 20px;
    height: 404px;
    background: #fff;
    background-image: url("../../../../assets/image/demand.jpg");
    ul {
      width: 906px;
      height: 100%;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      border: solid 1px #d2d2d2;
      box-sizing: border-box;
      float: left;
      .content {
        width: 380px;
        padding: 18px 0;
        color: #676767;
        border-bottom: 1px dashed #ededed;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .title {
        font-weight: 800;
        font-size: 16px;
        padding-bottom: 14px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .need {
      width: 281px;
      height: 404px;
      box-sizing: border-box;
      padding: 40px 34px;
      color: white;
      float: right;
      background-image: url("../../../../assets/image/icon-20.png");
      h2 {
        font-size: 26px;
        margin: 22px 0;
      }
      p {
        font-size: 16px;
      }
      button {
        margin-top: 27px;
        background-color: var(--Colors);
        padding: 8px 10px 7px;
        border-radius: 5px;
        font-size: 16px;
        color: white;
        cursor: pointer;
        &:active {
          transform: translateY(1px);
        }
      }
    }
  }
  .show {
    display: flex;
    margin-top: 32px;
    justify-content: space-between;
    .btn {
      float: left;
    }
    span {
      line-height: 74px;
      margin-left: 15px;
      color: #666;
    }
  }
}
</style>
