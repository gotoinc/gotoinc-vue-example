import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from 'axios'
import Vuelidate from "vuelidate";
import ActionCableVue from 'actioncable-vue';
import env from '@/components/helpers/EnvVariables.js'
import VueI18n from 'vue-i18n'
import { messages } from './components/helpers/locales.js'
import VueChatScroll from 'vue-chat-scroll'

Vue.prototype.$http = Axios;

console.log(env.cable)

const token = localStorage.getItem('token')

Vue.use(VueI18n)
Vue.use(VueChatScroll)

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: `${env.cable}?token=${token}`,
  connectImmediately: false,
  store
});

const i18n = new VueI18n({
  locale: store.state.locale,
  messages
})


// Vue.prototype.$http.interceptors.response.use(response => {
//   return response;
//   }, error => {
//   if (error.response.status === 401) {
//     console.log(error)
//     //localStorage.removeItem('token')
//   }
//   return error;
// });

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json'
}

Vue.config.productionTip = false;

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
  validations: {}
}).$mount("#app");
