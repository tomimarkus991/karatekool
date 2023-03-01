import { Router } from "@redlotus/ui";
import clsx from "clsx";
import { HiArchive, HiHome } from "react-icons/hi";

import {
  HomePage,
  LoginPage,
  AboutClubPage,
  ContactPage,
  KaratekaPage,
  NewcomerPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ApplyToClubPage,
  EmailConfirmedPage,
  InviteUserPage,
} from "@/pages";
import { JustRouter } from "@/types";

const smallIconCss = "h-8 w-8 fill-inherit";
const bigIconCss = "mr-3 h-8 w-8 fill-inherit";

export const definedRoutes = {
  home: "/",
  newcomer: "/uustulnukale",
  aboutClub: "/klubist",
  karateka: "/karateka",
  contact: "/kontakt",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  apply: "/apply-to-club",
  login: "/login",
  register: "/register",
  emailConfirmed: "/email-confirmed",
  inviteUser: "/invite-user",
};

export const routes: Router[] = [
  {
    to: definedRoutes.home,
    routeName: "Kodu",
    element: <HomePage />,
    smallIcon: <HiHome className={clsx(smallIconCss)} />,
    bigIcon: <HiHome className={clsx(bigIconCss)} />,
  },
  {
    to: definedRoutes.newcomer,
    routeName: "Uustulnukale",
    element: <NewcomerPage />,
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
  {
    to: definedRoutes.aboutClub,
    routeName: "Klubist",
    element: <AboutClubPage />,
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
  {
    to: definedRoutes.karateka,
    routeName: "Karateka",
    element: <KaratekaPage />,
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
  {
    to: definedRoutes.contact,
    routeName: "Kontakt",
    element: <ContactPage />,
    smallIcon: <HiArchive className={clsx(smallIconCss)} />,
    bigIcon: <HiArchive className={clsx(bigIconCss)} />,
  },
];

export const justRoutes: JustRouter[] = [
  {
    to: definedRoutes.login,
    element: <LoginPage />,
  },
  {
    to: definedRoutes.register,
    element: <RegisterPage />,
  },
  {
    to: definedRoutes.forgotPassword,
    element: <ForgotPasswordPage />,
  },
  {
    to: definedRoutes.resetPassword,
    element: <ResetPasswordPage />,
  },
  {
    to: definedRoutes.apply,
    element: <ApplyToClubPage />,
  },
  {
    to: definedRoutes.emailConfirmed,
    element: <EmailConfirmedPage />,
  },
  {
    to: definedRoutes.inviteUser,
    element: <InviteUserPage />,
  },
];
