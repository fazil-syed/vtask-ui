import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { markLoggedOut } from "../features/auth/authSlice";
const baseUrl = import.meta.env.VITE_API_BASE || "";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
});
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    const status = result.error.status;
    if (status === 401) {
      api.dispatch(markLoggedOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["Tasks", "Auth"],
  endpoints: () => ({}),
});
