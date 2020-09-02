<template>
      <!-- <div class="mainlist_title_icon fl"></div> -->
  <div class="mainlist">
    <div class="mainlist_title">
      <h2 class="title fl">供给信息</h2>
      <ul class="subTitle">
        <li
          v-for="(item, index) in [{zhCn:'转让',dictKey:'transfer'},{zhCn:'出租',dictKey:'rent'},{zhCn:'抵押',dictKey:'mortgage'},]"
          :key="index"
          :style="{ color: index == Trakey ? 'var(--lightColor)' : '' }"
          @click="Trakey = index,landType = item.zhCn,landTypeKey = item.dictKey,selectedTra = -1,selectTabTra()"
          class="fl"
        >
          <span>{{ item.zhCn }}</span>
        </li>
      </ul>
      <div v-if="landUseInfo" class="J_brickNav">
        <ul class="tab-list J_brickTabSwitch" data-tab-target="homeelec-content">
          <li @mouseenter="selectTabTra(null, -1),loadingtra = true,selectedTra = -1" :class="{ tabActive: selectedTra === -1 }">全部</li>
          <li @mouseenter="selectTabTra(items, index),loadingtra = true,selectedTra = index" :class="{ tabActive: selectedTra === index }" v-for="(items, index) in landUseInfo.dictionariesEntities
              ? landUseInfo.dictionariesEntities.slice(0, 5): []" :key="index">
            {{ items.zhCn }}</li>
          <li @click="seniorSelect()">更多<span>&gt;</span></li>
        </ul>
      </div>
    </div>
    <!-- <div class="mainlist_title">
      <div class="mainlist_title_icon fl"></div>
      <h2 class="title fl">{{landType}}</h2>
      <div
        v-if="landUseInfo&&landUseInfo!==null&&landUseInfo.dictionariesList&&landUseInfo.dictionariesList!==null"
        class="J_brickNav"
        >
        <ul class="tab-list J_brickTabSwitch" data-tab-target="homeelec-content">
          <li @mouseenter="selectTabTra(null,-1),loadingtra = true,selectedTra = -1" :class="{tabActive:selectedTra === -1}">全部</li>
          <li @mouseenter="selectTabTra(items,index),loadingtra = true,selectedTra = index" :class="{tabActive:selectedTra === index}" v-for="(items,index) in landUseInfo.dictionariesList?landUseInfo.dictionariesList.slice(0,5):[]" :key="index"
          >{{items.zhCn}}</li>
          <li @click="seniorSelect()">
            更多
            <span>&gt;</span>
          </li>
        </ul>
      </div>
    </div> -->
    <!-- <div class="brick-item" @click="seniorSelect()" >
      <img src="@/assets/image/icon-10.png" alt v-if="landType=='土地转让'"/>
      <img src="@/assets/image/icon-11.png" alt v-if="landType=='土地出租'"/>
      <img src="@/assets/image/icon-12.png" alt v-if="landType=='土地抵押'"/>
      <p>更多&gt;</p>
    </div> -->
    <!-- v-loading="loadingtra" -->
    <ul class="mainlist_cont" element-loading-text="拼命加载中...">
      <span v-if="homelandTransferInfo && homelandTransferInfo.pager.results &&(landType == '转让' || Trakey == 0)">
        <span class="landpage" v-for="(items, index) in homelandTransferInfo.pager.results" :key="index" @click="mainlist(items.id)">
          <epf-landPage v-if="homelandTransferInfo.pager.results !== [] ||homelandTransferInfo.pager.results !== ''" :item="items"></epf-landPage>
        </span>
        <div v-if="homelandTransferInfo.pager.results == [] ||homelandTransferInfo.pager.results == ''" class="epf_row_c">
          <img style="margin-top:80px;margin-bottom:10px;height:190px;boreder:1px solid red;" src="@/assets/image/dataNone.png"/>
        </div>
      </span>

      <span v-if="homelandRentalInfo && homelandRentalInfo.pager.results && (landType == '出租' || Trakey == 1)">
        <span v-for="(items, index) in homelandRentalInfo.pager.results" :key="index" @click="mainlist(items.id)">
          <epf-landPage v-if="homelandRentalInfo.pager.results !== [] ||homelandRentalInfo.pager.results !== ''" :item="items"></epf-landPage>
        </span>
        <div v-if="homelandRentalInfo.pager.results == [] ||homelandRentalInfo.pager.results == '' " class="epf_row_c">
          <img style="margin-top:80px;margin-bottom:10px;height:190px;boreder:1px solid red;" src="@/assets/image/dataNone.png"/>
        </div>
      </span>

      <span v-if="homelandMortgageInfo &&homelandMortgageInfo.pager.results &&(landType == '抵押' || Trakey == 2)">
        <span v-for="(items, index) in homelandMortgageInfo.pager.results" :key="index" @click="mainlist(items.id)">
          <epf-landPage v-if="homelandMortgageInfo.pager.results !== [] ||homelandTransferInfo.pager.results !== ''" :item="items"></epf-landPage>
        </span>
        <div v-if="homelandMortgageInfo.pager.results == [] ||homelandMortgageInfo.pager.results == ''" class="epf_row_c">
          <img style="margin-top:80px;margin-bottom:10px;height:190px;boreder:1px solid red;" src="@/assets/image/dataNone.png"/>
        </div>
      </span>
       <div v-if="(homelandTransferInfo == [] || homelandTransferInfo == '')||(homelandRentalInfo == [] || homelandRentalInfo == '')||(homelandMortgageInfo == [] || homelandMortgageInfo == '')" class="epf_row_c" style="text-align:center;margin:0 auto;">
        <img style="margin-top:100px;" src="@/assets/image/dataNone.png" />
      </div>
    </ul>
  </div>
</template>
<script>
import baseURL1 from "@/util/config.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "landList",
  props: {
    // landType: {
    //   type: String
    // }
  },
  data() {
    return {
      landTypeKey:'transfer',
      firstClassUseKey:'',
      firstClassUseName:'',
      landType:'转让',
      Trakey: 0,
      baseURLclu: "",
      loadingtra: true,
      loadingrental: true,
      loadingMortgage: true,
      baseURLclu: "",
      selectedTra: -1,
      selectedRental: -1,
      selectedMortgage: -1,
      firstClassUseTra: "耕地",
      firstClassUseRental: "耕地",
      firstClassUseMortgage: "耕地",
      filterActive: {
        cantonProvince: 0,
        firstClassUse: 0,
        secondClassUse: 0,
        circulation: 0,
        area: 0,
        years: 0,
        landType: 0,
        landChar: 0
      },
      selected: {
        cantonProvince: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        area: "",
        years: "",
        landType: "",
        landChar: ""
      },
      searchInfo: {},
      landTransferInfo: "",
      landRentalInfo: "",
      landMortgageInfo: "",
    };
  },
  computed: {
    ...mapState("index", ["homelandTransferInfo","homelandRentalInfo","homelandMortgageInfo","landUseInfo"])
  },
  watch: {
    homelandTransferInfo(v1, v2) {
      if (v1 !== v2) {
        this.loadingtra = false;
      }
    },
    homelandRentalInfo(v1, v2) {
      if (v1 !== v2) {
        this.loadingtra = false;
      }
    },
    homelandMortgageInfo(v1, v2) {
      if (v1 !== v2) {
        this.loadingtra = false;
      }
    }
  },
  created() {
    this.baseURLclu = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
  },
  methods: {
    ...mapActions("index", ["getHomelandTransferInfo","getHomelandRentalInfo","getHomelandMortgageInfo"]),
    seniorSelect(name, index, zhCn) {
      console.log("======name, index, zhCn=====",name, index, zhCn)
      //更多
      if (this.landType == "转让") {
        this.filterActive["circulation"] = 1;
        this.selected["circulation"] = "转让";
        this.searchInfo["circulation"] = "transfer";

      } else if (this.landType == "出租") {
        this.filterActive["circulation"] = 2;
        this.selected["circulation"] = "出租";
        this.searchInfo["circulation"] = "rent";
      } else if (this.landType == "抵押") {
        this.filterActive["circulation"] = 3;
        this.selected["circulation"] = "抵押";
        this.searchInfo["circulation"] = "mortgage";
      }
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      let routeUrl = this.$router.resolve({path: "/seniorSearch",query: {}});
      window.open(routeUrl.href, "_blank");
    },
    mainlist(item) {
      //点击详情
      let routeUrl = this.$router.resolve({path: "/demandDetails",query: { demand: item }});
      window.open(routeUrl.href, "_blank");
    },
    selectTabTra(item, index) {
      //获取选择城市的缓存,不存在将其内容置空
      let code = JSON.parse(sessionStorage.getItem("Address"));
      if (code == "" || code == null) {
        code = {};
        code.cantonProvince = "";
        code.cantonCity = "";
      }

      this.filterActive['firstClassUse'] = index+1
      this.selected['firstClassUse'] = item?item.zhCn:null
      this.searchInfo['firstClassUse'] = item?item.dictKey:null

      var pramse = {};
      pramse = {
        circulation: this.landTypeKey,
        firstClassUse: item?item.dictKey:null,
        cantonProvince: code.cantonProvince,
        cantonCity: code.cantonCity
      };
      if (this.landType == "转让") {
        this.getHomelandTransferInfo(pramse);
      } else if (this.landType == "出租") {
        this.getHomelandRentalInfo(pramse);
      } else if (this.landType == "抵押") {
        this.getHomelandMortgageInfo(pramse);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
  
}
.mainlist_cont :last-child li{
  margin-right: 10px;
}
.mainlist {
  @include size(100%, 438px);
  margin-top: 24px;
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
      width:150px;
      text-align: center;
      background: url('../../../assets/image/index_icon01.png') no-repeat center bottom;
    }
    .subTitle {
      li {
        color: #666666;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        span{
          padding: 0 20px;
          border-right: 1px solid #ebebeb;
          &:nth-child(2){
            border-right:none;
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
        li:last-child:hover {
          background-color: #fafafa;
          color: #666666;
        }
      }
    }
  }
  .brick-item {
    width: 244px;
    margin-left: 24px;
    position: relative;
    cursor: pointer;
    float: left;
    margin-right: 30px;
    margin-top: 25px;
    box-sizing: border-box;
    border: solid 1px #eeeded;
    p {
      @include size(244px, 48px);
      // background: #F5CC86;
      background: rgba(255, 255, 255, 0.3);
      text-align: center;
      line-height: 48px;
      color: #fff;
      position: absolute;
      bottom: -2px;
    }
  }
  .mainlist_cont {
    height: 375px;
    // width: 880px;
    width:100%;
    float: left;
    overflow: hidden;
  }
}
</style>
