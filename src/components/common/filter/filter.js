import filter from "./filter.vue"
const list = {
    install: function(Vue){
        Vue.component("epf-filter", filter)
    }
}
export default list