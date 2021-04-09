import Vue from "vue";
import Vuetify from "vuetify/lib";
import en from "vuetify/es5/locale/en";
import uk from "vuetify/es5/locale/uk";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, uk },
    current: "en"
  }
});
