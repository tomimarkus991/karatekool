"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { et } from "date-fns/locale";
import { Toaster } from "react-hot-toast";

import { SidebarProvider, CalendarFiltersProvider } from "../context";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}
setDefaultOptions({ locale: et });

export const AppWrapper = ({ children }: Props) => {
  if (typeof window !== "undefined") {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <CalendarFiltersProvider>
          {children}
          <Toaster />
        </CalendarFiltersProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
};
