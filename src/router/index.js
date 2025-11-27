// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/SignUpView.vue"),
    meta: { public: true },
  },
  {
    path: "/profile-edit",
    name: "ProfileEdit",
    component: () => import("@/views/ProfileEditView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard (protect pages)
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  await auth.fetchUser();

  if (!to.meta.public && !auth.user) {
    return next("/signup");
  }

  next();
});

export default router;