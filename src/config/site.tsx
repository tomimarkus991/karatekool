/* eslint-disable @next/next/no-img-element */

import { getMonth } from "date-fns";
import Image from "next/image";

import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib";
import { JustRouter, NavItem, Router } from "@/types";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
    docs: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Next.js",
  description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
const bigIconCss = "mr-2 h-10 w-10 fill-inherit";

export const definedRoutes = {
  emailConfirmed: "/email-confirmed",
  forgotPassword: "/forgot-password",
  inviteUser: "/invite-user",
  karateka: "/karateka",
  aboutClub: "/klubist",
  contact: "/kontakt",
  login: "/login",
  register: "/register",
  resetPassword: "/reset-password",
  newcomer: "/uustulnukale",
  home: "/",
  videos: "/videod",
  ajalugu: "/ajalugu",
  buklet: "/buklet",
};

export const socialMedia = {
  facebook: "https://www.facebook.com/karatekool/" as any,
  instagram: "https://www.instagram.com/karatekoolnyke/" as any,
};

// icons https://www.svgrepo.com/collection/school-elements-4/
export const routes: Router[] = [
  {
    href: definedRoutes.home,
    routeName: "Kodu",
    bigIcon: (
      <div className={cn(bigIconCss, "relative")}>
        <Image fill alt="house" src="/icons/house.svg" />
      </div>
    ),
  },
  {
    href: definedRoutes.newcomer,
    routeName: "Uustulnukale",
    bigIcon: <Icons.newcomer className={cn(bigIconCss)} />,
  },
  {
    href: definedRoutes.aboutClub,
    routeName: "Klubist",
    bigIcon: <Icons.belt className={cn(bigIconCss)} />,
  },
  {
    href: definedRoutes.karateka,
    routeName: "Karateka",
    bigIcon: <Icons.karateka className={cn(bigIconCss)} />,
  },
  {
    href: definedRoutes.contact,
    routeName: "Kontakt",
    bigIcon: <Icons.notebook className={cn(bigIconCss)} />,
  },
  {
    href: definedRoutes.buklet,
    routeName: "Buklet",
    bigIcon: (
      <div className={cn(bigIconCss, "relative")}>
        <Image fill alt="house" src="/icons/buklet.svg" />
      </div>
    ),
  },
  {
    href: definedRoutes.ajalugu,
    routeName: "Ajalugu",
    bigIcon: (
      <div className={cn(bigIconCss, "relative")}>
        <Image fill alt="history" src="/icons/library.svg" />
      </div>
    ),
  },
  {
    href: definedRoutes.videos,
    routeName: "Videod",
    bigIcon: (
      <div className={cn(bigIconCss, "relative")}>
        <Image fill alt="vid" src="/icons/videod.svg" />
      </div>
    ),
  },
];

export const justRoutes: JustRouter[] = [
  {
    href: definedRoutes.login,
  },
  {
    href: definedRoutes.register,
  },
  {
    href: definedRoutes.forgotPassword,
  },
  {
    href: definedRoutes.resetPassword,
  },
  {
    href: definedRoutes.emailConfirmed,
  },
  {
    href: definedRoutes.inviteUser,
  },
];

export const CurrentSeason = "2025/2026";

export const CurrentYear = "37";

export const getIfUserCanRegisterToClub = () => {
  const currentMonth = getMonth(new Date());

  // when month is august or september render registering UI
  if (currentMonth === 7 || currentMonth === 8) {
    return true;
  }
  return false;
};
