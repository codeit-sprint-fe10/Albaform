'use client';

import { ReactNode } from 'react';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  queryClient.getQueryCache().subscribe((event) => {
    if (event.query) {
      const query = event.query;
      if (query.state.status === 'error') {
        const error = query.state.error;

        if (error.message.includes('404') || error.message.includes('403')) {
          router.replace('/404');
        }
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
