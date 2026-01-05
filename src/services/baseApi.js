import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    const status = result.error.status;
    if (status === 401) {
      api.dispatch(baseApi.util.resetApiState());
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
