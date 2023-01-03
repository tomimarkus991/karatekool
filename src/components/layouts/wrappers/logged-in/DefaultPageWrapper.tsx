import { NavbarTop, PartialPageWrapper } from "components";

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
        </>
      }
    >
      <NavbarTop />
      <div className="w-full py-16 lg:px-8 xl:px-20 2xl:px-[20%]">{children}</div>
    </PartialPageWrapper>
  );
};
