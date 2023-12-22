'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Provider } from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
const inter = Inter({ subsets: ['latin'] })
import loveReducer from '../../Global Redux/createSlice/loveSlice';
import viewReducer from '../../Global Redux/createSlice/viewSlice';
import postReducer from '../../Global Redux/createSlice/postSlice';

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
                  <body className={inter.className}>{children}</body>
              </html>
          </QueryClientProvider>
      </Provider>
  )
}
