/* eslint-disable jsx-a11y/no-static-element-interactions */

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { HiLogout } from "react-icons/hi";

import {
  MobileSidebarContent,
  NavbarTop,
  PartialPageWrapper,
  NavbarTopMobile,
  LoginModal,
  RegisterModal,
  Footer,
  AnimationWrapper,
  animations,
  Sidebar,
} from "@/components";
import { definedRoutes, routes } from "@/config";
import { useIsMobile, useSignOut, useUser } from "@/hooks";

export const DefaultPageWrapper = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useIsMobile("sm");
  const pathname = usePathname();

  const { data: user } = useUser();
  const { mutate: signOut } = useSignOut();

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
        <Sidebar
          ExpandedSidebarContent={
            <MobileSidebarContent
              routes={routes}
              BottomContent={
                <>
                  {user ? (
                    <div className="flex items-center justify-start ml-4">
                      <AnimationWrapper variants={animations.smallScale}>
                        <div
                          onClick={() => signOut()}
                          className="flex flex-row items-center cursor-pointer"
                        >
                          <HiLogout className="w-8 h-8 mr-3 fill-text-primary" />
                          <p className="text-lg font-semibold">Logi välja</p>
                        </div>
                      </AnimationWrapper>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center flex-1 space-y-3">
                      <LoginModal type="sidebarButton" />
                      <RegisterModal type="sidebarButton" />
                    </div>
                  )}
                </>
              }
            />
          }
          SmallSidebarContent={<></>}
        />
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
