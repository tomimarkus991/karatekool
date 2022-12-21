import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { GroupFilters } from "types";

interface ProviderProps {
  children: React.ReactNode;
}

interface InitialContextType {
  letter: GroupFilters;
  setLetter: Dispatch<SetStateAction<GroupFilters>>;
}

const initContextData: InitialContextType = {
  letter: "none",
  setLetter: () => {},
};

const CalendarFiltersContext = createContext(initContextData);

export const useCalendarFilters = () => useContext(CalendarFiltersContext);

// @todo save to local storage
export const CalendarFiltersProvider = ({ children }: ProviderProps) => {
  const [letter, setLetter] = useState<GroupFilters>("none");

  return (
    <CalendarFiltersContext.Provider
      value={{
        letter,
        setLetter,
      }}
    >
      {children}
    </CalendarFiltersContext.Provider>
  );
};
