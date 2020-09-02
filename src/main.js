// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import store from "./store/";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import 'element-ui/lib/theme-chalk/reset.css'
import '@/assets/css/element-variables.scss'
import "./assets/font/DS-DIGI.TTF";
import VDistpicker from "v-distpicker";
import VueAMap from "vue-amap";
import uploader from "vue-simple-uploader";
import "babel-polyfill";
import '@/assets/css/index.scss'
// 引入mockjs
// require('./mock/index.js')

// 全局样式&element框架覆盖样式&自定义全局样式类
import "./assets/css/common.css";
import "./assets/css/cover.css";
import "./assets/css/class.css";
import { setCookie, getCookie, delCookie } from "./util/cookie";
import { format } from "./util/format.js";

import bus from "./assets/js/bus";
import api from "./api/api";

import Axios from "./util/request2";
import VuePhotoZoomPro from "vue-photo-zoom-pro";
import VueLazyload from "vue-lazyload";
import echarts from "echarts";
import Print from "vue-print-nb";
// 弹框拖动
import vueDrag from "vue-dragging";

//自定义插件
import annexList from "./components/common/annexList/annexList";

// import regionsCom from './components/common/regionsCom/regionsCom'
import levelPage from "./components/common/levelPage/levelPage";
import switchtitle from "./components/common/switchTitle/switchTitle";
import landPage from "./components/common/landPage/landPage";
import landList from "./components/common/landList/landList";
import filter from "./components/common/filter/filter";
import column from "./components/common/column/column";
import customTable from "./components/common/customTable/customTable";
import modeMsg from "./components/common/modeMsg/modeMsg";
import tag from "./components/common/tag/tag";
import step from "./components/common/step/step";
import * as Tools from "@/util/tools";
// import * as isWscnEmail from './util/validate'
import "babel-polyfill"
import htmlToPdf from "@/util/htmlToPdf.js";
Vue.use(htmlToPdf);
import { validateNum} from "@/util/checkFormNum.js";
import { NumToChinese, Division } from "@/util/numToChinese.js";
Vue.use(Tools);
import vRegion from 'v-region';
Vue.use(vRegion);
Vue.use(Print);
Vue.use(VuePhotoZoomPro);
Vue.use(switchtitle);
Vue.use(annexList);
// Vue.use(regionsCom)
Vue.use(levelPage);
Vue.use(VueLazyload, {
  //懒加载+onError
  error: require("./assets/image/icon-nodata.png")
});
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(format);
Vue.use(vueDrag);
Vue.use(uploader);
Vue.use(landPage);
Vue.use(landList);
Vue.use(filter);
Vue.use(column);
Vue.use(customTable);
Vue.use(modeMsg);
Vue.use(tag);
Vue.use(step);

Vue.prototype.validateNum = validateNum;

Vue.prototype.NumToChinese = NumToChinese;
Vue.prototype.Division = Division;
Vue.prototype.$bus = bus;
Vue.prototype.$axios = Axios;
Vue.prototype.HOST = "/api";
Vue.prototype.$echarts = echarts;
Vue.prototype.$cookieStore = { setCookie, getCookie, delCookie };
Vue.prototype.$API = api;
Vue.config.devtools = true;

Vue.component("v-distpicker", VDistpicker);

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
