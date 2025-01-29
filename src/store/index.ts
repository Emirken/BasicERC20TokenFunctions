import { createStore } from 'vuex';

export default createStore({
  state: {
    contractData: null, // Contract verisini saklamak
    web3: null,         // Web3 nesnesini saklamak
    contract: null,     // Contract nesnesini saklamak
  },
  getters: {
    getContractData: (state) => state.contractData,
    getWeb3: (state) => state.web3,
    getContract: (state) => state.contract,
  },
  mutations: {
    setContractData(state, data) {
      state.contractData = data;
    },
    setWeb3(state, web3) {
      state.web3 = web3;
    },
    setContract(state, contract) {
      state.contract = contract;
    },
  },
  actions: {
    updateContractData({ commit }, data) {
      commit('setContractData', data);
    },
    initializeWeb3({ commit }, { web3, contract }) {
      commit('setWeb3', web3);
      commit('setContract', contract);
    },
  },
  modules: {},
});
