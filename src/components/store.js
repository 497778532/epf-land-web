const state = {
  headerList:null,
}
const mutations = {
  setheaderList(state, data) {
    state.headerList = data
  },
}

const actions = {
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
