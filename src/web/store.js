import * as IndexAPI from "@/api/index";
const state = {
  InformationList: null
};
const mutations = {
  setInformationList(state, data) {
    state.InformationList = data;
  }
};

const actions = {
  async getInformationList({ commit }, param) {
    commit("setInformationList", null);
    const InformationList = await IndexAPI.getInformationList(param);
    commit("setInformationList", InformationList.data);
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
