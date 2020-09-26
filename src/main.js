import Vue from "vue";
Vue.config.devtools = true
Vue.config.performance = true

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from 'axios'
import Vuelidate from "vuelidate";

Vue.prototype.$http = Axios;


// Vue.prototype.$http.interceptors.response.use(response => {
//   return response;
//   }, error => {
//   if (error.response.status === 401) {
//     console.log(error)
//     //localStorage.removeItem('token')
//   }
//   return error;
// });

const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
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
