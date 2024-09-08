import { configureStore } from "@reduxjs/toolkit";
import Auth from "./actions/auth.ts";
import Projects from "./actions/projects.ts";
import Tasks from "./actions/tasks.ts";
import Tracker from "./actions/tracker.ts";
import Modal from "./actions/modal.ts";
import { apiSlice } from "./API/ApiSlice.ts";
import { loadingSlice } from "./API/loading.ts";

const store = configureStore({
  reducer: {
    auth: Auth,
    projects: Projects,
    tasks: Tasks,
    tracker: Tracker,
    modal: Modal,
    [apiSlice.reducerPath]: apiSlice.reducer,
    loading: loadingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
