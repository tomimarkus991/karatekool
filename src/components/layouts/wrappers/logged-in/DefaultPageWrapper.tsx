import { Sidebar, useIsMobile } from "@redlotus/ui";
import clsx from "clsx";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import {
  MobileSidebarContent,
  NavbarTop,
  PartialPageWrapper,
  NavbarTopMobile,
  GlowButton,
  WaveBackground,
  LogoWhite,
} from "components";
import { routes, definedRoutes } from "routes";

interface Props {
  children: React.ReactNode;
}

export const DefaultPageWrapper = ({ children }: Props) => {
  const { isMobile } = useIsMobile("sm");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === definedRoutes.karateka) {
      document.documentElement.classList.add("scrollbar-none");
    }
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
          <div className="relative mt-12 aspect-[1/1] xs:aspect-[8/5] sm:aspect-[10/5] lg:aspect-[14/5] xl:aspect-[16/3]">
            <div className="absolute bottom-0 left-0 z-10 flex flex-row items-center justify-between w-full h-full max-w-5xl px-4 space-x-4 text-white xs:px-10">
              <div className="flex flex-col items-center">
                <LogoWhite />
                <p className="mt-10 text-base text-white">© 2023 nüke karate-do klubi</p>
              </div>

              <div className="space-y-2 text-base">
                <p className="text-white">(+372) 57 50 17 33</p>
                <p className="text-white">info@karatekool.ee</p>
                <p className="text-white">MTÜ Karate-do klubi Nüke</p>
                <p className="text-white">EE 2310 1022 0004 3840 13</p>
              </div>
            </div>
            <WaveBackground />
          </div>
        </>
      }
      Sidebar={
        <Sidebar
          ExpandedSidebarContent={
            <MobileSidebarContent
              routes={routes}
              BottomContent={
                <div className="flex flex-col items-center justify-center flex-1 space-y-3">
                  <Link to={definedRoutes.login}>
                    <GlowButton className="w-[13rem]">logi sisse</GlowButton>
                  </Link>
                  <Link to={definedRoutes.register}>
                    <GlowButton className="w-[13rem]" variant="orange">
                      loo kasutaja
                    </GlowButton>
                  </Link>
                </div>
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
          pathname !== definedRoutes.karateka ? "2xl:px-[20%]" : "2xl:px-0"
        )}
      >
        {children}
      </div>

      <div className="relative mt-12 aspect-[1/1] xs:aspect-[8/5] sm:aspect-[10/5] lg:aspect-[14/5] xl:aspect-[16/3]">
        <div
          className={clsx(
            "absolute z-10 flex bottom-0 left-0 w-full h-full justify-center items-center"
          )}
        >
          <div
            className={clsx(
              "grow flex flex-row items-center justify-between space-x-4 text-white xs:px-10",
              "max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4"
            )}
          >
            <div className="flex flex-col items-center">
              <LogoWhite />
              <p className="mt-10 text-base text-white">© 2023 nüke karate-do klubi</p>
            </div>

            <div className="space-y-2 text-base">
              <p className="text-white">(+372) 57 50 17 33</p>
              <p className="text-white">info@karatekool.ee</p>
              <p className="text-white">MTÜ Karate-do klubi Nüke</p>
              <p className="text-white">EE 2310 1022 0004 3840 13</p>
            </div>
          </div>
        </div>
        <WaveBackground />
      </div>
    </PartialPageWrapper>
  );
};
