import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./ApiSlice.ts";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getUserData.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(apiSlice.endpoints.getUserData.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(apiSlice.endpoints.getUserData.matchRejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(apiSlice.endpoints.saveUserData.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(apiSlice.endpoints.saveUserData.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(apiSlice.endpoints.saveUserData.matchRejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
