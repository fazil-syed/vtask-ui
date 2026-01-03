import { baseApi } from "../../services/baseApi";
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
  }),
});

export const { useRegisterNewUserMutation } = authApi;
