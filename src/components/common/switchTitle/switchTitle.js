import switchTitle from "./switchTitle.vue"
const list = {
  install: function(Vue){
    Vue.component("epf-switchTitle", switchTitle)
  }
}
export default list