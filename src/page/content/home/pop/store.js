import * as IndexAPI from '@/api/index'
const state = {
  // 合同网签遍历土地信息--自行交易列表
  sellByContract:null,
  // 合同网签遍历土地信息-委托交易列表
  TransGoodsByCirculation:null,
  // 合同网签遍历土地信息-自行交易列表-点击确定数据回显
  contractAndById:null,
  // 合同网签遍历土地信息-委托交易接口列表-点击确定数据回显
  circulationAndById:null
}
const mutations = {
  // 合同网签遍历土地信息--自行交易列表
   setSellByContract(state, data){
    state.sellByContract = data
  },
  // 合同网签遍历土地信息-委托交易列表
  setTransGoodsByCirculation(state, data){
    state.TransGoodsByCirculation = data
  },
  // 合同网签遍历土地信息-自行交易列表-点击确定数据回显
  setTSellByContractAndById(state, data){
    state.contractAndById = data
  },
  // 合同网签遍历土地信息-委托交易接口列表-点击确定数据回显
  setTransGoodsByCirculationAndById(state, data){
    state.circulationAndById = data
  },
}

const actions = {
  // 合同网签遍历土地信息--自行交易列表
  async getTSellByContract({ commit }, params) {
    commit('setSellByContract', null)
    const SellByContract1 = await IndexAPI.getTSellByContract(params)
    commit('setSellByContract', SellByContract1.data)
  },
  // 合同网签遍历土地信息-委托交易列表
  async getTransGoodsByCirculation({ commit }, params) {
    commit('setTransGoodsByCirculation', null)
    const SellByContract1 = await IndexAPI.getTransGoodsByCirculation(params)
    commit('setTransGoodsByCirculation', SellByContract1.data)
  },
  // 合同网签遍历土地信息-自行交易列表-点击确定数据回显
  async getTSellByContractAndById({ commit }, params) {
    commit('setTSellByContractAndById', null)
    const contractAndById1 = await IndexAPI.getTSellByContractAndById(params)
    commit('setTSellByContractAndById', contractAndById1.data)
  },
  // 合同网签遍历土地信息-委托交易接口列表-点击确定数据回显
  async getTransGoodsByCirculationAndById({ commit }, params) {
    commit('setTransGoodsByCirculationAndById', null)
    const contractAndById1 = await IndexAPI.getTransGoodsByCirculationAndById(params)
    commit('setTransGoodsByCirculationAndById', contractAndById1.data)
  },
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
