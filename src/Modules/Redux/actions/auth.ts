import { AuthTypes } from "../../types/authTypes.ts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthTypes = {
  isAuth: false,
  fetching: false,
  user: {
    uidUser: "",
    email: "",
    accessToken: "",
    refreshToken: "",
  },
};

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
      state.fetching = false;
    },
    registration(state, action) {
      state.isAuth = true;
      state.user = action.payload;
      state.fetching = false;
    },
    logOut(state) {
      state.isAuth = false;
    },
    load(state) {
      state.fetching = true;
    },
  },
});

export const { load, login, registration, logOut } = Auth.actions;

export default Auth.reducer;
