import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { useIsMobile } from "@/hooks";

type ProviderProps = {
  children: React.ReactNode;
};
export type SidebarPlacementType = "left" | "right";
type SidebarStateType = "closed" | "mobile";

type InitialContextType = {
  sidebarState: SidebarStateType;
  setSidebarState: Dispatch<SetStateAction<SidebarStateType>>;
  placement: SidebarPlacementType;
};

const initContextData: InitialContextType = {
  placement: "right",
  sidebarState: "closed",
  setSidebarState: () => {},
};

const SidebarContext = createContext(initContextData);

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: ProviderProps) => {
  const [sidebarState, setSidebarState] = useState<SidebarStateType>("closed");

  const { isMobile } = useIsMobile();
  const placement: SidebarPlacementType = isMobile ? "right" : "left";

  return (
    <SidebarContext.Provider value={{ sidebarState, setSidebarState, placement }}>
      {children}
    </SidebarContext.Provider>
  );
};
