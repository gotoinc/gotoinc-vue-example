import Vue from "vue";
import Vuex from "vuex";
import store from './store'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  store,
  mutations,
  actions,
  getters
});
