import clsx from "clsx";

import { JustRouter, NavItem, Router } from "@/types";

import { Icons } from "../components/icons/Icons";

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
  facebook: "https://www.facebook.com/karatekool/",
  instagram: "https://www.instagram.com/karatekoolnyke/",
};

export const routes: Router[] = [
  {
    href: definedRoutes.home,
    routeName: "Kodu",
    bigIcon: <Icons.home className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.newcomer,
    routeName: "Uustulnukale",
    bigIcon: <Icons.newcomer className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.aboutClub,
    routeName: "Klubist",
    bigIcon: <Icons.aboutClub className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.karateka,
    routeName: "Karateka",
    bigIcon: <Icons.karateka className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.contact,
    routeName: "Kontakt",
    bigIcon: <Icons.contact className={clsx(bigIconCss)} />,
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
