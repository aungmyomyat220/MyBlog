'use client'
import './globals.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Provider } from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import { Roboto } from 'next/font/google'
import loveReducer from '../../Global Redux/createSlice/loveSlice';
import viewReducer from '../../Global Redux/createSlice/viewSlice';
import postReducer from '../../Global Redux/createSlice/postSlice';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

const store = configureStore({
    reducer: {
        love: loveReducer,
        view: viewReducer,
        post : postReducer
    },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
        staleTime : 0,
      refetchOnWindowFocus: true,
    },
  },
})

export default function RootLayout({ children }) {
  return (
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <html lang="en">
              <head>
                  <title>My Blog</title>
              </head>
                  <body className={roboto.className}>{children}</body>
              </html>
          </QueryClientProvider>
      </Provider>
  )
}
