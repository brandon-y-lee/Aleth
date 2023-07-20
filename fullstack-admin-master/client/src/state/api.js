import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* createApi is a function that generates an API slice, 
    which includes reducers and actions that handles all the data fetching logic. */
export const api = createApi({

  /* baseQuery handles making the actual HTTP requests, fetchBaseQuery is a basic fetch implementation
      with sensible defaults for things like headers. */
      baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
          // If using @reduxjs/toolkit with a correctly configured store
          // You can retrieve data from any place in the state here
          const token = localStorage.getItem('token');
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        }
      }),

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
      query: ({ page, pageSize, sort, search, userId }) => ({
        url: "client/shipments",
        method: "GET",
        params: { page, pageSize, sort, search, userId },
      }),
      providesTags: ["Shipments"],
    }),

    processPdf: build.mutation({
      query: (file) => ({
        url: 'client/processPDF',
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      }),
    }),

    getEligibleSellers: build.query({
      query: ({ material }) => ({
        url: "client/eligibleSellers",
        method: "GET",
        params: { material },
      }),
      providesTags: ["eligibleSellers"],
    }),

    getEligibleSellersAdvanced: build.query({
      query: ({ products, material, fabricConstruction, certifications }) => ({
        url: "client/eligibleSellersAdvanced",
        method: "GET",
        params: { products, material, fabricConstruction, certifications },
      }),
      providesTags: ["eligibleSellersAdvanced"],
    }),

    getSupplierData: build.query({
      query: ({ userId }) => ({
        url: "client/supplierData",
        method: "GET",
        params: { userId },
      }),
      providesTags: ["supplierData"],
    }),

    getTechPack: build.query({
      query: ({techPackId}) => ({
        url: "client/getTechPack",
        method: "GET",
        params: {techPackId},
      })
    }),

    getQueriesForTechPack: build.query({
      query: ({techPackId}) => ({
        url: "client/getQueriesForTechPack",
        method: "GET",
        params: {techPackId},
      })
    }),

    getIncomingRequests: build.query({
      query: ({ userid }) => ({
        url: "client/incomingRequests",
        method: "GET",
        params: { userid },
      }),
      providesTags: ["IncomingRequests"],
    }),

    getOrderSellerDetails: build.query({
      query: ({ orderId }) => ({
        url: "client/orderSellerDetails",
        method: "GET",
        params: { orderId },
      }),
      providesTags: ["SellerDetails"],
    }),

    getPurchaseOrders: build.query({
      query: ({ userId }) => ({
        url: "client/getPurchaseOrders",
        method: "GET",
        params: { userId },
      }),
      providesTags: ["PurchaseOrders"],
    }),

    updateRecipients: build.mutation({
      query: ({ senders, receivingOrderId, shipmentID }) => ({
        url: "client/updateRecipients",
        method: "POST",
        body: { senders, receivingOrderId, shipmentID },
      }),
    }),

    updateOrder: build.mutation({
      query: ({requestType, sellerIds, orderId, isSeller, notes}) => ({
        url: "client/updateOrder",
        method: "POST",
        body: {requestType, sellerIds, orderId, isSeller, notes},
      }),
    }),

    createNewOrder: build.mutation({
      query: ({userId, material, quantity, sellers}) => ({
        url: "client/createNewOrder",
        method: "POST",
        body: {userId, material, quantity, sellers},
      }),
    }),

    generateNewShipment: build.mutation({
      query: ({ userId, recipientId, material, amount, unit, orderStatus }) => ({
        url: "client/generateNewShipment",
        method: "POST",
        body: { userId, recipientId, material, amount, unit, orderStatus },
      }),
    }),

    getRecipientTransactions: build.query({
      query: ({ page, pageSize, sort, search, userId }) => ({
        url: "client/recipientShipments",
        method: "GET",
        params: { page, pageSize, sort, search, userId }
      }),
      providesTags: ["Shipments"],
    }),

    getChainOfShipments: build.query({
      query: (chainId) => ({
        url: "client/chainOfShipments",
        method: "GET",
        params: {chainId},
      }),
      providesTags: ['chainOfShipments'],
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

console.log(api);

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useUpdateRecipientsMutation,
  useGenerateNewShipmentMutation,
  useGetPurchaseOrdersQuery,
  useGetEligibleSellersQuery,
  useGetEligibleSellersAdvancedQuery,
  useGetSupplierDataQuery,
  useProcessPdfMutation,
  useGetTechPackQuery,
  useGetQueriesForTechPackQuery,
  useGetOrderSellerDetailsQuery,
  useUpdateOrderMutation,
  useCreateNewOrderMutation,
  useGetRecipientTransactionsQuery,
  useGetChainOfShipmentsQuery,
  useGetIncomingRequestsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;