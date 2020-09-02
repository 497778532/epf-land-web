<template>
  <li>
    <div class="cont_top">
      <div class="type_tit">{{items.landTypeName}}</div>
      <img alt class="cont_img" v-lazy="baseURLclu + items.img" :key="baseURLclu + items.img"/>
    </div>
    <div class="cont_bot">
      <h4>{{items.title}}</h4>
      <span class="price">
        {{items.price?'￥ '+Division(items.price) +'万元':'面议'}}
      </span>
      <h5>
        <span>
          <img src="@/assets/image/icon-area.png" alt />
          {{items.area}}平方米
        </span>
        <span class="fr">
          <img src="@/assets/image/icon-time.png" alt />
          {{items.years}}年
        </span>
      </h5>
      <p>
        <img src="@/assets/image/icon-map.png" alt />
        {{items.cantonProvinceName}} /
        {{items.cantonCityName}} /
        {{items.cantonAreaName}}
      </p>
    </div>
  </li>
</template>
<script>
import baseURL1 from "@/util/config.js"
export default {
  name: "landPage",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      baseURLclu: "",
      items: this.item
    }
  },
  created() {
    this.baseURLclu =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
  }
}
</script>
<style lang="scss" scoped>
li {
  width: 290px;
  height: 325px;
  float: left;
  margin: 25px 12px 0 0;
  box-sizing: border-box;
  border: solid 1px #eeeded;
  cursor: pointer;
  transition: 0.4s;
  background:#fff;
  .cont_top {
    width: 100%;
    height: 190px;
    position: relative;
    .type_tit {
      border-bottom-right-radius: 8px;
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 7px 20px;
      color: #fff;
      background: rgba(70, 113, 213, 0.7);
      background: var(--lightColor);
    }
    .cont_img {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .cont_bot {
    width: 100%;
    height: 135px;
    box-sizing: border-box;
    padding: 12px 20px;
    line-height: 25px;
    h4 {
      line-height: 32px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      overflow: hidden !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      word-break: normal !important;
    }
    .price {
      color: var(--priceColor);
      font-size: 18px;
      font-weight: bolder;
    }
    h5 {
      font-size: 14px;
      color: #666;
      span {
        &:nth-child(1) {
          img {
            margin-top: 2px;
            margin-right: 3px;
            margin-left: -3px;
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
      font-size: 14px;
      color: #666;
      white-space: nowrap;
      margin-left: -5px;
    }
  }
}
li:hover {
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
</style>