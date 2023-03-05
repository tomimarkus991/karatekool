import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

import {
  Footer,
  MobileSidebarContent,
  NavbarTop,
  NavbarTopMobile,
  PartialPageWrapper,
  Sidebar,
} from "@/components";
import { definedRoutes } from "@/config";
import { useIsMobile } from "@/hooks";

export const DefaultPageWrapper = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useIsMobile("sm");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === definedRoutes.karateka && typeof window !== "undefined") {
      document.documentElement.classList.add("scrollbar-none");
    }
    return () => {
      document.documentElement.classList.remove("scrollbar-none");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Footer />
        </>
      }
      Sidebar={
        <Sidebar ExpandedSidebarContent={<MobileSidebarContent />} SmallSidebarContent={<></>} />
      }
    >
      <div>
        <NavbarTop />
      </div>

      <div
        className={clsx(
          "w-full pt-12 pb-16 lg:px-8 xl:px-20 px-10",
          pathname !== definedRoutes.karateka ? "2xl:px-[20%]" : "px-0"
        )}
      >
        {children}
      </div>

      <Footer />
    </PartialPageWrapper>
  );
};
