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
        url: `/tasks/mark-complete/${taskID}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),
    markTaskInCompleted: builder.mutation({
      query: (taskID) => ({
        url: `/tasks/mark-incomplete/${taskID}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (taskID) => ({
        url: `/tasks/delete/${taskID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    EditTask: builder.mutation({
      query: ({ taskID, payload }) => ({
        url: `/tasks/edit/${taskID}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTasksMutation,
  useMarkTaskCompletedMutation,
  useMarkTaskInCompletedMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} = tasksApi;
