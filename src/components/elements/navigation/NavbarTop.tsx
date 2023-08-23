"use client";

import { useTransform, motion, useMotionTemplate } from "framer-motion";

import { AnimationWrapper, animations } from "@/components";
import { definedRoutes } from "@/config";
import { useSidebar } from "@/context";
import { useBoundedScroll, useUser } from "@/hooks";
import { cn } from "@/lib";

import { Icons } from "../../icons/Icons";
import { LoginModal } from "../user/LoginModal";
import { UserProfile } from "../user/UserProfile";

import { NavbarTopLink } from "./components";

interface Props {
  bg?: string;
}

export const NavbarTop = ({ bg = "bg-surface-bg" }: Props) => {
  const routes = [
    [definedRoutes.home, "kodu"],
    [definedRoutes.newcomer, "uustulnukale"],
    [definedRoutes.aboutClub, "klubist"],
    [definedRoutes.karateka, "karateka"],
    [definedRoutes.contact, "kontakt"],
  ];

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
            <Icons.logo className="scale-[.80]" />
            <div className="flex flex-col font-semibold">
              <p className="h-6 text-2xl font-semibold">Nüke</p>
              <p className="font-normal">Karate-do klubi</p>
            </div>
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
      <div
        className={cn(
          "hidden pl-2 pr-4 mt-4 sm2:flex z-10 sm2:max-w-3xl self-center md:max-w-4xl lg:max-w-5xl xl:max-w-5xl max-h-28",
          bg,
        )}
      >
        <div className="flex justify-between">
          <div className="flex flex-row items-center space-x-1 md:mr-16 sm2:mr-0 lg:mr-28 lg:space-x-3">
            <Icons.logo className="scale-[1] sm2:mr-1" />
            <div className="mr-4 font-semibold">
              <p className="sm2:text-xl md:text-2xl sm:hidden sm2:block !leading-[1.2rem]">Nüke</p>
              <p className="sm2:text-base md:text-lg sm:hidden sm2:w-20 md:w-auto sm2:block !leading-[1.2rem]">
                Karate-do klubi
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3 font-normal lg:gap-5">
            {routes.map(([href, label], index) => (
              <NavbarTopLink key={href} href={href} bg={bg} index={index}>
                {/* make first letter uppercase */}
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </NavbarTopLink>
            ))}
            {user ? (
              <UserProfile
                avatar={user?.avatar || "avatar.svg"}
                username={user?.username || ""}
                role={user?.role || "user"}
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
    </>
  );
};
