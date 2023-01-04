import { useIsMobile } from "@redlotus/ui";

import { NavbarTopLink } from "components";
import { definedRoutes } from "routes";

import { GlowButton, Logo } from "..";

export const NavbarTop = () => {
  const { isMobile } = useIsMobile("xl");
  console.log(isMobile);

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl m-auto mt-4">
      <div className="flex justify-between">
        <div className="flex flex-row items-center space-x-1 lg:space-x-3">
          <Logo className="scale-[0.8] lg:scale-[0.9]" />
          <div className="font-semibold">
            <p className="md:text-2xl lg:text-3xl">nüke</p>
            <p className="md:text-base lg:text-lg">karate-do klubi</p>
          </div>
        </div>
        <div className="flex flex-row space-x-5 lg:space-x-8 items-center font-normal">
          <NavbarTopLink to={definedRoutes.home}>kodu</NavbarTopLink>
          <NavbarTopLink to={definedRoutes.newcomer}>uustulnukale</NavbarTopLink>
          <NavbarTopLink to={definedRoutes.aboutClub}>klubist</NavbarTopLink>
          <NavbarTopLink to={definedRoutes.karateka}>karateka</NavbarTopLink>
          <NavbarTopLink to={definedRoutes.contact}>kontakt</NavbarTopLink>
          <GlowButton className="lg:hidden" size="sm">
            logi sisse
          </GlowButton>
          <GlowButton className="max-lg:hidden lg:block">logi sisse</GlowButton>
        </div>
      </div>
    </div>
  );
};
