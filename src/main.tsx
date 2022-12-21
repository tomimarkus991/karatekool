import { SidebarProvider } from "@redlotus/ui";
// eslint-disable-next-line import/no-duplicates
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { et } from "date-fns/locale";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { CalendarFiltersProvider } from "context";
import { Router } from "routes";
import "./index.css";

import "@redlotus/ui/dist/style.css";

setDefaultOptions({ locale: et });

const root = createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <CalendarFiltersProvider>
          <BrowserRouter>
            <Router />
            <Toaster />
          </BrowserRouter>
        </CalendarFiltersProvider>
      </SidebarProvider>
    </QueryClientProvider>
  </StrictMode>
);
