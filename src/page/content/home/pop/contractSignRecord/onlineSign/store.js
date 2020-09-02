const state = {
  // 合同网签备案
  contractsave:null,
  selectOne:null,
}
const mutations = {
  setContractsave(state, data){
    state.contractsave = data
  },
  setSelectOne(state, data){
    
    state.selectOne = data
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
