import column from "./column.vue"
const list = {
    install: function(Vue){
        Vue.component("epf-column", column)
    }
}
export default list