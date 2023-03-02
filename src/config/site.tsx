import clsx from "clsx";
import { HiArchive, HiHome } from "react-icons/hi";

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
const smallIconCss = "h-8 w-8 fill-inherit";
const bigIconCss = "mr-3 h-8 w-8 fill-inherit";

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

export const routes: Router[] = [
  {
    href: definedRoutes.home,
    routeName: "Kodu",
    smallIcon: <HiHome className={clsx(smallIconCss)} />,
    bigIcon: <HiHome className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.newcomer,
    routeName: "Uustulnukale",
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.aboutClub,
    routeName: "Klubist",
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.karateka,
    routeName: "Karateka",
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
  {
    href: definedRoutes.contact,
    routeName: "Kontakt",
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
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
