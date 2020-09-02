import * as IndexAPI from '@/api/index'
const state = {
  // 自行交易
  tSellByIds:null,
  // 自行交易详情页
  agreeDetailstate:null,
  // 地块信息
  transGoodsDetails:null
}
const mutations = {
  // 自行交易详情页
   setAgreeDetailstate(state, data){
    state.agreeDetailstate = data
    console.log("ssssss",data)
  },
  setTransGoodsDetails(state, data){
    state.transGoodsDetails = data
  },
  setTSellByIds(state, data){
    state.tSellByIds = data
  },
}

const actions = {
  async getTransGoodsDetails({ commit }, params) {
    commit('setTransGoodsDetails', null)
    const transGoodsDetails1 = await IndexAPI.getTransGoodsDetails(params)
    commit('setTransGoodsDetails', transGoodsDetails1.data)
  },
  async getTSellByIds({ commit }, params) {
    commit('setTSellByIds', null)
    const tSellByIds1 = await IndexAPI.getTSellByIds(params)
    commit('setTSellByIds', tSellByIds1.data)
  },
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
