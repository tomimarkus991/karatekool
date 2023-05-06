import { ReactNode } from "react";

import { PartialPageWrapper } from "@/components";

import { Footer } from "../../../elements/navigation/Footer";
import { NavbarTop } from "../../../elements/navigation/NavbarTop";
import { Sidebar } from "../../../elements/sidebar/Sidebar";

export const DefaultPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <PartialPageWrapper
      MobileContent={
        <>
          <NavbarTop />
          <div className="px-4">{children}</div>
          <Footer />
        </>
      }
      Sidebar={<Sidebar />}
    >
      <div>
        <NavbarTop />
      </div>

      <div className="w-full pt-12 pb-16 lg:px-8 xl:px-20 px-10 2xl:px-[20%]">{children}</div>

      <Footer />
    </PartialPageWrapper>
  );
};
