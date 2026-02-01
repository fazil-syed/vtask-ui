import { createListenerMiddleware } from "@reduxjs/toolkit";
import { baseApi } from "../../services/baseApi";
import { markLoggedOut } from "./authSlice";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerNewUser: builder.mutation({
      query: (userPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: userPayload,
      }),
      //   transformResponse : (response,meta,erg) => response.data,
      invalidatesTags: ["Auth"],
    }),
    loginUser: builder.mutation({
      query: (loginPayload) => ({
        url: "/auth/login",
        body: loginPayload,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    fetchUser: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useFetchUserQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;

export const authListener = createListenerMiddleware();
authListener.startListening({
  actionCreator: markLoggedOut,
  effect: async (_, api) => {
    api.dispatch(baseApi.util.resetApiState());
  },
});
