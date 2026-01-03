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
      // Do not reset cache if 401 is from /auth/me endpoint or it will cause infinite loop of requests
      const isMeEndpoint =
        typeof args === "string"
          ? args.includes("/auth/me")
          : args?.url?.includes("/auth/me");
      if (!isMeEndpoint) {
        api.dispatch(baseApi.util.resetApiState());
      }
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
