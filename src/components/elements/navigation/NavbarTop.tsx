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

export const NavbarTop = () => {
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
    [0, 0, 1]
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
            [1, 0.1]
          )})`,
          scale: useTransform(scrollYBoundedProgress, [0, 1], [1, 0.8]),
          top: useTransform(scrollYBoundedProgress, [0, 1], [0, -10]),
        }}
        className="mx-auto inset-x-0 my-2 sm2:hidden fixed top-0 z-[1200] flex rounded-md drop-shadow-lg backdrop-blur-md shadow-inner items-center w-[95%]"
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
          "hidden pl-2 pr-4 mt-4 sm2:flex sm2:max-w-3xl self-center md:max-w-4xl lg:max-w-5xl xl:max-w-5xl max-h-28"
        )}
      >
        <div className="flex justify-between">
          <div className="flex flex-row items-center space-x-1 lg:space-x-3">
            <Icons.logo2 className="scale-[1] lg:scale-[1] mr-4 lg:mr-20" />
            {/* <div className="font-semibold">
            <p className="md:text-2xl lg:text-2xl md:hidden lg:block">Nüke</p>
            <p className="md:text-base lg:text-lg md:hidden lg:block">karate-do klubi</p>
          </div> */}
          </div>
          <div className="flex flex-row items-center gap-3 font-normal lg:gap-5">
            {routes.map(([href, label], index) => (
              <NavbarTopLink key={href} href={href} index={index}>
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
                <div className="z-10 lg:hidden">
                  <LoginModal />
                </div>
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
