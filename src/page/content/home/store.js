import * as IndexAPI from '@/api/index'
const state = {
  // 轮播图
  BannerMsg:null,
  SearchDicInfo:null,
  // 行政区域
  regionInfo:null,
  // 地块面积
  flowModeInfo:null,
  // 使用年限
  plotAreaInfo:null,
  // 土地类型
  yearsUseInfo:null,
  // 土地性质
  landtypeInfo:null,
  // 土地性质
  landNatureInfo:null,
  // 首页菜单栏
  menuJsonInfo:null,
  // 首页土地转让信息
  homelandTransferInfo:null,
  // 首页土地出租信息
  homelandRentalInfo:null,
  // 首页土地抵押信息
  homelandMortgageInfo:null,
  // 根据code查询数据字典
  dict:null,
  //找到需求
  tpurchase : null,
  // 土地用途
  landuse:null,
  personTSell:null,
  // 服务类型
  serviceInfo:null,
  // 等级
  gradeInfo:null,
  landUseInfo:null,
  landUseInfo2:null,
}
const mutations = {
  // 轮播图
  setBannerMsg(state, data) {
    state.BannerMsg = data
  },
  // 行政区域
  setSearchDicRegion(state, data){
    state.regionInfo = data
    if(data!==null){
      // console.log("sssssssssss",data.dictionariesEntities)
    }
  },
  // 土地用途1
  setSearchDicLandUseInfo(state, data){
    state.landUseInfo = data
  },
  // 土地用途2
  setSearchDicLandUseInfo2(state, data){
    state.landUseInfo2 = data
  },
  // 流转方式
  setSearchDicflowModeInfo(state, data){
    state.flowModeInfo = data
  },
  // 地块面积
  setSearchDicPlotAreaInfo(state, data){
    state.plotAreaInfo = data
  },
  // 使用年限
  setSearchDicYearsUseInfo(state, data){
    state.yearsUseInfo = data
  },
  // 土地类型
  setSearchDicLandtypeInfo(state, data){
    state.landtypeInfo = data
  },
  // 土地性质
  setSearchDicLandNatureInfo(state, data){
    state.landNatureInfo = data
  },
  // 首页菜单栏
  setMenuJsonInfo(state, data){
    state.menuJsonInfo = data
  },
  // 首页地块信息
  setHomelandInfo(state, data){
    state.homelandInfo = data
  },
  // 首页土地转让信息
  setHomelandTransferInfo(state, data){
    state.homelandTransferInfo = data
    if(data){
      // console.log("ddddd",data.pager)
    }
  },
  // 首页土地出租信息
  setHomelandRentalInfo(state, data){
    state.homelandRentalInfo = data
  },
  // 首页土地抵押信息
  setHomelandMortgageInfo(state, data){
    state.homelandMortgageInfo = data
  },
  // 根据code获取字典

  setDict(state, data){
    state.dict = data
    // console.info(state.dict);
  },
  //找地需求
  setTpurchase(state, data){
    state.tpurchase = data
  },
  setPersonTSell(state, data){
    state.personTSell = data
  },
  // 服务类型
  setSearchServiceInfo(state, data){
    state.serviceInfo = data
  },
  // 等级
  setSearchGradeInfo(state, data){
    state.gradeInfo = data
  },
}

const actions = {
  // 轮播图
  async getBannerMsg({ commit }, param) {
    commit('setBannerMsg', null)
    const BanneInfo = await IndexAPI.getBannerMsg(
      param,
    )
    commit('setBannerMsg', BanneInfo.data)
  },
  // 行政区域
  async getSearchDicRegion({ commit }, parentId) {
    if(parentId=="0"){
      parentId="000000";
    }
    // console.log(12312312);
    commit('setSearchDicRegion', null)
    const SearchDicRegionInfo = await IndexAPI.getSearchArea(
      parentId,
    )
    commit('setSearchDicRegion', SearchDicRegionInfo.data)
  },
  // 流转方式
  async getSearchflowModeInfo({ commit }, code) {
    commit('setSearchDicflowModeInfo', null)
    const SearchDicflowModeInfo = await IndexAPI.getSearchDic(
      code,
    )
    commit('setSearchDicflowModeInfo', SearchDicflowModeInfo.data)
  },
  // 地块面积
  async getSearchPlotAreaInfo({ commit }, code) {
    commit('setSearchDicPlotAreaInfo', null)
    const SearchDicPlotAreaInfo = await IndexAPI.getSearchDic(
      code,
    )
    commit('setSearchDicPlotAreaInfo', SearchDicPlotAreaInfo.data)
  },
  // 使用年限
  async getSearchYearsUseInfo({ commit }, code) {
    commit('setSearchDicYearsUseInfo', null)
    const SearchDicYearsUseInfo = await IndexAPI.getSearchDic(
      code,
    )
    commit('setSearchDicYearsUseInfo', SearchDicYearsUseInfo.data)
  },
  // 土地类型
  async getSearchLandtypeInfo({ commit }, code) {
    commit('setSearchDicLandtypeInfo', null)
    const SearchDicLandtypeInfo = await IndexAPI.getSearchDic(
      code,
    )
    commit('setSearchDicLandtypeInfo', SearchDicLandtypeInfo.data)
  },
  // 土地性质
  async getSearchlandNatureInfo({ commit }, code) {
    // console.log(12312312);
    commit('setSearchDicLandNatureInfo', null)
    const SearchDiclandNatureInfo = await IndexAPI.getSearchDic(
      code,
    )
    commit('setSearchDicLandNatureInfo', SearchDiclandNatureInfo.data)
  },
  // 首页菜单栏
  async getInfoMenuJson({ commit }, code) {
    commit('setMenuJsonInfo', null)
    // const menuJsonInfo1 = await IndexAPI.getInfoMenuJson(
    //   code,
    // )
    // commit('setMenuJsonInfo', menuJsonInfo1.data)
  },
  // 首页土地转让信息
  async getHomelandTransferInfo({ commit }, landTransfer) {
    commit('setHomelandTransferInfo', null)
    const homelandTransferInfo1 = await IndexAPI.getTransfer(landTransfer)
    commit('setHomelandTransferInfo', homelandTransferInfo1.data)
  },
  // 首页土地出租信息
  async getHomelandRentalInfo({ commit }, landTransfer) {
    commit('setHomelandRentalInfo', null)
    const homelandRentalInfo1 = await IndexAPI.getTransfer(
      landTransfer
    )
    commit('setHomelandRentalInfo', homelandRentalInfo1.data)
  },
  // 首页土地抵押信息
  async getHomelandMortgageInfo({ commit }, landTransfer) {
    commit('setHomelandMortgageInfo', null)
    const homelandMortgageInfo1 = await IndexAPI.getTransfer(
      landTransfer
    )
    commit('setHomelandMortgageInfo', homelandMortgageInfo1.data)
  },
  // 获取字典数据
  async getDict({ commit }, code) {
    commit('setDict', null)
    const dict = await IndexAPI.getDict(
      code
    )
    // commit('setDict', dict.data.dictionariesList.slice(0,5))
  },
  // 获取找地需求
  async getTpurchase({ commit }, code) {
    commit('setTpurchase', null)
    const tpurchase = await IndexAPI.getTpurchase(
      code
    )
    commit('setTpurchase', tpurchase.data)
  },
  // 土地用途1(index)
  async getSearchDicLandUseInfo({ commit }, params) {
    commit('setSearchDicLandUseInfo', null)
    const landuse1 = await IndexAPI.getDictsByCodeOrParentId(params)
    commit('setSearchDicLandUseInfo', landuse1.data)
  },
  // 土地用途2(index)
  async getSearchDicLandUseInfo2({ commit }, params) {
    commit('setSearchDicLandUseInfo2', null)
    const landuse1 = await IndexAPI.getDictsByCodeOrParentId(params)
    commit('setSearchDicLandUseInfo2', landuse1.data)
  },
  // 土地用途1
  async getSearchLandUseInfo({ commit }, code) {
    commit('setSearchDicLandUseInfo', null)
    const landuse1 = await IndexAPI.getSearchDic(code)
    commit('setSearchDicLandUseInfo', landuse1.data)
  },
  // 服务类型
  async getSearchServiceInfo({ commit }, code) {
    commit('setSearchServiceInfo', null)
    const SearchServiceInfo = await IndexAPI.getSearchDic(
      code,
    )
    console.log(SearchServiceInfo.data);
    commit('setSearchServiceInfo', SearchServiceInfo.data)
  },
  // 等级
  async getSearchGradeInfo({ commit }, code) {
    commit('setSearchGradeInfo', null)
    const SearchGradeInfo = await IndexAPI.getSearchDic(
      code,
    )
    console.log(SearchGradeInfo.data);
    commit('setSearchGradeInfo',SearchGradeInfo.data)
  },
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
