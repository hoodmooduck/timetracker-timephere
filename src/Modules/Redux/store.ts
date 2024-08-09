import { configureStore } from "@reduxjs/toolkit";
import Auth from "./actions/auth.ts";
import Projects from "./actions/projects.ts";
import Tasks from "./actions/tasks.ts";
import Tracker from "./actions/tracker.ts";

const store = configureStore({
  reducer: {
    auth: Auth,
    projects: Projects,
    tasks: Tasks,
    tracker: Tracker,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
