import landList from "./landList.vue"
const list = {
    install: function(Vue){
        Vue.component("epf-landList", landList)
    }
}
export default list