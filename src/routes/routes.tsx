import { Router } from "@redlotus/ui";
import clsx from "clsx";
import { HiArchive, HiHome } from "react-icons/hi";

import { HomePage, AboutClubPage, ContactPage, KaratekaPage, NewcomerPage } from "pages";

const smallIconCss = "h-8 w-8 fill-inherit";
const bigIconCss = "mr-3 h-8 w-8 fill-inherit";

export const definedRoutes = {
  home: "/",
  newcomer: "/uustulnukale",
  aboutClub: "/klubist",
  karateka: "/karateka",
  contact: "/kontakt",
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
