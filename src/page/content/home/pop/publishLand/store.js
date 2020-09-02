const state = {
    publishLandtype:null
}
const mutations = {
    setpublishLandtype(state, data) {
        state.publishLandtype=data
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