import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => 
      import('../views/Main.vue')
    ,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import( "../views/About.vue"),
  },
  {
    path: "/write",
    name: "Write",
    component: () =>
      import( "../views/Write.vue"),
  },
  {
    path: "/post/:id",
    name: "PostPage",
    component: () =>
      import( "../views/PostPage.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import( "../views/Admin.vue"),
  },
  {
    path: "/submissions/:id",
    name: "SubmissionPage",
    component: () =>
      import( "../views/SubmissionPage.vue"),
  },
  {
    path: "/Edit/",
    name: "EditorPage",
    component: () =>
      import( "../views/EditorPage.vue"),
  },
  {
    path: "/Submissions/",
    name: "SubmissionsPage",
    component: () =>
      import( "../views/SubmissionsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

export default router;
