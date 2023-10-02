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

    processTechPack: build.mutation({
      query: (file) => ({
        url: 'client/processTechPack',
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      }),
    }),

    getEligibleSellersAdvanced: build.query({
      query: ({ material, fabricConstruction }) => ({
        url: "client/eligibleSellersAdvanced",
        method: "GET",
        params: { material, fabricConstruction },
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

    getCompany: build.query({
      query: ({ query }) => ({
        url: "client/search",
        method: "GET",
        params: { query },
      }),
    }),

    getSuppliersForUser: build.query({
      query: ({ userId }) => ({
        url: "client/getSuppliersForUser",
        method: "GET",
        params: { userId },
      }),
    }),

    getInvitesSentForUser: build.query({
      query: ({ userId }) => ({
        url: "client/getInvitesSentForUser",
        method: "GET",
        params: { userId },
      }),
    }),

    getInvitesReceivedForUser: build.query({
      query: ({ userId }) => ({
        url: "client/getInvitesReceivedForUser",
        method: "GET",
        params: { userId },
      }),
    }),

    getInvitesForUser: build.query({
      query: ({ userId }) => ({
        url: "client/getInvitesForUser",
        method: "GET",
        params: { userId },
      }),
    }),

    getPendingInvitationsForUser: build.query({
      query: ({ userId }) => ({
        url: "client/getPendingInvitationsForUser",
        method: "GET",
        params: { userId },
      }),
    }),

    getTechPack: build.query({
      query: ({ techPackId }) => ({
        url: "client/getTechPack",
        method: "GET",
        params: { techPackId },
      }),
    }),

    getTechPacksForUser: build.query({
      query: ({ userId }) => ({
        url: "client/getTechPacksForUser",
        method: "GET",
        params: { userId }
      }),
    }),

    getQueriesForTechPack: build.query({
      query: ({techPackId}) => ({
        url: "client/getQueriesForTechPack",
        method: "GET",
        params: {techPackId},
      }),
    }),

    getBulkSuppliers: build.query({
      query: ({ supplierIds }) => ({
        url: "client/getBulkSuppliers",
        method: "GET",
        params: { supplierIds: supplierIds.join(',') },
      }),
    }),

    getOrderRequestDetails: build.query({
      query: ({ orderRequestId }) => ({
        url: "client/getOrderRequestDetails",
        method: "GET",
        params: { orderRequestId },
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

    updateRecipients: build.mutation({
      query: ({ senders, receivingOrderId, shipmentID }) => ({
        url: "client/updateRecipients",
        method: "POST",
        body: { senders, receivingOrderId, shipmentID },
      }),
    }),

    updateOrder: build.mutation({
      query: ({ requestType, sellerIds, orderId, isSeller, notes }) => ({
        url: "client/updateOrder",
        method: "POST",
        body: { requestType, sellerIds, orderId, isSeller, notes },
      }),
    }),

    sendInvite: build.mutation({
      query: ({ userId, supplierId, status, connectionDate }) => ({
        url: "client/sendInvite",
        method: "POST",
        body: { userId, supplierId, status, connectionDate },
      }),
    }),

    updateInviteStatus: build.mutation({
      query: ({ inviteId, status }) => ({
        url: "client/updateInviteStatus",
        method: "POST",
        body: { inviteId, status },
      }),
    }),

    deleteTechPack: build.mutation({
      query: ({ techPackId }) => ({
        url: `client/deleteTechPack/${techPackId}`,
        method: "DELETE",
      }),
    }),

    createNewOrder: build.mutation({
      query: ({ buyerId, buyerType, techPackId, material, productCategory, deliveryDate, fabricConstruction, color, quantity, countryOfOrigin, eligibleSuppliers }) => ({
        url: "client/createNewOrder",
        method: "POST",
        body: { buyerId, buyerType, techPackId, material, productCategory, deliveryDate, fabricConstruction, color, quantity, countryOfOrigin, eligibleSuppliers },
      }),
    }),

    createNewTechPack: build.mutation({
      query: ({ buyerId, buyerType, sku, product, quantity, queries }) => ({
        url: "client/createNewTechPack",
        method: "POST",
        body: { buyerId, buyerType, sku, product, quantity, queries },
      }),
    }),

    createNewTechPackAndSearchQueries: build.mutation({
      query: ({ techPackParams, buyerId, buyerType, sku, product }) => ({
        url: "client/createNewTechPackAndSearchQueries",
        method: "POST",
        body: { techPackParams, buyerId, buyerType, sku, product },
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
  useGetEligibleSellersAdvancedQuery,
  useGetSupplierDataQuery,
  useGetCompanyQuery,
  useGetSuppliersForUserQuery,
  useGetInvitesSentForUserQuery,
  useGetInvitesReceivedForUserQuery,
  useGetInvitesForUserQuery,
  useGetPendingInvitationsForUserQuery,
  useProcessTechPackMutation,
  useGetTechPackQuery,
  useGetTechPacksForUserQuery,
  useGetQueriesForTechPackQuery,
  useGetBulkSuppliersQuery,
  useGetOrderRequestDetailsQuery,
  useGetOrderSellerDetailsQuery,
  useUpdateOrderMutation,
  useSendInviteMutation,
  useUpdateInviteStatusMutation,
  useCreateNewOrderMutation,
  useDeleteTechPackMutation,
  useCreateNewTechPackMutation,
  useCreateNewTechPackAndSearchQueriesMutation,
  useGetRecipientTransactionsQuery,
  useGetChainOfShipmentsQuery,
  useGetIncomingRequestsQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;