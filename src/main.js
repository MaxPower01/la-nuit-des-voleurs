import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";
import VueParticles from "vue-particles";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueParticles);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// Prévention de la fermeture de l'application lorsque le bouton "retour arrière" est appuyé sous Android.
// Source : https: //stackoverflow.com/questions/43329654/android-back-button-on-a-progressive-web-application-closes-de-app
window.addEventListener("load", function() {
  window.history.pushState(
    {
      noBackExitsApp: true
    },
    ""
  );
});

window.addEventListener("popstate", function(event) {
  if (event.state && event.state.noBackExitsApp) {
    window.history.pushState(
      {
        noBackExitsApp: true
      },
      ""
    );
  }
});
