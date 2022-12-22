import { NavbarBottom } from "@redlotus/ui";

import { NavbarBottomContent, NavbarTop, PartialPageWrapper } from "components";

interface Props {
  children: React.ReactNode;
}

export const DefaultPageWrapper = ({ children }: Props) => {
  return (
    <PartialPageWrapper
      MobileContent={
        <>
          {/* <NavbarTop
            title="Template"
            user={{ id: "1", username, email: "galaxy@gmail.com", avatar: null }}
          /> */}
          <div className="px-4">{children}</div>
          <NavbarBottom>
            <NavbarBottomContent />
          </NavbarBottom>
        </>
      }
    >
      <NavbarTop />
      {children}
    </PartialPageWrapper>
  );
};
