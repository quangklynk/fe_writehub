import Vue from "vue";
import App from "./App.vue";
// Use Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Router
import router from './router'
// Axios
import './axios'
// Lang EN
import locale from 'element-ui/lib/locale/lang/en.js'

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
