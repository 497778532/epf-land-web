<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="自行交易" name="first">
        <epf-filter style="margin-top:5px;"></epf-filter>
        <epf-ownTrade
          :tableHead="tableHead"
          :tableContent="tableContentData"
          style="margin-top:30px;"
        ></epf-ownTrade>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ownTrade from "../../../../components/alone/ownTrade";
export default {
  components: {
    "epf-ownTrade": ownTrade
  },
  data() {
    return {
      activeName: "first",
      tableHead: [
        {
          span: 8,
          title: "土地基本信息"
        },
        {
          span: 5,
          title: "金额(万元)"
        },
        {
          span: 3,
          title: "需求类型"
        },
        {
          span: 4,
          title: "联系电话"
        },
        {
          span: 4,
          title: "操作"
        }
      ],
      tableContentData: [
        {
          imgSrc: "http://www.123123.com",
          title: "11梅岭镇中南昌市湾里区梅岭镇南昌市湾里区梅岭镇",
          date: "2019-01-01 18:00:05",
          place: "山西省-太原市-小店区",
          area: "5000平方米",
          price: 500,
          flowType: "转让",
          type: "交易中",
          typeDot: "success",
          handle: "button",
          handleText: "登记成交结果"
        }
      ]
    };
  }
};
</script>