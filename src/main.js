import Vue from "vue";
import App from "./App.vue";
// Use Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Router
import router from "./router";
// Axios
import "./axios";
// Lang EN
import locale from "element-ui/lib/locale/lang/en.js";
// Sweet Alert2
import VueSweetalert2 from "vue-sweetalert2";

import moment from "moment";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm");
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
