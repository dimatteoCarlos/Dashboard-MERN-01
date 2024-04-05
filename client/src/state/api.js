//api.js
//create the api endpoint for RTkQ
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// baseUrl: process.env.REACT_APP_BASE_URL,//PORQUE NO FUNCIONA?
// baseUrl: 'http://localhost:5001',

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:5001',
  }),

  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Transactions',
    'UsersByGeography',
    'Overview',
    'Admin',
    'Performance'
  ],

  //the main logic is here
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/general/user/${id}`,
      providesTags: ['User'],
    }),
    /******************* */
    getProducts: build.query({
      query: () => 'client/products',
      providesTags: ['Products'],
    }),

    // getCustomers: build.query({
    //   query: () => 'client/customers',
    //   providesTags: ['Customers'],
    // }),

    getCustomers: build.query({
      query: () => ({
        method: 'GET',
        url: 'client/customers',
        params: {},
      }),
      providesTags: ['Customers'],
    }),

    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        method: 'GET',
        url: 'client/transactions',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['Transactions'],
    }),

    //getGeography route controller

    getUsersByGeography: build.query({
      query: () => ({
        method: 'GET',
        url: '/client/geography',
      }),
      providesTags: ['UsersByGeography'],
    }),

    //****************** */
    getSales: build.query({
      query: () => 'sales/overview',
      providesTags: ['Overview'],
    }),

    // getSales:build.query({
    //   query:()=>(
    //     {
    //       method:'GET',
    //       url:'/sales/overview'
    //     }
    //   ),
    //   providesTags:['Overview']
    // }),

    getAdmin: build.query({
      query: () => ({
        method: 'GET',
        url: '/management/admin',
        // params:
      }),

      providesTags: ['Admin'],
    }),

    getAffiliateStat:build.query(
      {
        query:()=>({
          method:'GET',
          url:'/management/performance',
        }),

        providesTags:['Performance']
      }
    )
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetUsersByGeographyQuery,
  useGetSalesQuery,
  useGetAdminQuery,
  useGetAffiliateStatQuery, 

  
} = api;

//useFunctionQuery
