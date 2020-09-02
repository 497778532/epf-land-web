const state = {
    name: 'homeland',
    homebox:false,
    publishLandInfo: false,
    PublishDemandInfo:false,
    SignRecordInfo:false,
    entrustTransInfo:false,
    attestationPop:false,
  }
  const mutations = {
    open(state, name) {
      state[name] = true
      state.homebox = true
    },
    close(state, name) {
      state[name] = false
      state.homebox = false
    },
  }
  
  const actions = {}

  export default {
    namespaced: true, 
    state,
    actions,
    mutations,
  }