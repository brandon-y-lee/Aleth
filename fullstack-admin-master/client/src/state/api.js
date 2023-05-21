import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* createApi is a function that generates an API slice, 
    which includes reducers and actions that handles all the data fetching logic. */
export const api = createApi({

  /* baseQuery handles making the actual HTTP requests, fetchBaseQuery is a basic fetch implementation
      with sensible defaults for things like headers. */
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  /* reducerPath is the key in the Redux store where the API slice reducer will be mounted. */
  reducerPath: "adminApi",
  
  /* tagTypes is an array of tag types that can be invalidated or refetched as part of the cache handling behavior. */
  tagTypes: [
    "User",
    "Templates",
    "Entity",
    "Shipments",
    "Map",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/templates",
      providesTags: ["Templates"],
    }),
    getCustomers: build.query({
      query: () => "client/entity",
      providesTags: ["Entity"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/shipments",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Shipments"],
    }),
    getGeography: build.query({
      query: () => "client/map",
      providesTags: ["Map"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
