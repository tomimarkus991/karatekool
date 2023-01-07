import { Sidebar, useIsMobile } from "@redlotus/ui";
import clsx from "clsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { MobileSidebarContent, NavbarTop, PartialPageWrapper, NavbarTopMobile } from "components";
import { routes, definedRoutes } from "routes";

interface Props {
  children: React.ReactNode;
}

export const DefaultPageWrapper = ({ children }: Props) => {
  const { isMobile } = useIsMobile("sm");
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("scrollbar-none");
    return () => {
      document.documentElement.classList.remove("scrollbar-none");
    };
  }, []);

  return (
    <PartialPageWrapper
      MobileContent={
        <>
          {/* make isMobile true only until sm screen */}
          {isMobile ? <NavbarTopMobile /> : <NavbarTop />}
          <div className={clsx(pathname !== definedRoutes.karateka ? "px-4" : "px-0")}>
            {children}
          </div>
        </>
      }
      Sidebar={
        <Sidebar
          ExpandedSidebarContent={<MobileSidebarContent routes={routes} />}
          SmallSidebarContent={<></>}
        />
      }
    >
      <NavbarTop />

      <div
        className={clsx(
          "w-full py-16 lg:px-8 xl:px-20",
          pathname !== definedRoutes.karateka ? "2xl:px-[20%]" : "2xl:px-0"
        )}
      >
        {children}
      </div>
    </PartialPageWrapper>
  );
};
