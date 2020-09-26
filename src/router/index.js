import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";
import Register from "@/views/auth/Register";
import Login from "@/views/auth/Login";
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
        guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
        guest: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Main,
    meta: {
        requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token || localStorage.getItem('token')) {
      next()
      return
    }
    next('/login') 
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.token || localStorage.getItem('token')) {
      next('/')
      return
    }
    next() 
  } else {
    next() 
  }
})

export default router;
