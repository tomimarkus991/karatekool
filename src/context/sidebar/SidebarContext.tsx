import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { useIsMobile } from "@/hooks";

type ProviderProps = {
  children: React.ReactNode;
};
export type SidebarPlacementType = "left" | "right";
type SidebarStateType = "closed" | "expanded" | "small" | "mobile";

type InitialContextType = {
  sidebarState: SidebarStateType;
  setSidebarState: Dispatch<SetStateAction<SidebarStateType>>;
  placement: SidebarPlacementType;
  prevSidebarState: SidebarStateType;
  setPrevSidebarState: Dispatch<SetStateAction<SidebarStateType>>;
};

const initContextData: InitialContextType = {
  placement: "right",
  sidebarState: "closed",
  setSidebarState: () => {},
  prevSidebarState: "closed",
  setPrevSidebarState: () => {},
};

const SidebarContext = createContext(initContextData);

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: ProviderProps) => {
  const [sidebarState, setSidebarState] = useState<SidebarStateType>("closed");
  const [prevSidebarState, setPrevSidebarState] = useState<SidebarStateType>("closed");

  const { isMobile } = useIsMobile();
  const placement: SidebarPlacementType = isMobile ? "right" : "left";

  return (
    <SidebarContext.Provider
      value={{ sidebarState, setSidebarState, placement, prevSidebarState, setPrevSidebarState }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
