import customTable from "./customTable.vue"
const list = {
    install: function(Vue){
        Vue.component("epf-customTable", customTable)
    }
}
export default list