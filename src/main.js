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

Vue.prototype.$http = Axios;

console.log(env.cable)

const token = localStorage.getItem('token')

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: `${env.cable}?token=${token}`,
  connectImmediately: false,
  store
});


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
  vuetify,
  render: h => h(App),
  validations: {}
}).$mount("#app");
