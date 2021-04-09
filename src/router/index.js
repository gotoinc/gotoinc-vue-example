import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login"),
    meta: {
      guest: true
    }
  },
  {
    path: "/register-university",
    name: "register-university",
    component: () => import("@/views/universities/RegisterUniversity.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/users/add",
        name: "add-users",
        component: () => import("@/components/users/AddUser.vue")
      },
      {
        path: "/users/list",
        name: "list-users",
        component: () => import("@/components/users/UsersList.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/events",
    name: "events",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/events/add",
        name: "add-event",
        component: () => import("@/components/events/AddEvent.vue")
      },
      {
        path: "/events/calendar",
        name: "event-calendar",
        component: () => import("@/components/events/EventsCalendar.vue")
      },
      {
        path: "/events/list",
        name: "list-events",
        component: () => import("@/components/events/AllEvents.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/groups",
    name: "groups",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/groups/list",
        name: "list-groups",
        component: () => import("@/components/groups/GroupsList.vue")
      },
      {
        path: "/groups/add",
        name: "new-group",
        component: () => import("@/components/groups/AddGroup.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/buildings",
    name: "buildings",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/buildings/list",
        name: "list-buildings",
        component: () => import("@/components/buildings/AllBuildings.vue")
      },
      {
        path: "/buildings/add",
        name: "new-building",
        component: () => import("@/components/buildings/AddBuilding.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/certificates",
    name: "certificates",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/certificates/current",
        name: "current-certificate",
        component: () =>
          import("@/components/certificates/CurrentCertificate.vue")
      },
      {
        path: "/certificates/update",
        name: "update-certificate",
        component: () => import("@/components/groups/AddGroup.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/conversations",
    name: "conversations",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/conversations/my",
        name: "all-conversations",
        component: () =>
          import("@/components/conversations/AllConversations.vue"),
        children: [
          {
            path: "/conversations/my/:id",
            name: "single-conversation",
            component: () =>
              import("@/components/conversations/SingleConversation.vue")
          }
        ]
      },
      {
        path: "/conversations/new",
        name: "new-conversation",
        component: () =>
          import("@/components/conversations/NewConversation.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/views/Main"),
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
    if (store.state.token || localStorage.getItem("token")) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.token || localStorage.getItem("token")) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
