'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query';

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider client={queryClient}>
      {children}
    </Provider>
  );
};