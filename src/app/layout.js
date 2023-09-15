'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime : 1000 * 60 * 60 * 24
    },
  },
})

export default function RootLayout({ children }) {
  return (
      <QueryClientProvider client={queryClient}>
          <html lang="en">
              <body className={inter.className}>{children}</body>
          </html>
      </QueryClientProvider>
  )
}
