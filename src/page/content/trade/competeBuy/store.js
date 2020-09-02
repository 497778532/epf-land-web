import * as IndexAPI from '@/api/index'
const state = {
  // 竞买申请书数据币种列表
  ApplicationForBidding:null,
  // 根据币种选择银行
  BankByCurrency:null,
  // 查看详情
  transLicense:null
}
const mutations = {
  setApplicationForBidding(state, data){
    state.ApplicationForBidding = data;
  },
  setBankByCurrency(state, data){
    state.BankByCurrency = data
  },
  setTransLicense(state, data){
    state.transLicense = data
  },
}

const actions = {
  async getApplicationForBidding({ commit }, params) {
    commit('setApplicationForBidding', null)
    const ApplicationForBidding1 = await IndexAPI.getApplicationForBidding(params)
    commit('setApplicationForBidding', ApplicationForBidding1.data)
  },
  async getBankByCurrency({ commit }, params) {
    commit('setBankByCurrency', null)
    const BankByCurrency1 = await IndexAPI.getBankByCurrency(params)
    commit('setBankByCurrency', BankByCurrency1.data)
  },
   // 查看申请详情
  async getTransLicense({ commit }, params) {
    commit('setTransLicense', null)
    const BankByCurrency1 = await IndexAPI.getTransLicense(params)
    commit('setTransLicense', BankByCurrency1.data)
  },
  
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
