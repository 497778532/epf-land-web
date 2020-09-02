<template>
  <div class="statistic">
    <div class="mainlist_title">
      <h2 class="title fl">统计数据</h2>
      <ul class="subTitle">
        <li
          v-for="(item, index) in ['土地供给分布', '土地需求分布']"
          :key="index"
          :style="{ color: index == Trakey ? 'var(--lightColor)' : '' }"
          @click="Trakey = index"
          class="fl"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <ul class="data_content">
      <li>
        <chinaChart
          v-if="Trakey == 0"
          :timeStartMessage="start"
          :timeEndMessage="end"
          :currentMessage="Trakey"
          :activeTabsMessage="'supply'"
          ref="supplyChart"
        ></chinaChart>
        <chinaDemandChart
          v-if="Trakey == 1"
          :timeStartMessage="start"
          :timeEndMessage="end"
          :currentMessage="Trakey"
          :activeTabsMessage="'demand'"
          ref="demandChart"
        ></chinaDemandChart>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import chinaChart from "@/components/chinaChart";
import chinaDemandChart from "@/components/chinaDemandChart";
export default {
  components: { chinaChart, chinaDemandChart },
  data() {
    return {
      Trakey: 0,
      start: "",
      end: "",
      currentTabs: "supply"
    };
  },
  created() {
    const monthStartDate = moment()
      .month(moment().month())
      .startOf("month")
      .format("YYYY-MM-DD"); //本月开始时间
    const monthEndDate = moment()
      .month(moment().month())
      .endOf("month")
      .format("YYYY-MM-DD"); //本月结束时间
    this.start = monthStartDate;
    this.end = monthEndDate;
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.statistic {
  @include size(1200px, 640px);
  background: #fff;
  margin: 24px auto 0;
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
}
</style>
