<template>
<!-- v-if="landUseInfo" -->
  <div class="win1200">
    <epf-landList></epf-landList>
    <!-- <epf-landList landType='土地转让'></epf-landList> -->
    <!-- <epf-landList landType='土地出租'></epf-landList>
    <epf-landList landType='土地抵押'></epf-landList> -->
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      landType:'出租'
    };
  },
  mounted() {
    if (this.homelandMortgageInfo !== null) {
      console.info("获取：" + this.homelandMortgageInfo);
    }
    //获取选择城市的缓存,不存在将其内容置空
    let code = JSON.parse(sessionStorage.getItem("Address"));
    if (code == "" || code == null) {
      code = {};
      code.cantonProvince = "";
      code.cantonCity = "";
    }
    this.getHomelandTransferInfo({
      circulation: "transfer",
      cantonProvince: code.cantonProvince,
      cantonCity: code.cantonCity
    });
    this.getHomelandRentalInfo({
      circulation: "rent",
      cantonProvince: code.cantonProvince,
      cantonCity: code.cantonCity
    });
    this.getHomelandMortgageInfo({
      circulation: "mortgage",
      cantonProvince: code.cantonProvince,
      cantonCity: code.cantonCity
    });
		this.getSearchLandUseInfo("land_use");
  },
  computed: {
    ...mapState("index", [
      "homelandTransferInfo",
      "homelandRentalInfo",
      "homelandMortgageInfo",
      "landUseInfo"
    ])
  },
  methods: {
    ...mapActions("index", [
      "getHomelandTransferInfo",
      "getHomelandRentalInfo",
      "getHomelandMortgageInfo",
			"getSearchLandUseInfo",
    ]),
  }
};
</script>
<style lang="scss" scoped></style>
