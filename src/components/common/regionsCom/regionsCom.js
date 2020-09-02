import regionsCom from "./regionsCom.vue"
const list = {
    install: function(Vue){
        Vue.component("epf-regions", regionsCom)
    }
}
export default list