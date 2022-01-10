import Vue from "vue";
import App from "./App.vue";
// Use Element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Router
import router from './router'
// Axios
import './axios'

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
