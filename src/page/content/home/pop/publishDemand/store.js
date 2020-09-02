const state = {
    publishLandtype:null
}
const mutations = {
    setpublishLandtype(state, data) {
        state.publishLandtype=data
        console.log('dd圣诞节偶是京东dddd',data)
    }
}
const actions = {
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
}