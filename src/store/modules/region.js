const state = {
    name: 'region',
    region:null,
    // filterActiveS: {
    //   cantonProvince: "",
    //   cantonCity: "",
    //   cantonArea: "",
    // },
    filterActiveS:null,
    selected: {},
    searchInfo: {},
  }
  const mutations = {
    regionChage(state, data) {
      console.log("=====data======",data)
      state.filterActiveS = data
    },
  }
  export default {
    namespaced: true, //为了解决不同模块命名冲突的问题
    state,
    mutations,
  }