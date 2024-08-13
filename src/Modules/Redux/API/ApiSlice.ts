import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserData, saveUserData } from "../../Firebase/database-requests.ts";

export const apiSlice = createApi({
  reducerPath: "firebaseDatabaseRequests",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getUserData: build.query({
      queryFn: async (uid: string) => {
        try {
          const data = await getUserData(uid);
          return { data };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
    saveUserData: build.mutation({
      queryFn: async (userData: user | null) => {
        try {
          await saveUserData(userData);
          return { data: null };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useGetUserDataQuery, useSaveUserDataMutation } = apiSlice;
