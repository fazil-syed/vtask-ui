import { baseApi } from "../../services/baseApi";
export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    addTasks: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    markTaskCompleted: builder.mutation({
      query: (taskID) => ({
        url: `/tasks/${taskID}`,
        method: "POST",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTasksMutation,
  useMarkTaskCompletedMutation,
} = tasksApi;
