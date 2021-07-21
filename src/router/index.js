import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AvailableTours from "../views/AvailableTours.vue";
import TourDetails from "../views/TourDetails.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import CategoryTours from "../views/CategoryTours.vue";
import CreateTour from "../views/admin/CreateTour.vue";
import ListTours from "../views/admin/ListTours.vue";
import Cart from "../views/Cart.vue";
import Favorites from "../views/Favorites.vue";
import DateTours from "../views/DateTours.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props:true
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "Login",
    component: Login,
  },
  {
    // add middleware to this route
    path: "/admin/list-tours",
    name: "ListTours",
    component: ListTours,
    props:true
  },
  {
    // add middleware to this route
    path: "/admin/create-tours",
    name: "CreateTour",
    component: CreateTour,
  },
  {
    // add middleware to this route
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    // add middleware to this route
    path: "/favorites",
    name: "favorites",
    component: Favorites,
  },
  {
    // add middleware to this route
    path: "/search_by_date",
    name: "DateTours",
    component: DateTours,
    props:true
  },
  {
    path: "/tours",
    name: "AvailableTours",
    component: AvailableTours,
    props: true,
  },
  {
    path: "/tour/:id",
    name: "TourDetails",
    component: TourDetails,
    props: true,
  },
  {
    path: "/:category",
    name: "CategoryTours",
    component: CategoryTours,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
