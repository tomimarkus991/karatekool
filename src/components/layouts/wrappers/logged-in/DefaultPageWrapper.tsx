import { Sidebar, useIsMobile } from "@redlotus/ui";

import { MobileSidebarContent, NavbarTop, PartialPageWrapper, NavbarTopMobile } from "components";
import { routes } from "routes";

interface Props {
  children: React.ReactNode;
}

export const DefaultPageWrapper = ({ children }: Props) => {
  const { isMobile } = useIsMobile("sm");
  return (
    <PartialPageWrapper
      MobileContent={
        <>
          {/* make isMobile true only until sm screen */}
          {isMobile ? <NavbarTopMobile /> : <NavbarTop />}
          <div className="px-4">{children}</div>
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

      <div className="w-full py-16 lg:px-8 xl:px-20 2xl:px-[20%]">{children}</div>
    </PartialPageWrapper>
  );
};
