import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import axios from "axios";
import VueSession from "vue-session";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);
Vue.use(VueSession);

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
