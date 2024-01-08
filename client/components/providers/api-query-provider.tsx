"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"

function APIQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  }))

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default APIQueryProvider