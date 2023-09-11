"use client";

import { useTransform, motion, useMotionTemplate } from "framer-motion";
import Image from "next/image";

import { AnimationWrapper, animations } from "@/components";
import { definedRoutes } from "@/config";
import { useSidebar } from "@/context";
import { useBoundedScroll, useUser } from "@/hooks";
import { cn } from "@/lib";

import { Icons } from "../../icons/Icons";
import { LoginModal } from "../user/LoginModal";
import { UserProfile } from "../user/UserProfile";

import { NavbarTopLink } from "./components";
import LogoText from "./logo-text-big.png";
import { NavbarFlyoutMenu } from "./NavbarFlyoutMenu";

interface Props {
  bg?: string;
}

export const NavbarTop = ({ bg = "bg-surface-bg" }: Props) => {
  const { data: user } = useUser();

  const { setSidebarState } = useSidebar();
  const { scrollYBoundedProgress } = useBoundedScroll(100);

  const scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    // percentage of the scrollYBoundedProgress so when 0.75 it starts effect when 75 pixels are scrolled
    [0, 0.75, 1],
    [0, 0, 1],
  );

  // const opacity = useTransform(scrollYBoundedProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* mobile */}
      <motion.div
        style={{
          height: useTransform(scrollYBoundedProgress, [0, 1], [90, 80]),
          backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [1, 0.1],
          )})`,
          scale: useTransform(scrollYBoundedProgress, [0, 1], [1, 0.8]),
          top: useTransform(scrollYBoundedProgress, [0, 1], [0, -10]),
        }}
        className={cn(
          "mx-auto inset-x-0 my-2 sm2:hidden fixed top-0 z-[1200] flex rounded-md drop-shadow-lg backdrop-blur-md shadow-inner items-center w-[95%]",
          bg,
        )}
      >
        <div className="flex flex-row items-center justify-between flex-1 px-4">
          <div className="flex flex-row items-center justify-start flex-1">
            <Icons.logoMobile className="scale-[.80]" />
            <Image
              src={LogoText}
              loading="eager"
              quality={100}
              alt="nüke"
              className="w-[6rem] mb-3"
            />
          </div>
          <AnimationWrapper variants={animations.smallScale} key="ntm-club-icon">
            <Icons.menuIcon
              id="sidebar-button"
              className="scale-[.70] sm:scale-[.80] cursor-pointer"
              onClick={() => {
                setSidebarState("mobile");
              }}
            />
          </AnimationWrapper>
        </div>
      </motion.div>
      {/* desktop */}
      <div
        className={cn(
          "hidden pl-2 pr-4 mt-4 sm2:flex z-10 sm2:max-w-4xl self-center md:max-w-5xl lg:max-w-5xl xl:max-w-5xl max-h-28",
          bg,
        )}
      >
        <div className="flex justify-between">
          <div className="flex flex-row items-center space-x-1 sm2:mr-6 md:mr-16">
            <Icons.logoDesktop className="scale-[0.8] hidden sm2:block" />
            <Image
              src={LogoText}
              loading="eager"
              quality={100}
              alt="nüke"
              className="w-[6rem] lg:w-[6rem] xl:w-[7rem] mb-3"
            />
          </div>
          <div className="flex flex-row items-center gap-3 font-normal lg:gap-5">
            <NavbarTopLink href={definedRoutes.home} bg={bg} index={0}>
              Kodu
            </NavbarTopLink>
            <NavbarTopLink href={definedRoutes.newcomer} bg={bg} index={1}>
              Uustulnukale
            </NavbarTopLink>
            <NavbarTopLink href={definedRoutes.aboutClub} bg={bg} index={2} menu>
              <NavbarFlyoutMenu href={definedRoutes.aboutClub} />
            </NavbarTopLink>
            <NavbarTopLink href={definedRoutes.karateka} bg={bg} index={3}>
              Karateka
            </NavbarTopLink>
            <NavbarTopLink href={definedRoutes.contact} bg={bg} index={4}>
              Kontakt
            </NavbarTopLink>
            <div className="sm2:hidden md2:block">
              {user ? (
                <UserProfile
                  avatar={user?.avatar || "avatar.svg"}
                  username={user?.username || ""}
                  role={user?.role || "user"}
                  group={user?.group || null}
                />
              ) : (
                <>
                  <div className="z-10 max-lg:hidden lg:block">
                    <LoginModal />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
