import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const configApi = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token"); // Retrieve token from local storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => `/users/me`,
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: `/jobs/create`,
        method: "POST",
        body: data,
      }),
    }),
    getAllJobs: builder.query({
      query: () => `/jobs/all`,
    }),
    updateJob: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/jobs/update/${id}`,
        method: "PUT",
        body: updateData,
      }),
    }),
  }),
});
export const { useLoginMutation } = configApi;
export const { useGetProfileQuery } = configApi;
export const { useCreateJobMutation } = configApi;
export const { useGetAllJobsQuery } = configApi;
export const { useUpdateJobMutation } = configApi;
