"use client";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { CalendarFilter } from "@/types";

interface ProviderProps {
  children: React.ReactNode;
}

interface InitialContextType {
  filter: CalendarFilter;
  setFilter: Dispatch<SetStateAction<CalendarFilter>>;
}

const initContextData: InitialContextType = {
  filter: "none",
  setFilter: () => {},
};

const CalendarFiltersContext = createContext(initContextData);

export const useCalendarFilters = () => useContext(CalendarFiltersContext);

// @todo save to local storage
export const CalendarFiltersProvider = ({ children }: ProviderProps) => {
  const [filter, setFilter] = useState<CalendarFilter>("none");

  return (
    <CalendarFiltersContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </CalendarFiltersContext.Provider>
  );
};
