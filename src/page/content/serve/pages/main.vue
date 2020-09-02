<template>
  <div class="serviceCenter_maintop">
    <ul v-if="serviceInfo && serviceInfo !== null">
      <li
        v-for="(item, index) in serviceInfo.dictionariesEntities"
        :key="index"
        @click="serivceSelect(item.zhCn, index, item.dictKey)"
      >
        <img
          v-lazy="
            require('../../../../assets/image/icon-service0' +
              (index + 1) +
              '-1.png')
          "
        />
        <p>{{ item.zhCn }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      filterActive: {
        cantonProvince: "",
        serviceType: "",
        gradeType: ""
      },
      selected: {
        cantonProvince: "",
        serviceType: "",
        gradeType: ""
      },
      searchInfo: {
        cantonProvince: "",
        serviceType: "",
        gradeType: ""
      },
      search: {
        cantonProvince: "",
        serviceType: "",
        gradeType: ""
      }
    };
  },
  computed: {
    ...mapState("index", ["serviceInfo"])
  },
  methods: {
    ...mapActions("index", ["getSearchServiceInfo"]),
    serivceSelect(zhCn, key, dictKey) {
      this.selected.serviceType = zhCn;
      this.filterActive.serviceType = key + 1;
      this.searchInfo.serviceType = dictKey;
      this.search.serviceType = dictKey;
      this.$store.search = this.search;
      this.$store.selected = this.selected;
      this.$store.filterActive = this.filterActive;
      localStorage.setItem("selected", JSON.stringify(this.selected));
      localStorage.setItem("filterActive", JSON.stringify(this.filterActive));
      localStorage.setItem("searchInfo", JSON.stringify(this.searchInfo));
      localStorage.setItem("search", JSON.stringify(this.search));
      if (this.searchText) {
        this.$router.push({
          path: "/serveSearch",
          query: { search: this.searchText }
        });
        return;
      }
      this.$router.push({ path: "/serveSearch" });
    }
  },
  mounted() {
    this.getSearchServiceInfo("service_type");
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.serviceCenter_maintop {
  @include size(100%, 160px);
  background: #fff;
  box-sizing: border-box;
  padding: 40px 80px;
  position: relative;
  z-index: 10;
  ul {
    li {
      width: 25%;
      float: left;
      overflow: hidden;
      text-align: center;
      cursor: pointer;
      transition: 0.4s;
      img {
        @include size(50px, 50px);
        margin-bottom: 3px;
      }
      p {
        width: auto;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666666;
        text-align: center;
      }
    }
    li:last-child(1) {
      margin-right: 0px;
    }
    li:hover {
      -webkit-transform: translate3d(0, -2px, 0);
      transform: translate3d(0, -2px, 0);
    }
  }
}
</style>
