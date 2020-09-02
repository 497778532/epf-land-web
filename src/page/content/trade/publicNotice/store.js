import * as IndexAPI from '@/api/index'
const state = {
  noticeOrResultMoreList:null,
  // 公告详情/变更公告详情接口
  noticeDetails:null,
  publicity:null,
  // 交易大厅-详情页面-变更公告历史记录
  changeNoticeList:null
}
const mutations = {
  setNoticeOrResultMoreList(state, data){
    state.noticeOrResultMoreList = data
  },
  // 公告详情/变更公告详情接口
  setNoticeDetails(state, data){
    state.noticeDetails = data
  },
  setPublicity(state, data){
    state.publicity = data
  },
  // 交易大厅-详情页面-变更公告历史记录
  setChangeNoticeList(state, data){
    state.changeNoticeList = data
  },
}

const actions = {
  async getNoticeOrResultMoreList({ commit }, params) {
    commit('setNoticeOrResultMoreList', null)
    const noticeOrResultMoreList1 = await IndexAPI.getNoticeOrResultMoreList(params)
    commit('setNoticeOrResultMoreList', noticeOrResultMoreList1.data)
  },
  // 公告详情/变更公告详情接口
  async getNoticeDetails({ commit }, params) {
    commit('setNoticeDetails', null)
    const noticeDetails1 = await IndexAPI.getNoticeDetails(params)
    commit('setNoticeDetails', noticeDetails1.data)
  },
  async getPublicity({ commit }, params) {
    commit('setPublicity', null)
    const publicity1 = await IndexAPI.getPublicity(params)
    commit('setPublicity', publicity1.data)
  },
  async getPublicity({ commit }, params) {
    commit('setPublicity', null)
    const publicity1 = await IndexAPI.getPublicity(params)
    commit('setPublicity', publicity1.data)
  },
  // 交易大厅-详情页面-变更公告历史记录
  async getChangeNoticeList({ commit }, params) {
    commit('setChangeNoticeList', null)
    const ChangeNoticeList1 = await IndexAPI.getChangeNoticeList(params)
    commit('setChangeNoticeList', ChangeNoticeList1.data)
  },
  
  
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
