import Vue from "vue";
import Router from "vue-router";
import Mobile from "./views/Mobile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "mobile",
      component: Mobile
    },
    {
      path: "/desktop",
      name: "desktop",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Desktop.vue")
    }
  ]
});
