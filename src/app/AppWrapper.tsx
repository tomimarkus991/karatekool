"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { et } from "date-fns/locale";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider, CalendarFiltersProvider } from "../context";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}
setDefaultOptions({ locale: et });

export const AppWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <CalendarFiltersProvider>
          {children}
          <Toaster />
        </CalendarFiltersProvider>
      </SidebarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
