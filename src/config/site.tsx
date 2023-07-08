/* eslint-disable @next/next/no-img-element */

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
  apply: "/apply-to-club",
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
};

export const socialMedia = {
  facebook: "https://www.facebook.com/karatekool/" as any,
  instagram: "https://www.instagram.com/karatekoolnyke/" as any,
};

export const routes: Router[] = [
  {
    href: definedRoutes.home,
    routeName: "Kodu",
    // bigIcon: <Icons.home className={cn(bigIconCss)} />,
    bigIcon: (
      <div className={cn(bigIconCss, "relative")}>
        <Image fill alt="house" src="/icons/house.svg" />
        {/* <Image
                    width={0}
                    height={0}
                    alt="belt"
                    className="w-[3.5rem] sm:w-[4rem]"
                    src="/icons/belt.svg"
                  /> */}
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
    href: definedRoutes.apply,
  },
  {
    href: definedRoutes.emailConfirmed,
  },
  {
    href: definedRoutes.inviteUser,
  },
];
