import { createRouter, createWebHistory } from "vue-router";
import { Paths } from "../types/types";
import Home from "../components/pages/Home.vue";
import Exercise from "../components/pages/Exercises.vue";
import Workouts from "../components/pages/Workouts.vue";
import Login from "../components/pages/Login.vue";
import { useSessionStore } from "../store/sessionStore";
import { supabase } from "../utils/supabase";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: Paths.Home,
      name: "Home",
      component: Home,
    },
    {
      path: Paths.Exercises,
      name: "Exercises",
      component: Exercise,
    },
    {
      path: Paths.Workouts,
      name: "Workouts",
      component: Workouts,
      beforeEnter: (_to, _from, next) => {
        const store = useSessionStore();

        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            store.setSession(session);
            next();
            return;
          } else {
            next(Paths.Login);
          }
        });
      },
    },
    {
      path: Paths.Login,
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
